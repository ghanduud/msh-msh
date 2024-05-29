import styled from 'styled-components';
import Checkbox from '../../components/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { setHideZeros } from './filterSlice';

const FilterCell = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	flex-direction: column;
`;

function HideZerosCheck() {
	const dispatch = useDispatch();
	const hideZeros = useSelector((state) => state.filter.hideZeros);

	const handleCheckboxChange = () => {
		dispatch(setHideZeros(!hideZeros));
	};

	return (
		<FilterCell>
			<label>ازالة البضائع الفارغة</label>
			<Checkbox id='hideZerosCheckbox' checked={hideZeros} onChange={handleCheckboxChange} />
		</FilterCell>
	);
}

export default HideZerosCheck;
