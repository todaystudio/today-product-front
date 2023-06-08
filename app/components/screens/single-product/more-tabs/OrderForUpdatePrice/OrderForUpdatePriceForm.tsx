import { FC } from 'react'
import { Button, Divider, Empty, Form, Input, Typography } from 'antd'
import { IProductReturn } from '@services/products/products.interface'

interface IOrderForUpdatePriceForm {
	onSubmit: ((values: any) => void) | undefined
	isLoading: boolean
	product: IProductReturn
}

const OrderForUpdatePriceForm: FC<IOrderForUpdatePriceForm> = ({
	isLoading,
	onSubmit,
	product,
}) => {
	return (
		<>
			<Typography.Title level={4}>
				Хотите уточнить цену товара?
			</Typography.Title>
			<Typography.Paragraph>
				Мы будем рады, если вы нам поможете держать цены актуальными. Чтобы
				отправить новую цену – заполните форму ниже
			</Typography.Paragraph>

			<Divider />

			<Form
				onFinish={onSubmit}
				name="basic"
				layout="vertical"
				disabled={isLoading}
				style={{ maxWidth: 600 }}
				autoComplete="off"
			>
				<Form.Item
					label="Товар"
					name="productName"
					initialValue={product.title}
				>
					<Input disabled />
				</Form.Item>

				<Form.Item
					label="Цена"
					name="price"
					required
					rules={[
						// {
						// 	type: '',
						// 	message: 'Это не число"',
						// },
						{ required: true, message: 'А как же без цены? – она нужна 😎' },
						{
							min: 1,
							message:
								'Сори, но на данный момент мы не видели товары дешевле 1₽',
						},
					]}
				>
					<Input type="number" placeholder={String(product.lastPrice)} />
				</Form.Item>

				<Form.Item
					label="Ссылка на товар с ценой"
					name="link"
					tooltip="Можно указать ссылку на интернет-магазин, где вы видели такую цену"
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Сообщение"
					name="message"
					tooltip="Можно указать ссылку на интернет-магазин, где вы видели такую цену"
				>
					<Input.TextArea
						rows={4}
						placeholder="Здесь можно дополнить информацию о товаре или оставить комментарий (его увидят авторы сервиса)"
					/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Отправить
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default OrderForUpdatePriceForm
