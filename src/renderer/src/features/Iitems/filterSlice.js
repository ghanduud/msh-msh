import { createSlice } from '@reduxjs/toolkit';

const filterState = {
	categoryFilter: '',
	inventoryFilter: '',
	manufactureFilter: '',
	materialFilter: '',
	sizeFilter: '',
	typeFilter: '',
};

const filterSlice = createSlice({
	name: 'filter',
	initialState: filterState,
	reducers: {
		setCategoryFilter(state, action) {
			state.categoryFilter = action.payload;
		},
		setInventoryFilter(state, action) {
			state.inventoryFilter = action.payload;
		},
		setManufactureFilter(state, action) {
			state.manufactureFilter = action.payload;
		},
		setMaterialFilter(state, action) {
			state.materialFilter = action.payload;
		},
		setSizeFilter(state, action) {
			state.sizeFilter = action.payload;
		},
		setTypeFilter(state, action) {
			state.typeFilter = action.payload;
		},
		resetFilters(state) {
			state.categoryFilter = '';
			state.inventoryFilter = '';
			state.manufactureFilter = '';
			state.materialFilter = '';
			state.sizeFilter = '';
			state.typeFilter = '';
		},
	},
});

export const {
	setCategoryFilter,
	setInventoryFilter,
	setManufactureFilter,
	setMaterialFilter,
	setSizeFilter,
	setTypeFilter,
	resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
