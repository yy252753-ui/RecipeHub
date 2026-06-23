import { notFound, redirect } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RecipeWriteForm, type RecipeWriteFormValues } from "../../write/recipe-write-form";

export const dynamic = "force-dynamic";

type EditRecipePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: {
      id
    },
    include: {
      ingredients: {
        orderBy: {
          order: "asc"
        }
      },
      steps: {
        orderBy: {
          order: "asc"
        }
      },
      tags: {
        include: {
          tag: true
        }
      }
    }
  });

  if (!recipe) {
    notFound();
  }

  if (recipe.userId !== userId) {
    redirect(`/recipes/${recipe.id}`);
  }

  const initialValues: RecipeWriteFormValues = {
    title: recipe.title,
    description: recipe.description,
    cookTime: recipe.cookTime,
    serving: recipe.serving,
    difficulty: recipe.difficulty,
    thumbnailImg: recipe.thumbnailImg ?? "",
    tagsText: recipe.tags.map((item) => item.tag.name).join(", "),
    ingredients: recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit ?? ""
    })),
    steps: recipe.steps.map((step) => ({
      description: step.description,
      img: step.img ?? ""
    }))
  };

  return (
    <PageShell>
      <RecipeWriteForm
        mode="edit"
        recipeId={recipe.id}
        initialValues={initialValues}
        backHref={`/recipes/${recipe.id}`}
      />
    </PageShell>
  );
}
