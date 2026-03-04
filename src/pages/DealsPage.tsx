import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { fetchDeals, addDeal, deleteDeal } from '../features/deals/dealsSlice'
import { fetchClients } from '../features/clients/clientsSlice'
import type { DealStatus } from '../types/deal'

const dealStatusColor: Record<DealStatus, string> = {
	new: 'blue',
	'in-progress': 'orange',
	done: 'green',
}

export default function DealsPage() {
	const dispatch = useDispatch<AppDispatch>()

	const { deals, status } = useSelector((state: RootState) => state.deals)
	const { clients } = useSelector((state: RootState) => state.clients)

	const [newDealTitle, setNewDealTitle] = useState('')
	const [newDealAmount, setNewDealAmount] = useState('')
	const [selectedClientId, setSelectedClientId] = useState('')
	const [dealError, setDealError] = useState('')

	useEffect(() => {
		dispatch(fetchDeals())
		dispatch(fetchClients())
	}, [dispatch])

	const handleAddDeal = () => {
		if (!newDealTitle || !newDealAmount || !selectedClientId) {
			setDealError('Title, amount and client are required')
			return
		}

		dispatch(
			addDeal({
				id: Date.now(),
				title: newDealTitle,
				amount: Number(newDealAmount),
				status: 'new',
				clientId: Number(selectedClientId),
			})
		)

		setNewDealTitle('')
		setNewDealAmount('')
		setSelectedClientId('')
		setDealError('')
	}

	const handleDeleteDeal = (id: number) => {
		dispatch(deleteDeal(id))
	}

	return (
		<div>
			<h2>Deals</h2>

			{dealError && <p style={{ color: 'red' }}>{dealError}</p>}

			<input
				type="text"
				placeholder="Deal title"
				value={newDealTitle}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setNewDealTitle(e.target.value)
				}
			/>

			<input
				type="number"
				placeholder="Amount"
				value={newDealAmount}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setNewDealAmount(e.target.value)
				}
			/>

			<select
				value={selectedClientId}
				onChange={(e: ChangeEvent<HTMLSelectElement>) =>
					setSelectedClientId(e.target.value)
				}
				disabled={clients.length === 0}
			>
				<option value="">
					{clients.length === 0 ? 'Add client first' : 'Select client'}
				</option>

				{clients.map((client) => (
					<option key={client.id} value={client.id}>
						{client.name}
					</option>
				))}
			</select>

			<button onClick={handleAddDeal}>Add deal</button>

			{status === 'loading' && <p>Loading...</p>}

			{status === 'succeeded' && deals.length === 0 && <p>No deals yet</p>}

			{deals.length > 0 && (
				<ul>
					{deals.map((deal) => {
						const client = clients.find((c) => c.id === deal.clientId)

						return (
							<li key={deal.id}>
								{deal.title} — {client?.name || 'Unknown'} — ${deal.amount} —{' '}
								<span style={{ color: dealStatusColor[deal.status] }}>
									{deal.status}
								</span>
								<button onClick={() => handleDeleteDeal(deal.id)}>
									Delete
								</button>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}