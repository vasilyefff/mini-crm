import { clients } from "../data/clients";
import { useState } from "react";

export default function ClientsPage() {
	const [clientsList, setClientsList] = useState(clients);
	const [newClientName, setNewClientName] = useState("");

	const handleDeleteClient = (id) => {
		setClientsList((prev) => prev.filter((client) => client.id !== id));
	};

	const handleAddClient = () => {
		if (!newClientName) return;

		const newClient = {
			id: Date.now(),
			name: newClientName,
			email: "new@test.com",
			status: "active",
		};

		setClientsList((prev) => [...prev, newClient]);
		setNewClientName("");
	};


	return (
		<div>
			<h2>Clients</h2>
			<input
				placeholder="Client name"
				value={newClientName}
				onChange={(e) => setNewClientName(e.target.value)}
			/>

			<button onClick={handleAddClient}>
				Add client
			</button>


			{clientsList.length === 0 ? (<p>No clients yet</p>) : (
				<ul>
					{clientsList.map((client) => (
						<li key={client.id}>
							{client.name} — {client.email}
							<button onClick={() => handleDeleteClient(client.id)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
		</div>

	);

}
