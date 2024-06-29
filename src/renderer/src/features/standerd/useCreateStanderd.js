import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createStanderd as apiCreateStanderd } from '../../services/apiStanderd';

export function useCreateStanderd() {
	const queryClient = useQueryClient();

	const { mutate: createStanderd, isLoading: isCreating } = useMutation({
		mutationFn: apiCreateStanderd,
		onSuccess: () => {
			toast.success('New standerd successfully created');
			queryClient.invalidateQueries({ queryKey: ['standerds'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createStanderd };
}
