// recipes.jsx — 레시피 목록 / 탐색 (/recipes)
function SkeletonCard() {
  const bar = (w, h, mt = 0) => <div style={{ width: w, height: h, marginTop: mt, borderRadius: 6, background: 'var(--color-background-neutral-tertiary)' }} />;
  return (
    <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-line-normal-normal)', overflow: 'hidden' }}>
      <div style={{ width: '100%', aspectRatio: '16 / 10', background: 'var(--color-background-neutral-tertiary)' }} />
      <div style={{ padding: '16px 17px 18px' }}>
        {bar('40%', 18)}
        {bar('92%', 16, 12)}
        {bar('70%', 16, 8)}
        {bar('55%', 14, 18)}
      </div>
    </div>
  );
}

function RecipesScreen() {
  const list = [RECIPES[0], RECIPES[2], RECIPES[1], RECIPES[7], RECIPES[3], RECIPES[6], RECIPES[5], RECIPES[8]];
  return (
    <Page active="recipes" maxWidth={1180}>
      {/* header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: '0 0 6px', fontWeight: 800, fontSize: 30, letterSpacing: '-0.025em' }}>레시피 탐색</h1>
        <p style={{ margin: 0, fontWeight: 400, fontSize: 15.5, color: 'var(--color-text-neutral-secondary)' }}>
          오늘 뭐 먹지? 키워드와 태그로 원하는 레시피를 찾아보세요.
        </p>
      </div>

      {/* search */}
      <div style={{
        height: 56, background: '#fff', border: '1px solid var(--color-line-normal-normal)',
        borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px', marginBottom: 18,
      }}>
        <Icon name="search" size={20} color="var(--color-fill-neutral-normal)" />
        <span style={{ flex: 1, fontWeight: 500, fontSize: 16, color: 'var(--color-text-neutral-tertiary)' }}>예) 들기름 막국수, 자취요리, 비건</span>
        <Btn variant="primary" size="sm">검색</Btn>
      </div>

      {/* filter tags */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginBottom: 26 }}>
        {FILTER_TAGS.map((t, i) => (
          i === 0
            ? <span key={t} style={{ display: 'inline-flex', alignItems: 'center', padding: '7px 14px', borderRadius: 'var(--radius-full)', background: 'var(--color-fill-neutral-strong)', color: '#fff', fontWeight: 600, fontSize: 13.5 }}>{t}</span>
            : <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '7px 13px', borderRadius: 'var(--radius-full)', background: 'var(--color-background-neutral-tertiary)', color: 'var(--color-text-neutral-secondary)', fontWeight: 600, fontSize: 13.5 }}><span style={{ opacity: 0.55, fontWeight: 700 }}>#</span>{t}</span>
        ))}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '7px 13px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-line-normal-normal)', color: 'var(--color-text-neutral-tertiary)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}>
          <Icon name="filter" size={13} />필터
        </span>
      </div>

      {/* result bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ fontWeight: 600, fontSize: 14.5, color: 'var(--color-text-neutral-secondary)' }}>
          총 <span style={{ color: 'var(--color-text-neutral-primary)', fontWeight: 800 }}>1,240</span>개의 레시피
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', border: '1px solid var(--color-line-normal-normal)', borderRadius: 'var(--radius-sm)', background: '#fff', cursor: 'pointer' }}>
          <span style={{ fontWeight: 600, fontSize: 13.5 }}>최신순</span>
          <Chevron dir="down" size={14} color="var(--color-fill-neutral-normal)" />
        </div>
      </div>

      {/* grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {list.map((r) => <RecipeCard key={r.title} r={r} w="100%" />)}
        {[0, 1, 2, 3].map((i) => <SkeletonCard key={'sk' + i} />)}
      </div>

      {/* infinite scroll spinner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '32px 0 4px', color: 'var(--color-text-neutral-tertiary)' }}>
        <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--color-line-normal-normal)', borderTopColor: 'var(--color-primary-normal)' }} />
        <span style={{ fontWeight: 600, fontSize: 14 }}>레시피를 더 불러오는 중…</span>
      </div>
    </Page>
  );
}
Object.assign(window, { RecipesScreen });
