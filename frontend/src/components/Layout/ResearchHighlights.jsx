import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { assets } from "../../assets/assets";

const ResearchHighlights = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedArticle, setExpandedArticle] = useState(null);

  const allArticles = [
    {
  id: 1,
  image: assets.rh_myo,
  title: 'The Comparative Effects of Myo-Inositol and Metformin in PCOS Treatment',
  description: 'Clinical trial comparing Myo-Inositol and Metformin efficacy in normal-weight PCOS patients, showing significant improvements in hormonal and metabolic parameters with both treatments.',
  fullContent: (
    <div className="space-y-6">
      {/* Study Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-rose-700 mb-4">Study Highlights</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">🔬 Study Design</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>6-month randomized controlled trial</li>
              <li>200 normal-weight PCOS patients (BMI 18.5-24.9)</li>
              <li>Age group: 18-35 years</li>
              <li>Double-blind, placebo-controlled methodology</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">💊 Treatment Groups</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Group A: Myo-Inositol 2000mg twice daily</li>
              <li>Group B: Metformin SR 1000mg twice daily</li>
              <li>Group C: Combined therapy</li>
              <li>Group D: Placebo control</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div>
        <h3 className="font-bold text-lg mb-3">📊 Key Findings</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-1">Menstrual Regularity</h4>
            <p className="text-sm">
              <span className="font-bold">Myo-Inositol:</span> 78% improvement<br/>
              <span className="font-bold">Metformin:</span> 72% improvement
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-1">Insulin Sensitivity</h4>
            <p className="text-sm">
              <span className="font-bold">HOMA-IR Reduction:</span><br/>
              Myo-Inositol: 32% ↓<br/>
              Metformin: 38% ↓
            </p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <h4 className="font-semibold text-purple-700 mb-1">Androgen Levels</h4>
            <p className="text-sm">
              <span className="font-bold">Free Testosterone:</span><br/>
              Myo-Inositol: 41% ↓<br/>
              Metformin: 36% ↓
            </p>
          </div>
        </div>

        <div className="bg-rose-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-rose-700 mb-2">Comparative Efficacy</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Parameter</th>
                <th className="text-center">Myo-Inositol</th>
                <th className="text-center">Metformin</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Ovulation Rate</td>
                <td className="text-center">82%</td>
                <td className="text-center">76%</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">BMI Change</td>
                <td className="text-center">-0.8 kg/m²</td>
                <td className="text-center">-1.2 kg/m²</td>
              </tr>
              <tr>
                <td className="py-2">Side Effects</td>
                <td className="text-center">8% reported</td>
                <td className="text-center">23% reported</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mechanism of Action */}
      <div>
        <h3 className="font-bold text-lg mb-3">⚙️ Mechanism of Action</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-700 mb-2">Myo-Inositol</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Improves insulin receptor signaling</li>
              <li>Enhances FSH sensitivity in ovaries</li>
              <li>Reduces androgen production</li>
              <li>Promotes oocyte quality</li>
            </ul>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <h4 className="font-semibold text-teal-700 mb-2">Metformin</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Activates AMP-activated protein kinase</li>
              <li>Suppresses hepatic glucose production</li>
              <li>Reduces intestinal glucose absorption</li>
              <li>Decreases ovarian androgen secretion</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Clinical Recommendations */}
      <div className="bg-gray-50 p-4 rounded-lg mt-4">
        <h3 className="font-bold text-lg mb-2">🏥 Clinical Recommendations</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>First-line therapy:</strong> Myo-Inositol preferred for patients concerned about gastrointestinal side effects</li>
          <li><strong>Severe insulin resistance:</strong> Metformin may show better results</li>
          <li><strong>Fertility goals:</strong> Consider combination therapy for optimal ovulation induction</li>
          <li><strong>Maintenance therapy:</strong> Myo-Inositol better tolerated for long-term use</li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          <strong>Note:</strong> Study conducted on normal-weight PCOS patients. Results may vary for overweight/obese populations.
        </p>
      </div>

      {/* References */}
      <div className="text-sm text-gray-500 mt-6">
        <p>Reference: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10886614/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Original Study (PMC10886614)</a></p>
      </div>
    </div>
  ),
  category: 'research',
  date: '2024-03-15',
  link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10886614/'
},
   {
  id: 2,
  image: assets.rh_a4,
  title: 'Is PCOS the Same as PCOD? Understanding the Key Differences',
  description: 'While often confused, PCOS and PCOD differ in severity, hormonal impact, and long-term health implications. Learn how to distinguish these conditions.',
  fullContent: (
    <div className="space-y-6">
      {/* New Block Diagram Comparison */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-xl font-bold text-center mb-6 text-rose-700">PCOS vs PCOD: At a Glance</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* PCOD Column */}
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <h4 className="font-bold text-lg text-blue-800 text-center mb-4 pb-2 border-b border-blue-300">PCOD</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">•</span>
                <span><strong>Type:</strong> Metabolic disorder</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">•</span>
                <span><strong>Common:</strong> 1 in 10 women</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">•</span>
                <span><strong>Ovulation:</strong> Usually occurs</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">•</span>
                <span><strong>Severity:</strong> Mild symptoms</span>
              </li>
            </ul>
          </div>

          {/* PCOS Column */}
          <div className="bg-rose-50 p-4 rounded-lg border-2 border-rose-200">
            <h4 className="font-bold text-lg text-rose-800 text-center mb-4 pb-2 border-b border-rose-300">PCOS</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-rose-100 text-rose-800 rounded-full p-1 mr-2">•</span>
                <span><strong>Type:</strong> Endocrine disorder</span>
              </li>
              <li className="flex items-start">
                <span className="bg-rose-100 text-rose-800 rounded-full p-1 mr-2">•</span>
                <span><strong>Common:</strong> 1 in 15 women</span>
              </li>
              <li className="flex items-start">
                <span className="bg-rose-100 text-rose-800 rounded-full p-1 mr-2">•</span>
                <span><strong>Ovulation:</strong> Often absent</span>
              </li>
              <li className="flex items-start">
                <span className="bg-rose-100 text-rose-800 rounded-full p-1 mr-2">•</span>
                <span><strong>Severity:</strong> Significant symptoms</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Original Detailed Content */}
      <h3 className="font-bold text-lg mb-2">The Fundamental Difference</h3>
      <p className="mb-4">
        PCOD (Polycystic Ovarian Disease) is primarily a metabolic disorder marked by multiple ovarian cysts, while PCOS (Polycystic Ovarian Syndrome) is an endocrine system disorder with more severe hormonal imbalances and systemic effects.
      </p>

      <h3 className="font-bold text-lg mb-2">Key Clinical Differences</h3>
      <ul className="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Prevalence:</strong> PCOD affects ~10% of women, PCOS affects ~5-7%</li>
        <li><strong>Ovulation:</strong> PCOD patients often ovulate regularly, PCOS patients frequently experience anovulation</li>
        <li><strong>Insulin Resistance:</strong> Present in 70-80% of PCOS cases vs 20-30% of PCOD cases</li>
        <li><strong>Androgen Levels:</strong> Significantly higher in PCOS</li>
      </ul>

      <h3 className="font-bold text-lg mb-2">Diagnostic Criteria</h3>
      <p className="mb-4">
        PCOS requires at least 2 of these 3 Rotterdam criteria:
        <ol className="list-decimal pl-5 mt-2 space-y-1">
          <li>Irregular or absent periods</li>
          <li>Clinical/biochemical signs of hyperandrogenism</li>
          <li>Polycystic ovaries on ultrasound</li>
        </ol>
        PCOD is diagnosed primarily through ultrasound findings with milder symptoms.
      </p>

      <h3 className="font-bold text-lg mb-2">Long-Term Health Risks</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-rose-50 p-3 rounded-lg">
          <h4 className="font-semibold text-rose-700">PCOS Risks</h4>
          <ul className="text-sm mt-1 space-y-1">
            <li>Type 2 diabetes (2-4× higher risk)</li>
            <li>Cardiovascular disease</li>
            <li>Endometrial cancer</li>
            <li>Clinical depression</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-semibold text-blue-700">PCOD Risks</h4>
          <ul className="text-sm mt-1 space-y-1">
            <li>Weight management challenges</li>
            <li>Mild fertility issues</li>
            <li>Occasional hormonal acne</li>
          </ul>
        </div>
      </div>

      <h3 className="font-bold text-lg mb-2">Treatment Approaches</h3>
      <p className="mb-2">
        <strong>For PCOD:</strong> Lifestyle modifications (diet/exercise) are often sufficient. OCPs may be used for symptom management.
      </p>
      <p>
        <strong>For PCOS:</strong> Requires comprehensive management including:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Metformin for insulin resistance</li>
          <li>Anti-androgens for hirsutism</li>
          <li>Fertility treatments when needed</li>
          <li>Mental health support</li>
        </ul>
      </p>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-bold text-gray-800 mb-2">When to Consult a Doctor</h4>
        <p>
          Seek medical advice if experiencing:
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Irregular periods for &gt;3 cycles</li>
            <li>Unexplained weight gain with acne</li>
            <li>Excessive facial/body hair</li>
            <li>Difficulty conceiving after 6-12 months</li>
          </ul>
        </p>
      </div>
    </div>
  ),
  category: 'education',
  date: '2024-02-28',
  link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10063586/'
},
    {
  id: 3,
  image: assets.rh_a3,
  title: 'Understanding Oligohydramnios: Causes, Risks & Management',
  description: 'Comprehensive guide to low amniotic fluid levels - diagnosis, clinical implications, and evidence-based management strategies for optimal pregnancy outcomes.',
  fullContent: (
    <div className="space-y-6">
      {/* Hero Summary */}
      <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400 flex items-start">
        <div className="mr-4 text-blue-500 text-3xl">🫄</div>
        <div>
          <h3 className="font-bold text-blue-800 mb-2">Oligohydramnios at a Glance</h3>
          <p className="text-blue-700">
            Affecting ~4% of pregnancies, oligohydramnios (amniotic fluid index ≤5cm or single deepest pocket ≤2cm) requires careful monitoring and individualized management.
          </p>
        </div>
      </div>

      {/* Causes & Risk Factors */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-rose-50 p-5 rounded-xl">
          <div className="flex items-center mb-3">
            <div className="bg-rose-100 p-2 rounded-full mr-3">🔍</div>
            <h4 className="font-bold text-rose-800">Primary Causes</h4>
          </div>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start">
              <span className="bg-rose-200 text-rose-800 rounded-full p-1 mr-2 text-xs">1</span>
              <span><strong>Ruptured membranes</strong> (25-35% of cases)</span>
            </li>
            <li className="flex items-start">
              <span className="bg-rose-200 text-rose-800 rounded-full p-1 mr-2 text-xs">2</span>
              <span><strong>Placental insufficiency</strong> (IUGR association)</span>
            </li>
            <li className="flex items-start">
              <span className="bg-rose-200 text-rose-800 rounded-full p-1 mr-2 text-xs">3</span>
              <span><strong>Fetal anomalies</strong> (renal/urinary tract defects)</span>
            </li>
            <li className="flex items-start">
              <span className="bg-rose-200 text-rose-800 rounded-full p-1 mr-2 text-xs">4</span>
              <span><strong>Post-term pregnancy</strong> (≥42 weeks)</span>
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 p-5 rounded-xl">
          <div className="flex items-center mb-3">
            <div className="bg-purple-100 p-2 rounded-full mr-3">⚠️</div>
            <h4 className="font-bold text-purple-800">Risk Factors</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="bg-white bg-opacity-50 rounded px-2 py-1 text-sm shadow-xs">Hypertension</span>
            <span className="bg-white bg-opacity-50 rounded px-2 py-1 text-sm shadow-xs">Diabetes</span>
            <span className="bg-white bg-opacity-50 rounded px-2 py-1 text-sm shadow-xs">Lupus</span>
            <span className="bg-white bg-opacity-50 rounded px-2 py-1 text-sm shadow-xs">Dehydration</span>
            <span className="bg-white bg-opacity-50 rounded px-2 py-1 text-sm shadow-xs">ACE inhibitors</span>
            <span className="bg-white bg-opacity-50 rounded px-2 py-1 text-sm shadow-xs">NSAID use</span>
          </div>
        </div>
      </div>

      {/* Diagnostic Process */}
      <div className="bg-teal-50 p-5 rounded-xl">
        <h3 className="font-bold text-teal-800 mb-4 flex items-center">
          <span className="bg-teal-100 p-2 rounded-full mr-3">🩺</span>
          Diagnostic Pathway
        </h3>
        <div className="flex overflow-x-auto pb-4">
          <div className="flex space-x-4">
            {[
              { step: 1, icon: '📅', text: 'Gestational age confirmation' },
              { step: 2, icon: '💧', text: 'AFI measurement' },
              { step: 3, icon: '👶', text: 'Fetal anatomy scan' },
              { step: 4, icon: '❤️', text: 'Doppler studies' },
              { step: 5, icon: '🧪', text: 'Infection workup' }
            ].map((item) => (
              <div key={item.step} className="bg-white p-4 rounded-lg shadow-sm flex-shrink-0 w-40">
                <div className="bg-teal-100 text-teal-800 rounded-full w-8 h-8 flex items-center justify-center mb-2 mx-auto">
                  {item.icon}
                </div>
                <p className="text-center text-sm font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Management Strategies */}
      <div>
        <h3 className="font-bold text-lg mb-3 flex items-center">
          <span className="bg-amber-100 p-2 rounded-full mr-2">🛡️</span>
          Management Approaches by Trimester
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              trimester: '1st',
              color: 'bg-amber-100',
              actions: [
                'Rule out fetal anomalies',
                'Genetic counseling',
                'Consider termination if severe anomalies'
              ]
            },
            {
              trimester: '2nd',
              color: 'bg-green-100',
              actions: [
                'Serial growth scans',
                'Amnioinfusion if indicated',
                'Steroids if delivery possible'
              ]
            },
            {
              trimester: '3rd',
              color: 'bg-blue-100',
              actions: [
                'Fetal monitoring 2x/week',
                'Delivery at 36-37 weeks',
                'Maternal hydration therapy'
              ]
            }
          ].map((item) => (
            <div key={item.trimester} className={`${item.color} p-4 rounded-lg`}>
              <div className="font-bold text-lg mb-2">{item.trimester} Trimester</div>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {item.actions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Risk Scale */}
      <div className="bg-white p-5 rounded-xl border border-gray-200">
        <h3 className="font-bold text-lg mb-4 flex items-center">
          <span className="bg-red-100 text-red-800 p-2 rounded-full mr-2">📊</span>
          Severity Classification
        </h3>
        <div className="space-y-3">
          {[
            { level: 'Mild', range: 'AFI 5-8cm', color: 'bg-yellow-100', risk: 'Low complication risk' },
            { level: 'Moderate', range: 'AFI 3-5cm', color: 'bg-orange-100', risk: 'Increased monitoring needed' },
            { level: 'Severe', range: 'AFI <3cm', color: 'bg-red-100', risk: 'Immediate intervention required' }
          ].map((item) => (
            <div key={item.level} className="flex items-center">
              <div className={`${item.color} w-24 py-2 text-center font-medium rounded-l-lg`}>
                {item.level}
              </div>
              <div className="flex-grow bg-gray-100 py-2 px-4">
                <span className="font-medium">{item.range}</span> • {item.risk}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Counseling */}
      <div className="bg-indigo-50 p-5 rounded-xl">
        <h3 className="font-bold text-indigo-800 mb-3 flex items-center">
          <span className="bg-indigo-100 p-2 rounded-full mr-2">💬</span>
          Patient Counseling Points
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg">
            <h4 className="font-semibold text-indigo-700 mb-1 flex items-center">
              <span className="mr-2">✅</span> Do's
            </h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Increase water intake (2-3L/day)</li>
              <li>Monitor fetal movement daily</li>
              <li>Attend all scheduled scans</li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <h4 className="font-semibold text-indigo-700 mb-1 flex items-center">
              <span className="mr-2">❌</span> Don'ts
            </h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Avoid NSAIDs without consultation</li>
              <li>Don't ignore reduced fetal movements</li>
              <li>Don't delay prenatal visits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  category: 'clinical',
  date: '2024-01-10',
  link: 'https://www.ncbi.nlm.nih.gov/books/NBK562326/'
},
  ];

  const filteredArticles = activeFilter === 'all' 
    ? allArticles 
    : allArticles.filter(article => article.category === activeFilter);

  const toggleExpand = (id) => {
    setExpandedArticle(prev => (prev === id ? null : id));
  };

  return (
    <section className="px-6 py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Research Highlights</h1>
          <p className="text-lg text-cyan-800 font-medium mb-6">
            Discover the latest medical research and insights
          </p>

          {/* Filter Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['all', 'research', 'education', 'clinical'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full capitalize transition-colors ${
                  activeFilter === filter 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter === 'all' ? 'All Articles' : filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <LayoutGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => {
              const isExpanded = expandedArticle === article.id;

              return (
                <motion.div
                  key={article.id}
                  layout
                  transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                  className={`group relative bg-white rounded-xl shadow-lg overflow-hidden ${
                    isExpanded ? 'w-full max-w-5xl md:col-span-2 lg:col-span-3 mx-auto' : ''
                  }`}
                >
                  <motion.div layout className="flex flex-col h-full">
                    {/* Image */}
                    <div className={`relative overflow-hidden ${isExpanded ? 'h-96 md:h-[30rem]' : 'h-64 md:h-80'}`}>

                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-rose-600 uppercase tracking-wider">
                          {article.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(article.date).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {article.title}
                      </h3>

                      {/* Animated Expandable Text */}
                      <motion.div
                        layout
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : 72,
                          opacity: 1,
                          overflow: 'hidden'
                        }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="text-gray-700 mb-4"
                      >
                        <p className="mb-4">
                          {isExpanded ? article.fullContent : article.description}
                        </p>
                        {isExpanded && article.link && (
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-rose-600 hover:text-rose-800 font-medium transition-colors"
                          >
                            Read Full Study
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        )}
                      </motion.div>

                      <button
                        onClick={() => toggleExpand(article.id)}
                        className="mt-2 text-rose-600 hover:text-rose-800 font-medium flex items-center transition-colors"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                        <svg
                          className={`w-4 h-4 ml-1 transform transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
};

export default ResearchHighlights;
