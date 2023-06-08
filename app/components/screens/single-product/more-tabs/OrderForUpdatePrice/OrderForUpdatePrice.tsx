import { useAuth } from '@hooks/useAuth'
import { IProductReturn } from '@services/products/products.interface'
import { Col, Empty, Row, Skeleton } from 'antd'
import Link from 'next/link'
import { FC } from 'react'
import OrderForUpdatePriceForm from './OrderForUpdatePriceForm'
import OrderForUpdatePriceOrders from './OrderForUpdatePriceOrders'
import { useOrderForUpdatePrice } from './useOrderForUpdatePrice'

const OrderForUpdatePrice: FC<{
	product: IProductReturn
}> = ({ product }) => {
	const { user } = useAuth()
	const {
		createOrder: { mutateAsync: submitForm, isLoading },
		getOrders: { data: orders, isLoading: isLoadingOrders },
	} = useOrderForUpdatePrice(product, user)

	const onSubmit = (data: any) => {
		submitForm(data)
	}

	console.log(orders)

	if (!user)
		return (
			<Empty
				description={
					<span>
						Чтобы отправить новую цену – нужна{' '}
						<Link href="/auth/login">авторизация</Link>
					</span>
				}
			></Empty>
		)
	return (
		<Row gutter={32}>
			<Col span={12}>
				<OrderForUpdatePriceForm
					isLoading={isLoading}
					onSubmit={onSubmit}
					product={product}
				/>
			</Col>
			<Col span={12}>
				{isLoadingOrders && <Skeleton />}
				<OrderForUpdatePriceOrders
					title
					viewAllButton
					data={orders || []}
					isLoading={isLoadingOrders}
				/>
			</Col>
		</Row>
	)
}

export default OrderForUpdatePrice
