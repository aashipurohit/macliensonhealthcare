import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Globe,
  FlaskConical,
  Stethoscope,
  BadgeCheck,
  Microscope,
  HeartPulse,
  FileText,
  ExternalLink,
  ChevronRight,
  Download,
  Award,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// ── Animation helpers ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const certifications = [
  {
    title: 'WHO-GMP Certified',
    description:
      'Our manufacturing facilities meet World Health Organization Good Manufacturing Practice standards across all production units.',
    icon: <Globe className="h-7 w-7" />,
    year: '2023',
    scope: 'All manufacturing units',
  },
  {
    title: 'ISO 13485:2016',
    description:
      'Quality management system certification for medical devices, ensuring consistent safety and efficacy.',
    icon: <ShieldCheck className="h-7 w-7" />,
    year: '2022',
    scope: 'Medical devices division',
  },
  {
    title: 'US FDA Approved',
    description:
      'Five flagship products have received approval from the United States Food and Drug Administration.',
    icon: <Stethoscope className="h-7 w-7" />,
    year: '2021',
    scope: '5 flagship products',
  },
  {
    title: 'CE Marking',
    description:
      'Certification confirming our European market products meet EU safety, health and environmental requirements.',
    icon: <BadgeCheck className="h-7 w-7" />,
    year: '2022',
    scope: 'European market products',
  },
  {
    title: 'ISO 9001:2015',
    description:
      'Company-wide international standard for quality management systems, demonstrating consistent quality.',
    icon: <Award className="h-7 w-7" />,
    year: '2020',
    scope: 'Company-wide',
  },
  {
    title: 'Good Clinical Practice',
    description:
      'Certification for clinical trials conducted to international ethical and scientific standards.',
    icon: <FlaskConical className="h-7 w-7" />,
    year: '2023',
    scope: 'Clinical research division',
  },
];

const processSteps = [
  { step: '01', title: 'Gap Analysis', description: 'Comprehensive review against certification requirements' },
  { step: '02', title: 'System Implementation', description: 'Developing processes to meet standards' },
  { step: '03', title: 'Internal Audits', description: 'Rigorous self-assessment before official review' },
  { step: '04', title: 'Certification Audit', description: 'Evaluation by accredited certification body' },
  { step: '05', title: 'Continuous Monitoring', description: 'Regular reviews to maintain compliance' },
  { step: '06', title: 'Recertification', description: 'Periodic renewal through comprehensive reassessment' },
];

const qualityCommitments = [
  'Stringent quality control at every production stage',
  'Continuous staff training programs',
  'Regular third-party audits beyond requirements',
  'Investment in cutting-edge testing equipment',
  'Transparent reporting of quality metrics',
];

