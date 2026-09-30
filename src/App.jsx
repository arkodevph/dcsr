import { useEffect, useRef, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

const FACEBOOK = 'https://www.facebook.com/zzzbhbp30';
const REVIEWS = `${FACEBOOK}/reviews`;
const PHONE = '0947-499-2273';
const PHONE_LINK = 'tel:+639474992273';
const EMAIL = 'dickson.gutierrez@yahoo.com';
const HERO_VIDEO = import.meta.env.VITE_HERO_VIDEO_URL || '/assets/hero-aircon-loop.mp4';
const CAL_LINK = import.meta.env.VITE_CAL_LINK?.trim() || '';
const external = { target: '_blank', rel: 'noopener noreferrer' };

const services = [
  {
    number: '01 / INSTALLATION', title: 'Installation services',
    image: '/assets/service-installation-3d.webp',
    description: 'Ask DCSR about installing an air conditioning unit for your space.',
    link: 'Ask about installation', label: 'Ask about aircon installation on Facebook',
  },
  {
    number: '02 / AIRCON UNITS', title: 'Sale & supply of aircon units',
    image: '/assets/service-aircon-3d.webp',
    description: 'Get in touch about air conditioning units available for your needs.',
    link: 'Ask about units', label: 'Ask about air conditioning units on Facebook',
  },
  {
    number: '03 / CLEANING', title: 'General cleaning',
    image: '/assets/service-cleaning-3d.webp',
    description: 'Discuss cleaning for your air conditioning unit and share its current condition.',
    link: 'Ask about cleaning', label: 'Ask about aircon cleaning on Facebook',
  },
  {
    number: '04 / REPAIR', title: 'Maintenance & repair',
    image: '/assets/service-maintenance-3d.webp',
    description: 'Tell DCSR what is happening with your aircon or refrigeration equipment.',
    link: 'Ask about repair', label: 'Ask about maintenance and repair on Facebook',
  },
];

const steps = [
  ['Choose a concern', 'Installation, unit supply, cleaning, maintenance, or repair.'],
  ['Share your unit', 'The type or model, if you know it.'],
  ['Describe the issue', 'What changed, and a photo if useful.'],
  ['Add your location', 'Your city or barangay helps with availability.'],
  ['Visit our page', 'Continue with DCSR on Facebook.'],
];

const faqs = [
  ['How do I request a service?', 'Use any “Visit DCSR on Facebook” link on this page. It opens DCSR’s official Facebook page so you can send your inquiry.'],
  ['What services does DCSR offer?', 'DCSR lists installation, sale and supply of air conditioning units, general cleaning, and maintenance and repair for air conditioning and refrigeration.'],
  ['What should I include in my message?', 'Share the type of unit, the issue you noticed, your location, and any useful photos. DCSR can follow up about the details.'],
  ['Where is DCSR based?', 'DCSR lists its address as 905 San Felipe St., Brgy. Lawy, Capas, Tarlac. For service coverage, send your location and ask about availability.'],
  ['Can I call instead?', `Yes. The number on DCSR’s business flyer is ${PHONE}.`],
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

const brands = [
  ['Fujitsu', 'fujitsu.svg'], ['Gree', 'gree.svg'], ['Hitachi', 'hitachi.svg'],
  ['Electrolux', 'electrolux.svg'], ['GE', 'ge.svg'], ['Mitsubishi Electric', 'mitsubishi.svg'],
  ['Daikin', 'daikin.svg'], ['Panasonic', 'panasonic.svg'], ['Sharp', 'sharp.svg'],
  ['General', 'general.png'], ['Haier', 'haier.svg'], ['LG', 'lg.svg'],
  ['Carrier', 'carrier.svg'], ['Koppel', 'koppel.png'], ['Samsung', 'samsung.svg'],
  ['Toshiba', 'toshiba.svg'], ['Sanyo', 'sanyo.svg'], ['York', 'york.png'],
];

function Brand() {
  return <a className="brand" href="#top" aria-label="DCSR home">
    <img src="/assets/dcsr-logo.jpg" width="52" height="52" alt="" />
    <span className="brand-name">DCSR Aircon &amp; Refrigeration Repair Services</span>
  </a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

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

  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' menu-open' : ''}`} id="top">
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
        <a className="button button-small" href={FACEBOOK} {...external} onClick={() => setMenuOpen(false)}>Visit Facebook <span aria-hidden="true">↗</span></a>
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
        <p className="hero-kicker">DCSR AIRCON &amp; REFRIGERATION REPAIR SERVICES</p>
        <h1 id="hero-title"><span className="hero-line">Aircon trouble?</span><em className="hero-line hero-cool">Bring back the cool.</em></h1>
        <p className="hero-description">Installation, unit supply, cleaning, maintenance and repair for aircon and refrigeration. Visit DCSR’s Facebook page to send your inquiry.</p>
        <div className="hero-actions">
          <a className="button button-primary" href={FACEBOOK} {...external}>Visit Facebook <span aria-hidden="true">↗</span></a>
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

function BrandMarquee() {
  const [paused, setPaused] = useState(false);

  return <section className={`brand-marquee${paused ? ' is-paused' : ''}`} aria-label="Aircon and appliance brands DCSR works with">
    <div className="brand-marquee-inner">
      <p className="brand-marquee-label">BRANDS DCSR WORKS WITH</p>
      <button className="brand-marquee-control" type="button" aria-label={paused ? 'Play brand marquee' : 'Pause brand marquee'} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Pause'}</button>
      <div className="brand-marquee-rows">
        {[brands.slice(0, 9), brands.slice(9)].map((row, rowIndex) => <div className={`brand-marquee-window${rowIndex ? ' is-reverse' : ''}`} key={rowIndex}>
          <div className="brand-marquee-track">
            {[0, 1].map((copy) => <ul className="brand-marquee-list" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              {row.map(([name, file]) => <li key={name}><img className={`brand-logo brand-logo--${file.split('.')[0]}`} src={`/assets/brands/${file}`} alt={copy ? '' : name} /></li>)}
            </ul>)}
          </div>
        </div>)}
      </div>
    </div>
  </section>;
}

function Services() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.innerWidth <= 820 || !sectionRef.current) return;
      const section = sectionRef.current;
      const distance = section.offsetHeight - window.innerHeight;
      if (distance <= 0) return;
      const progress = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / distance));
      setActive(Math.round(progress * (services.length - 1)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <section className="services" id="services" ref={sectionRef} aria-labelledby="services-title">
    <div className="services-stage">
      <div className="container services-inner">
        <p className="section-kicker services-label">01 / OUR SERVICES</p>
        <div className="services-visual" aria-hidden="true">
          {services.map((service, index) => <img key={service.number} className={index === active ? 'is-active' : ''} src={service.image} alt="" />)}
          <span className="services-visual-caption">DCSR / {services[active].number}</span>
        </div>
        <div className="services-content">
          <div className="services-heading"><h2 id="services-title">Care for every<br />cooling concern.</h2><p>From a new installation to cleaning and repair. Choose what needs attention.</p></div>
          <div className="services-list">
            {services.map((service, index) => <div className={`services-row${index === active ? ' is-active' : ''}`} key={service.number}>
              <button type="button" onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} aria-label={`Show ${service.title}`} aria-pressed={index === active}><span>{service.title}</span><span className="services-row-arrow" aria-hidden="true">↗</span></button>
              <div className="services-row-detail"><p>{service.description}</p><a href={FACEBOOK} {...external} aria-label={service.label}>{service.link} ↗</a></div>
            </div>)}
          </div>
          <p className="services-index">{String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</p>
        </div>
      </div>
    </div>
  </section>;
}

function About() {
  return <section className="about-band" id="about" aria-labelledby="about-title">
    <div className="container about-grid">
      <div className="about-photo" data-reveal><img src="/assets/cool-room.jpg" width="900" height="1200" alt="Illustrative photo of a quiet room with an installed air conditioner" loading="lazy" /><div className="about-photo-caption"><span>DCSR / COMFORT AT HOME</span><span>Illustrative photography</span></div></div>
      <div className="about-copy" data-reveal>
        <p className="section-kicker section-kicker-light">02 / ABOUT DCSR</p>
        <h2 id="about-title">The details make<br /><em>the difference.</em></h2>
        <p>Since 2020, DCSR Aircon &amp; Refrigeration Repair Services has provided air conditioning and refrigeration solutions for residential, commercial, and industrial clients. The business is based in Capas, Tarlac and owned by Dickson J. Gutierrez.</p>
        <p className="about-approach">DCSR’s business profile highlights trained technicians, modern tools, accurate diagnostics, affordable pricing, and responsive technical support.</p>
        <p className="about-values">Integrity <span>·</span> Excellence <span>·</span> Accountability</p>
        <div className="about-proof"><span>FROM A CUSTOMER REVIEW</span><blockquote>“Very accommodating ng owner and at the same time sya din ang mismong gagawa ng trabaho.”</blockquote><strong>Aileen Nicasio · June 2023</strong></div>
        <a className="text-link about-link" href={FACEBOOK} {...external}>Contact DCSR on Facebook <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>;
}

function Steps() {
  const [active, setActive] = useState(2);

  return <section className="section steps" aria-labelledby="steps-title">
    <div className="container">
      <div className="steps-heading"><p className="section-kicker">03 / HOW IT WORKS</p><div><h2 id="steps-title">From concern to<br />conversation in 5 steps.</h2><p>Gather a few details, then send DCSR a message.</p></div></div>
      <ol className="steps-list">{steps.map(([title, description], index) => <li key={title} className={index === active ? 'is-featured' : ''}>
        <button type="button" className="step-trigger" aria-expanded={index === active} onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(2)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
          <span className="step-index">{String(index + 1).padStart(2, '0')}.</span>
          <span className="step-symbol" aria-hidden="true">{index === 4 ? '↗' : '✳'}</span>
          <span className="step-copy"><strong>{title}</strong><span>{description}</span></span>
        </button>
      </li>)}</ol>
      <a className="steps-link" href={FACEBOOK} {...external}>Visit DCSR on Facebook <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}

function Reviews() {
  const [active, setActive] = useState(0);
  const move = (direction) => setActive((current) => (current + direction + reviews.length) % reviews.length);

  return <section className="reviews" id="reviews" aria-labelledby="reviews-title">
    <div className="container reviews-heading"><p className="section-kicker">04 / CUSTOMER VOICES</p><h2 id="reviews-title">What our customers say</h2><p>Real recommendations shared with DCSR on Facebook.</p></div>
    <div className="reviews-carousel" aria-label="Customer reviews">
      {reviews.map((review, index) => {
        const rawOffset = (index - active + reviews.length) % reviews.length;
        const offset = rawOffset > reviews.length / 2 ? rawOffset - reviews.length : rawOffset;
        return <article className={`review-slide${offset === 0 ? ' is-current' : ''}`} key={review.name} style={{ '--offset': offset, '--distance': Math.abs(offset), zIndex: reviews.length - Math.abs(offset) }} aria-hidden={Math.abs(offset) > 2}>
          <div className="review-slide-top"><span>FACEBOOK RECOMMENDATION</span><span>{String(index + 1).padStart(2, '0')} / 06</span></div>
          <blockquote>“{review.quote}”</blockquote>
          <div className="review-slide-person"><span className="review-initials" aria-hidden="true">{review.name.split(' ').slice(0, 2).map((part) => part[0]).join('')}</span><div><strong>{review.name}</strong><span>{review.date || 'Customer review'}{review.excerpt ? ' · Excerpt' : ''}</span></div></div>
        </article>;
      })}
    </div>
    <div className="reviews-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Previous review">←</button>
      <div className="review-dots" aria-label="Choose a review">{reviews.map((review, index) => <button type="button" key={review.name} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Show review by ${review.name}`} aria-current={index === active ? 'true' : undefined} />)}</div>
      <button type="button" onClick={() => move(1)} aria-label="Next review">→</button>
    </div>
    <a className="reviews-source" href={REVIEWS} {...external}>Read the recommendations on Facebook <span aria-hidden="true">↗</span></a>
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

