import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
	return (
		<div className="app">
			<aside className="sidebar">
				<h2>Mini CRM</h2>

				<nav>
					<NavLink to="/">Dashboard</NavLink>
					<NavLink to="/clients">Clients</NavLink>
					<NavLink to="/deals">Deals</NavLink>
				</nav>
			</aside>

			<main className="content">
				<Outlet />
			</main>
		</div>
	)
}