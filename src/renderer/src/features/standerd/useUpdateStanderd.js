import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateStanderd as apiUpdateStanderd } from '../../services/apiStanderd';

export function useUpdateStanderd() {
	const queryClient = useQueryClient();

	const { mutate: updateStanderd, isLoading: isUpdateing } = useMutation({
		mutationFn: apiUpdateStanderd,
		onSuccess: () => {
			toast.success('Standerd successfully updated');
			queryClient.invalidateQueries({ queryKey: ['standerds'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdateing, updateStanderd };
}
