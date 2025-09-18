import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AuthForm from './components/AuthForm'
import ProductCard from './components/ProductCard'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App(){
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('og_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    axios.get(`${API}/api/products`).then(r => setProducts(r.data)).catch(()=>{});
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#333]">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{color:'#6AA84F'}}>HerbGlow</h1>
          <div>
            {user ? <span>Welcome, {user.name}</span> : <AuthForm onAuth={u=>{ setUser(u); localStorage.setItem('og_user', JSON.stringify(u)); }} />}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl font-extrabold">Natural soaps made with love</h2>
            <p className="mt-4 text-lg">Handmade, palm-oil free, and scented with pure essential oils.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <p className="font-medium">Try our favorites</p>
            <div className="mt-4 space-y-3">
              {products.slice(0,3).map(p=> <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">All products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p=> <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </main>
    </div>
  )
}
