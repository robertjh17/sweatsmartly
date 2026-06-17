// app/api/trainer/requests/pending/route.ts
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }

  const trainerId = session.user.id;

  try {
    const requests = await prisma.helpRequest.findMany({
      where: {
        trainerId,
        status: 'pending',
      },
      include: {
        sporter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Fout bij ophalen verzoeken:', error);
    return NextResponse.json({ error: 'Interne serverfout' }, { status: 500 });
  }
}
