import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BusFront, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-bus-blue">
                    <BusFront className="w-8 h-8" />
                    <span>BusBooker</span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-gray-600 hover:text-bus-blue font-medium transition">Home</Link>
                    <Link to="/bookings" className="text-gray-600 hover:text-bus-blue font-medium transition">My Bookings</Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-gray-800">Hi, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-bus-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Login
                        </Link>
                    )}
                </div>
                {/* Mobile menu placeholder - can be expanded */}
            </div>
        </nav>
    );
};

export default Navbar;
