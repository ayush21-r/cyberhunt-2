import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROUTES } from '../lib/constants';

// Lazy loading pages for production bundle optimization
const BootScreen = lazy(() => import('../pages/BootScreen'));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));

export const AppRoutes: React.FC = () => {
  const { bootComplete } = useAuth();

  return (
    <Suspense fallback={<LoadingOverlay message="DECRYPTING SYSTEM ROUTE..." />}>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={bootComplete ? <LandingPage /> : <BootScreen />}
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Suspense>
  );
};
export default AppRoutes;
