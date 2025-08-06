import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// POST - Import multiple supply items
export async function POST(request: NextRequest) {
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
        errors.push(`Baris ${rowNumber}: Nama item harus diisi`);
        continue;
      }

      validatedItems.push({
        name: item.name.trim(),
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
