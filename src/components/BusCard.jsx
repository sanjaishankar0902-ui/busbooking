import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Bus, Clock, Calendar } from 'lucide-react';

const BusCard = ({ bus }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const date = searchParams.get('date');

    const handleCreateBooking = () => {
        navigate(`/bus/${bus.id}?date=${date}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <Bus className="text-bus-blue w-6 h-6" />
                    <h3 className="text-xl font-bold text-gray-800">{bus.name}</h3>
                </div>

                <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Departure</span>
                        <span className="font-semibold text-lg">{bus.departure}</span>
                    </div>
                    <div className="flex items-center text-gray-400">→</div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Arrival</span>
                        <span className="font-semibold text-lg">{bus.arrival}</span>
                    </div>
                </div>

                <div className="mt-4 flex gap-4 text-sm">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">
                        {bus.seatsAvailable} Seats Left
                    </span>
                    <span className="bg-blue-50 text-bus-blue px-2 py-1 rounded-md capitalize">
                        {bus.type || 'Sleeper/Seater'}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                <div className="text-2xl font-bold text-gray-900">₹{bus.price}</div>
                <button
                    onClick={handleCreateBooking}
                    className="w-full md:w-auto bg-bus-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition shadow-sm"
                >
                    View Seats
                </button>
            </div>
        </div>
    );
};

export default BusCard;
