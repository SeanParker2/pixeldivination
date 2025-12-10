import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DailyFortune } from './DailyFortune';
import * as fortuneStoreModule from '../stores/useFortuneStore';
import * as userStoreModule from '../stores/useUserStore';

// Mock dependencies
vi.mock('../stores/useFortuneStore', () => ({
  useFortuneStore: vi.fn(),
}));

vi.mock('../stores/useUserStore', () => ({
  useUserStore: vi.fn(),
}));

describe('DailyFortune Page', () => {
  const mockCheckAndFetch = vi.fn();
  
  const mockFortuneData = {
    scores: {
      health: 80,
      love: 90,
      career: 75,
      wealth: 60,
      academic: 85,
      social: 70
    },
    texts: {
      overall: '今天综合运势不错。',
      love: '爱情运势极佳。',
      career: '工作上需要注意细节。',
      wealth: '财运平平。',
      others: '其他方面尚可。'
    }
  };

  const mockProfile = {
    nickname: 'Test User',
    birthDate: '2000-01-01',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementation
    (fortuneStoreModule.useFortuneStore as any).mockReturnValue({
      fortune: mockFortuneData,
      isLoading: false,
      checkAndFetch: mockCheckAndFetch,
    });

    (userStoreModule.useUserStore as any).mockReturnValue({
      profile: mockProfile,
    });
  });

  it('renders page header with user info', () => {
    render(<DailyFortune />);
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    // Assuming the date formatting logic in component outputs YYYY-MM-DD
    expect(screen.getByText(/2000-01-01/)).toBeInTheDocument();
  });

  it('renders tabs correctly', () => {
    render(<DailyFortune />);
    
    expect(screen.getByText('今日')).toBeInTheDocument();
    expect(screen.getByText('本月')).toBeInTheDocument();
    expect(screen.getByText('本年')).toBeInTheDocument();
  });

  it('switches tabs when clicked', () => {
    render(<DailyFortune />);
    
    const monthTab = screen.getByText('本月');
    fireEvent.click(monthTab);
    
    expect(monthTab).toHaveClass('active');
    expect(screen.getByText('今日')).not.toHaveClass('active');
  });

  it('renders stats scores correctly', () => {
    render(<DailyFortune />);
    
    expect(screen.getByText('80%')).toBeInTheDocument(); // Health
    expect(screen.getByText('90%')).toBeInTheDocument(); // Love
    expect(screen.getByText('75%')).toBeInTheDocument(); // Career
  });

  it('renders reading texts correctly', () => {
    render(<DailyFortune />);
    
    expect(screen.getByText('今天综合运势不错。')).toBeInTheDocument();
    expect(screen.getByText('爱情运势极佳。')).toBeInTheDocument();
    expect(screen.getByText('工作上需要注意细节。')).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    (fortuneStoreModule.useFortuneStore as any).mockReturnValue({
      fortune: null,
      isLoading: true,
      checkAndFetch: mockCheckAndFetch,
    });

    render(<DailyFortune />);
    
    expect(screen.getByText(/DeepSeek 正在推演星象/)).toBeInTheDocument();
  });
});
