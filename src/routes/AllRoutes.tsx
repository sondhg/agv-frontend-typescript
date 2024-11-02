import { Suspense } from "react";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Home } from "@/app/pages/home/Home";
import Layout from "@/app/layout";
import { Login } from "@/app/pages/auth/Login";
import { Register } from "@/app/pages/auth/Register";

export function AllRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Routes that require Layout with sidebar */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
          </Route>

          {/* Routes that do not require Layout with sidebar */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