function JobRequestForm() {
  const [step, setStep] = useState(1);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const [calendarError, setCalendarError] = useState(false);
  const [request, setRequest] = useState({
    name: '', phone: '', email: '', service: '', location: '', unit: '', concern: '', date: '', time: '',
  });
  const stepHeading = useRef(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarStart = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1 - calendarMonth.getDay());
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);
    return date;
  });
  const dateValue = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const updateRequest = (event) => setRequest((current) => ({ ...current, [event.target.name]: event.target.value }));
  const showStep = (nextStep) => {
    setStep(nextStep);
    window.requestAnimationFrame(() => stepHeading.current?.focus());
  };
  const submitStep = (event) => {
    event.preventDefault();
    if (step === 2 && !request.date) {
      setCalendarError(true);
      document.querySelector('.job-request-days button:not(:disabled)')?.focus();
      return;
    }
    if (step < 3) {
      showStep(step + 1);
      return;
    }

    const preferredDate = new Date(`${request.date}T12:00:00`).toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const subject = `Job request: ${request.service} — ${request.name}`;
    const body = [
      `Name: ${request.name}`,
      `Phone: ${request.phone}`,
      `Email: ${request.email || 'Not provided'}`,
      `Service: ${request.service}`,
      `Location: ${request.location}`,
      `Unit type / model: ${request.unit || 'Not sure'}`,
      `Preferred date: ${preferredDate}`,
      `Preferred time: ${request.time}`,
      '',
      'Concern:',
      request.concern,
    ].join('\n');

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const preferredDate = request.date ? new Date(`${request.date}T12:00:00`).toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return <form className="job-request-form" onSubmit={submitStep}>
    <ol className="job-request-progress" aria-label="Job request progress">
      {['Your details', 'Preferred schedule', 'Confirm request'].map((label, index) => {
        const number = index + 1;
        return <li className={`${number === step ? 'is-current' : ''}${number < step ? ' is-complete' : ''}`} key={label} aria-current={number === step ? 'step' : undefined}>
          <button type="button" disabled={number >= step} onClick={() => showStep(number)}><span>{String(number).padStart(2, '0')}</span>{label}</button>
        </li>;
      })}
    </ol>

    <div className="job-request-panel">
      {step === 1 && <div className="job-request-step">
        <div className="job-request-intro">
          <span>STEP 01 / DETAILS</span>
          <h3 ref={stepHeading} tabIndex="-1">What can DCSR help with?</h3>
          <p>Start with the information needed to understand and follow up on your request.</p>
        </div>
        <div className="job-request-fields">
          <label><span>Full name *</span><input name="name" type="text" autoComplete="name" value={request.name} onChange={updateRequest} required /></label>
          <label><span>Phone number *</span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" value={request.phone} onChange={updateRequest} required /></label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" value={request.email} onChange={updateRequest} /></label>
          <label><span>Service needed *</span><select name="service" value={request.service} onChange={updateRequest} required><option value="" disabled>Choose a service</option><option>Installation</option><option>Aircon unit supply</option><option>General cleaning</option><option>Maintenance</option><option>Repair</option><option>Refrigeration service</option><option>Other</option></select></label>
          <label><span>City or barangay *</span><input name="location" type="text" autoComplete="address-level2" value={request.location} onChange={updateRequest} required /></label>
          <label><span>Unit type or model</span><input name="unit" type="text" placeholder="Split type, window type, refrigerator…" value={request.unit} onChange={updateRequest} /></label>
          <label className="job-request-wide"><span>Describe the concern *</span><textarea name="concern" rows="4" placeholder="What happened, when it started, and anything DCSR should know" value={request.concern} onChange={updateRequest} required /></label>
        </div>
      </div>}

      {step === 2 && <div className="job-request-step">
        <div className="job-request-intro">
          <span>STEP 02 / CALENDAR</span>
          <h3 ref={stepHeading} tabIndex="-1">When would you prefer a visit?</h3>
          <p>Choose a preferred date and time window. DCSR will confirm the actual schedule with you.</p>
        </div>
        <div className="job-request-calendar">
          <div className="job-request-date">
            <div className="job-request-calendar-head">
              <button type="button" aria-label="Previous month" disabled={calendarMonth.getFullYear() === today.getFullYear() && calendarMonth.getMonth() === today.getMonth()} onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}>←</button>
              <strong>{calendarMonth.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}</strong>
              <button type="button" aria-label="Next month" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}>→</button>
            </div>
            <div className="job-request-weekdays" aria-hidden="true">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => <span key={day}>{day}</span>)}</div>
            <div className="job-request-days" role="group" aria-label="Choose a preferred date">
              {calendarDays.map((date) => {
                const value = dateValue(date);
                const outsideMonth = date.getMonth() !== calendarMonth.getMonth();
                const unavailable = date < today || outsideMonth;
                return <button type="button" key={value} disabled={unavailable} className={request.date === value ? 'is-selected' : ''} aria-pressed={request.date === value} aria-label={date.toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} onClick={() => { setRequest((current) => ({ ...current, date: value })); setCalendarError(false); }}>{date.getDate()}</button>;
              })}
            </div>
            <p className={calendarError ? 'is-error' : ''} role="status">{request.date ? `Selected: ${new Date(`${request.date}T12:00:00`).toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric' })}` : calendarError ? 'Choose a preferred date to continue.' : 'Select a preferred date'}</p>
          </div>
          <fieldset className="job-request-times"><legend>Preferred time *</legend>
            {['Morning · 8 AM–12 PM', 'Afternoon · 1–5 PM', 'Flexible · Any available time'].map((time) => <label key={time}><input type="radio" name="time" value={time} checked={request.time === time} onChange={updateRequest} required /><span>{time}</span></label>)}
          </fieldset>
          <p className="job-request-calendar-note">This is a scheduling preference, not a confirmed appointment.</p>
        </div>
      </div>}

      {step === 3 && <div className="job-request-step">
        <div className="job-request-intro">
          <span>STEP 03 / CONFIRMATION</span>
          <h3 ref={stepHeading} tabIndex="-1">Review your job request.</h3>
          <p>Check the details before preparing the email to DCSR. You can return to either step to make changes.</p>
        </div>
        <dl className="job-request-summary">
          <div><dt>Customer</dt><dd>{request.name}<span>{request.phone}{request.email ? ` · ${request.email}` : ''}</span></dd></div>
          <div><dt>Service</dt><dd>{request.service}<span>{request.unit || 'Unit type not specified'}</span></dd></div>
          <div><dt>Location</dt><dd>{request.location}</dd></div>
          <div><dt>Preferred schedule</dt><dd>{preferredDate}<span>{request.time}</span></dd></div>
          <div className="job-request-summary-wide"><dt>Concern</dt><dd>{request.concern}</dd></div>
        </dl>
        <p className="job-request-confirmation">Submitting prepares an email addressed to {EMAIL}. The request is complete only after you send it from your email app. DCSR will confirm availability separately.</p>
      </div>}
    </div>

    <div className="job-request-actions">
      {step > 1 && <button className="job-request-back" type="button" onClick={() => showStep(step - 1)}>← Back</button>}
      <button className="button button-primary" type="submit">{step === 3 ? 'Prepare email request' : 'Continue'} <span aria-hidden="true">{step === 3 ? '↗' : '→'}</span></button>
      {step === 1 && <a href={PHONE_LINK}>Prefer to call? {PHONE}</a>}
    </div>
  </form>;
}

