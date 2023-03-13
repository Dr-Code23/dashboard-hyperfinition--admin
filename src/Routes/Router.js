import { createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";



export let Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>errorElement</div>,
    children: [
      { index: true, element: <Login /> },
      {
        path: "register",
        element: <Register />,

      },

    ],
  },

]);