const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const updates = {
  "extra-tuna-kimchi-jjigae": "/recipe-images/tuna-kimchi-jjigae.png",
  "extra-budae-jjigae": "/recipe-images/budae-jjigae.png",
  "extra-sundubu-jjigae": "/recipe-images/sundubu-jjigae.png",
  "extra-dolsot-bibimbap": "/recipe-images/dolsot-bibimbap.png",
  "extra-tuna-gimbap": "/recipe-images/tuna-gimbap.png",
  "extra-cheese-tteokbokki": "/recipe-images/cheese-tteokbokki.png",
  "extra-rose-tteokbokki": "/recipe-images/rose-tteokbokki.png",
  "extra-jjimdak": "/recipe-images/jjimdak.png",
  "extra-beef-doenjang-jjigae": "/recipe-images/chadol-doenjang-jjigae.png",
  "extra-seafood-doenjang-jjigae": "/recipe-images/seafood-doenjang-jjigae.png",
  "extra-zucchini-doenjang-jjigae": "/recipe-images/zucchini-doenjang-jjigae.png",
  "extra-soy-pork-bulgogi": "/recipe-images/soy-pork-bulgogi.png",
  "extra-spicy-pork-bulgogi": "/recipe-images/spicy-pork-bulgogi.png",
  "extra-gimbap": "/recipe-images/gimbap.png",
  "extra-kimchi-fried-rice": "/recipe-images/kimchi-fried-rice.png",
  "extra-bossam": "/recipe-images/bossam.png",
  "extra-suyuk": "/recipe-images/bossam.png",
  "extra-haemul-pajeon": "/recipe-images/haemul-pajeon.png",
  "extra-samgyetang": "/recipe-images/samgyetang.png",
  "extra-dakbokkeumtang": "/recipe-images/dakbokkeumtang.png"
};

const sampleLikes = {
  "extra-bulgogi": 18,
  "extra-kimchi-jjigae": 15,
  "extra-tteokbokki": 13,
  "sweet-corn-risotto": 12,
  "extra-gimbap": 11,
  "extra-bibimbap": 10,
  "extra-japchae": 9,
  "doenjang-pasta": 9,
  "extra-cheese-tteokbokki": 8,
  "extra-dolsot-bibimbap": 7,
  "warm-udon": 7,
  "extra-tuna-kimchi-jjigae": 6,
  "perilla-noodle": 6,
  "extra-bossam": 5,
  "extra-sundubu-jjigae": 5,
  "extra-haemul-pajeon": 4,
  "tomato-basil-salad": 4,
  "extra-budae-jjigae": 4,
  "extra-jjimdak": 3
};

async function main() {
  for (const [id, thumbnailImg] of Object.entries(updates)) {
    await prisma.recipe.update({
      where: {
        id
      },
      data: {
        thumbnailImg
      }
    });
  }

  const maxLikes = Math.max(...Object.values(sampleLikes));
  const users = await Promise.all(
    Array.from({ length: maxLikes }, (_, index) => {
      const number = String(index + 1).padStart(2, "0");

      return prisma.user.upsert({
        where: {
          email: `like-user-${number}@recipehub.local`
        },
        update: {
          nickname: `맛잘알 ${number}`
        },
        create: {
          email: `like-user-${number}@recipehub.local`,
          name: `RecipeHub Like User ${number}`,
          nickname: `맛잘알 ${number}`
        }
      });
    })
  );

  for (const [recipeId, count] of Object.entries(sampleLikes)) {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId
      },
      select: {
        id: true
      }
    });

    if (!recipe) {
      continue;
    }

    for (const user of users.slice(0, count)) {
      await prisma.like.upsert({
        where: {
          userId_recipeId: {
            userId: user.id,
            recipeId
          }
        },
        update: {},
        create: {
          userId: user.id,
          recipeId
        }
      });
    }
  }

  const groups = await prisma.recipe.findMany({
    where: {
      id: {
        startsWith: "extra-"
      }
    },
    select: {
      title: true,
      thumbnailImg: true
    }
  });

  const byImage = groups.reduce((acc, recipe) => {
    acc[recipe.thumbnailImg ?? ""] ??= [];
    acc[recipe.thumbnailImg ?? ""].push(recipe.title);
    return acc;
  }, {});

  console.log(JSON.stringify(byImage, null, 2));
  console.log(JSON.stringify(sampleLikes, null, 2));
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
