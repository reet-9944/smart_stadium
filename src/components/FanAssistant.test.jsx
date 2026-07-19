import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import FanAssistant from './FanAssistant';

describe('FanAssistant Component', () => {
  const mockMessages = [{ role: 'ai', content: 'Test Message' }];

  it('renders messages correctly', () => {
    render(<FanAssistant messages={mockMessages} />);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('submits form correctly', () => {
    const handleSendMock = vi.fn((e) => e.preventDefault());
    const setInputValueMock = vi.fn();
    
    render(<FanAssistant 
      messages={[]} 
      inputValue="test input" 
      setInputValue={setInputValueMock}
      handleSend={handleSendMock}
    />);
    
    const input = screen.getByPlaceholderText(/Ask about navigation/i);
    fireEvent.change(input, { target: { value: 'test change' } });
    expect(setInputValueMock).toHaveBeenCalled();

    const form = input.closest('form');
    fireEvent.submit(form);
    expect(handleSendMock).toHaveBeenCalled();
  });
});
