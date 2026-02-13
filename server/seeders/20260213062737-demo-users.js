import bcrypt from "bcryptjs"
export async function up(queryInterface) {
  const password1 = await bcrypt.hash("Password@123", 10);
  const password2 = await bcrypt.hash("Secret@123", 10);

  await queryInterface.bulkInsert("users", [
    {
      id: "11111111-1111-1111-1111-111111111111",
      name: "Jason Miller",
      username: "jmiller23",
      email: "jason@example.com",
      password: password1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "22222222-2222-2222-2222-222222222222",
      name: "Rambilas Patidar",
      username: "rambilas",
      email: "rambilas@example.com",
      password: password2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("users", null, {});
}
