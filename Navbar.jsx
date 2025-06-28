// import React, { useState } from "react";
// import "../styles/Navbar.css";

// const Navbar = ({ onCategoryClick, onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = () => {
//     if (searchTerm.trim() !== "") {
//       onSearch(searchTerm);
//       setSearchTerm("");
//     }
//   };

//   return (
//     <div className="navbar">
//       <div className="navbar-container">
//         {/* Logo Section */}
//         <div className="logo">
//           <img
//             src="https://seeklogo.com/images/U/university-of-management-and-technology-logo-1BBBD77558-seeklogo.com.png"
//             alt="logo"
//           />
//         </div>

//         {/* Navigation Links */}
//         <div className="nav-links">
//           <span onClick={() => onCategoryClick("politics")}>World Politics</span>
//           <span onClick={() => onCategoryClick("pakistan")}>Pakistan</span>
//           <span onClick={() => onCategoryClick("technology")}>Technology</span>
//           <span onClick={() => window.open("https://h3fctarv38xymbw9nxzyrg.streamlit.app/", "_blank")}>
//             🔍 Verify News (BERT)
//           </span>
//           <span onClick={() => window.open("https://lr-fakenews-xscwcuwcvy4fwppnsta72o.streamlit.app/", "_blank")}>
//             📰 Verify News (LR)
//           </span>
//           <span onClick={() => window.open("https://rf-fake-news-model-dld2asfsxyy7a4bt6kpt67.streamlit.app/", "_blank")}>
//             🏛️ Verify News (RF)
//           </span>
//         </div>

//         {/* Search Bar */}
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="e.g. Science"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// NAVBAR 2 (showing both logged in and logged out at once)

// import React, { useState } from "react";
// import { User, LogOut, Settings, Bell, Menu, X } from "lucide-react";
// import "../styles/Navbar.css";

// const Navbar = ({ onCategoryClick, onSearch, user, onLogout }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   const handleSearch = () => {
//     if (searchTerm.trim() !== "") {
//       onSearch(searchTerm);
//       setSearchTerm("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleLogout = () => {
//     setShowUserMenu(false);
//     onLogout();
//   };

//   return (
//     <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-purple-500/20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo Section */}
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <img
//                 src="https://seeklogo.com/images/U/university-of-management-and-technology-logo-1BBBD77558-seeklogo.com.png"
//                 alt="logo"
//                 className="h-10 w-10 rounded-full"
//               />
//               <span className="text-xl font-bold text-white">TruthLens</span>
//             </div>
//           </div>

//           {/* Desktop Navigation Links */}
//           <div className="hidden md:flex items-center space-x-6">
//             <button
//               onClick={() => onCategoryClick("politics")}
//               className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
//             >
//               World Politics
//             </button>
//             <button
//               onClick={() => onCategoryClick("pakistan")}
//               className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
//             >
//               Pakistan
//             </button>
//             <button
//               onClick={() => onCategoryClick("technology")}
//               className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
//             >
//               Technology
//             </button>
            
//             {/* Verify News Dropdown */}
//             <div className="relative group">
//               <button className="text-gray-300 hover:text-purple-400 transition-colors font-medium flex items-center space-x-1">
//                 <span>🔍 Verify News</span>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-purple-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                 <div className="py-2">
//                   <button
//                     onClick={() => window.open("https://h3fctarv38xymbw9nxzyrg.streamlit.app/", "_blank")}
//                     className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors"
//                   >
//                     🔍 BERT Model
//                   </button>
//                   <button
//                     onClick={() => window.open("https://lr-fakenews-xscwcuwcvy4fwppnsta72o.streamlit.app/", "_blank")}
//                     className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors"
//                   >
//                     📰 LR Model
//                   </button>
//                   <button
//                     onClick={() => window.open("https://rf-fake-news-model-dld2asfsxyy7a4bt6kpt67.streamlit.app/", "_blank")}
//                     className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors"
//                   >
//                     🏛️ RF Model
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="hidden md:flex items-center space-x-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search news..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="w-64 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
//               />
//               <button
//                 onClick={handleSearch}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </button>
//             </div>

