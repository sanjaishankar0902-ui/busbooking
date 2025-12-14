import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import SeatLayout from '../components/SeatLayout';
import busesData from '../data/buses.json';
import { getBookedSeats } from '../utils/storage';
import { ArrowLeft } from 'lucide-react';

const SeatSelection = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const date = searchParams.get('date');

    const [bus, setBus] = useState(null);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const foundBus = busesData.find(b => b.id === Number(id));
        setBus(foundBus);
        if (foundBus && date) {
            setBookedSeats(getBookedSeats(id, date));
        }
    }, [id, date]);

    const handleSeatSelect = (seatNum) => {
        if (selectedSeats.includes(seatNum)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatNum));
        } else {
            setSelectedSeats([...selectedSeats, seatNum]);
        }
    };

    const handleProceed = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }
        navigate('/booking', {
            state: {
                bus,
                selectedSeats,
                date,
                totalAmount: selectedSeats.length * bus.price
            }
        });
    };

    if (!bus) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-4 hover:text-bus-blue">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>

            <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
                <div className="flex-1 max-w-xl w-full">
                    <h2 className="text-2xl font-bold mb-2">{bus.name}</h2>
                    <p className="text-gray-600 mb-6">{bus.from} to {bus.to} • {new Date(date).toDateString()}</p>

                    <SeatLayout
                        totalSeats={bus.totalSeats}
                        bookedSeats={bookedSeats}
                        selectedSeats={selectedSeats}
                        onSeatSelect={handleSeatSelect}
                    />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                    <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Selected Seats</span>
                            <span className="font-semibold">{selectedSeats.join(', ') || 'None'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Price per Seat</span>
                            <span className="font-semibold">₹{bus.price}</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between text-xl font-bold">
                            <span>Total Amount</span>
                            <span className="text-bus-blue">₹{selectedSeats.length * bus.price}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleProceed}
                        disabled={selectedSeats.length === 0}
                        className="w-full bg-bus-blue text-white py-3 rounded-lg font-bold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    >
                        Proceed to Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
