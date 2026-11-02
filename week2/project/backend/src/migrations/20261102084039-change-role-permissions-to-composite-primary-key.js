'use strict';

const { randomUUID } = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeConstraint("role_permissions",
      "role_permissions_pkey"
    );
    await queryInterface.removeConstraint("role_permissions","role_permissions_role_id_permission_id_unique");
    await queryInterface.removeColumn("role_permissions","id");
    await queryInterface.addColumn("role_permissions","deletedAt",{
      type : Sequelize.DATE,
      allowNull:true,
    });
    await queryInterface.addConstraint("role_permissions",{
      fields : ["roleId","permissionId"],
      type:"primary key",
      name:"role_permissions_pkey"
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("role_permissions",
      "role_permissions_pkey"
    );
    await queryInterface.addColumn("role_permissions","id",{
      type : Sequelize.UUID,
      allowNull:true,
    });
    const rows = await queryInterface.sequelize.query(
      'SELECT "roleId","permissionId" FROM "role_permissions"',
      {type : Sequelize.QueryTypes.SELECT}
    );
    for(const row of rows){
      await queryInterface.bulkUpdate(
        "role_permissions",{
          id: randomUUID()
        },
        {
          roleId:row.roleId,
          permissionId:row.permissionId,
        }
      );
    }
    await queryInterface.changeColumn("role_permissions","id",{
      type:Sequelize.UUID,
      allowNull:false,
    });
    await queryInterface.addConstraint("role_permissions",{
      fields:["id"],
      type:"primary key",
      name:"role_permissions_pkey",
    });
    await queryInterface.addConstraint("role_permissions",{
      fields : ["roleId","permissionId"],
      type:"unique",
      name:"role_permissions_role_id_permission_id_unique",
    });
    await queryInterface.removeColumn("role_permissions","deletedAt");
  },
};
