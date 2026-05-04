import React, { useState } from "react";
import { FaBars, FaShopify, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navList } from "../../const/constDataNav";
import { useStores } from "../../store/userStore";

export default function NavBar() {
  const [toggle, setToggle] = useState(false);
  const { user, isAuthenticated, logout, isLoading } = useStores();
  const navigate = useNavigate();

  console.log(isLoading)

  const isLoggedIn = isAuthenticated && user !== null;

  const handleLogout = async () => {
    try {
      logout();
      navigate("/signIn");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <div className="md:px-32 px-2 py-5 flex items-center justify-between fixed top-0 w-full bg-white opacity-75 z-50">
        {/* Logo */}
        <div className="flex items-center gap-1 md:gap-3 cursor-pointer">
          <FaShopify size={35} className="text-fuchsia-600" />
          <h1 className="font-bold font-sans text-2xl text-gray-700">
            Enterprise <span className="text-fuchsia-600">plc</span>
          </h1>
        </div>

        {/* Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-3 font-bold font-sans text-lg">
          {navList.map((link, index) => (
            <NavLink
              key={index}
              to={link.href}
              className={({ isActive }) =>
                `text-fuchsia-800 hover:bg-fuchsia-400 hover:text-white px-4 py-2 rounded-full transition-colors duration-200 ${
                  isActive ? "bg-fuchsia-400 text-white" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Login/Logout Button (Hidden on Mobile) */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <button
              className="outline outline-1 rounded-full px-6 py-2 text-fuchsia-500 text-lg hover:bg-fuchsia-400 hover:text-white transition-colors duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/signIn">
              <button className="outline outline-1 rounded-full px-6 py-2 text-fuchsia-500 text-lg hover:bg-fuchsia-400 hover:text-white transition-colors duration-200">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        {toggle && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-fuchsia-100 text-black py-4 z-50 flex flex-col items-center text-center gap-4 shadow-lg">
            {navList.map((link, index) => (
              <NavLink
                key={index}
                to={link.href}
                className={({ isActive }) =>
                  `px-4 py-2 text-gray-700 font-semibold text-base hover:bg-slate-400 rounded-full transition-colors duration-200 ${
                    isActive ? "bg-fuchsia-400 text-white" : ""
                  }`
                }
                onClick={handleToggle}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Login/Logout Button in Mobile Menu */}
            {isLoggedIn ? (
              <button
                className="outline outline-1 rounded-full px-6 py-2 text-fuchsia-500 text-lg hover:bg-fuchsia-400 hover:text-white mt-4 transition-colors duration-200"
                onClick={() => {
                  handleLogout();
                  handleToggle();
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/signIn" onClick={handleToggle}>
                <button className="outline outline-1 rounded-full px-6 py-2 text-fuchsia-500 text-lg hover:bg-fuchsia-400 hover:text-white mt-4 transition-colors duration-200">
                  Login
                </button>
              </Link>
            )}
          </div>
        )}

        {/* Mobile Toggle Button */}
        <div className="md:hidden block" onClick={handleToggle}>
          {!toggle ? (
            <FaBars size={30} className="text-fuchsia-500 cursor-pointer" />
          ) : (
            <FaTimes size={30} className="text-fuchsia-500 cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
}
