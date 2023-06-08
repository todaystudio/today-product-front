export interface ISearchProduct {
	searchTerm?: string
	sort?: EnumProductSort
	page?: number
	perPage?: number
}

export enum EnumProductSort {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest',
}

export interface IProductReturn {
	title: string
	slug: string
	description: string
	id: number
	category: ICategoryProduct
	author: IAuthorProduct
	imagePath: string
	lastPriceDate: string
	percentToLastPrice: number
	price: IPriceProduct[]
	toLastPrice: number
	weight: number
	lastPrice: number
	Barcode: any[]
	parseUrl: string[]
}

export interface ICategoryProduct {
	slug: string
	title: string
	id: number
	icon: string
}

export interface IAuthorProduct {
	id: number
	name: string
	avatarPath: string
}

export interface IPriceProduct {
	id: number
	createdAt: string
	updatedAt: string
	productId: number
	price: number
	shopId: number
}

export interface IPriceWithShop {
	id: number
	createdAt: string
	price: number
	shop?: IShop
}

export interface IShop {
	id: number
	createdAt: string
	updatedAt: string
	title: string
	slug: string
	logoPath: string
	website: string
}

export interface IBarcode {
	code: string
	id: number
	productId: number
}

export interface IForecast {
	date: string | Date
	category?: 'forecast' | 'history' | string
	price: number
}

export interface IProductStatistics {
	mode: number[]
	median: number
	mean: number
	forecast: IForecast[]
	dataForChart: IForecast[]
}
