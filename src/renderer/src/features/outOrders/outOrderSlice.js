import { createSlice } from '@reduxjs/toolkit';

const outOrderInitialState = {
	customerName: '',
	customerPhone: '',
	itemCounterId: 0,
	discount: '',
	sellItemArray: [],
};

const outOrderSlice = createSlice({
	name: 'outOrder',
	initialState: outOrderInitialState,
	reducers: {
		setCustomerName(state, action) {
			state.customerName = action.payload;
		},
		setCustomerPhone(state, action) {
			state.customerPhone = action.payload;
		},

		setDiscount(state, action) {
			state.discount = action.payload;
		},
		addSellItem(state, action) {
			state.itemCounterId = state.itemCounterId + 1;
			const item = { ...action.payload, itemId: state.itemCounterId };
			state.sellItemArray = [...state.sellItemArray, item];
		},
		setCategoryForItem(state, action) {
			const { id, category } = action.payload;
			const sellItemToUpdate = state.sellItemArray.find((item) => item.itemId === id);
			if (sellItemToUpdate) {
				sellItemToUpdate.category = category;
			}
		},
		setTypeForItem(state, action) {
			const { id, type } = action.payload;
			const sellItemToUpdate = state.sellItemArray.find((item) => item.itemId === id);
			if (sellItemToUpdate) {
				sellItemToUpdate.type = type;
			}
		},
		setSizeForItem(state, action) {
			const { id, size } = action.payload;
			const sellItemToUpdate = state.sellItemArray.find((item) => item.itemId === id);
			if (sellItemToUpdate) {
				sellItemToUpdate.size = size;
			}
		},
		setMaterialForItem(state, action) {
			const { id, material } = action.payload;
			const sellItemToUpdate = state.sellItemArray.find((item) => item.itemId === id);
			if (sellItemToUpdate) {
				sellItemToUpdate.material = material;
			}
		},
		setManufactureForItem(state, action) {
			const { id, manufacture } = action.payload;
			const sellItemToUpdate = state.sellItemArray.find((item) => item.itemId === id);
			if (sellItemToUpdate) {
				sellItemToUpdate.manufacture = manufacture;
			}
		},
		setInventoryForItem(state, action) {
			const { id, inventory } = action.payload;
			const sellItemToUpdate = state.sellItemArray.find((item) => item.itemId === id);
			if (sellItemToUpdate) {
				sellItemToUpdate.inventory = inventory;
			}
		},
		setNumberOfPiecesForItem(state, action) {
			const { id, numberOfPieces } = action.payload;
			const sellItemToUpdate = state.sellItemArray.find((item) => item.itemId === id);
			if (sellItemToUpdate) {
				sellItemToUpdate.numberOfPieces = numberOfPieces;
			}
		},
		setTotalWeightForItem(state, action) {
			const { id, totalWeight } = action.payload;
			const sellItemToUpdate = state.sellItemArray.find((item) => item.itemId === id);
			if (sellItemToUpdate) {
				sellItemToUpdate.totalWeight = totalWeight;
			}
		},
		setTotalPriceForItem(state, action) {
			const { id, totalPrice } = action.payload;
			const sellItemToUpdate = state.sellItemArray.find((item) => item.itemId === id);
			if (sellItemToUpdate) {
				sellItemToUpdate.totalPrice = totalPrice;
			}
		},
		setItemIsCorrect(state, action) {
			const { id, correctItem } = action.payload;
			const sellItemToUpdate = state.sellItemArray.find((item) => item.itemId === id);
			if (sellItemToUpdate) {
				sellItemToUpdate.correctItem = correctItem;
			}
		},
		setSellItemArray(state, action) {
			state.sellItemArray = action.payload;
		},
		resetOutOrder(state) {
			state.customerName = '';
			state.customerPhone = '';
			state.discount = '';
			state.sellItemArray = [];
		},
	},
});

export const {
	setCustomerName,
	setCustomerPhone,
	setDiscount,
	addSellItem,
	setCategoryForItem,
	setTypeForItem,
	setSizeForItem,
	setMaterialForItem,
	setManufactureForItem,
	setInventoryForItem,
	setNumberOfPiecesForItem,
	setTotalWeightForItem,
	setTotalPriceForItem,
	setItemIsCorrect,
	setSellItemArray,
	resetOutOrder,
} = outOrderSlice.actions;

export default outOrderSlice.reducer;
