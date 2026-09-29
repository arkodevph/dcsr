import { useEffect, useRef, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

const MESSENGER = 'https://m.me/zzzbhbp30';
const FACEBOOK = 'https://www.facebook.com/zzzbhbp30';
const REVIEWS = `${FACEBOOK}/reviews`;
const HERO_VIDEO = import.meta.env.VITE_HERO_VIDEO_URL || '/assets/hero-aircon-loop.mp4';
const CAL_LINK = import.meta.env.VITE_CAL_LINK?.trim() || '';
const external = { target: '_blank', rel: 'noopener noreferrer' };

const services = [
  {
    number: '01 / AIRCON', title: 'Aircon repair',
    description: 'Tell us what your unit is doing, or what it isn’t. Start a conversation about repair through Messenger.',
    link: 'Ask about repair', label: 'Ask about aircon repair on Messenger',
  },
  {
    number: '02 / REFRIGERATION', title: 'Refrigeration repair',
    description: 'Get in touch about refrigeration equipment that needs inspection or repair.',
    link: 'Ask about repair', label: 'Ask about refrigeration repair on Messenger',
  },
  {
    number: '03 / UPKEEP', title: 'Maintenance',
    description: 'Ask about maintenance for your aircon or refrigeration system and share its current condition.',
    link: 'Ask about maintenance', label: 'Ask about maintenance on Messenger',
  },
];

const steps = [
  ['Tell us your unit type', 'Let DCSR know if your concern is about an aircon or refrigeration unit.'],
  ['Describe the issue', 'Share what you’ve noticed, and add a photo if it helps explain the problem.'],
  ['Continue on Messenger', 'Ask about service details, availability, and your location directly with DCSR.'],
];

const faqs = [
  ['How do I request a service?', 'Use any “Message DCSR” link on this page. It opens DCSR’s Messenger conversation so you can explain your concern.'],
  ['What should I include in my message?', 'Share the type of unit, the issue you noticed, your location, and any useful photos. DCSR can follow up about the details.'],
  ['Do you serve my area?', 'Service coverage is best confirmed directly. Send your location to DCSR through Messenger and ask about availability.'],
  ['Can I ask about maintenance?', 'Yes. DCSR’s public page describes repair and maintenance services. Send a message with your unit details to discuss your needs.'],
];

const reviews = [
  {
    name: 'Nino Tomas',
    quote: 'Maraming salamat sir, highly recommended ko tong dcsr, solid yung paglilinis, walang daya. 1st time kong makakita ng ganitong linis. Solid parts by parts.',
  },
  {
    name: 'Anna Mae Fernandez Nicasio', date: '8 February 2024',
    quote: '10/10 kumpleto ang gamit at reliable 👍🏻👍🏻👍🏻 2years bago nakapag review tinamad lang hehe Pagawa at palinis na po ng appliances here',
  },
  {
    name: 'Aileen Zapanta', date: '23 June 2023',
    quote: 'SuperB! Affordable but QUALITY service. 3 years and counting customer here 😊',
  },
  {
    name: 'Aileen Nicasio', date: '7 June 2023',
    quote: "Very accommodating ng owner and at the same time sya din ang mismong gagawa ng trabaho. Everytime na may concerns and inquiries nagrereply agad sya. We we're satisfied with the cleaning job he did with our four split type aircon units. Malinis na malinis talaga and unit kaya naman sobrang lamig na ulit ng mga aircon namin. Thank you for the very good service. Highly recommended 👍",
  },
  {
    name: 'alkonahe De San Jose - Tarlac', date: '6 May 2023', excerpt: true,
    quote: 'we highly recommend this company, the owner is the one who will attend to you in all your inquiries and will find his best time and effort to serve and save you from troubles.. sobra po kaming nagpapasalamat sa magaling na serbisyo at talino sa paggawa ng kompanyang ito.lalo higit sa pagiging mabuting tao po ng may ari.. Sir Dikson maraming maraming salamat po..',
  },
  {
    name: 'Paolo Montalbo', date: '8 October 2022',
    quote: 'kumpleto gamit at detalyado magtrabaho. highly recommended 👍👍👍',
  },
];

function Brand() {
  return <a className="brand" href="#top" aria-label="DCSR home">
    <img src="/assets/dcsr-logo.jpg" width="52" height="52" alt="" />
    <span className="brand-name">DCSR<span>Aircon & Refrigeration</span></span>
  </a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return <header className="site-header" id="top">
    <div className="container header-inner">
      <Brand />
      <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </button>
      <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} id="site-nav" aria-label="Main navigation">
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
        <a href="#inquire" onClick={() => setMenuOpen(false)}>Inquire</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>FAQs</a>
        <a className="button button-small" href={MESSENGER} {...external} onClick={() => setMenuOpen(false)}>Message DCSR <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>;
}

