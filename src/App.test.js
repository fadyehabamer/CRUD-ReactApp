import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const fill = (label, value) => {
  const field = screen.getByLabelText(label);
  userEvent.clear(field);
  userEvent.type(field, value);
};

const addEmployee = (name, salary, address = 'Cairo', dept = 'IT') => {
  fill(/name/i, name);
  fill(/address/i, address);
  fill(/department/i, dept);
  fill(/salary/i, String(salary));
  userEvent.click(screen.getByRole('button', { name: /submit|save/i }));
};

const rows = () => screen.queryAllByRole('listitem');

test('adds employees to the list', () => {
  render(<App />);
  addEmployee('Ann', 3000);
  addEmployee('Bob', 1000);

  expect(rows()).toHaveLength(2);
  expect(rows()[0]).toHaveTextContent('Ann');
  expect(rows()[1]).toHaveTextContent('Bob');
});

test('does not add an employee with empty fields', () => {
  render(<App />);
  userEvent.click(screen.getByRole('button', { name: /submit|save/i }));
  expect(rows()).toHaveLength(0);
});

test('edits the selected employee', () => {
  render(<App />);
  addEmployee('Ann', 3000);
  addEmployee('Bob', 1000);

  userEvent.click(within(rows()[1]).getByRole('button', { name: /edit/i }));
  expect(screen.getByLabelText(/name/i)).toHaveValue('Bob');
  fill(/name/i, 'Bobby');
  userEvent.click(screen.getByRole('button', { name: /submit|save/i }));

  expect(rows()).toHaveLength(2);
  expect(rows()[1]).toHaveTextContent('Bobby');
  expect(rows()[0]).toHaveTextContent('Ann');
});

test('removing the row being edited cancels the edit instead of crashing', () => {
  render(<App />);
  addEmployee('Ann', 3000);

  userEvent.click(within(rows()[0]).getByRole('button', { name: /edit/i }));
  userEvent.click(within(rows()[0]).getByRole('button', { name: /remove/i }));
  addEmployee('Carl', 2000);

  expect(rows()).toHaveLength(1);
  expect(rows()[0]).toHaveTextContent('Carl');
});

test('editing after sorting updates the right employee', () => {
  render(<App />);
  addEmployee('Ann', 3000);
  addEmployee('Bob', 1000);

  userEvent.click(within(rows()[0]).getByRole('button', { name: /edit/i })); // Ann
  userEvent.click(screen.getByRole('button', { name: /sort/i }));
  fill(/name/i, 'Anna');
  userEvent.click(screen.getByRole('button', { name: /submit|save/i }));

  expect(screen.getByText(/Anna/)).toBeInTheDocument();
  expect(screen.getByText(/Bob/)).toBeInTheDocument();
});

test('sorts by salary numerically', () => {
  render(<App />);
  addEmployee('Ann', 10000);
  addEmployee('Bob', 900);

  userEvent.click(screen.getByRole('button', { name: /sort/i }));

  expect(rows()[0]).toHaveTextContent('Bob');
  expect(rows()[1]).toHaveTextContent('Ann');
});

test('the salary filter can be turned off without losing employees', () => {
  render(<App />);
  addEmployee('Ann', 3000);
  addEmployee('Bob', 1000);

  userEvent.click(screen.getByRole('button', { name: /filter/i }));
  expect(rows()).toHaveLength(1);
  expect(rows()[0]).toHaveTextContent('Ann');

  userEvent.click(screen.getByRole('button', { name: /show all/i }));
  expect(rows()).toHaveLength(2);
});
