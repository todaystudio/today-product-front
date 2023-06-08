import { IOrderForUpdatePrice } from '@services/orders-for-update-price/orders-for-update-price.interface'
import { OFUPService } from '@services/orders-for-update-price/orders-for-update-price.service'
import { IProductReturn } from '@services/products/products.interface'
import { IUserState } from '@store/user/user.interface'
import { message } from 'antd'
import { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'

export const useOrderForUpdatePrice = (
	product: IProductReturn,
	user: IUserState | null
) => {
	const createOrder = useMutation(
		'create order for update',
		(data: IOrderForUpdatePrice) => {
			if (!user) throw new Error('No user!')
			return OFUPService.createOrder({
				...data,
				price: +data.price,
				userEmail: user.email,
				productId: product.id,
			})
		},
		{
			onSuccess: ({ data }) => {
				message.success(`Заявка #${data.id} отправлена!`)
				getOrders.refetch()
			},
			onError: ({ data }) => {
				message.error('Что-то пошло не так')
			},
		}
	)

	const getOrders = useQuery(
		'get orders by product and user',
		() => {
			if (!user) throw new Error('No user!')
			return OFUPService.getOrdersByUserAndProduct({
				userEmail: user.email,
				productId: product.id,
			})
		},
		{
			select: ({ data }) => data.sort((a, b) => b.id - a.id).slice(0, 4),
			enabled: !!user?.email,
		}
	)

	return useMemo(
		() => ({
			createOrder,
			getOrders,
		}),
		[createOrder, getOrders]
	)
}
