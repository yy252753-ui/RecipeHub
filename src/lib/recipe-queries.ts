import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Recipe } from "@/types/recipe";

export type RecipeSort = "popular" | "latest" | "oldest" | "cookTimeAsc" | "cookTimeDesc";

export type RecipeListOptions = {
  q?: string;
  tag?: string;
  sort?: RecipeSort;
  limit?: number;
  page?: number;
};

export const PAGE_SIZE = 12;

const difficultyLabels = {
  EASY: "쉬움",
  NORMAL: "보통",
  HARD: "어려움"
} as const;

export const curatedRecipeIds = [
  "sweet-corn-risotto",
  "tomato-basil-salad",
  "doenjang-pasta",
  "perilla-noodle",
  "warm-udon",
  "extra-bulgogi",
  "extra-spicy-pork-bulgogi",
  "extra-soy-pork-bulgogi",
  "extra-doenjang-jjigae",
  "extra-beef-doenjang-jjigae",
  "extra-seafood-doenjang-jjigae",
  "extra-zucchini-doenjang-jjigae",
  "extra-kimchi-jjigae",
  "extra-tuna-kimchi-jjigae",
  "extra-bibimbap",
  "extra-dolsot-bibimbap",
  "extra-japchae",
  "extra-tteokbokki",
  "extra-cheese-tteokbokki",
  "extra-rose-tteokbokki",
  "extra-gimbap",
  "extra-tuna-gimbap",
  "extra-kimchi-fried-rice",
  "extra-bossam",
  "extra-haemul-pajeon",
  "extra-sundubu-jjigae",
  "extra-budae-jjigae",
  "extra-samgyetang",
  "extra-dakbokkeumtang",
  "extra-jjimdak"
];

const authorByRecipeId: Record<string, string> = {
  "sweet-corn-risotto": "이로운",
  "tomato-basil-salad": "박소희",
  "doenjang-pasta": "김다온",
  "perilla-noodle": "정하윤",
  "warm-udon": "오세진",
  "extra-bulgogi": "김민재",
  "extra-spicy-pork-bulgogi": "박하린",
  "extra-soy-pork-bulgogi": "최윤아",
  "extra-doenjang-jjigae": "정도윤",
  "extra-beef-doenjang-jjigae": "강서연",
  "extra-seafood-doenjang-jjigae": "오지훈",
  "extra-zucchini-doenjang-jjigae": "문채원",
  "extra-kimchi-jjigae": "한유진",
  "extra-tuna-kimchi-jjigae": "서지우",
  "extra-bibimbap": "윤태오",
  "extra-dolsot-bibimbap": "임소율",
  "extra-japchae": "배준호",
  "extra-tteokbokki": "신나래",
  "extra-cheese-tteokbokki": "홍가은",
  "extra-rose-tteokbokki": "권예린",
  "extra-gimbap": "남지민",
  "extra-tuna-gimbap": "차은서",
  "extra-kimchi-fried-rice": "유현우",
  "extra-bossam": "백수아",
  "extra-haemul-pajeon": "송이준",
  "extra-sundubu-jjigae": "주하늘",
  "extra-budae-jjigae": "고은찬",
  "extra-samgyetang": "조아린",
  "extra-dakbokkeumtang": "민서준",
  "extra-jjimdak": "안도하"
};

const tasteNotesByRecipeId: Record<string, string> = {
  "extra-bulgogi":
    "간장 양념의 단맛과 고기 육즙이 먼저 올라오고, 양파가 익으면서 은근한 감칠맛을 더해줍니다.\n밥 위에 올리면 소스가 자연스럽게 스며들어 부담 없이 계속 손이 가는 집밥 맛입니다.",
  "extra-kimchi-jjigae":
    "잘 익은 김치의 산미가 국물에 깊게 배어 첫 숟가락부터 개운합니다.\n두부와 돼지고기를 같이 먹으면 칼칼함 뒤에 고소한 맛이 남아 밥반찬으로 좋습니다.",
  "extra-tteokbokki":
    "고추장 양념이 달큰하게 시작해서 뒤로 갈수록 매콤함이 올라오는 스타일입니다.\n떡은 쫀득하고 어묵 국물이 양념에 섞여 분식집에서 먹는 익숙한 맛을 냅니다.",
  "sweet-corn-risotto":
    "초당옥수수의 단맛이 크림처럼 부드러운 쌀알 사이에 퍼지는 레시피입니다.\n치즈의 짭조름함이 단맛을 잡아줘 느끼하지 않고, 한 접시 식사로도 충분히 든든합니다.",
  "extra-gimbap":
    "단무지의 산뜻함과 참기름 향이 먼저 느껴지고, 속재료가 씹힐수록 고소한 맛이 살아납니다.\n간이 세지 않아 라면이나 국물 요리와 곁들이기 좋은 균형 잡힌 김밥입니다.",
  "extra-bibimbap":
    "나물의 향과 고추장 양념이 섞이면서 매콤하고 고소한 맛이 한 번에 올라옵니다.\n참기름을 넉넉히 더하면 밥알이 윤기 있게 코팅되어 마지막 숟가락까지 풍성합니다.",
  "extra-japchae":
    "당면은 짭조름한 간장 양념을 머금고, 채소는 아삭하게 남아 식감 대비가 좋습니다.\n달큰한 양파와 버섯 향이 어우러져 따뜻하게 먹어도, 식어도 맛이 무너지지 않습니다."
};

