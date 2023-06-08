import useDebounce from '@hooks/useDebounce'
import { ProductService } from '@services/products/products.service'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

export const useManageProducts = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { data, isLoading } = useQuery(
		['get all manage product', debouncedSearch],
		() => ProductService.getAll({ searchTerm: debouncedSearch, perPage: 30 }),
		{
			select: ({ data }) => data,
		}
	)

	const handleSearch = (value: string) => {
		setSearchTerm(value)
	}

	return useMemo(
		() => ({
			data,
			isLoading,
			handleSearch,
		}),
		[data, isLoading]
	)
}
