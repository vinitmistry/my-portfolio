import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Experience", "Skills", "Projects", "Contact"];

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "FedEx",
    period: "Sep 2023 – Present",
    location: "Mumbai, India",
    points: [
      "Led end-to-end GNR automation, designing ABLE-compliant workflows with ERD collaboration.",
      "Reduced processing cycle time by 70% through backend optimization.",
      "Delivered OD Shipment enablement (gPRS), improving RFQ TAT by 20–30% and enhancing pricing accuracy.",
      "Designed and deployed enterprise solution in 40 days under ABLE governance.",
      "Built scalable REST APIs and Angular modules for global rollout; conducted APAC & EU enablement sessions.",
    ],
    tags: ["Angular", "Node.js", "REST APIs", "MySQL", "Redis"],
  },
  {
    role: "Software Developer",
    company: "Tantra Soft Solutions",
    period: "Jul 2021 – Sep 2023",
    location: "Mumbai, India",
   points: [
  "Developed software integrations for 15+ medical diagnostic instruments enabling automated report generation and real-time data processing.",
  "Delivered 5+ pharma compliance-driven projects ensuring regulatory adherence and production-ready releases.",
  "Migrated legacy communication protocols from UDP to TCP, improving reliability by ~40% and integrating REST-based services.",
  "Performed detailed impact analysis for change requests, reducing post-release production issues by ~25%.",
  "Designed scalable Angular + Node.js systems with optimized backend performance and structured deployment workflows."
],
    tags: ["Angular", "Node.js", "TCP/UDP", "REST APIs", "Python"],
  },
];

