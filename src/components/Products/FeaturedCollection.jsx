import React from 'react';
import { Link } from 'react-router-dom';
import {assets} from "../../assets/assets";

const FeaturedCollection = () => {
  return <section className="py-16 px-4 lg:px-0">
  <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
    {/* Left Content */}
    <div className="lg:w-1/2 p-8 text-center lg:text-left">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
      Trusted Care and Quality
      </h2>
      <h2 className="text-4xl lg:text-5xl font-bold mb-6">
      Reliable Pharmaceuticals for Your Health Needs
      </h2>
      <p className="text-lg text-gray-600 mb-6">
      Explore a wide range of high-quality medicines and health products
      carefully curated to support your well-being. Delivered with care and precision.
      </p>
      <Link to="/collections/all" className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800">
      Browse Products
      </Link>
    </div>

{/*Right Content */}
<div className="lg:w-1/2">
<img src={assets.featured} alt="Featured Image" 
className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"/>

</div>
 
  </div>
</section>;

}

export default FeaturedCollection
