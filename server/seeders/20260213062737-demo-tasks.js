export async function up(queryInterface) {
  await queryInterface.bulkInsert("tasks", [
    {
      id: "aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      title: "Setup backend",
      status: "todo",
      priority: "high",
      createdBy: "11111111-1111-1111-1111-111111111111",
      assigneeId: "11111111-1111-1111-1111-111111111111",
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      title: "Create auth APIs",
      status: "in-progress",
      priority: "medium",
      createdBy: "11111111-1111-1111-1111-111111111111",
      assigneeId: "22222222-2222-2222-2222-222222222222",
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      title: "Kanban UI",
      status: "done",
      priority: "low",
      createdBy: "22222222-2222-2222-2222-222222222222",
      assigneeId: "22222222-2222-2222-2222-222222222222",
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("tasks", null, {});
}
