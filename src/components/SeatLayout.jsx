import React from 'react';
import { Check } from 'lucide-react';

const SeatLayout = ({ totalSeats, bookedSeats, selectedSeats, onSeatSelect }) => {
    const seats = Array.from({ length: totalSeats }, (_, i) => {
        // Basic seat naming: 1, 2, 3... or A1, A2... 
        // For simplicity, let's use numeric 1-32, maybe mapped to rows if needed.
        // Let's assume 2x2 layout, 4 seats per row.
        return { id: i + 1, number: `${i + 1}` };
    });

    const getSeatStatus = (seatNum) => {
        if (bookedSeats.includes(String(seatNum))) return 'booked';
        if (selectedSeats.includes(String(seatNum))) return 'selected';
        return 'available';
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm mx-auto">
            <div className="mb-4 flex justify-between text-sm">
                <div className="flex items-center gap-1"><div className="w-4 h-4 bg-green-500 rounded"></div> Available</div>
                <div className="flex items-center gap-1"><div className="w-4 h-4 bg-bus-red rounded"></div> Booked</div>
                <div className="flex items-center gap-1"><div className="w-4 h-4 bg-bus-blue rounded"></div> Selected</div>
            </div>

            <div className="flex justify-center mb-4">
                <div className="w-full h-8 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs font-bold">
                    DRIVER
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {seats.map((seat) => {
                    const status = getSeatStatus(seat.number);
                    const isBooked = status === 'booked';
                    const isSelected = status === 'selected';

                    return (
                        <button
                            key={seat.id}
                            disabled={isBooked}
                            onClick={() => onSeatSelect(seat.number)}
                            className={`
                h-10 w-10 rounded-lg flex items-center justify-center font-bold text-sm transition
                ${isBooked ? 'bg-bus-red text-white cursor-not-allowed' : ''}
                ${isSelected ? 'bg-bus-blue text-white hover:bg-blue-600' : ''}
                ${status === 'available' ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300' : ''}
              `}
                        >
                            {isSelected ? <Check className="w-4 h-4" /> : seat.number}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SeatLayout;
