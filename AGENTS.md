# Repository Guidelines

## 프로젝트 구조 및 모듈 구성

RecipeHub는 Next.js App Router 기반 레시피 커뮤니티 앱입니다. `PRD.txt`는 제품 요구사항과 MVP 범위를, `design/`은 초기 화면 프로토타입과 디자인 토큰을 보관합니다.

- `src/app`: 라우트, 페이지, API Route Handler를 둡니다.
- `src/components`: 내비게이션, 카드, 버튼, 태그 등 재사용 UI를 둡니다.
- `src/data`: 현재 목 레시피 데이터를 둡니다. DB 연동 전 화면과 API의 임시 데이터 소스입니다.
- `src/lib`: Prisma, Auth, 공통 유틸을 둡니다.
- `src/types`, `src/constants`: 타입과 라우트 상수를 둡니다.
- `prisma/schema.prisma`: PRD의 User, Recipe, Ingredient, Step, Tag 모델을 정의합니다.

## 빌드, 테스트, 개발 명령

- `npm.cmd install`: 의존성을 설치합니다. PowerShell에서 `npm`이 막히면 `npm.cmd`를 사용하세요.
- `npm.cmd run dev`: 로컬 개발 서버를 실행합니다.
- `npm.cmd run build`: 프로덕션 빌드와 타입 검사를 수행합니다.
- `npm.cmd run lint`: Next.js ESLint 검사를 실행합니다.
- `npm.cmd test`: Vitest를 실행합니다. 현재 테스트 파일은 아직 없습니다.

## 코딩 스타일 및 네이밍 규칙

TypeScript와 JSX는 2칸 들여쓰기를 사용합니다. 컴포넌트는 PascalCase, 유틸 함수와 변수는 camelCase, 라우트 폴더는 App Router 규칙에 맞춘 소문자 경로를 사용합니다.

시각 스타일은 `src/app/globals.css`의 토큰과 Tailwind 유틸을 우선 사용하세요. 디자인 참고가 필요하면 `design/screens/common.jsx`와 `design/assets/wanted/colors_and_type.css`를 확인합니다.

## 테스트 지침

현재 자동화 테스트는 초기 설정만 되어 있습니다. 기능 로직, 폼 검증, API 동작을 추가할 때 `*.test.ts` 또는 `*.test.tsx` 파일을 함께 작성하세요. 화면 변경은 `npm.cmd run build`와 브라우저 수동 확인을 모두 수행합니다.

## 커밋 및 Pull Request 지침

현재 디렉터리는 git 저장소가 아니므로 기존 커밋 규칙은 없습니다. 커밋 메시지는 `Add recipe write page`, `Wire recipe API mock data`처럼 간결한 명령형 문장으로 작성하세요.

PR에는 목적, 변경된 라우트, 검증 명령, UI 변경 스크린샷을 포함합니다.

## 보안 및 설정 팁

비밀값은 `.env.local`에만 저장하고 커밋하지 마세요. 필요한 변수 이름은 `.env.example`에 값 없이 유지합니다. OAuth, PostgreSQL, Cloudinary 연동 전에는 API가 목 데이터 또는 501 응답을 반환하도록 둡니다.
