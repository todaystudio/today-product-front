import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '@services/auth/auth.service'
import { message, notification } from 'antd'
import { errorCatch } from 'api/api.helpers'
import {
	IAuthResponse,
	IEmailPassword,
	IEmailPasswordName,
} from './user.interface'

export const register = createAsyncThunk<IAuthResponse, IEmailPasswordName>(
	'auth/register',
	async ({ email, password, name }, thunkApi) => {
		try {
			const response = await AuthService.register(email, password, name)
			message.success('Регистрация прошла успешно')
			return response.data
		} catch (error) {
			message.error(errorCatch(error))
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.login(email, password)
			message.success('Вы авторизованы')
			return response.data
		} catch (error) {
			message.error(errorCatch(error))
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	await AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				notification.error({
					message: 'Сессия окончена',
					description: 'Нужно авторизоваться заново',
				})
			}
			thunkApi.dispatch(logout())
			return thunkApi.rejectWithValue(error)
		}
	}
)
