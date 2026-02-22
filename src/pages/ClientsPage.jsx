import { useState, useEffect } from "react";

export default function ClientsPage() {
	const [clientsList, setClientsList] = useState([]);
	const [newClientName, setNewClientName] = useState("");

	useEffect(() => {
		fetch("http://localhost:4000/clients")
			.then(res => res.json())
			.then(data => setClientsList(data));
	}, []);


	const handleDeleteClient = (id) => {
		fetch(`http://localhost:4000/clients/${id}`, {
			method: "DELETE",
		})
			.then(() => {
				setClientsList(prev => prev.filter(client => client.id !== id));
			});
	};

	const handleAddClient = () => {
		if (!newClientName) return;

		fetch("http://localhost:4000/clients", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: newClientName,
			}),
		})
			.then(res => res.json())
			.then(createdClient => {
				setClientsList(prev => [...prev, createdClient]);
				setNewClientName("");
			});
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
