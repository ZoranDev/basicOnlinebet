// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// context
import { MainContextProvider } from "./contexts/MainContext";
import { SoccerContextProvider } from "./contexts/SoccerContext";
// components
import Navbar from "./components/Navbar";
import Soccer from "./components/soccerPage/Soccer";
import LogIn from "./components/loginPage/LogIn";
import MyProfile from "./components/myProfile/MyProfile";

function App() {
  return (
    <Router>
      {/*  Odje obmotavam sve u soccer context jer u suprotnom bi mi se resetovao kad se resetuje i main context i onda gubim api pokusaje */}
      <SoccerContextProvider>
        <MainContextProvider>
          <div className="bg-neutral-600 min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Soccer />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/myProfile/*" element={<MyProfile />} />
            </Routes>
          </div>
        </MainContextProvider>
      </SoccerContextProvider>
    </Router>
  );
}

export default App;
