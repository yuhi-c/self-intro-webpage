import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, 'Test page', '/');
});

test('shows login when not authenticated', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /enter password/i })).toBeInTheDocument();
});

test('shows home when authenticated', () => {
  localStorage.setItem('isAuthenticated', 'true');
  window.history.pushState({}, 'Test page', '/');
  render(<App />);
  expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument();
});
