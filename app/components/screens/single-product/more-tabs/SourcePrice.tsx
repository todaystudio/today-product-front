import { IProductReturn } from '@services/products/products.interface'
import { Empty, List, Typography } from 'antd'
import Link from 'next/link'
import { FC } from 'react'

const { Paragraph } = Typography

const SourcePrice: FC<{
	product: IProductReturn
}> = ({ product }) => {
	if (!product.parseUrl)
		return <Empty description={<span>Ничего не нашлось</span>} />
	return (
		<List
			bordered
			dataSource={product.parseUrl}
			renderItem={(item) => (
				<List.Item>
					<Typography.Text copyable>
						<Link href={item}>{item}</Link>
					</Typography.Text>
				</List.Item>
			)}
		></List>
	)
}

export default SourcePrice
