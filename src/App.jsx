import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Signup from './Signup';
import Cart from './Cart'
import Login from './Login';
import Prodict from './Prodict';

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Prodict" element={<Prodict />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </div>
  );
};

export default App;
