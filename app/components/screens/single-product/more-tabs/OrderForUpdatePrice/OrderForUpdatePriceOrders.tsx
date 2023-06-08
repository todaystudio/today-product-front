import OrderTags from '@components/ui/order-tags/OrderTags'
import { IOrderForUpdatePriceReturn } from '@services/orders-for-update-price/orders-for-update-price.interface'
import { Card, Col, Divider, Empty, Row, Skeleton, Typography } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC } from 'react'

const { Text } = Typography

interface OrderForUpdatePriceOrders {
	data: IOrderForUpdatePriceReturn[]
	isLoading: boolean
	title?: boolean
	take?: number
	viewAllButton?: boolean
}

const OrderForUpdatePriceOrders: FC<OrderForUpdatePriceOrders> = ({
	data,
	isLoading,
	title = false,
	take = 4,
	viewAllButton = false,
}) => {
	return (
		<>
			{title && (
				<>
					<Typography.Title level={4}>Ваши заявки</Typography.Title>
					<Typography.Paragraph>
						Здесь собраны последние заявки, которые вы отправляли по этому
						товару, все остальные вы можете посмотреть{' '}
						<Link href="/me">здесь</Link>
					</Typography.Paragraph>

					<Divider />
				</>
			)}

			{isLoading ? (
				<Skeleton active />
			) : data.length ? (
				<>
					<Row gutter={[16, 16]}>
						{data &&
							data.splice(0, take).map((order) => (
								<Col lg={24} xxl={12} key={order.id}>
									<Card
										size="small"
										title={
											<Row justify={'space-between'}>
												<Text strong>Заявка №{order.id}</Text>{' '}
												<OrderTags status={order.status} />
											</Row>
										}
										bordered={false}
									>
										<Text type="secondary">
											{dayjs(order.createdAt).format('DD.MM.YY HH:mm')}
										</Text>
										<br />
										<Text strong>Цена: {order.price}</Text>
									</Card>
								</Col>
							))}
					</Row>
					{viewAllButton && (
						<Row justify="center" style={{ padding: 20 }}>
							<Link href="/me/orders-for-update">Смотреть все</Link>
						</Row>
					)}
				</>
			) : (
				<Empty
					description={
						'Вы еще не отправляли заявок – а может быть оно и к лучшему?'
					}
				/>
			)}
		</>
	)
}

export default OrderForUpdatePriceOrders
