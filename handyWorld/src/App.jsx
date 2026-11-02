import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";
import { Authentication } from "./contexts/AuthenticationContext";

// import Product from "./pages/Product";
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const Pricing = lazy(() => import("./pages/Pricing"));

function App() {
  return (
    <BrowserRouter>
      <Authentication>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Suspense>
      </Authentication>
    </BrowserRouter>
  );
}

export default App;
