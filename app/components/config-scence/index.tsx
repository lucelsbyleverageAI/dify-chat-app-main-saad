import type { FC } from 'react'
import React from 'react'
import type { IWelcomeProps } from '../welcome'
import Welcome from '../welcome'

const ConfigSence: FC<IWelcomeProps> = (props) => {
  return (
    // mb-5 antialiased font-sans overflow-hidden shrink-0
    <div className='font-sans'>
      <Welcome {...props} />
    </div>
  )
}
export default React.memo(ConfigSence)
