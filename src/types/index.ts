// Base Event Interface
export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    time: string;
    description?: string;
    color?: string;
}

// Theme Interface
export interface CalendarTheme {
    // ScrollCalendar specific
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    todayColor?: string;
    selectedColor?: string;
    eventColor?: string;
    borderColor?: string;

    // Additional theme properties
    todayTextColor?: string;
    selectedTextColor?: string;
    dayTextColor?: string;
    disabledTextColor?: string;
    headerBackgroundColor?: string;
    headerTextColor?: string;

    // RegularCalendar specific
    navButtonColor?: string;
    navButtonBackground?: string;
    dayCircleBackground?: string;
    selectedDayBackground?: string;
    todayDayBackground?: string;
    eventBadgeColor?: string;
    addButtonColor?: string;
    addButtonTextColor?: string;
}

// ScrollCalendar Props
export interface ScrollCalendarProps {
    onDateSelect?: (date: Date) => void;
    selectedDate?: Date;
    events?: CalendarEvent[];
    daysToShow?: number;
    showHeader?: boolean;
    theme?: CalendarTheme;
}

// RegularCalendar Props
export interface RegularCalendarProps {
    onDateSelect?: (date: Date) => void;
    selectedDate?: Date;
    events?: CalendarEvent[];
    showEvents?: boolean;
    onAddEvent?: (date: Date) => void;
    onEventPress?: (event: CalendarEvent) => void;
    theme?: CalendarTheme;
}

// EventModal Props
export interface EventModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (event: Omit<CalendarEvent, 'id'>) => void;
    selectedDate?: Date;
    event?: CalendarEvent | null;
    theme?: CalendarTheme;
}