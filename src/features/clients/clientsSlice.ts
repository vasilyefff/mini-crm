import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Client } from '../../types/client'

interface ClientsState {
	clients: Client[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: ClientsState = {
	clients: [],
	status: 'idle',
	error: null,
}


export const fetchClients = createAsyncThunk<Client[]>(
	'clients/fetchClients',
	async () => {
		const response = await fetch('https://mini-crm-api-s2zd.onrender.com/clients')

		if (!response.ok) {
			throw new Error('Failed to fetch clients')
		}

		return response.json()
	}
)

export const addClient = createAsyncThunk<Client, string>(
	'clients/addClient',
	async (name: string) => {
		const response = await fetch('https://mini-crm-api-s2zd.onrender.com/clients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }),
		})

		if (!response.ok) {
			throw new Error('Failed to add client')
		}

		return response.json()
	}
)

export const deleteClient = createAsyncThunk<number, number>(
	'clients/deleteClient',
	async (id: number) => {
		const response = await fetch(`https://mini-crm-api-s2zd.onrender.com/clients/${id}`, {
			method: 'DELETE',
		})

		if (!response.ok) {
			throw new Error('Failed to delete client')
		}

		return id
	}
)

const clientsSlice = createSlice({
	name: 'clients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClients.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchClients.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.clients = action.payload
			})
			.addCase(fetchClients.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || 'Something went wrong'
			})

			.addCase(addClient.fulfilled, (state, action) => {
				state.clients.push(action.payload)
			})

			.addCase(deleteClient.fulfilled, (state, action) => {
				state.clients = state.clients.filter(
					client => client.id !== action.payload
				)
			})
	},
})

export default clientsSlice.reducer