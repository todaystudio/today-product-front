import {
	IPriceProduct,
	IProductReturn,
	IProductStatistics,
} from '@services/products/products.interface'
import { Skeleton } from 'antd'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { usePriceChart } from './usePriceChart'

export interface IPriceChart {
	productId: number
	height?: number
}

interface IChartData {
	date: Date | string
	price: number
	category: 'history' | 'forecast' | string
}

const Line = dynamic(
	() => import('@ant-design/charts').then(({ Line }) => Line),
	{ ssr: false, loading: () => <Skeleton active /> }
)

const PriceChart: FC<IPriceChart> = ({ productId, height = 110 }) => {
	const { data, isLoading } = usePriceChart(productId, height)

	if (isLoading) return <Skeleton />
	return (
		<div style={{ maxWidth: '100%' }}>
			{data?.config && <Line {...data?.config} />}
		</div>
	)
}

export default PriceChart
