import { render, screen } from '@testing-library/react';
import App from './App';

test('renders table with user data', async () => {
  // Render App component
  render(<App />);

  // Wait for the component to load and display user data
  const usersTable = await screen.findByRole('table');

  // Check if the user data is rendered correctly
  expect(usersTable).toBeInTheDocument();
  const nameRows = await screen.findAllByTestId('name');
  expect(nameRows).toHaveLength(5);
  expect(nameRows[0]).toHaveTextContent('Leanne Graham');
  expect(nameRows[1]).toHaveTextContent('Ervin Howell');
  const emailRows = await screen.findAllByTestId('email');
  expect(emailRows).toHaveLength(5);
  expect(emailRows[0]).toHaveTextContent('Sincere@april.biz');
  expect(emailRows[1]).toHaveTextContent('Shanna@melissa.tv');
});
