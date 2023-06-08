import { IProductReturn } from '@services/products/products.interface'
import { Skeleton, Typography } from 'antd'
import { FC } from 'react'
import { useProductTabs } from './useProductTabs'

const { Paragraph } = Typography

const BarcodesTab: FC<{
	product: IProductReturn
}> = ({ product }) => {
	const {
		barcodes: { data, isLoading },
	} = useProductTabs(product)
	if (isLoading) return <Skeleton />
	return (
		<div>
			{data &&
				data.map((barcode) => (
					<Paragraph
						strong
						style={{ fontSize: 18 }}
						key={barcode.code}
						code
						copyable={{ tooltips: ['Скопировать', 'Скопировано!'] }}
					>
						{barcode.code}
					</Paragraph>
				))}
		</div>
	)
}

export default BarcodesTab
