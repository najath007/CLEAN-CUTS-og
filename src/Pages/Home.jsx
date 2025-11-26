import React from 'react'
import { menProduct } from '../data/menProduct'
import ProductCard from '../components/ProductCard'

function Home() {
  return (
    
    <div>
      <div>
        <img src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/category/catban-820250703225203.jpg?w=1500&dpr=1.3" alt="" />
      </div>
      <div className="flex justify-center items-center gap-5 my-10 flex-wrap">
        {menProduct.map(item=>(
          <ProductCard 
            key={item.id}
            image={item.image}
            tittle={item.tittle}
            desc={item.desc}
            price={item.price}
            rating={item.rating}
            />
        ))}
      </div>
    </div>
    
  )
}

export default Home
