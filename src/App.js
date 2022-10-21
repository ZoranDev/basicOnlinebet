// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// context
import { MainContextProvider } from "./contexts/MainContext";
// components
import Navbar from "./components/Navbar";
import Soccer from "./components/soccerPage/Soccer";
import LogIn from "./components/loginPage/LogIn";

function App() {
  return (
    <MainContextProvider>
      <Router>
        <div className="bg-neutral-600 min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/soccer" element={<Soccer />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </div>
      </Router>
    </MainContextProvider>
  );
}

export default App;
