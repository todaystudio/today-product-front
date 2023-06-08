import { IUserProfile } from '@services/user/user.interface'
import { UserService } from '@services/user/user.service'
import { message } from 'antd'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'

export const useTelegramDashboard = (profileInfo: IUserProfile) => {
	const { telegramId } = profileInfo
	const router = useRouter()

	const {
		data: inviteLink,
		isLoading: loadingInviteLink,
		isError: errorInviteLink,
	} = useQuery('get invite link tg', () => UserService.getInviteLinkTg(), {
		select: ({ data }) => data.link,
		onError: () => message.error('Ошибка с Телеграмом'),
	})

	const replaceToBot = () => {
		if (inviteLink) {
			router.replace(inviteLink)
		}
	}

	const {
		mutateAsync: toggleSubscribe,
		data: isSubscribe,
		isLoading: isLoadingSubscribe,
	} = useMutation('toggle subscribe', () => UserService.toggleSubscribe(), {})

	const toggleHandler = () => toggleSubscribe()

	return useMemo(
		() => ({
			inviteLink,
			loadingInviteLink,
			errorInviteLink,
			replaceToBot,
			isSubscribe,
			isLoadingSubscribe,
			toggleHandler,
		}),
		[
			inviteLink,
			loadingInviteLink,
			errorInviteLink,
			replaceToBot,
			isSubscribe,
			isLoadingSubscribe,
			toggleHandler,
		]
	)
}
