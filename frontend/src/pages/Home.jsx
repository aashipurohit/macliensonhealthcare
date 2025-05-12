import React from 'react';
import Hero from '../components/Layout/Hero';
import VisionMissionSection from '../components/Layout/VisionMissionSection';
import Categories from "../components/Products/Categories";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
// import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import ResearchHighlights from "../components/Layout/ResearchHighlights";
import DigDis from "../components/Layout/DigDis";
import NewLaunch from "../components/Layout/NewLaunch";

const Home = () => {
  return (
    <div>
     
     <Hero /> 
     <Categories />
     <NewArrivals />
     <NewLaunch />
     {/*Best Seller */}
       <ProductDetails />

       {/* <FeaturedCollection /> */}
         <VisionMissionSection />
         <ResearchHighlights />
         <DigDis />
       <FeaturesSection />
      
       
    </div>
  
  )
}

export default Home;
