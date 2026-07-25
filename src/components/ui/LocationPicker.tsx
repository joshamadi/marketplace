'use client';

import { useState } from 'react';
import { useLocationStore } from '@/store/useLocationStore';

const CITIES = [
  {
    id: 'lagos',
    name: 'Lagos',
    areas: ['Ikeja', 'Victoria Island', 'Lekki', 'Surulere', 'Yaba', 'Ikoyi', 'Mainland', 'Ajah'],
  },
  {
    id: 'abuja',
    name: 'Abuja',
    areas: ['Wuse', 'Maitama', 'Garki', 'Jabi', 'Gwarinpa', 'Life Camp', 'Kubwa', 'Lugbe'],
  },
  {
    id: 'ibadan',
    name: 'Ibadan',
    areas: ['Dugbe', 'Bodija', 'Ibadan South', 'Challenge', 'Ring Road', 'Mokola'],
  },
  {
    id: 'port-harcourt',
    name: 'Port Harcourt',
    areas: ['GRA', 'Trans Amadi', 'Diobu', 'Rumola', 'Woji', 'Elekahia'],
  },
];

interface LocationPickerProps {
  onClose?: () => void;
}

export default function LocationPicker({ onClose }: LocationPickerProps) {
  const { selectedCity, selectedArea, setCity: storeSetCity, setArea: storeSetArea, setDeliveryAddress } = useLocationStore();
  const [city, setCity] = useState(selectedCity || '');
  const [area, setArea] = useState(selectedArea || '');
  const [label, setLabel] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  const [saved, setSaved] = useState(false);

  const areas = CITIES.find((c) => c.id === city)?.areas || [];

  function handleCityChange(value: string) {
    setCity(value);
    setArea('');
  }

  function handleUseCurrentLocation() {
    setIsUsingLocation(true);
    setTimeout(() => {
      setCity('lagos');
      setArea('Lekki');
      setIsUsingLocation(false);
    }, 1500);
  }

  function handleSave() {
    if (!city || !area) return;
    const cityName = CITIES.find((c) => c.id === city)?.name || city;
    storeSetCity(cityName);
    storeSetArea(area);
    const parts = [label, fullAddress, area, cityName].filter(Boolean);
    setDeliveryAddress(parts.join(', '));
    setSaved(true);
    setTimeout(() => {
      onClose?.();
    }, 1000);
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 space-y-5">
      <div>
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isUsingLocation}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E23E3E]/30 bg-[#E23E3E]/5 px-4 py-3 text-sm font-semibold text-[#E23E3E] transition hover:border-[#E23E3E]/50 hover:bg-[#E23E3E]/10 disabled:opacity-50"
        >
          {isUsingLocation ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Detecting location...
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Use current location
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-gray-400 dark:bg-gray-900">or select manually</span>
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          City
        </label>
        <select
          id="city"
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm transition
            focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:border-[#E23E3E]
            dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option value="">Select a city</option>
          {CITIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Area / Neighborhood
        </label>
        <select
          id="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          disabled={!city}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm transition
            focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:border-[#E23E3E]
            disabled:opacity-50 disabled:cursor-not-allowed
            dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option value="">{city ? 'Select an area' : 'Select a city first'}</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="label" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Address label <span className="text-gray-400 font-normal">(e.g. Home, Office)</span>
        </label>
        <input
          id="label"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Home"
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm transition
            placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:border-[#E23E3E]
            dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      <div>
        <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Full delivery address
        </label>
        <textarea
          id="fullAddress"
          value={fullAddress}
          onChange={(e) => setFullAddress(e.target.value)}
          placeholder="123 Street Name, landmark..."
          rows={3}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm transition
            placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:border-[#E23E3E]
            resize-none
            dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={!city || !area || saved}
        className="w-full rounded-lg bg-[#E23E3E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d33232] focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saved ? 'Address saved!' : 'Save address'}
      </button>
    </div>
  );
}
