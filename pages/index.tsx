import Home from '@components/screens/home/Home'
import { ICategory } from '@services/categories/categories.interface'
import { CategoriesService } from '@services/categories/categories.service'
import { IProductReturn } from '@services/products/products.interface'
import { ProductService } from '@services/products/products.service'
import { GetStaticProps, NextPage } from 'next'

interface IHomePage {
	products: IProductReturn[]
	categories: ICategory[]
}

const HomePage: NextPage<IHomePage> = ({ products, categories }) => {
	return (
		<>
			<Home products={products || []} categories={categories} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: products } = await ProductService.getMostDynamic(3)
		const { data: categories } = await CategoriesService.getAll()
		return {
			props: { products, categories },
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default HomePage
