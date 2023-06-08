import GoBackButton from '@components/ui/buttons/GoBackButton'
import PriceDisplay from '@components/ui/price-display/PriceDisplay'
import ProductStatistics from '@components/ui/product-statistics/ProductStatistics'
import SimilarProduct from '@components/ui/similar-product/SimilarProduct'
import { getCategoryUrl } from '@config/url.config'
import {
	IProductReturn,
	IProductStatistics,
} from '@services/products/products.interface'
import { Divider, Typography } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './SingleProduct.module.scss'
import MoreTabs from './more-tabs/MoreTabs'

const { Title } = Typography

interface ISingleProduct {
	product: IProductReturn
	statistics: IProductStatistics
}

const SingleProduct: FC<ISingleProduct> = ({ product, statistics }) => {
	const increaseDate = product.price.length
		? dayjs(product.price[0].createdAt).format('DD.MM.YY')
		: null

	const lastPriceDate = product.price.length
		? dayjs(product.price[product.price.length - 1].createdAt).format(
				'DD.MM.YY'
		  )
		: null

	return (
		<div className={styles.SingleProduct}>
			<GoBackButton />
			<div className={styles.offer}>
				<div className={styles.image}>
					<Image
						alt={product.title}
						src={product.imagePath}
						width={500}
						height={500}
						loading="lazy"
						placeholder="blur"
						blurDataURL={product.imagePath}
					/>
				</div>
				<div className={styles.info}>
					<div className={styles.category}>
						<Link href={getCategoryUrl(product.category.slug)}>
							{product.category.title}
						</Link>
					</div>
					<Title level={1}>
						{product.title}
						{product.weight !== 0 && (
							<div className={styles.weight}>{product.weight} г</div>
						)}
					</Title>
					{/* Favorites */}

					<Divider />
					<div className={styles.prices}>
						<PriceDisplay
							size="lg"
							align="start"
							color="light"
							lastPrice={product.lastPrice}
							percentToLastPrice={product.percentToLastPrice}
							toLastPrice={product.toLastPrice}
						/>
						<div className={styles.left}>
							{increaseDate && (
								<div className={styles.increase}>Прирост с {increaseDate}</div>
							)}
							{lastPriceDate && (
								<div className={styles.increase}>
									Последняя цена от {lastPriceDate}
								</div>
							)}
						</div>
					</div>
					<div className={styles.statistics}>
						<ProductStatistics statistics={statistics} />
					</div>
				</div>
			</div>
			<div className={styles.more}>
				<Title level={3}>О товаре</Title>
				<MoreTabs product={product} statistics={statistics} />
			</div>
			<div className={styles.similar}>
				<SimilarProduct product={product} />
			</div>
		</div>
	)
}

export default SingleProduct
