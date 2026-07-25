'use client';

import { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import type { Address } from '@/types';
import { cities } from '@/data/cities';
import { cn } from '@/lib/utils';

interface AddressFormProps {
  initialAddress?: Address;
  onSave: (address: Omit<Address, 'id'>) => void;
  onCancel: () => void;
}

const LABELS = ['Home', 'Work', 'Other'] as const;

export default function AddressForm({ initialAddress, onSave, onCancel }: AddressFormProps) {
  const [label, setLabel] = useState<string>(initialAddress?.label || 'Home');
  const [fullAddress, setFullAddress] = useState(initialAddress?.address || '');
  const [cityId, setCityId] = useState(initialAddress?.cityId || '');
  const [areaId, setAreaId] = useState(initialAddress?.areaId || '');
  const [isDefault, setIsDefault] = useState(initialAddress?.isDefault || false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedCity = useMemo(() => cities.find((c) => c.id === cityId), [cityId]);
  const areas = selectedCity?.areas || [];

  function validate(): boolean {
    const errs: Record<string, string> = {};

    if (!label) errs.label = 'Please select a label';
    if (!fullAddress.trim()) errs.fullAddress = 'Please enter your full address';
    if (fullAddress.trim().length < 10) errs.fullAddress = 'Address must be at least 10 characters';
    if (!cityId) errs.city = 'Please select a city';
    if (!areaId) errs.area = 'Please select an area';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const city = cities.find((c) => c.id === cityId);
    const area = city?.areas.find((a) => a.id === areaId);

    onSave({
      label,
      address: fullAddress.trim(),
      latitude: 6.5244 + Math.random() * 0.1,
      longitude: 3.3792 + Math.random() * 0.1,
      isDefault,
      cityId,
      areaId,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Label
        </label>
        <div className="flex gap-2">
          {LABELS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLabel(l)}
              className={cn(
                'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                label === l
                  ? 'border-[#E23E3E] bg-[#E23E3E]/10 text-[#E23E3E]'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600'
              )}
            >
              {l === 'Home' && <MapPin size={14} className="mr-1 inline" />}
              {l === 'Work' && <MapPin size={14} className="mr-1 inline" />}
              {l}
            </button>
          ))}
        </div>
        {errors.label && <p className="mt-1 text-xs text-red-500">{errors.label}</p>}
      </div>

      <div>
        <label
          htmlFor="fullAddress"
          className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Address
        </label>
        <textarea
          id="fullAddress"
          value={fullAddress}
          onChange={(e) => setFullAddress(e.target.value)}
          placeholder="Street address, building number, landmark..."
          rows={3}
          className={cn(
            'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white',
            errors.fullAddress && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
        />
        {errors.fullAddress && <p className="mt-1 text-xs text-red-500">{errors.fullAddress}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="city"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            City
          </label>
          <select
            id="city"
            value={cityId}
            onChange={(e) => {
              setCityId(e.target.value);
              setAreaId('');
            }}
            className={cn(
              'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white',
              errors.city && 'border-red-500'
            )}
          >
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
        </div>

        <div>
          <label
            htmlFor="area"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Area
          </label>
          <select
            id="area"
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
            disabled={!cityId}
            className={cn(
              'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white',
              errors.area && 'border-red-500'
            )}
          >
            <option value="">{cityId ? 'Select area' : 'Select city first'}</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          {errors.area && <p className="mt-1 text-xs text-red-500">{errors.area}</p>}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-[#E23E3E] focus:ring-[#E23E3E]"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">Set as default address</span>
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-[#E23E3E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#c73535]"
        >
          Save Address
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
