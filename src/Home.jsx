import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import { Typography } from "@material-tailwind/react";
import Cart from "./Cart";





const Home = ({loggedUser,setLoggedUser}) => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
    </div>
  )
}

export default Home