# RecipeHub 현재 진행 상태

## 현재 단계

RecipeHub는 현재 **MVP 화면 골격, DB 기반 레시피 조회, 작성/수정/삭제, 이미지 업로드 코드, 검색/필터/정렬, 상세 화면 주요 기능, 사용자 프로필 DB 연동이 완료된 단계**입니다.

Kakao 로그인과 Prisma 기반 레시피 생성 API의 초기 구현이 들어가 있으며, 레시피 목록/상세/태그 조회는 DB 기반으로 전환되었습니다. 이미지 업로드는 Cloudinary 환경변수만 채워지면 동작하도록 구현되었습니다. 다만 테스트와 배포 준비는 아직 본격 구현 전입니다.

## 지금까지 완료된 것

- Next.js App Router 프로젝트 구조 구성
  - `src/app`
  - `src/components`
  - `src/data`
  - `src/lib`
  - `src/types`
  - `src/constants`
  - `prisma`
- 주요 화면 라우트 구현
  - `/`
  - `/recipes`
  - `/recipes/[id]`
  - `/recipes/write`
  - `/auth/login`
  - `/feed`
  - `/users/[id]`
- 공통 UI 컴포넌트 구현
  - 헤더
  - 로고
  - 페이지 쉘
  - 레시피 카드
  - 버튼
  - 태그
  - 음식 이미지 플레이스홀더
- `src/data/recipes.ts` 기반 목 레시피 데이터 구성
- Prisma 스키마 작성
  - `User`
  - `Account`
  - `Session`
  - `VerificationToken`
  - `Recipe`
  - `Ingredient`
  - `Step`
  - `Tag`
  - `RecipeTag`
- Auth.js / NextAuth Kakao provider 설정
- Auth.js Prisma Adapter 연결
- 로그인 페이지에서 Kakao 로그인 액션 연결
- 헤더에서 로그인 상태에 따라 로그인/로그아웃 UI 분기
- `/recipes/write` 보호 처리
  - 로그인하지 않은 사용자는 `/auth/login`으로 이동
- `POST /api/recipes` 초기 DB 저장 구현
  - 인증 확인
  - Zod payload 검증
  - `Recipe`, `Ingredient`, `Step`, `Tag`, `RecipeTag` 생성
- DB 기반 레시피 조회 전환
  - 홈 화면
  - `/recipes`
  - `/recipes/[id]`
  - `/feed`
  - `/users/[id]`
  - `/api/recipes` `GET`
  - `/api/recipes/[id]` `GET`
  - `/api/tags` `GET`
- Prisma seed 추가
  - `prisma/seed.js`
  - 기존 목 레시피 4개를 DB seed 데이터로 추가
  - `npx.cmd prisma db seed` 실행 완료
- 레시피 작성 폼 구현
  - `serving` 필드 DB 추가
  - `prisma/migrations/20260616050819_add_recipe_serving`
  - React Hook Form + Zod 검증 적용
  - 재료 추가/삭제
  - 조리 단계 추가/삭제
  - 쉼표 기반 태그 입력
  - 임시저장/출간하기 분기
  - 저장 성공 후 상세 페이지 이동
- 레시피 수정/삭제 구현
  - `PATCH /api/recipes/[id]`
  - `DELETE /api/recipes/[id]`
  - 작성자 본인 권한 확인
  - `/recipes/[id]/edit` 수정 페이지 추가
  - 작성 폼을 수정 화면에서도 재사용
  - 상세 화면에 작성자 본인용 수정/삭제 버튼 표시
  - 삭제 성공 후 `/recipes`로 이동
- 이미지 업로드 구현
  - `POST /api/upload/signature` Cloudinary 서명 생성
  - 대표 이미지 업로드 UI
  - 조리 단계별 이미지 업로드 UI
  - JPG, PNG, WebP 파일 형식 제한
  - 5MB 파일 용량 제한
  - 업로드 URL을 `Recipe.thumbnailImg`, `Step.img`에 저장
  - 카드/상세 화면에서 저장된 이미지 표시
- 검색, 필터, 정렬 구현
  - `/recipes?q=...` 검색어 query 연결
  - `/recipes?tag=...` 태그 필터 연결
  - `/recipes?sort=...` 정렬 연결
  - 제목/소개/태그 이름 기반 검색
  - 최신순, 오래된순, 조리시간 짧은순, 조리시간 긴순
  - `/api/recipes` query 처리
  - 빈 결과 UI 추가
