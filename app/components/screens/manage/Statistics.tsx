import { ArrowRightOutlined } from '@ant-design/icons'
import { getAdminUrl } from '@config/url.config'
import { IAllStatistics } from '@services/statistics/statistics.interface'
import { Card, Col, Row, Statistic, Typography } from 'antd'
import Link from 'next/link'
import { FC } from 'react'

interface IStatistics {
	data: IAllStatistics | undefined
	loading: boolean
}

const Statistics: FC<IStatistics> = ({ data, loading }) => {
	return (
		<div>
			<Typography.Title level={4}>Статистика</Typography.Title>
			<Row gutter={[16, 16]}>
				<Col span={8}>
					<Card bordered={false}>
						<Statistic title="Пользователи" value={data?.usersCount} />
						<Link href={getAdminUrl('product')}>
							Посмотреть все <ArrowRightOutlined />
						</Link>
					</Card>
				</Col>
				<Col span={8}>
					<Card bordered={false}>
						<Statistic title="Цены" value={data?.pricesCount} />
						<Link href={getAdminUrl('product')}>
							Посмотреть все <ArrowRightOutlined />
						</Link>
					</Card>
				</Col>
				<Col span={8}>
					<Card bordered={false}>
						<Statistic title="Товары" value={data?.productsCount} />
						<Link href={getAdminUrl('product')}>
							Посмотреть все <ArrowRightOutlined />
						</Link>
					</Card>
				</Col>
				<Col span={8}>
					<Card bordered={false}>
						<Statistic title="Магазины" value={data?.shopsCount} />
						<Link href={getAdminUrl('product')}>
							Посмотреть все <ArrowRightOutlined />
						</Link>
					</Card>
				</Col>
				<Col span={8}>
					<Card bordered={false}>
						<Statistic
							title="Средняя цена"
							value={data?.avgPrice}
							precision={2}
							prefix="₽"
						/>
						<Link href={getAdminUrl('product')}>
							Посмотреть все <ArrowRightOutlined />
						</Link>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default Statistics
