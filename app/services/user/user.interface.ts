import { IOrderForUpdatePriceReturn } from '@services/orders-for-update-price/orders-for-update-price.interface'

export interface IUserProfile {
	id: number
	createdAt: string
	updatedAt: string
	email: string
	password: string
	name: string
	avatarPath: string
	phone: string
	telegramId: string
	phoneConfirm: boolean
	emailConfirm: boolean
	emailing: boolean
	isAdmin: boolean
	OrderForUpdatePrice: IOrderForUpdatePriceReturn[]
	//TODO
	productSubs: any[]
	Subscribers: ISubscribers
}

export interface ISubscribers {
	telegramId: number
	userId: number
	mailing: boolean
}
