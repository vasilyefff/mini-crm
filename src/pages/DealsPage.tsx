import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import type { Deal, DealStatus } from '../types/deal'
import type { Client } from '../types/client'

const dealStatusColor: Record<DealStatus, string> = {
  new: 'blue',
  'in-progress': 'orange',
  done: 'green',
}

export default function DealsPage() {
  const [dealsList, setDealsList] = useState<Deal[]>([])
  const [clientsList, setClientsList] = useState<Client[]>([])

  useEffect(() => {
    fetch('http://localhost:4000/clients')
      .then((res) => res.json())
      .then((data: Client[]) => setClientsList(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:4000/deals')
      .then((res) => res.json())
      .then((data: Deal[]) => setDealsList(data))
  }, [])

  const [newDealTitle, setNewDealTitle] = useState('')
  const [newDealAmount, setNewDealAmount] = useState('')
  const [dealError, setDealError] = useState('')
  const [selectedClientId, setSelectedClientId] = useState('')

  const handleAddDeal = () => {
    if (!newDealTitle || !newDealAmount || !selectedClientId) {
      setDealError('Title, amount and client are required')
      return
    }

    const newDeal: Deal = {
      id: Date.now(),
      title: newDealTitle,
      amount: Number(newDealAmount),
      status: 'new',
      clientId: Number(selectedClientId),
    }

    setDealsList((prev) => [...prev, newDeal])

    setNewDealTitle('')
    setNewDealAmount('')
    setSelectedClientId('')
    setDealError('')
  }

  const handleDeleteDeal = (id: number) => {
    setDealsList((prev) => prev.filter((deal) => deal.id !== id))
  }

  return (
    <div>
      <h2>Deals</h2>

      {dealError && <p style={{ color: 'red' }}>{dealError}</p>}

      <input
        type="text"
        placeholder="Deal title"
        value={newDealTitle}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDealTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={newDealAmount}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDealAmount(e.target.value)}
      />

      <select
        value={selectedClientId}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedClientId(e.target.value)}
        disabled={clientsList.length === 0}
      >
        <option value="">{clientsList.length === 0 ? 'Add client first' : 'Select client'}</option>

        {clientsList.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <button onClick={handleAddDeal}>Add deal</button>

      {dealsList.length === 0 ? (
        <p>No deals yet</p>
      ) : (
        <ul>
          {dealsList.map((deal) => {
            const client = clientsList.find((c) => c.id === deal.clientId)

            return (
              <li key={deal.id}>
                {deal.title} — {client?.name || 'Unknown'} — ${deal.amount} —{' '}
                <span style={{ color: dealStatusColor[deal.status] }}>{deal.status}</span>
                <button onClick={() => handleDeleteDeal(deal.id)}>Delete</button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
