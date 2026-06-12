import React from 'react'
import { HiShoppingBag  } from 'react-icons/hi'; 
import { HiCheckBadge } from 'react-icons/hi2';
import { HiOutlineCreditCard } from 'react-icons/hi2';

const FeaturesSection = () => {
    return (
      <section className="bg-[#FCFAF8] py-24 lg:py-32 border-t border-gold-100/30">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          
          <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-32">
            <h4 className="text-sm font-bold tracking-[0.2em] text-primary-600 mb-8 uppercase">
              Our Promise
            </h4>
            <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif font-medium text-primary-950 leading-[1.05]">
              Leave no patient behind in the journey towards a healthier nation.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative">
            
            {/* Divider lines for desktop */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-gray-200"></div>
            <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-px bg-gray-200"></div>

            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center group px-4">
              <div className="mb-8 text-primary-800 transform group-hover:-translate-y-2 transition-transform duration-500">
                <HiShoppingBag className="text-4xl lg:text-5xl opacity-80" />
              </div>
              <h3 className="mb-5 font-serif text-3xl lg:text-4xl font-medium text-primary-950">Accessibility</h3>
              <p className="text-lg text-primary-900/70 font-sans leading-relaxed">
                Free international shipping on all orders over ₹10,000, ensuring our medicines reach everyone globally.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center group px-4">
              <div className="mb-8 text-primary-800 transform group-hover:-translate-y-2 transition-transform duration-500">
                <HiCheckBadge className="text-4xl lg:text-5xl opacity-80" />
              </div>
              <h3 className="mb-5 font-serif text-3xl lg:text-4xl font-medium text-primary-950">Quality</h3>
              <p className="text-lg text-primary-900/70 font-sans leading-relaxed">
                Premium clinical products guaranteed. Our non-compromising approach ensures the highest quality standards.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center group px-4">
              <div className="mb-8 text-primary-800 transform group-hover:-translate-y-2 transition-transform duration-500">
                <HiOutlineCreditCard className="text-4xl lg:text-5xl opacity-80" />
              </div>
              <h3 className="mb-5 font-serif text-3xl lg:text-4xl font-medium text-primary-950">Trust</h3>
              <p className="text-lg text-primary-900/70 font-sans leading-relaxed">
                100% encrypted & secured process. We maintain strict compliance for absolute peace of mind.
              </p>
            </div>

          </div>
        </div>
      </section>
    );
};
  
export default FeaturesSection;
