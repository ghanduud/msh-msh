import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { deleteOutOrder as apiDeleteOutOrder } from '../../services/apiOutOrders';

export function useDeleteOutOrder() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteOutOrder } = useMutation({
		mutationFn: apiDeleteOutOrder,
		onSuccess: () => {
			toast.success('Out order successfully deleted');

			queryClient.invalidateQueries({ queryKey: ['outOrders'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteOutOrder };
}
