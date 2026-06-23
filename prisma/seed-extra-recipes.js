const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const extraRecipes = [
  ["extra-bulgogi", "소불고기", "불고기", "/recipe-images/bulgogi.png", 25, 2, "NORMAL"],
  ["extra-spicy-pork-bulgogi", "고추장 제육불고기", "불고기", "/recipe-images/bulgogi.png", 25, 2, "NORMAL"],
  ["extra-soy-pork-bulgogi", "간장 돼지불고기", "불고기", "/recipe-images/bulgogi.png", 22, 2, "EASY"],
  ["extra-tofu-bulgogi-bowl", "두부 불고기 덮밥", "불고기", "/recipe-images/bulgogi.png", 20, 1, "EASY"],
  ["extra-doenjang-jjigae", "된장찌개", "찌개", "/recipe-images/doenjang-jjigae.png", 20, 2, "EASY"],
  ["extra-beef-doenjang-jjigae", "차돌 된장찌개", "찌개", "/recipe-images/doenjang-jjigae.png", 25, 2, "NORMAL"],
  ["extra-seafood-doenjang-jjigae", "해물 된장찌개", "찌개", "/recipe-images/doenjang-jjigae.png", 25, 2, "NORMAL"],
  ["extra-zucchini-doenjang-jjigae", "애호박 된장찌개", "찌개", "/recipe-images/doenjang-jjigae.png", 18, 2, "EASY"],
  ["extra-kimchi-jjigae", "김치찌개", "찌개", "/recipe-images/kimchi-jjigae.png", 25, 2, "EASY"],
  ["extra-pork-kimchi-jjigae", "돼지고기 김치찌개", "찌개", "/recipe-images/kimchi-jjigae.png", 30, 2, "NORMAL"],
  ["extra-tuna-kimchi-jjigae", "참치 김치찌개", "찌개", "/recipe-images/kimchi-jjigae.png", 18, 2, "EASY"],
  ["extra-tofu-kimchi-jjigae", "두부 김치찌개", "찌개", "/recipe-images/kimchi-jjigae.png", 20, 2, "EASY"],
  ["extra-bibimbap", "비빔밥", "밥요리", "/recipe-images/bibimbap.png", 20, 1, "EASY"],
  ["extra-dolsot-bibimbap", "돌솥비빔밥", "밥요리", "/recipe-images/bibimbap.png", 30, 1, "NORMAL"],
  ["extra-vegetable-bibimbap", "채소 비빔밥", "밥요리", "/recipe-images/bibimbap.png", 18, 1, "EASY"],
  ["extra-bulgogi-bibimbap", "불고기 비빔밥", "밥요리", "/recipe-images/bibimbap.png", 25, 1, "NORMAL"],
  ["extra-japchae", "잡채", "면요리", "/recipe-images/japchae.png", 35, 3, "NORMAL"],
  ["extra-mushroom-japchae", "버섯 잡채", "면요리", "/recipe-images/japchae.png", 30, 3, "NORMAL"],
  ["extra-tteokbokki", "떡볶이", "분식", "/recipe-images/tteokbokki.png", 20, 2, "EASY"],
  ["extra-cheese-tteokbokki", "치즈 떡볶이", "분식", "/recipe-images/tteokbokki.png", 22, 2, "EASY"],
  ["extra-rose-tteokbokki", "로제 떡볶이", "분식", "/recipe-images/tteokbokki.png", 25, 2, "NORMAL"],
  ["extra-gimbap", "김밥", "분식", "/recipe-images/bibimbap.png", 30, 2, "NORMAL"],
  ["extra-tuna-gimbap", "참치마요 김밥", "분식", "/recipe-images/bibimbap.png", 25, 2, "NORMAL"],
  ["extra-kimchi-fried-rice", "김치볶음밥", "밥요리", "/recipe-images/kimchi-jjigae.png", 15, 1, "EASY"],
  ["extra-shrimp-fried-rice", "새우 볶음밥", "밥요리", "/recipe-images/bibimbap.png", 15, 1, "EASY"],
  ["extra-soybean-sprout-rice", "콩나물밥", "밥요리", "/recipe-images/bibimbap.png", 25, 2, "EASY"],
  ["extra-miyeokguk", "소고기 미역국", "국", "/recipe-images/doenjang-jjigae.png", 35, 3, "EASY"],
  ["extra-beef-radish-soup", "소고기 무국", "국", "/recipe-images/doenjang-jjigae.png", 30, 3, "EASY"],
  ["extra-galbitang", "갈비탕", "국", "/recipe-images/bulgogi.png", 60, 3, "HARD"],
  ["extra-samgyetang", "삼계탕", "국", "/recipe-images/doenjang-jjigae.png", 70, 2, "HARD"],
  ["extra-dakbokkeumtang", "닭볶음탕", "찜", "/recipe-images/kimchi-jjigae.png", 45, 3, "NORMAL"],
  ["extra-jjimdak", "간장 찜닭", "찜", "/recipe-images/bulgogi.png", 45, 3, "NORMAL"],
  ["extra-dakgalbi", "닭갈비", "볶음", "/recipe-images/tteokbokki.png", 35, 2, "NORMAL"],
  ["extra-haemul-pajeon", "해물파전", "전", "/recipe-images/japchae.png", 25, 2, "NORMAL"],
  ["extra-kimchi-jeon", "김치전", "전", "/recipe-images/kimchi-jjigae.png", 20, 2, "EASY"],
  ["extra-gamja-jeon", "감자전", "전", "/recipe-images/bibimbap.png", 20, 2, "EASY"],
  ["extra-bossam", "보쌈", "고기요리", "/recipe-images/bulgogi.png", 50, 3, "NORMAL"],
  ["extra-suyuk", "수육", "고기요리", "/recipe-images/bulgogi.png", 45, 3, "NORMAL"],
  ["extra-sundubu-jjigae", "순두부찌개", "찌개", "/recipe-images/kimchi-jjigae.png", 20, 2, "EASY"],
  ["extra-budae-jjigae", "부대찌개", "찌개", "/recipe-images/kimchi-jjigae.png", 25, 3, "NORMAL"],
  ["extra-mandu-guk", "만둣국", "국", "/recipe-images/warm-udon.png", 20, 2, "EASY"],
  ["extra-eomuk-tang", "어묵탕", "국", "/recipe-images/warm-udon.png", 20, 2, "EASY"],
  ["extra-jeyuk-deopbap", "제육덮밥", "밥요리", "/recipe-images/bulgogi.png", 20, 1, "EASY"],
  ["extra-egg-rice", "간장계란밥", "밥요리", "/recipe-images/bibimbap.png", 8, 1, "EASY"],
  ["extra-kongguksu", "콩국수", "면요리", "/recipe-images/perilla-noodle.png", 15, 1, "EASY"],
  ["extra-naengmyeon", "물냉면", "면요리", "/recipe-images/perilla-noodle.png", 20, 1, "NORMAL"],
  ["extra-egg-ramyeon", "계란 라면", "면요리", "/recipe-images/warm-udon.png", 8, 1, "EASY"],
  ["extra-grilled-mackerel", "고등어구이", "생선요리", "/recipe-images/bulgogi.png", 25, 2, "NORMAL"],
  ["extra-mushroom-rice-bowl", "버섯 덮밥", "밥요리", "/recipe-images/bibimbap.png", 18, 1, "EASY"],
  ["extra-spicy-tofu-stir-fry", "두부조림 덮밥", "밥요리", "/recipe-images/kimchi-jjigae.png", 20, 1, "EASY"]
];