- 상세 화면 기능 보강
  - `views` 필드 추가
  - `Bookmark` 모델 추가
  - `prisma/migrations/20260616054518_add_recipe_engagement`
  - 상세 페이지 조회 시 조회수 증가
  - 사용자별 북마크 토글 API 추가
  - 북마크 개수 표시
  - 로그인하지 않은 사용자의 북마크 클릭 시 로그인 페이지 이동
  - 공유 버튼 구현
  - Web Share API 미지원 시 링크 복사
- 사용자 프로필 구현
  - `User.bio` 필드 추가
  - `prisma/migrations/20260616054850_add_user_bio`
  - `/users/[id]` DB 조회
  - 공개 레시피 목록 표시
  - 본인 프로필에서 닉네임/소개/프로필 이미지 URL 수정
  - `PATCH /api/users/[id]` 프로필 수정 API
  - 헤더 프로필 링크를 로그인 사용자 id로 연결
- 기본 API Route 구성
  - `/api/auth/[...nextauth]`
  - `/api/recipes`
  - `/api/recipes/[id]`
  - `/api/tags`
  - `/api/upload/signature`
- 검증 상태
  - `npm.cmd run lint` 통과
  - `npm.cmd run build` 통과

## 아직 남은 핵심 작업

## 1. Kakao 로그인 실제 동작 확인

상태: 완료

Kakao Developers 설정과 로컬 환경변수가 실제로 맞는지 브라우저에서 확인해야 합니다.

확인할 항목:

- Kakao Developers에서 Kakao Login 활성화
- Redirect URI 등록

```text
http://localhost:3000/api/auth/callback/kakao
```

- `.env.local` 값 확인

```env
AUTH_SECRET=""
AUTH_KAKAO_ID=""
DATABASE_URL=""
DIRECT_URL=""
```

성공 기준:

- `/auth/login`에서 Kakao 로그인 버튼 클릭 시 Kakao 인증 화면으로 이동
- 인증 후 `/`로 돌아옴
- 헤더에 로그아웃 버튼 표시
- 로그인 사용자 정보가 DB `User`, `Account`, `Session`에 저장됨

## 2. 목 데이터에서 DB 데이터로 전환

상태: 완료

레시피 목록/상세/태그 조회는 Prisma 기반 DB 조회로 전환되었습니다.

전환 완료 대상:

- `/recipes`
- `/recipes/[id]`
- `/api/recipes` `GET`
- `/api/recipes/[id]` `GET`
- `/api/tags`

해야 할 일:

- 완료: Prisma seed 파일 작성
- 완료: 기존 목 데이터를 seed 데이터로 옮기기
- 완료: 레시피 목록 API를 Prisma 조회로 변경
- 완료: 레시피 상세 API와 상세 페이지를 Prisma 조회로 변경
- 완료: 태그 API를 DB 조회로 변경

참고:

- DB 조회 페이지는 `dynamic = "force-dynamic"`으로 설정했습니다.
- Supabase pooler의 prepared statement 충돌 때문에 빌드 시 DB 정적 생성을 피하고, 런타임에서 DB를 조회하도록 처리했습니다.

## 3. 레시피 작성 화면 실제 폼 구현

상태: 완료

`/recipes/write`는 실제 저장 가능한 폼으로 전환되었습니다.

해야 할 일:

- 완료: React Hook Form 적용
- 완료: Zod schema 적용
- 완료: 제목, 소개, 조리시간, 난이도, 분량 입력 연결
- 완료: 재료 추가/삭제
- 완료: 조리 단계 추가/삭제
- 완료: 태그 입력 및 최대 5개 제한
- 완료: 임시저장과 출간 상태 분리
- 완료: `POST /api/recipes` 호출
- 완료: 저장 성공 후 상세 페이지로 이동
- 완료: 저장 실패/검증 실패 UI 표시

## 4. 레시피 수정/삭제 구현

상태: 완료

`/api/recipes/[id]`의 수정/삭제가 DB와 연결되었습니다.

해야 할 일:

