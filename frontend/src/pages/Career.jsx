import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  GraduationCap,
  FlaskConical,
  Users,
  ShieldCheck,
  PhoneCall,
  Mail,
  ChevronRight,
  TrendingUp,
  HeartHandshake,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// ── Animation helpers ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

// ── Constants ─────────────────────────────────────────────────────────────────
const HR_EMAIL = 'manish.kalpiwar@macliensonhealthcare.com';
const HR_PHONE = '8770751559';

// ── Data ──────────────────────────────────────────────────────────────────────

// Active job openings
const activeOpenings = [
  {
    title: 'Medical Representative (MR)',
    division: 'Gynaecology Division',
    location: 'Indore, Madhya Pradesh',
    qualification: 'Science Graduate (B.Sc., B.Pharm, or equivalent)',
    experience: 'Minimum 1 year in the same segment',
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'Area Sales Manager (ASM)',
    division: 'Gynaecology Division',
    location: 'Indore, Madhya Pradesh',
    qualification: 'Science Graduate (B.Sc., B.Pharm, or equivalent)',
    experience: 'Minimum 3 years as Medical Representative OR 1 year as Area Manager',
    icon: <TrendingUp className="h-6 w-6" />,
  },
];

// Example role profiles (not active openings)
const sampleRoles = [
  {
    title: 'Research Scientist',
    type: 'Full-time',
    location: 'India',
    experience: '3+ years',
    icon: <FlaskConical className="h-6 w-6" />,
    summary:
      'Work on formulation, method development and translational research with strong GxP awareness.',
  },
  {
    title: 'Regulatory Affairs Specialist',
    type: 'Full-time',
    location: 'India',
    experience: '5+ years',
    icon: <ShieldCheck className="h-6 w-6" />,
    summary:
      'Prepare regulatory submissions and ensure compliance with CDSCO and international standards.',
  },
  {
    title: 'Medical Sales Representative',
    type: 'Field role',
    location: 'Multiple locations',
    experience: '1+ years',
    icon: <Users className="h-6 w-6" />,
    summary:
      'Engage with medical professionals, support product adoption and relay post-market feedback.',
  },
  {
    title: 'Regulatory Quality Analyst',
    type: 'Full-time',
    location: 'India',
    experience: '2+ years',
    icon: <ShieldCheck className="h-6 w-6" />,
    summary:
      'Maintain compliance documentation, coordinate audits and support regulatory submissions.',
  },
];

