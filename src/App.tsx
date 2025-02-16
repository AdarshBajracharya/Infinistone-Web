import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import Login from './view/login_view.tsx';
import Register from './view/register_view.tsx';
import Dashboard from './view/dashboard_view.tsx';
import RoomVisualizer from './view/visualizer.tsx';

// Create a QueryClient instance
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <Dashboard />,
  },
  {
    path: '/visualizer',
    element: <RoomVisualizer />,
  },
]);

function App() {
  return (
    <>
      {/* Wrap the RouterProvider with QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;