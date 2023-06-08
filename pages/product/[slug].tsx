import SingleProduct from '@components/screens/single-product/SingleProduct'
import {
	IProductReturn,
	IProductStatistics,
} from '@services/products/products.interface'
import { ProductService } from '@services/products/products.service'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

interface IProductPage {
	product: IProductReturn
	statistics: IProductStatistics
}

const ProductPage: NextPage<IProductPage> = ({ product, statistics }) => {
	return <SingleProduct product={product} statistics={statistics} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: products } = await ProductService.getAll({})
		const paths = products.map((p) => ({
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
		const { data: product } = await ProductService.getBySlug(
			String(params?.slug)
		)
		const { data: statistics } = await ProductService.getStatistics(product.id)
		return {
			props: { product, statistics },
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default ProductPage
