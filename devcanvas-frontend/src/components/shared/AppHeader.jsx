import { useState } from 'react';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from "react-router";


const AppHeader = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.setItem("auth_token", "");
    localStorage.setItem("is_logged_in", false);
    navigate("./");
  };

  const handleNav = () => {
    setNav(!nav)
  }
  const isAuth = localStorage.getItem("is_logged_in") === "true";

	return (
    <nav className='bg-gray-700 flex justify-between items-center h-20 w-auto mx-auto px-4 text-white'>

      <Link to="./">
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>DevCanvas</h1>
      </Link>

      {isAuth === true && (
        <ul className='hidden md:flex'>
          <li className='p-4 hover:bg-[#00df9a] rounded-xl m-3 w-32 cursor-pointer duration-300 hover:text-black'>
            <Link to="/my-portfolio">
              My Portfolio
            </Link>
          </li>
          <li className='p-4 hover:bg-[#00df9a] rounded-xl m-3 cursor-pointer duration-300 hover:text-black'>
            <button onClick={() => logoutHandler()}>Logout</button>
          </li>
        </ul>
      )}

      {!isAuth && (
        <ul className='hidden md:flex'>
          <li className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>
            <Link to="./signup">
              <button>Signup</button>
            </Link>
          </li>
          <li className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>
            <Link to="./login">
              <button>Login</button>
            </Link>
          </li>
        </ul>
      )}

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>DevCanvas</h1>

        {isAuth === true && (
          <ul className=''>
            <li className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'>
              <Link to="/my-portfolio">
                My Portfolio
              </Link>
            </li>
            <li className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-white cursor-pointer border-gray-600'>
              <button onClick={() => logoutHandler()}>Logout</button>
            </li>
          </ul>
        )}
        {!isAuth && (
          <ul className=''>
            <li className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'>
              <Link to="./signup">
                Signup
              </Link>
            </li>
            <li className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-white cursor-pointer border-gray-600'>
              <Link to="./login">
                Login
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );

};

export default AppHeader;
