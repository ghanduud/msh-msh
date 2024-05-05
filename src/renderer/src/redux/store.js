import { configureStore } from '@reduxjs/toolkit';

import filterReducer from '../features/Iitems/filterSlice';

const store = configureStore({
	reducer: {
		filter: filterReducer,
	},
});

export default store;
