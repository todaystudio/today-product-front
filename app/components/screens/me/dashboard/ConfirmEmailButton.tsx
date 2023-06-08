import {
	CheckOutlined,
	CloseCircleOutlined,
	LoadingOutlined,
	WarningFilled,
} from '@ant-design/icons'
import { useAuth } from '@hooks/useAuth'
import { Button } from 'antd'
import { FC, useState } from 'react'
import { useMe } from '../useMe'

const ConfirmEmailButton: FC = () => {
	const [clicked, setClicked] = useState<boolean>(false)
	const { user } = useAuth()
	const { sendEmail, isLoadingSend, isSuccessSend, isErrorSend } = useMe()

	if (!user) return null

	if (isErrorSend)
		return (
			<Button
				onClick={() => sendEmail(user.email)}
				type="link"
				icon={<CloseCircleOutlined color="#f5222d" />}
			>
				Попробуйте еще раз
			</Button>
		)

	if (isSuccessSend)
		return (
			<Button disabled type="link" icon={<CheckOutlined />} color="#52c41a">
				Проверьте почту
			</Button>
		)

	return (
		<Button
			onClick={() => sendEmail(user.email)}
			type="link"
			color="#faad14"
			loading={isLoadingSend}
			icon={
				isLoadingSend ? (
					<LoadingOutlined spin />
				) : (
					<WarningFilled color="#faad14" />
				)
			}
		>
			{isLoadingSend ? 'Отправляем' : 'Подтвердить email'}
		</Button>
	)
}

export default ConfirmEmailButton
