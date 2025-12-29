"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDates = exports.getDaysInMonth = exports.getMonthYear = exports.isSameDay = exports.isToday = exports.formatDate = exports.formatDay = void 0;
const formatDay = (date) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const today = new Date();
    if (date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()) {
        return "Today";
    }
    return days[date.getDay()];
};
exports.formatDay = formatDay;
const formatDate = (date) => {
    return date.getDate().toString();
};
exports.formatDate = formatDate;
const isToday = (date) => {
    const today = new Date();
    return (date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear());
};
exports.isToday = isToday;
const isSameDay = (date1, date2) => {
    return (date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear());
};
exports.isSameDay = isSameDay;
const getMonthYear = (date) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
};
exports.getMonthYear = getMonthYear;
const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
};
exports.getDaysInMonth = getDaysInMonth;
const generateDates = (daysToShow = 60) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i <= daysToShow; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
    }
    return dates;
};
exports.generateDates = generateDates;
//# sourceMappingURL=dateUtils.js.map