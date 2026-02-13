import { deals } from "../data/deals"
import { useState } from "react"

const dealStatusColor = {
	"new": "blue",
	"in-progress": "orange",
	"done": "green"
}

export default function DealsPage() {
	const [dealsList, setDealsList] = useState(deals);

	const handleDeleteDeal = (id) => {
		setDealsList((prev) => prev.filter((deal) => deal.id !== id));
	};


	return (
		<div>
			<h2>Deals</h2>

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
