const { Sequelize, DataTypes } = require('sequelize');

export const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './resources/indexDB.db',
	logging: false,
});

export const Category = sequelize.define('Category', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export const Inventory = sequelize.define('Inventory', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	location: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	maxCapacity: {
		type: DataTypes.INTEGER,
	},
	currentCapacity: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
});

export const Manufacture = sequelize.define('Manufacture', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phoneNumber: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
	},
});

export const Material = sequelize.define('Material', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export const Size = sequelize.define('Size', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export const Type = sequelize.define('Type', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

// Update the definition of the Item model to use a string ID
export const Item = sequelize.define('Item', {
	id: {
		type: DataTypes.STRING, // Change type to STRING
		primaryKey: true,
	},
	weightPerPiece: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	},
	pricePerKilo: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	},
	numberOfPieces: {
		type: DataTypes.INTEGER,
	},
});

Item.belongsTo(Category);
Item.belongsTo(Type);
Item.belongsTo(Size);
Item.belongsTo(Material);
Item.belongsTo(Manufacture);
Item.belongsTo(Inventory);

export const SellItem = sequelize.define('SellItem', {
	id: {
		type: DataTypes.STRING, // Composite ID
		primaryKey: true,
	},
	totalPrice: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	},
	numberOfPieces: {
		type: DataTypes.INTEGER,
	},
	totalWeight: {
		type: DataTypes.DOUBLE,
	},
});

// Define the OutOrder model
export const OutOrder = sequelize.define('OutOrder', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	customerName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	customerPhone: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	confirmDate: {
		type: DataTypes.DATE,
	},
	totalPrice: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	},
	discount: {
		type: DataTypes.DOUBLE,
	},
});

// Define associations
OutOrder.hasMany(SellItem);
SellItem.belongsTo(OutOrder);

// Define associations between SellItem and other models
SellItem.belongsTo(Category);
SellItem.belongsTo(Type);
SellItem.belongsTo(Size);
SellItem.belongsTo(Material);
SellItem.belongsTo(Manufacture);
SellItem.belongsTo(Inventory);
