import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const PostInfo = lazy(() => import("./PostInfo"));

export const routeConfig: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "post/:id",
        element: <PostInfo />,
      },
    ],
  },
];
