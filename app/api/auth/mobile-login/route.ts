import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email en wachtwoord zijn verplicht.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
      return NextResponse.json(
        { error: 'Ongeldige inloggegevens.' },
        { status: 401 }
      );
    }

    // Alleen trainers moeten goedgekeurd zijn
    if (user.role === 'TRAINER' && !user.approved) {
      return NextResponse.json(
        { error: 'Je account is nog niet goedgekeurd door een beheerder.' },
        { status: 403 }
      );
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Fout in mobile-login API:', err);
    return NextResponse.json({ error: 'Interne serverfout' }, { status: 500 });
  }
}
