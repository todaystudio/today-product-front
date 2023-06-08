import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	SyncOutlined,
} from '@ant-design/icons'
import { Tag } from 'antd'
import { FC } from 'react'

interface IOrderTags {
	status: EnumOrderStatus
}

export enum EnumOrderStatus {
	CREATED = 'CREATED',
	PENDING = 'PENDING',
	SUCCESS = 'SUCCESS',
	REJECTED = 'REJECTED',
}

const OrderTags: FC<IOrderTags> = ({ status }) => {
	switch (status) {
		case EnumOrderStatus.CREATED:
			return (
				<Tag icon={<ClockCircleOutlined />} color="default">
					Создан
				</Tag>
			)
		case EnumOrderStatus.PENDING:
			return (
				<Tag icon={<SyncOutlined spin />} color="processing">
					В обработке
				</Tag>
			)
		case EnumOrderStatus.REJECTED:
			return (
				<Tag icon={<CloseCircleOutlined />} color="error">
					Отклонена
				</Tag>
			)
		case EnumOrderStatus.SUCCESS:
			return (
				<Tag icon={<CheckCircleOutlined />} color="success">
					Учтена
				</Tag>
			)
	}
}

export default OrderTags
