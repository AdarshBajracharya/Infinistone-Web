import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import Login from './view/login_view.tsx';
import Register from './view/register_view.tsx';
import Dashboard from './view/dashboard_view.tsx';
import ShopPage from './view/shop_view.tsx';
import ProfilePage from './view/profile_view.tsx';
import ProductDetail from './view/product_detail.tsx';
import ThreeDModel from './view/visualizer.tsx';
import AdminPage from './view/add_product_view.tsx';
import BookingsPage from './view/bookings.tsx';

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
  // {
  //   path: '/visualizer',
  //   element: <Visualizer />,
  // },
  {
    path: '/shop',
    element: <ShopPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/product/:id',
    element: <ProductDetail />,
  },
  {
    path: '/visualizer',
    element: <ThreeDModel />,
  },
  {
    path: '/bookings',
    element: <BookingsPage />,
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