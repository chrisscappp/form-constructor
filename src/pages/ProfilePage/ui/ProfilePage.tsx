import { memo } from "react"
import { useParams } from "react-router"
import { Page } from "widgets/Page"

const ProfilePage = () => {

	const { id: userId } = useParams<{ id: string }>()
	
	return (
		<Page>
			prilfe page {userId}
		</Page>
	)
}

export default memo(ProfilePage)