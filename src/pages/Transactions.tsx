import { Header } from '../components/Header'
import { Summary } from '../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { TransactionContext } from '../contexts/TransactionContext'
import { dateFormatter, priceFormatter } from '../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { Pagination } from '../components/Pagination'

export function Transactions() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transacion) => (
              <tr key={transacion.id}>
                <td width="50%">{transacion.description}</td>
                <td>
                  <PriceHighlight variant={transacion.type}>
                    {transacion.type === 'outcome' && '- '}
                    {priceFormatter.format(transacion.price)}
                  </PriceHighlight>
                </td>
                <td>{transacion.category}</td>
                <td>{dateFormatter.format(new Date(transacion.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
      <Pagination />
    </div>
  )
}
