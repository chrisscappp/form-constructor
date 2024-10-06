import { memo } from "react"
import { useParams } from "react-router"

const ProfilePage = () => {

	const { id: userId } = useParams<{ id: string }>()
	
	return (
		<div>
			prilfe page {userId}
		</div>
	)
}

export default memo(ProfilePage)