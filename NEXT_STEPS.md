# 다음 작업 계획

## 1. 카카오 로그인 최종 확인

먼저 실제 브라우저에서 카카오 로그인 흐름을 끝까지 확인한다.

### 사용자가 확인할 것

- Kakao Developers에서 카카오 로그인이 활성화되어 있어야 한다.
- Redirect URI가 등록되어 있어야 한다.

```text
http://localhost:3000/api/auth/callback/kakao
```

- `.env`와 `.env.local`에 값이 있어야 한다.

```env
AUTH_SECRET="긴 랜덤 문자열"
AUTH_KAKAO_ID="카카오 REST API 키"
```

### 실행 명령

```powershell
npm.cmd run dev
```

브라우저에서 확인:

```text
http://localhost:3000/auth/login
```

성공 기준:

- `Kakao로 계속하기` 클릭 시 카카오 인증 화면으로 이동한다.
- 인증 후 `/`로 돌아온다.
- 헤더에 `로그아웃` 버튼이 표시된다.

## 2. 사용자 DB 저장 연결

현재 Auth.js 로그인은 세션 확인까지만 연결되어 있다. 다음 단계는 로그인한 카카오 사용자를 DB의 `User` 테이블에 저장하는 것이다.

작업 내용:

- Auth.js Prisma Adapter 설정
- `src/lib/auth.ts`에 Prisma Adapter 연결
- Kakao에서 받은 사용자 정보를 `User` 모델에 맞게 저장
- `provider`, `providerId`, `email`, `nickname`, `profileImg` 매핑 확인

주의:

- 현재 `User.email`은 필수 unique 필드다.
- 카카오 계정에서 이메일 동의를 받지 않으면 email이 비어 있을 수 있다.
- 이 경우 Prisma schema를 수정하거나 Kakao 동의 항목에서 이메일 제공을 설정해야 한다.

## 3. 작성 페이지 보호

로그인하지 않은 사용자가 `/recipes/write`에 접근하면 로그인 페이지로 보내야 한다.

작업 내용:

- `/recipes/write/page.tsx`에서 `auth()` 호출
- 세션이 없으면 `/auth/login`으로 redirect
- 로그인 후 작성 페이지로 돌아오는 redirect 흐름 검토

## 4. 목 데이터에서 DB 데이터로 전환

현재 레시피 목록과 상세 화면은 `src/data/recipes.ts`의 목 데이터를 사용한다.

작업 순서:

1. Prisma seed 파일을 추가한다.
2. 목 레시피 데이터를 seed 데이터로 옮긴다.
3. `/api/recipes`의 `GET`을 Prisma 조회로 변경한다.
4. `/recipes` 페이지를 API 또는 서버 DB 조회 기반으로 변경한다.
5. `/recipes/[id]` 상세 페이지를 DB 조회 기반으로 변경한다.

## 5. 레시피 작성 기능 구현

현재 `/recipes/write`는 UI 프로토타입이다. 실제 저장 기능을 붙여야 한다.

작업 내용:

- React Hook Form 적용
- Zod schema 작성
- 재료 추가/삭제
- 조리 단계 추가/삭제
- 태그 입력
- `POST /api/recipes` DB 저장 구현
- 저장 성공 후 상세 페이지로 이동

## 6. 이미지 업로드 준비

Cloudinary 연동은 아직 구현되지 않았다.

작업 내용:

- Cloudinary 환경 변수 입력
- `/api/upload/signature` 구현
- 대표 이미지 업로드
- 조리 단계 이미지 업로드
- 업로드 실패 UI 추가

## 7. 검증 루틴

작업 단위마다 아래 명령을 실행한다.

```powershell
npm.cmd run lint
npm.cmd run build
```

DB schema가 바뀌면:

```powershell
npx.cmd prisma migrate dev --name 변경_이름
```

DB 상태를 확인할 때:

```powershell
npx.cmd prisma studio
```
