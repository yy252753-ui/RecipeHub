// detail.jsx — 레시피 상세 (/recipes/[id])
function InfoStat({ label, value, sub }) {
  return (
    <div style={{ flex: 1, textAlign: 'center', padding: '4px 0' }}>
      <div style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-neutral-tertiary)', marginBottom: 5 }}>{label}</div>
      <div style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.01em' }}>{value}</div>
      {sub && <div style={{ fontWeight: 500, fontSize: 11.5, color: 'var(--color-text-neutral-assistive)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function DetailScreen() {
  const r = RECIPES[4];
  const ingredients = [
    ['초당옥수수', '3개'], ['아르보리오 쌀', '1.5컵'], ['양파', '½개'], ['채수', '1L'],
    ['파르미지아노', '50g'], ['무염버터', '30g'], ['화이트와인', '60ml'], ['소금 · 후추', '약간'],
  ];
  const steps = [
    ['옥수수 알 분리하기', '초당옥수수의 알을 칼로 분리하고, 남은 심지는 채수에 넣어 함께 끓여 단맛을 우려냅니다.'],
    ['양파 볶기', '양파를 잘게 다져 버터를 두른 팬에 투명해질 때까지 약불에서 천천히 볶아주세요.'],
    ['쌀 코팅 후 와인', '아르보리오 쌀을 넣어 기름이 고루 입혀지도록 볶다가, 화이트와인을 넣고 알코올을 날립니다.'],
    ['채수 더하며 졸이기', '따뜻한 채수를 한 국자씩 나눠 부으며 약 18분간 쉬지 않고 저어 크리미한 농도를 만듭니다.'],
    ['옥수수 · 치즈 마무리', '옥수수 알과 파르미지아노를 넣고 버터로 마운팅해 윤기를 더한 뒤 소금·후추로 간을 맞춥니다.'],
  ];
  return (
    <Page active="recipes" maxWidth={1080} pad="40px 0 72px">
      {/* header */}
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 7, marginBottom: 18 }}>
          {r.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
        <h1 style={{ margin: '0 0 22px', fontWeight: 800, fontSize: 40, lineHeight: 1.25, letterSpacing: '-0.028em', maxWidth: 800 }}>
          제철 초당옥수수 리조또
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name={r.author} size={46} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 15.5 }}>{r.author}</span>
                <Btn variant="tinted" size="sm">팔로우</Btn>
              </div>
              <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--color-text-neutral-tertiary)', marginTop: 3 }}>2026. 6. 1. · 조회 3,418</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{ height: 40, padding: '0 15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-line-normal-normal)', background: '#fff', display: 'inline-flex', alignItems: 'center', gap: 7, fontWeight: 600, fontSize: 14, cursor: 'pointer', color: 'var(--color-text-neutral-secondary)' }}>
              <Icon name="bookmark" size={16} />스크랩 128
            </button>
            <IconBtn name="share" size={19} color="var(--color-text-neutral-secondary)" />
          </div>
        </div>

        {/* hero */}
        <FoodImg seed={r.title} height={460} radius={16} iconSize={60} style={{ marginBottom: 36 }} />
      </div>

      {/* body: article + sticky aside */}
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        <article style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: '0 0 36px', fontWeight: 400, fontSize: 17, lineHeight: 1.75, color: 'var(--color-text-neutral-secondary)' }}>
            여름에만 만날 수 있는 초당옥수수는 생으로 먹어도 달 만큼 당도가 높습니다. 그 단맛을 가장 잘 살리는 방법은 의외로 리조또예요.
            심지까지 알뜰하게 우려낸 채수가 쌀 한 알 한 알에 배어들어, 크림 없이도 충분히 부드럽고 진한 맛을 냅니다.
          </p>

          {/* 재료 */}
          <h2 style={{ margin: '0 0 16px', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>재료 <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--color-text-neutral-tertiary)' }}>· 2인분</span></h2>
          <div style={{ background: '#fff', border: '1px solid var(--color-line-normal-normal)', borderRadius: 'var(--radius-xl)', padding: '8px 24px', marginBottom: 40 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 40 }}>
              {ingredients.map(([n, a], i) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < ingredients.length - 2 ? '1px solid var(--color-line-solid-neutral)' : 'none' }}>
                  <span style={{ fontWeight: 500, fontSize: 15.5 }}>{n}</span>
                  <span style={{ fontWeight: 600, fontSize: 14.5, color: 'var(--color-text-neutral-tertiary)' }}>{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 조리 순서 */}
          <h2 style={{ margin: '0 0 20px', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>조리 순서</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {steps.map(([t, d], i) => (
              <div key={i} style={{ display: 'flex', gap: 18 }}>
                <div style={{ flex: '0 0 auto', width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary-normal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15 }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
                  <h4 style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 16.5, letterSpacing: '-0.01em' }}>{t}</h4>
                  <p style={{ margin: 0, fontWeight: 400, fontSize: 15, lineHeight: 1.65, color: 'var(--color-text-neutral-secondary)' }}>{d}</p>
                </div>
                <FoodImg seed={r.title + i} height={112} radius={12} iconSize={22} style={{ width: 168, flex: '0 0 auto' }} />
              </div>
            ))}
          </div>
        </article>

        {/* aside */}
        <aside style={{ width: 296, flex: '0 0 auto', position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid var(--color-line-normal-normal)', borderRadius: 'var(--radius-xl)', padding: '18px 8px' }}>
            <div style={{ display: 'flex' }}>
              <InfoStat label="조리시간" value="35분" />
              <div style={{ width: 1, background: 'var(--color-line-solid-neutral)' }} />
              <InfoStat label="난이도" value="보통" />
              <div style={{ width: 1, background: 'var(--color-line-solid-neutral)' }} />
              <InfoStat label="분량" value="2인분" />
            </div>
          </div>
          <Btn variant="primary" size="lg" icon="bookmark" full>스크랩하기</Btn>
          <div style={{ background: '#fff', border: '1px solid var(--color-line-normal-normal)', borderRadius: 'var(--radius-xl)', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <Avatar name={r.author} size={48} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{r.author}</div>
                <div style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-neutral-tertiary)' }}>레시피 29 · 팔로워 1.2천</div>
              </div>
            </div>
            <p style={{ margin: '0 0 16px', fontWeight: 400, fontSize: 13.5, lineHeight: 1.6, color: 'var(--color-text-neutral-secondary)' }}>
              제철 재료로 만드는 한 그릇 요리를 기록합니다. 매주 화요일 새 레시피 업로드.
            </p>
            <Btn variant="secondary" size="md" full>팔로우</Btn>
          </div>
        </aside>
      </div>
    </Page>
  );
}
Object.assign(window, { DetailScreen });
