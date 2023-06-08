import { useAuth } from '@hooks/useAuth'
import { UserService } from '@services/user/user.service'
import { message, notification } from 'antd'
import { useEffect, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'

export const useMe = () => {
	const { user } = useAuth()

	useEffect(() => {
		getProfile.refetch()
	}, [user])

	const getProfile = useQuery(
		'get profile info',
		() => {
			if (!user) return
			return UserService.getProfileInfoByEmail(user?.email)
		},
		{
			enabled: !user,
			select: (data) => data?.data,
			onError: () => message.error('Данные о пользователе не загружены'),
		}
	)

	const {
		mutateAsync: sendEmail,
		isLoading: isLoadingSend,
		isSuccess: isSuccessSend,
		isError: isErrorSend,
	} = useMutation(
		'send confirm email',
		(email: string) => UserService.sendConfirmEmail(email),
		{
			onError(error) {
				notification.error({
					message: 'Письмо не отправили 🤷🏻‍♂️',
				})
			},
			onSuccess() {
				message.success('Мы уже отправили письмо')
			},
		}
	)

	return useMemo(
		() => ({
			getProfile,
			sendEmail,
			isLoadingSend,
			isSuccessSend,
			isErrorSend,
		}),
		[getProfile, sendEmail, isLoadingSend, isSuccessSend, isErrorSend]
	)
}
