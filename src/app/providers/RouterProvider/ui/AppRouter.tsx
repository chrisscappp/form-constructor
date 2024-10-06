import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "shared/config/routeConfig/routeConfig"
import { classNames } from "shared/lib/classNames/classNames"
import { Footer } from "widgets/Footer"
import { PageLoader } from "widgets/PageLoader"

export const AppRouter = () => {
	return (
		<>
			<Suspense fallback = {<PageLoader/>}>
				<Routes>
					{Object.values(routeConfig).map(({ path, element }) => {
						return (
							<Route
								key = {path}
								path = {path}
								element = {
									<div 
										className={classNames("page-wrapper", {}, [])}
									>{element}</div>
								}
							/>
						)
					})}
				</Routes>
				<Footer/>
			</Suspense>
		</>
	)
}