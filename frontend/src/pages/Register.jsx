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
        <h1 className="text-3xl font-bold mb-3">Buat Akun Baru</h1>
        <p className="text-white/80 max-w-sm">
          Daftar sebagai anggota untuk mulai meminjam buku. Akun akan diverifikasi oleh admin
          sebelum dapat meminjam.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Buat Akun</h2>
            <p className="text-sm text-slate-500">Daftar sebagai anggota Perpustakaan Digital</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 text-red-600 text-sm font-medium px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-5 rounded-xl bg-green-50 text-green-600 text-sm font-medium px-4 py-3">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-semibold text-slate-600 mb-1.5">Nama Lengkap</span>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Nama lengkap"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white transition-colors"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-semibold text-slate-600 mb-1.5">NIK</span>
                <input
                  type="text"
                  name="nik"
                  placeholder="Nomor Induk Kependudukan"
                  value={form.nik}
                  onChange={handleChange}
                  maxLength={20}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white transition-colors"
                />
              </label>
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-semibold text-slate-600 mb-1.5">No. HP</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="08xxxxxxxxxx"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={15}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white transition-colors"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-semibold text-slate-600 mb-1.5">Nomor KTP</span>
                <input
                  type="text"
                  name="ktp"
                  placeholder="Nomor KTP (opsional)"
                  value={form.ktp}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white transition-colors"
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-sm font-semibold text-slate-600 mb-1.5">Alamat</span>
              <input
                type="text"
                name="address"
                placeholder="Alamat lengkap"
                value={form.address}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white transition-colors"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-semibold text-slate-600 mb-1.5">Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Minimal 6 karakter"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white transition-colors"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-semibold text-slate-600 mb-1.5">Konfirmasi Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Ulangi password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white transition-colors"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand text-white font-semibold py-3 text-sm mt-2 disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-brand font-semibold">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
