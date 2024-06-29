import { Inventory, Item, sequelize } from './sqlite';

async function createInventory({ location, maxCapacity }) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Inventory table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Inventories')) {
			// If the table doesn't exist, create it
			await Inventory.sync();
		}

		// Add the provided Inventory to the table
		const newInventory = await Inventory.create({
			location: location,
			maxCapacity: maxCapacity,
			currentCapacity: 0, // Set the default currentCapacity to zero
		});

		// Fetch all unique items characteristics
		const items = await Item.findAll({
			attributes: [
				'CategoryId',
				'TypeId',
				'SizeId',
				'MaterialId',
				'StanderdId',
				'ManufactureId',
				'weightPerPiece',
				'pricePerKilo',
			],
			group: [
				'CategoryId',
				'TypeId',
				'SizeId',
				'MaterialId',
				'StanderdId',
				'ManufactureId',
				'weightPerPiece',
				'pricePerKilo',
			],
		});

		// Create entries for each existing item in the new inventory with numberOfPieces set to 0
		for (const item of items) {
			const {
				CategoryId,
				TypeId,
				SizeId,
				MaterialId,
				StanderdId,
				ManufactureId,
				weightPerPiece,
				pricePerKilo,
			} = item;

			const itemId = `${CategoryId}-${TypeId}-${SizeId}-${MaterialId}-${StanderdId}-${ManufactureId}-${newInventory.id}`;
			await Item.create({
				id: itemId, // Set the unique item ID
				weightPerPiece: weightPerPiece,
				pricePerKilo: pricePerKilo,
				numberOfPieces: 0, // Set numberOfPieces to 0
				CategoryId: CategoryId,
				TypeId: TypeId,
				SizeId: SizeId,
				ManufactureId: ManufactureId,
				InventoryId: newInventory.id,
				MaterialId: MaterialId,
				StanderdId: StanderdId,
			});
		}

		return { error: null };
	} catch (error) {
		console.error(error);
		return { error: 'Error in adding inventory' };
	}
}

async function getInventories() {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Inventory table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Inventories')) {
			return { data: [], error: 'No Inventories found' };
		}

		// Retrieve all inventories from the table with only the necessary attributes
		const allInventories = await Inventory.findAll();

		// Extract necessary attributes from each inventory object
		const inventoriesData = allInventories.map((inventory) => ({
			id: inventory.id,
			location: inventory.location,
			maxCapacity: inventory.maxCapacity,
			currentCapacity: inventory.currentCapacity,
		}));
		return { data: inventoriesData, error: null };
	} catch (error) {
		return { data: [], error: `Error getting inventories:` };
	}
}

async function getInventory({ id }) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Inventory table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Inventories')) {
			// console.log('Inventory table does not exist.');
			// return null;
			return { data: null, error: `No inventory found` };
		}

		// Retrieve the Inventory with the specified ID
		const inventory = await Inventory.findByPk(id);

		if (!inventory) {
			// console.log(`Inventory with ID ${id} not found.`);
			return { data: null, error: `No inventory found` };
		}

		// console.log('Inventory:', inventory);
		return { data: inventory, error: null };
	} catch (error) {
		return { data: null, error: `No inventory found` };
	}
}

async function deleteInventory({ id }) {
	try {
		await sequelize.sync();

		// Get the inventory with the specified ID
		const inventoryToDelete = await Inventory.findByPk(id);

		// Check if the inventory exists
		if (!inventoryToDelete) {
			return { error: `Inventory with ID ${id} not found.` };
		}

		// Check if the current capacity is zero
		if (inventoryToDelete.currentCapacity !== 0) {
			return { error: `Inventory is not empty. Cannot delete.` };
		}

		// Delete all items associated with this inventory
		await Item.destroy({
			where: { InventoryId: id },
		});

		// Delete the inventory
		await inventoryToDelete.destroy();

		return { error: null };
	} catch (error) {
		console.error('Error deleting inventory:', error);
		return { error: 'An error occurred while deleting the inventory.' };
	}
}

async function updateInventory({ id, location, maxCapacity }) {
	try {
		await sequelize.sync();
		// Get the inventory with the specified ID
		const inventoryToEdit = await Inventory.findByPk(id);

		// Check if the inventory exists
		if (!inventoryToEdit) {
			return { error: `Inventory with ID ${id} not found.` };
		}

		// Update the inventory properties
		inventoryToEdit.location = location;
		inventoryToEdit.maxCapacity = maxCapacity;

		// Save the changes to the database
		await inventoryToEdit.save();

		return { error: null };
	} catch (error) {
		return { error: 'An error occurred while editing the inventory.' };
	}
}

export const apiInventory = {
	createInventory,
	getInventories,
	getInventory,
	deleteInventory,
	updateInventory,
};
