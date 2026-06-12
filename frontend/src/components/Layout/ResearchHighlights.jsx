import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from "../../assets/assets";

const ResearchHighlights = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const allArticles = [
    {
      id: 1,
      image: assets.rh_myo,
      title: 'The Comparative Effects of Myo-Inositol and Metformin in PCOS Treatment',
      description: 'Clinical trial comparing Myo-Inositol and Metformin efficacy in normal-weight PCOS patients, showing significant improvements in hormonal and metabolic parameters with both treatments.',
      link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10886614/',
      fullContent: (
        <div className="space-y-6 text-left">
          {/* Study Overview */}
          <div className="rounded-xl border border-primary-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold text-primary-700">Study Highlights</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-2 font-semibold text-gray-800">🔬 Study Design</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>6-month randomized controlled trial</li>
                  <li>200 normal-weight PCOS patients (BMI 18.5-24.9)</li>
                  <li>Age group: 18-35 years</li>
                  <li>Double-blind, placebo-controlled methodology</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-gray-800">💊 Treatment Groups</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
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
            <h3 className="font-bold text-xl text-gray-900 mb-4">📊 Key Findings</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg bg-primary-50 border border-primary-100 p-4">
                <h4 className="mb-2 font-semibold text-primary-800">Menstrual Regularity</h4>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Myo-Inositol:</span> 78% improvement<br />
                  <span className="font-bold">Metformin:</span> 72% improvement
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Insulin Sensitivity</h4>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">HOMA-IR Reduction:</span><br />
                  Myo-Inositol: 32% ↓<br />
                  Metformin: 38% ↓
                </p>
              </div>
              <div className="rounded-lg bg-primary-50 border border-primary-100 p-4">
                <h4 className="mb-2 font-semibold text-primary-800">Androgen Levels</h4>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Free Testosterone:</span><br />
                  Myo-Inositol: 41% ↓<br />
                  Metformin: 36% ↓
                </p>
              </div>
            </div>
          </div>

          {/* Clinical Recommendations */}
          <div className="mt-8 rounded-xl border-l-4 border-primary-500 bg-primary-50 p-6">
            <h3 className="font-bold text-lg text-primary-900 mb-3">🏥 Clinical Recommendations</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>First-line therapy:</strong> Myo-Inositol preferred for patients concerned about gastrointestinal side effects</li>
              <li><strong>Severe insulin resistance:</strong> Metformin may show better results</li>
              <li><strong>Fertility goals:</strong> Consider combination therapy for optimal ovulation induction</li>
            </ul>
          </div>
        </div>
      ),
      category: 'research',
      date: '2024-03-15',
    },
    {
      id: 2,
      image: assets.rh_a3,
      title: 'Is PCOS the Same as PCOD? Understanding the Key Differences',
      description: 'While often confused, PCOS and PCOD differ in severity, hormonal impact, and long-term health implications. Learn how to distinguish these conditions.',
      link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10063586/',
      fullContent: (
        <div className="space-y-6 text-left">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-center text-xl font-bold text-primary-700">PCOS vs PCOD: At a Glance</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-lg border-2 border-primary-200 bg-primary-50 p-5">
                <h4 className="mb-4 border-b border-primary-200 pb-2 text-center text-lg font-bold text-primary-800">PCOD (Polycystic Ovarian Disease)</h4>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li>• <strong>Condition Type:</strong> Primarily a condition of the ovaries.</li>
                  <li>• <strong>Prevalence:</strong> More common, affecting nearly 1 in 10 women globally.</li>
                  <li>• <strong>Ovulation & Fertility:</strong> Women with PCOD generally continue to ovulate and can conceive with minimal medical intervention.</li>
                  <li>• <strong>Hormonal Shift:</strong> Mild hormonal imbalance; symptoms are often manageable with lifestyle changes.</li>
                </ul>
              </div>
              <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-5">
                <h4 className="mb-4 border-b border-gray-200 pb-2 text-center text-lg font-bold text-gray-800">PCOS (Polycystic Ovary Syndrome)</h4>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li>• <strong>Condition Type:</strong> A severe systemic endocrine (metabolic) disorder.</li>
                  <li>• <strong>Prevalence:</strong> Less common, affecting roughly 1 in 15 women.</li>
                  <li>• <strong>Ovulation & Fertility:</strong> Anovulation (lack of ovulation) is extremely common, making conception naturally more difficult.</li>
                  <li>• <strong>Hormonal Shift:</strong> Severe hyperandrogenism (excess male hormones) leading to pronounced hirsutism, acne, and hair thinning.</li>
                </ul>
              </div>
            </div>

            {/* Deep Dive Medical Details */}
            <h3 className="font-bold text-xl text-gray-900 mb-4 border-t border-gray-100 pt-6">🧬 Deep Dive: Clinical Implications</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-primary-800 mb-2">1. Long-Term Health Risks</h4>
                <p className="text-gray-700 mb-2 text-sm">Because PCOS is a systemic metabolic syndrome, it carries far heavier long-term risks compared to PCOD. Women diagnosed with PCOS must be actively monitored for:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                  <li><strong>Type 2 Diabetes:</strong> Up to 70% of women with PCOS exhibit insulin resistance, making them highly susceptible to prediabetes and Type 2 Diabetes by age 40.</li>
                  <li><strong>Cardiovascular Issues:</strong> Increased risk of hypertension (high blood pressure) and dyslipidemia (imbalanced cholesterol).</li>
                  <li><strong>Endometrial Hyperplasia:</strong> Chronic anovulation leads to unchecked estrogen levels, which increases the risk of endometrial cancer over time.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-primary-800 mb-2">2. Diagnostic Criteria (Rotterdam Criteria)</h4>
                <p className="text-gray-700 mb-2 text-sm">To officially diagnose PCOS, an endocrinologist or gynecologist relies on the Rotterdam Criteria. A patient must exhibit at least two of the following three markers:</p>
                <ul className="list-decimal pl-5 space-y-1 text-gray-600 text-sm">
                  <li>Oligo-ovulation or anovulation (irregular or absent menstrual cycles).</li>
                  <li>Clinical and/or biochemical signs of hyperandrogenism (excess testosterone).</li>
                  <li>Polycystic ovaries visible on an ultrasound (12 or more follicles per ovary).</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2 italic">*Note: PCOD is primarily diagnosed solely via ultrasound morphology and does not strictly require the metabolic or systemic symptoms seen in the Rotterdam Criteria.</p>
              </div>

              <div>
                <h4 className="font-bold text-primary-800 mb-2">3. Treatment Methodologies</h4>
                <p className="text-gray-700 mb-2 text-sm"><strong>Managing PCOD:</strong> Generally resolved through diet, weight management, avoiding processed foods, and light exercise. Medical intervention is usually minimal.</p>
                <p className="text-gray-700 text-sm"><strong>Managing PCOS:</strong> Requires a multi-disciplinary approach. Treatment often involves Metformin (to combat insulin resistance), combined oral contraceptives (to regulate cycles and protect the endometrium), anti-androgens (like Spironolactone for acne and hair growth), and structured fertility treatments (like Letrozole or Clomiphene) when trying to conceive.</p>
              </div>
            </div>
          </div>
        </div>
      ),
      category: 'education',
      date: '2024-02-28',
    },
    {
      id: 3,
      image: assets.rh_a4,
      title: 'Understanding Oligohydramnios: Causes, Risks & Management',
      description: 'Comprehensive guide to low amniotic fluid levels - diagnosis, clinical implications, and evidence-based management strategies for optimal pregnancy outcomes.',
      link: 'https://www.ncbi.nlm.nih.gov/books/NBK562326/',
      fullContent: (
        <div className="space-y-6 text-left">
          {/* Hero Summary */}
          <div className="flex items-start rounded-xl border-l-4 border-primary-400 bg-primary-50 p-6 shadow-sm">
            <div className="mr-4 text-3xl">🫄</div>
            <div>
              <h3 className="mb-2 font-bold text-primary-800 text-lg">Oligohydramnios at a Glance</h3>
              <p className="text-primary-700 leading-relaxed text-sm">
                Affecting approximately 4-5% of pregnancies, oligohydramnios is clinically defined as an Amniotic Fluid Index (AFI) of ≤5cm or a Single Deepest Pocket (SDP) of ≤2cm. Because amniotic fluid is crucial for fetal lung development, temperature regulation, and cushioning the umbilical cord, a low volume requires immediate and careful clinical monitoring.
              </p>
            </div>
          </div>

          {/* Causes & Fetal Complications */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-3 rounded-full bg-primary-50 p-2 text-xl">🔍</div>
                <h4 className="font-bold text-gray-900 text-lg">Primary Etiology (Causes)</h4>
              </div>
              <ul className="space-y-3 pl-2 text-gray-700 text-sm">
                <li className="flex items-start">
                  <span className="mr-3 mt-0.5 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-bold text-primary-800">1</span>
                  <span><strong>Premature Rupture of Membranes (PROM):</strong> The most common cause, accounting for 25-35% of cases.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-0.5 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-bold text-primary-800">2</span>
                  <span><strong>Placental Insufficiency:</strong> Poor blood flow to the placenta, often leading to Intrauterine Growth Restriction (IUGR).</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-0.5 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-bold text-primary-800">3</span>
                  <span><strong>Fetal Renal Anomalies:</strong> In the second half of pregnancy, amniotic fluid is mostly fetal urine. Conditions like renal agenesis reduce fluid volume.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-0.5 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-bold text-primary-800">4</span>
                  <span><strong>Post-term Pregnancy:</strong> Fluid naturally declines after 40 weeks, dropping sharply by 42 weeks.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-3 rounded-full bg-gray-200 p-2 text-xl">⚠️</div>
                <h4 className="font-bold text-gray-900 text-lg">Fetal Complications</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Severe oligohydramnios can lead to mechanical and developmental complications:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                <li><strong>Cord Compression:</strong> Without fluid cushioning, the umbilical cord can compress, leading to fetal hypoxia (seen as variable decelerations on CTG).</li>
                <li><strong>Pulmonary Hypoplasia:</strong> If fluid is low during the second trimester, fetal lungs cannot expand properly, leading to severe breathing issues at birth.</li>
                <li><strong>Potter Sequence:</strong> Prolonged lack of fluid can cause facial deformities and limb contractures (e.g., clubfoot) due to uterine wall compression.</li>
                <li><strong>Meconium Aspiration:</strong> Increased risk of the fetus passing meconium (first stool) in utero due to stress.</li>
              </ul>
            </div>
          </div>

          {/* Advanced Monitoring Process */}
          <div className="rounded-xl bg-white border border-primary-100 p-6 shadow-sm">
            <h3 className="mb-4 flex items-center font-bold text-gray-900 text-lg">
              <span className="mr-3 rounded-full bg-primary-50 p-2 text-xl">🩺</span>
              Advanced Monitoring & Diagnostics
            </h3>
            <p className="text-gray-700 mb-4 text-sm">Once diagnosed, pregnancies complicated by oligohydramnios require intensive fetal surveillance to prevent stillbirth or severe morbidity.</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="font-bold text-primary-800 mb-1">Non-Stress Test (NST)</h4>
                <p className="text-xs text-gray-600">Performed 1-2 times per week to monitor fetal heart rate reactivity and detect cord compression.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="font-bold text-primary-800 mb-1">Biophysical Profile (BPP)</h4>
                <p className="text-xs text-gray-600">Combines an NST with an ultrasound to score fetal breathing, tone, movement, and amniotic fluid volume.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="font-bold text-primary-800 mb-1">Umbilical Artery Doppler</h4>
                <p className="text-xs text-gray-600">Assesses placental blood flow resistance to identify placental insufficiency and IUGR.</p>
              </div>
            </div>
          </div>

          {/* Management Strategies */}
          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900">
              <span className="mr-3 rounded-full bg-gray-100 p-2 text-xl">🛡️</span>
              Clinical Management Strategies
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="font-bold text-gray-900 text-lg mb-3 pb-2 border-b border-gray-200/50">Conservative</div>
                <ul className="list-disc pl-4 space-y-2 text-xs text-gray-700">
                  <li><strong>Maternal Hydration:</strong> Oral or IV hydration can temporarily increase fluid volume in borderline cases.</li>
                  <li><strong>Bed Rest:</strong> Recommended in some cases to improve uteroplacental perfusion.</li>
                  <li><strong>Strict Surveillance:</strong> Twice-weekly NSTs and AFIs.</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="font-bold text-gray-900 text-lg mb-3 pb-2 border-b border-gray-200/50">Interventional</div>
                <ul className="list-disc pl-4 space-y-2 text-xs text-gray-700">
                  <li><strong>Amnioinfusion:</strong> Infusion of sterile saline into the uterine cavity during labor to resolve repetitive cord compressions.</li>
                  <li><strong>Corticosteroids:</strong> Administered if premature delivery (before 34 weeks) is anticipated to accelerate fetal lung maturity.</li>
                </ul>
              </div>
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-5 shadow-sm">
                <div className="font-bold text-gray-900 text-lg mb-3 pb-2 border-b border-gray-200/50">Delivery Timing</div>
                <ul className="list-disc pl-4 space-y-2 text-xs text-gray-700">
                  <li><strong>Isolated Oligo:</strong> Induction of labor is generally recommended between 36 to 37 weeks.</li>
                  <li><strong>With Complications:</strong> Immediate delivery (often via C-section) if non-reassuring fetal status or severe IUGR is present.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      category: 'clinical',
      date: '2024-01-10',
    }
  ];

  const filteredArticles = activeFilter === 'all'
    ? allArticles
    : allArticles.filter(article => article.category === activeFilter);

  // Lock body scroll when an article is open
  useEffect(() => {
    if (selectedArticleId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedArticleId]);

  const activeArticle = allArticles.find(a => a.id === selectedArticleId);

  return (
    <section className="min-h-screen bg-champagne-50 px-6 py-24">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
          <h4 className="text-sm font-bold tracking-[0.2em] text-primary-600 mb-6 uppercase">
            R&D & Innovation
          </h4>
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-serif font-medium text-primary-950 leading-[1.05] mb-8">
            We seek out, and solve, tough challenges.
          </h1>
          <p className="text-xl font-sans text-primary-900/80 leading-relaxed mb-10">
            Discover the latest medical research and clinical insights.
          </p>

          {/* Filter Navigation */}
          <div className="flex flex-wrap justify-center gap-3">
            {['all', 'research', 'education', 'clinical'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full capitalize font-medium transition-all duration-300 ${activeFilter === filter
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                  }`}
              >
                {filter === 'all' ? 'All Articles' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES GRID */}
        <div className="flex flex-col gap-16 lg:gap-24 mt-12">
          
          {/* All Articles rendered identically in horizontal layout */}
          {filteredArticles.map((article, index) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              {/* Image Side */}
              <div className={`relative aspect-[4/3] lg:aspect-auto lg:h-[600px] w-full overflow-hidden bg-champagne-50 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              
              {/* Content Side */}
              <div className={`flex flex-col justify-center py-6 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <span className="text-xs font-bold tracking-[0.2em] text-primary-600 mb-6 uppercase font-sans">
                  {article.category}
                </span>
                <h3 className="font-serif font-medium text-primary-950 text-4xl lg:text-5xl mb-6 leading-[1.1] transition-colors group-hover:text-gold-600">
                  {article.title}
                </h3>
                <p className="text-primary-900/70 mb-10 font-sans leading-relaxed text-lg lg:text-xl max-w-xl">
                  {article.description}
                </p>
                <div className="text-xs font-bold tracking-[0.2em] uppercase text-primary-950 flex items-center transition-colors group-hover:text-gold-600">
                  Read Full Study
                  <svg className="w-5 h-5 ml-4 transform transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 PURE GPU-ACCELERATED MODAL OVERLAY 🌟 */}
      <AnimatePresence>
        {selectedArticleId && activeArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 pointer-events-auto">

            {/* Smooth Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedArticleId(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md cursor-pointer"
            />

            {/* Scale & Fade Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedArticleId(null)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/80"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="overflow-y-auto w-full hide-scrollbar">
                {/* Expanded Image */}
                <div className="relative h-64 sm:h-80 w-full flex-shrink-0">
                  <img src={activeArticle.image} alt={activeArticle.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block mb-3 px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                      {activeArticle.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-white leading-tight">
                      {activeArticle.title}
                    </h2>
                  </div>
                </div>

                {/* Expanded Content */}
                <div className="p-6 sm:p-10">
                  {activeArticle.fullContent}

                  {/* Link Box */}
                  {activeArticle.link && (
                    <div className="mt-12 mb-4 flex justify-center">
                      <a
                        href={activeArticle.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-3 bg-primary-50 border-2 border-primary-500 text-primary-700 font-bold rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        To know more
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ResearchHighlights;