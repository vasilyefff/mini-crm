import { deals } from "../data/deals"

export default function DealsPage() {
	return (
		<div>
			<h2>Deals</h2>

			<ul>
				{deals.map((deal) => (
					<li key={deal.id}>
						{deal.title} — ${deal.amount} — {deal.status}
					</li>
				))}
			</ul>
		</div>
	);

}
