import React, { useEffect, useState } from 'react';
import { api } from '@/api/client';
import type { Store } from '@/types';
import {
  Search,
  Plus,
  ArrowUpDown,
  AlertCircle,
  Loader2,
  X,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

export const StoresList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    storeName: '',
    storeEmail: '',
    storeAddress: '',
    ownerName: '',
    ownerEmail: '',
    ownerPassword: '',
    ownerAddress: '',
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const fetchStores = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params: any = {};
      if (searchName) params.name = searchName;
      if (searchAddress) params.address = searchAddress;
      if (sortBy) {
        params.sortBy = sortBy;
        params.order = sortOrder;
      }

      const res = await api.get<Store[]>('/api/stores', { params });
      setStores(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch stores.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchStores();
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchName, searchAddress, sortBy, sortOrder]);

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
    setSearchAddress('');
  };

  const handleAddStoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (formData.ownerPassword.length < 8) {
      setModalError('Owner password must be at least 8 characters long.');
      return;
    }

    try {
      setModalSubmitting(true);
      await api.post('/api/stores', {
        owner: {
          name: formData.ownerName,
          email: formData.ownerEmail,
          password: formData.ownerPassword,
          address: formData.ownerAddress || formData.storeAddress,
        },
        store: {
          name: formData.storeName,
          email: formData.storeEmail,
          address: formData.storeAddress,
        },
      });
      setIsModalOpen(false);
      setFormData({
        storeName: '',
        storeEmail: '',
        storeAddress: '',
        ownerName: '',
        ownerEmail: '',
        ownerPassword: '',
        ownerAddress: '',
      });
      fetchStores();
    } catch (err: any) {
      setModalError(err.response?.data?.message || 'Failed to create store.');
    } finally {
      setModalSubmitting(false);
    }
  };

  const hasActiveFilters = searchName || searchAddress;

  const renderRatingStars = (rating: number | null | undefined) => {
    if (rating === null || rating === undefined) {
      return <span className="text-xs text-[#6F756D]">No ratings yet</span>;
    }

    const rounded = Number(rating).toFixed(1);
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex items-center text-[#C4933F]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3.5 h-3.5 ${
                star <= Math.round(Number(rating))
                  ? 'fill-[#C4933F] text-[#C4933F]'
                  : 'text-[#DDD8C9]'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-semibold text-[#243027]">{rounded}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#243027] tracking-tight">
            Stores
          </h1>
          <p className="text-sm text-[#6F756D] mt-1">
            Manage registered stores and their ratings
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#315C43] hover:bg-[#264B36] text-[#FFFDF7] rounded-xl h-10 px-4 font-medium self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Store
        </Button>
      </div>

      {/* Filter Toolbar (Section 6) */}
      <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6F756D]" />
            <Input
              placeholder="Search by store name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
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
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-9 px-3 text-xs text-[#6F756D] hover:text-[#B6534B]"
              >
                Clear Filters
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

      {/* Stores Table */}
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
                    Store Name <ArrowUpDown className="w-3.5 h-3.5 text-[#6F756D]" />
                  </div>
                </TableHead>
                <TableHead className="text-[#243027] font-semibold text-xs uppercase tracking-wider py-3.5">
                  Email
                </TableHead>
                <TableHead className="text-[#243027] font-semibold text-xs uppercase tracking-wider py-3.5">
                  Address
                </TableHead>
                <TableHead className="text-[#243027] font-semibold text-xs uppercase tracking-wider py-3.5">
                  Average Rating
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-[#6F756D]">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#315C43] mb-2" />
                    Loading stores...
                  </TableCell>
                </TableRow>
              ) : stores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <p className="font-medium text-base text-[#243027]">No stores found</p>
                    <p className="text-sm text-[#6F756D] mt-1">
                      {hasActiveFilters
                        ? 'Try adjusting your search criteria.'
                        : 'Click "Add Store" to create your first store.'}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                stores.map((s) => (
                  <TableRow
                    key={s.id}
                    className="border-b border-[#DDD8C9]/50 hover:bg-[#F7F3E8]/40 transition-colors"
                  >
                    <TableCell className="font-medium text-[#243027] py-3.5">
                      {s.name}
                    </TableCell>
                    <TableCell className="text-[#6F756D] py-3.5">{s.email}</TableCell>
                    <TableCell className="text-[#6F756D] max-w-[220px] truncate py-3.5">
                      {s.address}
                    </TableCell>
                    <TableCell className="py-3.5">
                      {renderRatingStars(s.averageRating)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add Store Modal (Section 7) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-[540px] bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-[#DDD8C9] flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-semibold text-lg text-[#243027]">Add Store</h3>
                <p className="text-xs text-[#6F756D]">
                  Create a store profile along with its designated owner account.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#6F756D] hover:text-[#243027]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStoreSubmit} className="p-6 space-y-4 overflow-y-auto">
              {modalError && (
                <div className="p-3 rounded-lg bg-[#B6534B]/10 border border-[#B6534B]/30 flex items-start gap-2 text-[#B6534B] text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{modalError}</span>
                </div>
              )}

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#315C43] block">
                  Store Details
                </span>

                <div>
                  <label className="block text-xs font-medium text-[#243027] mb-1">
                    Store Name
                  </label>
                  <Input
                    required
                    value={formData.storeName}
                    onChange={(e) =>
                      setFormData({ ...formData, storeName: e.target.value })
                    }
                    placeholder="e.g. Green Grocers"
                    className="bg-[#FFFDF7] border-[#DDD8C9] rounded-xl h-9 text-sm text-[#243027]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#243027] mb-1">
                    Store Email
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.storeEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, storeEmail: e.target.value })
                    }
                    placeholder="e.g. contact@greengrocers.com"
                    className="bg-[#FFFDF7] border-[#DDD8C9] rounded-xl h-9 text-sm text-[#243027]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#243027] mb-1">
                    Store Address
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.storeAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, storeAddress: e.target.value })
                    }
                    placeholder="Store physical location"
                    className="w-full px-3 py-2 text-sm bg-[#FFFDF7] border border-[#DDD8C9] rounded-xl text-[#243027] focus:outline-none focus:ring-2 focus:ring-[#315C43] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#DDD8C9]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6F8F72] block">
                  Store Owner Account
                </span>

                <div>
                  <label className="block text-xs font-medium text-[#243027] mb-1">
                    Owner Name
                  </label>
                  <Input
                    required
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerName: e.target.value })
                    }
                    placeholder="Owner's full name"
                    className="bg-[#FFFDF7] border-[#DDD8C9] rounded-xl h-9 text-sm text-[#243027]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#243027] mb-1">
                    Owner Email
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.ownerEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerEmail: e.target.value })
                    }
                    placeholder="owner@example.com"
                    className="bg-[#FFFDF7] border-[#DDD8C9] rounded-xl h-9 text-sm text-[#243027]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#243027] mb-1">
                    Owner Password
                  </label>
                  <Input
                    type="password"
                    required
                    minLength={8}
                    value={formData.ownerPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerPassword: e.target.value })
                    }
                    placeholder="Min 8 characters"
                    className="bg-[#FFFDF7] border-[#DDD8C9] rounded-xl h-9 text-sm text-[#243027]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-[#DDD8C9] shrink-0">
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
                      Creating Store...
                    </>
                  ) : (
                    'Create Store'
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