const templates = {
  "불고기": {
    ingredients: [["고기", "250", "g"], ["간장", "2", "큰술"], ["설탕", "1", "큰술"], ["양파", "1/2", "개"], ["대파", "1/2", "대"]],
    steps: ["양념 재료를 섞어 고기에 버무립니다.", "팬을 달군 뒤 양파와 고기를 함께 볶습니다.", "대파를 넣고 한 번 더 볶아 따뜻하게 담아냅니다."]
  },
  "찌개": {
    ingredients: [["육수", "500", "ml"], ["두부", "1/2", "모"], ["대파", "1/2", "대"], ["양파", "1/2", "개"], ["고춧가루", "1", "작은술"]],
    steps: ["냄비에 육수와 기본 양념을 넣고 끓입니다.", "두부와 채소를 넣어 중불에서 끓입니다.", "간을 맞추고 대파를 올려 마무리합니다."]
  },
  "밥요리": {
    ingredients: [["밥", "1", "공기"], ["달걀", "1", "개"], ["참기름", "1", "작은술"], ["간장", "1", "큰술"], ["채소", "1", "줌"]],
    steps: ["밥과 곁들일 재료를 준비합니다.", "팬이나 그릇에 재료를 보기 좋게 담습니다.", "양념을 더해 골고루 비벼 먹습니다."]
  },
  "면요리": {
    ingredients: [["면", "1", "인분"], ["간장", "1", "큰술"], ["참기름", "1", "작은술"], ["대파", "1/3", "대"], ["깨", "1", "작은술"]],
    steps: ["면을 삶아 찬물 또는 따뜻한 육수에 맞게 준비합니다.", "양념과 고명을 준비합니다.", "면과 양념을 섞거나 육수를 부어 완성합니다."]
  },
  "분식": {
    ingredients: [["주재료", "2", "인분"], ["고추장", "1", "큰술"], ["설탕", "1", "작은술"], ["대파", "1/2", "대"], ["어묵", "1", "장"]],
    steps: ["팬에 양념과 물을 넣고 끓입니다.", "주재료를 넣어 양념이 배도록 끓입니다.", "대파를 넣고 농도를 맞춰 마무리합니다."]
  },
  "국": {
    ingredients: [["육수", "700", "ml"], ["국간장", "1", "큰술"], ["대파", "1/2", "대"], ["마늘", "1", "작은술"], ["소금", "1", "꼬집"]],
    steps: ["냄비에 육수를 끓입니다.", "주재료와 양념을 넣고 충분히 끓입니다.", "간을 맞추고 대파를 넣어 마무리합니다."]
  },
  "찜": {
    ingredients: [["주재료", "500", "g"], ["간장", "3", "큰술"], ["양파", "1/2", "개"], ["감자", "1", "개"], ["대파", "1/2", "대"]],
    steps: ["주재료를 먹기 좋게 손질합니다.", "양념과 함께 냄비에 넣고 중불에서 조립니다.", "채소가 익으면 불을 줄여 윤기 있게 마무리합니다."]
  },
  "볶음": {
    ingredients: [["주재료", "300", "g"], ["고추장", "1", "큰술"], ["간장", "1", "큰술"], ["양배추", "1", "줌"], ["대파", "1/2", "대"]],
    steps: ["팬을 달구고 주재료를 먼저 볶습니다.", "양념과 채소를 넣어 센 불에서 볶습니다.", "불을 줄이고 간을 맞춘 뒤 담아냅니다."]
  },
  "전": {
    ingredients: [["부침가루", "1", "컵"], ["물", "3/4", "컵"], ["주재료", "1", "줌"], ["식용유", "2", "큰술"], ["소금", "1", "꼬집"]],
    steps: ["부침 반죽을 만들고 주재료를 섞습니다.", "팬에 기름을 두르고 앞뒤로 노릇하게 부칩니다.", "먹기 좋게 잘라 양념장과 냅니다."]
  },
  "고기요리": {
    ingredients: [["고기", "500", "g"], ["된장", "1", "큰술"], ["마늘", "3", "쪽"], ["대파", "1", "대"], ["월계수잎", "1", "장"]],
    steps: ["고기를 찬물에 담가 핏물을 뺍니다.", "향신 채소와 함께 고기를 익힙니다.", "먹기 좋게 썰어 쌈채소와 냅니다."]
  },
  "생선요리": {
    ingredients: [["생선", "1", "마리"], ["소금", "1", "작은술"], ["식용유", "1", "큰술"], ["레몬", "1", "조각"], ["대파", "1/3", "대"]],
    steps: ["생선의 물기를 닦고 소금으로 밑간합니다.", "팬을 달궈 앞뒤로 노릇하게 굽습니다.", "기름을 빼고 곁들임과 함께 냅니다."]
  }
};

