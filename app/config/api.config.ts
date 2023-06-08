export const API_URL = `${process.env.APP_URL}/api`

export const getAuthUrl = (string: string) => `/auth${string}`
export const getCategoriesUrl = (string: string) => `/category${string}`
export const getProductsUrl = (string: string) => `/products${string}`
export const getShopsUrl = (string: string) => `/shop${string}`
export const getUsersUrl = (string: string) => `/users${string}`
export const getSubscribeUrl = (string: string) => `/subscribe${string}`
export const getStatisticsUrl = (string: string) => `/statistics${string}`
