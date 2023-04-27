import { useCallback, useEffect, useMemo, useState } from 'react'
import { Transaction, TransactionContext } from '../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'
import { API } from '../lib/axios'

export function useSummary() {
  const currentQuery = useContextSelector(TransactionContext, (context) => {
    return context.currentQuery
  })
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])

  const getAllTransactions = useCallback(async () => {
    const response = await API.get(`/transactions`, {
      params: {
        q: currentQuery,
      },
    })

    setAllTransactions(response.data)
  }, [currentQuery])

  useEffect(() => {
    getAllTransactions()
  }, [getAllTransactions])

  /**
   * O useMemo faz com que a variável summary, seja recriada somente quando o valor de transactions mudar,
   * Os cuidados de se utilizar o useMemo são os mesmos que o uso do memo.
   * Um caso de uso possível para o useMemo é um calculo muito complexo e custoso
   */

  // EXEMPLO PURAMENTE DIDÁTICO DE COMO IMPLEMENTAR O useMemo
  const summary = useMemo(() => {
    return allTransactions.reduce(
      (acc, transacion) => {
        if (transacion.type === 'income') acc.income += transacion.price
        if (transacion.type === 'outcome') acc.outcome += transacion.price

        acc.total = acc.income - acc.outcome

        return acc
      },
      { income: 0, outcome: 0, total: 0 },
    )
  }, [allTransactions])

  return summary
}
