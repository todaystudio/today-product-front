import { IProductReturn } from '@services/products/products.interface'
import { Empty, Skeleton, Typography } from 'antd'
import { FC } from 'react'
import Catalog from '../catalog/Catalog'
import { useSimilarProduct } from './useSimilarProduct'

interface ISimilarProduct {
	product: IProductReturn
}

const SimilarProduct: FC<ISimilarProduct> = ({ product }) => {
	const { data, isLoading } = useSimilarProduct(product)
	return (
		<>
			<Typography.Title level={3}>Похожие товары</Typography.Title>
			{isLoading ? (
				<Skeleton active />
			) : data?.length ? (
				<Catalog products={data || []} alone={true} />
			) : (
				<Empty />
			)}
		</>
	)
}

export default SimilarProduct
