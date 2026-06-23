# 향후 작업 목록

## 1. 개발 환경 및 기본 설정

- `.env.local` 생성 후 `.env.example` 기준으로 `DATABASE_URL`, `AUTH_SECRET`, OAuth, Cloudinary 값을 설정한다.
- PostgreSQL 데이터베이스를 준비하고 `prisma migrate dev`로 초기 마이그레이션을 생성한다.
- `npm.cmd run dev` 실행 후 주요 라우트가 브라우저에서 정상 표시되는지 확인한다.
- Next.js 최신 안정 버전의 보안 패치가 나오면 `next`와 `eslint-config-next`를 업데이트하고 `npm.cmd audit --omit=dev`를 재확인한다.

## 2. 인증 기능

- Auth.js Kakao 로그인 provider 설정을 완료한다.
- Kakao Developers에서 Redirect URI와 Client Secret 사용 여부를 검증한다.
- 로그인 상태에 따라 헤더의 로그인 버튼, 작성 버튼, 프로필 링크 노출을 분기한다.
- 보호가 필요한 라우트(`/recipes/write`, 수정/삭제 API)에 인증 체크를 추가한다.

## 3. 데이터베이스 연동

- `src/data/recipes.ts`의 목 데이터를 Prisma 기반 조회로 교체한다.
- `/api/recipes`의 `GET`, `POST`를 실제 DB 로직으로 연결한다.
- `/api/recipes/[id]`의 `GET`, `PATCH`, `DELETE`를 실제 DB 로직으로 연결한다.
- 재료, 조리 단계, 태그 저장 시 Prisma transaction을 사용한다.
- 삭제 시 Recipe, Ingredient, Step, RecipeTag가 안전하게 cascade 처리되는지 테스트한다.

## 4. 레시피 작성 및 수정

- `/recipes/write` 화면을 React Hook Form과 Zod로 실제 입력 폼으로 전환한다.
- 제목, 소개, 조리시간, 난이도, 분량, 재료, 조리 순서, 태그 검증 규칙을 정의한다.
- 재료와 조리 순서의 추가, 삭제, 순서 변경 기능을 구현한다.
- 임시저장(DRAFT)과 출간(PUBLISHED) 상태를 분리한다.
- `/recipes/[id]/edit` 라우트를 추가하고 기존 레시피 값을 불러와 수정할 수 있게 한다.

## 5. 이미지 업로드

- Cloudinary 서명 생성 API(`/api/upload/signature`)를 구현한다.
- 대표 이미지와 단계별 이미지를 업로드하고 URL을 Recipe/Step에 저장한다.
- 이미지 업로드 실패, 용량 제한, 파일 타입 제한 UI를 추가한다.
- Next 이미지 최적화 설정을 Cloudinary 도메인에 맞게 구성한다.

## 6. 레시피 목록 및 검색

- `/recipes` 검색 입력을 실제 query parameter와 API 요청으로 연결한다.
- 태그 필터와 정렬 옵션(최신순, 인기순)을 구현한다.
- cursor pagination 기반 무한 스크롤을 추가한다.
- 로딩, 빈 결과, 에러 상태 UI를 만든다.

## 7. 상세 화면

- `/recipes/[id]`에서 실제 DB 데이터를 표시한다.
- 조회수 증가 로직을 추가한다.
- 북마크 기능을 구현하고 로그인 사용자별 상태를 반영한다.
- 작성자 본인에게만 수정/삭제 버튼을 노출한다.
- 삭제 전 확인 모달과 삭제 후 이동 처리를 구현한다.

## 8. 사용자 프로필

- `/users/[id]`에서 사용자 정보와 작성한 레시피 목록을 DB에서 조회한다.
- 프로필 이미지, 닉네임, 소개 수정 기능을 추가한다.
- 사용자의 공개 레시피만 노출되도록 필터링한다.

## 9. 테스트 및 품질 관리

- API route handler 단위 테스트를 추가한다.
- 레시피 작성 폼의 Zod 검증 테스트를 추가한다.
- 주요 화면 렌더링 테스트를 `@testing-library/react`로 작성한다.
- `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd test`를 PR 검증 기준으로 사용한다.

## 10. 배포 준비

- Vercel 프로젝트를 생성하고 환경 변수를 등록한다.
- Supabase PostgreSQL 연결 문자열을 운영 환경에 설정한다.
- Prisma migration 배포 절차를 문서화한다.
- 배포 후 로그인 콜백 URL, 이미지 업로드, 주요 라우트를 점검한다.
