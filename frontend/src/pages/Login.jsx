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
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand to-violet-700 text-white flex-col justify-center px-16">
        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center font-bold text-xl mb-6">
          P
        </div>
        <h1 className="text-3xl font-bold mb-3">Perpustakaan Digital</h1>
        <p className="text-white/80 max-w-sm">
          Pinjam buku, kelola koleksi favorit, dan pantau riwayat peminjamanmu dalam satu tempat.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Selamat Datang</h2>
            <p className="text-sm text-slate-500">Masuk untuk melanjutkan ke Perpustakaan Digital</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 text-red-600 text-sm font-medium px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-sm font-semibold text-slate-600 mb-1.5">Email</span>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white transition-colors"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-slate-600 mb-1.5">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white transition-colors"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand text-white font-semibold py-3 text-sm mt-2 disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Belum punya akun?{' '}
            <Link to="/register" className="text-brand font-semibold">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
