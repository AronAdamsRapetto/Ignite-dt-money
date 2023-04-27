import { ReactNode, useCallback, useEffect, useState } from 'react'
import { API } from '../lib/axios'
import { createContext } from 'use-context-selector'

export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface NewTransactionData {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
}

interface TransanctionContextType {
  transactions: Transaction[]
  fetchTransactions: (page?: string, query?: string) => Promise<void>
  createNewTransaction: (data: NewTransactionData) => Promise<void>
  queryTransactions: (query: string) => Promise<void>
  currentQuery: string
  currentPage: string
}

interface TransactionContextProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransanctionContextType)

export function TransactionContextProvider({
  children,
}: TransactionContextProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentQuery, setCurrentQuery] = useState('')
  const [currentPage, setCurrentPage] = useState('1')

  const createNewTransaction = useCallback(async (data: NewTransactionData) => {
    const response = await API.post('/transactions', {
      ...data,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }, [])

  const fetchTransactions = useCallback(
    async (page = currentPage, query = currentQuery) => {
      const response = await API.get(`/transactions`, {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
          _page: page,
          _limit: page ? '10' : '',
        },
      })
      if (page) setCurrentPage(page)
      setTransactions(response.data)
    },
    [currentQuery, currentPage],
  )

  const queryTransactions = useCallback(
    async (query: string) => {
      setCurrentQuery(query)
      await fetchTransactions('1', query)
    },
    [fetchTransactions],
  )

  useEffect(() => {
    fetchTransactions(currentPage)
  }, [fetchTransactions, currentPage])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createNewTransaction,
        queryTransactions,
        currentQuery,
        currentPage,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
