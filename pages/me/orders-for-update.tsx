import OrdersForUpdateTable from '@components/screens/me/orders-for-update-table/OrdersForUpdateTable'
import { NextPageAuth } from '@shared/types/auth.type'
import Meta from '@utils/meta/Meta'

const OrdersForUpdatePage: NextPageAuth = () => {
	return (
		<>
			<Meta title="Заявки на обновление цены товара">
				<OrdersForUpdateTable />
			</Meta>
		</>
	)
}

OrdersForUpdatePage.isOnlyUser = true
export default OrdersForUpdatePage
