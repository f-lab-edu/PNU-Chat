import { BASE_URL } from '@/utils/constant';
import mailer from '@/utils/mailer';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import User, { IUser } from '@/lib/models/User';

async function submitForm(data: FormData) {
  'use server';

  const uuid = uuidv4();
  const email = data.get('email');
  const age = data.get('age');
  const gender = data.get('gender');
  const major = data.get('major');
  const password = data.get('password');
  const nickname = data.get('nickname');

  const checkUserExist = await User.findOne<IUser>({ email });
  if (!checkUserExist) {
    await new User({ email: `${email}@pusan.ac.kr`, nickname, age, gender, major, password, uuid, isAuthenticated: false, chatRooms: [] }).save();
  } else {
    if (checkUserExist.isAuthenticated) {
      alert('회원가입된 유저입니다.');
      return;
    }
    await User.updateOne({ email }, { uuid });
  }

  await mailer.sendMail({
    from: `"PNUCHAT👻"${process.env.MAILER_EMAIL}`,
    to: `${email}@pusan.ac.kr`,
    subject: 'PNU CHAT 회원가입 인증',
    html: `<h1>회원가입 인증😄</h1>
    <p1>아래 버튼을 클릭하시면 인증이 완료됩니다.</p1>
    <form action='${BASE_URL}/api/config'>
    <input type="hidden" name="key" value=${uuid} method="PUT"/>
    <button onclick="(e)=>{e.preventDefault() alert('인증이 완료되었습니다')">인증하기</button>
    </form>
    `,
  });
  redirect('auth/authenticated');
}

const majorList = [
  '인문대학',
  '사회과학대학',
  '자연과학대학',
  '공과대학',
  '법과대학',
  '사범대학',
  '상과대학',
  '약학대학',
  '의과대학',
  '치과대학',
  '예술대학',
  '생활환격대학',
  '스포츠과학부',
  '관광컨벤션학부',
  '나노과학기술대학',
  '생명자원과학대학',
  '간호대학',
  '생활과학대학',
  '경제통상대학',
  '이공대학',
  '사회문화대학',
  '정보의생명공학대학',
];
export default async function AuthSignUp() {
  return (
    <form action={submitForm} method="POST" className="pt-[50px] px-4">
      <label htmlFor="email" className="h-5">
        <span className="inputTitle">아이디</span>
        <input
          className="authInput"
          type="text"
          name="email"
          id="email"
          pattern="[0-9a-zA-Z_-][^@]{3,}$"
          placeholder="학교 이메일을 입력해주세요"
          title="가입을 위해 부산대학교 이메일을 입력해주세요."
          required
        />
        @pusan.ac.kr
      </label>
      <br />
      <label htmlFor="password">
        <span className="inputTitle">비밀번호</span>
        <input
          className="authInput"
          type="password"
          name="password"
          id="password"
          pattern="^[0-9a-zA-Z]{8,16}$"
          placeholder="비밀번호를 입력해주세요"
          title="최소 8자리에서 최대 16자리까지 숫자, 영문 대소문자로 이루어진 비밀번호를 입력해주세요."
          required
        />
      </label>
      <br />
      <label htmlFor="nickname">
        <span className="inputTitle">닉네임</span>
        <input className="authInput" type="text" name="nickname" id="nickname" placeholder="닉네임을 입력해주세요." required />
      </label>
      <br />
      <label htmlFor="major">
        <span className="inputTitle">소속대학</span>
        <select name="major" id="major" className="authInput">
          {majorList.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label htmlFor="age">
        <span className="inputTitle">나이</span>
        <input type="number" name="age" id="age" min={19} className="authInput" />
      </label>
      <br />
      <label htmlFor="gender">
        <span className="inputTitle">성별</span>
        <select name="gender" id="gender" className="authInput">
          <option value="남">남</option>
          <option value="여">여</option>
        </select>
      </label>
      <br />
      <button className="authBtn " type="submit">
        완료하기
      </button>
    </form>
  );
}
