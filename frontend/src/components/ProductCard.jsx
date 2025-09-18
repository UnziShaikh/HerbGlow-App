import React from 'react'

export default function ProductCard({ product }){
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="h-40 rounded-md bg-gradient-to-br from-[#FFF5E6] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold">{product.name}</div>
          <div className="text-sm mt-2">{product.description}</div>
          <div className="mt-3 font-bold">${product.price}</div>
        </div>
      </div>
    </div>
  )
}
