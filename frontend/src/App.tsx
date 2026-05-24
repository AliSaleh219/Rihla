import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Footer from "./component/footer.tsx";
import Governorates from "./pages/Governorates.tsx";
import ScrollToTop from "./component/scrollToTop.tsx";
import ChatBot from "./pages/ai.tsx";
import TripDetails from "./pages/TripDetails.tsx";
import BookingPage from "./pages/booking.tsx";
import Recommendation from "./pages/Recomandation.tsx";
import TripsMaker from "./pages/TripsMaker.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Navbar from "./component/navbar.tsx";

function App() {

  return (
      <>
          <BrowserRouter>
              <Navbar />
              <ScrollToTop />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/governorates" element={<Governorates />} />
                  <Route path="/recommendation" element={<Recommendation />} />
                  <Route path="/trips" element={<TripsMaker />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/chat" element={<ChatBot />} />
                  <Route path="/trips/:id" element={<TripDetails/>}/>
                  <Route path="/booking/:id" element={<BookingPage/>} />
              </Routes>
              <Footer />
          </BrowserRouter>
      </>
  )
}

export default App
