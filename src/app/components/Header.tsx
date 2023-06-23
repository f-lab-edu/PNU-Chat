import Image from 'next/image';
import backIcon from '../../../public/backIcon.svg';
export default function Header({ title }: { title: string }) {
  return (
    <div>
      <Image alt="backIcon" src={backIcon} width={20} height={20} />
      <h2>{title}</h2>
    </div>
  );
}
