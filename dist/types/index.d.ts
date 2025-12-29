export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    time: string;
    description?: string;
    color?: string;
}
export interface CalendarTheme {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    todayColor?: string;
    selectedColor?: string;
    eventColor?: string;
    borderColor?: string;
    todayTextColor?: string;
    selectedTextColor?: string;
    dayTextColor?: string;
    disabledTextColor?: string;
    headerBackgroundColor?: string;
    headerTextColor?: string;
    navButtonColor?: string;
    navButtonBackground?: string;
    dayCircleBackground?: string;
    selectedDayBackground?: string;
    todayDayBackground?: string;
    eventBadgeColor?: string;
    addButtonColor?: string;
    addButtonTextColor?: string;
}
export interface ScrollCalendarProps {
    onDateSelect?: (date: Date) => void;
    selectedDate?: Date;
    events?: CalendarEvent[];
    daysToShow?: number;
    showHeader?: boolean;
    theme?: CalendarTheme;
}
export interface RegularCalendarProps {
    onDateSelect?: (date: Date) => void;
    selectedDate?: Date;
    events?: CalendarEvent[];
    showEvents?: boolean;
    onAddEvent?: (date: Date) => void;
    onEventPress?: (event: CalendarEvent) => void;
    theme?: CalendarTheme;
}
export interface EventModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (event: Omit<CalendarEvent, 'id'>) => void;
    selectedDate?: Date;
    event?: CalendarEvent | null;
    theme?: CalendarTheme;
}
//# sourceMappingURL=index.d.ts.map