// Benefits — only what is actually offered
const benefits = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Healthcare Coverage',
    description: 'Comprehensive medical insurance for employees and their dependents.',
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Learning & Development',
    description: 'Annual stipend for professional courses, certifications and industry conferences.',
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Wellness Programs',
    description: 'Mental health support, wellness initiatives and periodic employee health camps.',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Career() {
  return (
    <>
      <Helmet>
        <title>Careers at Maclienson Healthcare | Join Our Team</title>
        <meta
          name="description"
          content="Build a purpose-driven career at Maclienson Healthcare. We are hiring for our Gynaecology Division. Apply via email or call our HR team."
        />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative bg-champagne-50 pt-36 pb-20 px-4 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-100 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gold-100 opacity-50 blur-2xl" />

        <motion.div
          className="relative mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="mh-eyebrow mb-4 block">Join Our Team</span>
          <h1 className="font-serif text-5xl font-bold text-primary-950 md:text-6xl">
            Career at Maclienson Healthcare
          </h1>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-400" />
          <p className="mt-6 text-lg text-primary-900/70 max-w-xl mx-auto">
            Build a purpose-driven career in an ethics-first pharmaceutical organisation
            committed to quality and patient outcomes.
          </p>
        </motion.div>
      </section>

      {/* ── Active Openings ── */}
      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="mh-eyebrow mb-2 block">Current Openings</span>
            <h2 className="font-serif text-3xl font-semibold text-primary-950">
              We Are Hiring — Gynaecology Division
            </h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gold-400" />
            <p className="mt-4 max-w-xl mx-auto mh-body-muted">
              Maclienson Healthcare Pvt. Ltd. is inviting experienced and dynamic professionals
              to join our expanding Gynaecology Division in Indore, Madhya Pradesh.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {activeOpenings.map((role, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mh-card border border-primary-100 p-6 flex flex-col"
              >
                {/* Icon + Title */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-primary-950">
                      {role.title}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                      {role.division}
                    </span>
                  </div>
                </div>

                <div className="mb-4 h-px w-full bg-gold-200" />

                {/* Details */}
                <ul className="space-y-2 text-sm text-primary-900/80">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary-700" />
                    <span><strong>Location:</strong> {role.location}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary-700" />
                    <span><strong>Qualification:</strong> {role.qualification}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary-700" />
                    <span><strong>Experience:</strong> {role.experience}</span>
                  </li>
                </ul>

                <p className="mt-4 text-xs text-primary-800/60 font-semibold">
                  Compensation: Negotiable &amp; competitive as per profile
                </p>

                {/* Apply */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${HR_EMAIL}`}
                    className="flex items-center gap-2 rounded-full bg-primary-800 px-5 py-2 text-xs font-semibold text-champagne-50 shadow-regal transition hover:bg-primary-900 active:scale-95"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Apply via Email
                  </a>
                  <a
                    href={`tel:${HR_PHONE}`}
                    className="flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-5 py-2 text-xs font-semibold text-primary-800 transition hover:bg-primary-100"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    Call / WhatsApp: {HR_PHONE}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Join ── */}
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
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-primary-950 md:text-3xl">
                Why Join Our Team
              </h2>
            </div>

            <p className="mb-6 text-primary-900/80 leading-relaxed text-base md:text-lg">
              Maclienson Healthcare is focused on quality, compliance and patient-centred
              innovation. We value integrity, continuous learning and measurable impact.
            </p>

            <ul className="space-y-3">
              {[
                'Work that directly supports patient health outcomes.',
                'Transparent, ethics-driven processes and governance.',
                'Opportunities for professional and cross-functional growth.',
                'A culture where scientific rigour meets real-world impact.',
              ].map((item, i) => (
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

      {/* ── CTA ── */}
      <section className="bg-primary-800 py-16 px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="font-serif text-3xl font-bold text-champagne-50 md:text-4xl">
            Interested in Joining Us?
          </h2>
          <p className="mt-4 text-champagne-100/80 text-base max-w-lg mx-auto">
            Email your CV with your full name, highest qualification, relevant experience
            and preferred location. Shortlisted candidates will be contacted directly.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${HR_EMAIL}`}
              className="flex items-center gap-2 rounded-full bg-gold-400 px-8 py-3 text-sm font-semibold text-primary-950 shadow-regal transition hover:bg-gold-200 active:scale-95"
            >
              <Mail className="h-4 w-4" />
              {HR_EMAIL}
            </a>
            <a
              href={`tel:${HR_PHONE}`}
              className="flex items-center gap-2 rounded-full border border-champagne-50/40 px-8 py-3 text-sm font-semibold text-champagne-50 transition hover:border-champagne-50 hover:bg-champagne-50/10"
            >
              <PhoneCall className="h-4 w-4" />
              Call / WhatsApp: {HR_PHONE}
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Compliance Note ── */}
      <section className="bg-champagne-50 py-10 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-primary-900/60 leading-relaxed">
            <strong className="text-primary-800">Recruitment &amp; Compliance:</strong>{' '}
            Maclienson Healthcare follows standard background verification and qualification
            checks. We do not charge any recruitment fee. For concerns, contact{' '}
            <a
              href={`mailto:${HR_EMAIL}`}
              className="text-primary-800 underline underline-offset-2 hover:text-gold-400 transition"
            >
              {HR_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
