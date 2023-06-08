import { getCategoryUrl } from '@config/url.config'
import { Drawer, List } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './CatalogButton.module.scss'
import { useCatalogButton } from './useCatalogButton'

const CatalogDrawer: FC<{ onClose: () => void; open: boolean }> = ({
	onClose,
	open,
}) => {
	const { isLoading, data } = useCatalogButton()
	return (
		<Drawer title="Каталог" placement="left" onClose={onClose} open={open}>
			<List
				size="default"
				loading={isLoading}
				dataSource={data}
				className={styles.list}
				renderItem={(category) => (
					<List.Item onClick={onClose}>
						<Link
							className={styles.drawerLink}
							href={getCategoryUrl(category.slug)}
						>
							<Image
								src={category.icon}
								alt={category.title}
								width={40}
								height={40}
							/>
							<span>{category.title}</span>
						</Link>
					</List.Item>
				)}
			/>
		</Drawer>
		// </div>
	)
}

export default CatalogDrawer
