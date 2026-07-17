# Frontend — Perpustakaan Digital (Vite + React + Tailwind CSS)

Frontend ini sudah diubah dari Create React App ke **Vite**, dan stylingnya
memakai **Tailwind CSS v4**. Backend tidak diubah sama sekali — frontend ini
menyesuaikan ke kontrak API backend yang sudah ada:

- `POST /api/register` — body: `nik, email, password, full_name, address, phone, ktp`
- `POST /api/login` — body: `email, password` → balasan: `{ data: { token } }`
- `GET /api/profile` — header `Authorization: Bearer <token>` (dilindungi `authMiddleware.verifyToken`)

## Menjalankan

```bash
cd frontend
npm install
npm run dev
```

Buka `http://localhost:5173`. Pastikan backend berjalan di `http://localhost:8080`
(`cd backend && npm run dev`) — saat development, request ke `/api/...` dari
frontend otomatis di-proxy ke backend lewat konfigurasi `server.proxy` di
`vite.config.js`, jadi **tidak akan kena error CORS** meskipun backend belum
memasang middleware `cors()`.

> Catatan: kalau nanti frontend & backend di-deploy terpisah (bukan lewat
> proxy dev server ini), backend perlu mengaktifkan CORS supaya browser
> mengizinkan request lintas origin. Itu di luar frontend, jadi tidak
> disentuh di sini sesuai permintaan.

## Struktur

```
src/
  components/
    AppShell.jsx     # layout responsif: Sidebar (desktop) + Header + BottomNav (mobile)
    Sidebar.jsx       # navigasi desktop (md ke atas)
    BottomNav.jsx     # navigasi mobile (di bawah md)
    Header.jsx        # search bar di atas
    BookCard.jsx
    RequireAuth.jsx   # redirect ke /login kalau belum ada token
    icons.jsx
  pages/
    Home.jsx
    Buku.jsx
    Profile.jsx
    Login.jsx
    Register.jsx
  services/
    api.js            # fetch wrapper + simpan token JWT di localStorage
```

## Alur Login & Register

1. **Register** (`/register`) mengirim data sesuai kolom tabel `users`. Karena
   backend membalas pesan *"menunggu verifikasi admin"*, setelah sukses user
   diarahkan ke halaman login.
2. **Login** (`/login`) mengirim `email` + `password`, menyimpan `token` JWT
   dari respons ke `localStorage`.
3. Halaman **Home / Buku / Profile** dibungkus `RequireAuth` — kalau tidak ada
   token tersimpan, otomatis diarahkan ke `/login`.
4. Halaman **Profile** mencoba memanggil `GET /api/profile` untuk menampilkan
   data user. Endpoint ini di backend saat ini belum mengirim field data user
   di response JSON-nya (hanya `message`), jadi frontend akan fallback
   menampilkan role dari token JWT sampai backend mengirim data lengkap.
5. **Keluar/Logout** murni membersihkan token di frontend (backend belum
   punya endpoint logout / blacklist token).
