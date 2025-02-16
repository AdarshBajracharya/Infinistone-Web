import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './view/login_view.tsx';
import Register from './view/register_view.tsx';


const router = createBrowserRouter(
    [

        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/register",
            element : <Register />
        },
  
    ]
)
function App() {

    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}
export default App