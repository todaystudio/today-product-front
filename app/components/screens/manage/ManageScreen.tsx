import Meta from '@utils/meta/Meta'
import { Divider, Typography } from 'antd'
import { FC } from 'react'
import Statistics from './Statistics'
import { useManage } from './useManage'

const ManageScreen: FC = () => {
	const { isLoadingStat, statistics } = useManage()

	return (
		<Meta title="Панель управления">
			<div>
				<Typography.Title level={1}>Панель управления</Typography.Title>
				<Divider />
				<Statistics data={statistics} loading={isLoadingStat} />
			</div>
		</Meta>
	)
}

export default ManageScreen
