import bookingsData from '../data/bookings.json';

const STORAGE_KEY = 'bus_bookings';

export const getBookings = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingsData));
        return bookingsData;
    }
    return JSON.parse(stored);
};

export const saveBooking = (newBooking) => {
    const bookings = getBookings();
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

export const getBookedSeats = (busId, date) => {
    const bookings = getBookings();
    return bookings
        .filter(b => b.busId === Number(busId) && b.date === date)
        .map(b => b.seatNumber);
};
