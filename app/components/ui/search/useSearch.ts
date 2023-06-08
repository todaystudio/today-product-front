import useDebounce from '@hooks/useDebounce'
import { IProductReturn } from '@services/products/products.interface'
import { ProductService } from '@services/products/products.service'
import { message } from 'antd'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { ISearchElement } from './search.interface'

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [options, setOptions] = useState([])
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['search header', debouncedSearch],
		() => ProductService.getAll({ searchTerm: debouncedSearch, perPage: 10 }),
		{
			select: ({ data }): ISearchElement[] =>
				data.map((product: IProductReturn) => ({
					title: product.title,
					slug: product.slug,
					lastPrice: product.lastPrice,
					percentToLastPrice: product.percentToLastPrice,
					category: product?.category?.title,
					imagePath: product?.imagePath,
				})),
			onError: () => message.error('Ошибка при поиске 😒'),
		}
	)

	const handleSearch = (value: string) => {
		setSearchTerm(value)
	}

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
		}),
		[queryData, searchTerm]
	)
}
