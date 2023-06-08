import { CheckOutlined } from '@ant-design/icons'
import { IUserProfile } from '@services/user/user.interface'
import { Button, Switch, Typography } from 'antd'
import { FC } from 'react'
import { useTelegramDashboard } from './useTelegramDashboard'

interface ITelegramDashboard {
	profileInfo: IUserProfile
}

const TelegramDashboard: FC<ITelegramDashboard> = ({ profileInfo }) => {
	const {
		errorInviteLink,
		inviteLink,
		loadingInviteLink,
		replaceToBot,
		toggleHandler,
		isLoadingSubscribe,
		isSubscribe,
	} = useTelegramDashboard(profileInfo)

	return (
		<div>
			<Typography.Title level={4}>Telegram</Typography.Title>
			{!profileInfo.Subscribers && (
				<>
					<Typography.Text>
						Подключите свой Telegram к аккаунту и получайте обновления цен и
						новости в мессенджере
					</Typography.Text>
					<Button
						style={{ display: 'block', margin: '10px 0' }}
						disabled={errorInviteLink}
						loading={loadingInviteLink}
						onClick={replaceToBot}
						type="primary"
					>
						Подключить Telegram
					</Button>
				</>
			)}
			{profileInfo.telegramId && profileInfo.Subscribers ? (
				<>
					<Typography.Text type="success">
						<CheckOutlined /> Аккаунт подключен к Telegram
					</Typography.Text>
					<div style={{ marginTop: 20 }}>
						<Typography.Text>Подписка на рассылку </Typography.Text>
						<Switch
							defaultChecked={profileInfo?.Subscribers.mailing}
							onChange={toggleHandler}
							loading={isLoadingSubscribe}
							checked={isSubscribe?.data.mailing}
						/>
					</div>
				</>
			) : null}
		</div>
	)
}

export default TelegramDashboard
