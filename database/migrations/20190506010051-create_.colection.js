module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('products', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          description: 'Light unique identification (PK)'
        },
        name: {
          type: DataTypes.STRING,
          description: 'Name of the product'
        },
        stock: {
          type: DataTypes.INTEGER,
          description: 'How much of the product we have in  stock'
        },
        timestamp: {
          type: DataTypes.DATE,
          allowNull: false,
          description: 'Timestamp of the product'
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          description: 'Record created at'
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          description: 'Record updated at'
        },
        deleted_at: {
          type: DataTypes.DATE,
          description: 'Record deleted at'
        }
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('products', { transaction: t })
    })
  }
}
