import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// GET - Mengambil semua forms atau form berdasarkan query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (id) {
      // Mengambil form berdasarkan ID dengan relasi
      const form = await prisma.form.findUnique({
        where: { id },
        include: {
          project: true,
          officer: true,
          items: {
            include: {
              supplyItem: true
            }
          }
        }
      });

      if (!form) {
        return NextResponse.json(
          { error: 'Form tidak ditemukan' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: form
      });
    }

    // Mengambil semua forms dengan pagination dan search
    const whereClause = search ? {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { type: { contains: search, mode: 'insensitive' as const } },
        { formNumber: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const [forms, total] = await Promise.all([
      prisma.form.findMany({
        where: whereClause,
        include: {
          project: true,
          officer: true,
          items: {
            include: {
              supplyItem: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.form.count({ where: whereClause })
    ]);

    return NextResponse.json({
      success: true,
      data: forms,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Error getting forms:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data forms' },
      { status: 500 }
    );
  }
}

// POST - Membuat form baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title,
      type, 
      submissionDate, 
      description, 
      notes, 
      projectId, 
      officerId,
      items 
    } = body;

    // Validasi input
    if (!type || type.trim() === '') {
      return NextResponse.json(
        { error: 'Tipe form harus diisi' },
        { status: 400 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        { error: 'Proyek harus dipilih' },
        { status: 400 }
      );
    }

    if (!officerId) {
      return NextResponse.json(
        { error: 'Petugas proyek harus dipilih' },
        { status: 400 }
      );
    }

    if (!submissionDate) {
      return NextResponse.json(
        { error: 'Tanggal pengajuan harus diisi' },
        { status: 400 }
      );
    }

    // Generate form number
    const currentYear = new Date().getFullYear();
    const formCount = await prisma.form.count({
      where: {
        createdAt: {
          gte: new Date(`${currentYear}-01-01`),
          lt: new Date(`${currentYear + 1}-01-01`)
        }
      }
    });
    const formNumber = `FORM-${currentYear}-${String(formCount + 1).padStart(3, '0')}`;

    // Buat form dengan items
    const newForm = await prisma.form.create({
      data: {
        formNumber,
        title: title?.trim() || null,
        type: type.trim(),
        submissionDate: new Date(submissionDate),
        description: description?.trim() || null,
        notes: notes?.trim() || null,
        projectId,
        officerId,
        items: {
          create: items?.map((item: any) => ({
            quantity: parseInt(item.quantity),
            unit: item.unit,
            specifications: item.specifications || null,
            notes: item.notes || null,
            supplyItemId: item.supplyItemId
          })) || []
        }
      },
      include: {
        project: true,
        officer: true,
        items: {
          include: {
            supplyItem: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: newForm,
      message: 'Form berhasil dibuat'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating form:', error);
    return NextResponse.json(
      { error: 'Gagal membuat form' },
      { status: 500 }
    );
  }
}

// PUT - Update form
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id,
      title,
      type, 
      submissionDate, 
      description, 
      notes, 
      projectId, 
      officerId,
      items 
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID form harus disediakan' },
        { status: 400 }
      );
    }

    // Cek apakah form ada
    const existingForm = await prisma.form.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!existingForm) {
      return NextResponse.json(
        { error: 'Form tidak ditemukan' },
        { status: 404 }
      );
    }

    // Update form dengan menghapus items lama dan membuat yang baru
    const updatedForm = await prisma.form.update({
      where: { id },
      data: {
        title: title?.trim() || null,
        type: type.trim(),
        submissionDate: new Date(submissionDate),
        description: description?.trim() || null,
        notes: notes?.trim() || null,
        projectId,
        officerId,
        items: {
          deleteMany: {},
          create: items?.map((item: any) => ({
            quantity: parseInt(item.quantity),
            unit: item.unit,
            specifications: item.specifications || null,
            notes: item.notes || null,
            supplyItemId: item.supplyItemId
          })) || []
        }
      },
      include: {
        project: true,
        officer: true,
        items: {
          include: {
            supplyItem: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedForm,
      message: 'Form berhasil diperbarui'
    });

  } catch (error) {
    console.error('Error updating form:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui form' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus form
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID form harus disediakan' },
        { status: 400 }
      );
    }

    // Cek apakah form ada
    const existingForm = await prisma.form.findUnique({
      where: { id }
    });

    if (!existingForm) {
      return NextResponse.json(
        { error: 'Form tidak ditemukan' },
        { status: 404 }
      );
    }

    // Hapus form (items akan terhapus otomatis karena cascade)
    await prisma.form.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Form berhasil dihapus'
    });

  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus form' },
      { status: 500 }
    );
  }
}
