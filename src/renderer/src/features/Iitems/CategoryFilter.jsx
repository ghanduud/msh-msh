import styled from 'styled-components';
// import { useSearchParams } from 'react-router-dom';
import Select from '../../components/Select';
import { useCategory } from '../category/useCategory';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from './filterSlice';

const FilterCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`;

function CategoryFilter() {
	const { isLoading, categories } = useCategory();

	const dispatch = useDispatch();
	const { categoryFilter } = useSelector((store) => store.filter);

	if (isLoading) return null;

	const options = [
		{ value: '', label: 'الكل' },
		...categories.map((category) => ({ value: category.name, label: category.name })),
	];

	function handleChange(e) {
		dispatch(setCategoryFilter(e.target.value));
	}

	return (
		<FilterCell>
			<label>الصنف</label>
			<Select options={options} value={categoryFilter} onChange={handleChange} type='white' />
		</FilterCell>
	);
}

export default CategoryFilter;
