import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { ScrollCalendarProps, CalendarEvent } from '../../types';
import { formatDay, formatDate, isToday, isSameDay, generateDates, getMonthYear } from '../../utils/dateUtils';
import { styles } from './ScrollCalendar.styles';

const ScrollCalendar: React.FC<ScrollCalendarProps> = ({
    onDateSelect,
    selectedDate: externalSelectedDate,
    events = [],
    daysToShow = 60,
    showHeader = true,
    theme = {},
}) => {
    const [selectedDate, setSelectedDate] = useState<Date>(externalSelectedDate || new Date());
    const [currentMonth, setCurrentMonth] = useState<string>('');
    const [currentYear, setCurrentYear] = useState<string>('');
    const scrollViewRef = useRef<ScrollView>(null);
    const itemWidth = 72;

    const dates = generateDates(daysToShow);

    // Enhanced theme with all color options
    const mergedTheme = {
        // Base colors
        primaryColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        borderColor: '#e5e7eb',

        // ScrollCalendar specific
        todayColor: '#111827',
        selectedColor: '#6366f1',
        eventColor: '#ef4444',

        // Text colors
        todayTextColor: '#ffffff',
        selectedTextColor: '#ffffff',
        dayTextColor: '#1f2937',

        // Header colors
        headerBackgroundColor: '#ffffff',
        headerTextColor: '#1f2937',

        // Apply custom theme
        ...theme,
    };

    const handleDatePress = (date: Date) => {
        setSelectedDate(date);
        updateMonthDisplay(date);
        onDateSelect?.(date);
    };

    const updateMonthDisplay = (date: Date) => {
        const monthYear = getMonthYear(date);
        const [month, year] = monthYear.split(' ');
        setCurrentMonth(month);
        setCurrentYear(year);
    };

    const handleScroll = (event: any) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const screenWidth = Dimensions.get('window').width;
        const centerPosition = scrollX + screenWidth / 2;

        const dateIndex = Math.round(centerPosition / itemWidth);
        if (dates[dateIndex]) {
            updateMonthDisplay(dates[dateIndex]);
        }
    };

    const hasEvent = (date: Date): boolean => {
        return events.some((event: CalendarEvent) => isSameDay(event.date, date));
    };

    const getEventColor = (date: Date): string => {
        const event = events.find((e: CalendarEvent) => isSameDay(e.date, date));
        return event?.color || mergedTheme.eventColor;
    };

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, animated: false });
        }
        const today = new Date();
        setSelectedDate(today);
        updateMonthDisplay(today);
    }, []);

    useEffect(() => {
        if (externalSelectedDate && !isSameDay(externalSelectedDate, selectedDate)) {
            setSelectedDate(externalSelectedDate);
            updateMonthDisplay(externalSelectedDate);
        }
    }, [externalSelectedDate]);

    // Apply theme styles
    const containerStyle: ViewStyle = {
        ...styles.container,
        backgroundColor: mergedTheme.backgroundColor,
        borderColor: mergedTheme.borderColor,
    };

    const headerStyle: ViewStyle = {
        ...styles.header,
        backgroundColor: mergedTheme.headerBackgroundColor,
        borderBottomColor: mergedTheme.borderColor,
    };

    const headerTextStyle: TextStyle = {
        ...styles.headerText,
        color: mergedTheme.headerTextColor,
    };

    const dayTextStyle: TextStyle = {
        ...styles.dayText,
        color: mergedTheme.dayTextColor,
    };

    return (
        <View style={containerStyle}>
            {showHeader && (
                <View style={headerStyle}>
                    <Text style={headerTextStyle}>
                        {currentMonth} {currentYear}
                    </Text>
                </View>
            )}

            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {dates.map((date, index) => {
                    const today = isToday(date);
                    const selected = isSameDay(date, selectedDate);
                    const hasEventToday = hasEvent(date);
                    const eventColor = getEventColor(date);

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleDatePress(date)}
                            style={styles.dateItem}
                        >
                            <View style={styles.dateContainer}>
                                <Text
                                    style={[
                                        dayTextStyle,
                                        today && { color: '#000000' },
                                        selected && !today && { color: mergedTheme.selectedTextColor || mergedTheme.textColor }
                                    ]}
                                >
                                    {formatDay(date)}
                                </Text>

                                <View
                                    style={[
                                        styles.dateCircle,
                                        today
                                            ? { backgroundColor: mergedTheme.todayColor }
                                            : selected
                                                ? { backgroundColor: mergedTheme.selectedColor }
                                                : {},
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.dateText,
                                            today
                                                ? { color: '#ffffff' }
                                                : selected
                                                    ? { color: mergedTheme.selectedTextColor || '#ffffff' }
                                                    : { color: mergedTheme.dayTextColor },
                                        ]}
                                    >
                                        {formatDate(date)}
                                    </Text>
                                </View>

                                {hasEventToday && (
                                    <View
                                        style={[
                                            styles.eventIndicator,
                                            { backgroundColor: eventColor },
                                        ]}
                                    />
                                )}

                                {selected && !today && (
                                    <View
                                        style={[
                                            styles.selectedIndicator,
                                            { backgroundColor: mergedTheme.selectedColor },
                                        ]}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default ScrollCalendar;
export type { ScrollCalendarProps };