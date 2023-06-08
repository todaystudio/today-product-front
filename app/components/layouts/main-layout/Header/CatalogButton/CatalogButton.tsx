import { MenuOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'
import styles from './CatalogButton.module.scss'
import CatalogDrawer from './CatalogDrawer'

const CatalogButton: FC = () => {
	const [drawer, setDrawer] = useState<boolean>(false)

	const closeDrawer = () => setDrawer(false)
	const openDrawer = () => setDrawer(true)

	return (
		<div className={styles.buttonWrap}>
			<button
				onClick={() => setDrawer((prev) => !prev)}
				className={styles.button}
			>
				<MenuOutlined />
				<span>Каталог</span>
			</button>
			{drawer && <CatalogDrawer onClose={closeDrawer} open={drawer} />}
		</div>
	)
}

export default CatalogButton
