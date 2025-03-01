
import { Router, Route, RootRoute } from '@tanstack/react-router';
import TodoPage from './pages/TodoPage';
import StatsPage from './pages/StatsPage';
import NotFound from './pages/NotFound';
import App from './App';
import { QueryClient } from '@tanstack/react-query';

// Create a query client for data fetching
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Define routes
const rootRoute = new RootRoute({
  component: App,
});

// Todo page route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: TodoPage,
});

// Stats page route
const statsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/stats',
  component: StatsPage,
});

// Not found route
const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});

// Create the router
const routeTree = rootRoute.addChildren([
  indexRoute,
  statsRoute,
  notFoundRoute,
]);

export const router = new Router({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
