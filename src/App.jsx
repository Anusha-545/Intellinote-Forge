// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./components/HomePage";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import ContactUs from "./components/ContactUs";
// import AboutUs from "./components/AboutUs";
// import ChatWithAI from './components/ChatWithAI';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/chat" element={<ChatWithAI />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext.jsx'
import ProtectedRoute from "./Context/ProtectedRoute";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import ChatWithAI from './components/ChatWithAI';
import "./App.css";
import Header from "./components/Header.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />

          {/* 🔒 Protected Route */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatWithAI />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;