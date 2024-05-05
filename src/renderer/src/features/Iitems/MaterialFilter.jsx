import styled from 'styled-components';

import Select from '../../components/Select';

import { useMaterial } from '../material/useMaterial';
import { useDispatch, useSelector } from 'react-redux';
import { setMaterialFilter } from './filterSlice';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function MaterialFilter() {
	const { isLoading, materials } = useMaterial();

	const dispatch = useDispatch();
	const { materialFilter } = useSelector((store) => store.filter);

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'الكل' },
		...materials.map((material) => ({ value: material.name, label: material.name })),
	];

	function handleChange(e) {
		dispatch(setMaterialFilter(e.target.value));
	}

	return (
		<FilterCell>
			<label>الخامة</label>
			<Select options={options} value={materialFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default MaterialFilter;
