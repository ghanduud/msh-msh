import styled from 'styled-components';

import Select from '../../components/Select';

import { useType } from '../type/useType';
import { useDispatch, useSelector } from 'react-redux';
import { setTypeFilter } from './filterSlice';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function TypeFilter() {
	const { isLoading, types } = useType();

	const dispatch = useDispatch();
	const { typeFilter } = useSelector((store) => store.filter);

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'الكل' },
		...types.map((type) => ({ value: type.name, label: type.name })),
	];

	function handleChange(e) {
		dispatch(setTypeFilter(e.target.value));
	}

	return (
		<FilterCell>
			<label>النوع</label>
			<Select options={options} value={typeFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default TypeFilter;
