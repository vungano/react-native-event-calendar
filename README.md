# React Native Event Calendar 📅

A modern, customizable event calendar component for React Native with both scrollable and regular calendar views. Built with TypeScript for full type safety.

![React Native Event Calendar](https://img.shields.io/badge/react--native-event--calendar-v0.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **📅 Two Calendar Views**: Scrollable horizontal calendar and traditional monthly calendar
- **🎨 Fully Customizable**: Extensive theme support with customizable colors
- **📝 Event Management**: Add, edit, and delete events with color coding
- **🔒 TypeScript Support**: Full type safety with comprehensive type definitions
- **📱 iOS & Android Compatible**: Works seamlessly on both platforms
- **🎯 Performance Optimized**: Efficient rendering for smooth scrolling
- **🌈 Modern Design**: Clean, intuitive UI with proper spacing and animations

## 📦 Installation

```bash
npm install react-native-event-calendar
# or
yarn add react-native-event-calendar
```

## 🚀 Quick Start

```typescript
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ScrollCalendar, RegularCalendar, CalendarEvent } from 'react-native-event-calendar';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(),
      time: '10:00 AM',
      description: 'Weekly sync meeting',
      color: '#6366f1',
    },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <ScrollCalendar
        onDateSelect={setSelectedDate}
        selectedDate={selectedDate}
        events={events}
      />
      
      <View style={{ height: 20 }} />
      
      <RegularCalendar
        onDateSelect={setSelectedDate}
        selectedDate={selectedDate}
        events={events}
        showEvents={true}
      />
    </SafeAreaView>
  );
};
```

## 📋 Components

### 1. ScrollCalendar
A horizontal scrollable calendar perfect for date selection.

```typescript
import { ScrollCalendar } from 'react-native-event-calendar';

<ScrollCalendar
  onDateSelect={(date) => console.log('Selected:', date)}
  selectedDate={new Date()}
  events={events}
  daysToShow={60}
  showHeader={true}
  theme={customTheme}
/>
```

#### ScrollCalendar Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onDateSelect` | `(date: Date) => void` | - | Called when a date is selected |
| `selectedDate` | `Date` | `new Date()` | Currently selected date |
| `events` | `CalendarEvent[]` | `[]` | Array of events to display |
| `daysToShow` | `number` | `60` | Number of days to show (including today) |
| `showHeader` | `boolean` | `true` | Show month/year header |
| `theme` | `CalendarTheme` | default theme | Custom theme configuration |

### 2. RegularCalendar
A traditional monthly calendar with event display.

```typescript
import { RegularCalendar } from 'react-native-event-calendar';

<RegularCalendar
  onDateSelect={(date) => console.log('Selected:', date)}
  selectedDate={new Date()}
  events={events}
  showEvents={true}
  onAddEvent={(date) => console.log('Add event for:', date)}
  onEventPress={(event) => console.log('Event pressed:', event)}
  theme={customTheme}
/>
```

#### RegularCalendar Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onDateSelect` | `(date: Date) => void` | - | Called when a date is selected |
| `selectedDate` | `Date` | `null` | Currently selected date |
| `events` | `CalendarEvent[]` | `[]` | Array of events to display |
| `showEvents` | `boolean` | `true` | Show events section for selected date |
| `onAddEvent` | `(date: Date) => void` | - | Called when add event button is pressed |
| `onEventPress` | `(event: CalendarEvent) => void` | - | Called when an event is pressed |
| `theme` | `CalendarTheme` | default theme | Custom theme configuration |

### 3. EventModal
A modal for adding/editing events.

```typescript
import { EventModal } from 'react-native-event-calendar';

<EventModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  onSave={(event) => {
    console.log('Event saved:', event);
    setShowModal(false);
  }}
  selectedDate={selectedDate}
  event={selectedEvent}
  theme={customTheme}
/>
```

## 🎨 Theming

Customize every aspect of the calendar appearance:

```typescript
const customTheme: CalendarTheme = {
  // Base colors
  primaryColor: '#8b5cf6',
  secondaryColor: '#a78bfa',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  borderColor: '#e5e7eb',
  
  // ScrollCalendar specific
  todayColor: '#111827',
  selectedColor: '#8b5cf6',
  eventColor: '#10b981',
  
  // Text colors
  todayTextColor: '#ffffff',
  selectedTextColor: '#ffffff',
  dayTextColor: '#1f2937',
  
  // RegularCalendar specific
  navButtonColor: '#374151',
  navButtonBackground: '#f3f4f6',
  selectedDayBackground: '#8b5cf6',
  todayDayBackground: '#111827',
  addButtonColor: '#8b5cf6',
  addButtonTextColor: '#ffffff',
};

// Use the theme
<ScrollCalendar theme={customTheme} />
<RegularCalendar theme={customTheme} />
```

### Complete Theme Interface
```typescript
interface CalendarTheme {
  // Base colors
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  
  // ScrollCalendar
  todayColor?: string;
  selectedColor?: string;
  eventColor?: string;
  todayTextColor?: string;
  selectedTextColor?: string;
  dayTextColor?: string;
  headerBackgroundColor?: string;
  headerTextColor?: string;
  
  // RegularCalendar
  navButtonColor?: string;
  navButtonBackground?: string;
  dayCircleBackground?: string;
  selectedDayBackground?: string;
  todayDayBackground?: string;
  eventBadgeColor?: string;
  addButtonColor?: string;
  addButtonTextColor?: string;
}
```

## 📝 Event Management

### Event Interface
```typescript
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  description?: string;
  color?: string;
}
```

### Example Event Implementation
```typescript
import { useState } from 'react';
import { CalendarEvent } from 'react-native-event-calendar';

const [events, setEvents] = useState<CalendarEvent[]>([
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(),
    time: '10:00 AM',
    description: 'Weekly sync meeting',
    color: '#6366f1', // Indigo
  },
  {
    id: '2',
    title: 'Dentist Appointment',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: '2:30 PM',
    color: '#10b981', // Emerald
  },
  {
    id: '3',
    title: 'Birthday Party',
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    time: '7:00 PM',
    description: 'John\'s birthday celebration',
    color: '#ec4899', // Pink
  },
]);

// Add an event
const handleAddEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
  const newEvent = {
    ...eventData,
    id: Date.now().toString(),
  };
  setEvents([...events, newEvent]);
};

// Delete an event
const handleDeleteEvent = (eventId: string) => {
  setEvents(events.filter(event => event.id !== eventId));
};
```

## 📱 Complete Example

```typescript
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { ScrollCalendar, RegularCalendar, EventModal, CalendarEvent } from 'react-native-event-calendar';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);

  const handleAddEvent = (date: Date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  };

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
    };
    setEvents([...events, newEvent]);
    setShowEventModal(false);
  };

  const customTheme = {
    primaryColor: '#8b5cf6',
    selectedColor: '#8b5cf6',
    todayColor: '#111827',
    eventColor: '#10b981',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    borderColor: '#e5e7eb',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollCalendar
        onDateSelect={setSelectedDate}
        selectedDate={selectedDate}
        events={events}
        theme={customTheme}
      />
      
      <View style={styles.spacer} />
      
      <RegularCalendar
        onDateSelect={setSelectedDate}
        selectedDate={selectedDate}
        events={events}
        showEvents={true}
        onAddEvent={handleAddEvent}
        onEventPress={(event) => console.log('Event pressed:', event)}
        theme={customTheme}
      />
      
      <EventModal
        visible={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSave={handleSaveEvent}
        selectedDate={selectedDate}
        theme={customTheme}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  spacer: {
    height: 20,
  },
});
```

## 🔧 Advanced Usage

### Custom Event Colors
```typescript
const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Work',
    date: new Date(),
    time: '9:00 AM',
    color: '#3b82f6', // Blue
  },
  {
    id: '2',
    title: 'Personal',
    date: new Date(),
    time: '6:00 PM',
    color: '#10b981', // Green
  },
  {
    id: '3',
    title: 'Important',
    date: new Date(),
    time: '2:00 PM',
    color: '#ef4444', // Red
  },
];
```

### Integration with AsyncStorage
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalendarEvent } from 'react-native-event-calendar';

const EVENTS_STORAGE_KEY = '@calendar_events';

// Load events
const loadEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const storedEvents = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);
    if (storedEvents) {
      return JSON.parse(storedEvents).map((event: any) => ({
        ...event,
        date: new Date(event.date),
      }));
    }
  } catch (error) {
    console.error('Error loading events:', error);
  }
  return [];
};

// Save events
const saveEvents = async (events: CalendarEvent[]) => {
  try {
    await AsyncStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events:', error);
  }
};
```

## 🐛 Troubleshooting

### Common Issues

1. **TypeScript Errors**
   - Ensure you have `@types/react` and `@types/react-native` installed
   - Check your TypeScript version (requires 4.0+)

2. **Component Not Rendering**
   - Make sure you have React Native 0.60+
   - Check peer dependencies are installed

3. **Theme Not Applying**
   - Ensure theme object is properly structured
   - Check color values are valid hex codes

4. **Events Not Showing**
   - Verify event dates match the calendar date
   - Check event color contrast with background

## 📄 License

MIT © Emmanuel Vungano

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Reporting Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/vungano/react-native-event-calendar/issues).

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

Built with ❤️ by Emmanuel Vungano