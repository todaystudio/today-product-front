import {
	DashboardOutlined,
	LoginOutlined,
	LogoutOutlined,
	PlusOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { useActions } from '@hooks/useActions'
import { useAuth } from '@hooks/useAuth'
import { Avatar, Badge, Dropdown, MenuProps } from 'antd'
import Link from 'next/link'
import { FC, useEffect } from 'react'

const UserAvatar: FC = () => {
	const { user, isLoading } = useAuth()
	const { logout } = useActions()

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<Link rel="noopener noreferrer" href="/me">
					{user?.email}
				</Link>
			),
		},

		{
			key: '3',
			label: (
				<Link rel="noopener noreferrer" href="/ticket/new">
					Заявка на новый товар
				</Link>
			),
			icon: <PlusOutlined />,
		},
		{
			key: '4',
			danger: true,
			icon: <LogoutOutlined />,
			label: 'Выйти',
			onClick: logout,
		},
	]

	if (!user)
		return (
			<Link href="/auth/login" style={{ color: '#000' }}>
				Войти <LoginOutlined />
			</Link>
		)

	return (
		<Dropdown menu={{ items }} placement="bottomRight" arrow>
			<Badge dot>
				<Avatar size={'large'} shape="square" icon={<UserOutlined />} />
			</Badge>
		</Dropdown>
	)
}

export default UserAvatar
