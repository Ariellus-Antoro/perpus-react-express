import { useState } from "react";
import AppShell from "../components/AppShell";
import Header from "../components/Header";
import { getSession } from "../services/api";
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
    hint: "Nama, email, no. HP",
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
  const { claims } = getSession();
  const [selected, setSelected] = useState(null);

  return (
    <AppShell header={<Header value="" onChange={() => {}} />}>
      <div className="min-h-screen p-6 space-y-6" style={{ backgroundColor: "#FDFBF7" }}>
        {/* Header */}
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider font-label text-stone-600 font-medium">
            Perpustakaan
          </span>

          <h1 className="text-2xl md:text-3xl font-headline font-bold text-stone-900">
            Pengaturan Akun
          </h1>

          <p className="text-sm text-stone-500 font-body">
            Kelola informasi dan preferensi akun {claims?.role ? `(${claims.role})` : ""} Anda.
          </p>
        </div>

        {/* List Pengaturan */}
        <ul className="bg-amber-50/40 rounded-2xl border border-black shadow-xs overflow-hidden max-w-xl font-label">
          {settingItems.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.key}
                onClick={() => setSelected(item.key)}
                className="flex items-center justify-between px-4 md:px-6 py-4 text-sm font-semibold text-stone-900 border-b border-black last:border-b-0 cursor-pointer hover:bg-amber-100/50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Icon className="text-stone-700" />
                  {item.label}
                </span>

                <span className="flex items-center gap-2 text-stone-400">
                  {item.hint && (
                    <span className="text-xs font-bold text-stone-950 bg-amber-200 px-2.5 py-0.5 rounded-full border border-black shadow-xs">
                      {item.hint}
                    </span>
                  )}
                  <ChevronIcon />
                </span>
              </li>
            );
          })}
        </ul>

        {/* Panel detail sederhana saat salah satu opsi diklik */}
        {selected && (
          <div className="max-w-xl rounded-2xl bg-amber-50 border border-black shadow-xs p-5 space-y-2">
            <p className="text-sm font-body text-stone-600">
              Pengaturan untuk{" "}
              <span className="font-semibold text-stone-900">
                {settingItems.find((s) => s.key === selected)?.label}
              </span>{" "}
              belum terhubung ke backend. Tambahkan endpoint terkait untuk mengaktifkan fitur ini.
            </p>
            <button
              onClick={() => setSelected(null)}
              className="px-4 py-2 rounded-xl bg-amber-50 border border-black hover:bg-amber-100 transition text-xs uppercase tracking-wider font-label font-medium"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default PengaturanAkun;
