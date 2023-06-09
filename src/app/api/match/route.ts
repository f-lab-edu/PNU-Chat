import ChatRoom from '@/lib/models/ChatRoom';
import Message from '@/lib/models/Message';
import User, { IUser } from '@/lib/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/utils/constant';
import getUser from '@/utils/getUser';

// 랜덤 한명 선택
async function matching(userId: string, counter: number): Promise<IUser | null> {
  // 임의로 설정한 매칭 시도횟수 배포시 수정 예정
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

export async function POST(req: NextRequest) {
  try {
    const user = await getUser(req);
    const matchTarget = await matching(user._id.toString(), 0);
    const { message } = await req.json();
    const startMessage = new Message({ to: matchTarget?._id, from: user._id, content: message, read: false });
    if (user === null || matchTarget === null) throw new Error('매칭 실패');
    const chatroom = new ChatRoom({ from: user, to: matchTarget, unreadFrom: 0, unreadTo: 0, lastMessage: message, messages: [startMessage] });
    await User.updateOne({ _id: user._id }, { chatRooms: [...user.chatRooms, chatroom._id] });
    await User.updateOne({ _id: matchTarget._id }, { chatRooms: [...matchTarget.chatRooms, chatroom._id] });
    await startMessage.save();
    await chatroom.save();
    return NextResponse.redirect(`${BASE_URL}/chat/${chatroom._id}`);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: '매칭실패' }, { status: 500 });
  }
}
