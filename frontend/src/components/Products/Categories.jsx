import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
       <>
   <section className="bg-rose-100 py-12 px-4 lg:px-0">
  <div className="container mx-auto text-center px-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Maclienson Healthcare Pvt. Ltd.</h2>
    <ul className="text-lg font-semibold text-gray-700 leading-relaxed text-left list-disc pl-8 space-y-4">
      <li><p>We deliver innovative pharmaceutical solutions with unwavering commitment to quality and efficacy.</p></li>
      <li><p>We provide international standard medicines at affordable prices, making quality healthcare accessible to all patients.</p></li>
      <li><p>Our dedication to research, integrity, and patient well-being drives us to create meaningful health outcomes for communities worldwide.</p></li>
    </ul>
  </div>
</section>



    {/* <section className="navbar
     py-16 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
            */}
            {/*  Medicine  */}
         
         {/* <div className="relative flex-1">
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
         </div> */}

           {/*Healthcare Essentials*/}

           {/* <div className="relative flex-1">
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
             </div> */}
         {/* </div>

          


        </div>

    </section> */}
    </>
  );
};

export default Categories
