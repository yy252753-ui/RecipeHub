const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const stepImages = [
  "/recipe-images/steps/step-1-prep.png",
  "/recipe-images/steps/step-2-seasoning.png",
  "/recipe-images/steps/step-3-cook.png",
  "/recipe-images/steps/step-4-simmer.png",
  "/recipe-images/steps/step-5-serve.png"
];

const imageById = {
  "extra-bulgogi": "/recipe-images/bulgogi.png",
  "extra-spicy-pork-bulgogi": "/recipe-images/bulgogi.png",
  "extra-soy-pork-bulgogi": "/recipe-images/bulgogi.png",
  "extra-tofu-bulgogi-bowl": "/recipe-images/bulgogi.png",
  "extra-doenjang-jjigae": "/recipe-images/doenjang-jjigae.png",
  "extra-beef-doenjang-jjigae": "/recipe-images/doenjang-jjigae.png",
  "extra-seafood-doenjang-jjigae": "/recipe-images/doenjang-jjigae.png",
  "extra-zucchini-doenjang-jjigae": "/recipe-images/doenjang-jjigae.png",
  "extra-kimchi-jjigae": "/recipe-images/kimchi-jjigae.png",
  "extra-pork-kimchi-jjigae": "/recipe-images/kimchi-jjigae.png",
  "extra-tuna-kimchi-jjigae": "/recipe-images/kimchi-jjigae.png",
  "extra-tofu-kimchi-jjigae": "/recipe-images/kimchi-jjigae.png",
  "extra-bibimbap": "/recipe-images/bibimbap.png",
  "extra-dolsot-bibimbap": "/recipe-images/bibimbap.png",
  "extra-vegetable-bibimbap": "/recipe-images/bibimbap.png",
  "extra-bulgogi-bibimbap": "/recipe-images/bibimbap.png",
  "extra-japchae": "/recipe-images/japchae.png",
  "extra-mushroom-japchae": "/recipe-images/japchae.png",
  "extra-tteokbokki": "/recipe-images/tteokbokki.png",
  "extra-cheese-tteokbokki": "/recipe-images/tteokbokki.png",
  "extra-rose-tteokbokki": "/recipe-images/tteokbokki.png",
  "extra-gimbap": "/recipe-images/gimbap.png",
  "extra-tuna-gimbap": "/recipe-images/gimbap.png",
  "extra-kimchi-fried-rice": "/recipe-images/kimchi-fried-rice.png",
  "extra-shrimp-fried-rice": "/recipe-images/kimchi-fried-rice.png",
  "extra-soybean-sprout-rice": "/recipe-images/bibimbap.png",
  "extra-miyeokguk": "/recipe-images/samgyetang.png",
  "extra-beef-radish-soup": "/recipe-images/samgyetang.png",
  "extra-galbitang": "/recipe-images/samgyetang.png",
  "extra-samgyetang": "/recipe-images/samgyetang.png",
  "extra-dakbokkeumtang": "/recipe-images/dakbokkeumtang.png",
  "extra-jjimdak": "/recipe-images/dakbokkeumtang.png",
  "extra-dakgalbi": "/recipe-images/dakbokkeumtang.png",
  "extra-haemul-pajeon": "/recipe-images/haemul-pajeon.png",
  "extra-kimchi-jeon": "/recipe-images/haemul-pajeon.png",
  "extra-gamja-jeon": "/recipe-images/haemul-pajeon.png",
  "extra-bossam": "/recipe-images/bossam.png",
  "extra-suyuk": "/recipe-images/bossam.png",
  "extra-sundubu-jjigae": "/recipe-images/kimchi-jjigae.png",
  "extra-budae-jjigae": "/recipe-images/kimchi-jjigae.png",
  "extra-mandu-guk": "/recipe-images/warm-udon.png",
  "extra-eomuk-tang": "/recipe-images/warm-udon.png",
  "extra-jeyuk-deopbap": "/recipe-images/bulgogi.png",
  "extra-egg-rice": "/recipe-images/bibimbap.png",
  "extra-kongguksu": "/recipe-images/perilla-noodle.png",
  "extra-naengmyeon": "/recipe-images/perilla-noodle.png",
  "extra-egg-ramyeon": "/recipe-images/warm-udon.png",
  "extra-grilled-mackerel": "/recipe-images/haemul-pajeon.png",
  "extra-mushroom-rice-bowl": "/recipe-images/bibimbap.png",
  "extra-spicy-tofu-stir-fry": "/recipe-images/kimchi-jjigae.png"
};

