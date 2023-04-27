import styled, { css } from 'styled-components'

export const FooterContainer = styled.footer`
  width: 100%;
  max-width: 1120px;
  display: flex;
  justify-content: center;
  padding: 2.5rem 0;
  margin: auto;
`

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

export const ControllPaginationButton = styled.button`
  background: transparent;
  border: 0;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme['green-500']};
  cursor: pointer;

  &:disabled {
    color: ${(props) => props.theme['gray-600']};
    cursor: not-allowed;
  }
`

export const PageButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

interface PageButtonsProps {
  selected: boolean
}

export const PageButton = styled.button<PageButtonsProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: ${(props) => props.theme['gray-600']};
  color: ${(props) => props.theme['gray-400']};
  border-radius: 6px;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;

  ${(props) => {
    if (props.selected)
      return css`
        background: ${props.theme['green-700']};
        color: ${props.theme['gray-100']};
      `
  }}
`
