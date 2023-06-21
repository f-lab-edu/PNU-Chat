import { NextRequest, NextResponse } from 'next/server';
import User, { IUser } from '@/lib/models/User';
import ChatRoom, { IChatRoom } from '@/lib/models/ChatRoom';
import * as jose from 'jose';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const userId = (await (await jose.jwtVerify(token as string, new TextEncoder().encode(process.env.JWT_SECRET))).payload.id) as string;
    const user = await User.findOne<IUser>({ _id: userId });
    const roomDetails = await Promise.all(
      user?.chatRooms.map(async (room) => {
        const roomObject = await ChatRoom.findOne<IChatRoom>({ _id: room });
        const receiver =
          roomObject?.from.toString() === userId
            ? await User.findOne<IUser>({ _id: roomObject.to })
            : await User.findOne<IUser>({ _id: roomObject?.from });
        return {
          roomObject,
          receiver: { _id: receiver?._id, age: receiver?.age, nickname: receiver?.nickname, gender: receiver?.gender, major: receiver?.major },
        };
      }) as Iterable<IChatRoom>
    );
    return NextResponse.json(roomDetails, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: '룸 리스트 요청중 에러가 발생하였습니다.' }, { status: 500 });
  }
}
