import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get('chatId');
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) return NextResponse.json({ access: false }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };

    const helpRequest = await prisma.helpRequest.findUnique({
      where: { id: chatId || '' },
      select: { sporterId: true, trainerId: true },
    });

    if (
      helpRequest &&
      (helpRequest.sporterId === decoded.sub || helpRequest.trainerId === decoded.sub)
    ) {
      return NextResponse.json({ access: true });
    }

    return NextResponse.json({ access: false }, { status: 403 });
  } catch (err) {
    console.error('❌ JWT fout in check-access:', err);
    return NextResponse.json({ access: false }, { status: 401 });
  }
}
