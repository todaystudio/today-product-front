import { getShopsUrl } from '@config/api.config'
import { axiosClassic } from 'api/interceptors'
import { IShopReturn } from './shops.interface'

export const ShopService = {
	async getManyById(ids: number[]) {
		console.log(ids)
		return await axiosClassic.get<IShopReturn[]>(getShopsUrl(`/many-by-id`), {
			data: ids,
		})
	},
}
