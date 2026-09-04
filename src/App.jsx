import React, { useEffect, Suspense, lazy } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Lazy-load larger routes to reduce initial bundle size
const AboutPageLazy = lazy(() => import('./pages/AboutPage'));
const ProjectPageLazy = lazy(() => import('./pages/ProjectPage'));

const projectList = [
  {
    slug: 'sunnova',
    title: 'Sunnova Consumer App',
    company: 'Created at: Sunnova',
    image: '/assets/images/work_sunnova.png',
    summary:
      'A consumer-facing app experience designed to make solar energy decisions more intuitive, transparent, and approachable.',
    story: [
      'The project focused on simplifying a highly technical customer journey into a clear and engaging digital experience. I worked across UX strategy, interface design, and front-end collaboration to turn complex energy concepts into a confident customer flow.',
      'The result was a product direction that balanced trust, clarity, and conversion while making the experience feel approachable for first-time solar customers.',
    ],
  },
  {
    slug: 'kia',
    title: 'Kia - Discover Seltos and Get a Chance to Earn Rewards!',
    company: 'Created at: PrizeLogic',
    image: '/assets/images/work_kia.png',
    summary:
      'A promotional landing experience for the Kia Seltos campaign designed to drive engagement and participation while staying polished and on-brand.',
    story: [
      'This campaign required a compelling promotion experience that translated a vehicle launch into a rewarding, accessible digital interaction. I designed the experience to guide users from discovery to action with clear messaging and streamlined interaction.',
      'The work emphasized visual momentum, responsive behavior, and conversion-friendly decision points that made the campaign feel premium and mobile-ready.',
    ],
  },
  {
    slug: 'gm',
    title: 'General Mills - Snack Good Trivia Challenge',
    company: 'Created at: PrizeLogic',
    image: '/assets/images/work_gm.png',
    summary:
      'A snack-themed trivia campaign built to entertain while reinforcing brand personality and driving repeat participation.',
    story: [
      'The experience needed to feel lively and easy to understand without sacrificing brand standards. I focused on a playful visual system, intuitive navigation, and interaction details that kept users engaged from start to finish.',
      'The design helped make the campaign highly shareable and memorable while still feeling structured and production-ready.',
    ],
  },
  {
    slug: 'mtd',
    title: 'Mountain Dew - The Diet Dew Crew & You Sweepstakes',
    company: 'Created at: PrizeLogic',
    image: '/assets/images/work_mtd.png',
    summary:
      'A sweepstakes experience that leaned into brand energy, social interaction, and strong visual storytelling for a youth-focused audience.',
    story: [
      'This project demanded a design approach that felt bold, dynamic, and unmistakably branded. I shaped the experience around high-energy visuals and frictionless engagement to keep the campaign exciting and easy to enter.',
      'The final direction helped the brand feel fun and modern while creating a streamlined path from landing page to entry completion.',
    ],
  },
  {
    slug: 'lipton',
    title: 'Lipton - Win an Extra Sunday Promotion',
    company: 'Created at: PrizeLogic',
    image: '/assets/images/work_lipton.png',
    summary:
      'A lifestyle-oriented promotional experience designed to capture the emotional tone of a relaxed, rewarding weekend moment.',
    story: [
      'The campaign needed to feel warm, aspirational, and easy to participate in. I created a visual direction that paired friendly messaging with polished layout structure and strong product cues.',
      'The end result balanced brand recognition with accessible interaction design so the promotion felt both attractive and clear at every step.',
    ],
  },
  {
    slug: 'suess',
    title: 'Dr Suess - Express Yourself! Sweepstakes',
    company: 'Created at: PrizeLogic',
    image: '/assets/images/work_drsuess.png',
    summary:
      'A joyful, character-driven sweepstakes experience built to celebrate creativity and encourage user participation without overwhelming the brand.',
    story: [
      'This project leaned heavily into personality and playful motion. I translated a recognizable brand world into a digital experience that felt imaginative, approachable, and still highly functional.',
      'The design helped create an experience that was both fun and conversion-friendly, making it easy for users to engage with the campaign and its messaging.',
    ],
  },
  {
    slug: 'makutu',
    title: "Makutu's Island Logo",
    company: 'Created at: Spiral Inc',
    image: '/assets/images/work_makutu.png',
    summary:
      'A logo and brand identity concept inspired by island energy, adventure, and playful storytelling.',
    story: [
      'The identity work focused on a memorable form language with a sense of escape and imagination. I developed the visual direction to express personality and mood without losing clarity at small sizes and across applications.',
      'The concept balanced whimsy with readability, creating a mark that felt distinctive and brandable.',
    ],
  },
  {
    slug: 'park',
    title: 'Park Meadows Logo',
    company: 'Created at: Spiral Inc',
    image: '/assets/images/work_park.png',
    summary:
      'A logo concept created for a retail and lifestyle identity with a focus on clarity, warmth, and modern regional appeal.',
    story: [
      'The challenge was to design a mark that felt polished and welcoming while fitting the expectations of a retail destination. I refined the direction around simplicity, memorability, and a balanced visual tone.',
      'The result was a flexible identity system that could work across signage, print, and digital communications without losing its character.',
    ],
  },
];

