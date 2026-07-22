import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const initialForm = {
  full_name: '',
  nik: '',
  email: '',
  phone: '',
  address: '',
  ktp: '',
  password: '',
  confirmPassword: '',
};

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('Konfirmasi password tidak sama');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      const res = await registerUser(payload);
      setSuccess(res.message || 'Registrasi berhasil, menunggu verifikasi admin.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message || 'Gagal mendaftar. Silakan coba lagi.');
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
          Pendaftaran Anggota
        </span>
        <h1 className="text-3xl font-bold mb-3 text-amber-100">Buat Akun Baru</h1>
        <p className="text-emerald-100/80 max-w-sm leading-relaxed">
          Daftar sebagai anggota untuk mulai meminjam buku. Akun akan diverifikasi oleh admin
          sebelum dapat melakukan transaksi peminjaman.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-emerald-900/10 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-emerald-950 mb-1">Buat Akun</h2>
            <p className="text-sm text-emerald-800/70">Daftar sebagai anggota Perpustakaan Digital</p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-medium px-4 py-3">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-semibold text-emerald-950 mb-1.5">Nama Lengkap</span>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Nama lengkap"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-semibold text-emerald-950 mb-1.5">NIK</span>
                <input
                  type="text"
                  name="nik"
                  placeholder="Nomor Induk Kependudukan"
                  value={form.nik}
                  onChange={handleChange}
                  maxLength={20}
                  required
                  className="w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </label>
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-semibold text-emerald-950 mb-1.5">No. HP</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="08xxxxxxxxxx"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={15}
                  className="w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-semibold text-emerald-950 mb-1.5">Nomor KTP</span>
                <input
                  type="text"
                  name="ktp"
                  placeholder="Nomor KTP (opsional)"
                  value={form.ktp}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-sm font-semibold text-emerald-950 mb-1.5">Alamat</span>
              <input
                type="text"
                name="address"
                placeholder="Alamat lengkap"
                value={form.address}
                onChange={handleChange}
                className="w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-semibold text-emerald-950 mb-1.5">Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Minimal 6 karakter"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                  className="w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-semibold text-emerald-950 mb-1.5">Konfirmasi Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Ulangi password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                  className="w-full rounded-2xl border border-emerald-900/15 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-950 hover:bg-emerald-900 border border-amber-500/40 text-amber-400 font-bold py-3 text-sm mt-2 shadow-md transition-all disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          <p className="text-center text-sm text-emerald-800/70 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-amber-600 hover:text-amber-700 font-semibold transition">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;