import { IPriceTable } from '@components/screens/single-product/more-tabs/PriceHistory'
import { getProductsUrl } from '@config/api.config'
import { IPagination } from '@shared/interfaces/pagination.interface'
import instance, { axiosClassic } from 'api/interceptors'
import {
	IBarcode,
	IProductReturn,
	IProductStatistics,
	ISearchProduct,
} from './products.interface'

export const ProductService = {
	async getAll(search?: ISearchProduct) {
		return await axiosClassic.get<IProductReturn[]>(getProductsUrl(''), {
			params: search ? { ...search } : {},
		})
	},

	async getByCategorySlug(slug: string, pagination?: IPagination) {
		return await axiosClassic.get<IProductReturn[]>(
			getProductsUrl(`/by-category/${slug}`),
			{
				params: {
					...pagination,
				},
			}
		)
	},

	async getBySlug(slug: string) {
		return await axiosClassic.get<IProductReturn>(
			getProductsUrl(`/by-slug/${slug}`)
		)
	},

	async getPriceHistory(id: number) {
		return await axiosClassic.get<IPriceTable[]>(
			getProductsUrl(`/price-history/${id}`)
		)
	},

	async getBarcodeById(id: number) {
		return await axiosClassic.get<IBarcode[]>(getProductsUrl(`/barcode/${id}`))
	},

	async getSimilar(id: number) {
		return await axiosClassic.get<IProductReturn[]>(
			getProductsUrl(`/similar/${id}`)
		)
	},

	async getMostDynamic(perPage?: number) {
		return await axiosClassic(
			getProductsUrl(`/most-dynamic${perPage ? '?perPage=' + perPage : ''}`)
		)
	},

	async getById(id: string) {
		return await instance.get<IProductReturn>(getProductsUrl(`/by-id/${id}`))
	},

	async getStatistics(id: number) {
		return await axiosClassic.get<IProductStatistics>(
			getProductsUrl(`/price-params/${id}`)
		)
	},
}
