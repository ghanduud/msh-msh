import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteStanderd as apiDeleteStanderd } from '../../services/apiStanderd';

export function useDeleteStanderd() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteStanderd } = useMutation({
		mutationFn: apiDeleteStanderd,
		onSuccess: () => {
			toast.success('Standerd successfully deleted');
			queryClient.invalidateQueries({ queryKey: ['standerds'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteStanderd };
}