const ingredientSets = {
  bulgogi: [
    ["소고기 불고기감", "400", "g"],
    ["양파", "1/2", "개"],
    ["대파", "1", "대"],
    ["당근", "1/4", "개"],
    ["표고버섯", "2", "개"],
    ["간장", "4", "큰술"],
    ["설탕", "1.5", "큰술"],
    ["맛술", "2", "큰술"],
    ["다진 마늘", "1", "큰술"],
    ["참기름", "1", "큰술"],
    ["후춧가루", "약간", ""],
    ["통깨", "1", "작은술"]
  ],
  jjigae: [
    ["육수", "700", "ml"],
    ["두부", "1/2", "모"],
    ["양파", "1/2", "개"],
    ["애호박", "1/3", "개"],
    ["대파", "1/2", "대"],
    ["청양고추", "1", "개"],
    ["다진 마늘", "1", "작은술"],
    ["고춧가루", "1", "작은술"],
    ["국간장", "1", "큰술"],
    ["소금", "약간", ""]
  ],
  kimchiJjigae: [
    ["익은 김치", "300", "g"],
    ["돼지고기 앞다리살", "180", "g"],
    ["두부", "1/2", "모"],
    ["양파", "1/2", "개"],
    ["대파", "1/2", "대"],
    ["김치국물", "1/2", "컵"],
    ["쌀뜨물 또는 육수", "700", "ml"],
    ["고춧가루", "1", "큰술"],
    ["다진 마늘", "1", "작은술"],
    ["국간장", "1", "큰술"],
    ["설탕", "1/2", "작은술"]
  ],
  rice: [
    ["밥", "1", "공기"],
    ["달걀", "1", "개"],
    ["당근", "1/4", "개"],
    ["애호박", "1/4", "개"],
    ["시금치", "1", "줌"],
    ["버섯", "1", "줌"],
    ["김가루", "1", "줌"],
    ["고추장", "1", "큰술"],
    ["참기름", "1", "큰술"],
    ["통깨", "1", "작은술"]
  ],
  noodle: [
    ["면", "1", "인분"],
    ["오이", "1/4", "개"],
    ["대파", "1/3", "대"],
    ["김가루", "1", "줌"],
    ["깨", "1", "큰술"],
    ["간장", "1.5", "큰술"],
    ["식초", "1", "큰술"],
    ["설탕", "1", "작은술"],
    ["참기름", "1", "큰술"],
    ["달걀", "1", "개"]
  ],
  snack: [
    ["떡 또는 주재료", "300", "g"],
    ["어묵", "2", "장"],
    ["대파", "1/2", "대"],
    ["양배추", "1", "줌"],
    ["물", "500", "ml"],
    ["고추장", "2", "큰술"],
    ["고춧가루", "1", "큰술"],
    ["간장", "1", "큰술"],
    ["설탕", "1.5", "큰술"],
    ["다진 마늘", "1", "작은술"]
  ],
  soup: [
    ["육수", "900", "ml"],
    ["주재료", "300", "g"],
    ["무", "1", "토막"],
    ["대파", "1", "대"],
    ["다진 마늘", "1", "큰술"],
    ["국간장", "1.5", "큰술"],
    ["소금", "약간", ""],
    ["후춧가루", "약간", ""],
    ["참기름", "1", "작은술"]
  ],
  braise: [
    ["닭 또는 주재료", "700", "g"],
    ["감자", "1", "개"],
    ["당근", "1/2", "개"],
    ["양파", "1", "개"],
    ["대파", "1", "대"],
    ["간장", "4", "큰술"],
    ["고춧가루", "2", "큰술"],
    ["설탕", "1", "큰술"],
    ["다진 마늘", "1", "큰술"],
    ["물", "600", "ml"]
  ],
  jeon: [
    ["부침가루", "1", "컵"],
    ["물", "3/4", "컵"],
    ["달걀", "1", "개"],
    ["쪽파 또는 주재료", "2", "줌"],
    ["해물 또는 김치", "1", "컵"],
    ["양파", "1/4", "개"],
    ["청양고추", "1", "개"],
    ["식용유", "넉넉히", ""],
    ["간장", "1", "큰술"],
    ["식초", "1", "작은술"]
  ],
  meat: [
    ["돼지고기 수육용", "700", "g"],
    ["대파", "1", "대"],
    ["양파", "1", "개"],
    ["마늘", "6", "쪽"],
    ["된장", "1", "큰술"],
    ["월계수잎", "2", "장"],
    ["통후추", "1", "작은술"],
    ["물", "1.5", "L"],
    ["쌈채소", "적당량", ""],
    ["쌈장", "적당량", ""]
  ],
  fish: [
    ["고등어", "1", "마리"],
    ["굵은소금", "1", "작은술"],
    ["식용유", "1", "큰술"],
    ["레몬", "1", "조각"],
    ["대파", "1/3", "대"],
    ["후춧가루", "약간", ""],
    ["쌀뜨물", "2", "컵"],
    ["종이타월", "2", "장"]
  ]
};

