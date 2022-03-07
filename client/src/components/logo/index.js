import React, { useState } from 'react'
// import { ReactComponent as Arrow } from '../arrow.svg'
import { ReactComponent as Xup } from './x-up.svg'
import { ReactComponent as Xdown } from './x-down.svg'

function Logo() {

  const [logo, setLogo] = useState('')

  let timer = setInterval(() => {
    clearInterval(timer)
    setLogo(

        <div className='flex'>
          <div className='flex items-center -mr-10 animate-neSlide'>NE</div>
          <div>
            <Xdown className='w-36  animate-xdown' />
            <Xup className='w-36 -mt-20 animate-xup' />
          </div>
          <div className='flex items-center -ml-10 animate-usSlide'>US</div>
        </div>
    )

  }, 300);
  return (
    <div style={{transform: 'translateX(100vw)'}} className='w-screen h-40 pointer-events-none scale-150 grid content-center justify-center text-6xl font-thin'>
      {logo}
    </div>
  );


};

export default Logo;