import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/api/client';
import { ArrowLeft, User, Store, Star, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserDetailData {
  id: string;
  name: string;
  email: string;
  address: string;
  role: 'USER' | 'ADMIN' | 'STORE_OWNER';
  createdAt: string;
  store?: {
    id: string;
    name: string;
    address: string;
    averageRating: number | null;
  } | null;
}

export const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await api.get<UserDetailData>(`/api/users/${id}`);
        setUserData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'User not found or failed to load.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-[#6F756D]">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#315C43] mb-2" />
        Loading user details...
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/users')}
          className="text-xs text-[#6F756D] hover:text-[#243027]"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Back to Users
        </Button>
        <div className="p-4 rounded-xl bg-[#B6534B]/10 border border-[#B6534B]/30 flex items-center gap-3 text-[#B6534B] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error || 'User not found'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back Button & Header */}
      <div>
        <button
          onClick={() => navigate('/admin/users')}
          className="flex items-center gap-1.5 text-xs font-medium text-[#6F756D] hover:text-[#243027] mb-3 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Users
        </button>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#243027] tracking-tight">
          User Details
        </h1>
        <p className="text-sm text-[#6F756D] mt-1">Platform account profile and information</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none">
        <CardHeader className="border-b border-[#DDD8C9]/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[#243027]">
                {userData.name}
              </CardTitle>
              <span className="text-xs text-[#6F756D]">{userData.email}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#6F756D] block mb-1">
                Role
              </span>
              <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-[#E5EBDD] text-[#315C43]">
                {userData.role.replace('_', ' ')}
              </span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#6F756D] block mb-1">
                Physical Address
              </span>
              <p className="text-sm text-[#243027]">{userData.address || '—'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store Owner Section (Section 8) */}
      {userData.role === 'STORE_OWNER' && userData.store && (
        <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none">
          <CardHeader className="border-b border-[#DDD8C9]/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43]">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-[#243027]">
                  {userData.store.name}
                </CardTitle>
                <span className="text-xs text-[#6F756D]">
                  Location: {userData.store.address}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#DDD8C9]/60 max-w-sm">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#6F756D] block">
                Overall Average Rating
              </span>
              <div className="flex items-center gap-3 mt-2">
                <div className="text-3xl font-bold text-[#243027]">
                  {userData.store.averageRating !== null
                    ? Number(userData.store.averageRating).toFixed(1)
                    : 'N/A'}
                </div>
                <div className="flex items-center text-[#C4933F]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        userData.store?.averageRating &&
                        s <= Math.round(Number(userData.store.averageRating))
                          ? 'fill-[#C4933F] text-[#C4933F]'
                          : 'text-[#DDD8C9]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
