import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegularCalendar from '../../../src/components/RegularCalendar/RegularCalendar';

// Mock date
const mockDate = new Date(2024, 0, 15); // January 15, 2024
jest.useFakeTimers().setSystemTime(mockDate);

describe('RegularCalendar', () => {
    const mockOnDateSelect = jest.fn();
    const mockOnAddEvent = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('renders without crashing', () => {
        const { getByText } = render(<RegularCalendar />);

        // Should show current month and year
        expect(getByText('January 2024')).toBeTruthy();
    });

    it('displays navigation buttons', () => {
        const { getByText } = render(<RegularCalendar />);

        expect(getByText('‹')).toBeTruthy(); // Previous month
        expect(getByText('›')).toBeTruthy(); // Next month
    });

    it('calls onDateSelect when a day is clicked', () => {
        const { getByText } = render(
            <RegularCalendar onDateSelect={mockOnDateSelect} />
        );

        // Click on a day (15th)
        const dayButton = getByText('15');
        fireEvent.press(dayButton);

        expect(mockOnDateSelect).toHaveBeenCalledWith(expect.any(Date));
    });

    it('navigates to next month when next button is clicked', () => {
        const { getByText } = render(<RegularCalendar />);

        const nextButton = getByText('›');
        fireEvent.press(nextButton);

        // Should show February
        expect(getByText('February 2024')).toBeTruthy();
    });

    it('navigates to previous month when previous button is clicked', () => {
        const { getByText } = render(<RegularCalendar />);

        const prevButton = getByText('‹');
        fireEvent.press(prevButton);

        // Should show December
        expect(getByText('December 2023')).toBeTruthy();
    });

    it('shows events section when showEvents is true', () => {
        const { getByText } = render(
            <RegularCalendar showEvents={true} />
        );

        // Click a date to show events section
        const dayButton = getByText('15');
        fireEvent.press(dayButton);

        expect(getByText(/Events on/)).toBeTruthy();
    });

    it('hides events section when showEvents is false', () => {
        const { queryByText } = render(
            <RegularCalendar showEvents={false} />
        );

        // Click a date
        const dayButton = queryByText('15');
        if (dayButton) {
            fireEvent.press(dayButton);
        }

        // Should not show events header
        expect(queryByText(/Events on/)).toBeNull();
    });

    it('calls onAddEvent when add event button is clicked', () => {
        const { getByText } = render(
            <RegularCalendar onAddEvent={mockOnAddEvent} showEvents={true} />
        );

        // Select a date first
        const dayButton = getByText('15');
        fireEvent.press(dayButton);

        // Click add event button
        const addButton = getByText('Add Event');
        fireEvent.press(addButton);

        expect(mockOnAddEvent).toHaveBeenCalledWith(expect.any(Date));
    });

    it('displays events for selected date', () => {
        const events = [
            {
                id: '1',
                title: 'Team Meeting',
                date: mockDate,
                time: '10:00 AM',
            },
        ];

        const { getByText } = render(
            <RegularCalendar events={events} showEvents={true} />
        );

        // Select the date with event
        const dayButton = getByText('15');
        fireEvent.press(dayButton);

        // Should show the event
        expect(getByText('Team Meeting')).toBeTruthy();
        expect(getByText('10:00 AM')).toBeTruthy();
    });
});