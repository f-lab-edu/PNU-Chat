'use client';

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

  const socketHandler = () => {
    socket.emit('sendMessage', text, params.chatRoom);
    setText('');
  };
  return (
    <>
      <h1>Chat page</h1>
      {messages.map((message) => {
        // 상대방 메시지
        if (audience && message.from.toString() === audience._id.toString()) {
          return (
            <div key={message._id.toString()}>
              <span>
                상대:{audience.nickname}/{audience.age}/{audience.gender}/{audience.major}
              </span>
              <br />
              <span>
                {message.content}:{message.createdAt}
              </span>
            </div>
          );
        }
        return (
          <div key={message._id.toString()}>
            <span>내꺼</span>
            <br />
            <span>
              {message.content}:{message.createdAt}
            </span>
          </div>
        );
      })}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            socketHandler();
          }
        }}
      />
      <button type="button" onClick={() => socketHandler()}>
        버튼
      </button>
    </>
  );
}
