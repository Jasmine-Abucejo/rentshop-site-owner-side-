import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import RequestList from "../pages/RequestList";

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Box>
        <Routes>
          <Route path="/" element={<RequestList />} />
          <Route path="/declined-list"></Route>
          <Route path="/confirmed-list"></Route>
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
