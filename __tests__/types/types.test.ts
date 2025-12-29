import type {
    CalendarEvent,
    ScrollCalendarProps,
    RegularCalendarProps,
    CalendarTheme,
    EventModalProps,
} from '../../src/types';

describe('TypeScript Type Definitions', () => {
    describe('CalendarEvent', () => {
        it('has correct required properties', () => {
            const event: CalendarEvent = {
                id: '1',
                title: 'Test Event',
                date: new Date(),
                time: '10:00 AM',
            };

            expect(event.id).toBe('1');
            expect(event.title).toBe('Test Event');
            expect(event.date).toBeInstanceOf(Date);
            expect(event.time).toBe('10:00 AM');
        });

        it('allows optional properties', () => {
            const event: CalendarEvent = {
                id: '2',
                title: 'Another Event',
                date: new Date(),
                time: '2:00 PM',
                description: 'Optional description',
                color: '#ff0000',
            };

            expect(event.description).toBe('Optional description');
            expect(event.color).toBe('#ff0000');
        });
    });

    describe('CalendarTheme', () => {
        it('allows partial theme customization', () => {
            const theme: CalendarTheme = {
                primaryColor: '#6366f1',
                backgroundColor: '#ffffff',
                textColor: '#1f2937',
            };

            expect(theme.primaryColor).toBe('#6366f1');
            expect(theme.backgroundColor).toBe('#ffffff');
            expect(theme.textColor).toBe('#1f2937');
        });

        it('allows full theme customization', () => {
            const theme: CalendarTheme = {
                primaryColor: '#ff0000',
                secondaryColor: '#00ff00',
                backgroundColor: '#000000',
                textColor: '#ffffff',
                todayColor: '#ffff00',
                selectedColor: '#ff00ff',
                eventColor: '#00ffff',
                borderColor: '#cccccc',
                todayTextColor: '#000000',
                selectedTextColor: '#000000',
                dayTextColor: '#333333',
                disabledTextColor: '#999999',
                headerBackgroundColor: '#f0f0f0',
                headerTextColor: '#333333',
                navButtonColor: '#666666',
                navButtonBackground: '#f5f5f5',
                dayCircleBackground: '#ffffff',
                selectedDayBackground: '#ff0000',
                todayDayBackground: '#ffff00',
                eventBadgeColor: '#00ff00',
                addButtonColor: '#0000ff',
                addButtonTextColor: '#ffffff',
            };

            // Just check a few properties
            expect(theme.primaryColor).toBe('#ff0000');
            expect(theme.backgroundColor).toBe('#000000');
            expect(theme.textColor).toBe('#ffffff');
        });
    });

    describe('ScrollCalendarProps', () => {
        it('has correct prop types', () => {
            const props: ScrollCalendarProps = {
                onDateSelect: jest.fn(),
                selectedDate: new Date(),
                events: [],
                daysToShow: 60, // Note: This is daysToShow, not daysBefore/daysAfter
                showHeader: true,
                theme: { primaryColor: '#ff0000' },
            };

            expect(props.onDateSelect).toBeDefined();
            expect(props.selectedDate).toBeInstanceOf(Date);
            expect(props.events).toEqual([]);
            expect(props.daysToShow).toBe(60); // This should be 60, not daysBefore/After
            expect(props.showHeader).toBe(true);
            expect(props.theme?.primaryColor).toBe('#ff0000');
        });

        it('allows optional props', () => {
            const props: ScrollCalendarProps = {};

            expect(props).toBeDefined();
            expect(props.onDateSelect).toBeUndefined();
            expect(props.selectedDate).toBeUndefined();
            expect(props.events).toBeUndefined();
            expect(props.daysToShow).toBeUndefined(); // Optional
            expect(props.showHeader).toBeUndefined(); // Optional
            expect(props.theme).toBeUndefined(); // Optional
        });

        it('uses default values when not provided', () => {
            // This tests that the interface allows undefined values
            const props: ScrollCalendarProps = {
                onDateSelect: jest.fn(),
                // Other props are optional
            };

            expect(props.onDateSelect).toBeDefined();
            expect(props.selectedDate).toBeUndefined();
            expect(props.events).toBeUndefined();
        });
    });

    describe('RegularCalendarProps', () => {
        it('has correct prop types', () => {
            const props: RegularCalendarProps = {
                onDateSelect: jest.fn(),
                selectedDate: new Date(),
                events: [],
                showEvents: true,
                onAddEvent: jest.fn(),
                onEventPress: jest.fn(),
                theme: { primaryColor: '#ff0000' },
            };

            expect(props.onDateSelect).toBeDefined();
            expect(props.selectedDate).toBeInstanceOf(Date);
            expect(props.events).toEqual([]);
            expect(props.showEvents).toBe(true);
            expect(props.onAddEvent).toBeDefined();
            expect(props.onEventPress).toBeDefined();
            expect(props.theme?.primaryColor).toBe('#ff0000');
        });

        it('allows optional props', () => {
            const props: RegularCalendarProps = {};

            expect(props).toBeDefined();
            expect(props.onDateSelect).toBeUndefined();
            expect(props.selectedDate).toBeUndefined();
            expect(props.events).toBeUndefined();
            expect(props.showEvents).toBeUndefined();
            expect(props.onAddEvent).toBeUndefined();
            expect(props.onEventPress).toBeUndefined();
            expect(props.theme).toBeUndefined();
        });
    });

    describe('EventModalProps', () => {
        it('has correct prop types', () => {
            const props: EventModalProps = {
                visible: true,
                onClose: jest.fn(),
                onSave: jest.fn(),
                selectedDate: new Date(),
                event: null,
                theme: { primaryColor: '#ff0000' },
            };

            expect(props.visible).toBe(true);
            expect(props.onClose).toBeDefined();
            expect(props.onSave).toBeDefined();
            expect(props.selectedDate).toBeInstanceOf(Date);
            expect(props.event).toBeNull();
            expect(props.theme?.primaryColor).toBe('#ff0000');
        });

        it('allows event to be CalendarEvent or null', () => {
            const event: CalendarEvent = {
                id: '1',
                title: 'Test Event',
                date: new Date(),
                time: '10:00 AM',
            };

            const props1: EventModalProps = {
                visible: true,
                onClose: jest.fn(),
                onSave: jest.fn(),
                event: event, // Can be CalendarEvent
            };

            const props2: EventModalProps = {
                visible: true,
                onClose: jest.fn(),
                onSave: jest.fn(),
                event: null, // Or null
            };

            expect(props1.event).toBe(event);
            expect(props2.event).toBeNull();
        });
    });
});