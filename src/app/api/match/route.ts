import ChatRoom from '@/lib/models/ChatRoom';
import User, { IUser } from '@/lib/models/User';
import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import { BASE_URL } from '@/utils/constant';

// 랜덤 한명 선택
async function matching(userId: string, counter: number): Promise<IUser | null> {
  if (counter > 5) return null;
  const matchTarget = await User.aggregate<IUser>([{ $sample: { size: 1 } }]);
  if (matchTarget[0]._id.toString() === userId) return matching(userId, counter + 1);
  const isExist = await ChatRoom.findOne({
    $or: [
      { from: userId, to: matchTarget[0]._id },
      { from: matchTarget[0]._id, to: userId },
    ],
  });
  if (isExist) return matching(userId, counter + 1);
  return matchTarget[0];
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const userId = (await (await jose.jwtVerify(token as string, new TextEncoder().encode(process.env.JWT_SECRET))).payload.id) as string;
    const matchTarget = await matching(userId, 0);
    const user = await User.findOne<IUser>({ _id: userId });
    const chatroom = new ChatRoom({ from: user, to: matchTarget, unreadFrom: 0, unreadTo: 0, lastMessage: '' });
    if (user === null || matchTarget === null) throw new Error('매칭 실패');
    await User.updateOne({ _id: user._id }, { chatRooms: [...user.chatRooms, chatroom._id] });
    await User.updateOne({ _id: matchTarget._id }, { chatRooms: [...matchTarget.chatRooms, chatroom._id] });
    await chatroom.save();
    // const rediretURL = new URL(`/chat/${chatroom.id}`, req.url);
    return NextResponse.redirect(`${BASE_URL}/chat/${chatroom._id}`);
  } catch (e) {
    // console.log(e);
    return NextResponse.json({ message: '매칭실패' }, { status: 500 });
  }
}