function kindForRecipe(id) {
  if (id.includes("bulgogi") || id.includes("jeyuk")) return "bulgogi";
  if (id.includes("kimchi-jjigae") || id.includes("sundubu") || id.includes("budae") || id.includes("tofu-stir")) return "kimchiJjigae";
  if (id.includes("jjigae")) return "jjigae";
  if (id.includes("bibimbap") || id.includes("rice") || id.includes("deopbap") || id.includes("egg-rice")) return "rice";
  if (id.includes("japchae") || id.includes("guksu") || id.includes("naengmyeon") || id.includes("ramyeon")) return "noodle";
  if (id.includes("tteokbokki") || id.includes("gimbap")) return "snack";
  if (id.includes("guk") || id.includes("tang") || id.includes("samgyetang")) return "soup";
  if (id.includes("dak") || id.includes("jjimdak")) return "braise";
  if (id.includes("jeon")) return "jeon";
  if (id.includes("bossam") || id.includes("suyuk")) return "meat";
  if (id.includes("mackerel")) return "fish";
  return "rice";
}

function stepsForRecipe(title, kind) {
  const base = {
    bulgogi: [
      `${title}에 들어갈 고기와 채소를 먹기 좋은 크기로 손질합니다.`,
      `간장, 설탕, 다진 마늘, 참기름을 섞어 ${title} 양념장을 만듭니다.`,
      `고기에 양념장을 넣고 15분 이상 재워 간이 배게 합니다.`,
      `달군 팬에 고기와 채소를 넣고 센 불에서 수분을 날리며 볶습니다.`,
      `대파와 통깨를 올리고 밥과 함께 담아냅니다.`
    ],
    jjigae: [
      `${title}에 들어갈 두부와 채소를 한입 크기로 썹니다.`,
      `육수에 된장 또는 기본 양념을 풀어 국물 베이스를 만듭니다.`,
      `단단한 채소부터 넣고 끓여 국물 맛을 냅니다.`,
      `두부, 대파, 고추를 넣고 중불에서 5분 더 끓입니다.`,
      `부족한 간을 맞춘 뒤 뜨거울 때 상에 냅니다.`
    ],
    kimchiJjigae: [
      `${title}용 김치와 고기, 두부, 대파를 준비합니다.`,
      `냄비에 고기와 김치를 먼저 볶아 깊은 맛을 냅니다.`,
      `김치국물과 육수를 붓고 중불에서 끓입니다.`,
      `두부와 대파를 넣고 국물이 진해질 때까지 더 끓입니다.`,
      `간을 맞추고 밥과 곁들여 냅니다.`
    ],
    rice: [
      `${title}에 올릴 채소와 고명을 각각 손질합니다.`,
      `채소는 소금과 참기름으로 가볍게 볶거나 무칩니다.`,
      `따뜻한 밥을 그릇에 담고 준비한 재료를 둘러 올립니다.`,
      `달걀과 양념장을 올려 맛의 균형을 맞춥니다.`,
      `먹기 직전에 참기름과 깨를 넣고 비벼냅니다.`
    ],
    noodle: [
      `${title}에 사용할 면과 고명을 준비합니다.`,
      `면을 삶아 찬물에 헹구거나 따뜻한 육수에 맞게 준비합니다.`,
      `간장, 참기름, 식초 등으로 양념장을 만듭니다.`,
      `면과 양념을 섞고 고명을 넉넉히 올립니다.`,
      `간을 확인한 뒤 바로 먹기 좋게 담아냅니다.`
    ],
    snack: [
      `${title}의 주재료와 어묵, 채소를 먹기 좋게 자릅니다.`,
      `고추장 양념과 물을 냄비에 넣고 먼저 끓입니다.`,
      `주재료를 넣어 양념이 배도록 중불에서 끓입니다.`,
      `대파와 추가 고명을 넣고 농도가 나도록 졸입니다.`,
      `그릇에 담고 따뜻할 때 바로 냅니다.`
    ],
    soup: [
      `${title}에 필요한 주재료와 향신 채소를 준비합니다.`,
      `냄비에 육수와 주재료를 넣고 끓이기 시작합니다.`,
      `거품을 걷어내며 국물이 맑아지도록 끓입니다.`,
      `국간장, 마늘, 대파로 간과 향을 맞춥니다.`,
      `마지막 간을 보고 뜨겁게 담아냅니다.`
    ],
    braise: [
      `${title}의 주재료를 데치거나 씻어 잡내를 줄입니다.`,
      `간장 또는 고추장 양념을 섞어 조림 양념을 만듭니다.`,
      `냄비에 주재료와 단단한 채소를 넣고 양념을 붓습니다.`,
      `중불에서 졸이며 중간중간 뒤섞어 양념을 입힙니다.`,
      `국물이 자작해지면 대파를 넣고 완성합니다.`
    ],
    jeon: [
      `${title}에 들어갈 재료의 물기를 제거하고 잘게 썹니다.`,
      `부침가루, 물, 달걀을 섞어 묽은 반죽을 만듭니다.`,
      `손질한 재료를 반죽에 넣고 고르게 섞습니다.`,
      `기름을 두른 팬에 앞뒤로 노릇하게 부칩니다.`,
      `먹기 좋은 크기로 잘라 양념장과 함께 냅니다.`
    ],
    meat: [
      `${title}용 고기를 찬물에 담가 핏물을 뺍니다.`,
      `냄비에 향신 채소와 된장을 넣고 물을 끓입니다.`,
      `고기를 넣고 속까지 익도록 중약불에서 삶습니다.`,
      `익은 고기를 꺼내 잠시 식힌 뒤 두툼하게 썹니다.`,
      `쌈채소, 김치, 쌈장과 함께 담아냅니다.`
    ],
    fish: [
      `${title}용 생선을 쌀뜨물에 담가 비린내를 줄입니다.`,
      `물기를 닦고 소금과 후추로 밑간합니다.`,
      `팬을 달구고 기름을 둘러 껍질 쪽부터 굽습니다.`,
      `뒤집어 속까지 익히고 겉면을 바삭하게 만듭니다.`,
      `기름을 빼고 레몬이나 대파와 함께 냅니다.`
    ]
  };

  return base[kind] ?? base.rice;
}

