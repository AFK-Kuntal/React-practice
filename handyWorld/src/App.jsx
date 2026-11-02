import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";
import { Authentication } from "./contexts/AuthenticationContext";
import { CitiesProvider } from "./contexts/CitiesContext";
import AppLayout from "./pages/AppLayout";

// import Product from "./pages/Product";
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const Pricing = lazy(() => import("./pages/Pricing"));

function App() {
  return (
    <BrowserRouter>
      <Authentication>
        <CitiesProvider>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </CitiesProvider>
      </Authentication>
    </BrowserRouter>
  );
}

export default App;
