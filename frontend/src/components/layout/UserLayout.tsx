import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Store, LogOut, LayoutDashboard, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const UserLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F7F3E8] flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#FFFDF7]/90 backdrop-blur-md border-b border-[#DDD8C9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <NavLink to="/stores" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43]">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-semibold text-lg text-[#243027] tracking-tight">
                Store Rate
              </span>
            </NavLink>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink
                to="/stores"
                end
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#E5EBDD] text-[#315C43] font-semibold'
                      : 'text-[#6F756D] hover:text-[#243027] hover:bg-[#F7F3E8]'
                  )
                }
              >
                <Store className="w-4 h-4" />
                <span>Explore Stores</span>
              </NavLink>

              {user?.role === 'STORE_OWNER' && (
                <NavLink
                  to="/owner"
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[#E5EBDD] text-[#315C43] font-semibold'
                        : 'text-[#6F756D] hover:text-[#243027] hover:bg-[#F7F3E8]'
                    )
                  }
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>My Store</span>
                </NavLink>
              )}

              {user?.role === 'ADMIN' && (
                <NavLink
                  to="/admin"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium text-[#6F756D] hover:text-[#243027] hover:bg-[#F7F3E8]"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Admin Panel</span>
                </NavLink>
              )}
            </nav>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#E5EBDD]/60 border border-[#DDD8C9]/60">
              <div className="w-6 h-6 rounded-full bg-[#315C43] text-[#FFFDF7] flex items-center justify-center font-semibold text-xs">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="text-left leading-tight">
                <span className="block text-xs font-semibold text-[#243027]">{user?.name}</span>
                <span className="block text-[10px] uppercase font-bold text-[#6F8F72] tracking-wider">
                  {user?.role?.replace('_', ' ')}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-xl border-[#DDD8C9] text-[#243027] hover:bg-[#F7F3E8] h-9 text-xs cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5 text-[#B6534B]" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