function Booking() {
  return <section className="booking-section" id="inquire" aria-labelledby="booking-title">
    <div className="container booking-grid">
      <div className="booking-copy" data-reveal>
        <p className="section-kicker section-kicker-light">05 / SERVICE INQUIRY</p>
        <h2 id="booking-title">Tell us the issue.<br /><em>{CAL_LINK ? 'Find time to talk.' : 'Request a service.'}</em></h2>
        <p>{CAL_LINK ? 'Choose a time to discuss installation, unit supply, cleaning, maintenance, or repair. DCSR can confirm the details and availability with you afterward.' : 'Share the service you need, your location, and what is happening with your unit. DCSR will use these details to understand the request.'}</p>
        {CAL_LINK && <div className="booking-prep"><span>WHAT TO HAVE READY</span><ul><li>Type of unit or service needed</li><li>What you have noticed</li><li>Your city or barangay</li></ul></div>}
      </div>
      <div className="booking-frame">
        <div className="booking-frame-head"><span>DCSR / SERVICE INQUIRY</span><span>{CAL_LINK ? 'CHOOSE A TIME' : 'JOB REQUEST FORM'}</span></div>
        {CAL_LINK ? <div className="booking-embed"><CalCalendar /></div> : <JobRequestForm />}
        <div className="booking-frame-foot"><span>{CAL_LINK ? 'An inquiry time is for discussing your concern.' : `Requests are prepared for ${EMAIL}.`}</span>{CAL_LINK && <a href={`https://cal.com/${CAL_LINK}`} {...external}>Open calendar separately ↗</a>}</div>
      </div>
    </div>
  </section>;
}

