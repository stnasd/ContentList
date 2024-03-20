import { routeConfig } from "../pages";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { ErrorBoundary } from "../pages/ErrorBoundary";

const App = () => {
  const router = useRoutes(routeConfig);
  return (
    <Suspense fallback={"..."}>
      <ErrorBoundary>{router}</ErrorBoundary>
    </Suspense>
  );
};

export default App;
