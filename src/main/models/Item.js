import { Item, sequelize, Manufacture, Category, Type, Size, Inventory, Material } from './sqlite';

async function createItem({
	categoryId,
	typeId,
	sizeId,
	manufactureId,
	materialId,
	weightPerPiece,
	pricePerKilo,
}) {
	const weightOfItem = Number(weightPerPiece);
	try {
		await sequelize.sync();
		// Find associated Category, Type, Size, Manufacture, and Material records
		const category = await Category.findByPk(categoryId);
		const type = await Type.findByPk(typeId);
		const size = await Size.findByPk(sizeId);
		const manufacture = await Manufacture.findByPk(manufactureId);
		const material = await Material.findByPk(materialId);

		if (!category || !type || !size || !manufacture || !material) {
			return { error: 'Invalid data' };
		}

		// Fetch all inventories
		const inventories = await Inventory.findAll();

		for (const inventory of inventories) {
			// Concatenate IDs to create a unique item ID including the inventory ID
			const itemId = `${categoryId}-${typeId}-${sizeId}-${materialId}-${manufactureId}-${inventory.id}`;

			// Check if an item with the same ID already exists in the current inventory
			const existingItem = await Item.findByPk(itemId);

			if (existingItem) {
				// If the item exists in any inventory, return an error
				return { error: `Item already exists in inventory ${inventory.id}` };
			}
		}

		// Create the Item record with associations for each inventory
		for (const inventory of inventories) {
			const itemId = `${categoryId}-${typeId}-${sizeId}-${materialId}-${manufactureId}-${inventory.id}`;
			await Item.create({
				id: itemId, // Set the unique item ID
				weightPerPiece: weightOfItem,
				pricePerKilo,
				numberOfPieces: 0, // Set numberOfPieces to 0
				CategoryId: categoryId,
				TypeId: typeId,
				SizeId: sizeId,
				ManufactureId: manufactureId,
				InventoryId: inventory.id,
				MaterialId: materialId,
			});
		}

		return { error: null };
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

async function getAllItemsWithDetails() {
	try {
		await sequelize.sync();
		// Use Sequelize query with associations and includes
		const items = await Item.findAll({
			include: [
				{
					model: Manufacture,
					attributes: ['name'],
				},
				{
					model: Category,
					attributes: ['name'],
				},
				{
					model: Type,
					attributes: ['name'],
				},
				{
					model: Size,
					attributes: ['name'],
				},
				{
					model: Inventory,
					attributes: ['location'],
				},
				{
					model: Material,
					attributes: ['name'],
				},
			],
		});

		// Extract necessary values from each item
		const itemsWithDetails = items.map((item) => ({
			id: item.id,
			weightPerPiece: item.weightPerPiece,
			pricePerKilo: item.pricePerKilo,
			numberOfPieces: item.numberOfPieces,
			manufacture: item.Manufacture ? item.Manufacture.name : null,
			category: item.Category ? item.Category.name : null,
			type: item.Type ? item.Type.name : null,
			size: item.Size ? item.Size.name : null,
			inventoryLocation: item.Inventory ? item.Inventory.location : null,
			material: item.Material ? item.Material.name : null,
		}));

		return { data: itemsWithDetails, error: null };
	} catch (error) {
		return { data: [], error: `Error getting items` };
	}
}

async function getItemWithDetailsById({ id }) {
	try {
		await sequelize.sync();
		// Use Sequelize query with associations and includes
		const item = await Item.findByPk(id, {
			include: [
				{
					model: Manufacture,
					attributes: ['name'],
				},
				{
					model: Category,
					attributes: ['name'],
				},
				{
					model: Type,
					attributes: ['name'],
				},
				{
					model: Size,
					attributes: ['name'],
				},
				{
					model: Inventory,
					attributes: ['location'],
				},
				{
					model: Material,
					attributes: ['name'],
				},
			],
		});

		return { data: item, error: null };
	} catch (error) {
		// console.error(`Error getting item with ID ${itemId} and details:`, error);
		return { data: null, error: `Error getting item` };
	}
}

async function transferItems({ id, amount, inventoryId }) {
	const numberOfItems = Number(amount);

	console.log(id, amount, inventoryId);

	try {
		await sequelize.sync();

		// Split the ID into individual parts
		const [categoryId, typeId, sizeId, materialId, manufactureId, originalInventoryId] = id.split('-');

		// Check if transferring to the same inventory
		if (originalInventoryId === inventoryId) {
			return { error: `Cannot transfer to the same inventory` };
		}

		// Find the item to be transferred
		const itemToTransfer = await Item.findOne({
			where: {
				CategoryId: categoryId,
				TypeId: typeId,
				SizeId: sizeId,
				MaterialId: materialId,
				ManufactureId: manufactureId,
				InventoryId: originalInventoryId,
			},
			include: [Manufacture, Category, Type, Size, Inventory, Material],
		});

		if (!itemToTransfer) {
			return { error: `Item not found` };
		}

		// Check if the destination inventory exists
		const destinationInventory = await Inventory.findByPk(inventoryId);

		if (!destinationInventory) {
			return { error: `Inventory not found` };
		}

		// Calculate the total weight of the items to be transferred
		const totalWeight = itemToTransfer.weightPerPiece * numberOfItems;

		// Check if the destination inventory has enough capacity
		if (destinationInventory.maxCapacity && totalWeight > destinationInventory.maxCapacity) {
			return { error: `Not enough capacity in the destination inventory` };
		}

		// Find or create the destination item
		const [destinationItem] = await Item.findOrCreate({
			where: {
				// Use a new composite ID for the destination item
				id: `${categoryId}-${typeId}-${sizeId}-${materialId}-${manufactureId}-${inventoryId}`,
			},
			defaults: {
				weightPerPiece: itemToTransfer.weightPerPiece,
				pricePerKilo: itemToTransfer.pricePerKilo,
				numberOfPieces: 0,
				// Ensure other attributes are set appropriately
				CategoryId: categoryId,
				TypeId: typeId,
				SizeId: sizeId,
				ManufactureId: manufactureId,
				MaterialId: materialId,
				InventoryId: inventoryId,
			},
		});

		// Check if there's enough quantity to transfer
		if (itemToTransfer.numberOfPieces < numberOfItems) {
			return { error: `Not enough pieces to transfer` };
		}

		// Update the destination item
		destinationItem.numberOfPieces += numberOfItems;
		await destinationItem.save();

		// Update the source item
		itemToTransfer.numberOfPieces -= numberOfItems;
		await itemToTransfer.save();

		// Update currentCapacity of the destination inventory
		destinationInventory.currentCapacity += totalWeight;
		await destinationInventory.save();

		// Update currentCapacity of the source inventory
		const sourceInventory = await Inventory.findByPk(originalInventoryId);
		sourceInventory.currentCapacity -= totalWeight;
		await sourceInventory.save();

		return { error: null };
	} catch (error) {
		return { error: error };
	}
}

async function deleteItemById({ id }) {
	try {
		await sequelize.sync();
		// Extract the components of the item ID
		const [categoryId, typeId, sizeId, materialId, manufactureId] = id.split('-');

		// Find all items with matching characteristics across all inventories
		const items = await Item.findAll({
			where: {
				CategoryId: categoryId,
				TypeId: typeId,
				SizeId: sizeId,
				MaterialId: materialId,
				ManufactureId: manufactureId,
			},
		});

		if (!items || items.length === 0) {
			return { error: `Item not found` };
		}

		for (const item of items) {
			// Get the associated inventory ID and weight per piece
			const { InventoryId, weightPerPiece } = item;

			// Calculate the total weight of the item
			const totalWeight = weightPerPiece * item.numberOfPieces;

			// Retrieve the corresponding inventory record
			const inventory = await Inventory.findByPk(InventoryId);

			if (!inventory) {
				console.error(`Inventory with ID ${InventoryId} not found.`);
				return { error: `Inventory not found` };
			}

			// Update the current capacity of the inventory
			inventory.currentCapacity -= totalWeight;
			await inventory.save();

			// Delete the item
			await item.destroy();
		}

		return { error: null };
	} catch (error) {
		return { error: `Error deleting the item` };
	}
}

async function updatePrice({ id, pricePerKilo, numberOfPieces, weightPerPiece }) {
	try {
		await sequelize.sync();
		// Extract the components of the item ID including the InventoryId
		const [categoryId, typeId, sizeId, materialId, manufactureId, inventoryId] = id.split('-');

		// Find the specific item to update its numberOfPieces and current capacity
		const itemToUpdate = await Item.findByPk(id);

		if (!itemToUpdate) {
			return { error: `Cannot find item with ID ${id} to update number of pieces` };
		}

		// Calculate the difference in weight due to the change in number of pieces
		const oldTotalWeight = itemToUpdate.numberOfPieces * itemToUpdate.weightPerPiece;
		const newTotalWeight = numberOfPieces * weightPerPiece;
		const weightDifference = newTotalWeight - oldTotalWeight;

		// Update the numberOfPieces for the specified item
		itemToUpdate.numberOfPieces = numberOfPieces;
		await itemToUpdate.save();

		// Find the relevant inventory
		const inventoryToUpdate = await Inventory.findByPk(inventoryId);

		if (!inventoryToUpdate) {
			return { error: `Cannot find inventory with ID ${inventoryId} to update capacity` };
		}

		// Update the currentCapacity for the inventory
		inventoryToUpdate.currentCapacity += weightDifference;
		await inventoryToUpdate.save();

		// Find all items with matching characteristics across all inventories
		const itemsToUpdate = await Item.findAll({
			where: {
				CategoryId: categoryId,
				TypeId: typeId,
				SizeId: sizeId,
				MaterialId: materialId,
				ManufactureId: manufactureId,
			},
		});

		if (!itemsToUpdate || itemsToUpdate.length === 0) {
			return { error: `Cannot find items to update price and weight` };
		}

		// Update the pricePerKilo and weightPerPiece for all matching items
		for (const item of itemsToUpdate) {
			item.pricePerKilo = pricePerKilo;
			item.weightPerPiece = weightPerPiece;
			await item.save();
		}

		return { error: null };
	} catch (error) {
		console.error('Error updating item:', error);
		return { error: 'Price and weight did not update' };
	}
}

export const apiItem = {
	createItem,
	getAllItemsWithDetails,
	getItemWithDetailsById,
	transferItems,
	deleteItemById,
	updatePrice,
};
