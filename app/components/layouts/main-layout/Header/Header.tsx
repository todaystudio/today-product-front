import Search from '@components/ui/search/Search'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import styles from '../MainLayout.module.scss'
import CatalogButton from './CatalogButton/CatalogButton'
import Logo from './Logo'

const DynamicUserAvatar = dynamic(() => import('./UserAvatar/UserAvatar'), {
	ssr: false,
})

const Header: FC = () => {
	return (
		<div className={styles.header}>
			<div className={styles.left}>
				<Logo />
				<CatalogButton />
			</div>
			<div className={styles.search}>
				<Search />
			</div>
			<div className={styles.right}>
				<DynamicUserAvatar />
			</div>
		</div>
	)
}

export default Header
