import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: trainerId } = await context.params;

  try {
    const trainer = await prisma.user.findUnique({
      where: { id: trainerId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!trainer) {
      return NextResponse.json({ error: 'Trainer niet gevonden' }, { status: 404 });
    }

    return NextResponse.json(trainer);
  } catch (error) {
    console.error('Fout bij ophalen trainer:', error);
    return NextResponse.json({ error: 'Interne serverfout' }, { status: 500 });
  }
}
