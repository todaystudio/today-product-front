import ManageScreen from '@components/screens/manage/ManageScreen'
import { NextPageAuth } from '@shared/types/auth.type'

const ManagePage: NextPageAuth = () => {
	return <ManageScreen />
}

// ManagePage.isOnlyUser = true
// ManagePage.isOnlyAdmin = true

export default ManagePage
