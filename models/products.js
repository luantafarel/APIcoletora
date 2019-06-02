module.exports = (sequelize, DataTypes) => {
  let Products = sequelize.define('Products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      description: 'Product unique identification (PK)'
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
      defaultValue: DataTypes.NOW,
      description: 'Record created at'
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      description: 'Record updated at'
    },
    deleted_at: {
      type: DataTypes.DATE,
      description: 'Record deleted at'
    }
  }, {
    tableName: 'products',
    scopes: {
      compact: {
        attributes: ['name', 'timestamp']
      }
    }
  })
  if (typeof Products === 'undefined') return
  return Products
}