function Faq() {
  return <section className="section faq" id="faq" aria-labelledby="faq-title">
    <div className="container faq-grid">
      <div data-reveal><p className="section-kicker">06 / GOOD TO KNOW</p><h2 id="faq-title">A few questions,<br /><em>answered.</em></h2><p>Need something more specific? Visit DCSR’s Facebook page.</p></div>
      <div className="faq-list" data-reveal>{faqs.map(([question, answer], index) => <details key={question}><summary><small>{String(index + 1).padStart(2, '0')}</small>{question} <span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </div>
  </section>;
}

function FinalCta() {
  return <section className="final-cta" aria-labelledby="final-title">
    <div className="final-cta-shade" aria-hidden="true" />
    <div className="container final-cta-inner">
      <p className="section-kicker">READY WHEN YOU ARE</p>
      <div className="final-cta-bottom"><h2 id="final-title">A cooler room<br />starts here.</h2><div><p>Tell DCSR what needs attention through the official Facebook page.</p><a className="button button-primary" href={FACEBOOK} {...external}>Visit Facebook <span aria-hidden="true">↗</span></a></div></div>
    </div>
  </section>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-frame">
      <div className="footer-top"><Brand /><a href={FACEBOOK} {...external}>Visit Facebook <span aria-hidden="true">↗</span></a></div>
      <div className="footer-main">
        <div><h2>Explore</h2><a href="#services">Services</a><a href="#about">About DCSR</a><a href="#reviews">Reviews</a><a href="#inquire">Inquire</a><a href="#faq">FAQs</a></div>
        <div><h2>Connect</h2><a href={FACEBOOK} {...external}>Facebook page ↗</a><a href={REVIEWS} {...external}>Customer reviews ↗</a></div>
        <div className="footer-inquiry"><h2>Contact DCSR</h2><address><a href={PHONE_LINK}>{PHONE}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span>905 San Felipe St., Brgy. Lawy,<br />Capas, Tarlac</span></address><p>Dickson J. Gutierrez · Owner</p></div>
      </div>
      <div className="footer-signature" aria-hidden="true">DCSR Aircon &amp; Refrigeration Repair Services</div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} DCSR Aircon & Refrigeration Repair Services</span><span>Installation · Unit supply · Cleaning · Maintenance &amp; repair</span></div>
    </div>
  </footer>;
}

function MobileFacebook() {
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
  return <a className={`mobile-messenger${show ? ' is-visible' : ''}`} href={FACEBOOK} {...external}>Visit Facebook <span aria-hidden="true">↗</span></a>;
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
      <div className="preloader-wordmark">DCSR Aircon &amp; Refrigeration Repair Services</div>
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
      <main id="main"><Hero /><BrandMarquee /><Services /><About /><Steps /><Reviews /><Booking /><Faq /><FinalCta /></main>
      <Footer />
      <MobileFacebook />
    </div>
  </>;
}
