import React from 'react'

const Button = ( {text} ) => {
  return (
    <button className='w-[150px] py-1 bg-white text-lg text-black capitalize hover:shadow-[inset_152px_0_0_0_rgba(12,34,244,0.7)] hover:transition-shadow hover:duration-[700ms] hover:text-white transition-shadow duration-[700ms]'>{text}</button>
  )
}

export default Button