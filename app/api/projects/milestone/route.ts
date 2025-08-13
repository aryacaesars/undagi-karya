import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';
import { MILESTONE_WEIGHTS } from '@/lib/utils';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, milestone, note } = body;
    if (!id || !milestone) {
      return NextResponse.json({ error: 'ID dan milestone harus disediakan' }, { status: 400 });
    }
    if (!MILESTONE_WEIGHTS[milestone]) {
      return NextResponse.json({ error: 'Milestone tidak valid' }, { status: 400 });
    }
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json({ error: 'Project tidak ditemukan' }, { status: 404 });
    }

    const progress = MILESTONE_WEIGHTS[milestone];
    const status = progress === 100 ? 'FINISH' : project.status === 'TERMINATED' ? 'TERMINATED' : project.status; // don't auto-change terminated

    const updated = await prisma.project.update({
      where: { id },
      data: {
        milestone,
        progress,
        status: status === 'TERMINATED' ? 'TERMINATED' : (progress === 100 ? 'FINISH' : project.status),
        milestoneHistories: {
          create: {
            previousMilestone: project.milestone,
            newMilestone: milestone,
            progress,
            note: note || null,
          }
        }
      },
      include: {
        milestoneHistories: { orderBy: { changedAt: 'desc' } }
      }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error('Error updating milestone', e);
    return NextResponse.json({ error: 'Gagal update milestone' }, { status: 500 });
  }
}
