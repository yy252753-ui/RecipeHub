const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } }
});

const recipeCommentCounts = {
  // 랭킹권 (15개 이상)
  "extra-bulgogi": 18,
  "extra-kimchi-jjigae": 16,
  "extra-tteokbokki": 15,
  "sweet-corn-risotto": 15,
  "extra-gimbap": 15,
  "doenjang-pasta": 15,

  // 중간 인기 (10~12개)
  "extra-bibimbap": 12,
  "extra-japchae": 12,
  "extra-dolsot-bibimbap": 10,
  "extra-cheese-tteokbokki": 10,
  "warm-udon": 10,
  "extra-rose-tteokbokki": 9,
  "extra-bossam": 8,
  "extra-tuna-kimchi-jjigae": 8,
  "perilla-noodle": 8,
  "extra-dakbokkeumtang": 8,
  "extra-jjimdak": 8,
  "extra-samgyetang": 8,
  "extra-haemul-pajeon": 8,

  // 최소 7개
  "extra-sundubu-jjigae": 7,
  "extra-budae-jjigae": 7,
  "tomato-basil-salad": 7,
  "extra-spicy-pork-bulgogi": 7,
  "extra-soy-pork-bulgogi": 7,
  "extra-doenjang-jjigae": 7,
  "extra-beef-doenjang-jjigae": 7,
  "extra-seafood-doenjang-jjigae": 7,
  "extra-zucchini-doenjang-jjigae": 7,
  "extra-tuna-gimbap": 7,
  "extra-kimchi-fried-rice": 7,
  "extra-tofu-bulgogi-bowl": 7,
  "extra-pork-kimchi-jjigae": 7,
  "extra-tofu-kimchi-jjigae": 7,
  "extra-vegetable-bibimbap": 7,
  "extra-bulgogi-bibimbap": 7,
  "extra-mushroom-japchae": 7,
  "extra-shrimp-fried-rice": 7,
  "extra-soybean-sprout-rice": 7,
  "extra-miyeokguk": 7,
  "extra-beef-radish-soup": 7,
  "extra-galbitang": 7,
  "extra-dakgalbi": 7,
  "extra-kimchi-jeon": 7,
  "extra-gamja-jeon": 7,
  "extra-suyuk": 7,
  "extra-mandu-guk": 7,
  "extra-eomuk-tang": 7,
  "extra-jeyuk-deopbap": 7,
  "extra-egg-rice": 7,
  "extra-kongguksu": 7,
  "extra-naengmyeon": 7,
  "extra-egg-ramyeon": 7,
  "extra-grilled-mackerel": 7,
  "extra-mushroom-rice-bowl": 7,
  "extra-spicy-tofu-stir-fry": 7,
};

const names = [
  "강나윤", "고도현", "권서아", "김라온", "김보민", "김시우", "김유나", "김재하",
  "남예준", "노하린", "문서율", "박가온", "박다인", "박민준", "배서진", "백지안",
  "서도윤", "서민서", "송라희", "신유찬", "안서우", "오하준", "유다현", "윤서준",
  "이다겸", "이로하", "이서아", "이준영", "임하은", "장도하", "전유빈", "정로운",
  "조민아", "주서윤", "차도겸", "최나은", "최리안", "하도윤", "한가람", "홍예나",
  "황지호", "강예솔", "권민성", "김태린", "박유건", "배하율", "서이준", "신아린",
  "오지안", "유서후", "이다온", "정해린", "조은우", "최서하", "한지율", "홍라온",
  "구민채", "나도훈", "류지안", "민서율", "변하음", "석유준", "연지호", "엄다인",
  "우서아", "원재하", "제민준", "진하율"
];

