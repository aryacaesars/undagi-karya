import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// GET - Mengambil semua supply items atau supply item berdasarkan query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (id) {
      // Mengambil supply item berdasarkan ID dengan relasi
      const supplyItem = await prisma.supplyItem.findUnique({
        where: { id },
        include: {
          formItems: {
            include: {
              form: {
                include: {
                  project: true,
                  officer: true
                }
              }
            }
          }
        }
      });

      if (!supplyItem) {
        return NextResponse.json(
          { error: 'Supply item tidak ditemukan' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: supplyItem
      });
    }

    // Mengambil semua supply items dengan pagination dan search
    const whereClause: any = {};
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { specifications: { contains: search, mode: 'insensitive' as const } }
      ];
    }

    const [supplyItems, total] = await Promise.all([
      prisma.supplyItem.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          specifications: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.supplyItem.count({ where: whereClause })
    ]);

    return NextResponse.json({
      success: true,
      data: supplyItems,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Error getting supply items:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data supply items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, specifications } = body;

    // Validasi input
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Nama supply item harus diisi' },
        { status: 400 }
      );
    }

    // Cek apakah supply item dengan nama yang sama sudah ada
    const existingSupplyItem = await prisma.supplyItem.findFirst({
      where: { 
        name: { 
          equals: name.trim(), 
          mode: 'insensitive' 
        } 
      }
    });

    if (existingSupplyItem) {
      return NextResponse.json(
        { error: 'Supply item dengan nama tersebut sudah ada' },
        { status: 400 }
      );
    }

    const newSupplyItem = await prisma.supplyItem.create({
      data: {
        name: name.trim(),
        specifications: specifications?.trim() || null
      }
    });

    return NextResponse.json({
      success: true,
      data: newSupplyItem,
      message: 'Supply item berhasil dibuat'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating supply item:', error);
    return NextResponse.json(
      { error: 'Gagal membuat supply item' },
      { status: 500 }
    );
  }
}

// POST - Import multiple supply items
export async function POST_IMPORT(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Data items harus berupa array dan tidak boleh kosong' },
        { status: 400 }
      );
    }

    // Validasi setiap item
    const validatedItems = [];
    const errors = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const rowNumber = i + 1;

      if (!item.name || item.name.trim() === '') {
        errors.push(`Baris ${rowNumber}: Nama supply item harus diisi`);
        continue;
      }

      if (!item.category || item.category.trim() === '') {
        errors.push(`Baris ${rowNumber}: Kategori harus diisi`);
        continue;
      }

      if (!item.unit || item.unit.trim() === '') {
        errors.push(`Baris ${rowNumber}: Satuan harus diisi`);
        continue;
      }

      validatedItems.push({
        name: item.name.trim(),
        category: item.category.trim(),
        unit: item.unit.trim(),
        specifications: item.specifications?.trim() || null
      });
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validasi gagal', details: errors },
        { status: 400 }
      );
    }

    // Import items dengan createMany
    const result = await prisma.supplyItem.createMany({
      data: validatedItems,
      skipDuplicates: true
    });

    return NextResponse.json({
      success: true,
      data: { imported: result.count },
      message: `${result.count} supply items berhasil diimport`
    }, { status: 201 });

  } catch (error) {
    console.error('Error importing supply items:', error);
    return NextResponse.json(
      { error: 'Gagal mengimport supply items' },
      { status: 500 }
    );
  }
}

// PUT - Update supply item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, specifications } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID supply item harus disediakan' },
        { status: 400 }
      );
    }

    // Cek apakah supply item ada
    const existingSupplyItem = await prisma.supplyItem.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        specifications: true
      }
    });

    if (!existingSupplyItem) {
      return NextResponse.json(
        { error: 'Supply item tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cek duplikasi nama (kecuali untuk item yang sedang diupdate)
    if (name && name.trim() !== existingSupplyItem.name) {
      const duplicateSupplyItem = await prisma.supplyItem.findFirst({
        where: { 
          name: { 
            equals: name.trim(), 
            mode: 'insensitive' 
          },
          id: { not: id }
        }
      });

      if (duplicateSupplyItem) {
        return NextResponse.json(
          { error: 'Supply item dengan nama tersebut sudah ada' },
          { status: 400 }
        );
      }
    }

    const updatedSupplyItem = await prisma.supplyItem.update({
      where: { id },
      data: {
        name: name?.trim() || existingSupplyItem.name,
        specifications: specifications?.trim() || existingSupplyItem.specifications
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedSupplyItem,
      message: 'Supply item berhasil diperbarui'
    });

  } catch (error) {
    console.error('Error updating supply item:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui supply item' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus supply item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID supply item harus disediakan' },
        { status: 400 }
      );
    }

    // Cek apakah supply item ada
    const existingSupplyItem = await prisma.supplyItem.findUnique({
      where: { id },
      include: { formItems: true }
    });

    if (!existingSupplyItem) {
      return NextResponse.json(
        { error: 'Supply item tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cek apakah ada form items yang terkait
    if (existingSupplyItem.formItems.length > 0) {
      return NextResponse.json(
        { error: 'Tidak dapat menghapus supply item yang digunakan dalam forms' },
        { status: 400 }
      );
    }

    await prisma.supplyItem.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Supply item berhasil dihapus'
    });

  } catch (error) {
    console.error('Error deleting supply item:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus supply item' },
      { status: 500 }
    );
  }
}
