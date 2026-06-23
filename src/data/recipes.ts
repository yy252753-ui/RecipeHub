import type { Ingredient, Recipe, RecipeStep } from "@/types/recipe";

export const recipes: Recipe[] = [
  {
    id: "sweet-corn-risotto",
    title: "제철 초당옥수수 리조또",
    description: "달콤한 초당옥수수와 파르미지아노 치즈로 완성하는 여름 리조또입니다.",
    cookTime: 35,
    difficulty: "보통",
    serving: 2,
    thumbnailImg: "/recipe-images/sweet-corn-risotto.png",
    author: "김민재",
    tags: ["제철", "리조또", "옥수수"],
    bookmarks: 128,
    likes: 342,
    views: 3418,
    rank: 2,
    createdAt: "2026-06-01"
  },
  {
    id: "perilla-noodle",
    title: "여름 들기름 막국수",
    description: "고소한 들기름과 간장 양념으로 빠르게 완성하는 시원한 면 요리입니다.",
    cookTime: 15,
    difficulty: "쉬움",
    serving: 2,
    thumbnailImg: "/recipe-images/perilla-noodle.png",
    author: "정하윤",
    tags: ["면요리", "여름", "간단"],
    bookmarks: 94,
    likes: 221,
    views: 2110,
    createdAt: "2026-05-29"
  },
  {
    id: "tomato-basil-salad",
    title: "토마토 바질 샐러드",
    description: "잘 익은 토마토와 바질, 올리브오일로 만드는 산뜻한 한 접시입니다.",
    cookTime: 10,
    difficulty: "쉬움",
    serving: 2,
    thumbnailImg: "/recipe-images/tomato-basil-salad.png",
    author: "박소희",
    tags: ["샐러드", "비건", "브런치"],
    bookmarks: 73,
    likes: 178,
    views: 1842,
    createdAt: "2026-05-24"
  },
  {
    id: "doenjang-pasta",
    title: "된장 크림 파스타",
    description: "구수한 된장과 크림 소스를 조합한 한국식 파스타입니다.",
    cookTime: 25,
    difficulty: "보통",
    serving: 1,
    thumbnailImg: "/recipe-images/doenjang-cream-pasta.png",
    author: "김민재",
    tags: ["파스타", "퓨전", "크림"],
    bookmarks: 156,
    likes: 396,
    views: 4320,
    rank: 1,
    createdAt: "2026-05-20"
  }
];

export const popularTags = ["간단", "집밥", "비건", "브런치", "면요리", "제철"];

export const featuredRecipe = recipes[0];

export const detailIngredients: Ingredient[] = [
  { name: "초당옥수수", amount: "3개" },
  { name: "아르보리오 쌀", amount: "1.5컵" },
  { name: "양파", amount: "1/2개" },
  { name: "채수", amount: "1L" },
  { name: "파르미지아노", amount: "50g" },
  { name: "무염버터", amount: "30g" }
];

export const detailSteps: RecipeStep[] = [
  {
    title: "옥수수 준비하기",
    description: "초당옥수수 알을 칼로 분리하고 심지는 채수에 넣어 향을 우려냅니다."
  },
  {
    title: "양파 볶기",
    description: "잘게 썬 양파를 버터에 투명해질 때까지 약한 불에서 볶습니다."
  },
  {
    title: "쌀 코팅하기",
    description: "쌀을 넣고 기름이 고르게 입혀질 때까지 볶은 뒤 채수를 조금씩 더합니다."
  },
  {
    title: "마무리하기",
    description: "옥수수 알과 치즈를 넣고 버터로 윤기를 더한 뒤 간을 맞춥니다."
  }
];
