import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import RequestList from "../pages/RequestList";
import ConfirmedList from "../pages/ConfirmedList";
import DeclinedList from "../pages/DeclinedList";

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Box>
        <Routes>
          <Route path="/" element={<RequestList />} />
          <Route path="/declined-list" element={<DeclinedList />} />
          <Route path="/confirmed-list" element={<ConfirmedList />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
