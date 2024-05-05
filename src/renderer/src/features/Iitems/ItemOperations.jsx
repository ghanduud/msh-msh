import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import TableOperations from '../../components/TableOperations';
import CategoryFilter from './CategoryFilter';
import InventoryFilter from './InventoryFilter';
import ManufactureFilter from './ManufactureFilter';
import MaterialFilter from './MaterialFilter';
import SizeFilter from './SizeFilter';
import TypeFilter from './TypeFilter';
import { resetFilters } from './filterSlice';
import styled from 'styled-components';

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
			<CategoryFilter />
			<MaterialFilter />
			<TypeFilter />
			<SizeFilter />
			<ManufactureFilter />
			<InventoryFilter />
		</TableOperations>
	);
}

export default ItemOperations;
