import { NextResponse } from "next/server";
import { getPopularTags } from "@/lib/recipe-queries";

export async function GET() {
  const popularTags = await getPopularTags();

  return NextResponse.json(popularTags.map((name) => ({ name })));
}
