import styled from 'styled-components';

import Select from '../../components/Select';

import { useStanderd } from '../standerd/useStanderd';
import { useDispatch, useSelector } from 'react-redux';
import { setStanderdFilter } from './filterSlice';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function standerdFilter() {
	const { isLoading, standerds } = useStanderd();

	const dispatch = useDispatch();
	const { standerdFilter } = useSelector((store) => store.filter);

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'الكل' },
		...standerds.map((standerd) => ({ value: standerd.name, label: standerd.name })),
	];

	function handleChange(e) {
		dispatch(setStanderdFilter(e.target.value));
	}

	return (
		<FilterCell>
			<label>المعيار</label>
			<Select options={options} value={standerdFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default standerdFilter;