//             {/* User Menu */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//                 className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg px-3 py-2 transition-colors"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
//                   <User className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-white font-medium">{user?.name || 'User'}</span>
//                 <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {/* User Dropdown Menu */}
//               {showUserMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-purple-500/20 py-2">
//                   <div className="px-4 py-2 border-b border-slate-700">
//                     <p className="text-white font-medium">{user?.name}</p>
//                     <p className="text-gray-400 text-sm">{user?.email}</p>
//                   </div>
//                   <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors flex items-center space-x-2">
//                     <User className="w-4 h-4" />
//                     <span>Profile</span>
//                   </button>
//                   <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors flex items-center space-x-2">
//                     <Settings className="w-4 h-4" />
//                     <span>Settings</span>
//                   </button>
//                   <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors flex items-center space-x-2">
//                     <Bell className="w-4 h-4" />
//                     <span>Notifications</span>
//                   </button>
//                   <hr className="border-slate-700 my-2" />
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors flex items-center space-x-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Sign Out</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setShowMobileMenu(!showMobileMenu)}
//               className="text-gray-300 hover:text-white transition-colors"
//             >
//               {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {showMobileMenu && (
//           <div className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-purple-500/20">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {/* Mobile Search */}
//               <div className="px-3 py-2">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search news..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
//                   />
//                   <button
//                     onClick={handleSearch}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               {/* Mobile Navigation Links */}
//               <button
//                 onClick={() => {
//                   onCategoryClick("politics");
//                   setShowMobileMenu(false);
//                 }}
//                 className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors"
//               >
//                 World Politics
//               </button>
//               <button
//                 onClick={() => {
//                   onCategoryClick("pakistan");
//                   setShowMobileMenu(false);
//                 }}
//                 className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors"
//               >
//                 Pakistan
//               </button>
//               <button
//                 onClick={() => {
//                   onCategoryClick("technology");
//                   setShowMobileMenu(false);
//                 }}
//                 className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors"
//               >
//                 Technology
//               </button>

//               {/* Mobile Verify News Links */}
//               <div className="px-3 py-2">
//                 <p className="text-gray-400 text-sm font-medium mb-2">Verify News Models</p>
//                 <div className="space-y-1 ml-4">
//                   <button
//                     onClick={() => {
//                       window.open("https://h3fctarv38xymbw9nxzyrg.streamlit.app/", "_blank");
//                       setShowMobileMenu(false);
//                     }}
//                     className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors text-sm"
//                   >
//                     🔍 BERT Model
//                   </button>
//                   <button
//                     onClick={() => {
//                       window.open("https://lr-fakenews-xscwcuwcvy4fwppnsta72o.streamlit.app/", "_blank");
//                       setShowMobileMenu(false);
//                     }}
//                     className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors text-sm"
//                   >
//                     📰 LR Model
//                   </button>
//                   <button
//                     onClick={() => {
//                       window.open("https://rf-fake-news-model-dld2asfsxyy7a4bt6kpt67.streamlit.app/", "_blank");
//                       setShowMobileMenu(false);
//                     }}
//                     className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors text-sm"
//                   >
//                     🏛️ RF Model
//                   </button>
//                 </div>
//               </div>

//               {/* Mobile User Menu */}
//               <div className="px-3 py-2 border-t border-slate-700 mt-4">
//                 <div className="flex items-center space-x-3 mb-3">
//                   <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
//                     <User className="w-5 h-5 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-white font-medium">{user?.name}</p>
//                     <p className="text-gray-400 text-sm">{user?.email}</p>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors flex items-center space-x-2">
//                     <User className="w-4 h-4" />
//                     <span>Profile</span>
//                   </button>
//                   <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors flex items-center space-x-2">
//                     <Settings className="w-4 h-4" />
//                     <span>Settings</span>
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-md transition-colors flex items-center space-x-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Sign Out</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Click outside to close dropdowns */}
//       {(showUserMenu || showMobileMenu) && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => {
//             setShowUserMenu(false);
//             setShowMobileMenu(false);
//           }}
//         />
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// Navbar.jsx 3

// import React, { useState } from "react";
// import { User, LogOut, Settings, Bell, Menu, X } from "lucide-react";
// import "../styles/Navbar.css";
// import Custom from './Custom';
// const Navbar = ({ onCategoryClick, onSearch, user, onLogout }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//  const [showCustomNews, setShowCustomNews] = useState(false);
//   const handleSearch = () => {
//     if (searchTerm.trim() !== "") {
//       onSearch(searchTerm);
//       setSearchTerm("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleLogout = () => {
//     setShowUserMenu(false);
//     onLogout();
//   };

