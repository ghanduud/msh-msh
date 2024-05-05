import styled from 'styled-components';
import { useInventory } from '../inventories/useInventory';
// import { useSearchParams } from 'react-router-dom';
import Select from '../../components/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setInventoryFilter } from './filterSlice';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function InventoryFilter() {
	const { isLoading, inventories } = useInventory();

	const dispatch = useDispatch();
	const { inventoryFilter } = useSelector((store) => store.filter);

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'الكل' },
		...inventories.map((inventory) => ({ value: inventory.location, label: inventory.location })),
	];

	function handleChange(e) {
		dispatch(setInventoryFilter(e.target.value));
	}

	return (
		<FilterCell>
			<label>المخزن</label>
			<Select options={options} value={inventoryFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default InventoryFilter;
