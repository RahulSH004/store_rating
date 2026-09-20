import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/client';
import { Store, Star, Users, AlertCircle, Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface Rater {
  userId: string;
  name: string;
  email: string;
  rating: number;
}

interface OwnerDashboardData {
  storeId: string;
  storeName: string;
  averageRating: number | null;
  raters: Rater[];
}

export const OwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<OwnerDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwnerDashboard = async () => {
      try {
        setIsLoading(true);
        const res = await api.get<OwnerDashboardData>('/dashboard/store-owner-dashboard');
        setData(res.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || 'Failed to load store owner dashboard information.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOwnerDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-[#6F756D]">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#315C43] mb-2" />
        Loading store dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4 rounded-xl bg-[#B6534B]/10 border border-[#B6534B]/30 flex items-center gap-3 text-[#B6534B] text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <span>{error || 'No store information found for this account.'}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#243027] tracking-tight">
            Store Dashboard
          </h1>
          <p className="text-sm text-[#6F756D] mt-1">
            Monitor your store profile and customer feedback
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/settings/password')}
          className="rounded-xl border-[#DDD8C9] text-[#243027] hover:bg-[#E5EBDD] text-xs h-10 px-4 self-start sm:self-auto cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5 mr-1.5 text-[#315C43]" />
          Change Password
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Store Card */}
        <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43]">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-[#243027]">
                  {data.storeName}
                </CardTitle>
                <span className="text-xs text-[#6F8F72] font-medium">Your Store Profile</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-xs text-[#6F756D]">
              Customers can rate your store from 1 to 5 stars on the public marketplace.
            </p>
          </CardContent>
        </Card>

        {/* Rating Summary Card */}
        <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-[#6F756D]">
                  Average Store Rating
                </span>
                <div className="text-4xl font-bold text-[#243027] mt-1 flex items-baseline gap-2">
                  {data.averageRating !== null
                    ? Number(data.averageRating).toFixed(1)
                    : 'N/A'}
                  <span className="text-xs font-normal text-[#6F756D]">
                    ({data.raters.length} {data.raters.length === 1 ? 'rating' : 'ratings'})
                  </span>
                </div>
                <div className="flex items-center text-[#C4933F] mt-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        data.averageRating &&
                        s <= Math.round(Number(data.averageRating))
                          ? 'fill-[#C4933F] text-[#C4933F]'
                          : 'text-[#DDD8C9]'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43]">
                <Star className="w-6 h-6 text-[#C4933F] fill-[#C4933F]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Ratings Table */}
      <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none overflow-hidden">
        <div className="p-4 border-b border-[#DDD8C9]/60 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#243027]">Customer Ratings</h3>
            <p className="text-xs text-[#6F756D]">Feedback submitted by verified users</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#6F756D]">
            <Users className="w-4 h-4 text-[#6F8F72]" />
            <span>{data.raters.length} Customers</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F7F3E8]/60 border-b border-[#DDD8C9]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[#243027] font-semibold text-xs uppercase tracking-wider py-3.5">
                  Customer
                </TableHead>
                <TableHead className="text-[#243027] font-semibold text-xs uppercase tracking-wider py-3.5">
                  Email
                </TableHead>
                <TableHead className="text-right text-[#243027] font-semibold text-xs uppercase tracking-wider py-3.5">
                  Submitted Rating
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.raters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10 text-[#6F756D] text-sm">
                    No customers have rated your store yet.
                  </TableCell>
                </TableRow>
              ) : (
                data.raters.map((r) => (
                  <TableRow
                    key={r.userId}
                    className="border-b border-[#DDD8C9]/50 hover:bg-[#F7F3E8]/40 transition-colors"
                  >
                    <TableCell className="font-medium text-[#243027] py-3.5">
                      {r.name}
                    </TableCell>
                    <TableCell className="text-[#6F756D] py-3.5">{r.email}</TableCell>
                    <TableCell className="text-right py-3.5">
                      <div className="inline-flex items-center gap-1 text-[#C4933F] font-semibold text-sm">
                        <Star className="w-3.5 h-3.5 fill-[#C4933F]" />
                        <span>{r.rating} / 5</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