//   // Close dropdowns when clicking outside
//   const closeDropdowns = () => {
//     setShowUserMenu(false);
//     setShowMobileMenu(false);
//   };

//   return (
//     <>
//       <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-purple-500/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo Section */}
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <img
//                   src="https://seeklogo.com/images/U/university-of-management-and-technology-logo-1BBBD77558-seeklogo.com.png"
//                   alt="logo"
//                   className="h-10 w-10 rounded-full"
//                 />
//                 <span className="text-xl font-bold text-white">TruthLens</span>
//               </div>
//             </div>

//             {/* Desktop Navigation Links */}
//             <div className="hidden md:flex items-center space-x-6">
//               <button
//                 onClick={() => onCategoryClick("politics")}
//                 className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
//               >
//                 World Politics
//               </button>
//               <button
//                 onClick={() => onCategoryClick("pakistan")}
//                 className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
//               >
//                 Pakistan
//               </button>
//               <button
//                 onClick={() => onCategoryClick("technology")}
//                 className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
//               >
//                 Technology
//               </button>
//               {/* Verify News Dropdown */}
//               <div className="relative group">
//                 <button className="text-gray-300 hover:text-purple-400 transition-colors font-medium flex items-center space-x-1">
//                   <span>🔍 Verify News</span>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-purple-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                   <div className="py-2">
//                     <button
//                       onClick={() => window.open("https://h3fctarv38xymbw9nxzyrg.streamlit.app/", "_blank")}
//                       className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors"
//                     >
//                       🔍 BERT Model
//                     </button>
//                     <button
//                       onClick={() => window.open("https://lr-fakenews-xscwcuwcvy4fwppnsta72o.streamlit.app/", "_blank")}
//                       className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors"
//                     >
//                       📰 LR Model
//                     </button>
//                     <button
//                       onClick={() => window.open("https://rf-fake-news-model-dld2asfsxyy7a4bt6kpt67.streamlit.app/", "_blank")}
//                       className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors"
//                     >
//                       🏛️ RF Model
//                     </button>
//                   </div>
//                 </div>
//               </div>
//                <button
//                 onClick={() => setShowCustomNews(true)}
//                 className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2"
//               >
//                 <span>✏️</span>
//                 <span>Custom News</span>
//               </button>
//               {showCustomNews && <Custom />}
//             </div>

//             {/* Search Bar and User Menu */}
//             <div className="hidden md:flex items-center space-x-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search news..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   className="w-64 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
//                 />
//                 <button
//                   onClick={handleSearch}
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </button>
//               </div>

//               {/* User Menu */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowUserMenu(!showUserMenu)}
//                   className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg px-3 py-2 transition-colors"
//                 >
//                   <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
//                     <User className="w-5 h-5 text-white" />
//                   </div>
//                   <span className="text-white font-medium">{user?.name || 'User'}</span>
//                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {/* User Dropdown Menu */}
//                 {showUserMenu && (
//                   <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-purple-500/20 py-2 z-50">
//                     <div className="px-4 py-2 border-b border-slate-700">
//                       <p className="text-white font-medium">{user?.name || 'User'}</p>
//                       <p className="text-gray-400 text-sm">{user?.email || 'user@example.com'}</p>
//                     </div>
//                     <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors flex items-center space-x-2">
//                       <User className="w-4 h-4" />
//                       <span>Profile</span>
//                     </button>
//                     <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors flex items-center space-x-2">
//                       <Settings className="w-4 h-4" />
//                       <span>Settings</span>
//                     </button>
//                     <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors flex items-center space-x-2">
//                       <Bell className="w-4 h-4" />
//                       <span>Notifications</span>
//                     </button>
//                     <hr className="border-slate-700 my-2" />
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors flex items-center space-x-2"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       <span>Sign Out</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setShowMobileMenu(!showMobileMenu)}
//                 className="text-gray-300 hover:text-white transition-colors"
//               >
//                 {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {showMobileMenu && (
//             <div className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-purple-500/20">
//               <div className="px-2 pt-2 pb-3 space-y-1">
//                 {/* Mobile Search */}
//                 <div className="px-3 py-2">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search news..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
//                     />
//                     <button
//                       onClick={handleSearch}
//                       className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Mobile Navigation Links */}
//                 <button
//                   onClick={() => {
//                     onCategoryClick("politics");
//                     setShowMobileMenu(false);
//                   }}
//                   className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors"
//                 >
//                   World Politics
//                 </button>
//                 <button
//                   onClick={() => {
//                     onCategoryClick("pakistan");
//                     setShowMobileMenu(false);
//                   }}
//                   className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors"
//                 >
//                   Pakistan
//                 </button>
//                 <button
//                   onClick={() => {
//                     onCategoryClick("technology");
//                     setShowMobileMenu(false);
//                   }}
//                   className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors"
//                 >
//                   Technology
//                 </button>

