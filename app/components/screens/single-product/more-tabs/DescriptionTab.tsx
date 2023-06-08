import { getCategoryUrl } from '@config/url.config'
import { IProductReturn } from '@services/products/products.interface'
import { Col, Descriptions, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const { Item } = Descriptions

const DescriptionTab: FC<{ product: IProductReturn }> = ({ product }) => {
	const { title, description, author, category, imagePath, weight } = product
	return (
		<Row>
			<Col md={18}>
				<Descriptions bordered column={2}>
					<Item label="Название">{title}</Item>
					<Item label="Категория">
						<Link
							style={{ whiteSpace: 'nowrap' }}
							href={getCategoryUrl(category.slug)}
						>
							{category.title}
						</Link>
					</Item>
					{weight !== 0 && <Item label="Вес">{weight} г</Item>}
					<Item label="Автор">{author.name}</Item>
					<Item label="Изображение">
						<Image
							src={imagePath}
							alt={title}
							width={200}
							height={200}
							loading={'lazy'}
						/>
					</Item>
				</Descriptions>
			</Col>
		</Row>
	)
}

export default DescriptionTab
