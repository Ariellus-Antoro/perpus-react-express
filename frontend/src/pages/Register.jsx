import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    nik: '',
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    ktpFile: null
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      ktpFile: e.target.files[0] 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Konfirmasi password tidak sama');
      return;
    }
    
    setLoading(true);

    const submitData = new FormData();
    submitData.append('nik', formData.nik);
    submitData.append('full_name', formData.full_name);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    submitData.append('phone', formData.phone);
    submitData.append('address', formData.address);
    
    if (formData.ktpFile) {
      submitData.append('ktp', formData.ktpFile);
    } else {
      setErrorMsg('Foto KTP wajib diunggah!');
      setLoading(false);
      return;
    }

    try {
      // Mengirimkan data registrasi dengan FormData dan header multipart
      const res = await axios.post('http://localhost:8000/api/auth/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      
      setSuccessMsg(res.data.message || 'Pendaftaran berhasil! Silakan tunggu persetujuan Admin.');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Gagal mendaftar. Silakan coba lagi.';
      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FDFBF7' }} className="min-h-screen flex text-stone-900 font-body">
      {/* Left Banner Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-amber-50/80 text-stone-900 flex-col justify-center px-16 border-r border-black relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-200/50 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-300/30 blur-3xl pointer-events-none"></div>

        <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-black flex items-center justify-center font-headline font-bold text-2xl text-stone-950 mb-6 shadow-xs">
          P
        </div>
        <span className="text-xs uppercase tracking-widest font-label font-bold text-amber-800 mb-1">
          Pendaftaran Anggota
        </span>
        <h1 className="text-3xl font-headline font-bold mb-3 text-stone-950">Buat Akun Baru</h1>
        <p className="font-body text-stone-700 max-w-sm leading-relaxed">
          Daftar sebagai anggota untuk mulai meminjam buku. Akun akan diverifikasi oleh admin
          sebelum dapat melakukan transaksi peminjaman.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-10" style={{ backgroundColor: '#FDFBF7' }}>
        <div className="w-full max-w-md bg-amber-50/40 p-8 rounded-3xl border border-black shadow-xs">
          <div className="mb-6">
            <h2 className="text-2xl font-headline font-bold text-stone-950 mb-1">Buat Akun</h2>
            <p className="text-sm font-body text-stone-600">Daftar sebagai anggota Perpustakaan Digital</p>
          </div>

          {errorMsg && (
            <div className="mb-5 rounded-2xl bg-rose-50 border border-rose-400 text-rose-700 text-sm font-medium px-4 py-3 shadow-xs">
              {errorMsg}
            </div>
          )}
          
          {successMsg && (
            <div className="mb-5 rounded-2xl bg-amber-100 border border-black text-stone-950 text-sm font-medium px-4 py-3 shadow-xs">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-body">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-label font-semibold text-stone-900 mb-1.5">Nama Lengkap</span>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Nama lengkap"
                  value={formData.full_name} 
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-black bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-stone-900/20 transition-all shadow-xs"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-label font-semibold text-stone-900 mb-1.5">NIK</span>
                <input
                  type="text"
                  name="nik"
                  placeholder="Nomor Induk Kependudukan"
                  value={formData.nik}
                  onChange={handleChange}
                  maxLength={20}
                  required
                  className="w-full rounded-2xl border border-black bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-stone-900/20 transition-all shadow-xs"
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-sm font-label font-semibold text-stone-900 mb-1.5">Email</span>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-black bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-stone-900/20 transition-all shadow-xs"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-label font-semibold text-stone-900 mb-1.5">No. HP</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={15}
                  className="w-full rounded-2xl border border-black bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-stone-900/20 transition-all shadow-xs"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-label font-semibold text-stone-900 mb-1">
                Upload Foto KTP
              </label>
              <input
                type="file"
                name="ktp"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full px-3.5 py-1.5 text-sm border border-black rounded-xl bg-white focus:outline-none text-stone-900 shadow-xs file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border file:border-black file:text-xs file:font-label file:font-bold file:bg-amber-100 file:text-stone-950 hover:file:bg-amber-200 cursor-pointer"
              />
            </div>

            <label className="block">
              <span className="block text-sm font-label font-semibold text-stone-900 mb-1.5">Alamat</span>
              <input
                type="text"
                name="address"
                placeholder="Alamat lengkap"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-stone-900/20 transition-all shadow-xs"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-label font-semibold text-stone-900 mb-1.5">Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Minimal 6 karakter"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                  className="w-full rounded-2xl border border-black bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-stone-900/20 transition-all shadow-xs"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-label font-semibold text-stone-900 mb-1.5">Konfirmasi Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                  className="w-full rounded-2xl border border-black bg-white px-4 py-2.5 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-stone-900/20 transition-all shadow-xs"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-amber-100 hover:bg-amber-200 border border-black text-stone-950 font-label font-bold py-3 text-sm mt-2 shadow-xs transition-all disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          <p className="text-center text-sm font-body text-stone-600 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-label text-stone-950 hover:underline font-bold transition">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}