// login.jsx — 로그인 (/auth/login)
function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ flex: '0 0 auto' }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}
function KakaoBubble({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: '0 0 auto' }}>
      <path fill="#3C1E1E" d="M12 3C6.9 3 2.8 6.2 2.8 10.2c0 2.5 1.7 4.7 4.2 6L6 19.6c-.1.4.3.7.6.5l4-2.6c.4 0 .9.1 1.4.1 5.1 0 9.2-3.2 9.2-7.4S17.1 3 12 3z" />
    </svg>
  );
}
function SocialBtn({ children, bg, color, border, icon }) {
  return (
    <button style={{
      width: '100%', height: 52, borderRadius: 'var(--radius-md)', cursor: 'pointer',
      background: bg, color, border: border || 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15.5, position: 'relative',
    }}>
      <span style={{ position: 'absolute', left: 18, display: 'inline-flex' }}>{icon}</span>
      {children}
    </button>
  );
}

function LoginScreen() {
  const deco = ['토마토 빠네 파스타', '단호박 크림수프', '들기름 막국수'];
  return (
    <div style={{ width: '100%', height: 820, display: 'flex', fontFamily: 'var(--font-sans)', background: '#fff', overflow: 'hidden' }}>
      {/* left brand panel */}
      <div style={{
        width: 620, flex: '0 0 auto', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(150deg, #FEEEE5 0%, #FEE6C6 55%, #FED3F7 100%)',
        padding: '48px 52px', display: 'flex', flexDirection: 'column',
      }}>
        <Logo markSize={34} wordSize={23} />

        {/* decorative floating cards */}
        <div style={{ position: 'absolute', top: 150, right: -40, transform: 'rotate(6deg)' }}>
          <div style={{ width: 230, background: '#fff', borderRadius: 16, padding: 12, boxShadow: 'var(--shadow-strong)' }}>
            <FoodImg seed={deco[0]} height={130} radius={10} iconSize={30} />
            <div style={{ fontWeight: 700, fontSize: 14, marginTop: 10 }}>토마토 빠네 파스타</div>
            <div style={{ fontWeight: 500, fontSize: 12, color: 'var(--color-text-neutral-tertiary)', marginTop: 3 }}>이서준 · 30분</div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 360, left: 40, transform: 'rotate(-5deg)' }}>
          <div style={{ width: 210, background: '#fff', borderRadius: 16, padding: 12, boxShadow: 'var(--shadow-strong)' }}>
            <FoodImg seed={deco[1]} height={118} radius={10} iconSize={28} />
            <div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 10 }}>단호박 크림수프</div>
            <div style={{ fontWeight: 500, fontSize: 11.5, color: 'var(--color-text-neutral-tertiary)', marginTop: 3 }}>한소희 · 30분</div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', position: 'relative', zIndex: 2 }}>
          <h2 style={{ margin: '0 0 14px', fontWeight: 800, fontSize: 34, lineHeight: 1.3, letterSpacing: '-0.025em', color: 'var(--color-text-neutral-primary)' }}>
            오늘의 레시피를<br />기록하고 나누는 곳
          </h2>
          <p style={{ margin: 0, fontWeight: 500, fontSize: 16, lineHeight: 1.6, color: 'var(--color-text-neutral-secondary)', maxWidth: 380 }}>
            나만의 요리를 단계별로 남기고, 좋아하는 크리에이터를 구독해보세요.
          </p>
        </div>
      </div>

      {/* right login form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: 380 }}>
          <h1 style={{ margin: '0 0 8px', fontWeight: 800, fontSize: 28, letterSpacing: '-0.025em' }}>시작하기</h1>
          <p style={{ margin: '0 0 36px', fontWeight: 400, fontSize: 15.5, color: 'var(--color-text-neutral-secondary)' }}>
            소셜 계정으로 3초 만에 시작하세요.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SocialBtn bg="#fff" color="var(--color-text-neutral-primary)" border="1px solid var(--color-line-normal-normal)" icon={<GoogleG size={19} />}>
              Google로 계속하기
            </SocialBtn>
            <SocialBtn bg="#FEE500" color="#3C1E1E" icon={<KakaoBubble size={19} />}>
              카카오로 계속하기
            </SocialBtn>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '28px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--color-line-normal-normal)' }} />
            <span style={{ fontWeight: 500, fontSize: 13, color: 'var(--color-text-neutral-assistive)' }}>안전한 소셜 로그인</span>
            <div style={{ flex: 1, height: 1, background: 'var(--color-line-normal-normal)' }} />
          </div>

          <p style={{ margin: 0, fontWeight: 400, fontSize: 13, lineHeight: 1.65, color: 'var(--color-text-neutral-tertiary)', textAlign: 'center' }}>
            로그인 시 RecipeHub의 <span style={{ color: 'var(--color-text-neutral-secondary)', fontWeight: 600, textDecoration: 'underline' }}>이용약관</span>과<br />
            <span style={{ color: 'var(--color-text-neutral-secondary)', fontWeight: 600, textDecoration: 'underline' }}>개인정보 처리방침</span>에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { LoginScreen });
