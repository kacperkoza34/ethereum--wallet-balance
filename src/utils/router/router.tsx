import { Routes, Route } from 'react-router-dom';
import { routes } from '@/utils/router/routes';

export function Router(): JSX.Element {
  return (
    <Routes>
      {routes.map((route) => (
        <Route element={route.element} key={route.path} path={route.path} />
      ))}
    </Routes>
  );
}
