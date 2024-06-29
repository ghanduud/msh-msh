import {
	OutOrder,
	sequelize,
	SellItem,
	Category,
	Type,
	Size,
	Inventory,
	Material,
	Manufacture,
	Standerd,
	Item,
} from './sqlite';

async function getOutOrders() {
	try {
		await sequelize.sync();

		// Retrieve OutOrders with selected attributes, including createdAt
		const orders = await OutOrder.findAll({
			attributes: [
				'id',
				'customerName',
				'status',
				'totalPrice',
				'discount',
				'createdAt',
				'customerPhone',
				'confirmDate',
			],
		});

		// Map through the orders and format the data
		const formattedOrders = orders.map((order) => ({
			id: order.id,
			customerName: order.customerName,
			customerPhone: order.customerPhone,
			status: order.status,
			totalPrice: order.totalPrice,
			discount: order.discount,
			createdAt: order.createdAt,
			confirmDate: order.confirmDate,
		}));

		return { data: formattedOrders, error: null };
	} catch (error) {
		return { data: [], error: `Error getting OutOrders: ${error.message}` };
	}
}

async function getOutOrderById(orderId) {
	try {
		await sequelize.sync();

		// Retrieve the OutOrder with the specified ID, including associated SellItems and their associated models
		const order = await OutOrder.findByPk(orderId, {
			include: [
				{
					model: SellItem,
					include: [Category, Type, Size, Material, Standerd, Manufacture, Inventory],
				},
			],
		});

		// Check if the order exists
		if (!order) {
			throw new Error(`OutOrder with ID ${orderId} not found.`);
		}

		// Format the data
		const formattedOrder = {
			id: order.id,
			customerName: order.customerName,
			customerPhone: order.customerPhone,
			status: order.status,
			totalPrice: order.totalPrice,
			discount: order.discount,
			createdAt: order.createdAt,
			confirmDate: order.confirmDate,
			sellItems: order.SellItems.map((sellItem) => ({
				id: sellItem.id,
				totalPrice: sellItem.totalPrice,
				numberOfPieces: sellItem.numberOfPieces,
				totalWeight: sellItem.totalWeight,
				// Include other attributes of SellItem here
				category: sellItem.Category.name,
				type: sellItem.Type.name,
				size: sellItem.Size.name,
				material: sellItem.Material.name,
				standerd: sellItem.Standerd.name,
				manufacture: sellItem.Manufacture.name,
				inventory: sellItem.Inventory.location,
			})),
		};

		return { data: formattedOrder, error: null };
	} catch (error) {
		return { data: null, error: `Error getting OutOrder: ${error}` };
	}
}

async function createOrder({ customerName, customerPhone, totalPrice, discount, sellItemArray }) {
	console.log(customerName, customerPhone, discount, totalPrice, sellItemArray);

	try {
		await sequelize.transaction(async (transaction) => {
			// Create the OutOrder
			const order = await OutOrder.create(
				{
					customerName,
					customerPhone,
					status: 'unconfirmed',
					totalPrice,
					discount,
				},
				{ transaction }
			);

			// Create SellItems
			await Promise.all(
				sellItemArray.map(async (sellItem) => {
					const {
						category,
						type,
						size,
						material,
						standerd,
						manufacture,
						inventory,
						numberOfPieces,
						totalWeight,
						totalPrice: sellItemTotalPrice,
					} = sellItem;

					const sellItemId = `${order.id}-${category}-${type}-${size}-${material}-${standerd}-${manufacture}-${inventory}`;

					await SellItem.create(
						{
							id: sellItemId,
							totalPrice: sellItemTotalPrice,
							numberOfPieces,
							totalWeight,
							OutOrderId: order.id, // Associate with the created OutOrder
							CategoryId: category,
							TypeId: type,
							SizeId: size,
							MaterialId: material,
							StanderdId: standerd,
							ManufactureId: manufacture,
							InventoryId: inventory,
						},
						{ transaction }
					);
				})
			);
		});
		return { error: null };
	} catch (error) {
		return { error: error };
	}
}

async function deleteOutOrderById({ orderId }) {
	try {
		await sequelize.transaction(async (transaction) => {
			// Find the OutOrder by its ID
			const order = await OutOrder.findByPk(orderId, { include: SellItem, transaction });

			// If the order doesn't exist, return an error
			if (!order) {
				throw new Error(`OutOrder with ID ${orderId} not found.`);
			}

			// Delete the associated SellItems
			await Promise.all(
				order.SellItems.map(async (sellItem) => {
					await sellItem.destroy({ transaction });
				})
			);

			// Delete the OutOrder
			await order.destroy({ transaction });
		});

		return { error: null };
	} catch (error) {
		return { error: error.message };
	}
}

async function confirmOutOrder({ orderId }) {
	try {
		await sequelize.transaction(async (transaction) => {
			// Find the OutOrder by its ID
			const order = await OutOrder.findByPk(orderId, { include: SellItem, transaction });

			// If the order doesn't exist, return an error
			if (!order) {
				throw new Error(`OutOrder with ID ${orderId} not found.`);
			}

			// If the order status is not "unconfirmed", return an error
			if (order.status !== 'unconfirmed') {
				throw new Error(
					`OutOrder with ID ${orderId} cannot be confirmed because its status is not "unconfirmed".`
				);
			}

			// Iterate through each sell item
			for (const sellItem of order.SellItems) {
				// Access SellItems directly from order object
				const { CategoryId, TypeId, SizeId, MaterialId, StanderdId, ManufactureId, InventoryId, numberOfPieces } =
					sellItem;

				// Construct composite IDs
				const sellItemId = `${order.id}-${CategoryId}-${TypeId}-${SizeId}-${MaterialId}-${StanderdId}-${ManufactureId}-${InventoryId}`;
				const itemId = `${CategoryId}-${TypeId}-${SizeId}-${MaterialId}-${StanderdId}-${ManufactureId}-${InventoryId}`;

				// Find the corresponding item in the inventory
				const inventoryItem = await Item.findByPk(itemId, { transaction });

				// If the inventory item doesn't exist or has insufficient quantity, return an error
				if (!inventoryItem || inventoryItem.numberOfPieces < numberOfPieces) {
					throw new Error(sellItemId);
				}

				// Update the inventory item by subtracting the quantity of the sell item
				await inventoryItem.decrement('numberOfPieces', { by: numberOfPieces, transaction });
			}

			// Update the status of the order to "confirmed"
			await order.update({ status: 'confirmed', confirmDate: new Date() }, { transaction });
		});

		return { error: null };
	} catch (error) {
		return { error: error.message };
	}
}

export const apiOutOrder = {
	getOutOrders,
	getOutOrderById,
	createOrder,
	deleteOutOrderById,
	confirmOutOrder,
};
