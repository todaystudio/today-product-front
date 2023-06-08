import AuthLayout from '@components/layouts/auth-layout/AuthLayout'
import Login from '@components/screens/auth/Login'
import { NextPage } from 'next'

const LoginPage: NextPage = () => {
	return (
		<AuthLayout>
			<Login />
		</AuthLayout>
	)
}

export default LoginPage
