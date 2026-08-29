
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Copy rewritten 2026-08-29.
 *
 * The H1 read "About Hiram Barsky - UX/UI Designer & AI Developer" and the
 * subhead "Product Designer & Gen AI Developer focused on building AI-powered
 * digital experiences" — gpt-engineer-app[bot] copy that contradicted this
 * page's own title tag ("About Hiram Barsky — Designer and Developer") and the
 * settled positioning. The story paragraphs were AI-hype with no specifics in
 * them. Every claim below traces to something checkable: the employers are the
 * career history, the five products are live and each has a case study here.
 */
const PersonalStory: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-display">
          About Hiram Barsky — Designer and Developer
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          I design and develop SaaS, web apps, mobile apps and internal tools — one
          person, from product design through React front end, database and launch.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">My Story</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            Fifteen-plus years of product design, most of it inside regulated
            industries — banking at PNC and Bank of America, consulting at Deloitte,
            KPMG and Tata Consultancy Services, and pharmacy benefits before that.
            That work runs on review cycles: a design is not finished when it looks
            right, it is finished when it has cleared the people who have to sign off
            on it. It is a useful thing to have learned early.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            These days I do both halves myself. I design the product and I build it —
            React and TypeScript on the front end, the database behind it, and the
            deploy — which means the thing that ships is the thing that was designed,
            without a handoff in the middle where the detail goes missing.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Five products of my own are live, each designed and built solo:{' '}
            <Link to="/project/herbalink" className="text-blue-600 hover:underline">HerbaLink</Link>,{' '}
            <Link to="/project/catchbuddy" className="text-blue-600 hover:underline">CatchBuddy</Link>,{' '}
            <Link to="/project/stips" className="text-blue-600 hover:underline">Stips</Link>,{' '}
            <Link to="/project/ring-rival" className="text-blue-600 hover:underline">Ring-Rival</Link>{' '}
            and <Link to="/project/fire-lion" className="text-blue-600 hover:underline">Fire Lion</Link>.
            Each one has a case study here with the decisions written down — including
            the ones that turned out to be wrong.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default PersonalStory;
