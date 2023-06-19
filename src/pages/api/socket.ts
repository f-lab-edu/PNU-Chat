import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIO } from 'socket.io';
import { Server as HttpServer } from 'http';
import type { Socket as NetSocket, Server as NetServer } from 'net';
import ChatRoom, { IChatRoom } from '@/lib/models/ChatRoom';
import * as jose from 'jose';
import User, { IUser } from '@/lib/models/User';
import Message, { IMessage } from '@/lib/models/Message';
import { v4 as uuidv4 } from 'uuid';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

type NextResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: NetServer & {
      io: SocketIO;
    };
  };
};

interface SocketData {
  sender: IUser;
  receiver: IUser;
  room: IChatRoom;
}

async function saveMessage(sender: IUser, roomModel: IChatRoom, message: string) {
  try {
    if (sender && roomModel) {
      if (sender._id.toString() === roomModel.from.toString()) {
        const messageInstance = new Message({
          from: sender._id,
          to: roomModel.to,
          content: message,
          createdAt: Date.now(),
        });
        await messageInstance.save();
        await ChatRoom.updateOne(
          { _id: roomModel._id },
          {
            $push: { messages: messageInstance },
            $set: {
              lastMessage: message,
            },
            $inc: {
              unreadFrom: 1,
            },
          }
        );
      } else {
        const messageInstance = new Message({
          from: sender._id,
          to: roomModel.from,
          content: message,
          createdAt: Date.now(),
        });
        await messageInstance.save();
        await ChatRoom.updateOne(
          { _id: roomModel._id },
          {
            $push: { messages: messageInstance },
            $set: {
              lastMessage: message,
            },
            $inc: {
              unreadTo: 1,
            },
          }
        );
        await messageInstance.save();
      }
    }
  } catch (e) {
    console.error(e);
    throw new Error('메시지 저장 과정에서 에러가 발생하였습니다.');
  }
}

export default function handler(req: NextApiRequest, res: NextResponseServerIO) {
  const httpServer: HttpServer = res.socket.server as any;
  const io = new SocketIO<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, SocketData>(httpServer);
  res.socket.server.io = io;

  io.use(async (socket, next) => {
    try {
      const curRoom = socket.handshake.query.rooms;
      const token = socket.handshake.headers.cookie?.split('=')[1];
      const userId = (await (await jose.jwtVerify(token as string, new TextEncoder().encode(process.env.JWT_SECRET))).payload.id) as string;
      const sender = await User.findOne<IUser>({ _id: userId });
      const roomModel = await ChatRoom.findOne<IChatRoom>({ _id: curRoom });
      const receiver =
        sender?._id.toString() === roomModel?.from.toString()
          ? await User.findOne<IUser>({ _id: roomModel?.to })
          : await User.findOne<IUser>({ _id: roomModel?.from });
      if (sender && roomModel && receiver) {
        socket.data.sender = sender;
        socket.data.room = roomModel;
        socket.data.receiver = receiver;
        next();
      }
    } catch (e) {
      console.log(e);
    }
  });

  io.on('connection', async (socket) => {
    try {
      if (!socket.data.room) throw new Error('룸을 찾을 수 없습니다.');
      socket.join(socket.data.room._id.toString());
      const messageLists = await Promise.all(
        socket.data.room?.messages.map((message) => Message.findOne({ _id: message._id })) as Iterable<IMessage>
      );
      io.to(socket.data.room._id.toString()).emit('roomJoined', { messageLists, audience: socket.data.receiver });

      socket.on('sendMessage', async (message: string) => {
        console.log(socket?.data?.sender?.nickname);
        // 메시지 send
        if (!socket.data.sender) throw new Error('유저를 찾을 수 없습니다.');
        if (!socket.data.room) throw new Error('룸을 찾을 수 없습니다.');

        await saveMessage(socket.data.sender, socket.data.room, message);
        console.log('server socket:', message);
        io.to(socket.data.room._id.toString()).emit('receiveMessage', {
          content: message,
          _id: uuidv4(),
          from: socket.data.sender?._id,
          to: socket.data.receiver?._id,
          createdAt: Date.now(),
        });
      });
    } catch (e) {
      console.log(e);
    }
  });
  return res.status(200).json('소켓 연결됨');
}
