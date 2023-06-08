import AuthLayout from '@components/layouts/auth-layout/AuthLayout'
import Register from '@components/screens/auth/Register'
import { NextPage } from 'next'

const LoginPage: NextPage = () => {
	return (
		<AuthLayout>
			<Register />
		</AuthLayout>
	)
}

export default LoginPage
