import App from "app/App"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "app/providers/ErrorBoundary"
import { StoreProvider } from "app/providers/StoreProvider"

//@ts-ignore
createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<StoreProvider>
			<ErrorBoundary>
				<App/>
			</ErrorBoundary>	
		</StoreProvider>
	</BrowserRouter>
)
