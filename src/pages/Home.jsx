import React from 'react';
import Hero from '../components/Layout/Hero';
import VisionMissionSection from '../components/Layout/VisionMissionSection';
import Categories from "../components/Products/Categories";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import ResearchHighlights from "../components/Layout/ResearchHighlights";
import DigDis from "../components/Layout/DigDis";

const Home = () => {
  return (
    <div>
     
     <Hero /> 
     <Categories />
     <NewArrivals />
     {/*Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
       <ProductDetails />

       <FeaturedCollection />
         <VisionMissionSection />
         <ResearchHighlights />
         <DigDis />
       <FeaturesSection />
      
       
    </div>
  
  )
}

export default Home;
