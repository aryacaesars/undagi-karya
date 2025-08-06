import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Mengambil semua vendors atau vendor berdasarkan query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (id) {
      // Mengambil vendor berdasarkan ID
      const vendor = await prisma.vendor.findUnique({
        where: { id }
      });

      if (!vendor) {
        return NextResponse.json(
          { error: 'Vendor tidak ditemukan' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: vendor
      });
    }

    // Mengambil semua vendors dengan pagination dan search
    const whereClause = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { contactPerson: { contains: search, mode: 'insensitive' as const } },
        { phone: { contains: search, mode: 'insensitive' as const } },
        { address: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.vendor.count({ where: whereClause })
    ]);

    return NextResponse.json({
      success: true,
      data: vendors,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Error getting vendors:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data vendors' },
      { status: 500 }
    );
  }
}

// POST - Membuat vendor baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, address, contactPerson, paymentTerms, description } = body;

    // Validasi input
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Nama vendor harus diisi' },
        { status: 400 }
      );
    }

    // Cek apakah vendor dengan nama yang sama sudah ada
    const existingVendor = await prisma.vendor.findFirst({
      where: { 
        name: { 
          equals: name.trim(), 
          mode: 'insensitive' 
        } 
      }
    });

    if (existingVendor) {
      return NextResponse.json(
        { error: 'Vendor dengan nama tersebut sudah ada' },
        { status: 400 }
      );
    }

    const newVendor = await prisma.vendor.create({
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        contactPerson: contactPerson?.trim() || null,
        paymentTerms: paymentTerms?.trim() || null,
        description: description?.trim() || null
      }
    });

    return NextResponse.json({
      success: true,
      data: newVendor,
      message: 'Vendor berhasil dibuat'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating vendor:', error);
    return NextResponse.json(
      { error: 'Gagal membuat vendor' },
      { status: 500 }
    );
  }
}

// PUT - Update vendor
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, phone, address, contactPerson, paymentTerms, description } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID vendor harus disediakan' },
        { status: 400 }
      );
    }

    // Cek apakah vendor ada
    const existingVendor = await prisma.vendor.findUnique({
      where: { id }
    });

    if (!existingVendor) {
      return NextResponse.json(
        { error: 'Vendor tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cek duplikasi nama (kecuali untuk vendor yang sedang diupdate)
    if (name && name.trim() !== existingVendor.name) {
      const duplicateVendor = await prisma.vendor.findFirst({
        where: { 
          name: { 
            equals: name.trim(), 
            mode: 'insensitive' 
          },
          id: { not: id }
        }
      });

      if (duplicateVendor) {
        return NextResponse.json(
          { error: 'Vendor dengan nama tersebut sudah ada' },
          { status: 400 }
        );
      }
    }

    const updatedVendor = await prisma.vendor.update({
      where: { id },
      data: {
        name: name?.trim() || existingVendor.name,
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        contactPerson: contactPerson?.trim() || null,
        paymentTerms: paymentTerms?.trim() || null,
        description: description?.trim() || null
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedVendor,
      message: 'Vendor berhasil diperbarui'
    });

  } catch (error) {
    console.error('Error updating vendor:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui vendor' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus vendor
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID vendor harus disediakan' },
        { status: 400 }
      );
    }

    // Cek apakah vendor ada
    const existingVendor = await prisma.vendor.findUnique({
      where: { id }
    });

    if (!existingVendor) {
      return NextResponse.json(
        { error: 'Vendor tidak ditemukan' },
        { status: 404 }
      );
    }

    await prisma.vendor.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Vendor berhasil dihapus'
    });

  } catch (error) {
    console.error('Error deleting vendor:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus vendor' },
      { status: 500 }
    );
  }
}
