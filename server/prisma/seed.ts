import { prismaClient } from '$/service/prismaClient';
import { randomUUID } from 'crypto';

const todoTexts = [
  'Light and Darkness - Deus said, "Let there be light," and there was light. Deus separated the light from the darkness, calling the light "day" and the darkness "night."',
  'Sky and Waters - Deus made an expanse to separate the waters, creating "sky" between the waters above and below the expanse.',
  'Land and Vegetation - Deus gathered the waters to reveal dry land and called it "earth." Deus then brought forth grass, seed-bearing plants, and trees bearing fruit.',
  'Sun, Moon, and Stars - Deus created the sun, moon, and stars to separate day from night and to mark seasons, days, and years.',
  'Marine Life and Birds - Deus created sea creatures and birds, blessing them to be fruitful and multiply.',
  'Land Animals and Humans - Deus made land animals (livestock, creatures that crawl, and wild animals). Finally, Deus created humans in His own image, both male and female, and gave them dominion over the earth.',
  'Rest - Deus completed His work and rested on the seventh day, blessing it as a day of rest.',
];

async function main() {
  const userCount = await prismaClient.user.count();
  const user = await (userCount === 0
    ? prismaClient.user.create({
        data: {
          id: randomUUID(),
          name: 'Moses',
          email: 'deus@example.com',
        },
      })
    : prismaClient.user.findFirstOrThrow());

  const count = await prismaClient.task.count();
  if (count > 0) return;

  await prismaClient.task.createMany({
    data: todoTexts.map((text, i) => ({
      id: randomUUID(),
      label: text,
      done: false,
      createdAt: new Date(Date.now() - i * 60_000),
      userId: user.id,
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
