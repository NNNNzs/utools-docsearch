/* eslint-disable no-undef */
import { createRoot } from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import './index.css';
import Search from './Search';
import Setting from './Setting';
import { useState } from 'react'

const router = createHashRouter([
  {
    name: 'home',
    path: "/",
    element: <App />,
    errorElement: < ErrorBoundary />,
    children: [
      {
        name: 'search',
        path: "search/:payload",
        element: <Search />,
        errorElement: < ErrorBoundary />
      },
      {
        name: 'setting',
        path: "setting",
        element: <Setting />,
        errorElement: < ErrorBoundary />
      },
    ]
  },
]);

function App() {
  const [splitChar, setSplitChar] = useState(':');
  const navigate = useNavigate();

  const handlerPluginEnter = ({ code, type, payload, option }) => {
    const config = utools.db.get('config');
    setSplitChar(config.data.split);

    if (code === 'utools-docsearch-setting') {
      navigate('/setting')
    } else {
      const [key, query] = payload.split(splitChar);
      navigate(`/search/${key}`, { state: { query } })
    }
  }

  utools.onPluginEnter(handlerPluginEnter);

  return (
    <Outlet></Outlet>
  );
}

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>页面加载失败，请反馈开发者!</div>;
}