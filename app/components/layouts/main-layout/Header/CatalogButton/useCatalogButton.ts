import { CategoriesService } from '@services/categories/categories.service'
import { useQuery } from 'react-query'

export const useCatalogButton = () => {
	const queryData = useQuery(
		'get categories button',
		() => CategoriesService.getAll(),
		{
			select: ({ data }) =>
				data.map((category) => ({
					title: category.title,
					slug: category.slug,
					description: category.description,
					icon: category.icon,
				})),
		}
	)

	return queryData
}
