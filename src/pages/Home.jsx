import React from 'react';
import SearchForm from '../components/SearchForm';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center -mt-16">
            <div className="text-center mb-10 px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    Travel with <span className="text-bus-blue">Comfort</span>
                </h1>
                <p className="text-xl text-gray-600">Book your bus tickets easily and securely.</p>
            </div>

            <div className="container px-4">
                <SearchForm />
            </div>

            {/* Optional: Features or Popular Routes could go here */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-4 max-w-6xl w-full text-center">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <h3 className="text-xl font-bold mb-2 text-bus-blue">Safe Travel</h3>
                    <p className="text-gray-600">Top-rated bus operators with safety measures.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <h3 className="text-xl font-bold mb-2 text-bus-blue">Best Prices</h3>
                    <p className="text-gray-600">Get the best deals on your bus tickets today.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <h3 className="text-xl font-bold mb-2 text-bus-blue">24/7 Support</h3>
                    <p className="text-gray-600">We are here to help you anytime, anywhere.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
