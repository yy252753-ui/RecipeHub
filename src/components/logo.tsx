import Link from "next/link";
import { routes } from "@/constants/routes";

export function Logo() {
  return (
    <Link href={routes.home} className="inline-flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-primary text-white">
        <span className="text-lg font-extrabold">R</span>
      </span>
      <span className="font-display text-[21px] font-extrabold leading-none tracking-normal">
        <span>Recipe</span>
        <span className="text-primary">Hub</span>
      </span>
    </Link>
  );
}
