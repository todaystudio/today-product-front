import EditProfile from '@components/screens/me/edit-profile/EditProfile'
import { NextPageAuth } from '@shared/types/auth.type'

const EditPage: NextPageAuth = () => {
	return (
		<>
			<EditProfile />
		</>
	)
}

EditPage.isOnlyUser = true
export default EditPage
