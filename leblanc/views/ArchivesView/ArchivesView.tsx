import React, { FC } from 'react'
import s from './ArchivesView.module.css'
import cn from 'classnames'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { MainLayout } from '@leblanc/layouts'
import type { Archive, ArchiveImage } from '@leblanc/data/archives'
import { ArchiveSlider } from '@leblanc/components/Archives'

interface Props {
  archive: Archive
}

const ArchivesView: FC<Props> = ({ archive }) => {
  // if (!archive) {
  //   return null
  // }

  const SvgCollection =
    archive.abbrSvg &&
    dynamic(() => import(`@leblanc/svg/archives/${archive.abbrSvg}.tsx`))

  return (
    <MainLayout>
      <div className={cn(s.headingSection, s.container)}>
        <div className={s.headingRow}>
          <h1 className={s.title}>{archive.name}</h1>
          <h1 className={s.shortText}>{archive.shortText}</h1>
        </div>
        <div className={s.richText}>{archive.richText}</div>
      </div>
      <div className={s.slideshowSection}>
        {archive.images && archive.images.length > 0 && (
          <>
            <ArchiveSlider images={archive.images} credits={archive.credits!} />
          </>
        )}
      </div>
      <div className={s.creditsSection}></div>
      {SvgCollection && (
        <div className={cn(s.bigAbbrSection, s.container)}>
          <SvgCollection />
        </div>
      )}
      {archive.images && (
        <div className={cn(s.gallerySection, s.container)}>
          {archive.images.map((img: ArchiveImage) => {
            return (
              <div key={img.src} className={s.galleryItem}>
                <Image
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  layout="responsive"
                />
              </div>
            )
          })}
        </div>
      )}
    </MainLayout>
  )
}

export default ArchivesView
