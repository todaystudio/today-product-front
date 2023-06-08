import { IProductReturn } from '@services/products/products.interface'
import { Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from '../SingleProduct.module.scss'
import { useProductTabs } from './useProductTabs'

export interface IPriceTable {
	createdAt: Date
	price: number
	shop: {
		title?: string
		slug?: string
		logoPath?: string
	}
}

const PriceHistory: FC<{
	product: IProductReturn
}> = ({ product }) => {
	const {
		priceHistory: { data: shops, isLoading },
	} = useProductTabs(product)

	const columns: ColumnsType<IPriceTable> = [
		{
			key: '1',
			dataIndex: 'createdAt',
			title: 'Дата добавления',
			render: (_, { createdAt }) => (
				<>
					<Typography.Text>
						{dayjs(createdAt).format('DD.MM.YY')}
					</Typography.Text>{' '}
					<Typography.Text type="secondary">
						{dayjs(createdAt).format('HH:mm')}
					</Typography.Text>
				</>
			),
		},
		{
			key: '2',
			dataIndex: 'price',
			title: 'Цена',
			render: (_, { price }) => <Typography.Text>{price}₽</Typography.Text>,
		},
		{
			key: '3',
			dataIndex: 'shop',
			title: 'Магазин',
			render: (_, { shop }) => {
				if (!shop)
					return (
						<Typography.Text type="secondary" key={Math.random()}>
							Магазин не найден
						</Typography.Text>
					)
				return (
					<div key={shop.slug}>
						<Link
							className={styles.priceHistoryLink}
							href={`http://localhost:3000/shops/${shop.slug}`}
						>
							{shop.logoPath && (
								<Image
									src={shop.logoPath}
									width={35}
									height={35}
									style={{ borderRadius: '50%' }}
									alt={shop.title || 'k'}
								/>
							)}
							<span>{shop.title}</span>
						</Link>
					</div>
				)
			},
		},
	]
	return (
		<Table
			columns={columns}
			pagination={false}
			loading={isLoading}
			dataSource={shops}
		/>
	)
}

export default PriceHistory
