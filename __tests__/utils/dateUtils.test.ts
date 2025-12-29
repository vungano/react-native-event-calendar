import {
    formatDay,
    formatDate,
    isToday,
    isSameDay,
    getMonthYear,
    generateDates,
} from '../../src/utils/dateUtils';

describe('dateUtils', () => {
    describe('formatDay', () => {
        it('returns "Today" for current date', () => {
            const today = new Date();
            expect(formatDay(today)).toBe('Today');
        });

        it('returns day abbreviation for other dates', () => {
            // Create a known date (e.g., Monday, January 1, 2024)
            const date = new Date(2024, 0, 1); // January 1, 2024 (Monday)
            expect(formatDay(date)).toBe('M');
        });
    });

    describe('formatDate', () => {
        it('returns date number as string', () => {
            const date = new Date(2024, 0, 15); // January 15, 2024
            expect(formatDate(date)).toBe('15');
        });
    });

    describe('isToday', () => {
        it('returns true for today', () => {
            const today = new Date();
            expect(isToday(today)).toBe(true);
        });

        it('returns false for yesterday', () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            expect(isToday(yesterday)).toBe(false);
        });
    });

    describe('isSameDay', () => {
        it('returns true for same day with different times', () => {
            const date1 = new Date(2024, 0, 15, 10, 0, 0);
            const date2 = new Date(2024, 0, 15, 20, 0, 0);
            expect(isSameDay(date1, date2)).toBe(true);
        });

        it('returns false for different days', () => {
            const date1 = new Date(2024, 0, 15);
            const date2 = new Date(2024, 0, 16);
            expect(isSameDay(date1, date2)).toBe(false);
        });
    });

    describe('getMonthYear', () => {
        it('returns formatted month and year', () => {
            const date = new Date(2024, 0, 15); // January 15, 2024
            expect(getMonthYear(date)).toBe('January 2024');
        });
    });

    describe('generateDates', () => {
        it('generates correct number of dates with default parameter', () => {
            const dates = generateDates(); // Default should be 60 days
            expect(dates.length).toBe(61); // 0 to 60 inclusive = 61 days
        });

        it('generates correct number of dates with custom parameter', () => {
            const dates = generateDates(30); // 0 to 30 inclusive
            expect(dates.length).toBe(31); // 31 days total
        });

        it('includes today', () => {
            const dates = generateDates(7);
            const today = new Date();
            const hasToday = dates.some(date => isSameDay(date, today));
            expect(hasToday).toBe(true);
        });

        it('generates future dates', () => {
            const dates = generateDates(5);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const hasTomorrow = dates.some(date => isSameDay(date, tomorrow));
            expect(hasTomorrow).toBe(true);
        });
    });
});