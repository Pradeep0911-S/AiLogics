"use strict";

const { randomUUID } = require("crypto");

const ROLES = ["ADMIN", "USER", "CUSTOMER"];

const PERMISSIONS = [
  "users:create",
  "users:read",
  "users:update",
  "users:delete",

  "services:create",
  "services:read",
  "services:update",
  "services:delete",

  "bookings:create",
  "bookings:read",
  "bookings:assign",
  "bookings:update_status",
  "bookings:cancel",
];

const ROLE_PERMISSIONS = {
  ADMIN: PERMISSIONS,

  USER: [
    "services:read",
    "bookings:read",
    "bookings:update_status",
  ],

  CUSTOMER: [
    "services:read",
    "bookings:create",
    "bookings:read",
    "bookings:cancel",
  ],
};

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // Insert roles
    await queryInterface.bulkInsert(
      "roles",
      ROLES.map((name) => ({
        id: randomUUID(),
        name,
        createdAt: now,
        updatedAt: now,
      }))
    );

    // Insert permissions
    await queryInterface.bulkInsert(
      "permissions",
      PERMISSIONS.map((name) => ({
        id: randomUUID(),
        name,
        createdAt: now,
        updatedAt: now,
      }))
    );

    // Retrieve inserted roles and permissions
    const [roles] = await queryInterface.sequelize.query(
      'SELECT id, name FROM "roles"'
    );

    const [permissions] = await queryInterface.sequelize.query(
      'SELECT id, name FROM "permissions"'
    );

    // Create lookup maps
    const roleIds = Object.fromEntries(
      roles.map((role) => [role.name, role.id])
    );

    const permissionIds = Object.fromEntries(
      permissions.map((permission) => [
        permission.name,
        permission.id,
      ])
    );

    // Build role-permission mappings
    const rolePermissionRows = [];

    for (const [roleName, permissionNames] of Object.entries(
      ROLE_PERMISSIONS
    )) {
      for (const permissionName of permissionNames) {
        rolePermissionRows.push({
          id: randomUUID(),
          roleId: roleIds[roleName],
          permissionId: permissionIds[permissionName],
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    // Insert role-permission mappings
    await queryInterface.bulkInsert(
      "role_permissions",
      rolePermissionRows
    );
  },

  async down(queryInterface) {
    // Delete mappings before deleting their related records
    await queryInterface.bulkDelete("role_permissions", null, {});
    await queryInterface.bulkDelete("permissions", null, {});
    await queryInterface.bulkDelete("roles", null, {});
  },
};