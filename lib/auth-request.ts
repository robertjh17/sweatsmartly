import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { getToken } from 'next-auth/jwt';

export async function auth(req: NextRequest) {
  const header = req.headers.get('authorization');
  console.log('➡️ Authorization header ontvangen:', header);

  // ✅ 1. Probeer Bearer token (mobiel)
  if (header?.startsWith('Bearer ')) {
    const token = header.split(' ')[1];
    console.log('🧪 Token:', token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        sub: string;
        role: string;
        email?: string;
      };

      console.log('✅ JWT decoded (mobiel):', decoded);

      return {
        user: {
          id: decoded.sub,
          role: decoded.role,
          email: decoded.email,
        },
      };
    } catch (err) {
      console.warn('❌ JWT verify failed:', err);
      return null;
    }
  }

  // ✅ 2. Probeer NextAuth sessie-cookie (web)
  try {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (session?.sub && session?.role) {
      console.log('✅ Sessiedata van cookie (web):', session);
      return {
        user: {
          id: session.sub,
          role: session.role,
          email: session.email,
        },
      };
    }
  } catch (err) {
    console.error('❌ Fout bij ophalen sessie via cookie:', err);
  }

  // ❌ Geen geldige sessie
  console.warn('❌ Geen geldige sessie gevonden (noch Bearer, noch cookie)');
  return null;
}
