import { EnumOrderStatus } from '@components/ui/order-tags/OrderTags'
import { IProductReturn } from '@services/products/products.interface'

export interface IOrderForUpdatePrice {
	userEmail: string
	productId: number
	price: number
	link?: string
	message?: string
}

export interface IOrderForUpdatePriceReturn {
	id: number
	createdAt: string
	updatedAt: string
	userId: number
	productId?: number
	price: number
	link: string
	message: string
	status: EnumOrderStatus
	Product: IProductReturn
}
