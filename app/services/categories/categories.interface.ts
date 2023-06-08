export type CategoryGetAll = ICategory[]

export interface ICategory {
	id: number
	title: string
	slug: string
	description: string
	createdAt: string
	icon: string
	_count: ICategoryCountProduct
}

export interface ICategoryCountProduct {
	Product: number
}
