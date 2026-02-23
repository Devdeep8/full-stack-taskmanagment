"use strict";

import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
  const BATCH_SIZE = 10000;        
  const TOTAL_RECORDS = 10_000_000; 

  const [categories] = await queryInterface.sequelize.query(
    `SELECT id FROM "categories";`
  );

  if (!categories.length) {
    throw new Error("No categories found. Seed categories first.");
  }

  const providers = [
    "Pragmatic Play",
    "Evolution Gaming",
    "Hacksaw Gaming",
    "PG Soft",
    "Red Tiger",
    "Play'n GO",
  ];

  const tagPool = [
    "new",
    "popular",
    "high-rtp",
    "sweepstakes",
    "bonus-buy",
    "jackpot",
    "featured",
  ];


  console.log("🚀 Starting 10M game insert...");

  for (let offset = 0; offset < TOTAL_RECORDS; offset += BATCH_SIZE) {
    const games = [];

    for (let i = 0; i < BATCH_SIZE; i++) {
      const index = offset + i + 1;

      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const randomTags = tagPool
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const rtp = (95 + Math.random() * 3).toFixed(2);

      games.push({
        id: uuidv4(),
        name: `Casino Gold ${index}`,
        slug: `casino-gold-${index}`,
        description: `Experience thrilling spins and big rewards in Casino Gold ${index}.`,
        imageUrl: `https://picsum.photos/300/400?casino=${index}`,
        bannerUrl: `https://picsum.photos/800/300?casino-banner=${index}`,
        provider:
          providers[Math.floor(Math.random() * providers.length)],
        rtp: parseFloat(rtp),
        isFeatured: Math.random() > 0.85,
        status: "active",
        tags: randomTags,
        categoryId: randomCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("games", games);

    console.log(
      `✅ Inserted ${Math.min(
        offset + BATCH_SIZE,
        TOTAL_RECORDS
      )} / ${TOTAL_RECORDS}`
    );
  }

  console.log("🎉 Finished inserting 10 million games!");
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("games", null, {});
}