import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { saveBooking } from '../utils/storage';
import { ArrowLeft } from 'lucide-react';

const Booking = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return <div className="text-center p-10">No booking details found. Please search again.</div>;
    }

    const { bus, selectedSeats, date, totalAmount } = state;

    const handleBookingSubmit = (passengerDetails) => {
        // Save each seat as a separate booking entry or one entry with seats array?
        // bookings.json example shows single seatNumber field. So multiple entries.
        // "BK001", "seatNumber": "A1".

        // Generate a group ID
        const bookingGroupId = 'BK' + Date.now();

        selectedSeats.forEach(seat => {
            const newBooking = {
                bookingId: bookingGroupId,
                busId: bus.id,
                passengerName: passengerDetails.name,
                seatNumber: seat,
                date: date,
                email: passengerDetails.email,
                phone: passengerDetails.phone
            };
            saveBooking(newBooking);
        });

        navigate('/confirmation', {
            state: {
                bookingId: bookingGroupId,
                bus,
                selectedSeats,
                date,
                totalAmount,
                passenger: passengerDetails
            }
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-6 hover:text-bus-blue">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Passenger Details</h2>
                    <BookingForm onSubmit={handleBookingSubmit} />
                </div>

                <div className="w-full md:w-80 h-fit bg-gray-100 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Trip Summary</h3>
                    <div className="space-y-4 text-sm">
                        <div>
                            <span className="block text-gray-500 text-xs">Bus</span>
                            <span className="font-semibold">{bus.name}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-xs">Route</span>
                            <span className="font-semibold">{bus.from} → {bus.to}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-xs">Date</span>
                            <span className="font-semibold">{new Date(date).toDateString()}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-xs">Seats</span>
                            <span className="font-semibold text-bus-blue">{selectedSeats.join(', ')}</span>
                        </div>
                        <div className="pt-4 border-t flex justify-between items-center">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-extrabold text-2xl text-green-600">₹{totalAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
