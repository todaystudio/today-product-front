import Catalog from '@components/ui/catalog/Catalog'
import { ICategory } from '@services/categories/categories.interface'
import { IProductReturn } from '@services/products/products.interface'
import Meta from '@utils/meta/Meta'
import { Divider, Typography } from 'antd'
import { FC } from 'react'
import CategoryMenu from './CategoryMenu'

const { Title, Paragraph } = Typography

interface ICatalogScreen {
	products: IProductReturn[]
	categories: ICategory[]
}

const CatalogScreen: FC<ICatalogScreen> = ({ products, categories }) => {
	return (
		<>
			<Meta title="Каталог цен на товары в России">
				<Typography.Title level={1} title="Каталог всех">
					Каталог
				</Typography.Title>

				<Paragraph>Цены товары в России 2023</Paragraph>
				<Divider />

				<CategoryMenu categories={categories} />
				<Catalog products={products} />
			</Meta>
		</>
	)
}

export default CatalogScreen
