import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { fetchClients } from '../features/clients/clientsSlice'
import type { Client } from '../types/client'

export default function ClientsPage() {
	const dispatch = useDispatch<AppDispatch>()

	const { clients, status, error } = useSelector(
		(state: RootState) => state.clients
	)

	const [newClientName, setNewClientName] = useState('')

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchClients())
		}
	}, [status, dispatch])

	const handleAddClient = async () => {
		if (!newClientName) return

		await fetch('http://localhost:4000/clients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: newClientName,
			}),
		})

		dispatch(fetchClients())
		setNewClientName('')
	}

	const handleDeleteClient = async (id: number) => {
		await fetch(`http://localhost:4000/clients/${id}`, {
			method: 'DELETE',
		})

		dispatch(fetchClients())
	}

	return (
		<div>
			<h2>Clients</h2>

			<input
				placeholder="Client name"
				value={newClientName}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setNewClientName(e.target.value)
				}
			/>

			<button onClick={handleAddClient}>Add client</button>

			{status === 'loading' && <p>Loading...</p>}

			{status === 'failed' && <p>Error: {error}</p>}

			{status === 'succeeded' && clients.length === 0 && (
				<p>No clients yet</p>
			)}

			{status === 'succeeded' && clients.length > 0 && (
				<ul>
					{clients.map((client: Client) => (
						<li key={client.id}>
							{client.name}
							<button onClick={() => handleDeleteClient(client.id)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}