import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma, HelpRequest, User } from '@prisma/client';
import {
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol,
} from '@azure/storage-blob';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }

  const { id: requestId } = await context.params;

  try {
    const helpRequest = await prisma.helpRequest.findUnique({
      where: { id: requestId },
      select: {
        id: true,
        video: true,
        description: true,
        status: true,
        sporterId: true,
        trainerId: true,
        allowAiTraining: true,
        sporter: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        trainer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!helpRequest) {
      return NextResponse.json({ error: 'Verzoek niet gevonden' }, { status: 404 });
    }

    if (
      helpRequest.sporterId !== session.user.id &&
      helpRequest.trainerId !== session.user.id
    ) {
      return NextResponse.json({ error: 'Geen toegang tot dit verzoek' }, { status: 403 });
    }

    let videoUrl: string | undefined;

    if (helpRequest.video) {
      const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
      const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
      const containerName = 'videos';

      const credential = new StorageSharedKeyCredential(accountName, accountKey);
      const expiresOn = new Date(Date.now() + 10 * 60 * 1000); // 10 minuten

      const sasToken = generateBlobSASQueryParameters(
        {
          containerName,
          blobName: helpRequest.video,
          permissions: BlobSASPermissions.parse('r'),
          expiresOn,
          protocol: SASProtocol.Https,
        },
        credential
      ).toString();

      videoUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${helpRequest.video}?${sasToken}`;
    }

    return NextResponse.json({
      id: helpRequest.id,
      video: videoUrl,
      description: helpRequest.description,
      status: helpRequest.status,
      sporter: helpRequest.sporter,
      trainer: helpRequest.trainer,
    });
  } catch (err) {
    console.error('[GET /api/request/[id]]', err);
    return NextResponse.json({ error: 'Interne serverfout' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const { status } = await req.json();

    if (!['accepted', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Ongeldige status' }, { status: 400 });
    }

    const helpRequest = await prisma.helpRequest.findUnique({
      where: { id },
    });

    if (!helpRequest || helpRequest.trainerId !== session.user.id) {
      return NextResponse.json({ error: 'Verzoek niet gevonden of geen toegang' }, { status: 404 });
    }

    const creditAmount =
      helpRequest.video && helpRequest.allowAiTraining
        ? 2
        : helpRequest.video
        ? 3
        : 1;

    const operations: (Prisma.Prisma__HelpRequestClient<HelpRequest> | Prisma.Prisma__UserClient<User>)[] = [
      prisma.helpRequest.update({
        where: { id },
        data: { status },
      }),
    ];

    if (status === 'rejected') {
      operations.push(
        prisma.user.update({
          where: { id: helpRequest.sporterId },
          data: { credits: { increment: creditAmount } },
        })
      );
    }

    if (status === 'accepted') {
      operations.push(
        prisma.user.update({
          where: { id: helpRequest.trainerId },
          data: { credits: { increment: creditAmount } },
        })
      );
    }

    await prisma.$transaction(operations);

    return NextResponse.json({ success: true, status });
  } catch (err) {
    console.error('[PATCH /api/request/[id]]', err);
    return NextResponse.json({ error: 'Interne serverfout' }, { status: 500 });
  }
}
