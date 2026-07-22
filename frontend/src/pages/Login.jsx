import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, saveSession } from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser(form);
      saveSession(res.data.token);
      
      // Jika backend mengirimkan role user, redirect sesuai role
      if (res.data?.user?.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Login gagal. Silakan periksa kredensial Anda.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-emerald-50/40">
      {/* Left Banner Section (Hijau Tua Mewah + Emas) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white flex-col justify-center px-16 border-r border-amber-500/30 relative overflow-hidden">
        {/* Element Aksen Lingkaran Emas Tipis */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="w-14 h-14 rounded-2xl bg-emerald-900 border border-amber-500/40 flex items-center justify-center font-bold text-2xl text-amber-400 mb-6 shadow-md">
          P
        </div>
        <span className="text-xs uppercase tracking-widest font-semibold text-amber-400 mb-1">
          E-Library Portal
        </span>
        <h1 className="text-3xl font-bold mb-3 text-amber-100">Perpustakaan Digital</h1>
        <p className="text-emerald-100/80 max-w-sm leading-relaxed">
          Pinjam buku, kelola koleksi favorit, dan pantau riwayat peminjamanmu dalam satu platform eksklusif.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-emerald-900/10 shadow-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-950 mb-1">Selamat Datang</h2>
            <p className="text-sm text-emerald-800/70">Masuk untuk melanjutkan ke Perpustakaan Digital</p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-sm font-semibold text-emerald-950 mb-1.5">Email</span>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-emerald-950 mb-1.5">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-950 hover:bg-emerald-900 border border-amber-500/40 text-amber-400 font-bold py-3 text-sm mt-2 shadow-md transition-all disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Masuk Akun'}
            </button>
          </form>

          <p className="text-center text-sm text-emerald-800/70 mt-6">
            Belum punya akun?{' '}
            <Link to="/register" className="text-amber-600 hover:text-amber-700 font-semibold transition">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;