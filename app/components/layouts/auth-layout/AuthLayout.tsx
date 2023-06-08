import { Layout, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'
import logo from '../../../assets/logos/logo-dark.svg'
import styles from './AuthLayout.module.scss'

const { Header, Footer, Content } = Layout

const AuthLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Layout>
				<Header>
					<Link href={'/'} className={styles.logo}>
						<Image alt="Today Product logo" src={logo} width={300} />
					</Link>
				</Header>
				<Content>
					<div className={styles.children}>{children}</div>
				</Content>
				<Footer>
					<Typography.Text type="secondary">
						<b>TodayProduct</b> by Evgeny Rassadkin &copy; 2023
					</Typography.Text>
					<br />
					<Typography.Text type="secondary">
						Вся представленная информация на сайте получена из открытых
						источников и не является публичной офертой.{' '}
					</Typography.Text>
				</Footer>
			</Layout>
		</div>
	)
}

export default AuthLayout
