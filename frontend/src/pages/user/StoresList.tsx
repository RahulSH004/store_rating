import React, { useEffect, useState } from 'react';
import { api } from '@/api/client';
import {
  Search,
  Star,
  Store as StoreIcon,
  AlertCircle,
  Loader2,
  X,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface StoreWithRatings {
  id: string;
  name: string;
  address: string;
  overallRating: number | null;
  userRating: number | null;
}

export const UserStoresList: React.FC = () => {
  const [stores, setStores] = useState<StoreWithRatings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search filters
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');

  // Rating Modal state
  const [selectedStore, setSelectedStore] = useState<StoreWithRatings | null>(null);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [ratingValue, setRatingValue] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const fetchStores = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params: any = {};
      if (searchName) params.name = searchName;
      if (searchAddress) params.address = searchAddress;

      const res = await api.get<StoreWithRatings[]>('/api/stores/browse-stores', {
        params,
      });
      setStores(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load stores.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchStores();
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchName, searchAddress]);

  const handleOpenRatingModal = (store: StoreWithRatings) => {
    setSelectedStore(store);
    setRatingValue(store.userRating || 5);
    setHoverRating(0);
    setModalSuccess(false);
    setModalError(null);
  };

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStore) return;

    try {
      setIsSubmitting(true);
      setModalError(null);
      await api.post('/ratings', {
        storeId: selectedStore.id,
        rating: ratingValue,
      });

      setModalSuccess(true);
      setTimeout(() => {
        setSelectedStore(null);
        fetchStores();
      }, 900);
    } catch (err: any) {
      setModalError(err.response?.data?.message || 'Failed to submit rating.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#243027] tracking-tight">
          Explore Stores
        </h1>
        <p className="text-sm text-[#6F756D] mt-1">
          Browse registered stores, view overall ratings, and submit your rating
        </p>
      </div>

      {/* Filter toolbar */}
      <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6F756D]" />
            <Input
              placeholder="Search by store name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="pl-9 bg-[#FFFDF7] border-[#DDD8C9] text-xs sm:text-sm rounded-xl h-10 text-[#243027]"
            />
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6F756D]" />
            <Input
              placeholder="Search by address..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="pl-9 bg-[#FFFDF7] border-[#DDD8C9] text-xs sm:text-sm rounded-xl h-10 text-[#243027]"
            />
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

      {/* Stores Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-[#6F756D]">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#315C43] mb-2" />
          Loading stores...
        </div>
      ) : stores.length === 0 ? (
        <Card className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl p-12 text-center">
          <StoreIcon className="w-10 h-10 text-[#6F756D] mx-auto mb-3 opacity-60" />
          <h3 className="font-semibold text-base text-[#243027]">No stores found</h3>
          <p className="text-xs text-[#6F756D] mt-1">
            Try adjusting your search query to find stores.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stores.map((store) => (
            <Card
              key={store.id}
              className="bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-none hover:border-[#315C43]/50 transition-all flex flex-col justify-between"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg text-[#243027] leading-tight">
                      {store.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#6F756D] mt-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-[#6F8F72]" />
                      <span className="truncate">{store.address}</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#E5EBDD] flex items-center justify-center text-[#315C43] shrink-0">
                    <StoreIcon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#DDD8C9]/60 space-y-2.5">
                  {/* Overall Rating */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6F756D]">Overall Rating:</span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-[#C4933F]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              store.overallRating &&
                              s <= Math.round(Number(store.overallRating))
                                ? 'fill-[#C4933F] text-[#C4933F]'
                                : 'text-[#DDD8C9]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-[#243027]">
                        {store.overallRating !== null
                          ? Number(store.overallRating).toFixed(1)
                          : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* User Rating */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6F756D]">Your Rating:</span>
                    {store.userRating !== null ? (
                      <span className="font-semibold text-[#315C43] bg-[#E5EBDD] px-2 py-0.5 rounded-md">
                        ★ {store.userRating} / 5
                      </span>
                    ) : (
                      <span className="text-[#8A8F86] italic">Not rated yet</span>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <Button
                    onClick={() => handleOpenRatingModal(store)}
                    className="w-full h-9 rounded-xl bg-[#315C43] hover:bg-[#264B36] text-[#FFFDF7] text-xs font-medium cursor-pointer"
                  >
                    {store.userRating !== null ? 'Modify Rating' : 'Rate Store'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Interactive Rating Modal (Section 9) */}
      {selectedStore && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-[420px] bg-[#FFFDF7] border-[#DDD8C9] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#DDD8C9] flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-[#243027]">
                  {selectedStore.userRating !== null ? 'Update Rating' : 'Rate Store'}
                </h3>
                <p className="text-xs text-[#6F756D]">{selectedStore.name}</p>
              </div>
              <button
                onClick={() => setSelectedStore(null)}
                className="text-[#6F756D] hover:text-[#243027]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRatingSubmit} className="p-6 space-y-5">
              {modalError && (
                <div className="p-3 rounded-lg bg-[#B6534B]/10 border border-[#B6534B]/30 flex items-start gap-2 text-[#B6534B] text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{modalError}</span>
                </div>
              )}

              {modalSuccess && (
                <div className="p-3 rounded-lg bg-[#477A58]/10 border border-[#477A58]/30 flex items-center gap-2 text-[#477A58] text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Rating submitted successfully!</span>
                </div>
              )}

              {/* Star Rating Selectors */}
              <div className="text-center py-3">
                <span className="text-xs font-medium uppercase tracking-wider text-[#6F756D] block mb-2">
                  Select 1 to 5 Stars
                </span>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled =
                      hoverRating > 0 ? star <= hoverRating : star <= ratingValue;

                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingValue(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            isFilled
                              ? 'fill-[#C4933F] text-[#C4933F]'
                              : 'text-[#DDD8C9]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 text-sm font-semibold text-[#243027]">
                  {hoverRating || ratingValue} out of 5 stars
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-[#DDD8C9]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedStore(null)}
                  disabled={isSubmitting}
                  className="rounded-xl border-[#DDD8C9] text-[#243027] text-xs h-9 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || modalSuccess}
                  className="rounded-xl bg-[#315C43] hover:bg-[#264B36] text-[#FFFDF7] text-xs h-9 px-4 font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                      Saving...
                    </>
                  ) : (
                    'Submit Rating'
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
