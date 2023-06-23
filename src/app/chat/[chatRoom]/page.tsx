'use client';

import Header from '@/components/Header';
import MyChatBox from '@/components/chat/MyChatBox';
import OtherChatBox from '@/components/chat/OtherChatBox';
import SendMessage from '@/components/chat/SendMessage';
import { IMessage } from '@/lib/models/Message';
import { IUser } from '@/lib/models/User';
import { useState, useEffect } from 'react';
import io, { type Socket } from 'socket.io-client';

let socket: Socket;
export default function Chat({ params }: { params: { chatRoom: string } }) {
  const [text, setText] = useState<string>('');
  const [messages, setMessage] = useState<IMessage[]>([]);
  const [audience, setAudience] = useState<IUser>();
  useEffect(() => {
    (async () => {
      try {
        fetch(`/api/socket`);
        socket = io({ path: '/socket.io/socket.io', query: { rooms: params.chatRoom } });
        socket.on('connect', () => {
          console.log('SOCKET CONNECTED!', socket.id);
        });
        socket.on('receiveMessage', (message) => {
          setMessage((prev) => [...prev, message]);
        });
        socket.on('roomJoined', (obj) => {
          setMessage(obj.messageLists);
          setAudience(obj.audience);
        });
      } catch (e) {
        console.log(e);
      }
    })();
    return () => {
      socket.disconnect();
    };
  }, [params.chatRoom]);

  return (
    <div className="min-h-[100vh] bg-blue-200 relative pt-[50px] pb-[110px]">
      <Header title={audience?.nickname as string} />
      <ul className="list-none ">
        {messages.map((message) => {
          if (audience && message.from.toString() === audience._id.toString()) {
            return <OtherChatBox key={message._id.toString()} audience={audience} message={message} />;
          }
          return <MyChatBox key={message._id.toString()} message={message} />;
        })}
      </ul>
      <SendMessage socket={socket} text={text} setText={setText} />
    </div>
  );
}
