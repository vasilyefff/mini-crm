import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Deal } from '../../types/deal'

interface DealsState {
	deals: Deal[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: DealsState = {
	deals: [],
	status: 'idle',
	error: null,
}

export const fetchDeals = createAsyncThunk<Deal[]>(
	'deals/fetchDeals',
	async () => {
		const response = await fetch('https://mini-crm-api-s2zd.onrender.com/deals')

		if (!response.ok) {
			throw new Error('Failed to fetch deals')
		}

		return response.json()
	}
)

export const addDeal = createAsyncThunk<Deal, Deal>(
	'deals/addDeal',
	async (deal: Deal) => {
		const response = await fetch('https://mini-crm-api-s2zd.onrender.com/deals', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(deal),
		})

		if (!response.ok) {
			throw new Error('Failed to add deal')
		}

		return response.json()
	}
)

export const deleteDeal = createAsyncThunk<number, number>(
	'deals/deleteDeal',
	async (id: number) => {
		const response = await fetch(`https://mini-crm-api-s2zd.onrender.com/deals/${id}`, {
			method: 'DELETE',
		})

		if (!response.ok) {
			throw new Error('Failed to delete deal')
		}

		return id
	}
)

const dealsSlice = createSlice({
	name: 'deals',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDeals.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchDeals.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.deals = action.payload
			})
			.addCase(fetchDeals.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || 'Something went wrong'
			})

			.addCase(addDeal.fulfilled, (state, action) => {
				state.deals.push(action.payload)
			})

			.addCase(deleteDeal.fulfilled, (state, action) => {
				state.deals = state.deals.filter(
					deal => deal.id !== action.payload
				)
			})
	},
})

export default dealsSlice.reducer