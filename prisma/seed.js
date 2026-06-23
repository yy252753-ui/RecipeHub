const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const recipes = [
  {
    id: "sweet-corn-risotto",
    thumbnailImg: "/recipe-images/sweet-corn-risotto.png",
    title: "제철 초당옥수수 리조또",
    description: "달콤한 초당옥수수와 파르미지아노 치즈로 완성하는 여름 리조또입니다.",
    cookTime: 35,
    serving: 2,
    difficulty: "NORMAL",
    tags: ["제철", "리조또", "옥수수"],
    ingredients: [
      ["초당옥수수", "3", "개"],
      ["아르보리오 쌀", "1.5", "컵"],
      ["양파", "1/2", "개"],
      ["채수", "1", "L"],
      ["파르미지아노", "50", "g"],
      ["무염버터", "30", "g"]
    ],
    steps: [
      "초당옥수수 알을 칼로 분리하고 심지는 채수에 넣어 향을 우려냅니다.",
      "잘게 썬 양파를 버터에 투명해질 때까지 약한 불에서 볶습니다.",
      "쌀을 넣고 기름이 고르게 입혀질 때까지 볶은 뒤 채수를 조금씩 더합니다.",
      "옥수수 알과 치즈를 넣고 버터로 윤기를 더한 뒤 간을 맞춥니다."
    ]
  },
  {
    id: "perilla-noodle",
    thumbnailImg: "/recipe-images/perilla-noodle.png",
    title: "여름 들기름 막국수",
    description: "고소한 들기름과 간장 양념으로 빠르게 완성하는 시원한 면 요리입니다.",
    cookTime: 15,
    serving: 2,
    difficulty: "EASY",
    tags: ["면요리", "여름", "간단"],
    ingredients: [
      ["메밀면", "200", "g"],
      ["들기름", "2", "큰술"],
      ["양조간장", "1", "큰술"],
      ["김가루", "1", "줌"]
    ],
    steps: [
      "면을 끓는 물에 삶은 뒤 찬물에 헹궈 물기를 제거합니다.",
      "들기름, 간장, 김가루를 넣고 고르게 버무립니다.",
      "기호에 따라 깨와 쪽파를 올려 마무리합니다."
    ]
  },
  {
    id: "warm-udon",
    thumbnailImg: "/recipe-images/warm-udon.png",
    title: "따뜻한 버섯 우동",
    description: "맑은 육수에 통통한 우동면과 버섯, 반숙 달걀을 올린 든든한 한 그릇입니다.",
    cookTime: 20,
    serving: 1,
    difficulty: "EASY",
    tags: ["우동", "면요리", "간단"],
    ingredients: [
      ["우동면", "1", "인분"],
      ["육수", "500", "ml"],
      ["표고버섯", "2", "개"],
      ["대파", "1/3", "대"],
      ["달걀", "1", "개"]
    ],
    steps: [
      "육수를 끓이고 표고버섯을 얇게 썰어 넣습니다.",
      "우동면을 넣고 면이 부드러워질 때까지 끓입니다.",
      "대파와 반숙 달걀, 김가루를 올려 마무리합니다."
    ]
  },
  {
    id: "tomato-basil-salad",
    thumbnailImg: "/recipe-images/tomato-basil-salad.png",
    title: "토마토 바질 샐러드",
    description: "잘 익은 토마토와 바질, 올리브오일로 만드는 산뜻한 한 접시입니다.",
    cookTime: 10,
    serving: 2,
    difficulty: "EASY",
    tags: ["샐러드", "비건", "브런치"],
    ingredients: [
      ["토마토", "3", "개"],
      ["바질", "10", "장"],
      ["올리브오일", "2", "큰술"],
      ["소금", "1", "꼬집"]
    ],
    steps: [
      "토마토를 먹기 좋은 크기로 썹니다.",
      "바질과 올리브오일, 소금을 넣고 가볍게 섞습니다.",
      "차갑게 두었다가 접시에 담아 냅니다."
    ]
  },
  {
    id: "doenjang-pasta",
    thumbnailImg: "/recipe-images/doenjang-cream-pasta.png",
    title: "된장 크림 파스타",
    description: "구수한 된장과 크림 소스를 조합한 한국식 파스타입니다.",
    cookTime: 25,
    serving: 1,
    difficulty: "NORMAL",
    tags: ["파스타", "퓨전", "크림"],
    ingredients: [
      ["스파게티면", "100", "g"],
      ["된장", "1", "큰술"],
      ["생크림", "120", "ml"],
      ["마늘", "2", "쪽"]
    ],
    steps: [
      "스파게티면을 소금물에 삶습니다.",
      "팬에 마늘을 볶고 된장과 생크림을 넣어 소스를 만듭니다.",
      "삶은 면을 넣고 농도를 맞춘 뒤 접시에 담습니다."
    ]
  }
];

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "seed@recipehub.local"
    },
    update: {},
    create: {
      email: "seed@recipehub.local",
      name: "RecipeHub Seed",
      nickname: "이서준",
      bio: "제철 재료로 만드는 집밥 레시피를 기록합니다."
    }
  });

  for (const recipe of recipes) {
    await prisma.recipe.upsert({
      where: {
        id: recipe.id
      },
      update: {
        title: recipe.title,
        description: recipe.description,
        cookTime: recipe.cookTime,
        serving: recipe.serving,
        difficulty: recipe.difficulty,
        thumbnailImg: recipe.thumbnailImg,
        status: "PUBLISHED"
      },
      create: {
        id: recipe.id,
        userId: user.id,
        title: recipe.title,
        description: recipe.description,
        cookTime: recipe.cookTime,
        serving: recipe.serving,
        difficulty: recipe.difficulty,
        thumbnailImg: recipe.thumbnailImg,
        status: "PUBLISHED",
        ingredients: {
          create: recipe.ingredients.map(([name, amount, unit], index) => ({
            name,
            amount,
            unit,
            order: index + 1
          }))
        },
        steps: {
          create: recipe.steps.map((description, index) => ({
            description,
            order: index + 1
          }))
        },
        tags: {
          create: recipe.tags.map((name) => ({
            tag: {
              connectOrCreate: {
                where: {
                  name
                },
                create: {
                  name
                }
              }
            }
          }))
        }
      }
    });
  }
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
