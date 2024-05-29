import { useMutation, useQueryClient } from '@tanstack/react-query';
import { confirmOutOrder as apiConfirmOutOrder } from '../../services/apiOutOrders';
import toast from 'react-hot-toast';

export function useConfirmOutOrder() {
	const queryClient = useQueryClient();

	const { mutate: confirmOutOrder, isLoading: isConfirming } = useMutation({
		mutationFn: apiConfirmOutOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['items', 'outOrders', 'outOrder'] });
			toast.success('Confirm done successfully');
		},
		onError: (err) => toast.error(`Error in transefare ${err}`),
	});

	return { confirmOutOrder, isConfirming };
}
