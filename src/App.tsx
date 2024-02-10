import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/ErrorPages/NoPage";
import Layout from "./Layout";
import HomePage from "./pages/HomePages/HomePage";
import LoginPages from "./pages/AuthPages/LoginPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPages />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
