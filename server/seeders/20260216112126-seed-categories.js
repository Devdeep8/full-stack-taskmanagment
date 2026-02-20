"use strict";
import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
  const categories = [
    { id: uuidv4(), name: "Slot Games", slug: "slot-games" },
    { id: uuidv4(), name: "Live Dealer", slug: "live-dealer" },
    { id: uuidv4(), name: "Table Games", slug: "table-games" },
    { id: uuidv4(), name: "Sweepstakes Slots", slug: "sweepstakes-slots" },
    { id: uuidv4(), name: "Instant Win", slug: "instant-win" },
  ];

  await queryInterface.bulkInsert(
    "categories",
    categories.map((cat) => ({
      ...cat,
      description: `${cat.name} category`,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  );
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("categories", null, {});
  await queryInterface.bulkDelete("categories", null, {});
}
