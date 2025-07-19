import { createContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import JsEditor from "./components/JsEditor";
import Home from "./pages/Home";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FlashMessage from "./components/FlashMessage";
import ScrollToTop from "./components/ScrollToTop";

const MyContext = createContext();

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [Data, setData] = useState(null);
  const [headElements, setHeadElements] = useState(null);
  const [fullHtmlCode, setFullHtmlCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [currUser, setCurrUser] = useState(
    localStorage.getItem("currUser") || null
  );

  const values = {
    showNavbar,
    setShowNavbar,
    Data,
    setData,
    headElements,
    setHeadElements,
    fullHtmlCode,
    setFullHtmlCode,
    isLoggedIn,
    setIsLoggedIn,
    flashMessage,
    setFlashMessage,
    currUser,
    setCurrUser,
  };

  useEffect(() => {
    if (flashMessage) {
      setTimeout(() => {
        setFlashMessage(null);
      }, 4000);
    }
  }, [flashMessage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (currUser) {
      localStorage.setItem("currUser", currUser);
    }
  }, [currUser]);

  return (
    <>
      <Router>
        <MyContext.Provider value={values}>
          <ScrollToTop />
          <FlashMessage />
          {showNavbar && <Navbar />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/:language/:concept" element={<Home />} />
            <Route
              path="/:language/:concept/:subtopic/editor"
              element={<JsEditor />}
            />
            <Route path="/:language/:concept/editor" element={<JsEditor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </MyContext.Provider>
      </Router>
    </>
  );
}

export default App;
export { MyContext };
