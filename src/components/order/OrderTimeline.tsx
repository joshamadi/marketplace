'use client';

import { Clock, CheckCircle } from 'lucide-react';

interface TimelineStatus {
  status: string;
  time: string;
  completed: boolean;
}

interface OrderTimelineProps {
  statuses: TimelineStatus[];
}

export default function OrderTimeline({ statuses }: OrderTimelineProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Order Timeline</h3>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-4">
          {statuses.map((item, index) => (
            <div key={index} className="relative flex items-start gap-4">
              <div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                  item.completed
                    ? 'bg-[#E23E3E] text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {item.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
                {item.completed && index === statuses.length - 1 && (
                  <div className="absolute inset-0 rounded-full bg-[#E23E3E] animate-ping opacity-20" />
                )}
              </div>

              <div className="flex-1 pt-2">
                <p
                  className={`font-medium ${
                    item.completed ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {item.status}
                </p>
                {item.time && (
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(item.time).toLocaleTimeString('en-NG', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
