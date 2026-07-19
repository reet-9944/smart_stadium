import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
  it('renders correctly', () => {
    render(<Sidebar activeTab="fan" />);
    expect(screen.getByText('Command Center')).toBeInTheDocument();
  });

  it('calls setActiveTab when a tab is clicked', () => {
    const setActiveTabMock = vi.fn();
    const setIsMobileMenuOpenMock = vi.fn();
    
    render(<Sidebar 
      activeTab="fan" 
      setActiveTab={setActiveTabMock} 
      setIsMobileMenuOpen={setIsMobileMenuOpenMock}
    />);
    
    const crowdIntelligenceBtn = screen.getByText('Crowd Intelligence');
    fireEvent.click(crowdIntelligenceBtn);
    
    expect(setActiveTabMock).toHaveBeenCalledWith('staff');
    expect(setIsMobileMenuOpenMock).toHaveBeenCalledWith(false);
  });
});
