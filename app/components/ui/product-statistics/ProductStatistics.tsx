import { IProductStatistics } from '@services/products/products.interface'
import { Col, Row, Statistic } from 'antd'
import { FC } from 'react'

const ProductStatistics: FC<{ statistics: IProductStatistics }> = ({
	statistics,
}) => {
	const mode =
		statistics.mode.length > 1
			? statistics.mode.join('₽, ')
			: statistics.mode[0] + '₽'

	return (
		<div>
			<Row>
				<Col span={8}>
					<Statistic title="Мода" value={mode} />
				</Col>
				<Col span={8}>
					<Statistic title="Медиана" value={statistics.median + '₽'} />
				</Col>
				<Col span={8}>
					<Statistic title="Среднее" value={statistics.mean.toFixed(2) + '₽'} />
				</Col>
			</Row>
		</div>
	)
}

export default ProductStatistics