export function getRecipeTasteNote(recipeId: string, title: string) {
  return (
    tasteNotesByRecipeId[recipeId] ??
    `${title}는 주재료의 맛을 살리면서 양념이 과하지 않게 어우러지는 레시피입니다.\n첫맛은 깔끔하고 뒤로 갈수록 감칠맛이 남아 집에서 편하게 따라 만들기 좋습니다.`
  );
}

const recipeInclude = {
  user: true,
  tags: {
    include: {
      tag: true
    }
  },
  ingredients: {
    orderBy: {
      order: "asc" as const
    }
  },
  steps: {
    orderBy: {
      order: "asc" as const
    }
  },
  _count: {
    select: {
      bookmarks: true,
      likes: true
    }
  }
};

type RecipeWithRelations = Awaited<ReturnType<typeof getRecipeById>>;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .format(date)
    .replace(/\. /g, "-")
    .replace(".", "");
}

export function toRecipeCard(recipe: NonNullable<RecipeWithRelations>): Recipe {
  return {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    cookTime: recipe.cookTime,
    difficulty: difficultyLabels[recipe.difficulty],
    serving: recipe.serving,
    thumbnailImg: recipe.thumbnailImg,
    author: authorByRecipeId[recipe.id] ?? recipe.user.nickname ?? recipe.user.name ?? "RecipeHub 사용자",
    tags: recipe.tags.map((item) => item.tag.name),
    bookmarks: recipe._count.bookmarks,
    likes: recipe._count.likes,
    views: recipe.views,
    createdAt: formatDate(recipe.createdAt)
  };
}

function getRecipeOrderBy(sort: RecipeSort = "popular") {
  if (sort === "popular") {
    return [
      {
        likes: {
          _count: "desc" as const
        }
      },
      {
        views: "desc" as const
      },
      {
        createdAt: "desc" as const
      }
    ];
  }

  if (sort === "oldest") {
    return { createdAt: "asc" as const };
  }

  if (sort === "cookTimeAsc") {
    return { cookTime: "asc" as const };
  }

  if (sort === "cookTimeDesc") {
    return { cookTime: "desc" as const };
  }

  return { createdAt: "desc" as const };
}

export function normalizeRecipeSort(sort?: string): RecipeSort {
  if (
    sort === "popular" ||
    sort === "oldest" ||
    sort === "cookTimeAsc" ||
    sort === "cookTimeDesc" ||
    sort === "latest"
  ) {
    return sort;
  }

  return "popular";
}

export async function getPublishedRecipes(options: RecipeListOptions = {}) {
  const q = options.q?.trim();
  const tag = options.tag?.trim();
  const page = options.page;
  const skip = page ? (page - 1) * PAGE_SIZE : undefined;
  const take = options.limit ?? (page ? PAGE_SIZE + 1 : undefined);

  return prisma.recipe.findMany({
    where: {
      status: "PUBLISHED",
      id: {
        in: curatedRecipeIds
      },
      ...(q
        ? {
            OR: [
              {
                title: {
                  contains: q,
                  mode: "insensitive" as const
                }
              },
              {
                description: {
                  contains: q,
                  mode: "insensitive" as const
                }
              },
              {
                tags: {
                  some: {
                    tag: {
                      name: {
                        contains: q,
                        mode: "insensitive" as const
                      }
                    }
                  }
                }
              }
            ]
          }
        : {}),
      ...(tag
        ? {
            tags: {
              some: {
                tag: {
                  name: tag
                }
              }
            }
          }
        : {})
    },
    orderBy: getRecipeOrderBy(options.sort),
    skip,
    take,
    include: recipeInclude
  });
}

export async function getRecipePage(options: RecipeListOptions & { page: number }) {
  const raw = await getPublishedRecipes(options);
  const hasMore = raw.length > PAGE_SIZE;
  const recipes = hasMore ? raw.slice(0, PAGE_SIZE) : raw;

  const rankById =
    options.page === 1
      ? new Map(
          recipes
            .slice()
            .sort((a, b) => b._count.likes - a._count.likes || b.views - a.views)
            .slice(0, 3)
            .map((r, i) => [r.id, i + 1])
        )
      : new Map<string, number>();

  return {
    items: recipes.map((recipe) => ({
      ...toRecipeCard(recipe),
      rank: rankById.get(recipe.id)
    })),
    hasMore
  };
}

export async function getRecipeCards(options: RecipeListOptions = {}) {
  const recipes = await getPublishedRecipes(options);
  const rankById = new Map(
    recipes
      .slice()
      .sort((a, b) => b._count.likes - a._count.likes || b.views - a.views)
      .slice(0, 3)
      .map((recipe, index) => [recipe.id, index + 1])
  );

  return recipes.map((recipe) => ({
    ...toRecipeCard(recipe),
    rank: rankById.get(recipe.id)
  }));
}

export const getRecipeById = cache(async function getRecipeById(id: string, options: { incrementView?: boolean } = {}) {
  const recipe = await prisma.recipe.findFirst({
    where: {
      id,
      status: "PUBLISHED"
    },
    include: recipeInclude
  });

  if (!recipe || !options.incrementView) {
    return recipe;
  }

  return prisma.recipe.update({
    where: {
      id: recipe.id
    },
    data: {
      views: {
        increment: 1
      }
    },
    include: recipeInclude
  });
});

export async function getPopularTags(limit = 12) {
  const tags = await prisma.tag.findMany({
    where: {
      recipes: {
        some: {
          recipeId: {
            in: curatedRecipeIds
          }
        }
      }
    },
    orderBy: {
      recipes: {
        _count: "desc"
      }
    },
    take: limit
  });

  return tags.map((tag) => tag.name);
}
