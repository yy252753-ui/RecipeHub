export type Difficulty = "쉬움" | "보통" | "어려움";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  cookTime: number;
  difficulty: Difficulty;
  serving: number;
  thumbnailImg?: string | null;
  author: string;
  tags: string[];
  bookmarks: number;
  likes: number;
  views: number;
  rank?: number;
  createdAt: string;
};

export type Ingredient = {
  name: string;
  amount: string;
};

export type RecipeStep = {
  title: string;
  description: string;
};
