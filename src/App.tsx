import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPages from "./pages/LoginPages";
import RequireAuth from "./store/features/auth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* for public route without login */}
          <Route path="login" element={<LoginPages />} />
          <Route path="*" element={<NoPage />} />

          {/* protect route  */}
          <Route element={<RequireAuth />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
