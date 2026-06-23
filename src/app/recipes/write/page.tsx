import { redirect } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { auth } from "@/lib/auth";
import { RecipeWriteForm } from "./recipe-write-form";

export const dynamic = "force-dynamic";

export default async function WriteRecipePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <PageShell>
      <RecipeWriteForm />
    </PageShell>
  );
}
