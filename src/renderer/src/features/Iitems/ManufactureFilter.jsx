import styled from 'styled-components';

import Select from '../../components/Select';

import { useManufacture } from '../manufacture/useManufacture';
import { useDispatch, useSelector } from 'react-redux';
import { setManufactureFilter } from './filterSlice';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function ManufactureFilter() {
	const { isLoading, manufactures } = useManufacture();

	const dispatch = useDispatch();
	const { manufactureFilter } = useSelector((store) => store.filter);

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'الكل' },
		...manufactures.map((manufacture) => ({ value: manufacture.name, label: manufacture.name })),
	];

	function handleChange(e) {
		dispatch(setManufactureFilter(e.target.value))
	}

	return (
		<FilterCell>
			<label>المصنع</label>
			<Select options={options} value={manufactureFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default ManufactureFilter;