function Hero() {
  const [reduceMotion, setReduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-media" aria-hidden="true">
      {HERO_VIDEO && !reduceMotion && <video className={videoReady ? 'is-ready' : ''} src={HERO_VIDEO} autoPlay muted loop playsInline preload="metadata" poster="/assets/hero-aircon-poster-v2.webp" onCanPlay={() => setVideoReady(true)} />}
    </div>
    <div className="hero-wash" aria-hidden="true"></div>
    <div className="container hero-content">
      <div className="hero-main">
        <p className="hero-kicker">DCSR AIRCON & REFRIGERATION</p>
        <h1 id="hero-title"><span className="hero-line">Aircon trouble?</span><em className="hero-line hero-cool">Bring back the cool.</em></h1>
        <p className="hero-description">Aircon and refrigeration repair and maintenance. Tell DCSR what needs attention and start the conversation on Messenger.</p>
        <div className="hero-actions">
          <a className="button button-primary" href={MESSENGER} {...external}>Message DCSR <span aria-hidden="true">↗</span></a>
          <a className="button button-outline" href="#services">Explore our services <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="hero-guide">
        <div className="hero-guide-head"><span>DCSR / START HERE</span><span>01 / 03</span></div>
        <p>A clear first step toward cool again.</p>
        <div className="hero-guide-steps"><span><b>01</b> Your unit</span><span><b>02</b> The issue</span><span><b>03</b> Your location</span></div>
      </div>
      <div className="hero-proof">
        <span>CUSTOMER NOTE / 2023</span>
        <blockquote>“SuperB! Affordable but QUALITY service. 3 years and counting customer here 😊”</blockquote>
        <strong>Aileen Zapanta</strong>
      </div>
    </div>
  </section>;
}

function Services() {
  return <section className="section services" id="services" aria-labelledby="services-title">
    <div className="airflow airflow-services" aria-hidden="true"><span></span><span></span><span></span></div>
    <div className="container">
      <div className="section-heading services-heading" data-reveal>
        <div><p className="section-kicker">01 / SERVICES</p><h2 id="services-title">Cooling care,<br /><em>considered.</em></h2></div>
        <p>Find the concern that sounds familiar. DCSR can help you start the right conversation about repair or upkeep.</p>
      </div>
      <div className="service-stream">
        {services.map((service, index) => <article className={`service-flow service-flow-${index + 1}`} key={service.number} data-reveal>
          <div className="service-flow-symbol" aria-hidden="true"><span>{service.number.slice(0, 2)}</span><i></i></div>
          <div className="service-flow-copy"><span>{service.number.slice(5)}</span><h3>{service.title}</h3><p>{service.description}</p></div>
          <a href={MESSENGER} {...external} aria-label={service.label}><span>{service.link}</span><span className="service-flow-arrow" aria-hidden="true">↗</span></a>
        </article>)}
      </div>
      <p className="service-footnote">A different cooling concern? <a href={MESSENGER} {...external}>Tell DCSR what is happening <span aria-hidden="true">↗</span></a></p>
    </div>
  </section>;
}

function About() {
  return <section className="about-band" id="about" aria-labelledby="about-title">
    <div className="airflow airflow-about" aria-hidden="true"><span></span><span></span></div>
    <div className="container about-grid">
      <div className="about-photo" data-reveal><img src="/assets/cool-room.jpg" width="900" height="1200" alt="Illustrative photo of a quiet room with an installed air conditioner" loading="lazy" /><div className="about-photo-caption"><span>DCSR / COMFORT AT HOME</span><span>Illustrative photography</span></div></div>
      <div className="about-copy" data-reveal>
        <p className="section-kicker section-kicker-light">02 / ABOUT DCSR</p>
        <h2 id="about-title">The details make<br /><em>the difference.</em></h2>
        <p>DCSR handles aircon and refrigeration repair and maintenance. Tell them what is happening with your unit, and get a direct conversation started.</p>
        <div className="about-proof"><span>FROM A CUSTOMER REVIEW</span><blockquote>“Very accommodating ng owner and at the same time sya din ang mismong gagawa ng trabaho.”</blockquote><strong>Aileen Nicasio · June 2023</strong></div>
        <a className="text-link about-link" href={MESSENGER} {...external}>Talk to DCSR about your unit <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>;
}

function Steps() {
  return <section className="section steps" aria-labelledby="steps-title">
    <div className="airflow airflow-steps" aria-hidden="true"><span></span><span></span></div>
    <div className="container">
      <div className="steps-intro" data-reveal><div><p className="section-kicker">03 / THE PROCESS</p><h2 id="steps-title">A clear way<br /><em>to begin.</em></h2></div><div><p>Start with what you know. A few useful details help DCSR understand your concern and follow up.</p><a className="text-link text-link-blue" href={MESSENGER} {...external}>Open Messenger <span aria-hidden="true">↗</span></a></div></div>
      <ol className="steps-list">{steps.map(([title, description], index) => <li key={title} data-reveal><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
    </div>
  </section>;
}

function Reviews() {
  return <section className="reviews" id="reviews" aria-labelledby="reviews-title">
    <div className="airflow airflow-reviews" aria-hidden="true"><span></span><span></span></div>
    <div className="container reviews-grid">
      <div className="reviews-intro" data-reveal><p className="section-kicker">04 / CUSTOMER VOICES</p><h2 id="reviews-title">The work<br /><em>speaks through them.</em></h2><p>Customers shared these recommendations on DCSR’s Facebook page. Their words say more than a sales pitch.</p><a className="button button-primary" href={REVIEWS} {...external}>Read reviews on Facebook <span aria-hidden="true">↗</span></a><span className="reviews-count">06 / RECOMMENDATIONS SHARED</span></div>
      <div className="review-stack" data-reveal>
        {reviews.map((review, index) => <article className="review-card" key={review.name}>
          <div className="review-card-head"><span>REVIEW / {String(index + 1).padStart(2, '0')}</span><span>FACEBOOK RECOMMENDATION</span></div>
          <blockquote>“{review.quote}”</blockquote>
          <div className="review-card-foot"><strong>{review.name}</strong>{review.date && <span>{review.date}{review.excerpt ? ' · Excerpt' : ''}</span>}</div>
        </article>)}
      </div>
    </div>
  </section>;
}

function CalCalendar() {
  useEffect(() => {
    getCalApi().then((cal) => cal('ui', {
      theme: 'light',
      styles: { branding: { brandColor: '#245cc4' } },
      layout: 'month_view',
    })).catch(() => {});
  }, []);

  return <Cal className="cal-inline" calLink={CAL_LINK} config={{ layout: 'month_view', theme: 'light' }} />;
}

function Booking() {
  return <section className="booking-section" id="inquire" aria-labelledby="booking-title">
    <div className="airflow airflow-booking" aria-hidden="true"><span></span><span></span></div>
    <div className="container booking-grid">
      <div className="booking-copy" data-reveal>
        <p className="section-kicker section-kicker-light">05 / SERVICE INQUIRY</p>
        <h2 id="booking-title">Tell us the issue.<br /><em>{CAL_LINK ? 'Find time to talk.' : 'Start the conversation.'}</em></h2>
        <p>{CAL_LINK ? 'Choose a time to discuss your aircon or refrigeration concern. DCSR can confirm service details and availability with you afterward.' : 'Begin with a short message about your unit. DCSR can discuss the details and next steps with you directly.'}</p>
        {CAL_LINK && <div className="booking-prep"><span>WHAT TO HAVE READY</span><ul><li>Type of unit or service needed</li><li>What you have noticed</li><li>Your city or barangay</li></ul></div>}
      </div>
      <div className="booking-frame">
        <div className="booking-frame-head"><span>DCSR / SERVICE INQUIRY</span><span>{CAL_LINK ? 'CHOOSE A TIME' : 'MESSAGE DCSR'}</span></div>
        {CAL_LINK ? <div className="booking-embed"><CalCalendar /></div> : <div className="booking-pending"><span className="booking-pending-label">DIRECT INQUIRY / MESSENGER</span><h3>Tell us what needs attention.</h3><p>Online scheduling is being prepared. You can send the essentials now and continue directly with DCSR.</p><div className="booking-preview" aria-label="Details to include"><span><b>01</b> Your unit</span><span><b>02</b> The issue</span><span><b>03</b> Your location</span></div><a className="button button-primary" href={MESSENGER} {...external}>Send an inquiry <span aria-hidden="true">↗</span></a></div>}
        <div className="booking-frame-foot"><span>{CAL_LINK ? 'An inquiry time is for discussing your concern.' : 'Continue the conversation directly on Messenger.'}</span>{CAL_LINK && <a href={`https://cal.com/${CAL_LINK}`} {...external}>Open calendar separately ↗</a>}</div>
      </div>
    </div>
  </section>;
}

function Faq() {
  return <section className="section faq" id="faq" aria-labelledby="faq-title">
    <div className="container faq-grid">
      <div data-reveal><p className="section-kicker">06 / GOOD TO KNOW</p><h2 id="faq-title">A few questions,<br /><em>answered.</em></h2><p>Need something more specific? DCSR is one Messenger conversation away.</p></div>
      <div className="faq-list" data-reveal>{faqs.map(([question, answer], index) => <details key={question}><summary><small>{String(index + 1).padStart(2, '0')}</small>{question} <span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </div>
  </section>;
}

function FinalCta() {
  return <section className="final-cta" aria-labelledby="final-title">
    <div className="container final-cta-inner"><div data-reveal><p className="section-kicker">READY WHEN YOU ARE</p><h2 id="final-title">Cool again<br /><em>starts here.</em></h2><p>Tell DCSR what’s happening with your aircon or refrigeration unit.</p><a className="button button-primary button-large" href={MESSENGER} {...external}>Message DCSR on Messenger <span aria-hidden="true">↗</span></a></div><div className="final-breeze" aria-hidden="true"><span></span><span></span><span></span></div></div>
  </section>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-brand"><Brand /><p>Your Technical Partner & Quality Serviced</p></div>
      <div><h2>Explore</h2><a href="#services">Services</a><a href="#about">About DCSR</a><a href="#reviews">Reviews</a><a href="#inquire">Inquire</a><a href="#faq">FAQs</a></div>
      <div><h2>Connect</h2><a href={MESSENGER} {...external}>Messenger ↗</a><a href={FACEBOOK} {...external}>Facebook page ↗</a><a href={REVIEWS} {...external}>Customer reviews ↗</a></div>
    </div>
    <div className="container footer-signature" aria-hidden="true">DCSR <span>↗</span></div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} DCSR Aircon & Refrigeration Repair Services</span><span>Built for better first conversations.</span></div>
  </footer>;
}

function MobileMessenger() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const sections = [document.querySelector('.hero'), document.querySelector('.booking-section'), document.querySelector('.final-cta'), document.querySelector('.site-footer')];
    const visible = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visible.set(entry.target, entry.isIntersecting));
      setShow(sections.every((section) => visible.get(section) === false));
    });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <a className={`mobile-messenger${show ? ' is-visible' : ''}`} href={MESSENGER} {...external}>Message DCSR <span aria-hidden="true">↗</span></a>;
}

