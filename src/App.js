import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
export default App;
