import { memo } from 'react'
import logoImage from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

/**
 * Por que um componente renderiza?
 * - Hooks changed (mudou estadom contexto, reducer);
 * - Props changed (mundou propriedades);
 * - Parent rerendered (componente pai rerenderizou);
 *
 * Qual o fluxo de renderização?
 * 1. O React recria o HTML da interface daquele componente
 * 2. Compara a versão do HTML recriada com a versão anterior
 * 3. SE mudou alguma coisa, ele reescreve h HTML na tela
 *
 * Memo:
 * 0. Hooks changed, Props changed (deep comparison)
 * 0.1: Comparar a versão anterior dos hooks e props
 * 0.2: SE mudou algo, ele avi permitir a nova renderização
 */

/**
 * Na maioria das vezes não vale a pena utilizar o memo,
 * pois o custo em performance pode ser muito maior comparando hooks e props do que recrirar um HTML simples
 */

// EXEMPLO PURAMENTE DIDÁTICO DE COMO IMPLEMENTAR O MEMO

function HeaderComponent() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImage} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton type="button">
              Nova transação
            </NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}

export const Header = memo(HeaderComponent)
