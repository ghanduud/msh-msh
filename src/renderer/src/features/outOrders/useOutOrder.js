import { useQuery } from '@tanstack/react-query';
import { getOutOrderById } from '../../services/apiOutOrders';
import { useParams } from 'react-router-dom';

export function useOutOrder() {
	const { outOrderId } = useParams();

	const {
		isLoading,
		data: outOrder,
		error,
	} = useQuery({
		queryKey: ['outOrder'],
		queryFn: () => getOutOrderById(outOrderId),
	});
	return { isLoading, error, outOrder };
}
