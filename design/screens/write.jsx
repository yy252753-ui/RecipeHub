// write.jsx — 레시피 작성 (/recipes/write)
function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 9 }}>
        <label style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--color-text-neutral-primary)' }}>{label}</label>
        {hint && <span style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-neutral-tertiary)' }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}
function Input({ value, placeholder, w = '100%', center }) {
  const filled = value != null && value !== '';
  return (
    <div style={{
      height: 48, width: w, border: '1px solid var(--color-line-normal-normal)', borderRadius: 'var(--radius-sm)',
      background: '#fff', display: 'flex', alignItems: 'center', padding: '0 14px',
      fontWeight: 500, fontSize: 15, justifyContent: center ? 'space-between' : 'flex-start',
      color: filled ? 'var(--color-text-neutral-primary)' : 'var(--color-text-neutral-tertiary)',
    }}>
      {filled ? value : placeholder}
    </div>
  );
}
function Select({ value, w = '100%' }) {
  return (
    <div style={{
      height: 48, width: w, border: '1px solid var(--color-line-normal-normal)', borderRadius: 'var(--radius-sm)',
      background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px',
      fontWeight: 500, fontSize: 15,
    }}>
      <span>{value}</span><Chevron dir="down" size={15} color="var(--color-fill-neutral-normal)" />
    </div>
  );
}

