import { deals } from "../data/deals"
import { useState, useEffect } from "react"

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
	const [newDealTitle, setNewDealTitle] = useState("")
	const [newDealAmount, setNewDealAmount] = useState("")
	const [dealError, setDealError] = useState("");

	useEffect(() => {
		localStorage.setItem("deals", JSON.stringify(dealsList));
	}, [dealsList]);

	const handleAddDeal = () => {
		if (!newDealTitle || !newDealAmount) {
			setDealError("Title and amount are required");
			return;
		}

		const newDeal = {
			id: Date.now(),
			title: newDealTitle,
			amount: Number(newDealAmount),
			status: "new",
		};

		setDealsList((prev) => [...prev, newDeal]);
		setNewDealTitle("");
		setNewDealAmount("");
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
			<button onClick={handleAddDeal}>
				Add deal
			</button>


			{dealsList.length === 0 ? (<p>No deals yet</p>) : (
				<ul>
					{dealsList.map((deal) => (
						<li key={deal.id}>
							{deal.title} — ${deal.amount} — <span style={{ color: dealStatusColor[deal.status] || "black" }}>{deal.status}</span>
							<button onClick={() => handleDeleteDeal(deal.id)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			)
			}

		</div >
	);

}
