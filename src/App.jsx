import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import ChatWithAI from './components/ChatWithAI';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Remove the duplicate route - only keep one for "/" */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/chat" element={<ChatWithAI />} />
        
        {/* Optional: If you want ChatWithAI as homepage, change line 17 to:
            <Route path="/" element={<ChatWithAI />} />
            and remove the HomePage import if not needed */}

      </Routes>
    </Router>
  );
}

export default App;