import { getStatisticsUrl } from '@config/api.config'
import { axiosClassic } from 'api/interceptors'
import { IAllStatistics } from './statistics.interface'

export const StatisticsService = {
	async getAll() {
		return await axiosClassic.get<IAllStatistics>(getStatisticsUrl('/all'))
	},
}
