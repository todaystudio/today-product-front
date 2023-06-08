import { ICategory } from '@services/categories/categories.interface'
import { IProductReturn } from '@services/products/products.interface'

export interface ICatalog {
	category?: ICategory
	title?: string
	description?: string
	products: IProductReturn[]
	alone?: boolean
}
