import { classNames } from "shared/lib/classNames/classNames"
import { Navbar } from "widgets/Navbar/index"
import { Suspense, useCallback, useState } from "react"
import { AppRouter } from "./providers/RouterProvider"
import "./styles/reset.scss"
import "./styles/index.scss"
import { Sidebar } from "widgets/Sidebar"

const App = () => {

	const [isCollapsed, setIsCollapsed] = useState(false)

	const onCollapsed = useCallback(() => {
		setIsCollapsed(!isCollapsed)
	}, [isCollapsed])

	return (
		<div className={classNames("app", {}, [])}>
			<Suspense fallback="">
				<div className="content-page">
					<Navbar onCollapsed={onCollapsed} />
					{isCollapsed ? <Sidebar onCollapsed={onCollapsed} /> : null}
					<AppRouter/>
				</div>
			</Suspense>
		</div>
	)
}

export default App