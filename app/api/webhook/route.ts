import { NextResponse } from 'next/server';
import mollieClient from '@mollie/api-client';
import { prisma } from '@/lib/prisma';
import { creditPackages } from '@/lib/creditPackages';

const mollie = mollieClient({ apiKey: process.env.MOLLIE_API_KEY! });

export async function POST(req: Request) {
  const body = await req.formData();
  const id = body.get('id') as string;

  if (!id) {
    return NextResponse.json({ error: 'Missing payment ID' }, { status: 400 });
  }

  console.log('🔔 Mollie webhook ontvangen voor betaling:', id);

  try {
    const molliePayment = await mollie.payments.get(id);
    console.log('📦 Betalingsstatus van Mollie:', molliePayment.status);

    if (molliePayment.status !== 'paid') {
      return new NextResponse('Betaling nog niet voldaan (status: ' + molliePayment.status + ')');
    }

    const existingPayment = await prisma.payment.findUnique({
      where: { mollieId: id },
    });

    if (!existingPayment) {
      return NextResponse.json({ error: 'Betaling niet gevonden in DB' }, { status: 404 });
    }

    if (existingPayment.status === 'paid') {
      return new NextResponse('Betaling was al verwerkt');
    }

    const packId = molliePayment.metadata?.packageId as keyof typeof creditPackages;
    const creditAmount = creditPackages[packId]?.credits;

    if (!creditAmount) {
      console.error('❌ Onbekend creditpakket:', packId);
      console.error('📦 Metadata:', molliePayment.metadata);
      return NextResponse.json({ error: 'Creditpakket onbekend' }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: existingPayment.userId },
        data: {
          credits: { increment: creditAmount },
        },
      }),
      prisma.payment.update({
        where: { mollieId: id },
        data: {
          status: 'paid',
        },
      }),
    ]);

    console.log(`✅ ${creditAmount} credits toegevoegd aan user ${existingPayment.userId}`);

    return new NextResponse('Credits toegevoegd');
  } catch (error) {
    console.error('❌ Fout in Mollie webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
