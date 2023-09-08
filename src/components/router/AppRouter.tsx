import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('@app/components/layouts/AuthLayout/AuthLayout'));
import LoginPage from '@app/pages/LoginPage';
import SignUpPage from '@app/pages/SignUpPage';
import ForgotPasswordPage from '@app/pages/ForgotPasswordPage';
import SecurityCodePage from '@app/pages/SecurityCodePage';
import NewPasswordPage from '@app/pages/NewPasswordPage';
import LockPage from '@app/pages/LockPage';

import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import ProfileLayout from '@app/components/profile/ProfileLayout';
import RequireAuth from '@app/components/router/RequireAuth';
import { withLoading } from '@app/hocs/withLoading.hoc';
import NftDashboardPage from '@app/pages/DashboardPages/NftDashboardPage';
import MedicalDashboardPage from '@app/pages/DashboardPages/MedicalDashboardPage';
import MapViewPage from '@app/pages/GarlicWeekPages/MapViewPage/MapViewPage';
import ListViewPage from '@app/pages/GarlicWeekPages/ListViewPage/ListViewPage';

const Logout = React.lazy(() => import('./Logout'));

export const NFT_DASHBOARD_PATH = '/nft-dashboard';
export const MEDICAL_DASHBOARD_PATH = '/medical-dashboard';

const MedicalDashboard = withLoading(MedicalDashboardPage);
const MapView = withLoading(MapViewPage);
const ListView = withLoading(ListViewPage);
const NftDashboard = withLoading(NftDashboardPage);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);

export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={protectedLayout}>
          <Route index element={<ListView />} />
          <Route path={MEDICAL_DASHBOARD_PATH} element={<MedicalDashboard />} />
          <Route path={NFT_DASHBOARD_PATH} element={<NftDashboard />} />
          <Route path="mapview" element={<MapView />} />
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route
            path="lock"
            element={
              <RequireAuth>
                <LockPage />
              </RequireAuth>
            }
          />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="security-code" element={<SecurityCodePage />} />
          <Route path="new-password" element={<NewPasswordPage />} />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
      </Routes>
    </BrowserRouter>
  );
};
