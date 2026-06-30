import { motion, useReducedMotion } from 'framer-motion';
import { ease, fadeDown } from '../motion/presets';
import BookLink from './BookLink';
import { SITE } from '../siteConfig';

export default function SiteHeader() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <header className="site-header" id="siteHeader">
        <HeaderInner />
      </header>
    );
  }

  return (
    <motion.header
      className="site-header"
      id="siteHeader"
      initial="hidden"
      animate="visible"
      variants={fadeDown}
    >
      <HeaderInner />
    </motion.header>
  );
}

function HeaderInner() {
  return (
    <div className="container nav-wrap">
      <a href="#top" className="brand">
        <span className="brand-mark">HL</span>
        <span className="brand-text">
          Hajime Lente <small>Skin Studio</small>
        </span>
      </a>
      <nav className="nav-links" id="navLinks">
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#expect">What to Expect</a>
        <a href="#tips">Skincare Tips</a>
        <a href="#contact">Contact</a>
        <BookLink className="btn btn-primary nav-cta">
          Book Now
        </BookLink>
      </nav>
      <button className="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}

export function SiteFooter({ year }) {
  const reduceMotion = useReducedMotion();

  const footerCols = [
    {
      title: 'Studio',
      links: [
        { href: '#about', label: 'About' },
        { href: '#services', label: 'Services' },
        { href: '#expect', label: 'What to Expect' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { href: `mailto:${SITE.email}`, label: SITE.email },
        { href: `tel:${SITE.phoneTel}`, label: SITE.phoneDisplay },
        { href: '#book', label: 'Book Online' },
      ],
    },
    {
      title: 'Policies',
      links: [
        { href: '#policies', label: 'Booking & Deposits' },
        { href: '#policies', label: 'Cancellations' },
        { href: '#contact', label: 'Contact' },
      ],
    },
  ];

  if (reduceMotion) {
    return (
      <footer className="site-footer">
        <FooterInner year={year} footerCols={footerCols} />
      </footer>
    );
  }

  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease }}
    >
      <FooterInner year={year} footerCols={footerCols} />
    </motion.footer>
  );
}

function FooterInner({ year, footerCols }) {
  return (
    <>
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand-mark">HL</span>
          <p>
            <strong>Hajime Lente</strong>
            <br />
            Skin Studio · Fort Lauderdale, FL
          </p>
        </div>
        {footerCols.map((col) => (
          <div key={col.title} className="footer-col">
            <h5>{col.title}</h5>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <p>© {year} Hajime Lente Skin Studio. All rights reserved.</p>
        <p>Made with care in Fort Lauderdale.</p>
      </div>
    </>
  );
}
