import { IForecast } from '@services/products/products.interface'
import { ProductService } from '@services/products/products.service'
import { useQuery } from 'react-query'

export const usePriceChart = (productId: number, height: number) => {
	const { isLoading, data } = useQuery(
		['get data for chart', productId],
		() => ProductService.getStatistics(productId),
		{
			select: ({ data }) => {
				const config = setConfig(data.dataForChart)
				return { data: data.dataForChart, config }
			},
		}
	)

	function setConfig(data: IForecast[]) {
		return {
			data,
			autoFill: true,
			height: height,
			xField: 'date',
			yField: 'price',
			seriesField: 'category',

			xAxis: {
				type: 'time',
			},

			point: {
				size: 1,
				shape: 'diamond',
				style: {
					fill: 'white',
					stroke: '#5B8FF9',
					lineWidth: 2,
				},
			},
			smooth: true,
			state: {
				active: {
					style: {
						shadowBlur: 4,
						stroke: '#000',
						fill: 'red',
					},
				},
			},
			interactions: [
				{
					type: 'marker-active',
				},
			],
		}
	}

	return {
		data,
		isLoading,
	}
}
