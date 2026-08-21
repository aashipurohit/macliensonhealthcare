import { motion } from 'framer-motion';
import {
  Microscope,
  HeartPulse,
  FileText,
  ExternalLink,
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

// ── Product Quality Assurance documents ───────────────────────────────────────
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
        <title>Certifications &amp; Quality Standards | Maclienson Healthcare</title>
        <meta
          name="description"
          content="Every Maclienson Healthcare product is manufactured in WHO-GMP certified facilities. View our official product quality assurance documents."
        />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative bg-champagne-50 pt-36 pb-20 px-4 overflow-hidden">
        {/* Warm decorative blobs */}
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
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-400" />
          <p className="mt-6 text-lg text-primary-900/70 max-w-xl mx-auto">
            Committed to the highest global standards of quality, safety, and scientific rigour.
          </p>
        </motion.div>
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
            <p className="text-primary-900/80 leading-relaxed text-base md:text-lg">
              At Maclienson Healthcare, quality isn't just a certification — it is the cornerstone
              of our culture. Moving beyond basic compliance, every product we deliver is
              manufactured in WHO-GMP certified facilities to consistently exceed international
              standards.
            </p>
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
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-800 transition hover:bg-primary-100"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Full PDF
                    </a>
                  </div>
                </div>
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
