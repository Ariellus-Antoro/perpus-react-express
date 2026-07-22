import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

function AppShell({ header, children }) {
  return (
    <div className="min-h-screen md:flex text-stone-900 bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {header}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-5 md:py-8 font-body">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

export default AppShell;