function WriteScreen() {
  const ingredients = [['소면', '200', 'g'], ['들기름', '2', '큰술'], ['양조간장', '1', '큰술'], ['김가루', '1', '줌']];
  const steps = [
    '소면을 끓는 물에 3분간 삶고 찬물에 헹궈 물기를 뺍니다.',
    '들기름, 간장, 설탕을 섞어 양념장을 만들고 면과 버무립니다.',
  ];
  return (
    <div style={{ width: '100%', minHeight: '100%', background: 'var(--color-background-neutral-secondary)', fontFamily: 'var(--font-sans)', color: 'var(--color-text-neutral-primary)' }}>
      {/* editor top bar */}
      <header style={{
        height: 64, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--color-line-normal-normal)', display: 'flex', alignItems: 'center',
        gap: 16, padding: '0 28px', position: 'sticky', top: 0, zIndex: 20,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--color-text-neutral-secondary)', fontWeight: 600, fontSize: 14.5, cursor: 'pointer' }}>
          <Chevron dir="left" size={16} />나가기
        </span>
        <div style={{ flex: 1 }} />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 500, fontSize: 13, color: 'var(--color-text-neutral-tertiary)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-status-positive)' }} />임시저장됨 · 방금 전
        </span>
        <Btn variant="secondary" size="md">임시저장</Btn>
        <Btn variant="primary" size="md">출간하기</Btn>
      </header>

      <main style={{ width: '100%', maxWidth: 840, margin: '0 auto', padding: '40px 32px 72px' }}>
        <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.04em', color: 'var(--color-primary-normal)', marginBottom: 14 }}>새 레시피 작성</div>

        {/* title */}
        <div style={{ borderBottom: '2px solid var(--color-line-solid-normal)', paddingBottom: 18, marginBottom: 24 }}>
          <div style={{ fontWeight: 800, fontSize: 32, letterSpacing: '-0.025em', color: 'var(--color-text-neutral-primary)' }}>여름 들기름 막국수</div>
        </div>

        {/* tags */}
        <Field label="태그" hint="최대 5개 · Enter로 추가">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Tag>면요리</Tag><Tag>비건</Tag><Tag>여름</Tag>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--color-text-neutral-tertiary)', fontWeight: 500, fontSize: 14 }}>
              <Plus size={14} color="var(--color-fill-neutral-normal)" />태그 입력
            </span>
          </div>
        </Field>

        {/* rep image */}
        <Field label="대표 이미지" hint="권장 1200 × 800px">
          <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-line-normal-normal)' }}>
            <FoodImg seed="여름 들기름 막국수" height={240} iconSize={40} />
            <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
              <button style={{ height: 34, padding: '0 13px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'rgba(20,25,30,0.7)', color: '#fff', fontWeight: 600, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                <Icon name="image" size={15} />변경
              </button>
              <button style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', border: 'none', background: 'rgba(20,25,30,0.7)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                <Icon name="trash" size={15} />
              </button>
            </div>
          </div>
        </Field>

        {/* meta row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 4 }}>
          <Field label="조리시간"><Select value="15분" /></Field>
          <Field label="난이도"><Select value="쉬움" /></Field>
          <Field label="분량"><Select value="2인분" /></Field>
        </div>

        {/* intro */}
        <Field label="소개">
          <div style={{ minHeight: 96, border: '1px solid var(--color-line-normal-normal)', borderRadius: 'var(--radius-sm)', background: '#fff', padding: '13px 14px', fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: 'var(--color-text-neutral-secondary)' }}>
            더운 여름, 불 앞에 오래 서 있기 싫은 날 딱 좋은 막국수. 고소한 들기름 향과 새콤달콤한 양념장이면 충분해요.
          </div>
        </Field>

        {/* divider */}
        <div style={{ height: 1, background: 'var(--color-line-solid-normal)', margin: '14px 0 28px' }} />

        {/* ingredients */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>재료</h2>
          <span style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--color-text-neutral-tertiary)' }}>{ingredients.length}개</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
          {ingredients.map(([n, a, u], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--color-text-neutral-assistive)', cursor: 'grab', fontSize: 16, lineHeight: 1 }}>⠿</span>
              <div style={{ flex: 1 }}><Input value={n} placeholder="재료명" /></div>
              <Input value={a} placeholder="수량" w={110} />
              <Input value={u} placeholder="단위" w={110} />
              <button style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', border: 'none', background: 'transparent', color: 'var(--color-text-neutral-assistive)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon name="close" size={15} /></button>
            </div>
          ))}
        </div>
        <button style={{ width: '100%', height: 48, borderRadius: 'var(--radius-sm)', border: '1px dashed var(--color-line-strong-normal)', borderColor: 'var(--color-line-normal-normal)', background: 'var(--color-background-neutral-tertiary)', color: 'var(--color-text-neutral-secondary)', fontWeight: 600, fontSize: 14.5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, cursor: 'pointer', marginBottom: 36 }}>
          <Plus size={15} />재료 추가
        </button>

        {/* steps */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>조리 순서</h2>
          <span style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--color-text-neutral-tertiary)' }}>{steps.length}단계</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 14 }}>
          {steps.map((d, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, background: '#fff', border: '1px solid var(--color-line-normal-normal)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
              <div style={{ flex: '0 0 auto', width: 30, height: 30, borderRadius: '50%', background: 'var(--color-primary-normal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: 'var(--color-text-neutral-secondary)', marginBottom: 12 }}>{d}</div>
                {i === 0
                  ? <FoodImg seed={'step' + i} height={120} radius={10} iconSize={22} style={{ width: 180 }} />
                  : <div style={{ width: 180, height: 120, borderRadius: 10, border: '1px dashed var(--color-line-normal-normal)', background: 'var(--color-background-neutral-tertiary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--color-text-neutral-tertiary)' }}>
                      <Icon name="image" size={22} /><span style={{ fontWeight: 600, fontSize: 12 }}>사진 추가</span>
                    </div>}
              </div>
              <button style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', border: 'none', background: 'transparent', color: 'var(--color-text-neutral-assistive)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: '0 0 auto' }}><Icon name="trash" size={16} /></button>
            </div>
          ))}
        </div>
        <button style={{ width: '100%', height: 48, borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-line-normal-normal)', background: 'var(--color-background-neutral-tertiary)', color: 'var(--color-text-neutral-secondary)', fontWeight: 600, fontSize: 14.5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, cursor: 'pointer' }}>
          <Plus size={15} />단계 추가
        </button>
      </main>
    </div>
  );
}
Object.assign(window, { WriteScreen });