function recipePayload([id, title, category, thumbnailImg, cookTime, serving, difficulty]) {
  const template = templates[category] ?? templates["밥요리"];

  return {
    id,
    title,
    description: `${title}는 집에서 부담 없이 만들 수 있는 ${category} 레시피입니다.`,
    cookTime,
    serving,
    difficulty,
    thumbnailImg,
    status: "PUBLISHED",
    tags: [category, "한식", cookTime <= 20 ? "간단" : "집밥"],
    ingredients: template.ingredients,
    steps: template.steps
  };
}

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "seed@recipehub.local" },
    update: {},
    create: {
      email: "seed@recipehub.local",
      name: "RecipeHub Seed",
      nickname: "레시피허브",
      bio: "집밥 레시피를 기록합니다."
    }
  });

  for (const item of extraRecipes.map(recipePayload)) {
    const recipe = await prisma.recipe.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        description: item.description,
        cookTime: item.cookTime,
        serving: item.serving,
        difficulty: item.difficulty,
        thumbnailImg: item.thumbnailImg,
        status: item.status
      },
      create: {
        id: item.id,
        userId: user.id,
        title: item.title,
        description: item.description,
        cookTime: item.cookTime,
        serving: item.serving,
        difficulty: item.difficulty,
        thumbnailImg: item.thumbnailImg,
        status: item.status
      }
    });

    await prisma.ingredient.deleteMany({ where: { recipeId: recipe.id } });
    await prisma.step.deleteMany({ where: { recipeId: recipe.id } });
    await prisma.recipeTag.deleteMany({ where: { recipeId: recipe.id } });

    await prisma.ingredient.createMany({
      data: item.ingredients.map(([name, amount, unit], index) => ({
        recipeId: recipe.id,
        name,
        amount,
        unit,
        order: index + 1
      }))
    });

    await prisma.step.createMany({
      data: item.steps.map((description, index) => ({
        recipeId: recipe.id,
        description,
        order: index + 1
      }))
    });

    for (const name of item.tags) {
      const tag = await prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name }
      });

      await prisma.recipeTag.create({
        data: {
          recipeId: recipe.id,
          tagId: tag.id
        }
      });
    }
  }

  const count = await prisma.recipe.count({
    where: {
      id: {
        startsWith: "extra-"
      }
    }
  });

  console.log(`Seeded extra recipes: ${count}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
