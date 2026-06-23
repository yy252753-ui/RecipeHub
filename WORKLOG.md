# 작업 기록

## 2026-06-04 프로젝트 초기 세팅

PRD와 `design/` 폴더의 화면 프로토타입을 기준으로 RecipeHub 프로젝트를 Next.js 앱으로 구성했다.

### 기본 프로젝트 구성

- `package.json`을 생성하고 Next.js, TypeScript, Tailwind CSS, Prisma, Auth.js, TanStack Query, React Hook Form, Zod 의존성을 추가했다.
- `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`를 추가했다.
- PowerShell 실행 정책 문제를 피하기 위해 문서와 안내에서 `npm.cmd`, `npx.cmd` 사용을 기준으로 정리했다.

### 앱 구조 생성

- `src/app`에 App Router 기반 주요 라우트를 추가했다.
- 구현된 라우트:
  - `/`
  - `/recipes`
  - `/recipes/[id]`
  - `/recipes/write`
  - `/auth/login`
  - `/feed`
  - `/users/[id]`
- `src/components`에 공통 UI를 추가했다.
  - 로고
  - 사이트 헤더
  - 페이지 셸
  - 레시피 카드
  - 버튼
  - 태그
  - 음식 이미지 플레이스홀더
- `src/data/recipes.ts`에 임시 목 레시피 데이터를 추가했다.
- `src/types`, `src/constants`, `src/lib` 구조를 만들었다.

### Prisma 및 데이터베이스 준비

- `prisma/schema.prisma`에 PRD 기반 데이터 모델을 추가했다.
  - `User`
  - `Recipe`
  - `Ingredient`
  - `Step`
  - `Tag`
  - `RecipeTag`
- Supabase IPv4 환경을 고려해 datasource에 `directUrl`을 추가했다.
- `.env.example`에 `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `AUTH_KAKAO_ID`, Cloudinary 변수 예시를 정리했다.
- 사용자는 Supabase pooler 환경에서 Prisma migration 준비를 확인했다.

### API Route 초기 구성

- `/api/auth/[...nextauth]`를 추가했다.
- `/api/recipes`를 추가했다.
  - `GET`: 목 데이터 반환
  - `POST`: 아직 DB 연결 전이라 501 반환
- `/api/recipes/[id]`를 추가했다.
  - `GET`: 목 데이터 상세 반환
  - `PATCH`, `DELETE`: 아직 DB 연결 전이라 501 반환
- `/api/tags`를 추가했다.
- `/api/upload/signature`를 추가했다.
  - 아직 Cloudinary 연결 전이라 501 반환

### 카카오 로그인 설정

- Google 로그인은 사용하지 않기로 결정하고 관련 provider와 환경 변수를 제거했다.
- Auth.js provider를 Kakao 전용으로 변경했다.
- Client Secret을 사용하지 않는 카카오 설정에 맞춰 `token_endpoint_auth_method: "none"`을 적용했다.
- `/auth/login`의 카카오 버튼을 실제 `signIn("kakao")` 서버 액션에 연결했다.
- 로그아웃 서버 액션을 추가했다.
- 헤더에서 로그인 상태에 따라 로그인/로그아웃 버튼을 분기하도록 수정했다.

### 문서화

- `AGENTS.md`를 한국어 contributor guide로 작성하고, 이후 실제 Next.js 프로젝트 상태에 맞게 갱신했다.
- `TODO.md`에 향후 작업 목록을 작성했다.

### 검증

아래 명령을 통과했다.

```powershell
npm.cmd run lint
npm.cmd run build
```

참고: 현재 최신 안정 Next.js `16.2.7`에서도 Next 내부 PostCSS 관련 npm audit moderate 경고가 남아 있다. 안정 패치가 나오면 업데이트 후 다시 확인해야 한다.
