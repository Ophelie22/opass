import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <div>
                <h1 className="text-xl font-bold">Backoffice</h1>
            </div>
            <ul className="flex space-x-4">
                <li>
                    <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                </li>
                <li>
                    <Link to="/packages" className="hover:underline">Packages</Link>
                </li>
                <li>
                    <Link to="/sites" className="hover:underline">Sites</Link>
                </li>
                <li>
                    <Link to="/passes" className="hover:underline">Passes</Link>
                </li>

                <li>
                    <Link to="/login" className="hover:underline" onClick={() => localStorage.clear()}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;