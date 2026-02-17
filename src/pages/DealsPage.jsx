import { deals } from "../data/deals"
import { useState, useEffect } from "react"
import { clients as initialClients } from "../data/clients";


const dealStatusColor = {
	"new": "blue",
	"in-progress": "orange",
	"done": "green"
}

export default function DealsPage() {
	const [dealsList, setDealsList] = useState(() => {
		const stored = localStorage.getItem("deals");
		return stored ? JSON.parse(stored) : deals;
	});
	const [clientsList] = useState(() => {
		const stored = localStorage.getItem("clients");
		return stored ? JSON.parse(stored) : initialClients;
	});

	const [newDealTitle, setNewDealTitle] = useState("")
	const [newDealAmount, setNewDealAmount] = useState("")
	const [dealError, setDealError] = useState("");
	const [selectedClientId, setSelectedClientId] = useState("");


	useEffect(() => {
		localStorage.setItem("deals", JSON.stringify(dealsList));
	}, [dealsList]);

	const handleAddDeal = () => {
		if (!newDealTitle || !newDealAmount || !selectedClientId
		) {
			setDealError("Title, amount and client are required");
			return;
		}

		const newDeal = {
			id: Date.now(),
			title: newDealTitle,
			amount: Number(newDealAmount),
			status: "new",
			clientId: Number(selectedClientId),
		};

		setDealsList((prev) => [...prev, newDeal]);
		setNewDealTitle("");
		setNewDealAmount("");
		setSelectedClientId("");
		setDealError("");
	};


	const handleDeleteDeal = (id) => {
		setDealsList((prev) => prev.filter((deal) => deal.id !== id));
	};


	return (
		<div>
			<h2>Deals</h2>

			{dealError && <p style={{ color: "red" }}>{dealError}</p>}
			<input
				type="text"
				placeholder="Deal title"
				value={newDealTitle}
				onChange={(e) => setNewDealTitle(e.target.value)}
			/>

			<input
				type="number"
				placeholder="Amount"
				value={newDealAmount}
				onChange={(e) => setNewDealAmount(e.target.value)}
			/>

			<select
				value={selectedClientId}
				onChange={(e) => setSelectedClientId(e.target.value)}
				disabled={clientsList.length === 0}
			>
				<option value="">
					{clientsList.length === 0
						? "Add client first"
						: "Select client"}
				</option>

				{clientsList.map((client) => (
					<option key={client.id} value={client.id}>
						{client.name}
					</option>
				))}
			</select>

			<button onClick={handleAddDeal}>
				Add deal
			</button>


			{dealsList.length === 0 ? (<p>No deals yet</p>) : (
				<ul>
					{dealsList.map((deal) => {
						const client = clientsList.find(
							(c) => c.id === deal.clientId
						);

						return (
							<li key={deal.id}>
								{deal.title} — {client?.name || "Unknown"} — ${deal.amount} —{" "}
								<span style={{ color: dealStatusColor[deal.status] || "black" }}>
									{deal.status}
								</span>

								<button onClick={() => handleDeleteDeal(deal.id)}>
									Delete
								</button>
							</li>
						);
					})}
				</ul>

			)
			}

		</div >
	);

}
