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
    console.log("handleSubmit dipanggil");
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser(form);
      
      console.log("CEK DATA DARI BACKEND:", res);
      
      // 1. Tarik token dan user sesuai struktur objek dari backend
      const token = res.token;          // Token ada di luar (sejajar dengan success & message)
      const user = res.data;            // Data profil/role dibungkus di dalam key "data"

      // Pastikan data user terbaca sebelum lanjut
      if (!user) {
         throw new Error("Data user tidak ditemukan dari server.");
      }

      // 2. Simpan ke LocalStorage
      saveSession(token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // 3. Standarisasi format role ke huruf besar (Uppercase)
      const userRole = user.role ? user.role.toUpperCase() : '';

      // 4. Eksekusi Navigasi
      if (userRole === 'ADMIN') {
        navigate('/admin/dashboard'); 
      } else {
        navigate('/'); 
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login gagal. Silakan periksa kredensial Anda.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ backgroundColor: '#FDFBF7' }} className="min-h-screen flex text-stone-900">
      {/* Left Banner Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-amber-50/80 text-stone-900 flex-col justify-center px-16 border-r border-black relative overflow-hidden">
        {/* Element Aksen Dekoratif */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-200/50 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-300/30 blur-3xl pointer-events-none"></div>

        <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-black flex items-center justify-center font-headline font-bold text-2xl text-stone-950 mb-6 shadow-xs">
          P
        </div>
        <span className="text-xs uppercase tracking-widest font-label font-bold text-amber-800 mb-1">
          E-Library Portal
        </span>
        <h1 className="text-3xl font-headline font-bold mb-3 text-stone-950">Perpustakaan Digital</h1>
        <p className="font-body text-stone-700 max-w-sm leading-relaxed">
          Pinjam buku, kelola koleksi favorit, dan pantau riwayat peminjamanmu dalam satu platform eksklusif.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-10" style={{ backgroundColor: '#FDFBF7' }}>
        <div className="w-full max-w-sm bg-amber-50/40 p-8 rounded-3xl border border-black shadow-xs">
          <div className="mb-8">
            <h2 className="text-2xl font-headline font-bold text-stone-950 mb-1">Selamat Datang</h2>
            <p className="text-sm font-body text-stone-600">Masuk untuk melanjutkan ke Perpustakaan Digital</p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl bg-rose-50 border border-rose-400 text-rose-700 text-sm font-medium px-4 py-3 shadow-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-body">
            <label className="block">
              <span className="block text-sm font-label font-semibold text-stone-900 mb-1.5">Email</span>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-black bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-stone-900/20 transition-all shadow-xs"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-label font-semibold text-stone-900 mb-1.5">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-black bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-stone-900/20 transition-all shadow-xs"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-amber-100 hover:bg-amber-200 border border-black text-stone-950 font-label font-bold py-3 text-sm mt-2 shadow-xs transition-all disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Masuk Akun'}
            </button>
          </form>

          <p className="text-center text-sm font-body text-stone-600 mt-6">
            Belum punya akun?{' '}
            <Link to="/register" className="font-label text-stone-950 hover:underline font-bold transition">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;