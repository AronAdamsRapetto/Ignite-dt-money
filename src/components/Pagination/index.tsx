import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from '../../contexts/TransactionContext'
import { useCallback, useEffect, useState } from 'react'
import { API } from '../../lib/axios'
import {
  ControllPaginationButton,
  FooterContainer,
  FooterContent,
  PageButton,
  PageButtonsContainer,
} from './styles'
import { CaretLeft, CaretRight } from 'phosphor-react'

export function Pagination() {
  const { currentQuery, fetchTransactions, currentPage } = useContextSelector(
    TransactionContext,
    (context) => {
      return {
        currentQuery: context.currentQuery,
        fetchTransactions: context.fetchTransactions,
        currentPage: context.currentPage,
      }
    },
  )
  const [pagineList, setPagineList] = useState<number[]>([])

  const isPrevPageButtonDisabled = currentPage === '1'

  const lastPage = pagineList.length.toString()
  const isNextPageButtonDisabled = currentPage === lastPage

  const getPaginateList = useCallback(async () => {
    const response = await API.get(`/transactions`, {
      params: {
        q: currentQuery,
      },
    })

    const totalPagines = Math.ceil(response.data.length / 10)
    const paginateList = []
    let counter = 1

    do {
      paginateList.push(counter)
      counter += 1
    } while (counter <= totalPagines)

    setPagineList(paginateList)
  }, [currentQuery])

  const handleChangePagine = (page: number) => {
    fetchTransactions(page.toString())
  }

  const handleNextPage = () => {
    const nextPage = parseInt(currentPage) + 1

    fetchTransactions(nextPage.toString())
  }

  const handlePrevPage = () => {
    const prevPage = parseInt(currentPage) - 1

    fetchTransactions(prevPage.toString())
  }

  useEffect(() => {
    getPaginateList()
  }, [getPaginateList])

  return (
    <FooterContainer>
      <FooterContent>
        <ControllPaginationButton
          type="button"
          disabled={isPrevPageButtonDisabled}
          onClick={handlePrevPage}
        >
          <CaretLeft size={24} weight="bold" />
        </ControllPaginationButton>
        <PageButtonsContainer>
          {pagineList.map((pagineNumber) => (
            <PageButton
              key={pagineNumber}
              type="button"
              onClick={() => handleChangePagine(pagineNumber)}
              selected={currentPage === pagineNumber.toString()}
            >
              <span>{pagineNumber}</span>
            </PageButton>
          ))}
        </PageButtonsContainer>
        <ControllPaginationButton
          type="button"
          disabled={isNextPageButtonDisabled}
          onClick={handleNextPage}
        >
          <CaretRight size={24} weight="bold" />
        </ControllPaginationButton>
      </FooterContent>
    </FooterContainer>
  )
}
