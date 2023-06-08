import { useActions } from '@hooks/useActions'
import { IUserProfile } from '@services/user/user.interface'
import { UserService } from '@services/user/user.service'
import { message, notification } from 'antd'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'

export const useEditProfile = () => {
	const { replace } = useRouter()
	const { logout } = useActions()

	const {
		data: profileData,
		isLoading: isLoadingProfile,
		refetch,
	} = useQuery('get edit profile', () => UserService.getProfileInfoCurrent(), {
		select: ({ data }) => ({
			name: data.name,
		}),
		onError: () => message.error('Произошла ошибка'),
	})

	const { mutateAsync: updateName, isLoading: isLoadingName } = useMutation(
		'update user name',
		(data: Partial<IUserProfile>) => UserService.update(data),
		{
			onError: () => {
				notification.error({ message: 'Не удалось изменить данные' })
			},
			onSuccess: () => {
				notification.success({
					message: 'Данные изменены',
				})
				replace('/me')
				refetch()
			},
		}
	)

	const { mutateAsync: changePassword, isLoading: isLoadingPassword } =
		useMutation(
			'change user password',
			(password: string) => UserService.changePassword(password),
			{
				onError: () => {
					notification.error({ message: 'Не удалось обновить пароль' })
				},
				onSuccess: () => {
					notification.success({
						message: 'Пароль изменен',
						description:
							'Через 5 секунд вы будете перенаправлены на страницу входа',
					})
					setTimeout(() => logout(), 5000)
				},
			}
		)

	const updateNameHandler = (data: Partial<IUserProfile>) => {
		updateName(data)
	}

	const changePasswordHandler = ({
		password,
		passwordConfirm,
	}: {
		password: string
		passwordConfirm: string
	}) => {
		changePassword(password)
	}

	return useMemo(
		() => ({
			profileData,
			isLoadingProfile,
			isLoadingName,
			isLoadingPassword,
			updateNameHandler,
			changePasswordHandler,
		}),
		[
			profileData,
			isLoadingProfile,
			isLoadingName,
			isLoadingPassword,
			updateNameHandler,
			changePasswordHandler,
		]
	)
}
