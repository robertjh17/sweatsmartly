import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      specialisatie,
      ervaring,
      certificaat,
      captchaToken,
    } = body;

    // ⛔ Validatie
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !specialisatie ||
      !ervaring ||
      !certificaat ||
      !captchaToken
    ) {
      return NextResponse.json(
        { message: 'Verplichte velden ontbreken.' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'Wachtwoorden komen niet overeen.' },
        { status: 400 }
      );
    }

    // ✅ Captcha check
    const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    });

    const captchaJson = await captchaRes.json();
    if (!captchaJson.success || (captchaJson.score !== undefined && captchaJson.score < 0.5)) {
      return NextResponse.json({ message: "Captcha validatie mislukt." }, { status: 400 });
    }

    // ❗ Bestaat gebruiker al?
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Er bestaat al een account met dit e-mailadres.' },
        { status: 400 }
      );
    }

    // 🔐 Wachtwoord hashen
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Certificaatnaam extraheren (tijdelijk)
    const certificaatNaam = certificaat?.[0]?.name || 'certificaat.pdf';

    // 📦 Opslaan in database met approved: false
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword,
        role: 'trainer',
        approved: false,
        specialisatie,
        ervaring,
        certificaat: certificaatNaam,
      },
    });

    return NextResponse.json(
      { message: 'Trainerregistratie succesvol verzonden. Je wordt beoordeeld door een admin.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Fout bij trainerregistratie:', error);
    return NextResponse.json(
      { message: 'Interne serverfout bij registratie.' },
      { status: 500 }
    );
  }
}
