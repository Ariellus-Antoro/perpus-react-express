import { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import Header from "../components/Header";
import { getSession, fetchProfile, updateUserProfile, changeUserPassword } from "../services/api";
import {
  ChevronIcon,
  UserEditIcon,
  LockIcon,
  BellSettingIcon,
  IdCardIcon,
} from "../components/icons";

const settingItems = [
  {
    key: "edit-profil",
    label: "Edit Profil",
    hint: "Nama, no. HP, Alamat",
    icon: UserEditIcon,
  },
  {
    key: "ubah-kata-sandi",
    label: "Ubah Kata Sandi",
    hint: "",
    icon: LockIcon,
  },
  {
    key: "notifikasi",
    label: "Notifikasi",
    hint: "Aktif",
    icon: BellSettingIcon,
  },
  {
    key: "data-ktp",
    label: "Data KTP / Identitas",
    hint: "Terverifikasi",
    icon: IdCardIcon,
  },
];

function PengaturanAkun() {
  const { token, claims } = getSession();
  const [selected, setSelected] = useState(null);
  
  // State untuk Form Edit Profil
  const [profileData, setProfileData] = useState({
    full_name: "",
    phone: "",
    address: "",
  });

  // State untuk Form Ubah Kata Sandi
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State untuk status UI (Loading & Pesan)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Mengambil data profil saat tab "Edit Profil" dibuka
  useEffect(() => {
    setMessage(null); // Reset pesan setiap pindah tab
    if (selected === "edit-profil" && token) {
      setLoading(true);
      fetchProfile(token)
        .then((res) => {
          if (res?.data) {
            setProfileData({
              full_name: res.data.full_name || "",
              phone: res.data.phone || "",
              address: res.data.address || "",
            });
          }
        })
        .catch(() => {
          setMessage({ type: "error", text: "Gagal memuat data profil saat ini." });
        })
        .finally(() => setLoading(false));
    } else {
      // Reset form password jika tab ditutup/pindah
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }
  }, [selected, token]);

  // Handler Submit Form Profil
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Memanggil API yang sudah diperbaiki
      await updateUserProfile(profileData);
      setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Gagal memperbarui profil." });
    } finally {
      setLoading(false);
    }
  };

  // Handler Submit Form Password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Kata sandi baru dan konfirmasi tidak cocok!" });
      setLoading(false);
      return;
    }

    try {
      // Memanggil API yang sudah diperbaiki
      await changeUserPassword({
        old_password: passwordData.oldPassword,
        new_password: passwordData.newPassword,
      });

      setMessage({ type: "success", text: "Kata sandi berhasil diubah!" });
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" }); 
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Gagal mengubah kata sandi." });
    } finally {
      setLoading(false);
    }
  };

  // Render Konten Detail Berdasarkan Pilihan
  const renderDetailContent = () => {
    if (selected === "edit-profil") {
      return (
        <form onSubmit={handleUpdateProfile} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={profileData.full_name}
              onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
              required
              className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Nomor Telepon</label>
            <input
              type="text"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Alamat Domisili</label>
            <textarea
              rows="3"
              value={profileData.address}
              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-100 border border-black rounded-xl hover:bg-amber-200 shadow-xs transition disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      );
    }

    if (selected === "ubah-kata-sandi") {
      return (
        <form onSubmit={handleUpdatePassword} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Kata Sandi Saat Ini</label>
            <input
              type="password"
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              required
              className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Kata Sandi Baru</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
              className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-label font-semibold text-stone-900 mb-1">Konfirmasi Kata Sandi Baru</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
              className="w-full px-3.5 py-2 text-sm border border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-stone-900/20 text-stone-900 shadow-xs"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-bold text-stone-950 bg-rose-100 border border-black rounded-xl hover:bg-rose-200 shadow-xs transition disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Perbarui Kata Sandi"}
            </button>
          </div>
        </form>
      );
    }

    // Default view untuk Notifikasi dan Data KTP
    return (
      <p className="text-sm font-body text-stone-600 mt-2">
        Fitur ini sedang dalam tahap pengembangan.
      </p>
    );
  };

  return (
    <AppShell header={<Header value="" onChange={() => {}} placeholder="Cari..." />}>
      <div className="min-h-screen p-4 md:p-6 space-y-6" style={{ backgroundColor: "#FDFBF7" }}>
        
        {/* Header Section */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest font-label font-bold text-amber-800">
            Perpustakaan
          </span>
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-stone-900">
            Pengaturan Akun
          </h1>
          <p className="text-sm text-stone-500 font-body">
            Kelola informasi pribadi dan keamanan akses sistem.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Kolom Kiri: List Pengaturan */}
          <ul className="w-full lg:w-1/2 bg-amber-50/40 rounded-2xl border border-black shadow-xs overflow-hidden font-label h-fit">
            {settingItems.map((item) => {
              const Icon = item.icon;
              const isSelected = selected === item.key;
              return (
                <li
                  key={item.key}
                  onClick={() => setSelected(isSelected ? null : item.key)}
                  className={`flex items-center justify-between px-4 md:px-6 py-4 text-sm font-semibold border-b border-black last:border-b-0 cursor-pointer transition-colors ${
                    isSelected ? "bg-amber-100 text-stone-950" : "text-stone-900 hover:bg-amber-100/50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className={isSelected ? "text-stone-950" : "text-stone-700"} />
                    {item.label}
                  </span>

                  <span className="flex items-center gap-2 text-stone-400">
                    {item.hint && (
                      <span className="text-[10px] uppercase font-bold text-stone-950 bg-amber-200 px-2.5 py-0.5 rounded-full border border-black shadow-xs">
                        {item.hint}
                      </span>
                    )}
                    <ChevronIcon />
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Kolom Kanan: Panel Formulir */}
          {selected && (
            <div className="w-full lg:w-1/2 rounded-2xl bg-amber-50 border border-black shadow-xs p-6 h-fit animate-in fade-in zoom-in-95 duration-200">
              
              <div className="flex justify-between items-center border-b border-black pb-3 mb-2">
                <h3 className="font-headline font-bold text-lg text-stone-950">
                  {settingItems.find((s) => s.key === selected)?.label}
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  className="text-stone-400 hover:text-stone-900 transition text-xl font-bold"
                >
                  &times;
                </button>
              </div>

              {/* Alert Message Box */}
              {message && (
                <div className={`px-4 py-3 rounded-xl border border-black shadow-xs text-sm font-semibold mb-4 ${
                  message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Render Form Dinamis */}
              {renderDetailContent()}
              
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default PengaturanAkun;