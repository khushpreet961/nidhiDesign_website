'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
     if (data.success) {
  localStorage.setItem("isOwner", "true");

  window.location.href = "/";
}
       else {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#1a1210] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Nidhi Designs</h1>
        <p className="text-[#6b5c4e] mb-8">Admin Panel — Owner Access Only</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#1a1210] mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} placeholder="Enter admin password" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[#1a1210] focus:outline-none focus:border-[#d97706]" />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button onClick={handleLogin} disabled={loading} className="w-full bg-[#d97706] text-white py-3 rounded-lg font-medium hover:bg-[#b45309] transition-colors disabled:opacity-50">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}