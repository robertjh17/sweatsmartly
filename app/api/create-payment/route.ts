import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import mollieClient from '@mollie/api-client'
import { creditPackages, CreditPackageId } from '@/lib/creditPackages'

const mollie = mollieClient({ apiKey: process.env.MOLLIE_API_KEY! })

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { packageId, redirectUrl, invoiceInfo } = await req.json()

  // Type-check en runtime check op packageId
  if (
    !packageId ||
    typeof packageId !== 'string' ||
    !(packageId in creditPackages)
  ) {
    return NextResponse.json({ error: 'Invalid or missing packageId' }, { status: 400 })
  }

  const safePackageId = packageId as CreditPackageId
  const selectedPack = creditPackages[safePackageId]
  const { price, credits } = selectedPack

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    // 1. Factuurgegevens opslaan
    const savedInvoice = await prisma.invoiceInfo.create({
      data: {
        userId: user.id,
        fullName: invoiceInfo.fullName,
        companyName: invoiceInfo.companyName || null,
        street: invoiceInfo.street,
        postalCode: invoiceInfo.postalCode,
        city: invoiceInfo.city,
        country: invoiceInfo.country,
        vatNumber: invoiceInfo.vatNumber || null,
        phone: invoiceInfo.phone,
        email: invoiceInfo.email,
      },
    })

    // 2. Mollie betaling aanmaken
    const payment = await mollie.payments.create({
      amount: {
        currency: 'EUR',
        value: price,
      },
      description: `${credits} credits`,
      redirectUrl,
      webhookUrl: process.env.MOLLIE_WEBHOOK_URL,
      metadata: {
        userId: user.id,
        invoiceInfoId: savedInvoice.id,
        packageId: safePackageId,
      },
    })

    // 3. Opslaan in eigen database
    await prisma.payment.create({
      data: {
        mollieId: payment.id,
        amount: price,
        description: `${credits} credits`,
        status: payment.status,
        userId: user.id,
        invoiceInfoId: savedInvoice.id,
      },
    })

    return NextResponse.json({
      id: payment.id,
      checkoutUrl: payment._links.checkout?.href,
    })
  } catch (err) {
    console.error('❌ Mollie fout:', err)
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 })
  }
}
