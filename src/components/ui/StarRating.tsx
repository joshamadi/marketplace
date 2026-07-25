'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  reviewCount?: number;
  onChange?: (rating: number) => void;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 20,
  interactive = false,
  reviewCount,
  onChange,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = hoverRating || rating;

  function handleClick(starIndex: number) {
    if (!interactive || !onChange) return;
    onChange(starIndex);
  }

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, i) => {
          const starNumber = i + 1;
          const filled = displayRating >= starNumber;
          const halfFilled = !filled && displayRating >= starNumber - 0.5;

          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => handleClick(starNumber)}
              onMouseEnter={() => interactive && setHoverRating(starNumber)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              className={`relative ${interactive ? 'cursor-pointer' : 'cursor-default'} disabled:cursor-default`}
              style={{ width: size, height: size }}
            >
              <Star
                size={size}
                className="absolute inset-0 text-gray-300 dark:text-gray-600"
                strokeWidth={1.5}
              />
              {filled && (
                <Star
                  size={size}
                  className="absolute inset-0 text-yellow-400 fill-yellow-400"
                  strokeWidth={1.5}
                />
              )}
              {halfFilled && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star
                    size={size}
                    className="text-yellow-400 fill-yellow-400"
                    strokeWidth={1.5}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {reviewCount !== undefined && (
        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
