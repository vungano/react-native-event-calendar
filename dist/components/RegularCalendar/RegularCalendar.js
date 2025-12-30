"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const dateUtils_1 = require("../../utils/dateUtils");
const RegularCalendar_styles_1 = require("./RegularCalendar.styles");
const RegularCalendar = ({ onDateSelect, selectedDate: externalSelectedDate, events = [], showEvents = true, onAddEvent, onEventPress, theme = {}, }) => {
    const [currentDate, setCurrentDate] = (0, react_1.useState)(new Date());
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(externalSelectedDate || null);
    // Enhanced theme with all color options
    const mergedTheme = Object.assign({ 
        // Base colors
        primaryColor: '#6366f1', secondaryColor: '#8b5cf6', backgroundColor: '#ffffff', textColor: '#1f2937', borderColor: '#e5e7eb', 
        // Calendar specific
        todayColor: '#111827', selectedColor: '#fb923c', eventColor: '#fb923c', 
        // Additional theme properties
        navButtonColor: '#374151', navButtonBackground: '#f3f4f6', dayCircleBackground: 'transparent', selectedDayBackground: '#fb923c', todayDayBackground: '#111827', eventBadgeColor: '#6366f1', addButtonColor: '#6366f1', addButtonTextColor: '#ffffff' }, theme);
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
    const handleDayPress = (day) => {
        const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newSelectedDate);
        onDateSelect === null || onDateSelect === void 0 ? void 0 : onDateSelect(newSelectedDate);
    };
    const hasEvent = (day) => {
        return events.some((event) => event.date.getDate() === day &&
            event.date.getMonth() === currentDate.getMonth() &&
            event.date.getFullYear() === currentDate.getFullYear());
    };
    const getEventsForSelectedDate = () => {
        if (!selectedDate)
            return [];
        return events.filter(event => (0, dateUtils_1.isSameDay)(event.date, selectedDate));
    };
    const renderCalendar = () => {
        const { daysInMonth, startingDayOfWeek } = (0, dateUtils_1.getDaysInMonth)(currentDate);
        const days = [];
        const totalCells = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7;
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<react_native_1.View key={`empty-start-${i}`} style={RegularCalendar_styles_1.styles.dayCell}/>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const today = (0, dateUtils_1.isToday)(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
            const selected = selectedDate
                ? day === selectedDate.getDate() &&
                    currentDate.getMonth() === selectedDate.getMonth() &&
                    currentDate.getFullYear() === selectedDate.getFullYear()
                : false;
            const hasEventMarker = hasEvent(day);
            // Get event color if exists
            const event = events.find(e => e.date.getDate() === day &&
                e.date.getMonth() === currentDate.getMonth() &&
                e.date.getFullYear() === currentDate.getFullYear());
            const eventColor = (event === null || event === void 0 ? void 0 : event.color) || mergedTheme.eventColor;
            days.push(<react_native_1.TouchableOpacity key={day} onPress={() => handleDayPress(day)} style={RegularCalendar_styles_1.styles.dayCell} activeOpacity={0.7}>
                    <react_native_1.View style={RegularCalendar_styles_1.styles.dayContainer}>
                        <react_native_1.View style={[
                    RegularCalendar_styles_1.styles.dayCircle,
                    selected
                        ? { backgroundColor: mergedTheme.selectedDayBackground }
                        : today
                            ? { backgroundColor: mergedTheme.todayDayBackground }
                            : { backgroundColor: mergedTheme.dayCircleBackground },
                ]}>
                            <react_native_1.Text style={[
                    RegularCalendar_styles_1.styles.dayText,
                    selected || today
                        ? { color: '#ffffff' }
                        : { color: mergedTheme.textColor },
                ]}>
                                {day}
                            </react_native_1.Text>
                            {hasEventMarker && (<react_native_1.View style={[
                        RegularCalendar_styles_1.styles.eventMarker,
                        {
                            backgroundColor: eventColor,
                        },
                    ]}/>)}
                        </react_native_1.View>
                    </react_native_1.View>
                </react_native_1.TouchableOpacity>);
        }
        const remainingCells = totalCells - (startingDayOfWeek + daysInMonth);
        for (let i = 0; i < remainingCells; i++) {
            days.push(<react_native_1.View key={`empty-end-${i}`} style={RegularCalendar_styles_1.styles.dayCell}/>);
        }
        return days;
    };
    const selectedDateEvents = getEventsForSelectedDate();
    const containerStyle = Object.assign({ backgroundColor: mergedTheme.backgroundColor, borderColor: mergedTheme.borderColor }, RegularCalendar_styles_1.styles.container);
    const navButtonStyle = Object.assign({ backgroundColor: mergedTheme.navButtonBackground }, RegularCalendar_styles_1.styles.navButton);
    const navIconStyle = Object.assign(Object.assign({ color: mergedTheme.navButtonColor }, RegularCalendar_styles_1.styles.navIconBase), { fontSize: react_native_1.Platform.select({ ios: 20, android: 22 }), lineHeight: react_native_1.Platform.select({ ios: 24, android: 28 }), fontWeight: react_native_1.Platform.select({ ios: '600', android: 'bold' }), marginBottom: react_native_1.Platform.select({ ios: -2, android: 8 }) });
    const monthYearTextStyle = Object.assign({ color: mergedTheme.textColor }, RegularCalendar_styles_1.styles.monthYearText);
    const dayOfWeekTextStyle = Object.assign({ color: mergedTheme.textColor }, RegularCalendar_styles_1.styles.dayOfWeekText);
    const addEventButtonStyle = Object.assign({ backgroundColor: mergedTheme.addButtonColor }, RegularCalendar_styles_1.styles.addEventButton);
    const addEventButtonTextStyle = Object.assign({ color: mergedTheme.addButtonTextColor }, RegularCalendar_styles_1.styles.addEventButtonText);
    return (<react_native_1.View style={containerStyle}>
            <react_native_1.View style={RegularCalendar_styles_1.styles.header}>
                <react_native_1.TouchableOpacity onPress={handlePreviousMonth} style={navButtonStyle}>
                    <react_native_1.Text style={navIconStyle}>←</react_native_1.Text>
                </react_native_1.TouchableOpacity>
                <react_native_1.Text style={monthYearTextStyle}>{(0, dateUtils_1.getMonthYear)(currentDate)}</react_native_1.Text>
                <react_native_1.TouchableOpacity onPress={handleNextMonth} style={navButtonStyle}>
                    <react_native_1.Text style={navIconStyle}>→</react_native_1.Text>
                </react_native_1.TouchableOpacity>
            </react_native_1.View>

            <react_native_1.View style={RegularCalendar_styles_1.styles.daysOfWeek}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (<react_native_1.View key={index} style={RegularCalendar_styles_1.styles.dayOfWeekCell}>
                        <react_native_1.Text style={dayOfWeekTextStyle}>
                            {day}
                        </react_native_1.Text>
                    </react_native_1.View>))}
            </react_native_1.View>

            <react_native_1.View style={RegularCalendar_styles_1.styles.calendarGrid}>{renderCalendar()}</react_native_1.View>

            {showEvents && selectedDate && (<react_native_1.View style={RegularCalendar_styles_1.styles.eventsContainer}>
                    <react_native_1.View style={RegularCalendar_styles_1.styles.eventsHeader}>
                        <react_native_1.Text style={[RegularCalendar_styles_1.styles.eventsTitle, { color: mergedTheme.textColor }]}>
                            Events on {selectedDate.getDate()} {(0, dateUtils_1.getMonthYear)(selectedDate).split(' ')[0]}
                        </react_native_1.Text>
                    </react_native_1.View>

                    {selectedDateEvents.length === 0 ? (<react_native_1.View style={RegularCalendar_styles_1.styles.noEventsContainer}>
                            <react_native_1.Text style={[RegularCalendar_styles_1.styles.noEventsText, { color: mergedTheme.textColor }]}>
                                No events scheduled for this day
                            </react_native_1.Text>
                            {onAddEvent && (<react_native_1.TouchableOpacity onPress={() => onAddEvent(selectedDate)} style={addEventButtonStyle}>
                                    <react_native_1.Text style={addEventButtonTextStyle}>Add Event</react_native_1.Text>
                                </react_native_1.TouchableOpacity>)}
                        </react_native_1.View>) : (selectedDateEvents.map((event) => (<react_native_1.TouchableOpacity key={event.id} style={[
                    RegularCalendar_styles_1.styles.eventItem,
                    { borderLeftColor: event.color || mergedTheme.primaryColor }
                ]} onPress={() => onEventPress === null || onEventPress === void 0 ? void 0 : onEventPress(event)}>
                                <react_native_1.View style={RegularCalendar_styles_1.styles.eventContent}>
                                    <react_native_1.Text style={[RegularCalendar_styles_1.styles.eventTitle, { color: mergedTheme.textColor }]}>
                                        {event.title}
                                    </react_native_1.Text>
                                    <react_native_1.Text style={[RegularCalendar_styles_1.styles.eventTime, { color: mergedTheme.textColor }]}>
                                        {event.time}
                                    </react_native_1.Text>
                                    {event.description && (<react_native_1.Text style={[RegularCalendar_styles_1.styles.eventDescription, { color: mergedTheme.textColor }]}>
                                            {event.description}
                                        </react_native_1.Text>)}
                                </react_native_1.View>
                            </react_native_1.TouchableOpacity>)))}
                </react_native_1.View>)}
        </react_native_1.View>);
};
exports.default = RegularCalendar;
//# sourceMappingURL=RegularCalendar.js.map