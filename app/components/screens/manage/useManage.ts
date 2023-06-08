import { StatisticsService } from '@services/statistics/statistics.service'
import { useQuery } from 'react-query'

export const useManage = () => {
	const { data: statistics, isLoading: isLoadingStat } = useQuery(
		'get all statistics',
		() => StatisticsService.getAll(),
		{
			select: ({ data }) => data,
		}
	)

	return {
		statistics,
		isLoadingStat,
	}
}
