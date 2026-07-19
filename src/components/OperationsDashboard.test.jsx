import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OperationsDashboard from './OperationsDashboard';

// Mock Recharts to avoid rendering actual SVG charts in JSDOM tests
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div data-testid="recharts-container">{children}</div>,
  LineChart: () => <div />,
  Line: () => <div />,
  AreaChart: () => <div />,
  Area: () => <div />,
  BarChart: () => <div />,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  CartesianGrid: () => <div />
}));

describe('OperationsDashboard Component', () => {
  it('renders Staff tab correctly', () => {
    render(<OperationsDashboard activeTab="staff" actionStates={{ deploy: 'idle', map: 'idle', log: 'idle' }} handleAction={() => {}} />);
    expect(screen.getByText('Crowd Intelligence')).toBeInTheDocument();
  });

  it('renders Transport tab correctly', () => {
    render(<OperationsDashboard activeTab="transport" actionStates={{ deploy: 'idle', map: 'idle', log: 'idle' }} handleAction={() => {}} />);
    expect(screen.getByText('Transport & Logistics')).toBeInTheDocument();
  });

  it('triggers handleAction on button click', () => {
    const handleActionMock = vi.fn();
    render(<OperationsDashboard activeTab="staff" actionStates={{ deploy: 'idle', map: 'idle', log: 'idle' }} handleAction={handleActionMock} />);
    
    const deployBtn = screen.getByText('Deploy Staff');
    fireEvent.click(deployBtn);
    expect(handleActionMock).toHaveBeenCalledWith('deploy');
  });
});
