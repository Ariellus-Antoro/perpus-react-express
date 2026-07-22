import { Outlet } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';
import BottomNavAdmin from './BottomNavAdmin';

export default function AppShellAdmin() {
  return (
    <div className="flex min-h-screen text-stone-900 font-body bg-white">
      {/* Sidebar tampil di Desktop, hilang di HP */}
      <SidebarAdmin />

      {/* Konten Halaman Admin */}
      <main className="flex-1 p-6 pb-20 md:pb-6 overflow-y-auto bg-white m-2 md:m-4 rounded-2xl">
        <Outlet />
      </main>

      {/* Bottom Nav tampil di HP, hilang di Desktop */}
      <BottomNavAdmin />
    </div>
  );
}