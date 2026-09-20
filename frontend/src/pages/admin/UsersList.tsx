import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/client';
import type { User, Role } from '@/types';
import {
  Search,
  Plus,
  ArrowUpDown,
  AlertCircle,
  Loader2,
  X,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

export const UsersList: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'USER' as Role,
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params: any = {};
      if (searchName) params.name = searchName;
      if (searchEmail) params.email = searchEmail;
      if (searchAddress) params.address = searchAddress;
      if (roleFilter) params.role = roleFilter;
      if (sortBy) {
        params.sortBy = sortBy;
        params.order = sortOrder;
      }

      const res = await api.get<User[]>('/api/users', { params });
      setUsers(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users list.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchName, searchEmail, searchAddress, roleFilter, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleClearFilters = () => {
    setSearchName('');
    setSearchEmail('');
    setSearchAddress('');
    setRoleFilter('');
  };

  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (formData.password.length < 8) {
      setModalError('Password must be at least 8 characters long.');
      return;
    }

    try {
      setModalSubmitting(true);
      await api.post('/api/users', formData);
      setIsModalOpen(false);
      setFormData({
        name: '',
        email: '',
        address: '',
        password: '',
        role: 'USER',
      });
      fetchUsers();
    } catch (err: any) {
      setModalError(err.response?.data?.message || 'Failed to create user.');
    } finally {
      setModalSubmitting(false);
    }
  };

  const hasActiveFilters = searchName || searchEmail || searchAddress || roleFilter;

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case 'ADMIN':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#315C43] text-[#FFFDF7]">
            Admin
          </span>
        );
      case 'STORE_OWNER':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#E5EBDD] text-[#315C43]">
            Store Owner
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#DDD8C9]/40 text-[#243027]">
            Normal User
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#243027] tracking-tight">
            Users
          </h1>
          <p className="text-sm text-[#6F756D] mt-1">Manage registered platform users</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#315C43] hover:bg-[#264B36] text-[#FFFDF7] rounded-xl h-10 px-4 font-medium self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add User
        </Button>
      </div>

      {/* Filter Toolbar (Section 5) */}
      <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6F756D]" />
            <Input
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="pl-9 bg-[#FFFDF7] border-[#DDD8C9] text-xs sm:text-sm rounded-xl h-9 text-[#243027]"
            />
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6F756D]" />
            <Input
              placeholder="Search by email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="pl-9 bg-[#FFFDF7] border-[#DDD8C9] text-xs sm:text-sm rounded-xl h-9 text-[#243027]"
            />
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6F756D]" />
            <Input
              placeholder="Search by address..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="pl-9 bg-[#FFFDF7] border-[#DDD8C9] text-xs sm:text-sm rounded-xl h-9 text-[#243027]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="flex-1 h-9 px-3 rounded-xl border border-[#DDD8C9] bg-[#FFFDF7] text-xs sm:text-sm text-[#243027] focus:outline-none focus:ring-2 focus:ring-[#315C43]"
            >
              <option value="">All Roles</option>
              <option value="USER">Normal User</option>
              <option value="STORE_OWNER">Store Owner</option>
              <option value="ADMIN">Admin</option>
            </select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-9 px-2.5 text-xs text-[#6F756D] hover:text-[#B6534B]"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-[#B6534B]/10 border border-[#B6534B]/30 flex items-center gap-3 text-[#B6534B] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Users Table */}
      <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F7F3E8]/60 border-b border-[#DDD8C9]">
              <TableRow className="hover:bg-transparent">
                <TableHead
                  onClick={() => handleSort('name')}
                  className="cursor-pointer text-[#243027] font-semibold text-xs uppercase tracking-wider py-3.5"
                >
                  <div className="flex items-center gap-1">
                    Name <ArrowUpDown className="w-3.5 h-3.5 text-[#6F756D]" />
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => handleSort('email')}
                  className="cursor-pointer text-[#243027] font-semibold text-xs uppercase tracking-wider py-3.5"
                >
                  <div className="flex items-center gap-1">
                    Email <ArrowUpDown className="w-3.5 h-3.5 text-[#6F756D]" />
                  </div>
                </TableHead>
                <TableHead className="text-[#243027] font-semibold text-xs uppercase tracking-wider py-3.5">
                  Address
                </TableHead>
                <TableHead className="text-[#243027] font-semibold text-xs uppercase tracking-wider py-3.5">
                  Role
                </TableHead>
                <TableHead className="text-right text-[#243027] font-semibold text-xs uppercase tracking-wider py-3.5">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-[#6F756D]">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#315C43] mb-2" />
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <p className="font-medium text-base text-[#243027]">No users found</p>
                    <p className="text-sm text-[#6F756D] mt-1">
                      {hasActiveFilters
                        ? 'Try adjusting or clearing your filters.'
                        : 'Click "Add User" to register the first account.'}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((u) => (
                  <TableRow
                    key={u.id || u.email}
                    className="border-b border-[#DDD8C9]/50 hover:bg-[#F7F3E8]/40 transition-colors"
                  >
                    <TableCell className="font-medium text-[#243027] py-3.5">
                      {u.name}
                    </TableCell>
                    <TableCell className="text-[#6F756D] py-3.5">{u.email}</TableCell>
                    <TableCell className="text-[#6F756D] max-w-[200px] truncate py-3.5">
                      {u.address || '—'}
                    </TableCell>
                    <TableCell className="py-3.5">{getRoleBadge(u.role)}</TableCell>
                    <TableCell className="text-right py-3.5">
                      {u.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/users/${u.id}`)}
                          className="h-8 px-2 text-xs text-[#315C43] hover:bg-[#E5EBDD] rounded-lg"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add User Modal (Section 7) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-[500px] bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#DDD8C9] flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-[#243027]">Add User</h3>
                <p className="text-xs text-[#6F756D]">Create a new user account.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#6F756D] hover:text-[#243027]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 rounded-lg bg-[#B6534B]/10 border border-[#B6534B]/30 flex items-start gap-2 text-[#B6534B] text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{modalError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#243027] mb-1">
                  Full Name
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alice Smith"
                  className="bg-[#FFFDF7] border-[#DDD8C9] rounded-xl h-10 text-sm text-[#243027]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#243027] mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alice@example.com"
                  className="bg-[#FFFDF7] border-[#DDD8C9] rounded-xl h-10 text-sm text-[#243027]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#243027] mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 8 characters"
                  className="bg-[#FFFDF7] border-[#DDD8C9] rounded-xl h-10 text-sm text-[#243027]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#243027] mb-1">
                  Address
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Physical street address"
                  className="w-full px-3 py-2 text-sm bg-[#FFFDF7] border border-[#DDD8C9] rounded-xl text-[#243027] focus:outline-none focus:ring-2 focus:ring-[#315C43] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#243027] mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value as Role })
                  }
                  className="w-full h-10 px-3 rounded-xl border border-[#DDD8C9] bg-[#FFFDF7] text-sm text-[#243027] focus:outline-none focus:ring-2 focus:ring-[#315C43]"
                >
                  <option value="USER">Normal User</option>
                  <option value="STORE_OWNER">Store Owner</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-[#DDD8C9]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={modalSubmitting}
                  className="rounded-xl border-[#DDD8C9] text-[#243027] text-xs h-9 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={modalSubmitting}
                  className="rounded-xl bg-[#315C43] hover:bg-[#264B36] text-[#FFFDF7] text-xs h-9 px-4 font-medium"
                >
                  {modalSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                      Creating...
                    </>
                  ) : (
                    'Create User'
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
