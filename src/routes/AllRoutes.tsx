import Layout from "@/app/layout";
import { PageAGVs } from "@/app/admin/AGVs/PageAGVs";
import { LoginPage } from "@/app/auth/LoginPage";
import { RegisterPage } from "@/app/auth/RegisterPage";
import { HomePage } from "@/app/home/HomePage";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "./NotFound";
import { PrivateRoute } from "./PrivateRoute";
import { PageSchedules } from "@/app/admin/schedules/PageSchedules";
import { DashboardPage } from "@/app/admin/dashboard/DashboardPage";
import { PageOrders } from "@/app/admin/orders/PageOrders";

export function AllRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Routes that require Layout with sidebar */}
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/admin" element={<PrivateRoute />}>
              <Route path="agvs" element={<PageAGVs />} />
              <Route path="orders" element={<PageOrders />} />
              <Route path="schedules" element={<PageSchedules />} />
              <Route path="dashboard" element={<DashboardPage />} />
            </Route>
          </Route>

          {/* Routes that do not require Layout with sidebar */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
