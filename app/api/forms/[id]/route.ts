import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Mengambil form berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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

  } catch (error) {
    console.error('Error getting form:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data form' },
      { status: 500 }
    );
  }
}

// PUT - Update form berdasarkan ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
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

    // Update form
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

// DELETE - Hapus form berdasarkan ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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

    // Hapus form
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
