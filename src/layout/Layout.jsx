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
				Sidebar
			</aside>

			<main style={{ flex: 1, padding: "16px" }}>{children}</main>
		</div>
	);
}
