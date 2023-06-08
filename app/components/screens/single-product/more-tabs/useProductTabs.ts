import { IProductReturn } from '@services/products/products.interface'
import { ProductService } from '@services/products/products.service'
import { useQuery } from 'react-query'

export const useProductTabs = (product: IProductReturn) => {
	const queryData = useQuery(
		'get shop for history',
		() => ProductService.getPriceHistory(product.id),
		{
			select: ({ data }) => data,
		}
	)

	const queryBarcode = useQuery(
		'get barcodes for single',
		() => ProductService.getBarcodeById(product.id),
		{
			select: ({ data }) => data,
		}
	)

	return { priceHistory: { ...queryData }, barcodes: { ...queryBarcode } }
}