async function main() {
  const recipes = await prisma.recipe.findMany({
    where: {
      id: {
        startsWith: "extra-"
      }
    },
    select: {
      id: true,
      title: true
    }
  });

  for (const recipe of recipes) {
    const kind = kindForRecipe(recipe.id);
    const thumbnailImg = imageById[recipe.id] ?? "/recipe-images/bibimbap.png";

    await prisma.recipe.update({
      where: {
        id: recipe.id
      },
      data: {
        thumbnailImg,
        description: `${recipe.title}는 실제 집밥 흐름에 맞춰 재료 손질부터 완성까지 5단계로 정리한 레시피입니다.`
      }
    });

    await prisma.ingredient.deleteMany({
      where: {
        recipeId: recipe.id
      }
    });

    await prisma.step.deleteMany({
      where: {
        recipeId: recipe.id
      }
    });

    await prisma.ingredient.createMany({
      data: ingredientSets[kind].map(([name, amount, unit], index) => ({
        recipeId: recipe.id,
        name,
        amount,
        unit,
        order: index + 1
      }))
    });

    await prisma.step.createMany({
      data: stepsForRecipe(recipe.title, kind).map((description, index) => ({
        recipeId: recipe.id,
        description,
        img: stepImages[index],
        order: index + 1
      }))
    });
  }

  const sample = await prisma.recipe.findMany({
    where: {
      id: {
        in: ["extra-bulgogi", "extra-doenjang-jjigae", "extra-kimchi-jjigae"]
      }
    },
    select: {
      id: true,
      title: true,
      thumbnailImg: true,
      ingredients: true,
      steps: true
    }
  });

  console.log(
    JSON.stringify(
      sample.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        thumbnailImg: recipe.thumbnailImg,
        ingredientCount: recipe.ingredients.length,
        stepCount: recipe.steps.length,
        stepImages: recipe.steps.map((step) => step.img)
      })),
      null,
      2
    )
  );
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
