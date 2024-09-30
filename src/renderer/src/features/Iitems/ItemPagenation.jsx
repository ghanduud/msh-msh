import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import styled from 'styled-components';
import { useEffect } from 'react';
import { setPage } from './filterSlice';

const StyledPage = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	font-size: 2rem;
`;

function ItemPagination() {
	const { page } = useSelector((store) => store.filter);
	const dispatch = useDispatch();

	const handlePrevPage = () => {
		if (page > 1) {
			dispatch(setPage(page - 1));
		}
	};

	const handleNextPage = () => {
		dispatch(setPage(page + 1));
	};

	useEffect(() => {
		const outlet = document.querySelector('.items-page');
		if (outlet) {
			outlet.scrollIntoView({ behavior: 'smooth' });
		}
	}, [page]);

	return (
		<StyledPage>
			<Button onClick={handlePrevPage}>&larr;</Button>
			<p>{page}</p>
			<Button onClick={handleNextPage}>&rarr;</Button>
		</StyledPage>
	);
}

export default ItemPagination;
