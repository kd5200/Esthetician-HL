import { useEffect } from 'react';
import HeroBanner from './components/HeroBanner';
import MotionReveal from './components/MotionReveal';
import MotionSectionHead from './components/MotionSectionHead';
import MotionStagger, { MotionCard, MotionLine } from './components/MotionStagger';
import SiteHeader, { SiteFooter } from './components/SiteChrome';

const SERVICES = [
  {
    img: '/images/service-signature.svg',
    alt: 'Signature Glow Facial',
    num: '01',
    title: 'Signature Glow Facial',
    desc: 'My most comprehensive, results-driven facial. Cleanse, exfoliate, extract, mask, and massage to hydrate, brighten, smooth, and restore balance.',
    meta: '60 min · $95',
  },
  {
    img: '/images/service-age.svg',
    alt: 'Age Defense Facial',
    num: '02',
    title: 'Age Defense Facial',
    desc: 'Designed for fine lines, wrinkles, and loss of firmness. Targeted peptides and lifting massage to visibly smooth and renew.',
    meta: '75 min · $120',
  },
  {
    img: '/images/service-acne.svg',
    alt: 'Clarifying Acne Facial',
    num: '03',
    title: 'Clarifying Acne Facial',
    desc: 'For stubborn blackheads, whiteheads, cystic acne, pustules, and breakouts. Deep cleanse, extractions, and calming finish.',
    meta: '75 min · $110',
  },
  {
    img: '/images/service-hydration.svg',
    alt: 'Ultra-Hydration Facial',
    num: '04',
    title: 'Ultra-Hydration Facial',
    desc: 'For dry, sensitive, eczema- or psoriasis-prone skin. Layered hydration, soothing botanicals, and a moisture-locking mask.',
    meta: '60 min · $95',
  },
  {
    img: '/images/service-back.svg',
    alt: 'Back Facial',
    num: '05',
    title: 'Back Facial',
    desc: "Treat the skin you can't see. Deep cleanse, exfoliate, and extract for a smoother, clearer back — perfect before a getaway.",
    meta: '45 min · $85',
  },
  {
    img: '/images/service-brow.svg',
    alt: 'Brow Shape and Wax',
    num: '06',
    title: 'Brow Shape & Wax',
    desc: 'Custom brow mapping and gentle waxing to frame your face. Add a lash & brow tint to complete the look.',
    meta: '30 min · $35+',
  },
];

const STEPS = [
  {
    num: '1',
    title: 'Consult',
    desc: 'We start with a complimentary 20-minute virtual consultation to understand your skin, your history, and your goals.',
  },
  {
    num: '2',
    title: 'Analyze',
    desc: 'At your appointment, I perform a thorough skin analysis under proper lighting to map exactly what your skin needs today.',
  },
  {
    num: '3',
    title: 'Treat',
    desc: "You'll relax through a fully customized facial — every step tailored to your skin type, sensitivities, and goals.",
  },
  {
    num: '4',
    title: 'Glow',
    desc: 'Leave with visibly healthier skin and a personalized at-home routine so the glow keeps going long after you leave.',
  },
];

const TIPS = [
  {
    img: '/images/tip-routine.svg',
    alt: 'Daily skincare routine',
    tag: 'Routine',
    title: 'The only 4 steps your AM routine truly needs',
    desc: "Cleanser, antioxidant serum, moisturizer, SPF — here's how to choose each one for your skin type.",
  },
  {
    img: '/images/tip-acne.svg',
    alt: 'Recurring acne tips',
    tag: 'Acne',
    title: 'Why your acne keeps coming back',
    desc: "It's usually one of three things: barrier damage, over-exfoliation, or the wrong actives at the wrong time.",
  },
  {
    img: '/images/tip-hydration.svg',
    alt: 'Hydration vs dryness',
    tag: 'Hydration',
    title: "Dehydrated vs. dry skin — what's the difference?",
    desc: "One is a skin type, the other is a condition. Treating them the same is why nothing's working.",
  },
];

