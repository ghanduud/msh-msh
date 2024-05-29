import { useQuery } from '@tanstack/react-query';
import { getOutOrders } from '../../services/apiOutOrders';

export function useOutOrders() {
	const {
		isLoading,
		data: outOrders,
		error,
	} = useQuery({
		queryKey: ['outOrders'],
		queryFn: getOutOrders,
	});

	return { isLoading, error, outOrders };
}
