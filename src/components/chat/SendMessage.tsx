import React from 'react';
import { type Socket } from 'socket.io-client';

function SendMessage({ socket, text, setText }: { socket: Socket; text: string; setText: React.Dispatch<React.SetStateAction<string>> }) {
  const socketHandler = () => {
    socket.emit('sendMessage', text);
    setText('');
  };
  return (
    <div className="absolute bottom-0 w-[100%] flex border-b-2 border-b-gray-100">
      <input
        className="pl-5 flex-1 focus:outline-none"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            socketHandler();
          }
        }}
      />
      <button type="button" className="bg-blue-400 rounded text-white p-2 w-[100px]" onClick={() => socketHandler()}>
        전송
      </button>
    </div>
  );
}

export default SendMessage;
