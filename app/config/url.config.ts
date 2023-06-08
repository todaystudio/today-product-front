// export const getMovieUrl = (slug: string) => `/movie/${slug}`
// export const getGenreUrl = (slug: string) => `/genre/${slug}`

export const getAdminUrl = (url: string) => `/manage/${url}`
export const getAdminHomeUrl = () => getAdminUrl('').slice(0, -1)
export const getCategoryUrl = (slug: string) => `/category/${slug}`
export const getProductUrl = (slug: string) => `/product/${slug}`
export const getOFUPUrl = (slug: string) => `/order-for-update-price/${slug}`

export const getProductEditUrl = (id: string | number) =>
	`/manage/edit/product/${String(id)}`
export const getCategoryEditUrl = (id: string | number) =>
	`/manage/edit/category/${String(id)}`
export const getUserEditUrl = (id: string | number) =>
	`/manage/edit/user/${String(id)}`
