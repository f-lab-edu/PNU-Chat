import { IMessage } from '@/lib/models/Message';
import React from 'react';

function MyChatBox({ message }: { message: IMessage }) {
  return (
    <li key={message._id.toString()} className="m-5 text-end">
      <span className="text-xs text-gray-400 mr-2">
        {new Date(message.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
      </span>
      <span className="bg-yellow-300 rounded-lg p-2">{message.content}</span>
    </li>
  );
}

export default MyChatBox;
