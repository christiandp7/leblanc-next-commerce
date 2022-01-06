import React, { FC } from 'react'
import Link from 'next/link'
import s from './HeaderLogos.module.css'
import { useUI } from '@components/ui/context'
import { ElPuebloCuestiona, LeblancStudios, RemainSilent } from '@leblanc/svg'
import { motion } from 'framer-motion'

const item_1 = [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const item_2 = [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0]
const item_3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0]

const items_transition = {
  duration: 8,
  repeat: Infinity,
}

const HeaderLogos: FC = () => {
  const { closeMobileSidebarIfPresent } = useUI()

  const handleLinkClick = () => {
    closeMobileSidebarIfPresent()
  }

  return (
    <Link href="/">
      <a aria-label="Leblanc Studios Logo" onClick={handleLinkClick}>
        <div className={s.logoContainer}>
          <motion.span
            animate={{ opacity: item_1 }}
            transition={items_transition}
            className={s.logoItem}>
            <LeblancStudios />
          </motion.span>
          <motion.span
            animate={{ opacity: item_2 }}
            transition={items_transition}
            className={s.logoItem}>
            <RemainSilent />
          </motion.span>
          <motion.span
            animate={{ opacity: item_3 }}
            transition={items_transition}
            className={s.logoItem}>
            <ElPuebloCuestiona />
          </motion.span>
        </div>
      </a>
    </Link>
  )
}

export default HeaderLogos
