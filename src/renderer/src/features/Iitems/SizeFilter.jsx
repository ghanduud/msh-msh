import styled from 'styled-components';

import Select from '../../components/Select';

import { useSize } from '../size/useSize';
import { useDispatch, useSelector } from 'react-redux';
import { setSizeFilter } from './filterSlice';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function SizeFilter() {
	const { isLoading, sizes } = useSize();

	const dispatch = useDispatch();
	const { sizeFilter } = useSelector((store) => store.filter);

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'الكل' },
		...sizes.map((size) => ({ value: size.name, label: size.name })),
	];

	function handleChange(e) {
		dispatch(setSizeFilter(e.target.value));
	}

	return (
		<FilterCell>
			<label>المقاس</label>
			<Select options={options} value={sizeFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default SizeFilter;