function useSiteChrome() {
  useEffect(() => {
    const header = document.getElementById('siteHeader');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    const onScroll = () => {
      header?.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const onToggle = () => {
      const open = links?.classList.toggle('open');
      toggle?.classList.toggle('open', open);
      toggle?.setAttribute('aria-expanded', String(open));
    };
    toggle?.addEventListener('click', onToggle);

    links?.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle?.classList.remove('open');
      });
    });

    const onSubmit = (e) => {
      e.preventDefault();
      if (!form || !status) return;

      status.className = 'form-status';
      status.textContent = '';

      const name = form.querySelector('#name')?.value.trim();
      const email = form.querySelector('#email')?.value.trim();
      const message = form.querySelector('#message')?.value.trim();

      if (!name || !email || !message) {
        status.classList.add('error');
        status.textContent = 'Please fill in your name, email, and message.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.classList.add('error');
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      status.classList.add('success');
      status.textContent =
        'Thank you! Hajime will be in touch within 24–48 hours.';
      form.reset();
    };
    form?.addEventListener('submit', onSubmit);

    return () => {
      window.removeEventListener('scroll', onScroll);
      toggle?.removeEventListener('click', onToggle);
      form?.removeEventListener('submit', onSubmit);
    };
  }, []);
}

export default function App() {
  useSiteChrome();
  const year = new Date().getFullYear();

  return (
    <>
      <SiteHeader />

      <HeroBanner />

      <section className="welcome" id="about">
        <div className="container welcome-grid">
          <MotionReveal className="welcome-img" variant="left">
            <div className="img-frame">
              <img
                src="/images/about.svg"
                alt="Inside the Hajime Lente Skin Studio"
                loading="lazy"
              />
            </div>
            <div className="img-accent" />
          </MotionReveal>

          <MotionStagger className="welcome-copy" stagger={0.12} delayChildren={0.08}>
            <MotionLine as="p" className="eyebrow">
              Welcome to the Studio
            </MotionLine>
            <MotionLine as="h2">Building confidence, one glow at a time.</MotionLine>
            <MotionLine as="p">
              I&apos;m <strong>Hajime</strong> — a licensed esthetician trained at
              Aveda Clinic, where I performed customized facials, back facials,
              waxing, and brow services on a wide range of clients. I&apos;m
              passionate about helping people stop wasting money on the wrong
              products and start seeing real, lasting results.
            </MotionLine>
            <MotionLine as="p">
              Every appointment begins with a thorough skin analysis and
              consultation. From there, we build a treatment and at-home routine
              tailored to your skin type, lifestyle, and the goals that matter
              most to you.
            </MotionLine>
            <MotionLine>
              <a href="#contact" className="btn btn-outline">
                Meet Hajime →
              </a>
            </MotionLine>
          </MotionStagger>
        </div>
      </section>

      <section className="services" id="services">
        <div className="container">
          <MotionSectionHead
            eyebrow="Let's Get Your Glow On"
            title="Facial Services & Treatments"
            subtitle="At Hajime Lente Skin Studio, you're booking more than just a facial. We'll achieve your skin goals — and I want the experience to feel like a true escape. You'll leave pampered, refreshed, and glowing."
          />

          <MotionStagger className="service-grid" stagger={0.09} delayChildren={0.12}>
            {SERVICES.map((service) => (
              <MotionCard key={service.title} className="service-card">
                <div className="card-media">
                  <img src={service.img} alt={service.alt} loading="lazy" />
                </div>
                <div className="card-body">
                  <div className="service-num">{service.num}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <span className="service-meta">{service.meta}</span>
                </div>
              </MotionCard>
            ))}
          </MotionStagger>

          <MotionReveal className="services-cta" delay={0.2} variant="scale">
            <a href="#book" className="btn btn-primary">
              Book Your Appointment
            </a>
          </MotionReveal>
        </div>
      </section>

      <section className="expect" id="expect">
        <div className="container">
          <MotionSectionHead
            eyebrow="The Experience"
            title="What to Expect"
          />

          <MotionStagger className="expect-grid" stagger={0.1} delayChildren={0.08}>
            {STEPS.map((step) => (
              <MotionLine key={step.title} className="expect-step">
                <span className="step-num">{step.num}</span>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </MotionLine>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="quote">
        <div className="container">
          <MotionReveal variant="scale">
            <blockquote>
              <p>
                &ldquo;I wanted to help anyone who feels like it&apos;s
                impossible to be comfortable in their own skin. Confidence starts
                with how you feel when you look in the mirror.&rdquo;
              </p>
              <cite>— Hajime</cite>
            </blockquote>
          </MotionReveal>
        </div>
      </section>

      <section className="tips" id="tips">
        <div className="container">
          <MotionSectionHead
            eyebrow="From the Studio"
            title="Skincare Tips"
            subtitle="Quick reads from Hajime on building a routine that actually works for your skin."
          />

          <MotionStagger className="tips-grid" stagger={0.12} delayChildren={0.1}>
            {TIPS.map((tip) => (
              <MotionCard key={tip.title} className="tip-card">
                <div className="card-media">
                  <img src={tip.img} alt={tip.alt} loading="lazy" />
                </div>
                <div className="card-body">
                  <span className="tip-tag">{tip.tag}</span>
                  <h4>{tip.title}</h4>
                  <p>{tip.desc}</p>
                  <a href="#contact" className="read-more">
                    Read more →
                  </a>
                </div>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container contact-grid" id="book">
          <MotionStagger className="contact-info" stagger={0.1} delayChildren={0.06}>
            <MotionLine as="p" className="eyebrow">
              Have a question?
            </MotionLine>
            <MotionLine as="h2">Let&apos;s start your skin journey.</MotionLine>
            <MotionLine as="p">
              Hey beautiful! I&apos;m so excited to start this journey with you.
              I offer a complimentary 20-minute virtual consultation so we can
              get to know each other and create your personalized plan.
              Let&apos;s do this together.
            </MotionLine>
            <MotionLine as="ul" className="contact-list">
              <li>
                <strong>Email</strong>
                <a href="mailto:Hajimel@icloud.com">Hajimel@icloud.com</a>
              </li>
              <li>
                <strong>Phone</strong>
                <a href="tel:+13373782049">(337) 378-2049</a>
              </li>
              <li>
                <strong>Location</strong>
                <span>Fort Lauderdale, FL 33308</span>
              </li>
              <li>
                <strong>Hours</strong>
                <span>By appointment · Tue – Sat</span>
              </li>
            </MotionLine>
            <MotionLine as="p" className="contact-note">
              I&apos;m a one-woman studio, so please be patient — I&apos;ll get
              back to you within 24–48 hours.
            </MotionLine>
          </MotionStagger>

          <MotionReveal variant="right" delay={0.1}>
            <form className="contact-form" id="contactForm" noValidate>
              <MotionStagger stagger={0.07} delayChildren={0.15}>
                <MotionLine as="h3">Send a message</MotionLine>
                <MotionLine className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required />
                </MotionLine>
                <MotionLine className="field-row">
                  <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required />
                  </div>
                </MotionLine>
                <MotionLine className="field">
                  <label htmlFor="hear">How did you hear about Hajime Lente?</label>
                  <input id="hear" name="hear" type="text" />
                </MotionLine>
                <MotionLine className="field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} required />
                </MotionLine>
                <MotionLine>
                  <button type="submit" className="btn btn-primary btn-block">
                    Send
                  </button>
                </MotionLine>
                <MotionLine>
                  <p className="form-status" id="formStatus" role="status" />
                </MotionLine>
              </MotionStagger>
            </form>
          </MotionReveal>
        </div>
      </section>

      <SiteFooter year={year} />
    </>
  );
}
