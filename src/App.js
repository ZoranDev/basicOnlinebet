// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// context
import { MainContextProvider } from "./contexts/MainContext";
// components
import Navbar from "./components/Navbar";
import Soccer from "./components/soccerPage/Soccer";
import LogIn from "./components/loginPage/LogIn";
import MyProfile from "./components/MyProfile";

function App() {
  return (
    <Router>
      <MainContextProvider>
        <div className="bg-neutral-600 min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/soccer" element={<Soccer />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/myProfile" element={<MyProfile />} />
          </Routes>
        </div>
      </MainContextProvider>
    </Router>
  );
}

export default App;
