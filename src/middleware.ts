import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needTokenPageUrl = ['/match', '/rooms', '/profile'];

  if (needTokenPageUrl.includes(pathname) || /\/api\/.*/.test(pathname)) {
    const confirmedUrl = ['/api/login', '/api/signup'];
    if (!confirmedUrl.includes(pathname)) {
      const token = req.cookies.get('token');
      // 토큰이 필요한 경우
      try {
        if (token && process.env.JWT_SECRET) {
          const decoded = await jose.jwtVerify(token?.value as string, new TextEncoder().encode(process.env.JWT_SECRET));
          if (decoded) return NextResponse.next();
        }
        throw new Error('No Token');
        // 토큰이 없으면
      } catch (error) {
        return NextResponse.redirect('http://localhost:3000/auth/login');
      }
    }
  }
  return NextResponse.next();
}
