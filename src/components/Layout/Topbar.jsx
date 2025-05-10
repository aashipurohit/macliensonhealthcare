import React from 'react';
import {TbBrandMeta} from "react-icons/tb";
import {IoLogoInstagram} from "react-icons/io";
import {RiTwitterXLine} from "react-icons/ri";


const Topbar = () => {
  return (
    <div className="bg-rose-400 text-white">
      <div className="container mx-auto flex justify-between item-center py-3 px-4">
        
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>
       <div className="text-sm text-center flex-grow">
        <span className="text-2xl font-bold">Maclienson HealthCare</span>
       </div>
       <div className="text-lg hidden md:block ">
        <a href="tel: +91 1234567890 " className="hover:text-gray-300">
          +91 8770751559
        </a>

       </div>
      </div>
      
    </div>
  )
}

export default Topbar
