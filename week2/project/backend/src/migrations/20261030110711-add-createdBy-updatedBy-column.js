'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const tables = ["users","bookings","permissions","roles","services","role_permissions"];
    for(const table of tables){
      await queryInterface.addColumn(table,'createdBy',{
        type: Sequelize.UUID,
        allowNull : true,
      });
      await queryInterface.addColumn(table,'updatedBy',{
        type: Sequelize.UUID,
        allowNull:true,
      });
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const tables = ["users","bookings","permissions","roles","services","role_permissions"];
    for(const table of tables){
      await queryInterface.removeColumn(table,'createdBy');
      await queryInterface.removeColumn(table,'updatedBy');
    }
  }
};
