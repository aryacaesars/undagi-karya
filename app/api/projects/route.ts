import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';
import { MILESTONE_WEIGHTS } from '@/lib/utils';

const prisma = new PrismaClient();

// GET - Mengambil semua projects atau project berdasarkan query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (id) {
      // Mengambil project berdasarkan ID dengan relasi
      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          forms: {
            include: {
              officer: true,
              items: true
            }
          },
          milestoneHistories: {
            orderBy: { changedAt: 'desc' }
          }
        }
      });

      if (!project) {
        return NextResponse.json(
          { error: 'Project tidak ditemukan' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: project
      });
    }

    // Mengambil semua projects dengan pagination dan search
    const whereClause = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
        { client: { contains: search, mode: 'insensitive' as const } },
        { location: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: whereClause,
        include: {
          forms: true
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.project.count({ where: whereClause })
    ]);

    return NextResponse.json({
      success: true,
      data: projects,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Error getting projects:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data projects' },
      { status: 500 }
    );
  }
}

// POST - Membuat project baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      client, 
      officer, 
      type, 
      location, 
      description,
      startDate,
      endDate,
      contractValue,
      paymentTerms,
      totalPaid
    } = body;

    // Validasi input
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Nama project harus diisi' },
        { status: 400 }
      );
    }

    // Cek apakah project dengan nama yang sama sudah ada
    const existingProject = await prisma.project.findFirst({
      where: { 
        name: { 
          equals: name.trim(), 
          mode: 'insensitive' 
        } 
      }
    });

    if (existingProject) {
      return NextResponse.json(
        { error: 'Project dengan nama tersebut sudah ada' },
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        name: name.trim(),
        client: client?.trim() || null,
        officer: officer?.trim() || null,
        type: type?.trim() || null,
        location: location?.trim() || null,
        description: description?.trim() || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        contractValue: contractValue ? String(contractValue) : null,
        paymentTerms: paymentTerms?.trim() || null,
        totalPaid: totalPaid ? String(totalPaid) : null,
        // milestone default PERENCANAAN, progress 0 handled by schema
      }
    });

    return NextResponse.json({
      success: true,
      data: newProject,
      message: 'Project berhasil dibuat'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Gagal membuat project' },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id,
      name, 
      client, 
      officer, 
      type, 
      location, 
      description,
      startDate,
      endDate,
      milestone, // new milestone value (enum key uppercase)
      contractValue,
      paymentTerms,
      totalPaid,
      status // allow explicit status changes except finish auto-handled
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID project harus disediakan' },
        { status: 400 }
      );
    }

    // Cek apakah project ada
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cek duplikasi nama (kecuali untuk project yang sedang diupdate)
    if (name && name.trim() !== existingProject.name) {
      const duplicateProject = await prisma.project.findFirst({
        where: { 
          name: { 
            equals: name.trim(), 
            mode: 'insensitive' 
          },
          id: { not: id }
        }
      });

      if (duplicateProject) {
        return NextResponse.json(
          { error: 'Project dengan nama tersebut sudah ada' },
          { status: 400 }
        );
      }
    }

    let progressUpdate: number | undefined;
    let milestoneHistoryCreate: any | undefined;
    let newMilestoneValue = existingProject.milestone;

    if (milestone && milestone !== existingProject.milestone) {
      // validate milestone is allowed
      if (!MILESTONE_WEIGHTS[milestone]) {
        return NextResponse.json({ error: 'Milestone tidak valid' }, { status: 400 });
      }
      newMilestoneValue = milestone;
      progressUpdate = MILESTONE_WEIGHTS[milestone];
      milestoneHistoryCreate = {
        create: {
          previousMilestone: existingProject.milestone,
          newMilestone: milestone,
          progress: progressUpdate,
        }
      };
    }

    // Determine status update: if progress hits 100 or milestone == SELESAI then status FINISH
    let statusUpdate = status || existingProject.status;
    if (progressUpdate === 100 || newMilestoneValue === 'SELESAI') {
      statusUpdate = 'FINISH';
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name: name?.trim() || existingProject.name,
        client: client?.trim() || null,
        officer: officer?.trim() || null,
        type: type?.trim() || null,
        location: location?.trim() || null,
        description: description?.trim() || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        milestone: newMilestoneValue,
        progress: progressUpdate ?? existingProject.progress,
        contractValue: contractValue !== undefined ? (contractValue ? String(contractValue) : null) : existingProject.contractValue,
        paymentTerms: paymentTerms !== undefined ? (paymentTerms?.trim() || null) : existingProject.paymentTerms,
        totalPaid: totalPaid !== undefined ? (totalPaid ? String(totalPaid) : null) : existingProject.totalPaid,
        status: statusUpdate,
        milestoneHistories: milestoneHistoryCreate
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: 'Project berhasil diperbarui'
    });

  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui project' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID project harus disediakan' },
        { status: 400 }
      );
    }

    // Cek apakah project ada
    const existingProject = await prisma.project.findUnique({
      where: { id },
      include: { forms: true }
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cek apakah ada forms yang terkait
    if (existingProject.forms.length > 0) {
      return NextResponse.json(
        { error: 'Tidak dapat menghapus project yang memiliki forms terkait' },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Project berhasil dihapus'
    });

  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus project' },
      { status: 500 }
    );
  }
}
