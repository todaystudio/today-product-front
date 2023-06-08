import MeScreen from '@components/screens/me/MeScreen'
import { NextPageAuth } from '@shared/types/auth.type'

const MePage: NextPageAuth = () => {
	return <MeScreen />
}

MePage.isOnlyUser = true

export default MePage
