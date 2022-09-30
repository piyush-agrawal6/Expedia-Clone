import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Main from "./Components/Home";
import ListView from "./Components/List";
import ProfileEdit from "./Components/Account";
import Favourite from "./Components/FavList";
import DetailCard from "./Components/DetailCard";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/account" element={<ProfileEdit />}></Route>
        <Route path="/stays" element={<ListView />}></Route>
        <Route path="/detail-page/:id" element={<DetailCard />}></Route>
        <Route path="/stays/:cityName" element={<ListView />}></Route>
        <Route path="/" element={<Main />}></Route>
        <Route path="/favourite" element={<Favourite />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
export default App;
