import React, { useEffect, useState } from 'react';
import Hero from '../components/Layout/Hero';
import VisionMissionSection from '../components/Layout/VisionMissionSection';
import Categories from "../components/Products/Categories";
import ProductGrid from "../components/Products/ProductGrid";
import NewArrivals from "../components/Products/NewArrivals";
//import ProductDetails from "../components/Products/ProductDetails";
// import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import ResearchHighlights from "../components/Layout/ResearchHighlights";
import DigDis from "../components/Layout/DigDis";
import NewLaunch from "../components/Layout/NewLaunch";
import { useDispatch , useSelector} from "react-redux";

const Home = () => {
  // const dispatch = useDispatch();
  // const {products, loading, error} = useSelector((state) => state.products );
  // const [bestsellerProduct, setBestSellerProduct] = useState(null);

  // useEffect(() => {
  //   // Fetch products for a specific collection
  //   dispatch(fetchProductsByFilters({
  //     category: "Women",
  //     limit: 8,
  //   }));

  //   // Fetch best seller product
  // const fetchBestSeller = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
  //     );
  //     setBestSellerProduct(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
    
  // };
  // fetchBestSeller();

  // }, [dispatch]);

  
  
  return (
    <div>
     
     <Hero /> 
     <Categories />
     <NewArrivals />
     <NewLaunch />

     {/* Best Seller
     <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
     {bestsellerProduct ? (<ProductDetails productId={bestsellerProduct._id} /> ) :
      (
        <p  className="text-center" >Loading Best Seller Product...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Women HealthCare</h2> */}

        {/* <ProductGrid products= {products} loading={loading} error={error}/>
       */}

       {/* <FeaturedCollection /> */}
         <VisionMissionSection />
         <ResearchHighlights />
         <DigDis />
       <FeaturesSection />
      
       
    </div>
  
  )
}

export default Home;
