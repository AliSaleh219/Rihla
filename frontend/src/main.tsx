import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react'
import Navbar from "./component/navbar.tsx";
import './index.css';
import Places from "./pages/Places.tsx";
import Recommendation from "./pages/Recomandation.tsx";
import TripsMaker from "./pages/TripsMaker.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import Footer from "./component/footer.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/trips" element={<TripsMaker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
