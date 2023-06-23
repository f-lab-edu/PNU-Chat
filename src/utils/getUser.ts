import * as jose from 'jose';
import User, { IUser } from '@/lib/models/User';
import { NextRequest } from 'next/server';

export default async function getUser(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (token) {
    try {
      const userId = (await (await jose.jwtVerify(token as string, new TextEncoder().encode(process.env.JWT_SECRET))).payload.id) as string;
      const user = await User.findOne<IUser>({ _id: userId });
      if (user == null) throw new Error('유저가 존재하지않습니다.');
      return user;
    } catch (e) {
      console.log(e);
      throw new Error('유저 검증에 실패하였습니다');
    }
  }
  throw new Error('토큰이 존재하지 않습니다.');
}
