import PriceDisplay from '@components/ui/price-display/PriceDisplay'
import {
	getCategoryEditUrl,
	getProductEditUrl,
	getUserEditUrl,
} from '@config/url.config'
import Meta from '@utils/meta/Meta'
import { Col, Divider, Input, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { FC } from 'react'
import { IProductReturn } from '../../../../services/products/products.interface'
import { useManageProducts } from './useManageProduct'

const ProductsManage: FC = () => {
	const { data, isLoading, handleSearch } = useManageProducts()

	const color = (count: number) => (count > 0 ? 'default' : 'red')

	const columns: ColumnsType<IProductReturn> = [
		{
			key: '1',
			dataIndex: 'title',
			title: 'Наименование',
			render: (_, { title, id, category }) => (
				<>
					<Typography.Link type="secondary" style={{ display: 'block' }}>
						<Link
							style={{ color: 'inherit' }}
							href={getCategoryEditUrl(category.id)}
						>
							{category.title}
						</Link>
					</Typography.Link>
					<Link href={getProductEditUrl(id)}>{title}</Link>
				</>
			),
		},
		{
			key: '2',
			title: 'Автор',
			dataIndex: 'author',
			render: (_, { author }) => (
				<Link href={getUserEditUrl(author.id)}>{author.name}</Link>
			),
		},
		{
			key: '3',
			title: 'Цены',
			dataIndex: 'price',
			render: (_, { toLastPrice, percentToLastPrice, lastPrice, price }) => (
				<div style={{ textAlign: 'center' }}>
					<PriceDisplay
						lastPrice={lastPrice}
						percentToLastPrice={percentToLastPrice}
						toLastPrice={toLastPrice}
						size="xs"
						align="center"
					/>
					<div style={{ color: '#ccc', fontSize: 11 }}>
						Всего: {price.length}
					</div>
				</div>
			),
		},
		{
			key: '4',
			dataIndex: '',
			render: (_, { Barcode, parseUrl }) => (
				<>
					<Col style={{ marginBottom: 5 }}>
						<Tag color={color(Barcode.length)}>Штрихкоды: {Barcode.length}</Tag>
					</Col>
					<Col>
						<Tag color={color(parseUrl.length)}>Ссылки: {parseUrl.length}</Tag>
					</Col>
				</>
			),
		},
	]

	return (
		<Meta title="Управление товарами">
			<div>
				<Typography.Title level={1}>Товары</Typography.Title>
				<Divider />
			</div>
			<Input
				placeholder="Я ищу..."
				onChange={(e) => handleSearch(e.target.value)}
			/>
			<Table loading={isLoading} columns={columns} dataSource={data} />
		</Meta>
	)
}

export default ProductsManage
