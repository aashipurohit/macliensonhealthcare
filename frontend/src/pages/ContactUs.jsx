import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  MessageSquare,
  Building2,
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

// ── Component ─────────────────────────────────────────────────────────────────
const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Maclienson Healthcare</title>
        <meta
          name="description"
          content="Get in touch with Maclienson Healthcare for verified communication, product queries, and official inquiries. All queries are responded to by authorised personnel."
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
          <span className="mh-eyebrow mb-4 block">Reach Out</span>
          <h1 className="font-serif text-5xl font-bold text-primary-950 md:text-6xl">
            Contact Us
          </h1>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-400" />
          <p className="mt-6 text-lg text-primary-900/70 max-w-xl mx-auto">
            For verified communication and official queries, connect with our corporate
            desk. Every message is reviewed and responded to by authorised personnel.
          </p>
        </motion.div>
      </section>

      {/* ── Company Identity Banner ── */}
      <section className="bg-white py-8 px-4 border-b border-gold-200">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center gap-3 mb-2">
            <Building2 className="h-6 w-6 text-primary-800" />
            <h2 className="font-serif text-2xl font-semibold text-primary-950">
              Maclienson Healthcare Pvt. Ltd.
            </h2>
          </div>
          <p className="mh-body-muted">
            A Division of Maclienson Life Sciences Inc. &nbsp;·&nbsp; Committed to Quality &amp; Ethics
          </p>
        </motion.div>
      </section>

      {/* ── Main Content ── */}
      <section className="bg-champagne-50 py-20 px-4">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-10 lg:grid-cols-5 items-stretch">

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="rounded-2xl border border-primary-100 bg-white p-8 shadow-regal md:p-10 h-full flex flex-col">
              <h2 className="font-serif text-2xl font-semibold text-primary-950 mb-1">
                Send an Official Inquiry
              </h2>
              <p className="mh-body-muted mb-8">
                All submissions are reviewed by our corporate team.
              </p>

              {submitted ? (
                <div className="rounded-xl border border-gold-200 bg-champagne-100 p-8 text-center">
                  <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-primary-800" />
                  <p className="font-serif text-xl font-semibold text-primary-950 mb-2">
                    Message Received
                  </p>
                  <p className="mh-body-muted">
                    Thank you for contacting us. Our team will respond to your inquiry shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-primary-900">
                        Full Name <span className="text-primary-700">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full rounded-lg border border-primary-200 bg-champagne-50 px-4 py-3 text-sm text-primary-950 placeholder:text-primary-900/40 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700/20 transition"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-primary-900">
                        Email Address <span className="text-primary-700">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full rounded-lg border border-primary-200 bg-champagne-50 px-4 py-3 text-sm text-primary-950 placeholder:text-primary-900/40 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700/20 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-primary-900">
                      Message <span className="text-primary-700">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your inquiry in detail..."
                      className="w-full rounded-lg border border-primary-200 bg-champagne-50 px-4 py-3 text-sm text-primary-950 placeholder:text-primary-900/40 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700/20 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-full bg-primary-800 px-8 py-3 text-sm font-semibold text-champagne-50 shadow-regal transition hover:bg-primary-900 active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                    Submit Inquiry
                  </button>

                  {/* Legal note */}
                  <div className="mt-4 rounded-lg bg-champagne-50 border border-gold-200 p-4">
                    <p className="flex items-start gap-2 text-xs text-primary-900/60 leading-relaxed">
                      <ShieldCheck className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary-700" />
                      By contacting us, you acknowledge that the information shared will be
                      reviewed in accordance with our corporate policies and applicable Indian
                      regulations.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <div className="rounded-2xl border-l-4 border-gold-400 bg-white p-8 shadow-regal h-full">
              <h2 className="font-serif text-2xl font-semibold text-primary-950 mb-8">
                Corporate Communication
              </h2>

              {/* Corporate Office — India */}
              <div className="mb-7">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary-950">
                    Corporate Office
                  </h3>
                </div>
                <p className="pl-[52px] text-sm leading-relaxed text-primary-900/80">
                  Maclienson Healthcare Pvt. Ltd.<br />
                  Pharmaceutical Complex, Rau Circle<br />
                  Indore – 453331, Madhya Pradesh
                </p>
              </div>

              <div className="mb-7 h-px w-full bg-gold-200" />

              {/* Registered Office — USA */}
              <div className="mb-7">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary-950">
                    Registered Office
                  </h3>
                </div>
                <p className="pl-[52px] text-sm leading-relaxed text-primary-900/80">
                  A Division of Maclienson Life Sciences Inc.<br />
                  30N Gould Street, Sheridan,<br />
                  Wyoming – 82801, USA
                </p>
              </div>

              <div className="mb-7 h-px w-full bg-gold-200" />

              {/* Official Email */}
              <div className="mb-7">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary-950">
                    Official Email
                  </h3>
                </div>
                <a
                  href="mailto:info@maclienson.com"
                  className="pl-[52px] block text-sm font-semibold text-primary-800 hover:text-gold-400 transition break-all"
                >
                  info@maclienson.com
                </a>
                <p className="pl-[52px] mt-1 text-xs text-primary-900/50">
                  Verified corporate communication channel.
                </p>
              </div>

              <div className="mb-7 h-px w-full bg-gold-200" />

              {/* Phone */}
              <div className="mb-7">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                    <Phone className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary-950">
                    Phone / WhatsApp
                  </h3>
                </div>
                <a
                  href="tel:+918770751559"
                  className="pl-[52px] block text-sm font-semibold text-primary-800 hover:text-gold-400 transition"
                >
                  +91 8770751559
                </a>
              </div>

              <div className="mb-7 h-px w-full bg-gold-200" />

              {/* Response Protocol */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary-950">
                    Response Protocol
                  </h3>
                </div>
                <p className="pl-[52px] text-sm text-primary-900/70 leading-relaxed">
                  Each query is assigned to an authorised support officer. Response time
                  may vary depending on verification requirements.
                </p>
              </div>
            </div>
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
            Prefer to Email Directly?
          </h2>
          <p className="mt-4 text-champagne-100/80 text-base max-w-lg mx-auto">
            Reach our corporate desk for product inquiries, partnership proposals or
            any official communication.
          </p>
          <a
            href="mailto:info@maclienson.com"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-3 text-sm font-semibold text-primary-950 shadow-regal transition hover:bg-gold-200 active:scale-95"
          >
            <Mail className="h-4 w-4" />
            info@maclienson.com
          </a>
        </motion.div>
      </section>
    </>
  );
};

export default ContactUs;
