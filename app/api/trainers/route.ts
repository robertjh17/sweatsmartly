// app/api/trainers/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const trainers = await prisma.user.findMany({
      where: {
        role: 'trainer',
        approved: true,
      },
      orderBy: {
        rating: 'desc',
      },
      take: 5,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        image: true,
        rating: true,
      },
    });

    return NextResponse.json({ trainers }); // ✅ bevat correct firstName & lastName
  } catch (err) {
    console.error('[API/trainers]', err);
    return NextResponse.json({ error: 'Interne serverfout' }, { status: 500 });
  }
}
