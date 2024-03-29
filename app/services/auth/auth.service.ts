import { getAuthUrl } from '@config/api.config'
import { removeTokensStorage, saveToStorage } from '@services/auth/auth.helper'
import { IAuthResponse } from '@store/user/user.interface'
import Cookies from 'js-cookie'

import { getContentType } from '../../api/api.helpers'
import { axiosClassic } from '../../api/interceptors'

export const AuthService = {
	async register(email: string, password: string, name: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/register'),
			{ email, password, name }
		)
		if (response.data.accessToken) saveToStorage(response.data)
		return response
	},

	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login'),
			{ email, password }
		)
		if (response.data.accessToken) saveToStorage(response.data)
		return response
	},

	logout() {
		removeTokensStorage()
		localStorage.removeItem('user')
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login/access-token'),
			{ refreshToken },
			{ headers: getContentType() }
		)
		if (response.data.accessToken) saveToStorage(response.data)
		return response
	},

	async verifyEmail(token: string) {
		return await axiosClassic.get(
			getAuthUrl(`/verify-email/verify?token=${token}`)
		)
	},
}
