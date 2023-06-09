import { IMessage } from '@/lib/models/Message';
import localeTime from '@/utils/localeTime';

function MyChatBox({ message }: { message: IMessage }) {
  return (
    <li key={message._id.toString()} className="m-5 flex justify-end items-end">
      <span className="text-xs text-gray-400 mr-2">{localeTime(message.createdAt)}</span>
      <div className="max-w-[210px] bg-yellow-300 rounded-lg p-2">{message.content}</div>
    </li>
  );
}

export default MyChatBox;
