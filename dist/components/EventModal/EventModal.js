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
const EventModal_styles_1 = require("./EventModal.styles");
const EventModal = ({ visible, onClose, onSave, selectedDate = new Date(), event = null, theme = {}, }) => {
    const [title, setTitle] = (0, react_1.useState)('');
    const [time, setTime] = (0, react_1.useState)('');
    const [description, setDescription] = (0, react_1.useState)('');
    const [color, setColor] = (0, react_1.useState)('#6366f1');
    const mergedTheme = Object.assign({ primaryColor: '#6366f1', secondaryColor: '#8b5cf6', backgroundColor: '#ffffff', textColor: '#1f2937', borderColor: '#e5e7eb', addButtonColor: '#6366f1', addButtonTextColor: '#ffffff' }, theme);
    (0, react_1.useEffect)(() => {
        if (event) {
            setTitle(event.title);
            setTime(event.time);
            setDescription(event.description || '');
            setColor(event.color || '#6366f1');
        }
        else {
            setTitle('');
            setTime('All day');
            setDescription('');
            setColor('#6366f1');
        }
    }, [event, visible]);
    const handleSave = () => {
        if (!title.trim())
            return;
        const newEvent = {
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
    const formatDate = (date) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };
    const containerStyle = {
        backgroundColor: mergedTheme.backgroundColor,
    };
    const headerTextStyle = {
        color: mergedTheme.textColor,
    };
    const inputStyle = {
        backgroundColor: '#f9fafb',
        borderColor: mergedTheme.borderColor,
    };
    const inputTextStyle = {
        color: mergedTheme.textColor,
    };
    const saveButtonStyle = {
        backgroundColor: mergedTheme.addButtonColor,
    };
    const saveButtonTextStyle = {
        color: mergedTheme.addButtonTextColor,
    };
    const colorOptions = [
        '#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444',
    ];
    return (<react_native_1.Modal visible={visible} animationType="slide" transparent={false} statusBarTranslucent={react_native_1.Platform.OS === 'android'} onRequestClose={handleClose}>
            <react_native_1.View style={[EventModal_styles_1.styles.container, containerStyle]}>
                <react_native_1.View style={EventModal_styles_1.styles.header}>
                    <react_native_1.Text style={[EventModal_styles_1.styles.headerTitle, headerTextStyle]}>
                        {event ? 'Edit Event' : 'Add Event'}
                    </react_native_1.Text>
                    <react_native_1.TouchableOpacity onPress={handleClose} style={EventModal_styles_1.styles.closeButton}>
                        <react_native_1.Text style={[EventModal_styles_1.styles.closeButtonText, headerTextStyle]}>×</react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>

                <react_native_1.View style={EventModal_styles_1.styles.dateContainer}>
                    <react_native_1.Text style={[EventModal_styles_1.styles.dateText, headerTextStyle]}>
                        {formatDate(selectedDate)}
                    </react_native_1.Text>
                </react_native_1.View>

                <react_native_1.ScrollView style={EventModal_styles_1.styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <react_native_1.View style={EventModal_styles_1.styles.formGroup}>
                        <react_native_1.Text style={[EventModal_styles_1.styles.label, headerTextStyle]}>Event Title *</react_native_1.Text>
                        <react_native_1.TextInput style={[EventModal_styles_1.styles.input, inputStyle, inputTextStyle]} placeholder="Enter event title" placeholderTextColor="#9ca3af" value={title} onChangeText={setTitle} autoFocus={!event}/>
                    </react_native_1.View>

                    <react_native_1.View style={EventModal_styles_1.styles.formGroup}>
                        <react_native_1.Text style={[EventModal_styles_1.styles.label, headerTextStyle]}>Time</react_native_1.Text>
                        <react_native_1.TextInput style={[EventModal_styles_1.styles.input, inputStyle, inputTextStyle]} placeholder="e.g., 10:00 AM or All day" placeholderTextColor="#9ca3af" value={time} onChangeText={setTime}/>
                    </react_native_1.View>

                    <react_native_1.View style={EventModal_styles_1.styles.formGroup}>
                        <react_native_1.Text style={[EventModal_styles_1.styles.label, headerTextStyle]}>Color</react_native_1.Text>
                        <react_native_1.View style={EventModal_styles_1.styles.colorContainer}>
                            {colorOptions.map((colorOption) => (<react_native_1.TouchableOpacity key={colorOption} style={[
                EventModal_styles_1.styles.colorOption,
                { backgroundColor: colorOption },
                color === colorOption && EventModal_styles_1.styles.selectedColorOption,
            ]} onPress={() => setColor(colorOption)}>
                                    {color === colorOption && <react_native_1.Text style={EventModal_styles_1.styles.colorCheck}>✓</react_native_1.Text>}
                                </react_native_1.TouchableOpacity>))}
                        </react_native_1.View>
                    </react_native_1.View>

                    <react_native_1.View style={EventModal_styles_1.styles.formGroup}>
                        <react_native_1.Text style={[EventModal_styles_1.styles.label, headerTextStyle]}>Description</react_native_1.Text>
                        <react_native_1.TextInput style={[EventModal_styles_1.styles.textArea, inputStyle, inputTextStyle]} placeholder="Add description (optional)" placeholderTextColor="#9ca3af" value={description} onChangeText={setDescription} multiline numberOfLines={4} textAlignVertical="top"/>
                    </react_native_1.View>

                    <react_native_1.View style={EventModal_styles_1.styles.footer}>
                        <react_native_1.TouchableOpacity style={[EventModal_styles_1.styles.saveButton, saveButtonStyle]} onPress={handleSave} disabled={!title.trim()}>
                            <react_native_1.Text style={[EventModal_styles_1.styles.saveButtonText, saveButtonTextStyle]}>
                                {event ? 'Update Event' : 'Add Event'}
                            </react_native_1.Text>
                        </react_native_1.TouchableOpacity>
                    </react_native_1.View>
                </react_native_1.ScrollView>
            </react_native_1.View>
        </react_native_1.Modal>);
};
exports.default = EventModal;
//# sourceMappingURL=EventModal.js.map