export async function getStanderds() {
	const { data, error } = await window.apiStanderd.getStanderds();
	if (error) throw new Error(error);
	return data;
}

export async function deleteStanderd(standerdToDelete) {
	const { error } = await window.apiStanderd.deleteStanderd(standerdToDelete);
	if (error) throw new Error(error);
}

export async function createStanderd(standerdToCreate) {
	const { error } = await window.apiStanderd.createStanderd(standerdToCreate);
	if (error) return error;
}

export async function updateStanderd(standerdToUpdate) {
	const { error } = await window.apiStanderd.updateStanderd(standerdToUpdate);
	if (error) throw new Error(error);
}
