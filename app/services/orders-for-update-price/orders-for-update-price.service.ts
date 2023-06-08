import { getOFUPUrl } from '@config/url.config'
import instance from 'api/interceptors'
import {
	IOrderForUpdatePrice,
	IOrderForUpdatePriceReturn,
} from './orders-for-update-price.interface'

export const OFUPService = {
	async createOrder(data: IOrderForUpdatePrice) {
		return await instance.post<IOrderForUpdatePriceReturn>(getOFUPUrl(''), data)
	},

	async getOrdersByUserAndProduct(
		data: Pick<IOrderForUpdatePrice, 'userEmail' | 'productId'>
	) {
		return await instance.post<IOrderForUpdatePriceReturn[]>(
			getOFUPUrl('/by-user-product'),
			data
		)
	},

	async getByEmail(email: string) {
		return await instance.post<IOrderForUpdatePriceReturn[]>(
			getOFUPUrl('/by-email'),
			{
				email,
			}
		)
	},

	async getByUser() {
		return await instance.get<IOrderForUpdatePriceReturn[]>(
			getOFUPUrl('/by-user')
		)
	},

	async delete(id: number) {
		return await instance.delete(getOFUPUrl(`/${id}`))
	},
}