- 완료: `PATCH /api/recipes/[id]` 구현
- 완료: `DELETE /api/recipes/[id]` 구현
- 완료: 작성자 본인 확인
- 완료: 수정 페이지 `/recipes/[id]/edit` 추가
- 완료: 삭제 확인 UI 추가
- 완료: 삭제 후 목록 페이지 이동

## 5. 이미지 업로드 구현

상태: 코드 구현 완료, Cloudinary 환경변수 입력 필요

`/api/upload/signature`는 Cloudinary signed upload용 서명을 생성합니다. 작성/수정 폼에서 대표 이미지와 조리 단계 이미지를 업로드할 수 있습니다.

해야 할 일:

- 필요: Cloudinary 환경변수 설정
- 완료: Cloudinary 서명 생성 API 구현
- 완료: 대표 이미지 업로드
- 완료: 조리 단계별 이미지 업로드
- 완료: 업로드 실패 UI
- 완료: 파일 용량 및 형식 제한
- 완료: 업로드된 URL을 `Recipe.thumbnailImg`, `Step.img`에 저장

필요한 `.env.local` 값:

```env
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

## 6. 검색, 필터, 정렬 구현

상태: 완료

`/recipes`의 검색창, 태그 필터, 정렬 옵션이 실제 DB 조회와 연결되었습니다.

해야 할 일:

- 완료: 검색어 query parameter 연결
- 완료: 태그 필터 연결
- 완료: 정렬 옵션 구현
- 완료: API에서 검색/필터/정렬 처리
- 완료: 빈 결과 UI 추가
- 남음: cursor pagination 또는 무한 스크롤

## 7. 상세 화면 기능 보강

상태: 완료

상세 화면은 DB 기반으로 동작하며, 조회수/북마크/공유 기능이 추가되었습니다.

해야 할 일:

- 완료: DB 기반 레시피 상세 조회
- 완료: 재료/조리 단계/태그 실제 데이터 표시
- 완료: 조회수 증가 로직
- 완료: 북마크 기능
- 완료: 작성자 본인에게만 수정/삭제 버튼 표시
- 완료: 공유 버튼 동작 구현

## 8. 사용자 프로필 구현

상태: 완료

`/users/[id]` 화면은 DB 기반 사용자 프로필과 공개 레시피 목록을 보여줍니다.

해야 할 일:

- 완료: 사용자 정보 DB 조회
- 완료: 작성한 레시피 목록 조회
- 완료: 공개 레시피만 노출
- 완료: 프로필 이미지, 닉네임, 소개 수정
- 완료: 내 프로필과 다른 사용자 프로필 UI 분기

## 9. 테스트 추가

Vitest 설정은 있지만 테스트 파일이 아직 없습니다.

현재 상태:

- `npm.cmd test -- --run` 실행 시 테스트 파일이 없어서 종료 코드 1 발생

추가할 테스트:

- API route handler 테스트
- 레시피 작성 Zod 검증 테스트
- 주요 컴포넌트 렌더링 테스트
- 인증이 필요한 API/페이지 접근 테스트

## 10. 배포 준비

해야 할 일:

- Vercel 프로젝트 생성
- 운영 환경변수 등록
- Supabase PostgreSQL 연결 문자열 설정
- Prisma migration 배포 절차 정리
- Kakao 운영 callback URL 등록
- Cloudinary 운영 설정
- 배포 후 주요 라우트 수동 점검

## 추천 작업 순서

1. 완료: Kakao 로그인 실제 동작 확인
2. 완료: Prisma seed 작성 및 DB 데이터 준비
3. 완료: 레시피 목록/상세를 DB 조회로 전환
4. 완료: 레시피 작성 폼을 실제 저장 기능과 연결
5. 완료: 수정/삭제 API와 수정 화면 구현
6. 코드 완료: 이미지 업로드 구현
7. 완료: 검색/필터/정렬 구현
8. 완료: 상세 화면과 북마크 기능 보강
9. 완료: 사용자 프로필 DB 연동
10. 테스트 추가
11. 배포 준비

## 현재 검증 결과

```powershell
npm.cmd run lint
```

결과: 통과

```powershell
npm.cmd run build
```

결과: 통과

```powershell
npm.cmd test -- --run
```

결과: 테스트 파일이 없어 실패
