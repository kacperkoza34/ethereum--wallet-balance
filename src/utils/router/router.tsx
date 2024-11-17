import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '@/utils/router/routes';

export function Router(): JSX.Element {
  return (
    <Routes>
      {routes.map((route) => (
        <Route element={route.element} key={route.path} path={route.path} />
      ))}
      {/* Catch-all route that redirects to '/' */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
