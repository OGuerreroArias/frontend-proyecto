import type { PathRouteProps } from "react-router-dom";

import Home from "lib/pages/home";
import Login from "lib/pages/login";
import Signup from "lib/pages/signup";
import Forum from "lib/pages/forum";
import Projects from "lib/pages/projects";
import Project from "lib/pages/project";
import TopicRoom from "lib/pages/topicRoom";
import Profile from "../pages/profile/index";
// import { ThemeProvider } from "../pages/list/context/ThemeProvider";

export const routes: Array<PathRouteProps> = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/proyectos",
    element: <Projects />,
  },
  {
    path: "/proyectos/:id",
    element: <Project />,
  },
  {
    path: "/perfil",
    element: <Profile />,
  },
  {
    path: "/foro",
    element: <Forum />,
  },
  {
    path: "/foro/:id",
    element: <TopicRoom />,
  },
];
