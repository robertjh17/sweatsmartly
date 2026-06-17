import { NextResponse } from 'next/server';
import mollieClient from '@mollie/api-client';

const mollie = mollieClient({ apiKey: process.env.MOLLIE_API_KEY! });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    const payment = await mollie.payments.get(id);
    return NextResponse.json({ status: payment.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to get payment status' }, { status: 500 });
  }
}
