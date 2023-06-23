import { IMessage } from '@/lib/models/Message';
import { IUser } from '@/lib/models/User';
import localeTime from '@/utils/localeTime';

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
        <span className="text-xs text-gray-400 ml-2">{localeTime(message.createdAt)} </span>
      </div>
    </li>
  );
}

export default OtherChatBox;
