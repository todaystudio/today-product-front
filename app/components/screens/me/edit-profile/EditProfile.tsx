import GoBackButton from '@components/ui/buttons/GoBackButton'
import { Button, Col, Divider, Form, Input, Spin, Typography } from 'antd'
import { FC } from 'react'
import { useEditProfile } from './useEditProfile'

const EditProfile: FC = () => {
	const {
		isLoadingProfile,
		profileData,
		changePasswordHandler,
		isLoadingName,
		isLoadingPassword,
		updateNameHandler,
	} = useEditProfile()

	const [formName] = Form.useForm()
	const [formPass] = Form.useForm()

	return (
		<div>
			<GoBackButton />
			<Typography.Title level={1}>Изменить профиль</Typography.Title>
			<Divider />

			{isLoadingProfile && <Spin />}

			{profileData ? (
				<Col span={16}>
					<Form
						wrapperCol={{ flex: 1 }}
						labelCol={{ span: 6 }}
						labelWrap
						labelAlign="left"
						form={formName}
						onFinish={updateNameHandler}
						initialValues={profileData}
					>
						<Form.Item
							label="Имя"
							name="name"
							rules={[{ required: true, message: 'Имя не может быть пустым' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item>
							<Button loading={isLoadingName} htmlType="submit" type="default">
								Изменить данные
							</Button>
						</Form.Item>
					</Form>

					<Divider orientation="left">Изменить пароль</Divider>
					<Form
						wrapperCol={{ flex: 1 }}
						labelCol={{ span: 6 }}
						labelWrap
						labelAlign="left"
						form={formPass}
						onFinish={changePasswordHandler}
						initialValues={profileData}
					>
						<Form.Item
							label="Пароль"
							name="password"
							rules={[
								{
									required: true,
									message: 'Введите пароль',
								},
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
									message: 'Подтвердите пароль',
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

						<Form.Item>
							<Button
								loading={isLoadingPassword}
								htmlType="submit"
								type="primary"
							>
								Изменить пароль
							</Button>
						</Form.Item>
					</Form>
				</Col>
			) : null}
		</div>
	)
}

export default EditProfile
