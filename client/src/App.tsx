// import './App.css'
// import Header from './components/Header'
// import Home from './components/Home'
// import Login from './components/Login'
// import SignUp from './components/SignUp'
// import Recipes from './components/Recipes'
// import AddRecipe from './components/AddRecipe'
// import Mock from './components/Mock'
// function App() {

//   return (
//     <>
//       <Home />
//       {/* <Login /> */}
//       {/* <SignUp /> */}
//       {/* <Header /> */}
//       {/* <Recipes /> */}
//       {/* <AddRecipe /> */}
//       {/* <Mock/> */}
//     </>
//   )
// }

// export default App



// App.tsx
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;