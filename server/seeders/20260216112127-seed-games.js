"use strict";
import { v4 as uuidv4 } from "uuid";

 export  async function up(queryInterface) {
    const [categories] = await queryInterface.sequelize.query(
      `SELECT id, slug FROM "Categories";`
    );

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

    const volatilityLevels = ["low", "medium", "high"];

    const games = [];

    for (let i = 1; i <= 100; i++) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const randomTags = tagPool
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const rtp = (95 + Math.random() * 3).toFixed(2);

      games.push({
        id: uuidv4(),
        name: `Casino Gold ${i}`,
        slug: `casino-gold-${i}`,
        description: `Experience thrilling spins and big rewards in Casino Gold ${i}. Perfect for sweepstakes players.`,
        imageUrl: `https://picsum.photos/300/400?casino=${i}`,
        bannerUrl: `https://picsum.photos/800/300?casino-banner=${i}`,
        provider:
          providers[Math.floor(Math.random() * providers.length)],
        rtp: parseFloat(rtp),
        isFeatured: Math.random() > 0.85,
        status: "active",
        tags: randomTags, // 🔥 Postgres ARRAY
        categoryId: randomCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("games", games);
  }

 export  async function down(queryInterface) {
    await queryInterface.bulkDelete("games", null, {});
  }
