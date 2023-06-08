import { getAdminUrl } from '@config/url.config'
import Meta from '@utils/meta/Meta'
import { Col, Divider, Row, Spin, Typography } from 'antd'
import Link from 'next/link'
import { FC } from 'react'
import OrderForUpdatePriceOrders from '../single-product/more-tabs/OrderForUpdatePrice/OrderForUpdatePriceOrders'
import style from './MeScreen.module.scss'
import MeInfo from './dashboard/MeInfo'
import TelegramDashboard from './dashboard/telegram-dashboard/TelegramDashboard'
import { useMe } from './useMe'

const { Title } = Typography

const MeScreen: FC = () => {
	const {
		getProfile: { data: profileInfo, isLoading: isLoadingProfile },
	} = useMe()

	if (isLoadingProfile || !profileInfo) return <Spin size="large" />

	return (
		<Meta title="Мой профиль">
			<div className={style.MeScreen}>
				<Title level={1}>Мой профиль</Title>

				<Divider />

				{!isLoadingProfile && profileInfo ? (
					<Row gutter={32}>
						<Col md={12}>
							<MeInfo user={profileInfo} />
						</Col>
						{profileInfo.isAdmin && (
							<Col md={12}>
								<div className={style.DashboardItem}>
									<Link href={getAdminUrl('')}>
										Перейти в Панель управления
									</Link>
								</div>
							</Col>
						)}
					</Row>
				) : null}

				<Row gutter={32}>
					<Col md={12}>
						<div className={style.DashboardItem}>
							<Title level={4}>Заявки на изменение цен</Title>
							<OrderForUpdatePriceOrders
								viewAllButton
								isLoading={isLoadingProfile}
								data={profileInfo?.OrderForUpdatePrice || []}
							/>
						</div>
					</Col>
					<Col md={12}>
						<div className={style.DashboardItem}>
							{profileInfo && <TelegramDashboard profileInfo={profileInfo} />}
						</div>
					</Col>
				</Row>
			</div>
		</Meta>
	)
}

export default MeScreen
