import CatalogScreen from '@components/screens/catalog/CatalogScreen'
import { ICategory } from '@services/categories/categories.interface'
import { CategoriesService } from '@services/categories/categories.service'
import { IProductReturn } from '@services/products/products.interface'
import { ProductService } from '@services/products/products.service'
import { GetStaticProps, NextPage } from 'next'

interface ICatalogPage {
	products: IProductReturn[] | undefined
	categories: ICategory[] | undefined
}

const CatalogPage: NextPage<ICatalogPage> = ({ products, categories }) => {
	return (
		<>
			<CatalogScreen categories={categories || []} products={products || []} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: categories } = await CategoriesService.getAll()
		const { data: products } = await ProductService.getAll()
		return {
			props: { products, categories },
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default CatalogPage
