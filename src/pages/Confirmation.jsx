import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Home, Printer } from 'lucide-react';

const Confirmation = () => {
    const { state } = useLocation();

    if (!state) return <div className="text-center p-10">Invalid access</div>;

    const { bookingId, bus, selectedSeats, date, totalAmount, passenger } = state;

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center border-t-8 border-green-500">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
                <p className="text-gray-500 mb-8">Your ticket has been successfully booked.</p>

                <div className="bg-gray-50 p-6 rounded-xl text-left space-y-3 mb-8">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Booking ID</span>
                        <span className="font-mono font-bold">{bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Passenger</span>
                        <span className="font-semibold">{passenger.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Bus</span>
                        <span className="font-semibold">{bus.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Route</span>
                        <span className="font-semibold">{bus.from} - {bus.to}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Date</span>
                        <span className="font-semibold">{new Date(date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Seats</span>
                        <span className="font-bold text-bus-blue">{selectedSeats.join(', ')}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="text-gray-900 font-bold">Total Amount</span>
                        <span className="text-xl font-extrabold text-green-600">₹{totalAmount}</span>
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <Link to="/" className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
                        <Home className="w-4 h-4" /> Go Home
                    </Link>
                    <button onClick={() => window.print()} className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
                        <Printer className="w-4 h-4" /> Print
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
