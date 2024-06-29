import { sequelize, Item, Standerd } from './sqlite';

async function createStanderd({ name }) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Standerds')) {
			// If the table doesn't exist, create it
			await Standerd.sync();
			// console.log('Type table created.');
		}

		// Add the provided Type to the table
		await Standerd.create({
			name: name,
		});
		// console.log(`Type ${name} added.`);

		return { error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { error: `Error adding Standerd` };
	}
}

async function getStanderds() {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Standerds')) {
			// console.log('Type table does not exist.');
			return { data: [], error: `Standerd does not exist` };
		}

		// Retrieve all Types from the table
		const allStanderds = await Standerd.findAll();
		// console.log('All Types in the table:', allTypes);

		const standerdsData = allStanderds.map((Standerd) => ({
			id: Standerd.id,
			name: Standerd.name,
		}));

		return { data: standerdsData, error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { data: [], error: `Error getting standereds` };
	}
}

async function getStanderd({ id }) {
	try {
		// Synchronize the model with the database
		await sequelize.sync();

		// Check if the Type table exists
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes('Standerds')) {
			// console.log('Type table does not exist.');
			return { data: null, error: `Standerd does not exist` };
		}

		// Retrieve the Type with the specified ID
		const standerd = await Standerd.findByPk(id);

		if (!standerd) {
			// console.log(`Type with ID ${id} not found.`);
			return { data: null, error: `Standerd does not exist` };
		}

		// console.log('Type:', Type);
		return { data: standerd, error: null };
	} catch (error) {
		// console.error('Error syncing Type model:', error);
		return { data: null, error: `Error getting standerd` };
	}
}

async function deleteStanderd({ id }) {
	try {
		await sequelize.sync();

		const itemWithStanderd = await Item.findOne({
			where: {
				StanderdId: id,
			},
		});

		if (itemWithStanderd) return { error: `There are items with this standerd in the inventory` };

		await Standerd.destroy({
			where: {
				id: id,
			},
		});

		return { error: null };
	} catch (error) {
		return { error: `Error deleting the standerd` };
	}
}

async function updateStanderd({ id, name }) {
	try {
		await sequelize.sync();

		const standerdToUpdate = await Standerd.findByPk(id);

		if (!standerdToUpdate) return { error: `Can not find standerd to update` };

		standerdToUpdate.name = name;

		await standerdToUpdate.save();

		return { error: null };
	} catch (error) {
		return { error: `Standerd failed to update` };
	}
}

export const apiStanderd = {
	createStanderd,
	getStanderd,
	getStanderds,
	deleteStanderd,
	updateStanderd,
};
