import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} BusBooker. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-2 text-gray-400 text-sm">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                    <a href="#" className="hover:text-white">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
