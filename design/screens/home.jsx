// home.jsx — RecipeHub 홈 (/)
function SidebarCard({ title, action, children }) {
  return (
    <section style={{
      background: '#fff', borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--color-line-normal-normal)', padding: '20px 20px 22px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>{title}</h3>
        {action && <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-neutral-tertiary)', cursor: 'pointer' }}>{action}</span>}
      </div>
      {children}
    </section>
  );
}

function HomeScreen() {
  const featured = RECIPES[4];
  const grid = [RECIPES[0], RECIPES[1], RECIPES[3], RECIPES[7], RECIPES[5], RECIPES[8]];
  const creators = [
    { name: '이서준', handle: '@seojun', count: 48 },
    { name: '정하윤', handle: '@hayoon', count: 36 },
    { name: '한소희', handle: '@sohee', count: 29 },
  ];
  return (
    <Page active="home" maxWidth={1180}>
      {/* Hero — 오늘의 추천 */}
      <section style={{
        background: '#fff', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-line-normal-normal)',
        overflow: 'hidden', display: 'flex', marginBottom: 40,
      }}>
        <div style={{ width: 540, flex: '0 0 auto' }}>
          <FoodImg seed={featured.title} height={340} radius={0} iconSize={48} />
        </div>
        <div style={{ flex: 1, padding: '40px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
            padding: '6px 12px', borderRadius: 'var(--radius-full)',
            background: 'var(--color-background-primary-low)', color: 'var(--color-primary-strong)',
            fontWeight: 700, fontSize: 12.5, letterSpacing: '0.02em',
          }}>오늘의 추천</span>
          <h1 style={{ margin: 0, fontWeight: 800, fontSize: 36, lineHeight: 1.25, letterSpacing: '-0.025em' }}>
            제철 초당옥수수로 만드는<br />여름 한 그릇, 리조또
          </h1>
          <p style={{ margin: 0, fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: 'var(--color-text-neutral-secondary)', maxWidth: 460 }}>
            지금 가장 달콤한 초당옥수수의 제철을 그대로 담았습니다. 치즈와 함께 부드럽게 졸여낸 한 그릇을 만나보세요.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <Avatar name={featured.author} size={32} />
              <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-text-neutral-secondary)' }}>{featured.author}</span>
            </div>
            <Dot />
            <Meta time={featured.time} level={featured.level} />
          </div>
        </div>
      </section>

      {/* 2-column body */}
      <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
        {/* main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontWeight: 800, fontSize: 23, letterSpacing: '-0.02em' }}>인기 레시피</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 14, fontWeight: 600 }}>
              <span style={{ color: 'var(--color-text-neutral-primary)' }}>최신순</span>
              <span style={{ color: 'var(--color-text-neutral-assistive)' }}>인기순</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {grid.map((r) => <RecipeCard key={r.title} r={r} w="100%" />)}
          </div>
        </div>

        {/* sidebar */}
        <aside style={{ width: 296, flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SidebarCard title="인기 태그" action="전체보기">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {POPULAR_TAGS.slice(0, 6).map(([t, n], i) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '7px 0' }}>
                  <span style={{ width: 18, fontWeight: 800, fontSize: 15, color: i < 3 ? 'var(--color-primary-normal)' : 'var(--color-text-neutral-assistive)', fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: 14.5 }}>#{t}</span>
                  <span style={{ fontWeight: 500, fontSize: 13, color: 'var(--color-text-neutral-tertiary)' }}>{n.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </SidebarCard>

          <SidebarCard title="추천 크리에이터">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {creators.map((c) => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <Avatar name={c.name} size={40} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14.5 }}>{c.name}</div>
                    <div style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-neutral-tertiary)' }}>레시피 {c.count}</div>
                  </div>
                  <Btn variant="tinted" size="sm">팔로우</Btn>
                </div>
              ))}
            </div>
          </SidebarCard>

          <div style={{
            background: 'var(--color-background-neutral-inverse)', borderRadius: 'var(--radius-xl)',
            padding: '24px 22px', color: '#fff',
          }}>
            <h3 style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em' }}>나만의 레시피를<br />기록해보세요</h3>
            <p style={{ margin: '0 0 18px', fontWeight: 400, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.66)' }}>
              단계별 사진과 함께 레시피를 남기고 구독자와 공유할 수 있어요.
            </p>
            <Btn variant="primary" icon="write" size="md" full>첫 레시피 작성하기</Btn>
          </div>
        </aside>
      </div>
    </Page>
  );
}
Object.assign(window, { HomeScreen });
