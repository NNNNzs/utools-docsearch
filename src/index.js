import React from 'react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import './index.css';
import Search from './Search';
import Setting from './Setting'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
    errorElement: < ErrorBoundary />

  },
  {
    path: "/setting",
    element: <Setting />,
    errorElement: < ErrorBoundary />
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <RouterProvider router={router} />
);


function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}