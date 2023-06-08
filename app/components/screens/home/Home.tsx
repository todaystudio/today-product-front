import Catalog from '@components/ui/catalog/Catalog'
import { ICategory } from '@services/categories/categories.interface'
import { IProductReturn } from '@services/products/products.interface'
import { FC } from 'react'
import CategoryMenu from '../catalog/CategoryMenu'

interface IHome {
	products: IProductReturn[]
	categories: ICategory[]
}

const Home: FC<IHome> = ({ products, categories }) => {
	return (
		<div>
			<Catalog products={products} title="Актуальное" />
			<CategoryMenu categories={categories} />
		</div>
	)
}

export default Home
