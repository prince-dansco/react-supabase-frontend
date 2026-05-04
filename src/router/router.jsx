import {
  createBrowserRouter,
  // createRoutesFromElements,
  // Route,
} from "react-router-dom";
import Login from "../auth/signIn";
import DashBord from "../components/dashBord";
import Register from "../auth/signUp";
import App from "../App";
import Wrapper from "../lip/wrapper";
import ForgettedPassword from "../auth/forgettedPassword";
import UpdatedPassword from "../auth/reset-password";
import Layout from "./layOut";
import AboutPage from "../pages/about us/about";
import BlogsPage from "../pages/Blogs/blog";
import ContactPage from "../pages/Contact/contact";
import NotFound from "../not-Found";
import CoursesPage from "../pages/courses/courses";
import ContactPangeForCourse from "../components/courseComp/pageForCourse";
import GoogleSuccess from "../auth/googleAuth"; 


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/dashBoard",
        element: (
          <Wrapper>
            <DashBord />
          </Wrapper>
        ),
      },
      {
        path: "/about",
        element: (
          <Wrapper>
            {" "}
            <AboutPage />
          </Wrapper>
        ),
      },
      {
        path: "/courses",
        element: (
          <Wrapper>
            <CoursesPage />
          </Wrapper>
        ),
      },

      {
        path: "/blog",
        element: (
          <Wrapper>
            <BlogsPage />
          </Wrapper>
        ),
      },

      {
        path: "/pageForCourse",
        element: <ContactPangeForCourse />,
      },
      {
        path: "/contact",
        element: (
          <Wrapper>
            <ContactPage />
          </Wrapper>
        ),
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  // Routes without NavBar
  { path: "/signIn", element: <Login /> },
  { path: "/signUp", element: <Register /> },
  { path: "/forgettedPassword", element: <ForgettedPassword /> },
  { path: "/reset-password", element: <UpdatedPassword /> },
   { path: "/auth/google/success", element: <GoogleSuccess /> },
]);
