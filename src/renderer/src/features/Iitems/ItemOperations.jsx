import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import TableOperations from '../../components/TableOperations';
import CategoryFilter from './CategoryFilter';
import InventoryFilter from './InventoryFilter';
import ManufactureFilter from './ManufactureFilter';
import MaterialFilter from './MaterialFilter';
import SizeFilter from './SizeFilter';
import TypeFilter from './TypeFilter';
import StanderdFilter from './StanderdFilter';
import { resetFilters } from './filterSlice';
import styled from 'styled-components';
import HideZerosCheck from './HideZerosCheck';
import SortNumbers from './SortNumbers';

const ResetButton = styled(Button)`
	align-self: end;
	margin-right: 2rem;
`;

function ItemOperations() {
	const dispatch = useDispatch();

	function handleReset() {
		dispatch(resetFilters());
	}

	return (
		<TableOperations>
			<ResetButton onClick={handleReset}>إعادة ضبط</ResetButton>
			<SortNumbers />
			<HideZerosCheck />
			<CategoryFilter />
			<TypeFilter />
			<SizeFilter />
			<MaterialFilter />
			<StanderdFilter />
			<ManufactureFilter />
			<InventoryFilter />
		</TableOperations>
	);
}

export default ItemOperations;
