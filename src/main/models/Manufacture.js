import { Manufacture, sequelize, Item } from './sqlite';

async function createManufacture({ name, phoneNumber, email }) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Manufacture table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Manufactures')) {
			// If the table doesn't exist, create it
			await Manufacture.sync();
		}

		// Add the provided manufacture to the table
		const newManufacture = await Manufacture.create({
			name: name,
			phoneNumber: phoneNumber,
			email: email,
		});

		// Fetch all unique items characteristics
		const items = await Item.findAll({
			attributes: [
				'CategoryId',
				'TypeId',
				'SizeId',
				'MaterialId',
				'StanderdId',
				'InventoryId',
				'weightPerPiece',
				'pricePerKilo',
			],
			group: [
				'CategoryId',
				'TypeId',
				'SizeId',
				'MaterialId',
				'StanderdId',
				'InventoryId',
				'weightPerPiece',
				'pricePerKilo',
			],
		});

		// Create entries for each existing item for the new manufacture with numberOfPieces set to 0
		for (const item of items) {
			const {
				CategoryId,
				TypeId,
				SizeId,
				MaterialId,
				StanderdId,
				weightPerPiece,
				pricePerKilo,
				InventoryId,
			} = item;

			const itemId = `${CategoryId}-${TypeId}-${SizeId}-${MaterialId}-${StanderdId}-${newManufacture.id}-${InventoryId}`;
			await Item.create({
				id: itemId, // Set the unique item ID
				weightPerPiece: weightPerPiece,
				pricePerKilo: pricePerKilo,
				numberOfPieces: 0, // Set numberOfPieces to 0
				CategoryId: CategoryId,
				TypeId: TypeId,
				SizeId: SizeId,
				ManufactureId: newManufacture.id,
				MaterialId: MaterialId,
				StanderdId: StanderdId,
				InventoryId: InventoryId,
			});
		}

		return { error: null };
	} catch (error) {
		console.error(error);
		return { error: `Error adding manufacture` };
	}
}

async function getManufactures() {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Manufacture table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Manufactures')) {
			// console.log('Manufacture table does not exist.');
			return { data: [], error: `Manufacture table dont excist` };
		}

		// Retrieve all manufactures from the table
		const allManufactures = await Manufacture.findAll();
		// console.log('All manufactures in the table:', allManufactures);

		const manufacturesData = allManufactures.map((manufacture) => ({
			id: manufacture.id,
			name: manufacture.name,
			phoneNumber: manufacture.phoneNumber,
			email: manufacture.email,
		}));

		return { data: manufacturesData, error: null };
	} catch (error) {
		// console.error('Error syncing Manufacture model:', error);
		return { data: [], error: `Error getting manufacture` };
	}
}

async function getManufacture({ id }) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Manufacture table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Manufactures')) {
			// console.log('Manufacture table does not exist.');
			return { data: null, error: `Manufacture table dont excist` };
		}

		// Retrieve the manufacture with the specified ID
		const manufacture = await Manufacture.findByPk(id);

		if (!manufacture) {
			// console.log(`Manufacture with ID ${id} not found.`);
			return { data: null, error: `Manufacture not found` };
		}

		// console.log('Manufacture:', manufacture);
		return { data: manufacture, error: null };
	} catch (error) {
		// console.error('Error syncing Manufacture model:', error);
		return { data: null, error: `Error getting manufacture` };
	}
}

async function deleteManufacture({ id }) {
	try {
		await sequelize.sync();

		const itemWithManufacture = await Item.findOne({
			where: {
				ManufactureId: id,
			},
		});

		if (itemWithManufacture) return { error: `There are items with this manufacture in the inventory` };

		await Manufacture.destroy({
			where: {
				id: id,
			},
		});

		return { error: null };
	} catch (error) {
		return { error: `Error deleting the manufacture` };
	}
}

async function updateManufacture({ id, name, email, phoneNumber }) {
	try {
		await sequelize.sync();

		const manufactureToUpdate = await Manufacture.findByPk(id);

		if (!manufactureToUpdate) return { error: `Can not find manufacture to update` };

		manufactureToUpdate.name = name;
		manufactureToUpdate.email = email;
		manufactureToUpdate.phoneNumber = phoneNumber;

		await manufactureToUpdate.save();

		return { error: null };
	} catch (error) {
		console.log(error);
		return { error };
	}
}

export const apiManufacture = {
	createManufacture,
	getManufactures,
	getManufacture,
	deleteManufacture,
	updateManufacture,
};
