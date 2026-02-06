import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, 'Test page', '/');
  jest.restoreAllMocks();
  global.fetch = jest.fn();
});

test('shows login when not authenticated', () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ authenticated: false }),
  });
  render(<App />);
  return screen.findByRole('heading', { name: /enter password/i });
});

test('shows home when authenticated', () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ authenticated: true }),
  });
  render(<App />);
  return screen.findByRole('heading', { name: /about me/i });
});
