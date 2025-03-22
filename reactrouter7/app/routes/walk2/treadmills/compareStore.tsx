import { create } from 'zustand';
import { useNavigate } from 'react-router';
import React from 'react';

// Define the store state type
interface CompareState {
  selectedProducts: string[];
  toggleProduct: (productKey: string) => void;
  clearSelected: () => void;
  isSelected: (productKey: string) => boolean;
}

// Simplified store with more concise implementation
export const useCompareStore = create<CompareState>((set, get) => ({
  selectedProducts: [],
  toggleProduct: (productKey: string) => set(state => ({
    selectedProducts: state.selectedProducts.includes(productKey)
      ? state.selectedProducts.filter(key => key !== productKey)
      : [...state.selectedProducts, productKey]
  })),
  clearSelected: () => set({ selectedProducts: [] }),
  isSelected: (productKey: string) => get().selectedProducts.includes(productKey)
}));

// Memoized selectors with proper equality checks
const useSelectedProducts = () => useCompareStore(state => state.selectedProducts);
const useIsSelected = (productKey: string) =>
  useCompareStore(state => state.selectedProducts.includes(productKey));

// Simplified navigation hook with memoized callback
export const useCompareNavigation = () => {
  const navigate = useNavigate();
  const selectedProducts = useSelectedProducts();
  const clearSelected = useCompareStore(state => state.clearSelected);

  // Memoize the navigate function to prevent unnecessary re-renders
  const navigateToCompare = React.useCallback(() => {
    if (selectedProducts.length > 0) {
      const params = new URLSearchParams();
      selectedProducts.forEach(product => params.append('compare', product));
      navigate(`?${params.toString()}`);
      clearSelected();
    }
  }, [selectedProducts, navigate, clearSelected]);

  return { navigateToCompare };
};