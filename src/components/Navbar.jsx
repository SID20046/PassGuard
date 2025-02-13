import React from "react";
import { Github } from "lucide-react";


const Navbar = () => {
  return (
    <nav className="bg-slate-700 text-white w-full  px-2 md:px-40 ">
      <div className=" flex justify-between items-center px-50 py-5 h-14">
        <div className="logo font-bold text-white text-2xl ">
          <span className="text-purple-500"></span>
          <span>!!Pass</span>
          {/* <img className='size-5 my-2' src="icons/pass09.png" alt="" ></img> */}
          <span className="text-purple-500">Guard!!</span>
        </div>
        <ul>
          {/* <li className='flex gap-4 '>
    <a className='hover:font-bold' href="/">Home</a>
    <a className='hover:font-bold' href="#">About</a>
    <a className='hover:font-bold' href="#">Contact</a>
    </li> */}
        </ul>
        <a href="/login">
          <button
            className="gap-0 md:gap-2 flex justify-center items-center  bg-purple-600 px-2 md:px-4 mx-2 py-2
     rounded-full text-center shadow-lg transform transition-transform duration-300 hover:bg-purple-400 hover:scale-105 ring-white ring-1">
            <Github />
            <span  className="font-bold  ">Github</span>
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;