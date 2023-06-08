import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface IGoBackButton {
	text?: string
	href?: string
}

const GoBackButton: FC<IGoBackButton> = ({ href, text }) => {
	const router = useRouter()

	const goNavigation = () => {
		if (href) return router.replace(href)
		else return router.back()
	}

	return (
		<Button
			// style={{ margin: '20px 0' }}
			type="link"
			ghost
			onClick={goNavigation}
		>
			<ArrowLeftOutlined /> Назад
		</Button>
	)
}

export default GoBackButton
