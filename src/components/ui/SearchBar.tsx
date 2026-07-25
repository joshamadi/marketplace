'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock } from 'lucide-react';

const RECENT_KEY = 'chowdeck_recent_searches';
const MAX_RECENT = 5;

interface AutocompleteItem {
  id: string;
  name: string;
  type: 'restaurant' | 'food';
  subtitle?: string;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onAutocompleteSelect?: (item: AutocompleteItem) => void;
  fetchAutocomplete?: (query: string) => Promise<AutocompleteItem[]>;
}

export default function SearchBar({
  placeholder = 'Search restaurants, foods...',
  onSearch,
  onAutocompleteSelect,
  fetchAutocomplete,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<AutocompleteItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch {}
  }, []);

  function saveRecentSearch(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter((s) => s !== trimmed)].slice(0, MAX_RECENT);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  }

  function removeRecentSearch(term: string) {
    const updated = recentSearches.filter((s) => s !== term);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  }

  const fetchSuggestions = useCallback(
    async (value: string) => {
      if (!fetchAutocomplete || value.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const results = await fetchAutocomplete(value);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      }
    },
    [fetchAutocomplete]
  );

  function handleChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  }

  function handleSubmit(term?: string) {
    const search = (term ?? query).trim();
    if (!search) return;
    saveRecentSearch(search);
    onSearch(search);
    setShowDropdown(false);
    setQuery(search);
    inputRef.current?.blur();
  }

  function handleClear() {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  }

  function handleSelectSuggestion(item: AutocompleteItem) {
    setQuery(item.name);
    saveRecentSearch(item.name);
    onAutocompleteSelect?.(item);
    setShowDropdown(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showRecent = showDropdown && query.length === 0 && recentSearches.length > 0;
  const showSuggestions = showDropdown && suggestions.length > 0;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-gray-50 py-2.5 pl-10 pr-10 text-sm shadow-sm transition
            placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:border-[#E23E3E]
            dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-500
            ${isFocused ? 'border-[#E23E3E]' : 'border-gray-200 dark:border-gray-700'}`}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {(showRecent || showSuggestions) && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {showRecent && (
            <div>
              <p className="px-4 py-1 text-xs font-medium text-gray-400 uppercase tracking-wide">
                Recent searches
              </p>
              {recentSearches.map((term) => (
                <div
                  key={term}
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSubmit(term);
                    }}
                    className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    {term}
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      removeRecentSearch(term);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {showSuggestions && (
            <div>
              {showRecent && <div className="my-1 border-t border-gray-100 dark:border-gray-800" />}
              <p className="px-4 py-1 text-xs font-medium text-gray-400 uppercase tracking-wide">
                Suggestions
              </p>
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectSuggestion(item);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Search className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.name}
                    </p>
                    {item.subtitle && (
                      <p className="truncate text-xs text-gray-400">{item.subtitle}</p>
                    )}
                  </div>
                  <span className="ml-auto shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {item.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
