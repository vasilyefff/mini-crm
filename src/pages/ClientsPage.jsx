import { clients } from "../data/clients";

export default function ClientsPage() {
	return (
		<div>
			<h2>Clients</h2>

			<ul>
				{clients.map((client) => (
					<li key={client.id}>
						{client.name} — {client.email}
					</li>
				))}
			</ul>
		</div>
	);

}
