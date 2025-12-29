import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.select({
            ios: 56,
            default: 56,
        }),
        paddingBottom: 12,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    closeButtonText: {
        fontSize: 28,
        fontWeight: '400',
        lineHeight: 28,
    },
    dateContainer: {
        paddingHorizontal: 20,
        paddingTop: 4,
        paddingBottom: 16,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        opacity: 0.8,
    },
    scrollContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    formGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    textArea: {
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        borderWidth: 1,
        minHeight: 100,
        overflow: 'hidden',
    },
    colorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    selectedColorOption: {
        borderWidth: 3,
        borderColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    colorCheck: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        paddingHorizontal: 0,
        paddingTop: 24,
        paddingBottom: Platform.select({
            ios: 40,
            default: 60,
        }),
    },
    saveButton: {
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});