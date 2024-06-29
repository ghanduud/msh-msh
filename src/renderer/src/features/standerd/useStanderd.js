import { useQuery } from '@tanstack/react-query';
import { getStanderds } from '../../services/apiStanderd';

export function useStanderd() {
	const {
		isLoading,
		data: standerds,
		error,
	} = useQuery({
		queryKey: ['standerds'],
		queryFn: getStanderds,
	});

	return { isLoading, error, standerds };
}
