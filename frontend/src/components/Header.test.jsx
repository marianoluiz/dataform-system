import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders Header component', () => {
    render(<Header />);
    const headerElement = screen.getByText(/header title/i);
    expect(headerElement).toBeInTheDocument();
});

test('checks functionality of Header component', () => {
    render(<Header />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    buttonElement.click();
    const updatedElement = screen.getByText(/updated text/i);
    expect(updatedElement).toBeInTheDocument();
});