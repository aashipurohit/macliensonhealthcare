import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
           
            {/*  Medicine  */}
         
         <div className="relative flex-1">
            <img 
            src={assets.medicine_cat}
             alt="Medicine"
             className="w-full h-[700px] object-cover" />
             <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Medicine
                </h2>
                <Link 
                to="/collections/all?type=Tablets"
                className="text-gray-900 underline"
                >
                    Shop Now
                </Link>
             </div>
         </div>

           {/*Healthcare Essentials*/}

           <div className="relative flex-1">
            <img 
            src={assets.healthcare_cat}
             alt="Healthcare Essentials"
             className="w-full h-[700px] object-cover" />
             <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Healthcare Essentials
                </h2>
                <Link 
                to="/collections/all?type=Tablets"
                className="text-gray-900 underline"
                >
                    Shop Now
                </Link>
             </div>
         </div>

          


        </div>

    </section>
  )
}

export default Categories
