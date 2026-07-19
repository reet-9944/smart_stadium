import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the Smart Stadium Landing Page', () => {
    render(<App />);
    expect(screen.getByText(/Smart Stadium/i)).toBeDefined();
  });
});
