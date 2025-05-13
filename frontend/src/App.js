import "./App.css";
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodItems from "./components/FoodItems";
import Restuarants from "./components/Restuarants";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Help from "./components/Help";
import Search from "./components/Search";
import Offers from "./components/Offers";
import Proflie from "./components/Proflie";
import City from "./components/City";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Fooditems/:type" element={<FoodItems />} />
          <Route path="/restuarants/hotel/:hotel" element={<Restuarants />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<Help />} />
          <Route path="/search" element={<Search />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<Proflie/>} />
          <Route path="/city/:name" element={<City />} />
          <Route path="/footer" element={<Footer/>}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
