import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { FC } from 'react'
import styles from './PriceDisplay.module.scss'

export interface IPriceDisplay {
	lastPrice: number
	toLastPrice: number
	percentToLastPrice: number
	size?: 'lg' | 'md' | 'xs'
	align?: 'start' | 'center' | 'end'
	color?: 'light' | 'dark'
}

const PriceDisplay: FC<IPriceDisplay> = ({
	lastPrice,
	percentToLastPrice,
	toLastPrice,
	size = 'md',
	align = 'center',
	color = 'dark',
}) => {
	const priceClass: string = toLastPrice <= 0 ? 'green-price' : 'red-price'
	const priceIcon: JSX.Element =
		toLastPrice <= 0 ? <CaretDownOutlined /> : <CaretUpOutlined />

	return (
		<div
			className={classNames(
				styles.prices,
				{
					[styles.pricesXs]: size === 'xs',
					[styles.pricesMd]: size === 'md',
					[styles.pricesLg]: size === 'lg',
				},
				{
					[styles.pricesStart]: align === 'start',
					[styles.pricesCenter]: align === 'center',
					[styles.pricesEnd]: align === 'end',
				}
			)}
		>
			<div
				className={classNames(styles.lastPrice, {
					[styles.lastPriceDark]: color === 'dark',
					[styles.lastPriceLight]: color === 'light',
				})}
			>
				{lastPrice}₽
			</div>
			<div className={classNames(styles.subPrices, priceClass)}>
				<div className={styles.toLastPrice}>{toLastPrice}₽</div>
				<div className={classNames(styles.toLastPrice, priceClass)}>
					{priceIcon}
				</div>
				<div className={styles.percentToLastPrice}>{percentToLastPrice}%</div>
			</div>
		</div>
	)
}

export default PriceDisplay
