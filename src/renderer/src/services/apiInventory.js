export async function getInventories() {
	const { data, error } = await window.apiInventory.getInventories();
	if (error) throw new Error(error);
	return data;
}

export async function deleteInventory(inventoryToDelete) {
	const { error } = await window.apiInventory.deleteInventory(inventoryToDelete);
	if (error) throw new Error(error);
}

export async function createInventory(newInventory) {
	const { error } = await window.apiInventory.createInventory(newInventory);
	if (error) throw new Error(error);
}

export async function updateInventory(updatedInventory) {
	const { error } = await window.apiInventory.updateInventory(updatedInventory);
	if (error) throw new Error(error);
}
