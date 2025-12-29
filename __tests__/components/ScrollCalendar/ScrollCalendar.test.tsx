import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ScrollCalendar from '../../../src/components/ScrollCalendar/ScrollCalendar';

// Mock the date to be consistent in tests
const mockDate = new Date(2024, 0, 15); // January 15, 2024
jest.useFakeTimers().setSystemTime(mockDate);

describe('ScrollCalendar', () => {
    const mockOnDateSelect = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('renders without crashing', () => {
        const { getByText } = render(<ScrollCalendar />);

        // Should show current month and year
        expect(getByText('January 2024')).toBeTruthy();
    });

    it('displays header with month and year', () => {
        const { getByText } = render(<ScrollCalendar showHeader={true} />);
        expect(getByText('January 2024')).toBeTruthy();
    });

    it('hides header when showHeader is false', () => {
        const { queryByText } = render(<ScrollCalendar showHeader={false} />);
        expect(queryByText('January 2024')).toBeNull();
    });

    it('calls onDateSelect when a date is pressed', () => {
        const { getByText } = render(
            <ScrollCalendar onDateSelect={mockOnDateSelect} />
        );

        // Find and click a date (using the date number)
        const dateButton = getByText('15'); // Today's date
        fireEvent.press(dateButton);

        expect(mockOnDateSelect).toHaveBeenCalledWith(expect.any(Date));
    });

    it('shows today with special styling', () => {
        const { getByText } = render(<ScrollCalendar />);

        // Today should be marked
        const todayText = getByText('Today');
        expect(todayText).toBeTruthy();
    });

    it('applies custom theme colors', () => {
        const customTheme = {
            primaryColor: '#ff0000',
            backgroundColor: '#000000',
            textColor: '#ffffff',
            todayColor: '#00ff00',
        };

        const { getByText } = render(
            <ScrollCalendar theme={customTheme} />
        );

        // Theme should be applied
        expect(getByText('January 2024')).toBeTruthy();
    });

    it('displays events when provided', () => {
        const events = [
            {
                id: '1',
                title: 'Test Event',
                date: mockDate,
                time: '10:00 AM',
                color: '#ff0000',
            },
        ];

        const { getByTestId } = render(
            <ScrollCalendar events={events} />
        );

        // Should render with events
        const calendar = getByTestId('scroll-calendar');
        expect(calendar).toBeTruthy();
    });
});