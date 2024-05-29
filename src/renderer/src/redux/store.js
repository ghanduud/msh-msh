import { configureStore } from '@reduxjs/toolkit';

import filterReducer from '../features/Iitems/filterSlice';
import outOrderReducer from '../features/outOrders/outOrderSlice';

const store = configureStore({
	reducer: {
		filter: filterReducer,
		outOrder: outOrderReducer,
	},
});

export default store;
