import { useActions } from '@hooks/useActions'
import { useAuth } from '@hooks/useAuth'
import { useAuthRedirect } from '@hooks/useAuthRedirect'
import Meta from '@utils/meta/Meta'
import { Button, Checkbox, Form, Input, Row, Typography } from 'antd'
import Link from 'next/link'
import { FC } from 'react'
import { IRegisterInput } from './auth.interface'
import styles from './auth.module.scss'

const { Title } = Typography

const Register: FC = () => {
	useAuthRedirect()

	const { register } = useActions()
	const [form] = Form.useForm()
	const { isLoading } = useAuth()

	const onSubmit = async (data: IRegisterInput) => {
		const { email, name, password } = data
		register({ email, name, password })
	}

	return (
		<Meta title="Регистрация в Today Product">
			<div className={styles.wrapper}>
				<Title level={3}>Регистрация</Title>
				<Form name="basic" layout="vertical" onFinish={onSubmit} form={form}>
					<Form.Item
						label="Имя"
						name="name"
						tooltip="Имя (или ник) будет использовано только на сайте. Можете придумать любое"
						rules={[{ required: true, message: 'Введите ваше имя' }]}
					>
						<Input />
					</Form.Item>

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
						rules={[
							{ required: true, message: 'Введите пароль' },
							{ min: 8, message: 'Пароль должен быть больше 8 символов' },
						]}
						hasFeedback
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						label="Еще раз пароль"
						name="passwordConfirm"
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your password!',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve()
									}
									return Promise.reject(new Error('Пароли не совпадают'))
								},
							}),
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="privacy"
						valuePropName="checked"
						rules={[
							{
								validator: (_, value) =>
									value
										? Promise.resolve()
										: Promise.reject(new Error('Нужно поставить флажок')),
							},
						]}
					>
						<Checkbox>
							Даю{' '}
							<Link href="/privacy">
								согласие на обработку персональных данных
							</Link>
							. Согласен с{' '}
							<Link href="/terms">правилами пользования сайтом</Link>.
						</Checkbox>
					</Form.Item>

					<Form.Item className={styles.authButton}>
						<Button loading={isLoading} type="primary" htmlType="submit">
							Зарегистрироваться
						</Button>
					</Form.Item>
				</Form>

				<Row justify={'space-between'}>
					<Typography.Text>
						Уже есть аккаунт? <Link href="/auth/login">Войти</Link>
					</Typography.Text>
					<Typography.Text type="secondary">
						<Link href="/auth/resetPassword">Забыли пароль?</Link>
					</Typography.Text>
				</Row>
			</div>
		</Meta>
	)
}

export default Register
