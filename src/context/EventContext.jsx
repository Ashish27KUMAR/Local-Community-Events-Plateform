import { createContext, useContext, useState, useEffect } from 'react';
import mockData from '../data/events.json';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [rsvps, setRsvps] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterLocation, setFilterLocation] = useState('All');
    const [filterDate, setFilterDate] = useState('All'); // 'All', 'Upcoming', 'Past'

    useEffect(() => {
        // In a real app, this would be an API call
        setEvents(mockData.events);

        // Load RSVPs from local storage if available
        const savedRsvps = localStorage.getItem('local-events-rsvps');
        if (savedRsvps) {
            try {
                setRsvps(JSON.parse(savedRsvps));
            } catch (e) {
                console.error("Failed to parse RSVPs from local storage");
            }
        }
    }, []);

    // Save RSVPs to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('local-events-rsvps', JSON.stringify(rsvps));
    }, [rsvps]);

    const addRsvp = (eventId) => {
        if (!rsvps.includes(eventId)) {
            setRsvps([...rsvps, eventId]);
        }
    };

    const removeRsvp = (eventId) => {
        setRsvps(rsvps.filter(id => id !== eventId));
    };

    const isRsvped = (eventId) => rsvps.includes(eventId);

    const addEvent = (newEvent) => {
        const id = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
        setEvents([{ ...newEvent, id }, ...events]);
    };

    // Extract unique locations and types for filters
    const uniqueLocations = ['All', ...new Set(events.map(e => e.location))];
    const uniqueTypes = ['All', ...new Set(events.map(e => e.type))];

    return (
        <EventContext.Provider value={{
            events,
            rsvps,
            addRsvp,
            removeRsvp,
            isRsvped,
            addEvent,
            searchQuery, setSearchQuery,
            filterType, setFilterType,
            filterLocation, setFilterLocation,
            filterDate, setFilterDate,
            uniqueLocations,
            uniqueTypes
        }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};
