import React, {useEffect, useState} from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaCircleXmark, FaGripLines } from "react-icons/fa6";


const NavList = ()=> {
  return(
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as={Link}
        to="/"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
      Home
      </Typography>
      <Typography
        as={Link}
        to="/Prodict"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
      Shop
      </Typography>
      <Typography
        as={Link}
        to="/Login"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
      Login
      </Typography>
      <Typography
        as={Link}
        to="/Signup"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
      Signup
      </Typography>


      <Typography
        as={Link}
        to="/Cart"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
      Cart
      </Typography>
      
    </ul>
  )
}

const Home = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <div> <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
    <div className="flex items-center justify-between text-blue-gray-900">
      <Typography
        as="a"
        href="#"
        variant="h6"
        className="mr-4 cursor-pointer py-1.5"
      >
        Material Tailwind
      </Typography>
      <div className="hidden lg:block">
        <NavList />
      </div>
      <IconButton
        variant="text"
        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
        ripple={false}
        onClick={() => setOpenNav(!openNav)}
      >
        {openNav ? (
          <FaCircleXmark className="h-6 w-6" strokeWidth={2} />
        ) : (
          <FaGripLines className="h-6 w-6" strokeWidth={2} />
        )}
      </IconButton>
    </div>
    <Collapse open={openNav}>
      <NavList />
    </Collapse>
  </Navbar></div>
  )
}

export default Home