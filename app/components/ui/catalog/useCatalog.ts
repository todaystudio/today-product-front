import { IProductReturn } from '@services/products/products.interface'
import { ProductService } from '@services/products/products.service'
import { useState } from 'react'
import { useQuery } from 'react-query'

export const useCatalog = (
	categorySlug: string,
	initialData: IProductReturn[]
) => {
	const [page, setPage] = useState<number>(1)

	const queryData = useQuery(
		['get product catalog', page],
		() => ProductService.getByCategorySlug(categorySlug),
		{
			enabled: false,
		}
	)

	return { ...queryData, page, setPage }
}
