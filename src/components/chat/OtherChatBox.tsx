import { IMessage } from '@/lib/models/Message';
import { IUser } from '@/lib/models/User';
import React from 'react';

function OtherChatBox({ audience, message }: { audience: IUser; message: IMessage }) {
  return (
    <li key={message._id.toString()} className="m-4">
      <div className="mb-2">
        <span className="mr-1">{audience.nickname}</span>
        <span className="text-sm">
          {audience.age}/{audience.gender}/{audience.major}
        </span>
      </div>
      <div className="flex items-end">
        <div className="max-w-[210px] bg-white rounded-lg p-2"> {message.content}</div>
        <span className="text-xs text-gray-400 ml-2">
          {new Date(message.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </li>
  );
}

export default OtherChatBox;
