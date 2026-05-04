// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import CryptoJS from "crypto-js";
// import { superbase } from "../superbaseAuth/superbaseClient";

// export default function Dashboard() {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: "ease-out",
//       once: false,
//     });
//   }, []);

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const {
//           data: { session },
//           error,
//         } = await superbase.auth.getSession();
//         if (error) throw error;
//         setSession(session);
//       } catch (error) {
//         console.error("Error fetching session:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSession();

//     const {
//       data: { subscription },
//     } = superbase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => subscription?.unsubscribe();
//   }, []);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setDarkMode(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);

//     if (newDarkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const { error } = await superbase.auth.signOut();
//       if (error) throw error;
//       navigate("/signIn");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//     setIsDropdownOpen(false);
//   };

//   const handleDeleteAccount = async () => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete your account? This action cannot be undone."
//       )
//     ) {
//       try {
//         await superbase.auth.signOut();
//         console.log("Account deletion requested");
//         navigate("/");
//       } catch (error) {
//         console.error("Error deleting account:", error);
//       }
//     }
//     setIsDropdownOpen(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
//       </div>
//     );
//   }

//   if (!session) {
//     return (
//       <div className="text-center py-20">
//         Please sign in to access your dashboard
//       </div>
//     );
//   }

//   const getAvatarUrl = (user) => {
//     if (user.user_metadata?.picture) {
//       return user.user_metadata.picture;
//     }

//     if (user.user_metadata?.avatar_url) {
//       return user.user_metadata.avatar_url;
//     }

//     if (user.identities?.[0]?.identity_data?.avatar_url) {
//       return user.identities[0].identity_data.avatar_url;
//     }

//     if (user.email) {
//       const emailHash = CryptoJS.MD5(
//         user.email.trim().toLowerCase()
//       ).toString();
//       return `https://www.gravatar.com/avatar/${emailHash}?s=200&d=mp`;
//     }

//     return "https://www.gravatar.com/avatar/default?s=200&d=mp";
//   };

//   const user = session.user;
//   const userName =
//     user.user_metadata?.name || user.email?.split("@")[0] || "User";
//   const userEmail = user.email || "No email provided";
//   const avatarUrl =
//     user.user_metadata?.avatar_url ||
//     user.user_metadata?.picture ||
//     `https://www.gravatar.com/avatar/${
//       user.email ? CryptoJS.MD5(user.email.trim().toLowerCase()) : "default"
//     }?s=200&d=mp`;

//   return (
//     <div
//       className={`flex flex-col md:flex-row min-h-screen bg-fuchsia-200 dark:bg-gray-900 text-gray-900 dark:text-white`}
//     >
//       {/* Mobile Menu Button */}
//       <div className="md:hidden flex justify-between items-center p-4 bg-gray-800">
//         <button
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           className="text-fuchsia-300 focus:outline-none"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {mobileMenuOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//         </button>
//         <h1 className="text-xl font-bold text-fuchsia-300">
//           Dashboard <span className="font-bold text-fuchsia-600">Fl/EP</span>
//         </h1>
//         <div className="w-6"></div>
//       </div>

//       {/* Left Sidebar */}
//       <aside
//         className={`${
//           mobileMenuOpen ? "block" : "hidden"
//         } md:block w-full md:w-80 fixed md:relative z-20 md:z-0 left-0 top-0 h-full overflow-hidden bg-gray-800 md:bg-transparent`}
//         data-aos="flip-right"
//       >
//         <video
//           autoPlay
//           loop
//           muted
//           className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 hidden md:block"
//         >
//           <source src="https://youtu.be/1KBV8M0mpYI" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         <div className="relative z-10 h-full flex flex-col p-4 md:p-8 bg-gradient-to-b from-fuchsia-900/30 to-purple-900/30 md:backdrop-blur-sm">
//           <div className="flex flex-col items-center mb-8">
//             {/* <img
//               src={avatarUrl}
//               alt="profile"
//               className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-4 border-4 border-fuchsia-400/50 shadow-lg transform hover:scale-105 transition-transform duration-300"
//               onError={(e) => {
//                 e.target.src =
//                   "https://www.gravatar.com/avatar/default?s=200&d=mp";
//               }}
//             />  */}

//             {/*  */}
//             <img
//               src={getAvatarUrl(user)}
//               alt="profile"
//               className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-4 border-4 border-fuchsia-400/50 shadow-lg transform hover:scale-105 transition-transform duration-300"
//               onError={(e) => {
//                 e.target.src =
//                   "https://www.gravatar.com/avatar/default?s=200&d=mp";
//               }}
//             />
//             <h2 className="text-xl md:text-2xl font-bold text-fuchsia-300 mb-1">
//               {userName}
//             </h2>
//             <p className="text-sm md:text-base text-fuchsia-200 mb-6">
//               {userEmail}
//             </p>
//           </div>

//           <nav className="flex-1 flex flex-col space-y-2 md:space-y-4">
//             <Link
//               to="/about"
//               className="text-lg md:text-xl text-fuchsia-200 hover:text-white px-4 py-2 rounded-lg hover:bg-fuchsia-800/50 transition-all duration-300"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               About
//             </Link>
//             <Link
//               to="/blog"
//               className="text-lg md:text-xl text-fuchsia-200 hover:text-white px-4 py-2 rounded-lg hover:bg-fuchsia-800/50 transition-all duration-300"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               Blogs
//             </Link>
//             <Link
//               to="/contact"
//               className="text-lg md:text-xl text-fuchsia-200 hover:text-white px-4 py-2 rounded-lg hover:bg-fuchsia-800/50 transition-all duration-300"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               Contact
//             </Link>
//           </nav>

//           <div className="mt-auto md:mt-24 relative">
//             <button
//               onClick={toggleDropdown}
//               className="w-full py-2 px-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:opacity-90 flex justify-between items-center"
//             >
//               Account Settings
//               <svg
//                 className={`w-4 h-4 ml-2 transition-transform duration-200 ${
//                   isDropdownOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {isDropdownOpen && (
//               <div className="absolute bottom-full mb-2 w-full bg-gray-700 rounded-lg shadow-lg z-30 overflow-hidden">
//                 <button
//                   onClick={toggleTheme}
//                   className="w-full px-4 py-2 text-left text-white hover:bg-fuchsia-600/50 transition-colors duration-200 flex items-center"
//                 >
//                   <svg
//                     className="w-5 h-5 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d={
//                         darkMode
//                           ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//                           : "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
//                       }
//                     />
//                   </svg>
//                   {darkMode ? "Light Mode" : "Dark Mode"}
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 text-left text-white hover:bg-fuchsia-600/50 transition-colors duration-200 flex items-center"
//                 >
//                   <svg
//                     className="w-5 h-5 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                     />
//                   </svg>
//                   Logout
//                 </button>
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-600/20 transition-colors duration-200 flex items-center"
//                 >
//                   <svg
//                     className="w-5 h-5 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                     />
//                   </svg>
//                   Delete My Account
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 md:ml-4 p-4 md:p-10">
//         <div className="max-w-4xl mx-auto">
//           {/* Welcome Banner */}
//           <div
//             className="bg-gradient-to-r from-fuchsia-900/80 to-purple-900/80 rounded-2xl p-6 md:p-8 mb-6 md:mb-10 shadow-lg backdrop-blur-sm border border-fuchsia-400/20"
//             data-aos="fade-down-left"
//           >
//             <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-purple-300">
//               Welcome, {userName}!
//             </h1>
//             <p className="text-base md:text-xl leading-relaxed text-fuchsia-100">
//               <span className="text-fuchsia-500 font-bold pr-1">
//                 Futurelabs/Enterprise plc
//               </span>
//               You've arrived at your ultimate web development learning portal!
//               Master both frontend and backend technologies through our
//               comprehensive courses, hands-on projects, and expert mentorship.
//               Ready to level up your skills? Enroll now and start your journey!
//             </p>
//             <div className="mt-6 md:mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
//               <button className="bg-white text-fuchsia-700 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
//                 <Link to="/courses">Explore Courses</Link>
//               </button>
//               <button className="border-2 border-fuchsia-300 text-fuchsia-300 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-fuchsia-800/30 transition-colors">
//                 <Link to="/blog">Learning Paths</Link>
//               </button>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div
//             className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10"
//             data-aos="fade-up-right"
//           >
//             <div className="bg-fuchsia-900/50 p-4 md:p-6 rounded-xl border border-fuchsia-400/20">
//               <h3 className="text-fuchsia-300 text-base md:text-lg mb-2">
//                 Courses Available
//               </h3>
//               <p className="text-2xl md:text-3xl font-bold text-white">24+</p>
//             </div>
//             <div className="bg-purple-900/50 p-4 md:p-6 rounded-xl border border-fuchsia-400/20">
//               <h3 className="text-purple-300 text-base md:text-lg mb-2">
//                 Students Enrolled
//               </h3>
//               <p className="text-2xl md:text-3xl font-bold text-white">1.2K+</p>
//             </div>
//             <div className="bg-fuchsia-900/50 p-4 md:p-6 rounded-xl border border-fuchsia-400/20">
//               <h3 className="text-fuchsia-300 text-base md:text-lg mb-2">
//                 Hours of Content
//               </h3>
//               <p className="text-2xl md:text-3xl font-bold text-white">300+</p>
//             </div>
//           </div>

//           {/* Featured Courses */}
//           <div
//             className="bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl border border-fuchsia-400/10"
//             data-aos="zoom-in-down"
//           >
//             <h2 className="text-xl md:text-2xl font-bold text-fuchsia-300 mb-4 md:mb-6">
//               Featured Courses
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//               <div className="bg-gradient-to-br from-fuchsia-900/50 to-purple-900/50 p-4 md:p-6 rounded-xl hover:shadow-fuchsia-500/20 hover:shadow-lg transition-all duration-300">
//                 <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
//                   Modern Frontend
//                 </h3>
//                 <p className="text-fuchsia-200 mb-3 md:mb-4">
//                   React, Next.js, Tailwind CSS
//                 </p>
//                 <button className="text-fuchsia-300 hover:text-white text-sm font-medium">
//                   <Link to="/courses">View Details →</Link>
//                 </button>
//               </div>
//               <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-4 md:p-6 rounded-xl hover:shadow-fuchsia-500/20 hover:shadow-lg transition-all duration-300">
//                 <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
//                   Backend Mastery
//                 </h3>
//                 <p className="text-purple-200 mb-3 md:mb-4">
//                   Node.js, Express, Databases
//                 </p>
//                 <button className="text-purple-300 hover:text-white text-sm font-medium">
//                   <Link to="/courses">View Details →</Link>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import CryptoJS from "crypto-js";
import { useStores } from "../store/userStore";
import { Toaster, toast } from "react-hot-toast";

export default function Dashboard() {
  const { user, logout, isAuthenticated, isLoading: storeLoading } = useStores();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // AOS Animation
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
    });
  }, []);

  // Check authentication
  useEffect(() => {
    if (!storeLoading && !isAuthenticated && !user) {
      navigate("/signIn");
    }
  }, [isAuthenticated, user, storeLoading, navigate]);

  // Dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = async () => {
    try {
      logout();
      toast.success("Logged out successfully!");
      navigate("/signIn");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to logout");
    }
    setIsDropdownOpen(false);
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        // TODO: Add API call to delete user account
        // await Api.delete('/auth/delete-account');
        logout();
        toast.success("Account deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error("Failed to delete account");
      }
    }
    setIsDropdownOpen(false);
  };

  // Loading state
  if (storeLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
      </div>
    );
  }

  // If no user, don't render
  if (!user) {
    return null;
  }

  // Get avatar URL from user data
  const getAvatarUrl = (userData) => {
    if (userData?.avatar) {
      return userData.avatar;
    }

    if (userData?.email) {
      const emailHash = CryptoJS.MD5(
        userData.email.trim().toLowerCase()
      ).toString();
      return `https://www.gravatar.com/avatar/${emailHash}?s=200&d=mp`;
    }

    return "https://www.gravatar.com/avatar/default?s=200&d=mp";
  };

  const userName = user?.name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "No email provided";
  const avatarUrl = getAvatarUrl(user);

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen bg-fuchsia-200 dark:bg-gray-900 text-gray-900 dark:text-white`}
    >
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-800">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-fuchsia-300 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <h1 className="text-xl font-bold text-fuchsia-300">
          Dashboard <span className="font-bold text-fuchsia-600">Fl/EP</span>
        </h1>
        <div className="w-6"></div>
      </div>

      {/* Left Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-80 fixed md:relative z-20 md:z-0 left-0 top-0 h-full overflow-hidden bg-gray-800 md:bg-transparent`}
        data-aos="flip-right"
      >
        <div className="relative z-10 h-full flex flex-col p-4 md:p-8 bg-gradient-to-b from-fuchsia-900/30 to-purple-900/30 md:backdrop-blur-sm">
          <div className="flex flex-col items-center mb-8">
            <img
              src={avatarUrl}
              alt="profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-4 border-4 border-fuchsia-400/50 shadow-lg transform hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src =
                  "https://www.gravatar.com/avatar/default?s=200&d=mp";
              }}
            />
            <h2 className="text-xl md:text-2xl font-bold text-fuchsia-300 mb-1">
              {userName}
            </h2>
            <p className="text-sm md:text-base text-fuchsia-200 mb-6">
              {userEmail}
            </p>
          </div>

          <nav className="flex-1 flex flex-col space-y-2 md:space-y-4">
            <Link
              to="/about"
              className="text-lg md:text-xl text-fuchsia-200 hover:text-white px-4 py-2 rounded-lg hover:bg-fuchsia-800/50 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/blog"
              className="text-lg md:text-xl text-fuchsia-200 hover:text-white px-4 py-2 rounded-lg hover:bg-fuchsia-800/50 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className="text-lg md:text-xl text-fuchsia-200 hover:text-white px-4 py-2 rounded-lg hover:bg-fuchsia-800/50 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          <div className="mt-auto md:mt-24 relative">
            <button
              onClick={toggleDropdown}
              className="w-full py-2 px-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:opacity-90 flex justify-between items-center"
            >
              Account Settings
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute bottom-full mb-2 w-full bg-gray-700 rounded-lg shadow-lg z-30 overflow-hidden">
                <button
                  onClick={toggleTheme}
                  className="w-full px-4 py-2 text-left text-white hover:bg-fuchsia-600/50 transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        darkMode
                          ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          : "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      }
                    />
                  </svg>
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-white hover:bg-fuchsia-600/50 transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-600/20 transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete My Account
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-4 p-4 md:p-10">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Banner */}
          <div
            className="bg-gradient-to-r from-fuchsia-900/80 to-purple-900/80 rounded-2xl p-6 md:p-8 mb-6 md:mb-10 shadow-lg backdrop-blur-sm border border-fuchsia-400/20"
            data-aos="fade-down-left"
          >
            <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-purple-300">
              Welcome, {userName}!
            </h1>
            <p className="text-base md:text-xl leading-relaxed text-fuchsia-100">
              <span className="text-fuchsia-500 font-bold pr-1">
                Futurelabs/Enterprise plc
              </span>
              You've arrived at your ultimate web development learning portal!
              Master both frontend and backend technologies through our
              comprehensive courses, hands-on projects, and expert mentorship.
              Ready to level up your skills? Enroll now and start your journey!
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-fuchsia-700 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                <Link to="/courses">Explore Courses</Link>
              </button>
              <button className="border-2 border-fuchsia-300 text-fuchsia-300 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-fuchsia-800/30 transition-colors">
                <Link to="/blog">Learning Paths</Link>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10"
            data-aos="fade-up-right"
          >
            <div className="bg-fuchsia-900/50 p-4 md:p-6 rounded-xl border border-fuchsia-400/20">
              <h3 className="text-fuchsia-300 text-base md:text-lg mb-2">
                Courses Available
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-white">24+</p>
            </div>
            <div className="bg-purple-900/50 p-4 md:p-6 rounded-xl border border-fuchsia-400/20">
              <h3 className="text-purple-300 text-base md:text-lg mb-2">
                Students Enrolled
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-white">1.2K+</p>
            </div>
            <div className="bg-fuchsia-900/50 p-4 md:p-6 rounded-xl border border-fuchsia-400/20">
              <h3 className="text-fuchsia-300 text-base md:text-lg mb-2">
                Hours of Content
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-white">300+</p>
            </div>
          </div>

          {/* Featured Courses */}
          <div
            className="bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-xl border border-fuchsia-400/10"
            data-aos="zoom-in-down"
          >
            <h2 className="text-xl md:text-2xl font-bold text-fuchsia-300 mb-4 md:mb-6">
              Featured Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-gradient-to-br from-fuchsia-900/50 to-purple-900/50 p-4 md:p-6 rounded-xl hover:shadow-fuchsia-500/20 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  Modern Frontend
                </h3>
                <p className="text-fuchsia-200 mb-3 md:mb-4">
                  React, Next.js, Tailwind CSS
                </p>
                <button className="text-fuchsia-300 hover:text-white text-sm font-medium">
                  <Link to="/courses">View Details →</Link>
                </button>
              </div>
              <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-4 md:p-6 rounded-xl hover:shadow-fuchsia-500/20 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  Backend Mastery
                </h3>
                <p className="text-purple-200 mb-3 md:mb-4">
                  Node.js, Express, Databases
                </p>
                <button className="text-purple-300 hover:text-white text-sm font-medium">
                  <Link to="/courses">View Details →</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}