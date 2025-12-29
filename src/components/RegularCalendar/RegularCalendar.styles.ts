import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 3,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    monthYearText: {
        fontSize: 17,
        fontWeight: '600',
    },
    navButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    navIconBase: {
        fontSize: 24,
        lineHeight: 26,
        fontWeight: '600',
        textAlign: 'center',
        includeFontPadding: false,
    },
    daysOfWeek: {
        flexDirection: 'row',
        marginBottom: 8,
        borderBottomWidth: 0,
        paddingBottom: 8,
    },
    dayOfWeekCell: {
        flex: 1,
        alignItems: 'center',
    },
    dayOfWeekText: {
        fontSize: 14,
        fontWeight: '600',
        opacity: 0.7,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        padding: 4,
    },
    dayContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    dayText: {
        fontSize: 16,
        fontWeight: '600',
    },
    eventMarker: {
        position: 'absolute',
        bottom: 4,
        width: 4,
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
    },
    eventsContainer: {
        marginTop: 20,
        paddingTop: 16,
        borderTopWidth: 0,
    },
    eventsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    eventsTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    eventCountBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
    },
    eventCountText: {
        fontSize: 12,
        fontWeight: '600',
    },
    noEventsContainer: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    noEventsText: {
        fontSize: 14,
        marginBottom: 16,
        opacity: 0.7,
    },
    addEventButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
    addEventButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    eventItem: {
        backgroundColor: '#f9fafb',
        borderRadius: 0,
        padding: 12,
        marginBottom: 8,
        borderLeftWidth: 3,
    },
    eventContent: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    eventTime: {
        fontSize: 13,
        opacity: 0.8,
        marginBottom: 4,
    },
    eventDescription: {
        fontSize: 13,
        opacity: 0.6,
    },
});