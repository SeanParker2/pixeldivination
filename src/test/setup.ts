import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

window.IntersectionObserver = vi.fn(() => ({
  observe,
  unobserve,
  disconnect,
  takeRecords: () => [],
  root: null,
  rootMargin: '',
  thresholds: [],
}));
