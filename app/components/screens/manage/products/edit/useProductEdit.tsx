import { CategoriesService } from '@services/categories/categories.service'
import { IProductReturn } from '@services/products/products.interface'
import { ProductService } from '@services/products/products.service'
import { FormInstance, message } from 'antd'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useProductEdit = (form: FormInstance<keyof IProductReturn>) => {
	const { push, query } = useRouter()

	const productId = String(query.id)

	const { isLoading: isLoadingProduct } = useQuery(
		['product edit', productId],
		() => ProductService.getById(productId),
		{
			onSuccess: ({ data }) => {
				form.setFieldsValue({
					...data,
					category: data.category.id,
					author: data.author.name,
				})
			},
			onError(error) {
				message.error('Произошла ошибка')
			},
			enabled: !!query.id,
		}
	)

	const { data: categories, isLoading: isLoadingCategories } = useQuery(
		'get category product edit',
		() => CategoriesService.getAll(),
		{
			select: ({ data }) => data.map((i) => ({ value: i.id, label: i.title })),
		}
	)

	return { isLoadingProduct, categories, isLoadingCategories }
}
