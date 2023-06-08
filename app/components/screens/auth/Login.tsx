import { useActions } from '@hooks/useActions'
import { useAuth } from '@hooks/useAuth'
import { useAuthRedirect } from '@hooks/useAuthRedirect'
import Meta from '@utils/meta/Meta'
import { Button, Form, Input, Row, Typography } from 'antd'
import Link from 'next/link'
import { FC } from 'react'
import { ILoginInput } from './auth.interface'
import styles from './auth.module.scss'

const { Title } = Typography

const Login: FC = () => {
	useAuthRedirect()
	const { login } = useActions()
	const [form] = Form.useForm()
	const { isLoading } = useAuth()

	const onSubmit = async (data: ILoginInput) => {
		login(data)
	}
	return (
		<Meta title="Вход в Today Product">
			<div className={styles.wrapper}>
				<Title level={3}>Авторизация</Title>
				<Form form={form} name="basic" layout="vertical" onFinish={onSubmit}>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								type: 'email',
								message: 'Email должен быть корректным',
							},
							{
								required: true,
								message: 'Нужно ввести email',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Пароль"
						name="password"
						rules={[{ required: true, message: 'Введите пароль' }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item className={styles.authButton}>
						<Button loading={isLoading} type="primary" htmlType="submit">
							Войти
						</Button>
					</Form.Item>
				</Form>

				<Row justify={'space-between'}>
					<Typography.Text>
						Еще нет аккаунта?{' '}
						<Link href="/auth/register">Зарегистрироваться</Link>
					</Typography.Text>
					<Typography.Text type="secondary">
						<Link href="/auth/resetPassword">Забыли пароль?</Link>
					</Typography.Text>
				</Row>
			</div>
		</Meta>
	)
}

export default Login
