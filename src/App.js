import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Main from "./Components/Home";
import ListView from "./Components/List";
import ProfileEdit from "./Components/Account";
import Favourite from "./Components/FavList";
import DetailCard from "./Components/DetailCard";
import NotFound from "./Components/PageNotFound";
import { Routes, Route } from "react-router-dom";
import Maintainance from "./Components/Maintainance";
import Payment from "./Components/Payment";
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
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/feedback" element={<Maintainance />}></Route>
        <Route path="/support" element={<Maintainance />}></Route>
        <Route path="/payment/:id" element={<Payment />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
export default App;
