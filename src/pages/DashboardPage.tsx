import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'

export default function DashboardPage() {
	const { clients } = useSelector((state: RootState) => state.clients)
	const { deals } = useSelector((state: RootState) => state.deals)

	const totalAmount = deals.reduce((sum, deal) => sum + deal.amount, 0)

	return (
		<div>
			<h2>Dashboard</h2>

			<div className="dashboard-stats">
				<div className="card">
					<span>Clients</span>
					<strong>{clients.length}</strong>
				</div>

				<div className="card">
					<span>Deals</span>
					<strong>{deals.length}</strong>
				</div>

				<div className="card">
					<span>Total amount</span>
					<strong>${totalAmount}</strong>
				</div>
			</div>
		</div>
	)
}