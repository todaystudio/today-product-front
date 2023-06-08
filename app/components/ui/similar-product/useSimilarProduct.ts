import { IProductReturn } from '@services/products/products.interface'
import { ProductService } from '@services/products/products.service'
import { useQuery } from 'react-query'

export const useSimilarProduct = (product: IProductReturn) => {
	const { data, isLoading } = useQuery(
		'get similar',
		() => ProductService.getSimilar(product.id),
		{
			select: ({ data }) => data,
		}
	)

	return { data, isLoading }
}
