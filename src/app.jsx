import React  from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx"
// import About from "./components/About.jsx"
import Contact from "./components/Contact.jsx";
import Error from "./components/Error.jsx";
import ResturantMenu from "./components/ResturantMenu.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";

const About = lazy(() => import("./components/About.jsx"))

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "about",
        element: <Suspense fallback={<h1>Loading...</h1>}><About /></Suspense>
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "resturant/:resId",
        element: <ResturantMenu />
      }
     
    ]
  }
])

root.render(<RouterProvider router={appRoute} />);