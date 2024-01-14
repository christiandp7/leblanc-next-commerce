import { FC } from 'react'
import Link from 'next/link'
import s from './NewNavbar.module.css'
import NavbarRoot from '../Navbar/NavbarRoot'
import { useUI } from '@components/ui/context'
import useCart from '@framework/cart/use-cart'
import type { LineItem } from '@commerce/types/cart'
import { Logo, Container } from '@components/ui'
import { CartIcon } from '@leblanc/icons'
import usePrice from '@commerce/product/use-price'
import { Searchbar, UserNav } from '@components/common'
import { HeaderLogos } from '@leblanc/components/common'

interface Link {
  href: string
  label: string
}
interface NavbarProps {
  links?: Link[]
}

const countItem = (count: number, item: LineItem) => count + item.quantity

const Navbar: FC<NavbarProps> = ({ links }) => {
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
  const { data } = useCart()

  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0

  // totalPrice
  const { price: totalPrice } = usePrice({
    amount: data?.lineItemsSubtotalPrice || 0,
    baseAmount: data?.lineItemsSubtotalPrice || 0,
    currencyCode: data?.currency.code!,
  })

  return (
    <NavbarRoot>
      <Container>
        <div className={s.nav}>
          <div className="flex items-center flex-1">
            <HeaderLogos />
          </div>
          {process.env.COMMERCE_SEARCH_ENABLED && (
            <div className="justify-center flex-1 hidden lg:flex">
              <Searchbar />
            </div>
          )}
          <ul className="flex items-center justify-end flex-1 space-x-8">
            <li>HISTORIA</li>
            <li>Bag</li>
            <button
              className={s.cartButton}
              onClick={toggleSidebar}
              aria-label="open cart">
              <span className="relative">
                <span className={s.cartItemsCounter}>
                  {itemsCount > 0 ? itemsCount : 0}
                </span>
                <CartIcon width={28} className={s.cartIcon} />
              </span>
              <span className={s.totalPrice}>
                <span> {totalPrice}</span>
              </span>
            </button>
          </ul>
        </div>
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
