import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPages from "./pages/LoginPages";
import RequireAuth from "./store/features/auth/RequireAuth";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          {/* for public route without login */}
          <Route path="/auth/login" element={<LoginPages />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
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
