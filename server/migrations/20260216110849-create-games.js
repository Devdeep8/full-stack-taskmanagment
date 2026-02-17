"use strict";

export default  {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("games", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      bannerUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      provider: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      rtp: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active",
      },

      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING), 
        allowNull: true,
      },

      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("games");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_games_status";'
    );
  },
};
