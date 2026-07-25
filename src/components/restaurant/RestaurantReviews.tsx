'use client';

import { useState, useMemo } from 'react';
import { Star, MessageSquarePlus } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import type { Review } from '@/types';
import { formatDate, cn } from '@/lib/utils';

interface RestaurantReviewsProps {
  restaurantId: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'Adebayo O.',
    userAvatar: '',
    restaurantId: 'mega-chicken',
    orderId: 'CD-2024-1001',
    rating: 5,
    comment: 'Absolutely delicious! The jollof rice was smoky and the chicken was perfectly crispy. Will definitely order again.',
    createdAt: '2024-12-15T10:30:00Z',
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: 'Chioma N.',
    userAvatar: '',
    restaurantId: 'mega-chicken',
    orderId: 'CD-2024-1002',
    rating: 4,
    comment: 'Food was great and delivery was fast. Only issue was the portion could be bigger for the price.',
    createdAt: '2024-12-12T14:15:00Z',
  },
  {
    id: 'r3',
    userId: 'u3',
    userName: 'Emeka A.',
    userAvatar: '',
    restaurantId: 'mega-chicken',
    orderId: 'CD-2024-1003',
    rating: 5,
    comment: 'The shawarma is the best in Lagos. Fresh ingredients and generous filling. My go-to spot!',
    createdAt: '2024-12-10T09:00:00Z',
  },
  {
    id: 'r4',
    userId: 'u4',
    userName: 'Fatima B.',
    userAvatar: '',
    restaurantId: 'mega-chicken',
    orderId: 'CD-2024-1004',
    rating: 3,
    comment: 'Food was okay, nothing special. Delivery took a bit longer than expected.',
    createdAt: '2024-12-08T18:45:00Z',
  },
  {
    id: 'r5',
    userId: 'u5',
    userName: 'Tunde M.',
    userAvatar: '',
    restaurantId: 'mega-chicken',
    orderId: 'CD-2024-1005',
    rating: 5,
    comment: 'Consistent quality every time! The fried rice and chicken combo is unbeatable.',
    createdAt: '2024-12-05T12:20:00Z',
  },
  {
    id: 'r6',
    userId: 'u6',
    userName: 'Amara K.',
    userAvatar: '',
    restaurantId: 'mega-chicken',
    orderId: 'CD-2024-1006',
    rating: 4,
    comment: 'Love the chin chin dessert. Great addition to the meal. Packaging was also neat.',
    createdAt: '2024-12-01T16:10:00Z',
  },
];

function RatingBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-3 text-right text-gray-500">{star}</span>
      <Star size={14} className="shrink-0 fill-yellow-400 text-yellow-400" />
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[#E23E3E] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs text-gray-400">{count}</span>
    </div>
  );
}

export default function RestaurantReviews({ restaurantId }: RestaurantReviewsProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');

  const reviews = useMemo(
    () => MOCK_REVIEWS.filter((r) => r.restaurantId === restaurantId),
    [restaurantId]
  );

  const sortedReviews = useMemo(() => {
    const copy = [...reviews];
    if (sortBy === 'highest') copy.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'lowest') copy.sort((a, b) => a.rating - b.rating);
    return copy;
  }, [reviews, sortBy]);

  const ratingDistribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      dist[r.rating - 1]++;
    });
    return dist.reverse();
  }, [reviews]);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0';

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
        <div className="shrink-0 rounded-2xl bg-gray-50 p-6 text-center sm:w-56">
          <p className="text-4xl font-extrabold text-gray-900">{avgRating}</p>
          <div className="mt-2 flex justify-center">
            <StarRating rating={Number(avgRating)} size={20} />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {reviews.length.toLocaleString()} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
          <div className="mt-4 space-y-2">
            {ratingDistribution.map((count, i) => (
              <RatingBar key={i} star={5 - i} count={count} total={reviews.length} />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Customer Reviews</h2>
            <div className="flex gap-1">
              {(['recent', 'highest', 'lowest'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className={cn(
                    'rounded-lg px-3 py-1 text-xs font-medium capitalize transition-colors',
                    sortBy === opt
                      ? 'bg-[#E23E3E] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E23E3E]/10 text-sm font-bold text-[#E23E3E]">
                    {review.userName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-gray-900">{review.userName}</span>
                      <StarRating rating={review.rating} size={14} />
                    </div>
                    <p className="mt-1 text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{review.comment}</p>
                    {review.reply && (
                      <div className="mt-3 rounded-lg bg-gray-50 p-3">
                        <p className="mb-1 text-xs font-semibold text-gray-500">Restaurant reply</p>
                        <p className="text-sm text-gray-600">{review.reply}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {sortedReviews.length === 0 && (
              <div className="py-12 text-center text-gray-400">
                <p>No reviews yet for this restaurant.</p>
              </div>
            )}
          </div>

          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm font-semibold text-gray-500 transition-colors hover:border-[#E23E3E]/40 hover:text-[#E23E3E]">
            <MessageSquarePlus size={18} />
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}
