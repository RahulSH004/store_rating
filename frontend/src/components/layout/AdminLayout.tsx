import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Store,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Users', path: '/admin/users', icon: Users, end: false },
    { label: 'Stores', path: '/admin/stores', icon: Store, end: false },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F7F3E8] flex">
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 h-screen w-64 bg-[#FFFDF7] border-r border-[#DDD8C9] z-50 flex flex-col justify-between transition-transform duration-200 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 border-b border-[#DDD8C9] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#E5EBDD] flex items-center justify-center text-[#315C43]">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-base text-[#243027] leading-none block">
                  Store Rate
                </span>
                <span className="text-[11px] font-medium text-[#6F8F72] uppercase tracking-wider block mt-0.5">
                  Admin Panel
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-[#6F756D] hover:text-[#243027]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#E5EBDD] text-[#315C43] font-semibold'
                      : 'text-[#6F756D] hover:bg-[#F7F3E8] hover:text-[#243027]'
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-[#DDD8C9]">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-2 bg-[#F7F3E8] rounded-xl">
            <div className="w-8 h-8 rounded-full bg-[#315C43] text-[#FFFDF7] flex items-center justify-center font-semibold text-xs shrink-0">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#243027] truncate">{user?.name}</p>
              <p className="text-[11px] text-[#6F756D] truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-sm text-[#B6534B] hover:bg-[#B6534B]/10 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 px-6 bg-[#FFFDF7]/80 backdrop-blur-sm border-b border-[#DDD8C9] sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-[#243027] p-1.5 rounded-lg hover:bg-[#E5EBDD]"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#315C43]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#315C43] bg-[#E5EBDD] px-2.5 py-0.5 rounded-md">
                Admin Area
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#6F756D] hidden sm:inline">
              Signed in as <strong className="text-[#243027]">{user?.name}</strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-xl border-[#DDD8C9] text-[#243027] hover:bg-[#F7F3E8] h-8 text-xs cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Logout
            </Button>
          </div>
        </header>

        {/* Page Outlet */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