const commentBodies = [
  "양념 비율이 과하지 않아서 좋았어요. 다음에는 채소를 조금 더 넣어도 맛이 잘 맞을 것 같습니다.",
  "사진 보고 따라 만들었는데 생각보다 훨씬 간단했습니다. 간이 안정적이라 가족들이 다 잘 먹었어요.",
  "첫맛은 깔끔하고 끝에 감칠맛이 남아요. 밥이랑 먹으니 확실히 더 맛있었습니다.",
  "조리 시간도 적당하고 재료 준비가 어렵지 않았습니다. 초보자도 따라 하기 좋은 레시피예요.",
  "설명대로 했더니 식감이 잘 살아났습니다. 다음번에는 고명을 조금 더 올려서 먹어보려고요.",
  "간을 마지막에 맞추는 게 포인트인 것 같아요. 너무 짜지 않고 깔끔하게 완성됐습니다.",
  "아이들도 먹기 괜찮은 맛이었어요. 매운맛은 취향대로 조절하면 더 좋을 것 같습니다.",
  "냉장고에 있던 재료로 만들기 좋아서 저장해뒀습니다. 평일 저녁 메뉴로 딱이에요.",
  "향이 생각보다 풍부해서 만족스러웠습니다. 조리 순서가 보기 쉬워서 실패가 적었어요.",
  "재료 양이 현실적이라 좋네요. 1인분이나 2인분으로 줄여도 맛이 크게 흔들리지 않았습니다.",
  "먹고 나서 느끼함이 남지 않아 좋았습니다. 다음에는 조금 더 매콤하게 해볼 생각입니다.",
  "손님 왔을 때 내도 괜찮을 정도로 모양이 잘 나왔어요. 맛도 무난하게 호불호 없었습니다.",
  "조리 중간에 향이 확 올라와서 기대됐습니다. 완성 후에도 간이 잘 배어 맛있었어요.",
  "레시피 설명이 친절해서 그대로 따라 했습니다. 재료 손질만 끝내면 금방 완성됩니다.",
  "남은 재료 활용하기 좋아요. 간단한데 맛은 꽤 깊어서 자주 만들 것 같습니다.",
  "양념이 재료에 잘 붙어서 마지막까지 맛이 좋았습니다. 도시락 메뉴로도 괜찮겠어요.",
  "기본 레시피로 두고 취향대로 응용하기 좋습니다. 저는 파를 조금 더 넣으니 더 맛있었어요.",
  "따뜻할 때 먹으니 맛이 가장 좋았습니다. 남은 건 다음 날 데워 먹어도 괜찮았어요.",
  "재료비 부담이 적어서 주 1회 정도 꾸준히 만들고 있어요. 늘 기대를 저버리지 않아요.",
  "국물이 깊고 진해서 한 그릇 뚝딱 비웠습니다. 밥 말아 먹으니 더 꿀맛이었어요.",
  "불 조절만 잘하면 실패 없는 레시피예요. 처음 만들었는데도 맛있게 완성됐습니다.",
  "집에서 이 맛이 나는 게 신기했어요. 레시피 덕분에 외식비가 줄었습니다.",
  "재료를 미리 손질해두면 10분 만에 완성돼서 바쁜 아침에도 해먹기 좋아요.",
  "간장 양을 살짝 줄여서 만들었더니 깔끔한 맛이 났습니다. 아이들이 더 잘 먹었어요.",
  "생각보다 재료 조합이 잘 어울렸어요. 만드는 과정 자체도 재미있었습니다.",
  "단계별 설명이 명확해서 처음 도전하는 요리였는데도 성공했습니다. 감사해요.",
  "건강한 재료를 쓰면서도 맛이 풍부한 게 이 레시피의 장점인 것 같아요.",
  "식감이 좋아서 한 번 만들고 나서 일주일에 두 번은 찾게 됩니다.",
  "저는 마늘을 좀 더 추가했는데 더 깊은 맛이 나서 좋았습니다. 추천드려요.",
  "가성비도 좋고 맛도 있어요. 손질하는 법도 자세히 나와 있어서 도움이 많이 됐습니다.",
  "남편이 맛있다고 해서 단번에 성공 레시피로 등록했습니다. 다음 주에 또 만들 거예요.",
  "배달 음식 대신 이 레시피로 해결하고 있어요. 훨씬 맛있고 건강하게 먹을 수 있어요.",
  "조미료 없이도 이 정도 맛이 나는 게 놀라웠습니다. 자연스러운 감칠맛이 일품이에요.",
  "친구들한테 레시피 공유했더니 다들 성공했다고 해서 뿌듯했어요. 정말 좋은 레시피입니다.",
  "재료가 단순한데 맛이 꽤 깊어서 좋았어요. 요리 초보에게 강력 추천합니다.",
  "냉동해뒀다가 꺼내 먹어도 맛이 잘 유지됩니다. 주말에 대용량으로 만들어두기 딱이에요.",
  "매일 반복되는 식단에서 벗어나고 싶을 때 이 레시피를 찾게 됩니다. 항상 만족스러워요.",
  "영상 없이도 글만으로 충분히 따라 할 수 있어서 편했어요. 설명이 직관적이에요.",
  "반찬으로도, 메인으로도 다 잘 어울렸습니다. 덕분에 든든한 한 끼 해결했어요.",
  "오늘 처음 만들어봤는데 생각보다 빨리 완성됐어요. 다음엔 더 잘 할 수 있을 것 같아요."
];

async function main() {
  const users = await Promise.all(
    names.map((nickname, index) => {
      const number = String(index + 1).padStart(2, "0");

      return prisma.user.upsert({
        where: {
          email: `comment-user-${number}@recipehub.local`
        },
        update: {
          nickname
        },
        create: {
          email: `comment-user-${number}@recipehub.local`,
          name: `RecipeHub Comment User ${number}`,
          nickname
        }
      });
    })
  );

  let totalComments = 0;

  for (const [recipeId, count] of Object.entries(recipeCommentCounts)) {
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

    for (let index = 0; index < count; index += 1) {
      const userIndex = (index * 7 + recipeId.length * 3) % users.length;
      const user = users[userIndex];
      const bodyIndex = (index * 3 + recipeId.charCodeAt(0)) % commentBodies.length;

      const comment = await prisma.comment.upsert({
        where: {
          id: `seed-comment-${recipeId}-${index + 1}`
        },
        update: {
          userId: user.id,
          content: commentBodies[bodyIndex]
        },
        create: {
          id: `seed-comment-${recipeId}-${index + 1}`,
          recipeId,
          userId: user.id,
          content: commentBodies[bodyIndex]
        }
      });

      const likeCount = Math.max(0, Math.min(users.length - 1, count - index - 1));

      for (const likeUser of users.slice(0, likeCount)) {
        if (likeUser.id === user.id) {
          continue;
        }

        await prisma.commentLike.upsert({
          where: {
            userId_commentId: {
              userId: likeUser.id,
              commentId: comment.id
            }
          },
          update: {},
          create: {
            userId: likeUser.id,
            commentId: comment.id
          }
        });
      }

      totalComments += 1;
    }
  }

  console.log(`Seeded comments: ${totalComments}`);
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
