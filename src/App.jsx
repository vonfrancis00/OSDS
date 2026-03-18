import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Scholars from "./pages/Scholars";
import ScholarDetails from "./pages/ScholarDetails";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/scholars" element={<Scholars />} />
        <Route path="/scholars/:id" element={<ScholarDetails />} />
        <Route path="/reports" element={<Reports />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;