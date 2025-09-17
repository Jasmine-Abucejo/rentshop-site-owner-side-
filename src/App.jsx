import { Box } from "@chakra-ui/react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import RequestList from "../pages/RequestList";
import ConfirmedList from "../pages/ConfirmedList";
import DeclinedList from "../pages/DeclinedList";
import ModalDetails from "../components/ModalDetails";
import ProductList from "../pages/ProductList";
import HistoryList from "../pages/HistoryList";

function App() {
  const location = useLocation();
  const state = location.state;
  const background = state?.backgroundLocation || null;
  return (
    <Box minH={"100vh"} backgroundColor={"black"}>
      <Navbar />
      <Box>
        <Routes location={background || location}>
          <Route path="/" element={<RequestList />} />
          <Route path="/declined-list" element={<DeclinedList />} />
          <Route path="/confirmed-list" element={<ConfirmedList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/history" element={<HistoryList />} />
        </Routes>
        {background && (
          <Routes>
            <Route path="/image/:id" element={<ModalDetails />} />
          </Routes>
        )}
      </Box>
    </Box>
  );
}

export default App;