const SKILLS = {
  Frontend: ["Angular", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  Backend: ["Node.js", "Express.js", "Python", "REST APIs"],
  Database: ["MySQL", "Redis", "MongoDB"],
  "DevOps & Tools": ["IIS", "Git", "GitHub", "Postman", "Env Config"],
};

const PROJECTS = [
  {
    title: "Role-Based Resource Management System",
    subtitle: "Full Stack RBAC Admin Portal",
    desc: "Designed and deployed a secure RBAC-based admin portal enabling role-driven access control (Admin / Manager / User). Developed RESTful APIs with Node.js, implemented JWT authentication, and built dynamic Angular dashboards with role-based rendering. Deployed on IIS with structured release management via Git.",
    tags: ["Angular", "Node.js", "MySQL", "JWT", "IIS"],
  },
];

const AWARDS = [
  { title: "Rising Star", period: "Q2 2026" },
  { title: "Rising Star", period: "Q4 2025" },
];

// ── Scroll reveal hook ─────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Animated section wrapper ───────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(36px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [hovered, setHovered] = useState(null);
  const [navHov, setNavHov] = useState(null);
  const [activeNav, setActiveNav] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    setIsMobile(window.innerWidth < 768);
    
    // Hero entrance — slight delay for dramatic effect
    setTimeout(() => setHeroReady(true), 200);

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const link of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(link.toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveNav(link);
          break;
        }
      }
    };
    
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div style={S.root}>
      {/* blobs */}
      <div style={S.blob1} />
      <div style={S.blob2} />
      <div style={S.blob3} />

      {/* ══ NAV ══ */}
      <nav
        style={{
          ...S.nav,
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
          borderBottomColor: scrolled
            ? "rgba(255,255,255,0.08)"
            : "transparent",
        }}
      >
        <div style={S.navInner}>
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={S.logo}
          >
            VM<span style={{ color: "#f472b6" }}>.</span>
          </span>

          {/* Nav Links - Desktop only */}
          {!isMobile && (
            <>
              <div style={S.navLinks}>
                {NAV_LINKS.map((link) => {
                  const isActive = activeNav === link;
                  const isHov = navHov === link;
                  return (
                    <button
                      key={link}
                      onClick={() => scrollTo(link)}
                      onMouseEnter={() => setNavHov(link)}
                      onMouseLeave={() => setNavHov(null)}
                      style={{
                        position: "relative",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "8px 0",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: isActive ? "#c4b5fd" : isHov ? "#e2d9f3" : "#64748b",
                        transition: "color 0.3s ease",
                        letterSpacing: "0.3px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          inset: "-4px -14px",
                          borderRadius: "8px",
                          background: isActive
                            ? "rgba(167,139,250,0.12)"
                            : isHov
                            ? "rgba(167,139,250,0.07)"
                            : "transparent",
                          transition: "background 0.3s ease",
                          zIndex: 0,
                        }}
                      />
                      <span style={{ position: "relative", zIndex: 1 }}>
                        {link}
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: "50%",
                          transform:
                            isActive || isHov
                              ? "translateX(-50%) scaleX(1)"
                              : "translateX(-50%) scaleX(0)",
                          transformOrigin: "center",
                          height: "2px",
                          width: "100%",
                          background: isActive
                            ? "linear-gradient(90deg, #a78bfa, #f472b6)"
                            : "rgba(167,139,250,0.45)",
                          borderRadius: "2px",
                          transition:
                            "transform 0.35s cubic-bezier(.22,1,.36,1), background 0.3s",
                          zIndex: 1,
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* CTA Button - Desktop only */}
              <a
                href="mailto:vinitmistry11@gmail.com"
                onMouseEnter={() => setNavHov("cta")}
                onMouseLeave={() => setNavHov(null)}
                style={S.ctaButton}
              >
                Hire Me ✦
              </a>
            </>
          )}

          {/* Hamburger Menu for Mobile - Mobile only */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                ...S.hamburger,
                transform: mobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              ☰
            </button>
          )}
        </div>

        {/* Mobile Sidebar Menu - Only visible on mobile */}
        {mobileMenuOpen && (
          <div style={S.mobileSidebar}>
            {NAV_LINKS.map((link) => {
              const isActive = activeNav === link;
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  style={{
                    ...S.mobileLink,
                    borderLeft: isActive ? "4px solid #f472b6" : "4px solid transparent",
                    background: isActive ? "rgba(167,139,250,0.1)" : "transparent",
                  }}
                >
                  {link}
                </button>
              );
            })}
            <a
              href="mailto:vinitmistry11@gmail.com"
              style={S.mobileEmailLink}
            >
              📧 Email Me
            </a>
          </div>
        )}
      </nav>

      {/* ══ PAGE WRAPPER ══ */}
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* ══ HERO ══ */}
        <section id="about" style={S.heroSection}>
          <div style={S.heroContent}>
            {/* Initials block */}
            <div
              style={{
                ...S.initialsWrap,
                opacity: heroReady ? 1 : 0,
                transform: heroReady
                  ? "scale(1) translateY(0)"
                  : "scale(0.8) translateY(20px)",
                transition: "all 1s cubic-bezier(.22,1,.36,1) 0.1s",
              }}
            >
              <div style={S.initialsBox}>VM</div>
              <div style={S.ring1} />
              <div style={S.ring2} />
            </div>

            <div style={S.heroText}>
              {/* Each hero line staggers in */}
              <p
                style={{
                  ...S.greeting,
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.7s cubic-bezier(.22,1,.36,1) 0.25s",
                }}
              >
                Hello, I'm
              </p>

              <h1
                style={{
                  ...S.name,
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(28px)",
                  transition: "all 0.8s cubic-bezier(.22,1,.36,1) 0.4s",
                }}
              >
                Vinit Mistry
              </h1>

              <h2
                style={{
                  ...S.titleRole,
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(24px)",
                  transition: "all 0.8s cubic-bezier(.22,1,.36,1) 0.55s",
                }}
              >
                Full Stack Developer
              </h2>

              <p
                style={{
                  ...S.tagline,
                  opacity: heroReady ? 1 : 0,
                  transition: "opacity 0.8s ease 0.65s",
                }}
              >
                Angular · Node.js · REST APIs · MySQL · Redis
              </p>

              <p
                style={{
                  ...S.bio,
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(.22,1,.36,1) 0.75s",
                }}
              >
                Full Stack Developer with{" "}
                <strong style={{ color: "#c4b5fd" }}>4.8+ years</strong> of
                experience building scalable enterprise applications across{" "}
                <strong style={{ color: "#c4b5fd" }}>logistics</strong> and{" "}
                <strong style={{ color: "#c4b5fd" }}>healthcare</strong>{" "}
                domains. Strong expertise in Angular, Node.js, REST APIs, and
                database design — with a proven track record of reducing
                turnaround time and delivering production-grade solutions.
              </p>

              {/* Stats row */}
              <div
                style={{
                  ...S.statsRow,
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(.22,1,.36,1) 0.9s",
                }}
              >
                {[
                  ["4.5+", "Yrs Exp"],
                  ["15+", "Instruments"],
                  ["70%", "Cycle Time↓"],
                  ["2×", "Rising Star"],
                ].map(([n, l]) => (
                  <div key={l} style={S.statBox}>
                    <div style={S.statNum}>{n}</div>
                    <div style={S.statLabel}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div
                style={{
                  ...S.heroActions,
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(.22,1,.36,1) 1.05s",
                }}
              >
                <button
                  onClick={() => scrollTo("Projects")}
                  onMouseEnter={() => setHovered("btn1")}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    ...S.btnPrimary,
                    transform:
                      hovered === "btn1" ? "translateY(-3px)" : "translateY(0)",
                    boxShadow:
                      hovered === "btn1"
                        ? "0 16px 44px rgba(124,58,237,0.6)"
                        : "0 8px 28px rgba(124,58,237,0.38)",
                  }}
                >
                  View Projects
                </button>

                <a
                  href="mailto:vinitmistry11@gmail.com"
                  onMouseEnter={() => setHovered("btn2")}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    ...S.btnOutline,
                    borderColor:
                      hovered === "btn2"
                        ? "rgba(167,139,250,0.65)"
                        : "rgba(167,139,250,0.3)",
                    color: hovered === "btn2" ? "#c4b5fd" : "#a78bfa",
                    background:
                      hovered === "btn2"
                        ? "rgba(167,139,250,0.08)"
                        : "transparent",
                    transform:
                      hovered === "btn2" ? "translateY(-3px)" : "translateY(0)",
                  }}
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══ EXPERIENCE ══ */}
        <section id="experience" style={S.section}>
          <div style={S.sectionInner}>
            <Reveal>
              <div style={S.sectionHeadRow}>
                <h2 style={S.sectionTitle}>Experience</h2>
                <div style={S.sectionLine} />
              </div>
            </Reveal>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {EXPERIENCE.map((exp, i) => (
                <Reveal key={exp.company} delay={i * 150}>
                  <div
                    onMouseEnter={() => setHovered(`exp-${i}`)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      ...S.card,
                      background:
                        hovered === `exp-${i}`
                          ? "rgba(167,139,250,0.06)"
                          : "rgba(255,255,255,0.03)",
                      borderColor:
                        hovered === `exp-${i}`
                          ? "rgba(167,139,250,0.35)"
                          : "rgba(255,255,255,0.07)",
                      boxShadow:
                        hovered === `exp-${i}`
                          ? "0 8px 48px rgba(0,0,0,0.35)"
                          : "none",
                      transform:
                        hovered === `exp-${i}`
                          ? "translateY(-4px)"
                          : "translateY(0)",
                    }}
                  >
                    <div style={S.expHeader}>
                      <div>
                        <h3 style={S.expRole}>{exp.role}</h3>
                        <p style={{ fontSize: "13px", marginTop: "4px" }}>
                          <span style={{ color: "#a78bfa", fontWeight: "600" }}>
                            {exp.company}
                          </span>
                          <span style={{ color: "#334155", margin: "0 8px" }}>
                            ·
                          </span>
                          <span style={{ color: "#64748b" }}>
                            {exp.location}
                          </span>
                        </p>
                      </div>
                      <span style={S.periodBadge}>{exp.period}</span>
                    </div>

                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "18px 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {exp.points.map((pt, j) => (
                        <li
                          key={j}
                          style={{
                            display: "flex",
                            gap: "12px",
                            alignItems: "flex-start",
                          }}
                        >
                          <span
                            style={{
                              color: "#a78bfa",
                              marginTop: "7px",
                              fontSize: "6px",
                              flexShrink: 0,
                            }}
                          >
                            ◆
                          </span>
                          <span
                            style={{
                              fontSize: "14px",
                              lineHeight: "1.85",
                              color: "#94a3b8",
                            }}
                          >
                            {pt}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                    >
                      {exp.tags.map((t) => (
                        <span key={t} style={S.tag}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <section
          id="skills"
          style={{ ...S.section, background: "rgba(0,0,0,0.2)" }}
        >
          <div style={S.sectionInner}>
            <Reveal>
              <div style={S.sectionHeadRow}>
                <h2 style={S.sectionTitle}>Skills</h2>
                <div style={S.sectionLine} />
              </div>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {Object.entries(SKILLS).map(([cat, items], i) => (
                <Reveal key={cat} delay={i * 100}>
                  <div
                    onMouseEnter={() => setHovered(`cat-${cat}`)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      ...S.card,
                      height: "100%",
                      background:
                        hovered === `cat-${cat}`
                          ? "rgba(167,139,250,0.07)"
                          : "rgba(255,255,255,0.03)",
                      borderColor:
                        hovered === `cat-${cat}`
                          ? "rgba(167,139,250,0.4)"
                          : "rgba(255,255,255,0.07)",
                      transform:
                        hovered === `cat-${cat}`
                          ? "translateY(-5px)"
                          : "translateY(0)",
                      boxShadow:
                        hovered === `cat-${cat}`
                          ? "0 12px 40px rgba(0,0,0,0.3)"
                          : "none",
                    }}
                  >
                    <p style={S.catLabel}>{cat}</p>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                    >
                      {items.map((sk) => (
                        <span key={sk} style={S.skillPill}>
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROJECTS ══ */}
        <section id="projects" style={S.section}>
          <div style={S.sectionInner}>
            <Reveal>
              <div style={S.sectionHeadRow}>
                <h2 style={S.sectionTitle}>Projects</h2>
                <div style={S.sectionLine} />
              </div>
            </Reveal>

            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={100}>
                <div
                  onMouseEnter={() => setHovered(`proj-${i}`)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    ...S.card,
                    background:
                      hovered === `proj-${i}`
                        ? "rgba(167,139,250,0.07)"
                        : "rgba(255,255,255,0.03)",
                    borderColor:
                      hovered === `proj-${i}`
                        ? "rgba(167,139,250,0.4)"
                        : "rgba(255,255,255,0.07)",
                    transform:
                      hovered === `proj-${i}`
                        ? "translateY(-5px)"
                        : "translateY(0)",
                    boxShadow:
                      hovered === `proj-${i}`
                        ? "0 20px 60px rgba(0,0,0,0.4)"
                        : "none",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    <div>
                      <h3 style={S.projTitle}>{p.title}</h3>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#a78bfa",
                          letterSpacing: "1px",
                          marginTop: "4px",
                        }}
                      >
                        {p.subtitle}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: "22px",
                        color: hovered === `proj-${i}` ? "#a78bfa" : "#334155",
                        transition: "all 0.35s ease",
                        transform:
                          hovered === `proj-${i}`
                            ? "translate(4px, -4px)"
                            : "translate(0,0)",
                      }}
                    >
                      ↗
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.85",
                      color: "#94a3b8",
                      marginBottom: "20px",
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {p.tags.map((t) => (
                      <span key={t} style={S.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Awards */}
            <Reveal delay={200}>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginTop: "12px",
                }}
              >
                {AWARDS.map((a) => (
                  <div
                    key={a.period}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 24px",
                      borderRadius: "50px",
                      background: "rgba(251,191,36,0.07)",
                      border: "1px solid rgba(251,191,36,0.2)",
                      transition: "all 0.3s",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>⭐</span>
                    <div>
                      <p
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#fbbf24",
                        }}
                      >
                        {a.title}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#92400e",
                          letterSpacing: "1px",
                        }}
                      >
                        {a.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section
          id="contact"
          style={{ ...S.section, background: "rgba(0,0,0,0.2)" }}
        >
          <div style={{ ...S.sectionInner, textAlign: "center" }}>
            <Reveal>
              <div style={{ ...S.sectionHeadRow, justifyContent: "center" }}>
                <div style={{ ...S.sectionLine, maxWidth: "120px" }} />
                <h2 style={S.sectionTitle}>Let's Connect</h2>
                <div style={{ ...S.sectionLine, maxWidth: "120px" }} />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "15px",
                  maxWidth: "480px",
                  margin: "0 auto 40px",
                  lineHeight: "1.8",
                }}
              >
                Open to full-time opportunities and exciting projects.
                <br />
                Let's build something great together.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: "40px",
                }}
              >
                {[
                  {
                    label: "📧 vinitmistry11@gmail.com",
                    href: "mailto:vinitmistry11@gmail.com",
                  },
                  { label: "📱 +91 9820413272", href: "tel:+919820413272" },
                  { label: "💼 LinkedIn", href: "#" },
                  { label: "🐙 GitHub", href: "#" },
                ].map(({ label, href }, i) => (
                  <a
                    key={label}
                    href={href}
                    onMouseEnter={() => setHovered(`c-${i}`)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "50px",
                      border: "1px solid",
                      borderColor:
                        hovered === `c-${i}`
                          ? "rgba(167,139,250,0.55)"
                          : "rgba(255,255,255,0.1)",
                      color: hovered === `c-${i}` ? "#c4b5fd" : "#94a3b8",
                      background:
                        hovered === `c-${i}`
                          ? "rgba(167,139,250,0.12)"
                          : "rgba(255,255,255,0.04)",
                      fontSize: "14px",
                      fontWeight: "500",
                      transform:
                        hovered === `c-${i}`
                          ? "translateY(-3px)"
                          : "translateY(0)",
                      boxShadow:
                        hovered === `c-${i}`
                          ? "0 8px 24px rgba(0,0,0,0.3)"
                          : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "36px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  ["📍", "Mumbai, India"],
                  ["🕐", "IST (UTC+5:30)"],
                  ["💼", "Open to Full-time"],
                ].map(([icon, val]) => (
                  <div
                    key={val}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#475569",
                      fontSize: "13px",
                    }}
                  >
                    <span>{icon}</span>
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={S.footer}>
          <div style={S.footerInner}>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "20px",
                background: "linear-gradient(135deg,#a78bfa,#f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "700",
              }}
            >
              VM.
            </span>
            <span style={{ color: "#334155", fontSize: "12px" }}>
              Designed & built by Vinit Mistry · © {new Date().getFullYear()}
            </span>
            <span style={{ color: "#334155", fontSize: "12px" }}>
              Mumbai, India
            </span>
          </div>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; background: #0d0d14; }
        a { text-decoration: none; }
        button { font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d14; }
        ::-webkit-scrollbar-thumb { background: #2d2040; border-radius: 4px; }
        ::selection { background: rgba(167,139,250,0.25); color: #e2d9f3; }

        @keyframes float {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-24px) scale(1.04); }
        }
        @keyframes spin-cw  { to { transform: rotate(360deg);  } }
        @keyframes spin-ccw { to { transform: rotate(-360deg); } }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0.3; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          nav > div:first-child {
            flex-wrap: nowrap;
            gap: 12px;
          }
          [style*="desktopNav"], [style*="navLinks"] {
            display: none !important;
          }
          button[style*="hamburger"] {
            display: block !important;
          }
          a[href*="mailto"][style*="ctaButton"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ─── STYLES ──────────────────────────────────────────────────────────────── */
const S = {
  root: {
    minHeight: "100vh",
    background: "#0d0d14",
    fontFamily: "'DM Sans', sans-serif",
    color: "#e2e8f0",
    position: "relative",
    overflowX: "hidden",
  },

  blob1: {
    position: "fixed",
    top: "-150px",
    right: "-150px",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(109,40,217,0.3) 0%, transparent 70%)",
    animation: "float 9s ease-in-out infinite",
    pointerEvents: "none",
    zIndex: 0,
  },
  blob2: {
    position: "fixed",
    bottom: "-120px",
    left: "-120px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(30,64,175,0.25) 0%, transparent 70%)",
    animation: "float 12s ease-in-out infinite reverse",
    pointerEvents: "none",
    zIndex: 0,
  },
  blob3: {
    position: "fixed",
    top: "40%",
    left: "35%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(157,23,77,0.12) 0%, transparent 70%)",
    animation: "float 15s ease-in-out infinite",
    pointerEvents: "none",
    zIndex: 0,
  },

  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
    background: "rgba(13,13,20,0.88)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid",
    transition: "box-shadow 0.4s ease, border-color 0.4s ease",
  },
  navInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  logo: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(20px, 5vw, 26px)",
    fontWeight: "700",
    background: "linear-gradient(135deg, #a78bfa, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  desktopNav: {
    display: "flex",
    gap: "40px",
    alignItems: "center",
    flex: 1,
  },

  navLinks: {
    display: "flex",
    gap: "40px",
    alignItems: "center",
    flex: 1,
  },

  ctaButton: {
    padding: "10px 26px",
    borderRadius: "8px",
    border: "1px solid rgba(167,139,250,0.3)",
    color: "#a78bfa",
    fontSize: "13px",
    fontWeight: "500",
    background: "transparent",
    boxShadow: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
    textDecoration: "none",
  },

  hamburger: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    color: "#a78bfa",
    fontSize: "24px",
    transition: "transform 0.3s ease",
    display: "none",
  },

  mobileSidebar: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "rgba(13,13,20,0.98)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    zIndex: 99,
    animation: "slideDown 0.3s cubic-bezier(.22,1,.36,1)",
  },

  mobileLink: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "16px 24px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: "500",
    color: "#94a3b8",
    textAlign: "left",
    width: "100%",
    transition: "all 0.3s ease",
    display: "block",
  },

  mobileEmailLink: {
    padding: "16px 24px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: "500",
    color: "#a78bfa",
    textDecoration: "none",
    display: "block",
    borderTop: "1px solid rgba(167,139,250,0.2)",
    marginTop: "8px",
  },

  heroSection: { 
    width: "100%", 
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "110px 48px 90px",
  },
  heroContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "80px",
    flexWrap: "wrap",
    width: "100%",
  },

  initialsWrap: {
    position: "relative",
    flexShrink: 0,
    width: "160px",
    height: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  initialsBox: {
    width: "160px",
    height: "160px",
    borderRadius: "40px",
    border: "1px solid rgba(167,139,250,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Fraunces', serif",
    fontSize: "56px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #a78bfa, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    boxShadow: "0 20px 60px rgba(109,40,217,0.3)",
    position: "relative",
    zIndex: 2,
  },
  ring1: {
    position: "absolute",
    inset: "-12px",
    borderRadius: "52px",
    border: "1.5px dashed rgba(167,139,250,0.22)",
    animation: "spin-cw 14s linear infinite",
  },
  ring2: {
    position: "absolute",
    inset: "-26px",
    borderRadius: "66px",
    border: "1px dashed rgba(244,114,182,0.13)",
    animation: "spin-ccw 22s linear infinite",
  },

  heroText: { flex: 1, minWidth: "300px" },
  greeting: {
    fontSize: "12px",
    letterSpacing: "5px",
    textTransform: "uppercase",
    color: "#a78bfa",
    marginBottom: "12px",
  },
  name: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(44px,5vw,72px)",
    fontWeight: "700",
    lineHeight: 1.02,
    marginBottom: "10px",
    background: "linear-gradient(135deg, #f1f5f9 30%, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  titleRole: {
    fontFamily: "'Fraunces', serif",
    fontStyle: "italic",
    fontWeight: "300",
    fontSize: "clamp(18px,2.5vw,26px)",
    color: "#7c6fa0",
    marginBottom: "8px",
  },
  tagline: {
    fontSize: "12px",
    color: "#4a5568",
    letterSpacing: "1.5px",
    marginBottom: "20px",
  },
  bio: {
    fontSize: "15px",
    lineHeight: "1.9",
    color: "#94a3b8",
    maxWidth: "560px",
    marginBottom: "32px",
  },

  statsRow: {
    display: "flex",
    gap: "36px",
    marginBottom: "32px",
    flexWrap: "wrap",
  },
  statBox: { textAlign: "center" },
  statNum: {
    fontFamily: "'Fraunces', serif",
    fontSize: "32px",
    fontWeight: "700",
    color: "#a78bfa",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "10px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#4a5568",
    marginTop: "5px",
  },

  heroActions: { display: "flex", gap: "16px", flexWrap: "wrap" },
  btnPrimary: {
    padding: "14px 34px",
    borderRadius: "50px",
    background: "linear-gradient(135deg, #7c3aed, #db2777)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    border: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  btnOutline: {
    padding: "14px 34px",
    borderRadius: "50px",
    border: "1.5px solid",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  section: { width: "100%", padding: "90px 48px" },
  sectionInner: { maxWidth: "1400px", margin: "0 auto" },
  sectionHeadRow: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "48px",
  },
  sectionTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(26px,3vw,36px)",
    fontWeight: "700",
    color: "#f1f5f9",
    flexShrink: 0,
  },
  sectionLine: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, rgba(167,139,250,0.4), transparent)",
  },

  card: {
    borderRadius: "16px",
    padding: "28px 32px",
    border: "1px solid",
    transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
  },
  expHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "12px",
  },
  expRole: {
    fontFamily: "'Fraunces', serif",
    fontSize: "20px",
    fontWeight: "700",
    color: "#f1f5f9",
  },
  periodBadge: {
    fontSize: "12px",
    color: "#64748b",
    whiteSpace: "nowrap",
    background: "rgba(255,255,255,0.05)",
    padding: "5px 14px",
    borderRadius: "50px",
    border: "1px solid rgba(255,255,255,0.07)",
  },

  tag: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "50px",
    background: "rgba(167,139,250,0.12)",
    color: "#a78bfa",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    border: "1px solid rgba(167,139,250,0.22)",
  },
  catLabel: {
    fontFamily: "'Fraunces', serif",
    fontSize: "14px",
    fontWeight: "700",
    color: "#c4b5fd",
    marginBottom: "14px",
  },
  skillPill: {
    display: "inline-block",
    padding: "5px 14px",
    borderRadius: "50px",
    background: "rgba(255,255,255,0.05)",
    color: "#94a3b8",
    fontSize: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  projTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "20px",
    fontWeight: "700",
    color: "#f1f5f9",
  },

  footer: {
    width: "100%",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    padding: "28px 48px",
  },
  footerInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
};
