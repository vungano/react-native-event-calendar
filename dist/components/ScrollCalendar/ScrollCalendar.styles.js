"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
const react_native_1 = require("react-native");
exports.styles = react_native_1.StyleSheet.create({
    container: {
        marginHorizontal: 1,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 6,
        borderBottomWidth: 0,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    dateItem: {
        marginRight: 16,
    },
    dateContainer: {
        width: 56,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 4,
    },
    dateCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    dateText: {
        fontSize: 16,
        fontWeight: '700',
    },
    eventIndicator: {
        position: 'absolute',
        bottom: -1,
        width: 4,
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
    },
    selectedIndicator: {
        position: 'absolute',
        bottom: -2,
        left: '50%',
        transform: [{ translateX: -2 }],
        width: 4,
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
    },
});
//# sourceMappingURL=ScrollCalendar.styles.js.map