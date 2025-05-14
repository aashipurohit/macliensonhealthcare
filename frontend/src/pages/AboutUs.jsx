import { motion } from 'framer-motion';
import { MapPin, Leaf, FlaskConical, HeartPulse, Baby, Activity } from 'lucide-react';

export default function AboutUs() {
  const products = [
    { name: 'Myoinositol supplements', icon: <Leaf className="text-green-500" />, desc: 'For hormonal balance and PCOS management' },
    { name: 'Protein formulations', icon: <FlaskConical className="text-blue-500" />, desc: 'Specialized for women and athletes' },
    { name: 'PCOS/PCOD care', icon: <HeartPulse className="text-pink-500" />, desc: 'Evidence-based management formulas' },
    { name: 'Kids nutrition', icon: <Baby className="text-yellow-500" />, desc: 'Pediatric-approved supplements' },
    { name: 'Sports nutrition', icon: <Activity className="text-red-500" />, desc: 'Performance-enhancing formulas' },
    { name: 'Maternal care', icon: <HeartPulse className="text-purple-500" />, desc: 'Prenatal and postnatal support' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-indigo-900 mb-6">
          About Maclienson Healthcare
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Empowering women's health through scientifically formulated nutraceuticals since 2024.
        </p>
      </motion.section>

      {/* Company Overview */}
      <section className="max-w-7xl mx-auto mb-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-6">
              Our Story
            </h2>
            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-700 mb-6">
                Founded in the pharmaceutical hub of Rau, Indore, Maclienson Healthcare specializes in 
                women's wellness products combining modern science with traditional wisdom. Our GMP-certified 
                facility develops formulations that address the unique nutritional needs of Indian women.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {products.map((product, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {product.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                      <p className="text-gray-600">{product.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-700">
                All our products undergo rigorous quality testing and are developed by a team of 
                nutritionists and pharmacologists.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission/Vision */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-indigo-50 rounded-xl p-8"
        >
          <h3 className="text-xl font-semibold text-indigo-800 mb-4">
            Our Vision
          </h3>
          <p className="text-gray-700">
            To become India's most trusted women's healthcare brand by 2030, making specialized 
            nutrition accessible to every woman through innovative and affordable solutions.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-amber-50 rounded-xl p-8"
        >
          <h3 className="text-xl font-semibold text-amber-800 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-700">
            To develop evidence-based formulations that bridge the gap between modern medicine 
            and traditional wellness practices, specifically tailored for Indian women's health needs.
          </p>
        </motion.div>
      </section>

      {/* Location Map */}
      <section className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-indigo-800 mb-6 text-center">
            Our Headquarters
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="text-red-500 mr-2" />
                <span className="text-gray-700 font-medium">
                  Rau, Indore - The Pharmaceutical Hub of Central India
                </span>
              </div>
              
              {/* Precise Rau Map */}
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.257382556!2d75.7927404!3d22.6115936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sRau%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1718754321754!5m2!1sen!2sin" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  aria-label="Map showing Maclienson Healthcare headquarters in Rau, Indore"
                  title="Company Location Map"
                ></iframe>
              </div>

              {/* Address Box */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Maclienson Healthcare Pvt. Ltd.
                </h3>
                <address className="not-italic text-gray-600">
                  Pharmaceutical Complex, Rau Circle<br />
                  Indore - 453331, Madhya Pradesh<br />
                  <a 
                    href="mailto:info@maclienson.com" 
                    className="text-indigo-600 hover:underline"
                  >
                    info@maclienson.com
                  </a>
                </address>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Accessibility Features */}
      <div className="sr-only" aria-hidden="true">
        <h2>Accessibility Statement</h2>
        <p>
          Maclienson Healthcare is committed to digital accessibility for people with disabilities.
          We follow WCAG 2.1 AA standards across our digital properties.
        </p>
      </div>
    </div>
  );
}