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

// 🔹 Async загрузка клиентов
export const fetchClients = createAsyncThunk<Client[]>(
	'clients/fetchClients',
	async () => {
		const response = await fetch('http://localhost:4000/clients')

		if (!response.ok) {
			throw new Error('Failed to fetch clients')
		}

		return response.json()
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
	},
})

export default clientsSlice.reducer