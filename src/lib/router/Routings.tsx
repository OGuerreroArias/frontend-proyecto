import { Routes, Route } from "react-router-dom";

import RequireAuth from "../@auth/components/RequireAuth";
import Page404 from "lib/pages/404";

import { routes, privateRoutes } from "./routes";
import Layout from "lib/layout";

const Routings = () => {
  return (
    <Routes>
      {routes.map((routeProps) => (
        <Route {...routeProps} key={routeProps.path as string} />
      ))}
      {privateRoutes.map(({ element, ...privateRouteProps }) => (
        <Route
          element={
            <RequireAuth
              redirectTo={`/login?redirectTo=${privateRouteProps.path}`}
            >
              <Layout>{element}</Layout>
            </RequireAuth>
          }
          {...privateRouteProps}
          key={`privateRoute-${privateRouteProps.path}`}
        />
      ))}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Routings;
