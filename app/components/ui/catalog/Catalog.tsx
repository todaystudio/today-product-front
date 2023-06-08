import { Divider, Empty, Row, Typography } from 'antd'
import { FC } from 'react'
import CatalogCard from './CatalogCard'
import { ICatalog } from './catalog.interface'

const { Title, Paragraph } = Typography

const Catalog: FC<ICatalog> = ({
	description,
	products,
	title,
	category,
	alone = false,
}) => {
	if (alone)
		return (
			<Row gutter={[16, 16]}>
				{products.map((product) => (
					<CatalogCard {...product} key={product.id} />
				))}
			</Row>
		)
	return (
		<div>
			{title && (
				<Typography.Title level={1} title={title} translate="yes">
					{title}
				</Typography.Title>
			)}

			{description && <Paragraph>{description}</Paragraph>}
			{title || description ? <Divider /> : null}

			<Row gutter={[16, 16]}>
				{products && products.length ? (
					products.map((product) => (
						<CatalogCard {...product} key={product.id} />
					))
				) : (
					<Empty
						description={'Не понимаю как такое возможно, но товаров нет 🤷🏻‍♂️'}
					/>
				)}
			</Row>
		</div>
	)
}

export default Catalog
