import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import DashboardPage from './pages/DashboardPage'
import ClientsPage from './pages/ClientsPage'
import DealsPage from './pages/DealsPage'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<DashboardPage />} />
				<Route path="clients" element={<ClientsPage />} />
				<Route path="deals" element={<DealsPage />} />
			</Route>
		</Routes>
	)
}

export default App