function HomePage() {
  useEffect(() => {
    // register GSAP plugins and run entrance animations
    try {
      gsap.registerPlugin(ScrollToPlugin);
    } catch (e) {}

    // entrance timeline for hero + headings
    try {
      const tl = gsap.timeline();
      // profile image: enter and settle slightly lower for better visual alignment
      tl.fromTo(
        '.sw_profile',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 12, duration: 1, ease: 'power3.out' },
      )
        // left heading slides in from the left
        .fromTo(
          '.de',
          { opacity: 0, x: -160 },
          { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' },
          '-=0.75',
        )
        // right heading slides in from the right
        .fromTo(
          '.co',
          { opacity: 0, x: 160 },
          { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' },
          '-=0.85',
        )
        // cards reveal
        .fromTo(
          '.card',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power2.out' },
          '-=0.4',
        );
    } catch (e) {}

    // smooth scroll for nav links (uses data attributes / anchor hashes)
    const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-item .nav-link'));
    const onClick = (evt) => {
      evt.preventDefault();
      const hrefValue = evt.currentTarget.hash;
      if (hrefValue) {
        try {
          gsap.to(window, { duration: 1.2, scrollTo: { y: hrefValue, autoKill: true, ease: 'expo' } });
        } catch (e) {
          window.location.hash = hrefValue;
        }
      }
    };
    navLinks.forEach((btn) => btn.addEventListener('click', onClick));

    // interactive hero mousemove with reduced work for performance
    const sw_profile = document.querySelector('.sw_profile');
    const cover_box = document.querySelector('.cover_box');
    let rafId = null;
    const onMove = (e) => {
      if (!sw_profile) return;
      const x = e.clientX;
      // throttle via requestAnimationFrame
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        sw_profile.style.transform = `translate(${x / -12 - 100}px, 0)`;
        if (x < window.innerWidth / 2) {
          gsap.to('.de', { alpha: 1, duration: 0.45, overwrite: true });
          gsap.to('.co', { alpha: 0.15, duration: 0.45, overwrite: true });
        } else {
          gsap.to('.de', { alpha: 0.15, duration: 0.45, overwrite: true });
          gsap.to('.co', { alpha: 1, duration: 0.45, overwrite: true });
        }
      });
    };
    cover_box && cover_box.addEventListener('mousemove', onMove);

    return () => {
      navLinks.forEach((btn) => btn.removeEventListener('click', onClick));
      cover_box && cover_box.removeEventListener('mousemove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/" aria-label="Stephen Wildrick home">
          <span style={{ display: 'inline-block', width: '2.5rem' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <div className="nav-item">
              <a className="nav-link" href="#box_work">Work</a>
              <span className="line" />
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
              <span className="line" />
            </div>
            <div className="nav-item">
              <a className="nav-link link_contact" href="#box_contact">Contact</a>
              <span className="line" />
            </div>
          </div>
        </div>
      </nav>

      <figure className="rounded m-0">
        <div id="cover_box" className="container-fluid cover_box">
          <div className="row gx-0 mx-auto">
            <div className="col-4 d-none d-lg-block mx-auto">
              <div className="holder de">
                <h1 id="de">designer</h1>
                <h6>Product Designer who specializes in UI design and motion</h6>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 mx-auto">
              <div className="sw_box">
                <img src="/assets/images/sw_profile.png" alt="Stephen Wildrick" className="sw_profile" />
              </div>
            </div>

            <div className="col-4 d-none d-lg-block mx-auto">
              <div className="holder co">
                <h1>&lt;coder&gt;</h1>
                <h6>Front-End Developer who writes clean, elegant and efficient code</h6>
              </div>
            </div>
          </div>
        </div>
      </figure>

      <div className="container-fluid p-3 box_cards">
        <div className="container">
          <div className="row align-items-start justify-content-md-center">
            {[
              {
                title: 'Strategic Creative Leadership',
                image: '/assets/images/circleS.svg',
                accent: '/assets/images/circle1.svg',
                secondary: '/assets/images/circle3.svg',
                text: 'Strategic Creative Leadership • Branding • Studio and Team Building • Creative Management • Art Direction • Teaching and Training',
              },
              {
                title: 'UX/UI Design',
                image: '/assets/images/circleU.svg',
                accent: '/assets/images/circle1.svg',
                secondary: '/assets/images/circle2.svg',
                text: 'Adobe • Figma • Visual Design • Interaction Design • Design Systems • Wireframing • User Flows • Motion Graphics • Web Accessibility',
              },
              {
                title: 'Development',
                image: '/assets/images/circleD.svg',
                accent: '/assets/images/circle3.svg',
                secondary: '/assets/images/circle2.svg',
                text: 'HTML • CSS / SCSS • Responsive Design • JS • Greensock • jQuery • GIT • SEO',
              },
            ].map((card) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={card.title}>
                <div className="card">
                  <div className="box_circle rounded">
                    <img src={card.image} className="card-img-top" alt={card.title} />
                    <img src={card.accent} className="circle_anm circle_l" alt="" />
                    <img src={card.secondary} className="circle_anm circle_r" alt="" />
                  </div>
                  <div className="card_body">
                    <p className="card_text">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main id="box_work" className="container-fluid work_box">
        <div className="row align-items-start gx-4 gy-4 justify-content-md-center">
          <div className="col-4 col-lg-4 d-lg-block line_art"><hr /></div>
          <div className="col-4 col-lg-2"><p>selected work</p></div>
          <div className="col-4 col-lg-4 d-lg-block line_art"><hr /></div>
        </div>

        <div className="row align-items-start gx-4 gy-4 justify-content-center">
          {projectList.map((project) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={project.slug}>
              <Link className="work" to={`/project/${project.slug}`}>
                <img src={project.image} alt={project.title} />
                <h6>{project.title}</h6>
                <p>{project.company}</p>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <div className="container-fluid py-5 box-bio">
        <div className="row justify-content-center align-items-center">
          <div className="col-2 mx-auto-sm" />
          <div className="col-lg-4 col-md-12">
            <img src="/assets/images/about.jpg" alt="About Me" className="about_photo" />
          </div>
          <div className="col-lg-4 col-md-12 p-5 mx-auto-sm text-lg-left text-md-center align-items-center">
            <h2>About Me</h2>
            <p>
              I bring decades of experience designing intuitive digital experiences, building scalable systems, and leading creative teams. My career spans early digital innovation, award-winning design, and executive leadership across complex products and brands.
              <br />
              <br />
              I specialize in UX, design systems, and front-end collaboration, partnering with brands like Disney, Hershey, and McDonald&apos;s to create experiences that balance business goals with user needs.
              <br />
              <br />
              My focus has evolved from designing interfaces to shaping meaningful human experiences—bringing clarity, structure, and purpose to complex challenges.
            </p>
          </div>
          <div className="col-2 mx-auto-sm" />
        </div>
      </div>

      <div id="box_contact" className="container-fluid box-contact">
        <div className="row mx-auto justify-content-center">
          <div className="col-12 mx-auto-sm">
            <h1>LET&apos;S TEAM UP!</h1>
            <p>
              Have something cool you&apos;re working on? I&apos;d love to hear about it.
              <br />
              Feel free to get in touch with me at:
            </p>
          </div>
        </div>
        <div className="row mx-auto justify-content-center">
          <div className="col-sm-1 col-6">
            <a href="mailto:swildrick@gmail.com" target="_blank" rel="noreferrer">
              <img src="/assets/images/btn_email.svg" alt="swildrick@gmail.com" className="contact-icon" />
            </a>
          </div>
          <div className="col-sm-1 col-6">
            <a href="tel:602-670-3938" target="_blank" rel="noreferrer">
              <img src="/assets/images/btn_phone.svg" alt="602-670-3938" className="contact-icon" />
            </a>
          </div>
        </div>
      </div>

      <footer className="container-fluid box-footer">
        <div className="container">
          <br />
          <div className="row gx-0 mx-auto">
            <div className="col-12 col-md-4 mx-auto-sm">
              <a href="https://www.linkedin.com/in/swildrick" target="_blank" rel="noreferrer">
                <img src="/assets/images/linkedin.svg" alt="LinkedIn" className="footer-icon" />
              </a>
              <a href="https://codepen.io/swildrick24" target="_blank" rel="noreferrer">
                <img src="/assets/images/codepen.svg" alt="Codepen" className="footer-icon" />
              </a>
              <a href="https://github.com/swildrick" target="_blank" rel="noreferrer">
                <img src="/assets/images/git.svg" alt="Github" className="footer-icon" />
              </a>
              <a href="https://www.instagram.com/swildrick24" target="_blank" rel="noreferrer">
                <img src="/assets/images/instagram.svg" alt="Instagram" className="footer-icon" />
              </a>
            </div>
            <br />
            <br />
            <div className="col-12 col-md-4 mx-auto-sm" />
            <div className="col-12 col-md-4 mx-auto-sm py-2 text-center txt-footer">
              © <time>{new Date().getFullYear()}</time> Stephen Wildrick
            </div>
            <div className="col-12 col-md-4 mx-auto-sm" />
          </div>
        </div>
      </footer>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/" aria-label="Back home">
          <img src="/assets/images/arrow_left_alt.svg" className="btn_back d-inline-block align-top" alt="back" />
        </Link>
      </nav>

      <div className="container-fluid frame_holder project-page">
        <div className="row mx-auto justify-content-center">
          <div className="col-lg-6 col-sm-10 mx-auto-sm text-left">
            <img src="/assets/images/sw_about.jpg" className="sun_home" alt="Stephen" />
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row mx-auto justify-content-center">
          <div className="col-lg-6 col-sm-10 mx-auto-sm text-left">
            <p>
              I&apos;m a Senior Product Designer with over 20 years of experience crafting intuitive, scalable digital experiences. I specialize in design systems, front-end collaboration, and solving complex UX challenges with clarity and creativity. I&apos;ve worked with brands like Disney, Hershey, and McDonald&apos;s to deliver solutions that balance business goals with user needs. Whether I&apos;m designing in Figma or partnering with developers, I focus on building products that are thoughtful, efficient, and a pleasure to use.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const project = projectList.find((item) => item.slug === slug) ?? projectList[0];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/" aria-label="Back home">
          <img src="/assets/images/arrow_left_alt.svg" className="btn_back d-inline-block align-top" alt="back" />
        </Link>
      </nav>

      <div className="container-fluid frame_holder project-page">
        <div className="row mx-auto justify-content-center">
          <div className="col-lg-8 col-sm-10 mx-auto-sm text-left">
            <img src={project.image} className="sun_home" alt={project.title} />
          </div>
        </div>
      </div>

      <div className="container-fluid project-page">
        <div className="row mx-auto justify-content-center">
          <div className="col-lg-8 col-sm-10 content">
            <h2>{project.title}</h2>
            <p>
              <strong>{project.company}</strong>
            </p>
            <p>{project.summary}</p>
            {project.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              <Link to="/">← Back to work</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const location = useLocation();

  // simple route-transition animation using GSAP
  useEffect(() => {
    try {
      gsap.fromTo('#route-transition', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: 'power1.out' });
    } catch (e) {}
  }, [location.pathname]);

  return (
    <div id="route-transition">
      <Suspense fallback={<div style={{padding: '4rem', textAlign: 'center'}}>Loading…</div>}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPageLazy />} />
          <Route
            path="/project/:slug"
            element={<ProjectPageLazy projectList={projectList} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}
