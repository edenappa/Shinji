import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { initiateStripeCheckout } from '../lib/stripe';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) setUser(data.user);
  };

  const handleSubscribe = () => {
    initiateStripeCheckout(email);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>SilentService / Shinji</h1>
      {!user ? (
        <>
          <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignIn}>로그인</button>
        </>
      ) : (
        <>
          <p>{user.email}님, 환영합니다.</p>
          <button onClick={handleSubscribe}>신지 구독하기</button>
          <iframe src={process.env.NEXT_PUBLIC_SHINJI_GPT_URL} width="100%" height="600" />
        </>
      )}
    </main>
  );
}