import type { FC } from 'react'
import React from 'react'

import { PencilSquareIcon } from '@heroicons/react/20/solid'
import s from '@/app/components/welcome/style.module.css'
import Button from '@/app/components/base/button'
import AppIcon from '@/app/components/base/app-icon'
export type IHeaderProps = {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}
const Header: FC<IHeaderProps> = ({

  isMobile,
  // onShowSideBar,
  onCreateNewChat,
}) => {
  return (
    <div className={`${s.headerBorder} shrink-0 flex items-center justify-between h-[80px]    border-l-0 border-r-0 border-t-0 text-[003250]   px-3 bg-white`}>
      {isMobile
        ? (
          <div className='mr-1 flex items-center justify-center h-8 w-8 cursor-pointer'
            onClick={() => onCreateNewChat?.()}
          >
            <PencilSquareIcon className="h-4 w-4  text-gray-500" />
            {/* <Button className='ml-[150px] flex items-center justify-center px-4 py-2 border-2 border-[#6FFFE6] text-[#003250] bg-white rounded-full hover:bg-[#003250] hover:border-[#003250] hover:text-[#6FFFE6] transition duration-300 whitespace-nowrap'>{'Start New Chat'}</Button> */}
          </div>)
        : <div className='flex items-center justify-center h-8 w-15 cursor-pointer'
          onClick={() => onCreateNewChat?.()}
        >
          <Button className={`${s.customColor} flex items-center justify-center  border border-1 border-secColor text-primaryColor bg-white rounded-full  hover:border-customDarkBlue hover:text-secColor transition duration-300 whitespace-nowrap`} >{'Start New Chat'}</Button>
          {/* <PencilSquareIcon className="h-4 w-4 text-gray-500" /> */}
        </div>
      }

      {/* {isMobile
        ? (
          <div
            className='flex items-center justify-center h-8 w-8 cursor-pointer'
            onClick={() => onShowSideBar?.()}
          >
            <Bars3Icon className="h-4 w-4 text-gray-500" />
          </div>
        )
        : <div></div>} */}
      {/*  removed classes flex items-start space-x-4 ml-0 */}
      <div className=" flex-grow flex items-center justify-center    p-0 ">
        <AppIcon size="small" className={'s.headerIcon'} />
        <div className={`${s.headerHdg}  font-sans text-[#003250]   `}>
          LINK PRODUCT DESIGN ASSISTANT (COCA-COLA)
        </div>
      </div>

    </div>
  )
}

export default React.memo(Header)
