import { createBrowserRouter, RouterProvider } from 'react-router';
import Workspace from './Workspace';

const router = createBrowserRouter([{ path: '/:section?', Component: Workspace }]);

export default function App() {
  return <RouterProvider router={router} />;
}
