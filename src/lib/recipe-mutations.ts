import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const recipePayloadSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  cookTime: z.coerce.number().int().positive(),
  serving: z.coerce.number().int().positive().default(1),
  difficulty: z.enum(["EASY", "NORMAL", "HARD"]),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  thumbnailImg: z.string().url().optional().or(z.literal("")),
  ingredients: z
    .array(
      z.object({
        name: z.string().trim().min(1),
        amount: z.string().trim().min(1),
        unit: z.string().trim().optional()
      })
    )
    .min(1),
  steps: z
    .array(
      z.object({
        description: z.string().trim().min(1),
        img: z.string().url().optional().or(z.literal(""))
      })
    )
    .min(1),
  tags: z.array(z.string().trim().min(1)).max(5).default([])
});

export type RecipePayload = z.infer<typeof recipePayloadSchema>;

export function normalizeTagNames(tags: string[]) {
  return Array.from(new Set(tags.map((tag) => tag.trim()).filter(Boolean)));
}

export function buildRecipeRelationData(data: RecipePayload) {
  const tagNames = normalizeTagNames(data.tags);

  return {
    ingredients: {
      create: data.ingredients.map((ingredient, index) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit || null,
        order: index + 1
      }))
    },
    steps: {
      create: data.steps.map((step, index) => ({
        order: index + 1,
        description: step.description,
        img: step.img || null
      }))
    },
    tags: {
      create: tagNames.map((name) => ({
        tag: {
          connectOrCreate: {
            where: { name },
            create: { name }
          }
        }
      }))
    }
  };
}

export async function replaceRecipeRelations(recipeId: string, data: RecipePayload) {
  await prisma.ingredient.deleteMany({
    where: {
      recipeId
    }
  });
  await prisma.step.deleteMany({
    where: {
      recipeId
    }
  });
  await prisma.recipeTag.deleteMany({
    where: {
      recipeId
    }
  });

  return prisma.recipe.update({
    where: {
      id: recipeId
    },
    data: {
      ingredients: buildRecipeRelationData(data).ingredients,
      steps: buildRecipeRelationData(data).steps,
      tags: buildRecipeRelationData(data).tags
    },
    include: {
      ingredients: true,
      steps: true,
      tags: {
        include: {
          tag: true
        }
      }
    }
  });
}
