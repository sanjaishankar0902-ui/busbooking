import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Search } from 'lucide-react';
import routesData from '../data/routes.json';

const SearchForm = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Extract unique locations from routes
        const uniqueLocations = [...new Set(routesData.flatMap(route => [route.from, route.to]))];
        setLocations(uniqueLocations);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (from && to && date) {
            if (from === to) {
                alert("Source and Destination cannot be the same!");
                return;
            }
            navigate(`/buses?from=${from}&to=${to}&date=${date}`);
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-bus-blue" /> From
                </label>
                <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bus-blue focus:border-transparent outline-none appearance-none bg-white"
                >
                    <option value="">Select Source</option>
                    {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            <div className="flex-1 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" /> To
                </label>
                <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bus-blue focus:border-transparent outline-none appearance-none bg-white"
                >
                    <option value="">Select Destination</option>
                    {locations.map(loc => (
                        loc !== from && <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            <div className="flex-1 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" /> Date
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bus-blue focus:border-transparent outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full md:w-auto bg-bus-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform active:scale-95"
            >
                <Search className="w-5 h-5" />
                Search Buses
            </button>
        </form>
    );
};

export default SearchForm;
