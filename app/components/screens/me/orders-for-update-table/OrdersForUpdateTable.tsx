import GoBackButton from '@components/ui/buttons/GoBackButton'
import OrderTags from '@components/ui/order-tags/OrderTags'
import PriceDisplay from '@components/ui/price-display/PriceDisplay'
import { getProductUrl } from '@config/url.config'
import { IOrderForUpdatePriceReturn } from '@services/orders-for-update-price/orders-for-update-price.interface'
import {
	Button,
	Divider,
	Spin,
	Table,
	TableColumnsType,
	Typography,
} from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC } from 'react'
import { useOFUP } from './useOFUP'

const { Text, Title } = Typography

const OrdersForUpdateTable: FC = () => {
	const { orders, isLoading, deleteHandler, isLoadingDelete } = useOFUP()

	const columns: TableColumnsType<IOrderForUpdatePriceReturn> = [
		{
			title: 'Дата создания',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (date) => (
				<>
					<Text>{dayjs(date).format('DD.MM.YY')}</Text>{' '}
					<Text type="secondary">{dayjs(date).format('HH:mm')}</Text>
				</>
			),
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			render: (text) => <OrderTags status={text} />,
		},
		{
			title: 'Товар',
			dataIndex: 'Product',
			key: 'product',
			render: (_, { Product }) => (
				<Link href={getProductUrl(Product.slug)}>{Product.title}</Link>
			),
		},
		{
			title: 'Цена',
			children: [
				{
					title: 'Ваша',
					dataIndex: 'price',
					key: 'price',
					render: (text) => (
						<>
							<Text strong>{text}₽</Text>
						</>
					),
				},
				{
					title: 'Текущая',
					dataIndex: 'price_current',
					key: 'price_current',
					render: (_, { Product }) => (
						<PriceDisplay
							lastPrice={Product.lastPrice}
							percentToLastPrice={Product.percentToLastPrice}
							toLastPrice={Product.toLastPrice}
							size="xs"
						/>
					),
				},
			],
		},
		{
			render: (_, { id }) => (
				<Button type="link" danger onClick={() => deleteHandler(id)}>
					Удалить
				</Button>
			),
		},
	]

	if (isLoading) return <Spin spinning />
	return (
		<div>
			<GoBackButton />
			<Title level={1}>Заявки на уточнение цены</Title>
			<Divider />
			<Table
				loading={isLoading || isLoadingDelete}
				dataSource={orders}
				columns={columns}
			/>
		</div>
	)
}

export default OrdersForUpdateTable
