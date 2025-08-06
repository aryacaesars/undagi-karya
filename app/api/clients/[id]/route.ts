import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../lib/generated/prisma';

const prisma = new PrismaClient();

// GET - Mengambil detail client berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validasi parameter ID
    if (!id || id.trim() === '') {
      return NextResponse.json(
        { 
          success: false,
          error: 'ID client harus diisi' 
        },
        { status: 400 }
      );
    }

    // Mencari client berdasarkan ID
    const client = await prisma.client.findUnique({
      where: { 
        id: id.trim() 
      }
    });

    // Jika client tidak ditemukan
    if (!client) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Client tidak ditemukan' 
        },
        { status: 404 }
      );
    }

    // Return client data
    return NextResponse.json({
      success: true,
      data: client,
      message: 'Detail client berhasil diambil'
    });

  } catch (error) {
    console.error('Error getting client detail:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Gagal mengambil detail client' 
      },
      { status: 500 }
    );
  }
}

// PUT - Mengupdate client berdasarkan ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, phone, address } = body;

    // Validasi parameter ID
    if (!id || id.trim() === '') {
      return NextResponse.json(
        { 
          success: false,
          error: 'ID client harus diisi' 
        },
        { status: 400 }
      );
    }

    // Validasi input nama
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Nama client harus diisi' 
        },
        { status: 400 }
      );
    }

    // Cek apakah client ada
    const existingClient = await prisma.client.findUnique({
      where: { id: id.trim() }
    });

    if (!existingClient) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Client tidak ditemukan' 
        },
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
        NOT: { id: id.trim() }
      }
    });

    if (duplicateClient) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Client dengan nama tersebut sudah ada' 
        },
        { status: 409 }
      );
    }

    // Update client
    const updatedClient = await prisma.client.update({
      where: { id: id.trim() },
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
        address: address?.trim() || null
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedClient,
      message: 'Client berhasil diupdate'
    });

  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Gagal mengupdate client' 
      },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus client berdasarkan ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validasi parameter ID
    if (!id || id.trim() === '') {
      return NextResponse.json(
        { 
          success: false,
          error: 'ID client harus diisi' 
        },
        { status: 400 }
      );
    }

    // Cek apakah client ada
    const existingClient = await prisma.client.findUnique({
      where: { id: id.trim() }
    });

    if (!existingClient) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Client tidak ditemukan' 
        },
        { status: 404 }
      );
    }

    // Hapus client
    await prisma.client.delete({
      where: { id: id.trim() }
    });

    return NextResponse.json({
      success: true,
      message: 'Client berhasil dihapus',
      data: { id: id.trim() }
    });

  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Gagal menghapus client' 
      },
      { status: 500 }
    );
  }
}