import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// GET - Mengambil semua officers atau officer berdasarkan query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (id) {
      // Mengambil officer berdasarkan ID dengan relasi
      const officer = await prisma.officer.findUnique({
        where: { id },
        include: {
          forms: {
            include: {
              project: true,
              items: true
            }
          }
        }
      });

      if (!officer) {
        return NextResponse.json(
          { error: 'Officer tidak ditemukan' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: officer
      });
    }

    // Mengambil semua officers dengan pagination dan search
    const whereClause = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { role: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
        { phone: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const [officers, total] = await Promise.all([
      prisma.officer.findMany({
        where: whereClause,
        include: {
          forms: true
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.officer.count({ where: whereClause })
    ]);

    return NextResponse.json({
      success: true,
      data: officers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Error getting officers:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data officers' },
      { status: 500 }
    );
  }
}

// POST - Membuat officer baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, email, phone } = body;

    // Validasi input
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Nama officer harus diisi' },
        { status: 400 }
      );
    }

    if (!phone || phone.trim() === '') {
      return NextResponse.json(
        { error: 'Nomor telepon harus diisi' },
        { status: 400 }
      );
    }

    // Cek apakah email sudah digunakan (jika email diisi)
    if (email && email.trim() !== '') {
      const existingOfficer = await prisma.officer.findFirst({
        where: { 
          email: { 
            equals: email.trim(), 
            mode: 'insensitive' 
          } 
        }
      });

      if (existingOfficer) {
        return NextResponse.json(
          { error: 'Email sudah digunakan' },
          { status: 400 }
        );
      }
    }

    const newOfficer = await prisma.officer.create({
      data: {
        name: name.trim(),
        role: role?.trim() || 'Officer',
        email: email?.trim() || null,
        phone: phone.trim()
      }
    });

    return NextResponse.json({
      success: true,
      data: newOfficer,
      message: 'Officer berhasil dibuat'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating officer:', error);
    return NextResponse.json(
      { error: 'Gagal membuat officer' },
      { status: 500 }
    );
  }
}

// PUT - Update officer
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, role, email, phone } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID officer harus disediakan' },
        { status: 400 }
      );
    }

    // Cek apakah officer ada
    const existingOfficer = await prisma.officer.findUnique({
      where: { id }
    });

    if (!existingOfficer) {
      return NextResponse.json(
        { error: 'Officer tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cek duplikasi email (jika email diubah)
    if (email && email.trim() !== '' && email.trim() !== existingOfficer.email) {
      const duplicateOfficer = await prisma.officer.findFirst({
        where: { 
          email: { 
            equals: email.trim(), 
            mode: 'insensitive' 
          },
          id: { not: id }
        }
      });

      if (duplicateOfficer) {
        return NextResponse.json(
          { error: 'Email sudah digunakan' },
          { status: 400 }
        );
      }
    }

    const updatedOfficer = await prisma.officer.update({
      where: { id },
      data: {
        name: name?.trim() || existingOfficer.name,
        role: role?.trim() || existingOfficer.role,
        email: email?.trim() || null,
        phone: phone?.trim() || existingOfficer.phone
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedOfficer,
      message: 'Officer berhasil diperbarui'
    });

  } catch (error) {
    console.error('Error updating officer:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui officer' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus officer
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID officer harus disediakan' },
        { status: 400 }
      );
    }

    // Cek apakah officer ada
    const existingOfficer = await prisma.officer.findUnique({
      where: { id },
      include: { forms: true }
    });

    if (!existingOfficer) {
      return NextResponse.json(
        { error: 'Officer tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cek apakah ada forms yang terkait
    if (existingOfficer.forms.length > 0) {
      return NextResponse.json(
        { error: 'Tidak dapat menghapus officer yang memiliki forms terkait' },
        { status: 400 }
      );
    }

    await prisma.officer.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Officer berhasil dihapus'
    });

  } catch (error) {
    console.error('Error deleting officer:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus officer' },
      { status: 500 }
    );
  }
}
