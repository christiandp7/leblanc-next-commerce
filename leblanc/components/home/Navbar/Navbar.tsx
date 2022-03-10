import React, { FC, useState, useEffect } from 'react'
import cn from 'classnames'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { SearchIcon } from '@leblanc/icons'
import { LogoHorizontal } from '@leblanc/svg'
import s from './Navbar.module.css'
import animation from './animations'
import ClickOutside from '@lib/click-outside'
import { homeNavigation } from '@leblanc/data/navigation'
import type { NavItem } from '@leblanc/data/navigation'
import { NavPanel } from '@leblanc/components/home'
import { BsChevronDown } from 'react-icons/bs'
import { useMediaQuery } from 'react-responsive'

const Navbar: FC = () => {
  const isNotebook = useMediaQuery({ query: '(max-width: 1279px)' })
  const [activeItem, setActiveItem] = useState('')
  const [activeItemChild, setActiveItemChild] = useState('')

  const [label, setLabel] = useState<React.ReactNode | string>('')
  const [childLabel, setChildLabel] = useState<React.ReactNode | string>('')

  const handleActiveItem = (event: React.MouseEvent, target: NavItem) => {
    event.preventDefault()
    setActiveItem(target.id)
    setLabel(target.label)
    setActiveItemChild('') // provisional fixing
    setChildLabel('') // provisional fixing
  }

  const handleClickOutside = () => {
    setActiveItem('')
    setActiveItemChild('')
  }

  useEffect(() => {
    if (activeItem === '') {
      setLabel('')
    }
    if (activeItemChild === '') {
      setChildLabel('')
    }
  }, [activeItem, activeItemChild])

  return (
    <div className={s.root}>
      <ClickOutside
        active={activeItem === '' ? false : true}
        onClick={handleClickOutside}>
        <motion.div
          initial="exit"
          animate={activeItem ? 'enter' : 'exit'}
          variants={animation.navbar}
          className={s.navbar}>
          <motion.div
            className={s.topRow}
            initial="exit"
            animate={activeItem ? 'enter' : 'exit'}
            variants={isNotebook ? animation.topRowTablet : animation.topRow}>
            <div className={s.toolbar}>
              <ul className={s.menu}>
                {homeNavigation.map((navItem: NavItem) => (
                  <React.Fragment key={navItem.id}>
                    {navItem.noNav ? null : (
                      <li>
                        {navItem.childs && !navItem.forceHref ? (
                          <a href="#" onClick={e => handleActiveItem(e, navItem)}>
                            {navItem.label}
                          </a>
                        ) : (
                          <NextLink href={navItem.href || ''}>
                            <a>{navItem.label}</a>
                          </NextLink>
                        )}
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
              <div className={s.search}>
                <form>
                  <div className={s.searchGroup}>
                    <input
                      type="text"
                      name="search"
                      id=""
                      placeholder="search..."
                      className={s.searchInput}
                    />
                    <button type="submit" className={s.searchButton}>
                      <SearchIcon />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <motion.div
              initial="exit"
              animate={activeItem ? 'enter' : 'exit'}
              variants={animation.collapse}
              className={cn(s.collapse, s.collapseTop)}>
              <div className={s.collapseTopContent}>
                <NavPanel
                  navItems={homeNavigation}
                  activeItem={activeItem}
                  activeItemChild={activeItemChild}
                  setActiveItemChild={setActiveItemChild}
                  setChildLabel={setChildLabel}
                />
              </div>
              <motion.div
                initial="exit"
                animate={activeItem ? 'enter' : 'exit'}
                variants={animation.rightBar}
                className={s.rightBar}>
                <motion.span
                  initial="exit"
                  animate={activeItem ? 'enter' : 'exit'}
                  variants={animation.breadcrumbs}
                  className={s.breadcrumbs}>
                  {label}
                  {childLabel && (
                    <span className={s.chevronDown}>
                      <BsChevronDown size={10} />
                    </span>
                  )}
                  {childLabel}
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            initial="exit"
            animate={activeItem ? 'enter' : 'exit'}
            variants={isNotebook ? animation.bottomRowTablet : animation.bottomRow}
            className={s.bottomRow}>
            <motion.div
              initial="exit"
              animate={activeItem ? 'enter' : 'exit'}
              variants={animation.collapse}
              className={cn(s.collapse, s.collapseBottom)}>
              <motion.div
                initial="exit"
                animate={activeItem ? 'enter' : 'exit'}
                variants={animation.rightBar}
                className={s.rightBar}></motion.div>
            </motion.div>
            <motion.div
              initial="exit"
              animate={activeItem ? 'enter' : 'exit'}
              variants={animation.bottomRowFooter}
              className={s.bottomRowFooter}>
              <LogoHorizontal width={120} height="auto" />
            </motion.div>
          </motion.div>
        </motion.div>
      </ClickOutside>
    </div>
  )
}

export default Navbar
