import Link from "next/link";
import { routes } from "@/constants/routes";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--color-background-neutral-secondary)] px-5 text-center">
      <div>
        <h1 className="text-3xl font-extrabold tracking-normal">페이지를 찾을 수 없습니다</h1>
        <p className="mt-3 text-[var(--color-text-neutral-secondary)]">
          요청한 레시피 또는 화면이 아직 준비되지 않았습니다.
        </p>
        <Link href={routes.home} className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-bold text-white">
          홈으로 이동
        </Link>
      </div>
    </main>
  );
}
