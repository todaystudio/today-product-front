import { PlusOutlined } from '@ant-design/icons'
import UploadImage from '@components/ui/upload-image/UploadImage'
import { IProductReturn } from '@services/products/products.interface'
import Meta from '@utils/meta/Meta'
import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Skeleton,
	Typography,
} from 'antd'
import { FC } from 'react'
import { useProductEdit } from './useProductEdit'

const ProductEdit: FC = () => {
	const [form] = Form.useForm<keyof IProductReturn>()
	const { isLoadingProduct, categories, isLoadingCategories } =
		useProductEdit(form)

	const submitForm = (data: keyof IProductReturn) => {
		console.log(data)
	}
	return (
		<Meta title="Редактирование товара">
			<Typography.Title level={1}>Редактирование товара</Typography.Title>
			<Divider />
			{isLoadingProduct ? (
				<Skeleton active />
			) : (
				<div>
					<Form layout="vertical" form={form} onFinish={submitForm}>
						<Form.Item label="Изображение" shouldUpdate>
							{() => {
								return (
									<Form.Item name="imagePath">
										<UploadImage
											form={form}
											folder="products"
											value={String(form.getFieldValue('imagePath'))}
										/>
									</Form.Item>
								)
							}}
						</Form.Item>
						<Form.Item
							name="title"
							label="Наименование товара"
							rules={[
								{
									required: true,
									message: 'Наименование не может быть пустым',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="slug"
							label="Slug (ссылка на товар)"
							rules={[
								{
									required: true,
									message: 'Slug не может быть пустым',
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name="description"
							label="Описание товара"
							rules={[
								{
									required: true,
									message: 'Описание товара не может быть пустым',
								},
							]}
						>
							<Input.TextArea rows={4} />
						</Form.Item>

						<Row gutter={32}>
							<Col span={8}>
								<Form.Item
									name="category"
									label="Категория"
									rules={[
										{
											required: true,
											message: 'Категория товара не может быть пустым',
										},
									]}
								>
									<Select options={categories} />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item name="author" label="Автор товара">
									<Input disabled />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									name="weight"
									label="Вес товара"
									rules={[
										{
											required: true,
											message: 'Вес товара не может быть пустым',
										},
									]}
								>
									<InputNumber addonAfter="грамм" />
								</Form.Item>
							</Col>
						</Row>

						<Typography.Title level={5}>Ссылки для парсинга</Typography.Title>
						<Divider />
						<Form.List name="parseUrl">
							{(fields, { add, remove }) => (
								<>
									{fields.map((field, idx) => (
										<Row key={field.key}>
											<Col span={20}>
												<Form.Item {...field}>
													<Input addonBefore="Ссылка" />
												</Form.Item>
											</Col>
											<Col span={4}>
												<Button
													type="link"
													danger
													onClick={() => remove(field.name)}
												>
													Убрать
												</Button>
											</Col>
										</Row>
									))}
									<Form.Item>
										<Button
											type="dashed"
											onClick={() => add()}
											block
											icon={<PlusOutlined />}
										>
											Добавить ссылку
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>

						<Typography.Title level={5}>Штрихкоды</Typography.Title>
						<Divider />
						<Form.List name="Barcode">
							{(fields, { add, remove }) => (
								<>
									{fields.map((field, idx) => (
										<Row key={field.key}>
											<Col span={20}>
												<Form.Item {...field}>
													<Input addonBefore="Штрихкод" />
												</Form.Item>
											</Col>
											<Col span={4}>
												<Button
													type="link"
													danger
													onClick={() => remove(field.name)}
												>
													Убрать
												</Button>
											</Col>
										</Row>
									))}
									<Form.Item>
										<Button
											type="dashed"
											onClick={() => add()}
											block
											icon={<PlusOutlined />}
										>
											Добавить штрихкод
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>
						<Form.Item>
							<Button htmlType="submit">Сохранить</Button>
						</Form.Item>
					</Form>
				</div>
			)}
		</Meta>
	)
}

export default ProductEdit
