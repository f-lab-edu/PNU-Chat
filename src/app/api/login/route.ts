import { type NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import User from '@/lib/models/User';
import { BASE_URL } from '@/utils/constant';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const result = await User.findOne({ email, password });
  if (result) {
    const token = await new jose.SignJWT({ id: result.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .setIssuedAt()
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const response = NextResponse.redirect(`${BASE_URL}/rooms`);
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: 3600 * 24,
    });
    return response;
  }
  return NextResponse.json({ message: '등록되지 않은 유저입니다.' }, { status: 401 });
}
