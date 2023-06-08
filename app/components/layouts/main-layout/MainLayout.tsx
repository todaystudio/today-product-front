import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import './MainLayout.module.scss'
const { Content } = Layout

const MainLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { asPath } = useRouter()
	if (asPath.includes('auth')) return <div>{children}</div>
	return (
		<Layout>
			<Row justify={'center'}>
				<Col span={20}>
					<Header />
				</Col>
			</Row>
			<Row justify={'center'}>
				<Col span={20}>
					<Content>{children}</Content>
				</Col>
			</Row>
			<Row justify={'center'}>
				<Col span={20}>
					<Footer />
				</Col>
			</Row>
		</Layout>
	)
}

export default MainLayout
