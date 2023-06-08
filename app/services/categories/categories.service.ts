import { getCategoriesUrl } from '@config/api.config'
import { axiosClassic } from 'api/interceptors'
import { CategoryGetAll, ICategory } from './categories.interface'

export const CategoriesService = {
	async getAll() {
		return await axiosClassic.get<CategoryGetAll>(getCategoriesUrl(''))
	},

	async getBySlug(slug: string) {
		return await axiosClassic.get<ICategory>(getCategoriesUrl(`/${slug}`))
	},
}
