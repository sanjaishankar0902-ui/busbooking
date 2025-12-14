import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BusCard from '../components/BusCard';
import busesData from '../data/buses.json';
import { FilterX } from 'lucide-react';

const BusList = () => {
    const [searchParams] = useSearchParams();
    const [filteredBuses, setFilteredBuses] = useState([]);

    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');

    useEffect(() => {
        // Filter logic
        const results = busesData.filter(bus => {
            const matchFrom = from ? bus.from.toLowerCase() === from.toLowerCase() : true;
            const matchTo = to ? bus.to.toLowerCase() === to.toLowerCase() : true;
            // Note: In a real app, we would check availability for the specific date.
            // Here we assume buses run daily.
            return matchFrom && matchTo;
        });
        setFilteredBuses(results);
    }, [from, to, date]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {from && to ? `${from} → ${to}` : 'All Routes'}
                    </h2>
                    <p className="text-gray-500">{date ? new Date(date).toDateString() : 'Select a date'}</p>
                </div>
                <div className="text-sm font-medium text-gray-600">
                    {filteredBuses.length} Buses Found
                </div>
            </div>

            <div className="space-y-6">
                {filteredBuses.length > 0 ? (
                    filteredBuses.map(bus => (
                        <BusCard key={bus.id} bus={bus} />
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <FilterX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-600">No buses found</h3>
                        <p className="text-gray-500">Try searching for a different route.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusList;
