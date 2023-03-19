import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";





export let Router = createBrowserRouter([

  {
    path: "/",
    element: <Login />,
    errorElement: <div>errorElement</div>,
  },
  {
    path: "/admin",
    element: <Layout />,
    errorElement: <div>errorElement</div>,
    children: [
      { index: true, element: <Dashboard /> },
      {
        // path: "admin",
        // element: <Admin />,
        // loader: async (e) => {
        //   if (localStorage.AccessToken) {
        //   }
        //   return e
        // },
      },

    ],
  },

]);