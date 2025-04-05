import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <Link to="/" className="flex items-center py-4 px-2">
              <span className="font-semibold text-gray-500 text-lg">ErrandLink</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Dashboard</Link>
                <Link to="/errands" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Errands</Link>
                <Link to="/profile" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Profile</Link>
                <button 
                  onClick={logout}
                  className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300">Login</Link>
                <Link to="/signup" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}