import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Timer from "./pages/Timer";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/auth/login/page";
import Register from "./pages/auth/register/page";
import ProductPage from "./pages/ProductPage";
import AdminProductListPage from "./pages/admin/products/page";
import AdminProductSingle from "./pages/admin/products/[id]/page";
import AdminProductCreate from "./pages/admin/products/create/page";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Outlet />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin">
          <Route path="products" element={<AdminProductListPage />} />
          <Route path="products/create" element={<AdminProductCreate />} />
          <Route path="products/:id" element={<AdminProductSingle />} />
        </Route>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="/about-us" element={<div>about us</div>} />
          <Route path="/timer" element={<Timer />} />
          <Route
            path="profile"
            element={
              <div>
                <div>profile layout</div>
                <Outlet />
              </div>
            }
          >
            <Route index element={<div>Profile</div>} />
            <Route path="orders" element={<div>Orders</div>} />
          </Route>
          <Route path="*" element={<div>404 not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
