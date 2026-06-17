// /api/chat/route.ts (GET)
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth-request';

export async function GET(req: NextRequest) {
  const session = await auth(req); 
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const chats = await prisma.helpRequest.findMany({
    where: {
      OR: [
        { sporterId: session.user.id },
        { trainerId: session.user.id },
      ],
      status: 'accepted',
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      sporter: { select: { firstName: true, lastName: true, image: true, id: true } },
      trainer: { select: { firstName: true, lastName: true, image: true, id: true } },
      messages: {
        take: 1,
        orderBy: { createdAt: 'desc' },
        select: { content: true, createdAt: true },
      },
    },
  });

  const formatted = chats.map(chat => {
    const otherUser = chat.sporter?.id === session.user.id ? chat.trainer : chat.sporter;
    return {
      id: chat.id,
      name: `${otherUser?.firstName} ${otherUser?.lastName}`,
      avatarUrl: otherUser?.image || undefined,
      lastMessage: chat.messages[0]?.content || '',
      updatedAt: chat.messages[0]?.createdAt || undefined,
    };
  });

  return NextResponse.json(formatted);
}
