import { motion } from 'framer-motion';
import { Leaf, FlaskConical, HeartPulse, Baby, Activity } from 'lucide-react';

export default function AboutUs() {
  const products = [
    { name: 'Myoinositol supplements', icon: <Leaf className="text-success-500" />, desc: 'For hormonal balance and PCOS management' },
    { name: 'Protein formulations', icon: <FlaskConical className="text-primary-500" />, desc: 'Specialized for women and athletes' },
    { name: 'PCOS/PCOD care', icon: <HeartPulse className="text-lilac-900" />, desc: 'Evidence-based management formulas' },
    { name: 'Kids nutrition', icon: <Baby className="text-neutral-500" />, desc: 'Pediatric-approved supplements' },
    { name: 'Sports nutrition', icon: <Activity className="text-danger-500" />, desc: 'Performance-enhancing formulas' },
    { name: 'Maternal care', icon: <HeartPulse className="text-gold-200" />, desc: 'Prenatal and postnatal support' }
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
        <h1 className="text-4xl font-serif font-bold text-primary-950 mb-6">
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
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="p-8 sm:p-8">
            <h2 className="text-2xl font-serif font-semibold text-primary-900 mb-6">
              Our Story
            </h2>
            <div className="prose prose-stone max-w-none">
              <p className="text-gray-700 mb-6">
                Founded in the pharmaceutical hub of Rau, Indore, Maclienson Healthcare Pvt. Ltd. is a proud
                Indian division of <strong>Maclienson Life Sciences Inc.</strong> — a globally registered company
                headquartered in Wyoming, USA. We specialize in women's wellness products combining modern
                science with traditional wisdom. Our GMP-certified facility develops formulations that address
                the unique nutritional needs of Indian women.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {products.map((product, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {product.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-700">{product.name}</h3>
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
          className="bg-primary-50 rounded-lg p-8"
        >
          <h3 className="text-xl font-serif font-semibold text-primary-900 mb-4">
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
          className="bg-gold-100 rounded-lg p-8"
        >
          <h3 className="text-xl font-serif font-semibold text-primary-900 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-700">
            To develop evidence-based formulations that bridge the gap between modern medicine 
            and traditional wellness practices, specifically tailored for Indian women's health needs.
          </p>
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

