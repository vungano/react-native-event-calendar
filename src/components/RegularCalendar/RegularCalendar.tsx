import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
    TextStyle,
    Platform,
} from 'react-native';
import { RegularCalendarProps, CalendarEvent } from '../../types';
import { getMonthYear, getDaysInMonth, isToday, isSameDay } from '../../utils/dateUtils';
import { styles } from './RegularCalendar.styles';

const RegularCalendar: React.FC<RegularCalendarProps> = ({
    onDateSelect,
    selectedDate: externalSelectedDate,
    events = [],
    showEvents = true,
    onAddEvent,
    onEventPress,
    theme = {},
}) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(externalSelectedDate || null);

    // Enhanced theme with all color options
    const mergedTheme = {
        // Base colors
        primaryColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        borderColor: '#e5e7eb',

        // Calendar specific
        todayColor: '#111827',
        selectedColor: '#fb923c',
        eventColor: '#fb923c',

        // Additional theme properties
        navButtonColor: '#374151',
        navButtonBackground: '#f3f4f6',
        dayCircleBackground: 'transparent',
        selectedDayBackground: '#fb923c',
        todayDayBackground: '#111827',
        eventBadgeColor: '#6366f1',
        addButtonColor: '#6366f1',
        addButtonTextColor: '#ffffff',

        // Apply custom theme
        ...theme,
    };

    const handlePreviousMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const handleDayPress = (day: number) => {
        const newSelectedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        setSelectedDate(newSelectedDate);
        onDateSelect?.(newSelectedDate);
    };

    const hasEvent = (day: number): boolean => {
        return events.some(
            (event) =>
                event.date.getDate() === day &&
                event.date.getMonth() === currentDate.getMonth() &&
                event.date.getFullYear() === currentDate.getFullYear()
        );
    };

    const getEventsForSelectedDate = (): CalendarEvent[] => {
        if (!selectedDate) return [];
        return events.filter(event => isSameDay(event.date, selectedDate));
    };

    const renderCalendar = () => {
        const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
        const days = [];
        const totalCells = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7;

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(
                <View key={`empty-start-${i}`} style={styles.dayCell} />
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const today = isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
            const selected = selectedDate
                ? day === selectedDate.getDate() &&
                currentDate.getMonth() === selectedDate.getMonth() &&
                currentDate.getFullYear() === selectedDate.getFullYear()
                : false;
            const hasEventMarker = hasEvent(day);

            // Get event color if exists
            const event = events.find(e =>
                e.date.getDate() === day &&
                e.date.getMonth() === currentDate.getMonth() &&
                e.date.getFullYear() === currentDate.getFullYear()
            );
            const eventColor = event?.color || mergedTheme.eventColor;

            days.push(
                <TouchableOpacity
                    key={day}
                    onPress={() => handleDayPress(day)}
                    style={styles.dayCell}
                    activeOpacity={0.7}
                >
                    <View style={styles.dayContainer}>
                        <View
                            style={[
                                styles.dayCircle,
                                selected
                                    ? { backgroundColor: mergedTheme.selectedDayBackground }
                                    : today
                                        ? { backgroundColor: mergedTheme.todayDayBackground }
                                        : { backgroundColor: mergedTheme.dayCircleBackground },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    selected || today
                                        ? { color: '#ffffff' }
                                        : { color: mergedTheme.textColor },
                                ]}
                            >
                                {day}
                            </Text>
                            {hasEventMarker && (
                                <View
                                    style={[
                                        styles.eventMarker,
                                        {
                                            backgroundColor: eventColor,
                                        },
                                    ]}
                                />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }

        const remainingCells = totalCells - (startingDayOfWeek + daysInMonth);
        for (let i = 0; i < remainingCells; i++) {
            days.push(
                <View key={`empty-end-${i}`} style={styles.dayCell} />
            );
        }

        return days;
    };

    const selectedDateEvents = getEventsForSelectedDate();

    const containerStyle: ViewStyle = {
        backgroundColor: mergedTheme.backgroundColor,
        borderColor: mergedTheme.borderColor,
        ...styles.container,
    };

    const navButtonStyle: ViewStyle = {
        backgroundColor: mergedTheme.navButtonBackground,
        ...styles.navButton,
    };

    const navIconStyle: TextStyle = {
        color: mergedTheme.navButtonColor,
        ...styles.navIconBase,
        fontSize: Platform.select({ ios: 20, android: 22 }),
        lineHeight: Platform.select({ ios: 24, android: 28 }),
        fontWeight: Platform.select({ ios: '600', android: 'bold' }),
        marginBottom: Platform.select({ ios: -2, android: 8 }),
    };

    const monthYearTextStyle: TextStyle = {
        color: mergedTheme.textColor,
        ...styles.monthYearText,
    };

    const dayOfWeekTextStyle: TextStyle = {
        color: mergedTheme.textColor,
        ...styles.dayOfWeekText,
    };

    const addEventButtonStyle: ViewStyle = {
        backgroundColor: mergedTheme.addButtonColor,
        ...styles.addEventButton,
    };

    const addEventButtonTextStyle: TextStyle = {
        color: mergedTheme.addButtonTextColor,
        ...styles.addEventButtonText,
    };

    return (
        <View style={containerStyle}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePreviousMonth} style={navButtonStyle}>
                    <Text style={navIconStyle}>←</Text>
                </TouchableOpacity>
                <Text style={monthYearTextStyle}>{getMonthYear(currentDate)}</Text>
                <TouchableOpacity onPress={handleNextMonth} style={navButtonStyle}>
                    <Text style={navIconStyle}>→</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.daysOfWeek}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <View key={index} style={styles.dayOfWeekCell}>
                        <Text style={dayOfWeekTextStyle}>
                            {day}
                        </Text>
                    </View>
                ))}
            </View>

            <View style={styles.calendarGrid}>{renderCalendar()}</View>

            {showEvents && selectedDate && (
                <View style={styles.eventsContainer}>
                    <View style={styles.eventsHeader}>
                        <Text style={[styles.eventsTitle, { color: mergedTheme.textColor }]}>
                            Events on {selectedDate.getDate()} {getMonthYear(selectedDate).split(' ')[0]}
                        </Text>
                    </View>

                    {selectedDateEvents.length === 0 ? (
                        <View style={styles.noEventsContainer}>
                            <Text style={[styles.noEventsText, { color: mergedTheme.textColor }]}>
                                No events scheduled for this day
                            </Text>
                            {onAddEvent && (
                                <TouchableOpacity
                                    onPress={() => onAddEvent(selectedDate)}
                                    style={addEventButtonStyle}
                                >
                                    <Text style={addEventButtonTextStyle}>Add Event</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ) : (
                        selectedDateEvents.map((event) => (
                            <TouchableOpacity
                                key={event.id}
                                style={[
                                    styles.eventItem,
                                    { borderLeftColor: event.color || mergedTheme.primaryColor }
                                ]}
                                onPress={() => onEventPress?.(event)}
                            >
                                <View style={styles.eventContent}>
                                    <Text style={[styles.eventTitle, { color: mergedTheme.textColor }]}>
                                        {event.title}
                                    </Text>
                                    <Text style={[styles.eventTime, { color: mergedTheme.textColor }]}>
                                        {event.time}
                                    </Text>
                                    {event.description && (
                                        <Text style={[styles.eventDescription, { color: mergedTheme.textColor }]}>
                                            {event.description}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </View>
            )}
        </View>
    );
};

export default RegularCalendar;
export type { RegularCalendarProps };