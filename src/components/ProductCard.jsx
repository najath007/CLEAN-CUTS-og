import React from 'react'


export default function ProductCard({ image, tittle, desc, price, rating}) {
  return (
    <div>
      <img className='rounded-lg shadow-xl' src={image} alt={tittle} />

      {/* Rating */}
      <div className='t-2'>
        {rating} ★
      </div>

      {/* text content */}
       <h2 className=''> {tittle}</h2>
       <p className=''>{desc}</p>

       {/* price , like */}
       <div className=''>
        <p className=''>₹{price}</p>

        <button className='text-xl'>❤️</button>
       </div>

    </div>
  )
}
