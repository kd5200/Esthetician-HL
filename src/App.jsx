import { useEffect } from "react";
import HeroBanner from "./components/HeroBanner";
import MotionReveal from "./components/MotionReveal";
import MotionSectionHead from "./components/MotionSectionHead";
import MotionStagger, {
  MotionCard,
  MotionLine,
} from "./components/MotionStagger";
import BookLink from "./components/BookLink";
import DepositNotice, { POLICY_SECTIONS } from "./components/BookingPolicy";
import PromoModal from "./components/PromoModal";
import SiteHeader, { SiteFooter } from "./components/SiteChrome";
import { SITE, depositLabel } from "./siteConfig";
import { ASSETS } from "./assets";
import Photo from "./components/Photo";
import StudioCarousel from "./components/StudioCarousel";

const FACIALS = [
  {
    ...ASSETS.services.signature,
    alt: "Customized signature facial",
    num: "01",
    title: "Customized Signature Facial",
    desc: "A tailored treatment built around your skin analysis — cleanse, exfoliate, treat, and restore balance with clinical-grade care.",
    meta: "$60",
  },
  {
    ...ASSETS.services.dermaplaning,
    alt: "Dermaplaning facial",
    num: "02",
    title: "Dermaplaning Facial",
    desc: "Gentle physical exfoliation removes peach fuzz and dull surface cells so products penetrate and skin looks smooth and luminous.",
    meta: "$80",
  },
  {
    ...ASSETS.services.nanoNeedling,
    alt: "Nano-needling facial",
    num: "03",
    title: "Nano-Needling Facial",
    desc: "A no-downtime treatment that boosts product absorption and supports collagen renewal for clearer, healthier-looking skin.",
    meta: "$80",
  },
  {
    ...ASSETS.services.chemicalPeel,
    alt: "Chemical peel",
    num: "04",
    title: "Chemical Peel",
    desc: "Professional-strength exfoliation to improve texture, tone, and clarity. Strength and peel type selected for your skin goals.",
    meta: "$100",
  },
  {
    ...ASSETS.services.backFacial,
    alt: "Back facial",
    num: "05",
    title: "Back Facial",
    desc: "Deep cleanse, exfoliate, and treat the skin you can't see — ideal for breakouts, congestion, or pre-event prep.",
    meta: "Book for pricing",
  },
];

const BROW_LASH_MENU = [
  { name: "Lash Lift + Tint", price: "$50" },
  { name: "Brow Lamination + Tint + Wax", price: "$60" },
];

const WAXING_MENU = [
  { name: "Leg Wax", price: "$40" },
  { name: "Arm Wax", price: "$25" },
  { name: "Underarms", price: "$10" },
  { name: "Brows", price: "$25" },
  { name: "Lip", price: "$5" },
];

const STEPS = [
  {
    num: "1",
    title: "Consult",
    desc: "We review your skin history, lifestyle, and goals so every recommendation is grounded in what your skin actually needs.",
  },
  {
    num: "2",
    title: "Analyze",
    desc: "A thorough skin analysis under proper lighting maps your concerns — from barrier health to texture, tone, and congestion.",
  },
  {
    num: "3",
    title: "Treat",
    desc: "Your facial or service is customized with clinical protocols and professional products — never a one-size-fits-all menu.",
  },
  {
    num: "4",
    title: "Maintain",
    desc: "You leave with a clear at-home plan so the results last. Healthy skin is built through consistent, informed self-care.",
  },
];

const TIPS = [
  {
    img: "/images/tip-routine.svg",
    alt: "Daily skincare routine",
    tag: "Self-Care",
    title: "Why consistent care matters more than trendy products",
    desc: "Healthy skin starts with a simple, steady routine — cleanser, treatment, moisturizer, and daily SPF you will actually use.",
  },
  {
    img: "/images/tip-hydration.svg",
    alt: "Skin barrier health",
    tag: "Skin Health",
    title: "Your barrier is the foundation of every result",
    desc: "When the skin barrier is compromised, even great products underperform. Repair first, then treat.",
  },
  {
    img: "/images/tip-acne.svg",
    alt: "Professional skincare guidance",
    tag: "Clinical Care",
    title: "Professional treatments work best with a plan",
    desc: "Facials and peels deliver lasting change when paired with the right home care — that's where GlyMed and guided routines come in.",
  },
];

