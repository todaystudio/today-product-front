import { SendOutlined } from '@ant-design/icons'
import { useAuth } from '@hooks/useAuth'
import { AuthService } from '@services/auth/auth.service'
import { IUserState } from '@store/user/user.interface'
import { Button, Result, Spin, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const { Paragraph, Text } = Typography

const VerifyEmail: FC = () => {
	const router = useRouter()
	const token = String(router.query.token)
	const { user } = useAuth()
	const [currentUser, setCurrentUser] = useState<IUserState | null>(null)

	useEffect(() => {
		setCurrentUser(user)
	}, [user])

	const { isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
		['verify email', token],
		() => {
			if (token) AuthService.verifyEmail(token)
		},
		{
			enabled: !!token,
		}
	)
	if (isLoading || isFetching) return <Spin />
	if (isError)
		return (
			<Result
				status="error"
				title={`Почему-то не подтвердили`}
				subTitle="Пожалуйста, войдите в личный кабинет и запросите отправку письма еще раз"
				extra={[
					<div key="56">
						{currentUser ? (
							<Button
								key="tome"
								type="link"
								onClick={() => router.replace('/me')}
							>
								В личный кабинет
							</Button>
						) : (
							<Button
								key="toauth"
								type="link"
								onClick={() => router.replace('/auth/login')}
							>
								Войти
							</Button>
						)}
					</div>,
				]}
			>
				<div className="desc">
					<Paragraph>
						<Text
							strong
							style={{
								fontSize: 16,
							}}
						>
							Если проблема не решилась, то попробуйте:
						</Text>
					</Paragraph>
					<Paragraph>
						<SendOutlined /> Связаться с нами по почте{' '}
						<Link href="mailto:todaystudiooo@gmail.com">
							todaystudiooo@gmail.com &gt;
						</Link>
					</Paragraph>
					<Paragraph>
						<SendOutlined /> или в{' '}
						<Link href="https://t.me/todaystudio_web">Telegram &gt;</Link>
					</Paragraph>
				</div>
			</Result>
		)
	return (
		<Result
			status="success"
			title="Email подтвержден"
			subTitle={`Круто, теперь ты подтвержденная личность. Так держать!`}
			extra={[
				<Button key="0" type="primary" onClick={() => router.replace('/')}>
					На главную
				</Button>,
				<div key="34">
					{currentUser ? (
						<Button key="1" type="link" onClick={() => router.replace('/me')}>
							В личный кабинет
						</Button>
					) : (
						<Button
							key="2"
							type="link"
							onClick={() => router.replace('/auth/login')}
						>
							Войти
						</Button>
					)}
				</div>,
			]}
		/>
	)
}

export default VerifyEmail
