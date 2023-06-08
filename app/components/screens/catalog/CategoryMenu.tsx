import { getCategoryUrl } from '@config/url.config'
import { ICategory } from '@services/categories/categories.interface'
import { Col, Row, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './CategoryMenu.module.scss'

const { Title, Text } = Typography

interface ICategoryMenu {
	categories: ICategory[]
}

const CategoryMenu: FC<ICategoryMenu> = ({ categories }) => {
	return (
		<div className={styles.menu}>
			<Row gutter={[22, 22]}>
				{categories.length &&
					categories.map((category) => (
						<Col key={category.id} md={12} lg={8} xxl={6}>
							<Link href={getCategoryUrl(category.slug)}>
								<div className={styles.card} key={category.id}>
									<div className={styles.left}>
										<Image
											src={category.icon}
											width={80}
											height={80}
											alt={category.title}
										/>
									</div>
									<div className={styles.right}>
										<Title level={5}>{category.title}</Title>
										<Text type="secondary">
											Количество товаров: {category._count.Product}
										</Text>
									</div>
								</div>
							</Link>
						</Col>
					))}
			</Row>
		</div>
	)
}

export default CategoryMenu
