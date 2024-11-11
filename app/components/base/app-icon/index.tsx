import type { FC } from 'react'
import classNames from 'classnames'

import Image from 'next/image'
import style from './style.module.css'
import headerImage from '@/public/link-logo.svg'
// import headerImage from '../public/link_worldwide_logo (2).jpeg'

export type AppIconProps = {
  size?: 'xs' | 'tiny' | 'small' | 'medium' | 'large'
  rounded?: boolean
  icon?: string
  background?: string
  className?: string
}

const AppIcon: FC<AppIconProps> = ({
  size = 'medium',
  rounded = false,
  // background,
  className,
}) => {
  return (
    <span
      className={classNames(
        // style.appIcon,
        size !== 'medium' && style[size],
        rounded && style.rounded,
        className ?? '',
      )}
      style={{
        // background,
      }}
    >
      <Image src={headerImage} alt="Header Image" width={100} height={100}
        className="w-12 h-8 rounded-md object-fit ml-0"
      />
    </span>
  )
}

export default AppIcon