function useSiteChrome() {
  useEffect(() => {
    const header = document.getElementById("siteHeader");
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    const onScroll = () => {
      header?.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onToggle = () => {
      const open = links?.classList.toggle("open");
      toggle?.classList.toggle("open", open);
      toggle?.setAttribute("aria-expanded", String(open));
    };
    toggle?.addEventListener("click", onToggle);

    links?.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle?.classList.remove("open");
      });
    });

    const onSubmit = (e) => {
      e.preventDefault();
      if (!form || !status) return;

      status.className = "form-status";
      status.textContent = "";

      const name = form.querySelector("#name")?.value.trim();
      const email = form.querySelector("#email")?.value.trim();
      const message = form.querySelector("#message")?.value.trim();
      const policyAccepted = form.querySelector("#policyAccept")?.checked;

      if (!name || !email || !message) {
        status.classList.add("error");
        status.textContent = "Please fill in your name, email, and message.";
        return;
      }
      if (!policyAccepted) {
        status.classList.add("error");
        status.textContent =
          "Please acknowledge the booking and deposit policy to continue.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.classList.add("error");
        status.textContent = "Please enter a valid email address.";
        return;
      }

      status.classList.add("success");
      status.textContent =
        "Thank you! Hajime will be in touch within 24–48 hours.";
      form.reset();
    };
    form?.addEventListener("submit", onSubmit);

    return () => {
      window.removeEventListener("scroll", onScroll);
      toggle?.removeEventListener("click", onToggle);
      form?.removeEventListener("submit", onSubmit);
    };
  }, []);
}