function Preloader({ exiting }) {
  return <div className={`preloader${exiting ? ' is-exiting' : ''}`} role="status" aria-label="Opening DCSR website">
    <svg className="preloader-curtain" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="preloader-blue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0a2b58" /><stop offset="1" stopColor="#164986" />
        </linearGradient>
        <mask id="preloader-reveal" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="white" />
          <circle className="preloader-hole" cx="50" cy="38" r="90" fill="black" />
        </mask>
      </defs>
      <rect width="100" height="100" fill="url(#preloader-blue)" mask="url(#preloader-reveal)" />
      <circle className="preloader-rim" cx="50" cy="38" r="90" fill="none" stroke="#9be7ff" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
    </svg>
    <div className="preloader-content" aria-hidden="true">
      <div className="preloader-fan"><span></span><span></span><span></span><span></span><i></i></div>
      <div className="preloader-wordmark">DCSR</div>
      <p>AIRCON &amp; REFRIGERATION</p>
      <svg className="preloader-air" viewBox="0 0 180 42" aria-hidden="true">
        <path d="M16 10 C52 0 100 20 164 9" />
        <path d="M6 21 C50 9 113 34 174 20" />
        <path d="M16 32 C52 22 100 43 164 31" />
      </svg>
    </div>
  </div>;
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderExiting, setPreloaderExiting] = useState(false);

  useEffect(() => {
    if (!showPreloader) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const removeTimer = window.setTimeout(() => setShowPreloader(false), 1200);
      return () => window.clearTimeout(removeTimer);
    }
    const exitTimer = window.setTimeout(() => setPreloaderExiting(true), 1200);
    const removeTimer = window.setTimeout(() => setShowPreloader(false), 2200);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, [showPreloader]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    elements.forEach((element) => observer.observe(element));
    document.documentElement.classList.add('motion-ready');
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  return <>
    {showPreloader && <Preloader exiting={preloaderExiting} />}
    <div inert={showPreloader}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Hero /><Services /><About /><Steps /><Reviews /><Booking /><Faq /><FinalCta /></main>
      <Footer />
      <MobileMessenger />
    </div>
  </>;
}
