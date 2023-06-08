import { getCategoryUrl, getProductUrl } from '@config/url.config'
import { IProductReturn } from '@services/products/products.interface'
import { Col, Divider } from 'antd'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import PriceDisplay from '../price-display/PriceDisplay'
import styles from './Catalog.module.scss'

const DynamicChart = dynamic(() => import('../price-chart/PriceChart'))

const CatalogCard: FC<IProductReturn> = ({
	title,
	id,
	slug,
	lastPrice,
	percentToLastPrice,
	imagePath,
	weight,
	toLastPrice,
	category,
	price,
}) => {
	return (
		<>
			<Col sm={24} md={12} lg={8} xxl={6} style={{ width: '100%' }}>
				<div className={styles.card}>
					<div className={styles.image}>
						<Image
							alt={title}
							src={imagePath}
							width={400}
							height={200}
							loading="lazy"
							placeholder="blur"
							blurDataURL={imagePath}
						/>
					</div>

					{category.slug && (
						<Link
							className={classNames(styles.weight, styles.category)}
							href={getCategoryUrl(category.slug)}
						>
							{category.title}
						</Link>
					)}
					<Link href={getProductUrl(slug)}>
						<h3 className={styles.title}>{title}</h3>
						{weight > 0 && <span className={styles.weight}>{weight} г</span>}
					</Link>

					{/* TODO */}
					{/* Chart here */}

					<Divider />

					<div className={styles.bottom}>
						<Link href={getProductUrl(slug)}>
							<PriceDisplay
								lastPrice={lastPrice}
								percentToLastPrice={percentToLastPrice}
								toLastPrice={toLastPrice}
							/>
						</Link>
						<DynamicChart productId={id} />
					</div>
				</div>
			</Col>
		</>
	)
}

export default CatalogCard
