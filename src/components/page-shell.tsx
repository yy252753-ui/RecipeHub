import { SiteHeader } from "@/components/site-header";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="py-8 md:py-10">{children}</main>
    </>
  );
}
