import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // Optional: You can use any icon lib

const Header = () => {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md w-full z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-wide">
          MiniLinkedIn
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {!userId ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/profile/${userId}`}
                className="text-gray-700 hover:text-blue-600"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-sm border-t">
          {!userId ? (
            <>
              <Link
                to="/login"
                onClick={toggleMobileMenu}
                className="block text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMobileMenu}
                className="block text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/profile/${userId}`}
                onClick={toggleMobileMenu}
                className="block text-gray-700 hover:text-blue-600"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  toggleMobileMenu();
                  handleLogout();
                }}
                className="w-full text-left text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
