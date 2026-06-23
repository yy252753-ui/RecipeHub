import { Logo } from "@/components/logo";
import { signInWithKakao } from "@/app/auth/actions";

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl = "/" } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--color-background-neutral-secondary)] px-5">
      <section className="w-full max-w-[420px] rounded-2xl border border-[var(--color-line-normal-normal)] bg-white p-8">
        <Logo />
        <h1 className="mt-8 text-2xl font-extrabold tracking-normal">RecipeHub 시작하기</h1>
        <p className="mt-2 text-sm font-normal leading-6 text-[var(--color-text-neutral-secondary)]">
          카카오 계정으로 로그인하고 레시피 작성, 저장, 프로필 기능을 사용할 수 있습니다.
        </p>
        <form action={signInWithKakao} className="mt-7">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <button
            type="submit"
            className="h-12 w-full rounded-md bg-[#fee500] text-sm font-extrabold text-black"
          >
            Kakao로 계속하기
          </button>
        </form>
      </section>
    </main>
  );
}
