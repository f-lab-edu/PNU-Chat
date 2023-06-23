import User from '@/lib/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');
  await User.updateOne({ uuid: key }, { isAuthenticated: true });
  const response = NextResponse.json(
    { message: '인증이 완료되었습니다. 서비스로 이동해주세요 :)' },
    {
      status: 200,
    }
  );
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
