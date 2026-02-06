import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, 'Test page', '/');
  jest.restoreAllMocks();
});

test('shows home', () => {
  render(<App />);
  return screen.findByRole('heading', { name: /about me/i });
});