//                 {/* Mobile Verify News Links */}
//                 <div className="px-3 py-2">
//                   <p className="text-gray-400 text-sm font-medium mb-2">Verify News Models</p>
//                   <div className="space-y-1 ml-4">
//                     <button
//                       onClick={() => {
//                         window.open("https://h3fctarv38xymbw9nxzyrg.streamlit.app/", "_blank");
//                         setShowMobileMenu(false);
//                       }}
//                       className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors text-sm"
//                     >
//                       🔍 BERT Model
//                     </button>
//                     <button
//                       onClick={() => {
//                         window.open("https://lr-fakenews-xscwcuwcvy4fwppnsta72o.streamlit.app/", "_blank");
//                         setShowMobileMenu(false);
//                       }}
//                       className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors text-sm"
//                     >
//                       📰 LR Model
//                     </button>
//                     <button
//                       onClick={() => {
//                         window.open("https://rf-fake-news-model-dld2asfsxyy7a4bt6kpt67.streamlit.app/", "_blank");
//                         setShowMobileMenu(false);
//                       }}
//                       className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors text-sm"
//                     >
//                       🏛️ RF Model
//                     </button>
//                   </div>
//                 </div>

//                 {/* Mobile User Menu */}
//                 <div className="px-3 py-2 border-t border-slate-700 mt-4">
//                   <div className="flex items-center space-x-3 mb-3">
//                     <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
//                       <User className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-white font-medium">{user?.name || 'User'}</p>
//                       <p className="text-gray-400 text-sm">{user?.email || 'user@example.com'}</p>
//                     </div>
//                   </div>
//                   <div className="space-y-1">
//                     <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors flex items-center space-x-2">
//                       <User className="w-4 h-4" />
//                       <span>Profile</span>
//                     </button>
//                     <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors flex items-center space-x-2">
//                       <Settings className="w-4 h-4" />
//                       <span>Settings</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setShowMobileMenu(false);
//                       }}
//                       className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-md transition-colors flex items-center space-x-2"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       <span>Sign Out</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Backdrop for closing dropdowns */}
//       {(showUserMenu || showMobileMenu) && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={closeDropdowns}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;
"use client"

import { useState } from "react"
import { User, LogOut, Settings, Bell, Menu, X } from "lucide-react"
import "../styles/Navbar.css"

