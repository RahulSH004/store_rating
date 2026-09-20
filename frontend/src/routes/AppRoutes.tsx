import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { UserLayout } from '@/components/layout/UserLayout';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { UsersList } from '@/pages/admin/UsersList';
import { UserDetail } from '@/pages/admin/UserDetail';
import { StoresList } from '@/pages/admin/StoresList';
import { UserStoresList } from '@/pages/user/StoresList';
import { OwnerDashboard } from '@/pages/owner/OwnerDashboard';
import { UpdatePassword } from '@/pages/settings/UpdatePassword';

export const AppRoutes: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  // Helper to determine root redirect
  const getRootRedirect = () => {
    if (!isAuthenticated || !user) return '/login';
    if (user.role === 'ADMIN') return '/admin';
    if (user.role === 'STORE_OWNER') return '/owner';
    return '/stores';
  };

  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={getRootRedirect()} replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to={getRootRedirect()} replace /> : <Signup />}
      />

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/users/:id" element={<UserDetail />} />
          <Route path="/admin/stores" element={<StoresList />} />
          <Route path="/admin/settings/password" element={<UpdatePassword />} />
        </Route>
      </Route>

      {/* Normal User Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
        <Route element={<UserLayout />}>
          <Route path="/stores" element={<UserStoresList />} />
          <Route path="/settings/password" element={<UpdatePassword />} />
        </Route>
      </Route>

      {/* Store Owner Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['STORE_OWNER']} />}>
        <Route element={<UserLayout />}>
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/settings/password" element={<UpdatePassword />} />
        </Route>
      </Route>

      {/* Default Fallback */}
      <Route path="/" element={<Navigate to={getRootRedirect()} replace />} />
      <Route path="*" element={<Navigate to={getRootRedirect()} replace />} />
    </Routes>
  );
};
