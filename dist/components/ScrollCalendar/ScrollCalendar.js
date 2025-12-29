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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const dateUtils_1 = require("../../utils/dateUtils");
const ScrollCalendar_styles_1 = require("./ScrollCalendar.styles");
const ScrollCalendar = ({ onDateSelect, selectedDate: externalSelectedDate, events = [], daysToShow = 60, showHeader = true, theme = {}, }) => {
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(externalSelectedDate || new Date());
    const [currentMonth, setCurrentMonth] = (0, react_1.useState)('');
    const [currentYear, setCurrentYear] = (0, react_1.useState)('');
    const scrollViewRef = (0, react_1.useRef)(null);
    const itemWidth = 72;
    const dates = (0, dateUtils_1.generateDates)(daysToShow);
    // Enhanced theme with all color options
    const mergedTheme = Object.assign({ 
        // Base colors
        primaryColor: '#6366f1', secondaryColor: '#8b5cf6', backgroundColor: '#ffffff', textColor: '#1f2937', borderColor: '#e5e7eb', 
        // ScrollCalendar specific
        todayColor: '#111827', selectedColor: '#6366f1', eventColor: '#ef4444', 
        // Text colors
        todayTextColor: '#ffffff', selectedTextColor: '#ffffff', dayTextColor: '#1f2937', 
        // Header colors
        headerBackgroundColor: '#ffffff', headerTextColor: '#1f2937' }, theme);
    const handleDatePress = (date) => {
        setSelectedDate(date);
        updateMonthDisplay(date);
        onDateSelect === null || onDateSelect === void 0 ? void 0 : onDateSelect(date);
    };
    const updateMonthDisplay = (date) => {
        const monthYear = (0, dateUtils_1.getMonthYear)(date);
        const [month, year] = monthYear.split(' ');
        setCurrentMonth(month);
        setCurrentYear(year);
    };
    const handleScroll = (event) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const screenWidth = react_native_1.Dimensions.get('window').width;
        const centerPosition = scrollX + screenWidth / 2;
        const dateIndex = Math.round(centerPosition / itemWidth);
        if (dates[dateIndex]) {
            updateMonthDisplay(dates[dateIndex]);
        }
    };
    const hasEvent = (date) => {
        return events.some((event) => (0, dateUtils_1.isSameDay)(event.date, date));
    };
    const getEventColor = (date) => {
        const event = events.find((e) => (0, dateUtils_1.isSameDay)(e.date, date));
        return (event === null || event === void 0 ? void 0 : event.color) || mergedTheme.eventColor;
    };
    (0, react_1.useEffect)(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, animated: false });
        }
        const today = new Date();
        setSelectedDate(today);
        updateMonthDisplay(today);
    }, []);
    (0, react_1.useEffect)(() => {
        if (externalSelectedDate && !(0, dateUtils_1.isSameDay)(externalSelectedDate, selectedDate)) {
            setSelectedDate(externalSelectedDate);
            updateMonthDisplay(externalSelectedDate);
        }
    }, [externalSelectedDate]);
    // Apply theme styles
    const containerStyle = Object.assign(Object.assign({}, ScrollCalendar_styles_1.styles.container), { backgroundColor: mergedTheme.backgroundColor, borderColor: mergedTheme.borderColor });
    const headerStyle = Object.assign(Object.assign({}, ScrollCalendar_styles_1.styles.header), { backgroundColor: mergedTheme.headerBackgroundColor, borderBottomColor: mergedTheme.borderColor });
    const headerTextStyle = Object.assign(Object.assign({}, ScrollCalendar_styles_1.styles.headerText), { color: mergedTheme.headerTextColor });
    const dayTextStyle = Object.assign(Object.assign({}, ScrollCalendar_styles_1.styles.dayText), { color: mergedTheme.dayTextColor });
    return (<react_native_1.View style={containerStyle}>
            {showHeader && (<react_native_1.View style={headerStyle}>
                    <react_native_1.Text style={headerTextStyle}>
                        {currentMonth} {currentYear}
                    </react_native_1.Text>
                </react_native_1.View>)}

            <react_native_1.ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={ScrollCalendar_styles_1.styles.scrollContent} onScroll={handleScroll} scrollEventThrottle={16}>
                {dates.map((date, index) => {
            const today = (0, dateUtils_1.isToday)(date);
            const selected = (0, dateUtils_1.isSameDay)(date, selectedDate);
            const hasEventToday = hasEvent(date);
            const eventColor = getEventColor(date);
            return (<react_native_1.TouchableOpacity key={index} onPress={() => handleDatePress(date)} style={ScrollCalendar_styles_1.styles.dateItem}>
                            <react_native_1.View style={ScrollCalendar_styles_1.styles.dateContainer}>
                                <react_native_1.Text style={[
                    dayTextStyle,
                    today && { color: '#000000' },
                    selected && !today && { color: mergedTheme.selectedTextColor || mergedTheme.textColor }
                ]}>
                                    {(0, dateUtils_1.formatDay)(date)}
                                </react_native_1.Text>

                                <react_native_1.View style={[
                    ScrollCalendar_styles_1.styles.dateCircle,
                    today
                        ? { backgroundColor: mergedTheme.todayColor }
                        : selected
                            ? { backgroundColor: mergedTheme.selectedColor }
                            : {},
                ]}>
                                    <react_native_1.Text style={[
                    ScrollCalendar_styles_1.styles.dateText,
                    today
                        ? { color: '#ffffff' }
                        : selected
                            ? { color: mergedTheme.selectedTextColor || '#ffffff' }
                            : { color: mergedTheme.dayTextColor },
                ]}>
                                        {(0, dateUtils_1.formatDate)(date)}
                                    </react_native_1.Text>
                                </react_native_1.View>

                                {hasEventToday && (<react_native_1.View style={[
                        ScrollCalendar_styles_1.styles.eventIndicator,
                        { backgroundColor: eventColor },
                    ]}/>)}

                                {selected && !today && (<react_native_1.View style={[
                        ScrollCalendar_styles_1.styles.selectedIndicator,
                        { backgroundColor: mergedTheme.selectedColor },
                    ]}/>)}
                            </react_native_1.View>
                        </react_native_1.TouchableOpacity>);
        })}
            </react_native_1.ScrollView>
        </react_native_1.View>);
};
exports.default = ScrollCalendar;
//# sourceMappingURL=ScrollCalendar.js.map