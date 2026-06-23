// profile.jsx — 사용자 프로필 (/users/[id])
function Stat({ n, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em' }}>{n}</span>
      <span style={{ fontWeight: 500, fontSize: 14, color: 'var(--color-text-neutral-tertiary)' }}>{label}</span>
    </div>
  );
}

function ProfileScreen() {
  const name = '이서준';
  const recipes = [RECIPES[1], RECIPES[3], RECIPES[4], RECIPES[7], RECIPES[8], RECIPES[2]];
  return (
    <Page active="" maxWidth={1080}>
      {/* header card */}
      <section style={{ background: '#fff', border: '1px solid var(--color-line-normal-normal)', borderRadius: 'var(--radius-2xl)', padding: '32px 36px', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <Avatar name={name} size={96} />
          <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ margin: 0, fontWeight: 800, fontSize: 27, letterSpacing: '-0.02em' }}>{name}</h1>
              <span style={{ fontWeight: 500, fontSize: 15, color: 'var(--color-text-neutral-tertiary)' }}>@seojun</span>
            </div>
            <p style={{ margin: '0 0 16px', fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: 'var(--color-text-neutral-secondary)', maxWidth: 560 }}>
              주말마다 만드는 브런치와 파스타 기록 중. 누구나 따라 할 수 있는 쉬운 레시피를 지향합니다. 🍝
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <Stat n="48" label="레시피" />
              <Stat n="1,240" label="팔로워" />
              <Stat n="86" label="팔로잉" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flex: '0 0 auto' }}>
            <Btn variant="primary" size="md" icon="person">팔로우</Btn>
            <IconBtn name="share" size={19} color="var(--color-text-neutral-secondary)" />
          </div>
        </div>
      </section>

      {/* tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, borderBottom: '1px solid var(--color-line-normal-normal)', marginBottom: 26 }}>
        {[['작성한 레시피', '48', true], ['스크랩', '132', false]].map(([t, n, act]) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '0 2px 14px', position: 'relative', cursor: 'pointer' }}>
            <span style={{ fontWeight: act ? 700 : 600, fontSize: 16, color: act ? 'var(--color-text-neutral-primary)' : 'var(--color-text-neutral-tertiary)' }}>{t}</span>
            <span style={{ fontWeight: 700, fontSize: 13, color: act ? 'var(--color-primary-normal)' : 'var(--color-text-neutral-assistive)' }}>{n}</span>
            {act && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2.5, background: 'var(--color-primary-normal)', borderRadius: 2 }} />}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 14, color: 'var(--color-text-neutral-tertiary)', cursor: 'pointer' }}>
          <span style={{ fontWeight: 600, fontSize: 13.5 }}>최신순</span>
          <Chevron dir="down" size={14} color="var(--color-fill-neutral-normal)" />
        </div>
      </div>

      {/* recipe grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {recipes.map((r) => <RecipeCard key={r.title} r={{ ...r, author: name }} w="100%" />)}
      </div>
    </Page>
  );
}
Object.assign(window, { ProfileScreen });
