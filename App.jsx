// import React, { useState } from "react";
// import Navbar from "./components/Navbar";
// import NewsFeed from "./components/NewsFeed";
// import Landing from "./components/Landing";
// import "./App.css";

// function App() {
//   const [category, setCategory] = useState(null); // null means show Landing page

//   const handleCategoryClick = (cat) => {
//     setCategory(cat); // e.g., "politics", "technology", etc.
//   };

//   return (
//     <div>
//       <Navbar onCategoryClick={handleCategoryClick} />
//       <main style={{ marginTop: "100px", padding: "16px" }}>
//         {category === null ? (
//           <Landing />
//         ) : (
//           <NewsFeed category={category} />
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;

// APP.jsx 2

// import React, { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// import NewsFeed from "./components/NewsFeed";
// import Landing from "./components/Landing";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import "./App.css";

// function App() {
//   const [category, setCategory] = useState(null); // null means show Landing page
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
//   const [loading, setLoading] = useState(true);

//   // Check for existing authentication on app load
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem('token');
//       const userData = localStorage.getItem('user');
      
//       if (token && userData) {
//         try {
//           // Verify token with backend
//           const response = await fetch('http://localhost:5000/api/auth/verify', {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           });

//           if (response.ok) {
//             const data = await response.json();
//             setIsAuthenticated(true);
//             setUser(data.user || JSON.parse(userData));
//           } else {
//             // Token is invalid, clear storage
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             setIsAuthenticated(false);
//             setUser(null);
//           }
//         } catch (error) {
//           console.error('Auth verification error:', error);
//           // On network error, still try to use stored user data
//           try {
//             setIsAuthenticated(true);
//             setUser(JSON.parse(userData));
//           } catch (parseError) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             setIsAuthenticated(false);
//             setUser(null);
//           }
//         }
//       }
//       setLoading(false);
//     };

//     checkAuth();
//   }, []);

//   const handleCategoryClick = (cat) => {
//     setCategory(cat); // e.g., "politics", "technology", etc.
//   };

//   const handleSearch = (searchTerm) => {
//     setCategory(`search:${searchTerm}`);
//   };

//   const handleLoginSuccess = (token, userData) => {
//     setIsAuthenticated(true);
//     setUser(userData);
//     // Token is already stored in localStorage by Login component
//   };

//   const handleRegisterSuccess = (token, userData) => {
//     setIsAuthenticated(true);
//     setUser(userData);
//     // Token is already stored in localStorage by Register component
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//     setUser(null);
//     setCategory(null); // Reset to Landing page
//   };

//   const switchToRegister = () => {
//     setAuthMode('register');
//   };

//   const switchToLogin = () => {
//     setAuthMode('login');
//   };

//   // Show loading spinner while checking authentication
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-white text-lg">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show authentication screens if not logged in
//   if (!isAuthenticated) {
//     if (authMode === 'register') {
//       return (
//         <Register 
//           onRegisterSuccess={handleRegisterSuccess}
//           onSwitchToLogin={switchToLogin}
//         />
//       );
//     } else {
//       return (
//         <Login 
//           onLoginSuccess={handleLoginSuccess}
//           onSwitchToRegister={switchToRegister}
//         />
//       );
//     }
//   }

//   // Main app content for authenticated users
//   return (
//     <div>
//       <Navbar 
//         onCategoryClick={handleCategoryClick} 
//         onSearch={handleSearch}
//         user={user}
//         onLogout={handleLogout}
//       />
//       <main style={{ marginTop: "100px", padding: "16px" }}>
//         {category === null ? (
//           <Landing />
//         ) : category.startsWith('search:') ? (
//           <NewsFeed searchTerm={category.replace('search:', '')} />
//         ) : (
//           <NewsFeed category={category} />
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;
"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import NewsFeed from "./components/NewsFeed"
import Landing from "./components/Landing"
import Login from "./components/Login"
import Register from "./components/Register"
import Custom from "./components/Custom"
import "./App.css"

function App() {
  const [category, setCategory] = useState(null) // null means show Landing page
  const [currentPage, setCurrentPage] = useState("landing") // Track current page: 'landing', 'news', 'custom'
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState("login") // 'login' or 'register'
  const [loading, setLoading] = useState(true)

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      const userData = localStorage.getItem("user")

      if (token && userData) {
        try {
          // Verify token with backend
          const response = await fetch("http://localhost:5000/api/auth/verify", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })

          if (response.ok) {
            const data = await response.json()
            setIsAuthenticated(true)
            setUser(data.user || JSON.parse(userData))
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setIsAuthenticated(false)
            setUser(null)
          }
        } catch (error) {
          console.error("Auth verification error:", error)
          // On network error, still try to use stored user data
          try {
            setIsAuthenticated(true)
            setUser(JSON.parse(userData))
          } catch (parseError) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setIsAuthenticated(false)
            setUser(null)
          }
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const handleCategoryClick = (cat) => {
    setCategory(cat) // e.g., "politics", "technology", etc.
    setCurrentPage("news") // Switch to news feed page
  }

  const handleSearch = (searchTerm) => {
    console.log("Search Term:", searchTerm)
    console.log("Setting category to:", `search:${searchTerm}`)
    setCategory(`search:${searchTerm}`)
    setCurrentPage("news") // Switch to news feed page
  }

  const handleCustomNewsClick = () => {
    setCurrentPage("custom") // Switch to custom news page
  }

  const handleLogoClick = () => {
    setCategory(null)
    setCurrentPage("landing") // Go back to landing page
  }

  const handleLoginSuccess = (token, userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    // Token is already stored in localStorage by Login component
  }

  const handleRegisterSuccess = (token, userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    // Token is already stored in localStorage by Register component
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsAuthenticated(false)
    setUser(null)
    setCategory(null) // Reset to Landing page
    setCurrentPage("landing")
  }

  const switchToRegister = () => {
    setAuthMode("register")
  }

  const switchToLogin = () => {
    setAuthMode("login")
  }

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    if (authMode === "register") {
      return <Register onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={switchToLogin} />
    } else {
      return <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={switchToRegister} />
    }
  }

  // Main app content for authenticated users
  return (
    <div>
      <Navbar
        onCategoryClick={handleCategoryClick}
        onSearch={handleSearch}
        onCustomNewsClick={handleCustomNewsClick}
        onLogoClick={handleLogoClick}
        user={user}
        onLogout={handleLogout}
        currentPage={currentPage} // Pass current page for active state styling
      />
      <main style={{ marginTop: "100px", padding: "16px" }}>
        {currentPage === "custom" ? (
          <Custom />
        ) : currentPage === "landing" || category === null ? (
          <Landing />
        ) :
        <NewsFeed category={category} />
        }
      </main>
    </div>
  )
}

export default App
