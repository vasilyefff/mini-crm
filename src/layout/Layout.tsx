import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
	return (
		<div style={{ display: "flex", minHeight: "100vh" }}>
			<aside
				style={{
					width: "200px",
					borderRight: "1px solid #ddd",
					padding: "16px",
				}}
			>
				<h3>Mini CRM</h3>

				<ul>
					<li>
						<NavLink
							to="/"
							style={({ isActive }) => ({
								fontWeight: isActive ? "bold" : "normal",
							})}
						>
							Dashboard
						</NavLink>

					</li>

					<li>
						<NavLink to="/clients" style={({ isActive }) => ({
							fontWeight: isActive ? "bold" : "normal"
						})}>Clients</NavLink>
					</li>

					<li>
						<NavLink to="/deals" style={({ isActive }) => ({
							fontWeight: isActive ? "bold" : "normal"
						})}>Deals</NavLink>
					</li>
				</ul>

			</aside>

			<main style={{ flex: 1, padding: "16px" }}>{children}</main>
		</div>
	);
}