const Navbar = ({ onCategoryClick, onSearch, onCustomNewsClick, onLogoClick, user, onLogout, currentPage }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm)
      setSearchTerm("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleLogout = () => {
    setShowUserMenu(false)
    onLogout()
  }

  const handleCustomNewsClick = () => {
    setShowMobileMenu(false) // Close mobile menu if open
    onCustomNewsClick() // Call the parent's navigation handler
  }

  const handleLogoClick = () => {
    setShowMobileMenu(false)
    onLogoClick()
  }

  // Close dropdowns when clicking outside
  const closeDropdowns = () => {
    setShowUserMenu(false)
    setShowMobileMenu(false)
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section - Make it clickable */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
                <img
                  src="https://seeklogo.com/images/U/university-of-management-and-technology-logo-1BBBD77558-seeklogo.com.png"
                  alt="logo"
                  className="h-10 w-10 rounded-full"
                />
                <span className="text-xl font-bold text-white">TruthLens</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onCategoryClick("politics")}
                className={`transition-colors font-medium text-sm ${
                  currentPage === "news" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"
                }`}
              >
                World Politics
              </button>
              <button
                onClick={() => onCategoryClick("pakistan")}
                className={`transition-colors font-medium text-sm ${
                  currentPage === "news" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"
                }`}
              >
                Pakistan
              </button>
              <button
                onClick={() => onCategoryClick("technology")}
                className={`transition-colors font-medium text-sm ${
                  currentPage === "news" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"
                }`}
              >
                Technology
              </button>

              {/* Verify News Dropdown */}
              <div className="relative group">
                <button className="text-gray-300 hover:text-purple-400 transition-colors font-medium text-sm flex items-center space-x-1">
                  <span>🔍 Verify News</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-purple-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button
                      onClick={() => window.open("https://h3fctarv38xymbw9nxzyrg.streamlit.app/", "_blank")}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors text-sm"
                    >
                      🔍 BERT Model
                    </button>
                    <button
                      onClick={() => window.open("https://lr-fakenews-xscwcuwcvy4fwppnsta72o.streamlit.app/", "_blank")}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors text-sm"
                    >
                      📰 LR Model
                    </button>
                    <button
                      onClick={() =>
                        window.open("https://rf-fake-news-model-dld2asfsxyy7a4bt6kpt67.streamlit.app/", "_blank")
                      }
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors text-sm"
                    >
                      🏛️ RF Model
                    </button>
                  </div>
                </div>
              </div>

              {/* Custom News Button with active state */}
              <button
                onClick={handleCustomNewsClick}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2 ${
                  currentPage === "custom"
                    ? "bg-gradient-to-r from-purple-700 to-blue-700 text-white shadow-purple-500/40"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:shadow-purple-500/25"
                }`}
              >
                <span>✏️</span>
                <span>Custom News</span>
              </button>
            </div>

            {/* Search Bar and User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-60 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium text-sm">{user?.name || "User"}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-purple-500/20 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-700">
                      <p className="text-white font-medium text-sm">{user?.name || "User"}</p>
                      <p className="text-gray-400 test-sm">{user?.email || "user@example.com"}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors flex items-center space-x-2 text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-purple-500/20 max-h-screen overflow-y-auto no-scrollbar h-screen">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Mobile Search */}
                <div className="px-3 py-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all test-md"
                    />
                    <button
                      onClick={handleSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <button
                  onClick={() => {
                    onCategoryClick("politics")
                    setShowMobileMenu(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors test-md"
                >
                  World Politics
                </button>
                <button
                  onClick={() => {
                    onCategoryClick("pakistan")
                    setShowMobileMenu(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors test-md"
                >
                  Pakistan
                </button>
                <button
                  onClick={() => {
                    onCategoryClick("technology")
                    setShowMobileMenu(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors test-md"
                >
                  Technology
                </button>

                {/* Mobile Custom News Button */}
                <button
                  onClick={handleCustomNewsClick}
                  className={`w-full px-3 py-2 rounded-md font-medium test-md transition-all duration-200 flex items-center space-x-2 mx-3 my-2 ${
                    currentPage === "custom"
                      ? "bg-gradient-to-r from-purple-700 to-blue-700 text-white"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  }`}
                >
                  <span>✏️</span>
                  <span>Custom News</span>
                </button>

                {/* Mobile Verify News Links */}
                <div className="px-3 py-2">
                  <p className="text-gray-400 test-sm font-medium mb-2">Verify News Models</p>
                  <div className="space-y-1 ml-4">
                    <button
                      onClick={() => {
                        window.open("https://h3fctarv38xymbw9nxzyrg.streamlit.app/", "_blank")
                        setShowMobileMenu(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors test-sm"
                    >
                      🔍 BERT Model
                    </button>
                    <button
                      onClick={() => {
                        window.open("https://lr-fakenews-xscwcuwcvy4fwppnsta72o.streamlit.app/", "_blank")
                        setShowMobileMenu(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors test-sm"
                    >
                      📰 LR Model
                    </button>
                    <button
                      onClick={() => {
                        window.open("https://rf-fake-news-model-dld2asfsxyy7a4bt6kpt67.streamlit.app/", "_blank")
                        setShowMobileMenu(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-slate-700 rounded-md transition-colors test-sm"
                    >
                      🏛️ RF Model
                    </button>
                  </div>
                </div>

                {/* Mobile User Menu */}
                <div className="px-3 py-2 border-t border-slate-700 mt-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium test-md">{user?.name || "User"}</p>
                      <p className="text-gray-400 test-sm">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        handleLogout()
                        setShowMobileMenu(false)
                      }}
                      className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-md transition-colors flex items-center space-x-2 test-md"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Backdrop for closing dropdowns */}
      {(showUserMenu || showMobileMenu) && <div className="fixed inset-0 z-40" onClick={closeDropdowns} />}
    </>
  )
}

export default Navbar