export default function localeTime(time: number) {
  return new Date(time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}
