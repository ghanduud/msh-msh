import styled from 'styled-components';

import Select from '../../components/Select';

import { useDispatch, useSelector } from 'react-redux';
import { setSortNumbers } from './filterSlice';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function SortNumbers() {
	const dispatch = useDispatch();
	const { sortNumbers } = useSelector((store) => store.filter);

	const options = [
		{ value: '', label: 'الاعتيادي' },
		{ value: 'dec', label: 'تنازلي' },
		{ value: 'asc', label: 'تصاعدي' },
	];

	function handleChange(e) {
		dispatch(setSortNumbers(e.target.value));
	}

	return (
		<FilterCell>
			<label>المقاس</label>
			<Select options={options} value={sortNumbers} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default SortNumbers;
