// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import Navbar from "./components/Navbar";
import Soccer from "./components/soccerPage/Soccer";
import LogIn from "./components/loginPage/LogIn";

function App() {
  return (
    <div className="bg-neutral-600 min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/soccer" element={<Soccer />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
