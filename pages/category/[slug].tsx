import Catalog from '@components/ui/catalog/Catalog'
import { ICategory } from '@services/categories/categories.interface'
import { CategoriesService } from '@services/categories/categories.service'
import { IProductReturn } from '@services/products/products.interface'
import { ProductService } from '@services/products/products.service'
import Meta from '@utils/meta/Meta'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

interface ICategoryPage {
	category: ICategory
	products: IProductReturn[] | undefined
}

const CategoryPage: NextPage<ICategoryPage> = ({ category, products }) => {
	return (
		<>
			<Meta
				title={`${
					category.title ? category.title : 'Все товары'
				} – цены на товары в России сегодня`}
				description={category.description}
			>
				<Catalog
					category={category}
					title={category.title}
					description={category.description}
					products={products || []}
				/>
			</Meta>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: categories } = await CategoriesService.getAll()
		const paths = categories.map((p) => ({
			params: { slug: p.slug },
		}))

		return { paths, fallback: 'blocking' }
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: category } = await CategoriesService.getBySlug(
			String(params?.slug)
		)
		const { data: products } = await ProductService.getByCategorySlug(
			category?.slug
		)
		return {
			props: { category, products },
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default CategoryPage
