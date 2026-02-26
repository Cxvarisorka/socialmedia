import { Routes, Route } from 'react-router';
import Shop from "./pages/Shop";
import Nav from "./components/Nav";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/products" element={<Shop />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </>
  )
}

export default App
