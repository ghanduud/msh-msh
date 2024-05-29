import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { createOutOrder as apiCreateOutOrder } from '../../services/apiOutOrders';

export function useCreateOutOrder() {
	const queryClient = useQueryClient();

	const { mutate: createOutOrder, isLoading: isCreating } = useMutation({
		mutationFn: apiCreateOutOrder,
		onSuccess: () => {
			toast.success('New Out Order successfully created');
			queryClient.invalidateQueries({ queryKey: ['outOrders'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createOutOrder };
}
