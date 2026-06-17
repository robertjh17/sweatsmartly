// ✅ Bestand: app/api/request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth-request';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await auth(req);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { trainerId, description, video, allowAiTraining } = body;

    if (!trainerId || !description) {
      return NextResponse.json(
        { error: 'trainerId en description zijn verplicht' },
        { status: 400 }
      );
    }

    // 1. Creditkosten berekenen
    let creditCost = 1;
    if (video) {
      creditCost = allowAiTraining ? 2 : 3;
    }

    // 2. Credits controleren
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    });

    if (!user || user.credits < creditCost) {
      return NextResponse.json(
        { error: 'Onvoldoende credits om verzoek te versturen' },
        { status: 402 }
      );
    }

    // 3. Alles in 1 transactie: credits aftrekken + hulpverzoek + eerste bericht
    const result = await prisma.$transaction(async (tx) => {
      const helpRequest = await tx.helpRequest.create({
        data: {
          trainerId,
          sporterId: session.user.id,
          description,
          video,
          allowAiTraining,
        },
      });

      await tx.message.create({
        data: {
          requestId: helpRequest.id,
          senderId: session.user.id,
          content: description,
          videoUrl: video ?? undefined,
        },
      });

      await tx.user.update({
        where: { id: session.user.id },
        data: {
          credits: {
            decrement: creditCost,
          },
        },
      });

      return helpRequest;
    });

    return NextResponse.json({ success: true, request: result });
  } catch (error) {
    console.error('❌ Fout in POST /api/request:', error);
    return NextResponse.json({ error: 'Interne serverfout' }, { status: 500 });
  }
}
