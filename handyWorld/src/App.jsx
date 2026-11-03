import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";
import { Authentication } from "./contexts/AuthenticationContext";
import { CitiesProvider } from "./contexts/CitiesContext";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import PageNotFound from "./pages/PageNotFound";
import Form from "./components/Form";

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
              <Route path="/" element={<Home />} />
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
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </CitiesProvider>
      </Authentication>
    </BrowserRouter>
  );
}

export default App;
