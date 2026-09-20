import React, { useEffect, useState } from 'react';
import { api } from '@/api/client';
import { Users, Store, Star, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Stats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const res = await api.get<Stats>('/dashboard/admin-dashboard');
        setStats(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load dashboard metrics.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#243027] tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-[#6F756D] mt-1">Overview of your platform activity</p>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-[#B6534B]/10 border border-[#B6534B]/30 flex items-center gap-3 text-[#B6534B] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Three Prominent Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Users */}
        <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none hover:border-[#315C43]/40 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-[#6F756D]">
                  Total Users
                </span>
                <div className="text-3xl sm:text-4xl font-semibold text-[#243027] mt-2">
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-[#315C43]" />
                  ) : (
                    stats?.totalUsers ?? 0
                  )}
                </div>
                <p className="text-xs text-[#6F756D] mt-1">Registered platform accounts</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43]">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Stores */}
        <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none hover:border-[#315C43]/40 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-[#6F756D]">
                  Total Stores
                </span>
                <div className="text-3xl sm:text-4xl font-semibold text-[#243027] mt-2">
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-[#315C43]" />
                  ) : (
                    stats?.totalStores ?? 0
                  )}
                </div>
                <p className="text-xs text-[#6F756D] mt-1">Active registered stores</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43]">
                <Store className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Ratings */}
        <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none hover:border-[#315C43]/40 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-[#6F756D]">
                  Total Ratings
                </span>
                <div className="text-3xl sm:text-4xl font-semibold text-[#243027] mt-2">
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-[#315C43]" />
                  ) : (
                    stats?.totalRatings ?? 0
                  )}
                </div>
                <p className="text-xs text-[#6F756D] mt-1">Submitted store reviews</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43]">
                <Star className="w-6 h-6 text-[#C4933F] fill-[#C4933F]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
