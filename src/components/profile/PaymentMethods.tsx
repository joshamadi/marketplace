'use client';

import { useState } from 'react';
import {
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  CircleDollarSign,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SavedCard {
  id: string;
  brand: 'visa' | 'mastercard';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const MOCK_CARDS: SavedCard[] = [
  { id: 'card_1', brand: 'visa', last4: '1234', expiry: '09/27', isDefault: true },
  { id: 'card_2', brand: 'mastercard', last4: '5678', expiry: '03/26', isDefault: false },
];

export default function PaymentMethods() {
  const [cards, setCards] = useState<SavedCard[]>(MOCK_CARDS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [payOnDelivery, setPayOnDelivery] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  function formatCardNumber(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }

  function formatExpiry(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  }

  function detectBrand(num: string): 'visa' | 'mastercard' {
    const clean = num.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'visa';
    return 'mastercard';
  }

  function validateAddForm(): boolean {
    const errs: Record<string, string> = {};
    const cleanNum = cardNumber.replace(/\s/g, '');

    if (cleanNum.length < 13 || cleanNum.length > 16) errs.cardNumber = 'Enter a valid card number';
    if (!/^\d{2}\/\d{2}$/.test(expiry)) errs.expiry = 'Use MM/YY format';
    if (cvv.length < 3) errs.cvv = 'Enter a valid CVV';
    if (!cardName.trim()) errs.cardName = 'Name is required';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleAddCard(e: React.FormEvent) {
    e.preventDefault();
    if (!validateAddForm()) return;

    const cleanNum = cardNumber.replace(/\s/g, '');
    const newCard: SavedCard = {
      id: 'card_' + Date.now(),
      brand: detectBrand(cleanNum),
      last4: cleanNum.slice(-4),
      expiry,
      isDefault: cards.length === 0,
    };

    setCards((prev) => [...prev, newCard]);
    setCardNumber('');
    setExpiry('');
    setCvv('');
    setCardName('');
    setShowAddForm(false);
  }

  function handleDelete(id: string) {
    setCards((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length > 0 && !filtered.some((c) => c.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  }

  function handleSetDefault(id: string) {
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
    setPayOnDelivery(false);
  }

  function handlePayOnDelivery() {
    setPayOnDelivery(true);
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: false })));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Saved Cards</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your payment methods
        </p>
      </div>

      <div className="space-y-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className={cn(
              'flex items-center gap-4 rounded-xl border p-4 transition-colors',
              card.isDefault
                ? 'border-[#E23E3E]/30 bg-[#E23E3E]/5'
                : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
            )}
          >
            <div className="flex h-10 w-14 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
              <CreditCard
                size={22}
                className={card.brand === 'visa' ? 'text-blue-600' : 'text-orange-500'}
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold capitalize text-gray-900 dark:text-white">
                {card.brand} ending in {card.last4}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Expires {card.expiry}</p>
            </div>

            <div className="flex items-center gap-2">
              {card.isDefault && (
                <span className="rounded-full bg-[#E23E3E]/10 px-2 py-0.5 text-xs font-semibold text-[#E23E3E]">
                  Default
                </span>
              )}
              {!card.isDefault && (
                <button
                  onClick={() => handleSetDefault(card.id)}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-yellow-500 dark:hover:bg-gray-800"
                  title="Set as default"
                >
                  <Star size={16} />
                </button>
              )}
              <button
                onClick={() => handleDelete(card.id)}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                title="Delete card"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={handlePayOnDelivery}
          className={cn(
            'flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors',
            payOnDelivery
              ? 'border-[#E23E3E]/30 bg-[#E23E3E]/5'
              : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600'
          )}
        >
          <div className="flex h-10 w-14 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
            <CircleDollarSign size={22} className="text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Pay on Delivery</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Cash or POS at your doorstep</p>
          </div>
          {payOnDelivery && (
            <CheckCircle2 size={20} className="text-[#E23E3E]" />
          )}
        </button>
      </div>

      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 py-3 text-sm font-semibold text-gray-600 transition-colors hover:border-[#E23E3E] hover:text-[#E23E3E] dark:border-gray-700 dark:text-gray-400 dark:hover:border-[#E23E3E] dark:hover:text-[#E23E3E]"
        >
          <Plus size={18} />
          Add New Card
        </button>
      ) : (
        <form
          onSubmit={handleAddCard}
          className="space-y-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700"
        >
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Add New Card</h3>

          <div>
            <label
              htmlFor="cardName"
              className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
            >
              Cardholder Name
            </label>
            <input
              id="cardName"
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Adebayo Johnson"
              className={cn(
                'w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white',
                formErrors.cardName && 'border-red-500'
              )}
            />
            {formErrors.cardName && <p className="mt-1 text-xs text-red-500">{formErrors.cardName}</p>}
          </div>

          <div>
            <label
              htmlFor="cardNumber"
              className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
            >
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={cn(
                'w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white',
                formErrors.cardNumber && 'border-red-500'
              )}
            />
            {formErrors.cardNumber && <p className="mt-1 text-xs text-red-500">{formErrors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="expiry"
                className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
              >
                Expiry
              </label>
              <input
                id="expiry"
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className={cn(
                  'w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white',
                  formErrors.expiry && 'border-red-500'
                )}
              />
              {formErrors.expiry && <p className="mt-1 text-xs text-red-500">{formErrors.expiry}</p>}
            </div>
            <div>
              <label
                htmlFor="cvv"
                className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400"
              >
                CVV
              </label>
              <input
                id="cvv"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="***"
                maxLength={4}
                className={cn(
                  'w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white',
                  formErrors.cvv && 'border-red-500'
                )}
              />
              {formErrors.cvv && <p className="mt-1 text-xs text-red-500">{formErrors.cvv}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-[#E23E3E] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#c73535]"
            >
              Save Card
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setFormErrors({});
              }}
              className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
