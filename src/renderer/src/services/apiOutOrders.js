export async function getOutOrders() {
	const { data, error } = await window.apiOutOrder.getOutOrders();
	if (error) throw new Error(error);
	return data;
}

export async function getOutOrderById(id) {
	const { data, error } = await window.apiOutOrder.getOutOrderById(id);
	if (error) throw new Error(error);
	return data;
}

export async function createOutOrder(outOrder) {
	const { error } = await window.apiOutOrder.createOrder(outOrder);
	if (error) throw new Error(error);
}

export async function deleteOutOrder(outOrder) {
	const { error } = await window.apiOutOrder.deleteOutOrderById(outOrder);
	if (error) throw new Error(error);
}

export async function confirmOutOrder(outOrder) {
	const { error } = await window.apiOutOrder.confirmOutOrder(outOrder);
	if (error) throw new Error(error);
}