// Product Quality Assurance documents
const qaDocuments = [
  {
    id: 'f',
    file: '/f.pdf',
    title: 'Quality Assurance Certificate I',
    description: 'Official QA documentation covering batch testing and release protocols.',
    tag: 'QA Certificate',
  },
  {
    id: 'g',
    file: '/g.pdf',
    title: 'Quality Assurance Certificate II',
    description: 'Analytical method validation and stability testing reports.',
    tag: 'Stability Report',
  },
  {
    id: 'h',
    file: '/h.pdf',
    title: 'Quality Assurance Certificate III',
    description: 'Third-party laboratory audit and compliance verification documentation.',
    tag: 'Audit Report',
  },
  {
    id: 'i',
    file: '/i.pdf',
    title: 'Quality Assurance Certificate IV',
    description: 'Product safety and regulatory compliance certificate for all market segments.',
    tag: 'Compliance Cert',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const Certifications = () => {
  return (
    <>
      <Helmet>
        <title>Certifications & Quality Standards | Maclienson Healthcare</title>
        <meta
          name="description"
          content="Explore Maclienson Healthcare's certifications including WHO-GMP, ISO 13485, US FDA approval and CE Marking. View our product quality assurance documents."
        />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative bg-champagne-50 pt-36 pb-20 px-4 overflow-hidden">
        {/* Warm decorative blob */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-100 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gold-100 opacity-50 blur-2xl" />

        <motion.div
          className="relative mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="mh-eyebrow mb-4 block">Our Standards</span>
          <h1 className="font-serif text-5xl font-bold text-primary-950 md:text-6xl">
            Our Certifications
          </h1>
          {/* Gold underline accent */}
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-400" />
          <p className="mt-6 text-lg text-primary-900/70 max-w-xl mx-auto">
            Committed to the highest global standards of quality, safety, and scientific rigour.
          </p>
        </motion.div>
      </section>

      {/* ── Certification Cards ── */}
      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="mh-eyebrow mb-2 block">Global Recognition</span>
            <h2 className="font-serif text-3xl font-semibold text-primary-950">
              Internationally Recognised
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mh-card border border-primary-100 p-6 flex flex-col"
              >
                {/* Icon badge */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                  {cert.icon}
                </div>

                <h3 className="mb-2 font-serif text-xl font-semibold text-primary-950">
                  {cert.title}
                </h3>
                <p className="mh-body-muted mb-5 flex-grow">{cert.description}</p>

                {/* Divider */}
                <div className="mb-4 h-px w-full bg-gold-200" />

                <div className="flex justify-between text-xs font-semibold text-primary-800/70 uppercase tracking-wide">
                  <span>Year: {cert.year}</span>
                  <span>{cert.scope}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality Commitment ── */}
      <section className="bg-champagne-50 py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="rounded-2xl border-l-4 border-gold-400 bg-white p-8 md:p-12 shadow-regal"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                <HeartPulse className="h-6 w-6" />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-primary-950 md:text-3xl">
                Our Quality Commitment
              </h2>
            </div>

            <p className="mb-6 text-primary-900/80 leading-relaxed text-base">
              At Maclienson Healthcare, quality isn't just a certification — it's our culture. We go
              beyond compliance to implement:
            </p>

            <ul className="space-y-3">
              {qualityCommitments.map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-3"
                >
                  <ChevronRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-400" />
                  <span className="text-primary-900/80">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Product Quality Assurance (PDF Section) ── */}
      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="mh-eyebrow mb-2 block">Official Documents</span>
            <h2 className="font-serif text-3xl font-semibold text-primary-950">
              Product Quality Assurance
            </h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gold-400" />
            <p className="mt-4 max-w-xl mx-auto mh-body-muted">
              Access our official quality assurance certificates and laboratory reports for complete
              transparency into our manufacturing standards.
            </p>
          </motion.div>

          {/* Document Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {qaDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mh-card border border-primary-100 overflow-hidden"
              >
                {/* PDF Preview iframe */}
                <div className="relative h-64 w-full bg-primary-50">
                  <iframe
                    src={`${doc.file}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={doc.title}
                    className="h-full w-full border-0"
                    loading="lazy"
                  />
                  {/* Overlay tag badge */}
                  <span className="absolute left-3 top-3 rounded-full bg-primary-800 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-champagne-50">
                    {doc.tag}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className="mb-2 flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold-100 text-primary-800">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-primary-950">
                        {doc.title}
                      </h3>
                      <p className="mh-body-muted mt-1">{doc.description}</p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-800 transition hover:bg-primary-100"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Full PDF
                    </a>
                    <a
                      href={doc.file}
                      download
                      className="flex items-center gap-2 rounded-full bg-primary-800 px-4 py-2 text-xs font-semibold text-champagne-50 shadow-regal transition hover:bg-primary-900 active:scale-95"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certification Process ── */}
      <section className="bg-champagne-50 py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="mh-eyebrow mb-2 block">How We Do It</span>
            <h2 className="font-serif text-3xl font-semibold text-primary-950">
              Our Certification Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-xl bg-white border border-primary-100 p-6 text-center shadow-regal transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step number circle */}
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-800 text-champagne-50 font-bold text-sm tracking-widest">
                  {item.step}
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-primary-950">
                  {item.title}
                </h3>
                <p className="mh-body-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-primary-800 py-16 px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-champagne-50/20">
            <Microscope className="h-7 w-7 text-champagne-50" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-champagne-50 md:text-4xl">
            Need Certification Documentation?
          </h2>
          <p className="mt-4 text-champagne-100/80 text-base max-w-lg mx-auto">
            Our quality assurance team can provide official copies of any certification or
            laboratory report on request.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="rounded-full bg-gold-400 px-8 py-3 text-sm font-semibold text-primary-950 shadow-regal transition hover:bg-gold-200 active:scale-95"
            >
              Request Documents
            </a>
            <a
              href="/about"
              className="rounded-full border border-champagne-50/40 px-8 py-3 text-sm font-semibold text-champagne-50 transition hover:border-champagne-50 hover:bg-champagne-50/10"
            >
              Learn About Our Standards
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Certifications;
