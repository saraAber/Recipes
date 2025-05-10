// import { Children, StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Home from './components/Home.tsx'
// import Login from './components/Login.tsx'
// import Header from './components/Header.tsx'
// import SignUp from './components/SignUp.tsx'
// import ShowRecipe from './components/ShowRecipe.tsx'
// import Recipe from './Repositories/Recipe.ts'
// import Recipes from './components/Recipes.tsx'
// import AddRecipe from './components/AddRecipe.tsx'

// const routes = createBrowserRouter([
//   {
//     path: '*',
//     element: <App />,
//     children: [
//       {
//         path: '',
//         element: <Home />
//       },
//       {
//         path: 'home',
//         element: <Home />
//       },
//       {
//         path: 'login',
//         element: <Login />
//       },
//       {
//         path: 'signup',
//         element: <SignUp />
//       },
//       {
//         path: 'recipes',
//         element: <Recipes />
//       },
//       // {
//       //   path: 'showRecipe',
//       //   element:
//       //     <ShowRecipe
//       //       open={false}
//       //       onClose={() => console.log("close")}
//       //       AddToFavorites={() => console.log("add to favorites")}
//       //       Edit={(recipe: Recipe) => console.log("edit recipe", recipe)}
//       //       Delete={(id: number) => console.log("delete recipe", id)}
//       //     />
//       // }
//       {
//         path: 'addrecipe',
//         element: <AddRecipe />
//       }
//     ]
//   }
// ])

// createRoot(document.getElementById('root')!).render(
//   // <StrictMode>
//   //   <App />
//   // </StrictMode>,
//   <RouterProvider router={routes} />
// )

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import Home from './components/Home.tsx';
import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';
import Recipes from './components/Recipes.tsx';
import AddRecipe from './components/AddRecipe.tsx';
import Logout from './components/Logout.tsx';

const routes = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'recipes',
        element: <Recipes />
      },
      {
        path: 'addrecipe',
        element: <AddRecipe />
      },
      {
        path: 'logout',
        element: <Logout />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={routes} />
);