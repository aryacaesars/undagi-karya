import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

// GET - Mengambil semua clients atau client berdasarkan query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (id) {
      // Mengambil client berdasarkan ID
      const client = await prisma.client.findUnique({
        where: { id }
      });

      if (!client) {
        return NextResponse.json(
          { error: 'Client tidak ditemukan' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: client
      });
    }

    // Mengambil semua clients dengan pagination dan search
    const whereClause = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { phone: { contains: search, mode: 'insensitive' as const } },
        { address: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.client.count({ where: whereClause })
    ]);

    return NextResponse.json({
      success: true,
      data: clients,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Error getting clients:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data clients' },
      { status: 500 }
    );
  }
}

// POST - Membuat client baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, address } = body;

    // Validasi input
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Nama client harus diisi' },
        { status: 400 }
      );
    }

    // Cek apakah client dengan nama yang sama sudah ada
    const existingClient = await prisma.client.findFirst({
      where: { 
        name: { 
          equals: name.trim(), 
          mode: 'insensitive' 
        } 
      }
    });

    if (existingClient) {
      return NextResponse.json(
        { error: 'Client dengan nama tersebut sudah ada' },
        { status: 409 }
      );
    }

    const newClient = await prisma.client.create({
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
        address: address?.trim() || null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Client berhasil dibuat',
      data: newClient
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { error: 'Gagal membuat client baru' },
      { status: 500 }
    );
  }
}

// PUT - Mengupdate client
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, phone, address } = body;

    // Validasi input
    if (!id) {
      return NextResponse.json(
        { error: 'ID client harus diisi' },
        { status: 400 }
      );
    }

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Nama client harus diisi' },
        { status: 400 }
      );
    }

    // Cek apakah client ada
    const existingClient = await prisma.client.findUnique({
      where: { id }
    });

    if (!existingClient) {
      return NextResponse.json(
        { error: 'Client tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cek apakah nama sudah digunakan oleh client lain
    const duplicateClient = await prisma.client.findFirst({
      where: { 
        name: { 
          equals: name.trim(), 
          mode: 'insensitive' 
        },
        NOT: { id }
      }
    });

    if (duplicateClient) {
      return NextResponse.json(
        { error: 'Client dengan nama tersebut sudah ada' },
        { status: 409 }
      );
    }

    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
        address: address?.trim() || null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Client berhasil diupdate',
      data: updatedClient
    });

  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate client' },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus client
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID client harus diisi' },
        { status: 400 }
      );
    }

    // Cek apakah client ada
    const existingClient = await prisma.client.findUnique({
      where: { id }
    });

    if (!existingClient) {
      return NextResponse.json(
        { error: 'Client tidak ditemukan' },
        { status: 404 }
      );
    }

    await prisma.client.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Client berhasil dihapus'
    });

  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus client' },
      { status: 500 }
    );
  }
}