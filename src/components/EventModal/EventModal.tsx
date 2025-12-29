import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { EventModalProps, CalendarEvent } from '../../types';
import { styles } from './EventModal.styles';

const EventModal: React.FC<EventModalProps> = ({
    visible,
    onClose,
    onSave,
    selectedDate = new Date(),
    event = null,
    theme = {},
}) => {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#6366f1');

    const mergedTheme = {
        primaryColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        borderColor: '#e5e7eb',
        addButtonColor: '#6366f1',
        addButtonTextColor: '#ffffff',
        ...theme,
    };

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setTime(event.time);
            setDescription(event.description || '');
            setColor(event.color || '#6366f1');
        } else {
            setTitle('');
            setTime('All day');
            setDescription('');
            setColor('#6366f1');
        }
    }, [event, visible]);

    const handleSave = () => {
        if (!title.trim()) return;

        const newEvent: Omit<CalendarEvent, 'id'> = {
            title: title.trim(),
            date: selectedDate,
            time: time.trim() || 'All day',
            description: description.trim() || '', // Changed from undefined to empty string
            color,
        };

        onSave(newEvent);
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setTime('All day');
        setDescription('');
        setColor('#6366f1');
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const formatDate = (date: Date): string => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    const containerStyle: ViewStyle = {
        backgroundColor: mergedTheme.backgroundColor,
    };

    const headerTextStyle: TextStyle = {
        color: mergedTheme.textColor,
    };

    const inputStyle: ViewStyle = {
        backgroundColor: '#f9fafb',
        borderColor: mergedTheme.borderColor,
    };

    const inputTextStyle: TextStyle = {
        color: mergedTheme.textColor,
    };

    const saveButtonStyle: ViewStyle = {
        backgroundColor: mergedTheme.addButtonColor,
    };

    const saveButtonTextStyle: TextStyle = {
        color: mergedTheme.addButtonTextColor,
    };

    const colorOptions = [
        '#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444',
    ];

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
            statusBarTranslucent={Platform.OS === 'android'}
            onRequestClose={handleClose}
        >
            <View style={[styles.container, containerStyle]}>
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, headerTextStyle]}>
                        {event ? 'Edit Event' : 'Add Event'}
                    </Text>
                    <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                        <Text style={[styles.closeButtonText, headerTextStyle]}>×</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dateContainer}>
                    <Text style={[styles.dateText, headerTextStyle]}>
                        {formatDate(selectedDate)}
                    </Text>
                </View>

                <ScrollView
                    style={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formGroup}>
                        <Text style={[styles.label, headerTextStyle]}>Event Title *</Text>
                        <TextInput
                            style={[styles.input, inputStyle, inputTextStyle]}
                            placeholder="Enter event title"
                            placeholderTextColor="#9ca3af"
                            value={title}
                            onChangeText={setTitle}
                            autoFocus={!event}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={[styles.label, headerTextStyle]}>Time</Text>
                        <TextInput
                            style={[styles.input, inputStyle, inputTextStyle]}
                            placeholder="e.g., 10:00 AM or All day"
                            placeholderTextColor="#9ca3af"
                            value={time}
                            onChangeText={setTime}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={[styles.label, headerTextStyle]}>Color</Text>
                        <View style={styles.colorContainer}>
                            {colorOptions.map((colorOption) => (
                                <TouchableOpacity
                                    key={colorOption}
                                    style={[
                                        styles.colorOption,
                                        { backgroundColor: colorOption },
                                        color === colorOption && styles.selectedColorOption,
                                    ]}
                                    onPress={() => setColor(colorOption)}
                                >
                                    {color === colorOption && <Text style={styles.colorCheck}>✓</Text>}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={[styles.label, headerTextStyle]}>Description</Text>
                        <TextInput
                            style={[styles.textArea, inputStyle, inputTextStyle]}
                            placeholder="Add description (optional)"
                            placeholderTextColor="#9ca3af"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.saveButton, saveButtonStyle]}
                            onPress={handleSave}
                            disabled={!title.trim()}
                        >
                            <Text style={[styles.saveButtonText, saveButtonTextStyle]}>
                                {event ? 'Update Event' : 'Add Event'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default EventModal;