function ServiceMenu({ title, note, items }) {
  return (
    <div className="service-menu">
      <h3>{title}</h3>
      {note ? <p className="service-menu-note">{note}</p> : null}
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <span>{item.name}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  useSiteChrome();
  const year = new Date().getFullYear();

  return (
    <>
      <SiteHeader />

      <PromoModal />

      <HeroBanner />

      <section className="welcome" id="about">
        <div className="container welcome-grid">
          <MotionReveal className="welcome-img" variant="left">
            <div className="img-frame">
              <StudioCarousel
                clips={ASSETS.studio.clips}
                fallback={ASSETS.studio.fallback}
              />
            </div>
            <div className="img-accent" />
          </MotionReveal>

          <MotionStagger
            className="welcome-copy"
            stagger={0.12}
            delayChildren={0.08}
          >
            <MotionLine as="p" className="eyebrow">
              Clinical Skincare · Natural Results
            </MotionLine>
            <MotionLine as="h2">
              Self-care rooted in the science of healthy skin.
            </MotionLine>
            <MotionLine as="p">
              I&apos;m <strong>Hajime</strong> — a licensed esthetician trained
              at Aveda Clinic. My approach is natural and clinical: thorough
              analysis, evidence-based treatments, and honest guidance so you
              invest in what your skin actually needs.
            </MotionLine>
            <MotionLine as="p">
              I work with <strong>GlyMed Plus</strong> professional products to
              support real results — from customized facials and dermaplaning to
              nano-needling, chemical peels, back facials, waxing, and brow and
              lash services.
            </MotionLine>
            <MotionLine as="p">
              Healthy skin is not vanity — it is self-care. Every appointment
              begins with understanding your skin, then building a treatment and
              home routine you can maintain with confidence.
            </MotionLine>
            <MotionLine>
              <BookLink className="btn btn-outline">Book Online →</BookLink>
            </MotionLine>
          </MotionStagger>
        </div>
      </section>

      <section className="services" id="services">
        <div className="container">
          <MotionSectionHead
            eyebrow="Services & Pricing"
            title="Treatments tailored to your skin"
            subtitle="Clinical facials, brows and lashes, and body waxing — each service is selected and performed with your skin health in mind."
          />

          <MotionStagger
            className="service-grid"
            stagger={0.09}
            delayChildren={0.12}
          >
            {FACIALS.map((service) => (
              <MotionCard key={service.title} className="service-card">
                <div className="card-media">
                  <Photo
                    src={service.src}
                    fallback={service.fallback}
                    alt={service.alt}
                  />
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

          <MotionReveal delay={0.15}>
            <div className="service-menus">
              <ServiceMenu
                title="Brows & Lashes"
                items={BROW_LASH_MENU}
              />
              <ServiceMenu
                title="Waxing"
                note="Full-body waxing available — book online or ask during your consultation."
                items={WAXING_MENU}
              />
            </div>
          </MotionReveal>

          <MotionReveal className="services-cta" delay={0.2} variant="scale">
            <BookLink className="btn btn-primary">Book Online</BookLink>
            <DepositNotice compact />
          </MotionReveal>
        </div>
      </section>

      <section className="expect" id="expect">
        <div className="container">
          <MotionSectionHead eyebrow="The Experience" title="What to Expect" />

          <MotionStagger
            className="expect-grid"
            stagger={0.1}
            delayChildren={0.08}
          >
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
                &ldquo;Taking care of your skin is self-care. When your skin is
                healthy, you feel more confident showing up as yourself — that
                is what this work is really about.&rdquo;
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
            title="Skin Health Notes"
            subtitle="Practical guidance on building a routine that supports healthy skin — naturally and clinically."
          />

          <MotionStagger
            className="tips-grid"
            stagger={0.12}
            delayChildren={0.1}
          >
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
                    Ask Hajime →
                  </a>
                </div>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="policies" id="policies">
        <div className="container">
          <MotionSectionHead
            eyebrow="Studio Policies"
            title="Booking, deposits & cancellations"
            subtitle="A small deposit protects your appointment time and helps keep the schedule fair for every client."
          />

          <MotionStagger className="policy-grid" stagger={0.08} delayChildren={0.06}>
            {POLICY_SECTIONS.map((section) => (
              <MotionLine key={section.title} className="policy-card">
                <h3>{section.title}</h3>
                <p>{section.body()}</p>
              </MotionLine>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container contact-grid" id="book">
          <MotionStagger
            className="contact-info"
            stagger={0.1}
            delayChildren={0.06}
          >
            <MotionLine as="p" className="eyebrow">
              Book Online
            </MotionLine>
            <MotionLine as="h2">Start your skin health journey.</MotionLine>
            <MotionLine as="p">
              Ready to prioritize your skin? Book online for the fastest
              scheduling, or send a message and Hajime will help you find the
              right service.
            </MotionLine>

            <MotionLine className="booking-actions">
              <BookLink className="btn btn-primary">Book Online</BookLink>
              <a href={`tel:${SITE.phoneTel}`} className="btn btn-outline">
                Call {SITE.phoneDisplay}
              </a>
            </MotionLine>

            <MotionLine>
              <DepositNotice />
            </MotionLine>

            <MotionLine as="ul" className="contact-list">
              <li>
                <strong>Email</strong>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <strong>Phone</strong>
                <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
              </li>
              <li>
                <strong>Location</strong>
                <span>{SITE.location}</span>
              </li>
              <li>
                <strong>Hours</strong>
                <span>{SITE.hours}</span>
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
                  <label htmlFor="service">Service of interest</label>
                  <select id="service" name="service" defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="customized-facial">Customized Signature Facial</option>
                    <option value="dermaplaning">Dermaplaning Facial</option>
                    <option value="nano-needling">Nano-Needling Facial</option>
                    <option value="chemical-peel">Chemical Peel</option>
                    <option value="back-facial">Back Facial</option>
                    <option value="brows-lashes">Brows & Lashes</option>
                    <option value="waxing">Waxing</option>
                    <option value="other">Other / Not sure</option>
                  </select>
                </MotionLine>
                <MotionLine className="field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} required />
                </MotionLine>
                <MotionLine className="field field-checkbox">
                  <label className="checkbox-label" htmlFor="policyAccept">
                    <input
                      id="policyAccept"
                      name="policyAccept"
                      type="checkbox"
                      required
                    />
                    <span>
                      I understand a deposit ({depositLabel()}) is required
                      upfront to confirm my appointment, and that no-shows or
                      late cancellations may forfeit the deposit.{" "}
                      <a href="#policies">Read policy</a>
                    </span>
                  </label>
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
