// feed.jsx — 팔로우 피드 (/feed)
function FeedPost({ r, author, handle, ago }) {
  return (
    <article style={{ background: '#fff', border: '1px solid var(--color-line-normal-normal)', borderRadius: 'var(--radius-2xl)', padding: 20, marginBottom: 20 }}>
      {/* author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 15 }}>
        <Avatar name={author} size={42} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{author}</span>
            <span style={{ fontWeight: 500, fontSize: 13, color: 'var(--color-text-neutral-tertiary)' }}>{handle}</span>
          </div>
          <div style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-neutral-tertiary)', marginTop: 2 }}>{ago} · 새 레시피</div>
        </div>
        <span style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--color-primary-normal)', cursor: 'pointer' }}>팔로잉</span>
      </div>

      {/* content */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 11 }}>
        {r.tags.slice(0, 2).map((t) => <Tag key={t} size="sm">{t}</Tag>)}
      </div>
      <h2 style={{ margin: '0 0 8px', fontWeight: 800, fontSize: 21, letterSpacing: '-0.02em' }}>{r.title}</h2>
      <p style={{ margin: '0 0 16px', fontWeight: 400, fontSize: 14.5, lineHeight: 1.6, color: 'var(--color-text-neutral-secondary)' }}>{r.desc}</p>
      <FoodImg seed={r.title} height={300} radius={14} iconSize={48} style={{ marginBottom: 14 }} />

      {/* footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Meta time={r.time} level={r.level} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={{ height: 36, padding: '0 12px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'transparent', color: 'var(--color-text-neutral-secondary)', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}><Icon name="bookmark" size={16} />스크랩</button>
          <button style={{ height: 36, padding: '0 12px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'transparent', color: 'var(--color-text-neutral-secondary)', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}><Icon name="share" size={15} />공유</button>
        </div>
      </div>
    </article>
  );
}

function FeedScreen() {
  const posts = [
    { r: RECIPES[1], author: '이서준', handle: '@seojun', ago: '2시간 전' },
    { r: RECIPES[3], author: '정하윤', handle: '@hayoon', ago: '5시간 전' },
    { r: RECIPES[8], author: '한소희', handle: '@sohee', ago: '어제' },
  ];
  const suggest = [
    { name: '최우진', handle: '@woojin', count: 29 },
    { name: '박지우', handle: '@jiwoo', count: 41 },
    { name: '강도윤', handle: '@doyun', count: 18 },
  ];
  return (
    <Page active="feed" maxWidth={1080}>
      <h1 style={{ margin: '0 0 4px', fontWeight: 800, fontSize: 28, letterSpacing: '-0.025em' }}>팔로우 피드</h1>
      <p style={{ margin: '0 0 28px', fontWeight: 400, fontSize: 15, color: 'var(--color-text-neutral-secondary)' }}>
        팔로우한 크리에이터의 새 레시피를 모아봤어요.
      </p>

      <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
        {/* feed */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {posts.map((p) => <FeedPost key={p.author} {...p} />)}
        </div>

        {/* sidebar */}
        <aside style={{ width: 296, flex: '0 0 auto', position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: 'var(--color-background-primary-low)', borderRadius: 'var(--radius-xl)', padding: '20px 22px' }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>팔로잉 86명</div>
            <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--color-text-neutral-secondary)', marginBottom: 14, lineHeight: 1.5 }}>오늘 새 레시피 12개가 올라왔어요.</div>
            <Btn variant="secondary" size="sm" full>팔로잉 관리</Btn>
          </div>

          <section style={{ background: '#fff', border: '1px solid var(--color-line-normal-normal)', borderRadius: 'var(--radius-xl)', padding: '20px 20px 22px' }}>
            <h3 style={{ margin: '0 0 16px', fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>알 수도 있는 크리에이터</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {suggest.map((c) => (
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
          </section>
        </aside>
      </div>
    </Page>
  );
}
Object.assign(window, { FeedScreen });
