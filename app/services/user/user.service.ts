import { getAuthUrl, getSubscribeUrl, getUsersUrl } from '@config/api.config'
import instance from 'api/interceptors'
import { ISubscribers, IUserProfile } from './user.interface'

export const UserService = {
	async getProfileInfoById(id: number) {
		return await instance.get<IUserProfile>(getUsersUrl(`/by-id/${id}`))
	},

	async getProfileInfoCurrent() {
		return await instance.get<IUserProfile>(getUsersUrl(`/profile-info`))
	},

	async getProfileInfoByEmail(email: string) {
		return await instance.post<IUserProfile>(getUsersUrl(`/by-email`), {
			email,
		})
	},

	async sendConfirmEmail(email: string) {
		return await instance.post<IUserProfile>(getAuthUrl('/verify-email/send'), {
			email,
		})
	},

	async update(data: Partial<IUserProfile>) {
		return await instance.patch<IUserProfile>(getUsersUrl('/update'), {
			...data,
		})
	},

	async changePassword(password: string) {
		return await instance.patch<IUserProfile>(getUsersUrl('/change-password'), {
			password,
		})
	},

	async getInviteLinkTg() {
		return await instance.get<{ link: string }>(getSubscribeUrl('/create-link'))
	},

	async toggleSubscribe() {
		return await instance.get<ISubscribers>(getSubscribeUrl('/toggle-mailing'))
	},
}
