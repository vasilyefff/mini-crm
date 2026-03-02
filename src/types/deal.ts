export type DealStatus = 'new' | 'in-progress' | 'done'

export type Deal = {
  id: number
  title: string
  amount: number
  status: DealStatus
  clientId: number
}
