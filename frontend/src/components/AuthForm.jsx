import React, { useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AuthForm({ onAuth }){
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const url = `${API}/api/auth/${mode}`;
      const payload = mode === 'signup' ? { name, email, password } : { email, password };
      const res = await axios.post(url, payload);
      onAuth(res.data.user);
      localStorage.setItem('og_token', res.data.token);
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="inline-block">
      <form onSubmit={submit} className="flex items-center space-x-3">
        {mode==='signup' && <input required className="border rounded px-2 py-1" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />}
        <input required type="email" className="border rounded px-2 py-1" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input required type="password" className="border rounded px-2 py-1" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-3 py-1 rounded" style={{background:'#6AA84F', color:'#fff'}}>{mode==='login' ? 'Login' : 'Sign up'}</button>
        <button type="button" className="underline ml-2 text-sm" onClick={()=> setMode(mode==='login' ? 'signup' : 'login')}>{mode==='login' ? 'Create account' : 'Have account?'}</button>
      </form>
      {msg && <p className="text-red-600 mt-2">{msg}</p>}
    </div>
  )
}
