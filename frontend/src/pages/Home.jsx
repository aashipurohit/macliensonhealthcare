import React from 'react';
import Hero from '../components/Layout/Hero';
import VisionMissionSection from '../components/Layout/VisionMissionSection';
import Categories from "../components/Products/Categories";
import ProductGrid from "../components/Products/ProductGrid";
import NewArrivals from "../components/Products/NewArrivals";
import FeaturesSection from "../components/Products/FeaturesSection";
import ResearchHighlights from "../components/Layout/ResearchHighlights";
import DigDis from "../components/Layout/DigDis";
import NewLaunch from "../components/Layout/NewLaunch";
import { Helmet } from "react-helmet-async";


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Buy Genuine Medicines & Healthcare Products | Maclienson Healthcare</title>
        <meta
          name="description"
          content="Maclienson Healthcare offers trusted pharmaceutical and healthcare products with nationwide delivery. Buy genuine medicines, cosmetics, and more."
        />
        <meta
          name="keywords"
          content="Maclienson Healthcare, pharmacy, medicines, healthcare products, skincare, cosmetics, pharma store"
        />
        <link rel="canonical" href="https://www.macliensonhealthcare.com/" />
        
        {/* Social Sharing Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Maclienson Healthcare - Trusted Medicines & Health Products" />
        <meta
          property="og:description"
          content="Buy high-quality pharmaceutical, cosmetic, and healthcare products online from Maclienson Healthcare."
        />
        <meta property="og:url" content="https://www.macliensonhealthcare.com/" />
        <meta property="og:image" content="https://www.macliensonhealthcare.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Maclienson Healthcare" />
        <meta
          name="twitter:description"
          content="Your trusted source for healthcare and pharmaceutical products."
        />
        <meta name="twitter:image" content="https://www.macliensonhealthcare.com/logo.png" />
      </Helmet>
     
     <Hero /> 
     <Categories />
     <NewArrivals />
     <NewLaunch />
     <DigDis />
      <VisionMissionSection />
      <ResearchHighlights /> 
       <FeaturesSection />
    </div>
  
  )
}

export default Home;
