
"use strict";

const { randomUUID } = require("crypto");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be set in .env"
      );
    }

    const email = ADMIN_EMAIL.trim().toLowerCase();

    // Find the existing ADMIN role.
    const [roles] = await queryInterface.sequelize.query(
      'SELECT id FROM "roles" WHERE name = \'ADMIN\' AND "deletedAt" IS NULL'
    );

    if (roles.length === 0) {
      throw new Error(
        "ADMIN role not found. Run the roles and permissions seeder first."
      );
    }

    // Do not overwrite or promote an existing account.
    const [existingUsers] = await queryInterface.sequelize.query(
      'SELECT id FROM "users" WHERE email = :email',
      {
        replacements: { email },
      }
    );

    if (existingUsers.length > 0) {
      throw new Error(
        "An account with ADMIN_EMAIL already exists. Use a different email."
      );
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const now = new Date();

    // Create the initial admin account.
    await queryInterface.bulkInsert("users", [
      {
        id: randomUUID(),
        name: ADMIN_NAME.trim(),
        email,
        password: hashedPassword,
        isActive: true,
        roleId: roles[0].id,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      },
    ]);

    console.log("Initial admin account created successfully.");
  },

  async down(queryInterface) {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

    if (!email) {
      throw new Error(
        "ADMIN_EMAIL must be set in .env to undo the admin seeder."
      );
    }

    const [roles] = await queryInterface.sequelize.query(
      'SELECT id FROM "roles" WHERE name = \'ADMIN\' AND "deletedAt" IS NULL'
    );

    if (roles.length === 0) {
      return;
    }

    await queryInterface.bulkDelete(
      "users",
      {
        email,
        roleId: roles[0].id,
      },
      {}
    );
  },
};
