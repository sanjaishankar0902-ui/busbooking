import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const BookingForm = ({ onSubmit }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bus-blue outline-none"
                    placeholder="John Doe"
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bus-blue outline-none"
                    placeholder="john@example.com"
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a 10 digit phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bus-blue outline-none"
                    placeholder="9876543210"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-bus-blue text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition shadow-md mt-4"
            >
                Confirm Booking
            </button>
        </form>
    );
};

export default BookingForm;
