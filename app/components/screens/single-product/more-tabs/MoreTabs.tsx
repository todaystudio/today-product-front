import {
	BarcodeOutlined,
	CalendarOutlined,
	InfoCircleOutlined,
	LineChartOutlined,
	LinkOutlined,
	MonitorOutlined,
} from '@ant-design/icons'
import PriceChart from '@components/ui/price-chart/PriceChart'
import {
	IProductReturn,
	IProductStatistics,
} from '@services/products/products.interface'
import { Spin, Tabs, TabsProps } from 'antd'
import { FC } from 'react'
import BarcodesTab from './BarcodesTab'
import DescriptionTab from './DescriptionTab'
import OrderForUpdatePrice from './OrderForUpdatePrice/OrderForUpdatePrice'
import PriceHistory from './PriceHistory'
import SourcePrice from './SourcePrice'

const MoreTabs: FC<{
	product: IProductReturn
	statistics: IProductStatistics
}> = ({ product, statistics }) => {
	const items: TabsProps['items'] = [
		{
			key: '1',
			label: (
				<span>
					<LineChartOutlined />
					График цен
				</span>
			),
			children: statistics.dataForChart ? (
				<PriceChart productId={product.id} height={400} />
			) : (
				<Spin />
			),
		},
		{
			key: '2',
			label: (
				<span>
					<InfoCircleOutlined />
					Описание товара
				</span>
			),
			children: <DescriptionTab product={product} />,
		},
		{
			key: '3',
			label: (
				<span>
					<CalendarOutlined />
					История цен
				</span>
			),
			children: <PriceHistory product={product} />,
		},
		{
			key: '4',
			disabled: !product.Barcode.length,
			label: (
				<span>
					<BarcodeOutlined />
					Штрихкоды
				</span>
			),
			children: <BarcodesTab product={product} />,
		},
		{
			key: '5',
			disabled: !product.parseUrl.length,
			label: (
				<span>
					<LinkOutlined />
					Источники цен
				</span>
			),
			children: <SourcePrice product={product} />,
		},
		{
			key: '6',
			label: (
				<span style={{ fontWeight: 500, color: '#5b8c00' }}>
					<MonitorOutlined />
					Уточнить цену
				</span>
			),
			children: <OrderForUpdatePrice product={product} />,
		},
	]

	return <Tabs defaultActiveKey="1" items={items} />
}

export default MoreTabs
