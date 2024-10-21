import React from 'react'

function Socials() {
  return (
    <div className='w-full h-24 bg-[#FAFAFA] flex flex-col justify-center md:flex-row md:justify-around md:gap-96  md:items-center'>
        <div className="text-xl font-bold ml-9 text-[#252B42]">Bandage</div>
        <div className='ml-8 flex gap-4 mt-6 mb-2 text-[#23A6F0] md:mt-0'>
            <i className="fa-brands fa-facebook fa-lg"></i>
            <i className="fa-brands fa-instagram fa-lg"></i>
            <i className="fa-brands fa-twitter fa-lg"></i>
        </div>
    </div>
  )
}

export default Socials