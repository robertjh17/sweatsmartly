// ✅ Bestand: app/api/chat/[requestId]/messages/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth-request';
import {
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol,
} from '@azure/storage-blob';

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
const containerName = 'videos';
const credential = new StorageSharedKeyCredential(accountName, accountKey);

export async function GET(req: NextRequest, props: { params: Promise<{ requestId: string }> }) {
  const params = await props.params;
  const session = await auth(req);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }

  const request = await prisma.helpRequest.findUnique({
    where: { id: params.requestId },
    select: { sporterId: true, trainerId: true },
  });

  if (!request || (request.sporterId !== session.user.id && request.trainerId !== session.user.id)) {
    return NextResponse.json({ error: 'Geen toegang tot deze chat' }, { status: 403 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { requestId: params.requestId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        content: true,
        videoUrl: true,
        senderId: true,
      },
    });

    const formatted = await Promise.all(
      messages.map(async (m) => {
        let signedUrl: string | undefined;

        if (m.videoUrl) {
          const sasToken = generateBlobSASQueryParameters(
            {
              containerName,
              blobName: m.videoUrl,
              permissions: BlobSASPermissions.parse('r'),
              expiresOn: new Date(Date.now() + 10 * 60 * 1000),
              protocol: SASProtocol.Https,
            },
            credential
          ).toString();

          signedUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${m.videoUrl}?${sasToken}`;
        }

        return {
          id: m.id,
          text: m.content,
          sender: m.senderId,
          videoUrl: signedUrl,
        };
      })
    );

    return NextResponse.json({ messages: formatted });
  } catch (error) {
    console.error('[GET /api/chat/[requestId]/messages]', error);
    return NextResponse.json({ error: 'Interne serverfout' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, props: { params: Promise<{ requestId: string }> }) {
  const params = await props.params;

  // ✅ Belangrijk: geef req mee aan de auth functie
  const session = await auth(req);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }

  const request = await prisma.helpRequest.findUnique({
    where: { id: params.requestId },
    select: { sporterId: true, trainerId: true },
  });

  if (!request || (request.sporterId !== session.user.id && request.trainerId !== session.user.id)) {
    return NextResponse.json({ error: 'Geen toegang tot deze chat' }, { status: 403 });
  }

  try {
    const { text } = await req.json();

    const message = await prisma.message.create({
      data: {
        requestId: params.requestId,
        senderId: session.user.id,
        content: text,
      },
      select: {
        id: true,
        content: true,
        videoUrl: true,
        senderId: true,
      },
    });

    return NextResponse.json({
      id: message.id,
      text: message.content,
      sender: message.senderId,
      videoUrl: message.videoUrl,
    });
  } catch (error) {
    console.error('[POST /api/chat/[requestId]/messages]', error);
    return NextResponse.json({ error: 'Interne serverfout' }, { status: 500 });
  }
}

