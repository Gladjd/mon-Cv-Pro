import React, { useState, useEffect, useRef, useMemo } from 'react';

// ==========================================
// 1. MATRICE DES SYSTÈMES DE DESIGN (GEMINI.MD)
// ==========================================
export const PRESETS = {
  A: {
    id: 'A',
    name: 'Architecte Minimal',
    subtitle: 'Épuré, tons encre & corail',
    ambiance: "Studio d'ingénierie baigné de lumière",
    canvasBg: '#FAFAFA',
    canvasText: '#1C1C1E',
    surface: '#FFFFFF',
    surfaceBorder: 'rgba(28, 28, 30, 0.08)',
    surfaceSubtle: 'rgba(28, 28, 30, 0.03)',
    accent: '#E8634A',
    accentHover: '#D45037',
    accentLight: 'rgba(232, 99, 74, 0.12)',
    fontTitle: "'Plus Jakarta Sans', sans-serif",
    fontDisplay: "'Cormorant Garamond', serif",
    fontMeta: "'IBM Plex Mono', monospace",
    isDark: false,
    tagline: "Précision Clinique & Clarté",
    textureUnsplash: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
  },
  B: {
    id: 'B',
    name: 'Nocturne Prestige',
    subtitle: 'Sombre, or brossé & haute précision',
    ambiance: "Bloc de haute technologie, pénombre & précision",
    canvasBg: '#0F0F13',
    canvasText: '#F5F3EE',
    surface: '#1E1E26',
    surfaceBorder: 'rgba(212, 168, 67, 0.18)',
    surfaceSubtle: 'rgba(255, 255, 255, 0.04)',
    accent: '#D4A843',
    accentHover: '#BF9330',
    accentLight: 'rgba(212, 168, 67, 0.15)',
    fontTitle: "'Inter', sans-serif",
    fontDisplay: "'Playfair Display', serif",
    fontMeta: "'JetBrains Mono', monospace",
    isDark: true,
    tagline: "Excellence Biomédicale",
    textureUnsplash: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
  },
  C: {
    id: 'C',
    name: 'Signal Brut',
    subtitle: 'Tech industrielle & bleu signal',
    ambiance: "Terminal d'ingénierie hospitalière & contrôle",
    canvasBg: '#F5F3EE',
    canvasText: '#111111',
    surface: '#E8E4DD',
    surfaceBorder: 'rgba(17, 17, 17, 0.15)',
    surfaceSubtle: 'rgba(17, 17, 17, 0.04)',
    accent: '#2563EB',
    accentHover: '#1D4ED8',
    accentLight: 'rgba(37, 99, 235, 0.12)',
    fontTitle: "'Space Grotesk', sans-serif",
    fontDisplay: "'DM Serif Display', serif",
    fontMeta: "'Space Mono', monospace",
    isDark: false,
    tagline: "Rigueur Industrielle",
    textureUnsplash: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
  },
  D: {
    id: 'D',
    name: 'Aura Digitale',
    subtitle: 'Bio-tech cyber-luxe, reflets & néon profond',
    ambiance: "Vide sidéral, micro-optique & flux de données",
    canvasBg: '#0A0A14',
    canvasText: '#F0EFF4',
    surface: '#18181B',
    surfaceBorder: 'rgba(123, 97, 255, 0.25)',
    surfaceSubtle: 'rgba(123, 97, 255, 0.05)',
    accent: '#7B61FF',
    accentHover: '#654BE2',
    accentLight: 'rgba(123, 97, 255, 0.18)',
    fontTitle: "'Sora', sans-serif",
    fontDisplay: "'Instrument Serif', serif",
    fontMeta: "'Fira Code', monospace",
    isDark: true,
    tagline: "Bio-Ingénierie Avancée",
    textureUnsplash: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80"
  }
};

// ==========================================
// 2. DONNÉES EXACTES DU CV (GLAD J. D. MOUKOUIRI)
// ==========================================
const PROFILE = {
  name: "Glad J. D. MOUKOUIRI",
  role: "Ingénieur Biomédical & Chef de Projets Équipements Médicaux",
  subRole: "Spécialiste Systèmes de Biologie Médicale & Maintenance Critique",
  location: "Dakar, Sénégal",
  experienceYears: 8,
  availability: "Disponible pour Directions Techniques & Projets Internationaux",
  status: "Système opérationnel — Disponible pour projets d'envergure",
  email: "gladmoukouiri@gmail.com",
  phone: "+221 77 285 38 20",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  credentials: [
    { title: "Microscopes LEICA Niveau 1", issuer: "Leica Microsystems (Jan 2026)", desc: "Maintenance, calibration et réparation : M220, M620, M822/M844, Proveo 8, DIC800, caméras & BIOM." },
    { title: "Certification HSST & Risques", issuer: "Comité Hygiène Santé Sécurité (Avr 2025)", desc: "ISO 45001 & ISO 31000, gestion des risques hospitaliers, protocoles préventifs et sécurité." },
    { title: "Certification Audit Interne SMQ", issuer: "Auditeur Qualité Qualifié (Avr 2023)", desc: "ISO 9001:2015, conduite d'audits complets, classification des écarts et amélioration continue." }
  ],
  manifesto: {
    lead: "Je garantis la continuité vitale des infrastructures de santé en alliant ingénierie biomédicale de pointe, rigueur d'audit qualité et déploiement de projets technologiques à fort impact.",
    body: "Du bloc opératoire ophtalmique aux hôpitaux régionaux en passant par les laboratoires nationaux, je pilote le cycle de vie complet des technologies médicales les plus critiques. Mon engagement : assurer 100% de fiabilité opérationnelle, optimiser les coûts de maintenance via la GMAO et former les équipes de soins pour sauver des vies avec une précision sans faille.",
    pillars: [
      { title: "Précision Technologique", desc: "Expertise certifiée sur microscopes opératoires Leica et équipements de diagnostic de haute technicité (maintien sub-millimétrique)." },
      { title: "Gouvernance de Projets Santé", desc: "Pilotage de marchés d'envergure internationale (Banque Mondiale ISMEA, GIZ ENDEV Santé, REDISSE, Enabel) sur plus de 150 sites hospitaliers." },
      { title: "Digitalisation & Qualité SMQ", desc: "Implémentation de GMAO cloud/mobile, traçabilité des parcs biomédicaux et audits stricts conformes aux normes ISO 9001 & ISO 45001." }
    ]
  },
  stats: [
    { value: "242+", label: "Équipements Déployés", meta: "Projet ISMEA Banque Mondiale" },
    { value: "120", label: "Sites Frigos Solaires", meta: "Projet GIZ ENDEV & HAIER" },
    { value: "98", label: "Centres de Laboratoire", meta: "Projet REDISSE Santé" },
    { value: "ISO", label: "9001 & 45001", meta: "Auditeur Qualité & Expert CHSST" }
  ],
  experiences: [
    {
      id: "technologies-services-specialiste",
      period: "Nov 2023 — Présent",
      role: "Spécialiste Système Biologie Médicale & Maintenance",
      company: "Technologies Services",
      location: "Dakar & Sénégal",
      tagline: "Responsable de la maintenance des équipements fournis, gestion de l'atelier de dépannage et conformité SMQ.",
      impact: [
        "Planification et exécution des maintenances préventives et curatives de haute technicité (microscopes Leica, automates de laboratoire).",
        "Gestion globale de l'atelier biomédical : flux d'équipements, pièces détachées critiques, sécurité HSST et conformité ISO 9001.",
        "Déploiement du projet ENDEV Santé (GIZ / HAIER) : installation de frigos solaires hospitaliers dans 120 localités (Saint-Louis, Matam, Louga).",
        "Projet REDISSE : fourniture et mise en service de 358 articles de laboratoire sur 98 structures sanitaires avec 4 équipes terrain."
      ],
      skills: ["Microscopes Leica", "GMAO", "ISO 9001 / ISO 45001", "GIZ / HAIER", "Gestion d'Atelier", "Biologie Médicale"]
    },
    {
      id: "technologies-services-chef-projet",
      period: "Mai 2023 — Oct 2023",
      role: "Responsable de Projets Biomédicaux Nationaux",
      company: "Technologies Services",
      location: "Sénégal",
      tagline: "Pilotage d'un portefeuille de 5 projets majeurs d'équipements médico-techniques financés par des bailleurs internationaux.",
      impact: [
        "Projet ISMEA (Banque Mondiale) : Direction du déploiement de 242 équipements médicaux techniques dans 30 structures sanitaires (EPS, centres et postes de santé) avec 3 équipes mobiles.",
        "Projet ENABEL : Études techniques et fourniture pour le Laboratoire National de Contrôle des Médicaments de l'Agence Sénégalaise de Réglementation Pharmaceutique (ARP).",
        "Projet GMAO : Implémentation active d'une GMAO mobile/web (inventaire, maintenance préventive/corrective, pièces détachées et tableaux de bord d'activité)."
      ],
      skills: ["Banque Mondiale (ISMEA)", "Gestion de Budget", "Enabel", "Déploiement GMAO", "Pilotage 3 Équipes", "Management Risques"]
    },
    {
      id: "hopital-asfadar-paramed",
      period: "Déc 2022 — Déc 2024",
      role: "Technicien Biomédical Projet — Nouvel Hôpital International",
      company: "Hôpital International de Dakar (ASFADAR) & Technologies Services",
      location: "Dakar, Sénégal",
      tagline: "Équipement intégral d'un hôpital de référence internationale en phase de construction et mise en service.",
      impact: [
        "Dispatching et implantation de l'ensemble des équipements biomédicaux par service, bloc opératoire, unité de soins et étage.",
        "Élaboration des plannings d'installation, coordination des équipes techniques et élaboration des plans de maintenance préventive.",
        "Interface centrale entre direction des travaux, corps d'état techniques, fournisseurs d'équipements et encadrement médical."
      ],
      skills: ["Ouverture Hôpital Neuf", "Bloc Opératoire", "Coordination BTP/Médical", "Installation Lourde", "Reporting Direction"]
    },
    {
      id: "path-ministere-sante",
      period: "Fév 2021 — Fév 2022",
      role: "Ingénieur Biomédical — Mission Nationale de Santé",
      company: "ONG PATH & Ministère de la Santé (DIEM)",
      location: "Dakar & Régions, Sénégal",
      tagline: "Renforcement de la stratégie de maintenance du Ministère de la Santé et gestion de crise sanitaire.",
      impact: [
        "Participation active au projet de suivi-évaluation et renforcement de la maintenance biomédicale (GMAO nationale).",
        "Missions présidentielles d'inauguration et validation technique des nouveaux hôpitaux de Kaffrine et Kédougou.",
        "Supervision et traçabilité du parc d'équipements critiques déployés dans le cadre de la riposte nationale Covid-19."
      ],
      skills: ["Ministère de la Santé (DIEM)", "ONG PATH", "Inauguration Hôpitaux", "GMAO Ministère", "Gestion Crise Covid-19"]
    }
  ],
  education: [
    {
      period: "2016 — 2020",
      degree: "Master en Ingénierie Biomédicale",
      institution: "Université Polytechnique de l'Ouest Africain (UPOA)",
      location: "Dakar, Sénégal",
      thesis: "Conception et réalisation d'un stéthoscope connecté Yoka (IoT médical)",
      desc: "Formation d'excellence : sciences pour l'ingénieur, analyse de signaux physiologiques, gestion et maintenance des parcs d'équipements de diagnostic et de laboratoire."
    },
    {
      period: "2013 — 2016",
      degree: "Licence Informatique & Électronique Industrielle",
      institution: "Institut Supérieur de Technologies Industrielles (IPG-ISTI)",
      location: "Dakar, Sénégal",
      thesis: "Étude et réalisation d'un oxymètre de pouls connecté à Android",
      desc: "Maintenance industrielle, programmation d'automates industriels (API), instrumentation électronique et interfaçage matériel-logiciel embarqué."
    },
    {
      period: "2013",
      degree: "Baccalauréat Technique Série E (Mathématiques & Technologie)",
      institution: "Lycée Technique 5 Février 1979",
      location: "Brazzaville, Congo",
      thesis: "Excellence scientifique et technologique",
      desc: "Filière d'élite axée sur les mathématiques supérieures, la physique-chimie appliquée et les sciences de l'ingénieur."
    }
  ],
  skillsList: [
    { name: "Microscopes LEICA & Ophtalmologie", level: 98, category: "Haute Précision" },
    { name: "Maintenance Équipements Médicaux", level: 99, category: "Génie Biomédical" },
    { name: "Pilotage de Projets (Banque Mondiale/GIZ)", level: 95, category: "Project Management" },
    { name: "GMAO & Digitalisation de Parcs", level: 96, category: "Systèmes d'Info Santé" },
    { name: "Électronique Industrielle & IoT Médical", level: 94, category: "Instrumentation" },
    { name: "Audit Qualité & Norme ISO 9001:2015", level: 92, category: "Qualité & SMQ" },
    { name: "Sécurité CHSST & Norme ISO 45001", level: 93, category: "HSE & Réglementation" },
    { name: "Biologie Médicale & Automates de Labo", level: 95, category: "Technologies Cliniques" }
  ],
  radarMetrics: [
    { label: "Génie Biomédical", value: 99 },
    { label: "Microscopes Leica", value: 98 },
    { label: "Gestion Projets Santé", value: 95 },
    { label: "GMAO & Data Parc", value: 96 },
    { label: "Qualité ISO 9001/45001", value: 93 },
    { label: "Électronique & IoT", value: 94 }
  ]
};

// ==========================================
// 3. COMPOSANT TEXTURE DE BRUIT ANALOGIQUE
// ==========================================
export const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.038] mix-blend-overlay">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// ==========================================
// 4. ICÔNES SVG SUR-MESURE ULTRA-LÉGÈRES
// ==========================================
const Icon = ({ name, className = "w-4 h-4", style }) => {
  switch (name) {
    case 'arrow-up-right':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      );
    case 'activity':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      );
    case 'award':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      );
    case 'shield-check':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      );
    case 'mail':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      );
    case 'phone':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      );
    case 'map-pin':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      );
    case 'download':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      );
    case 'check':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      );
    default:
      return null;
  }
};

// ==========================================
// 5. RADAR COMPUTATIONNEL SVG INTERACTIF
// ==========================================
const ComputationalRadar = ({ metrics, accentColor, textColor, surfaceColor }) => {
  const size = 320;
  const center = size / 2;
  const radius = 105;
  const count = metrics.length;

  const points = useMemo(() => {
    return metrics.map((m, i) => {
      const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
      const r = (m.value / 100) * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
        labelX: center + (radius + 28) * Math.cos(angle),
        labelY: center + (radius + 18) * Math.sin(angle),
        angle,
        ...m
      };
    });
  }, [metrics, count, center, radius]);

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {[0.25, 0.5, 0.75, 1].map((scale, idx) => (
          <circle
            key={idx}
            cx={center}
            cy={center}
            r={radius * scale}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeDasharray={scale === 1 ? "none" : "3,3"}
          />
        ))}

        {points.map((p, idx) => (
          <line
            key={idx}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(p.angle)}
            y2={center + radius * Math.sin(p.angle)}
            stroke="currentColor"
            strokeOpacity="0.15"
          />
        ))}

        <polygon
          points={polygonPath}
          fill={accentColor}
          fillOpacity="0.22"
          stroke={accentColor}
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {points.map((p, idx) => (
          <g key={idx} className="group cursor-pointer">
            <circle
              cx={p.x}
              cy={p.y}
              r="4.5"
              fill={surfaceColor}
              stroke={accentColor}
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:scale-150"
            />
            <text
              x={p.labelX}
              y={p.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-mono tracking-wider transition-colors duration-300 group-hover:font-bold"
              fill="currentColor"
              opacity="0.85"
            >
              {p.label} ({p.value}%)
            </text>
          </g>
        ))}
      </svg>
      <div className="text-[11px] font-mono opacity-50 text-center mt-3">
        FIG. 01 — Empreinte computationnelle d'expertise biomédicale
      </div>
    </div>
  );
};

// ==========================================
// 6. JAUGE CIRCULAIRE AVEC ANIMATION PHYSIQUE
// ==========================================
const CircularGauge = ({ skill, accentColor, isVisible }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (skill.level / 100) * circumference;

  return (
    <div className="flex items-center space-x-3 p-3.5 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-current/10">
      <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={accentColor}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? strokeOffset : circumference}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute font-mono text-[11px] font-semibold">
          {skill.level}%
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-xs sm:text-sm truncate tracking-tight">{skill.name}</div>
        <div className="text-[10px] font-mono opacity-55 uppercase tracking-wider">{skill.category}</div>
      </div>
    </div>
  );
};

// ==========================================
// 7. COMPOSANT PRINCIPAL AUTONOME (App.jsx)
// ==========================================
export default function App() {
  const [currentPresetKey, setCurrentPresetKey] = useState('B'); // Nocturne Prestige par défaut
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedExp, setExpandedExp] = useState('technologies-services-specialiste');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const theme = PRESETS[currentPresetKey];
  const containerRef = useRef(null);

  // Détection du scroll pour la Navbar capsule flottante
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 60);

      const sections = ['hero', 'manifesto', 'credentials', 'experience', 'skills', 'education', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Moteur d'Animation GSAP avec GSAP Context et ScrollTrigger
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const gsapInstance = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (gsapInstance && ScrollTrigger) {
      gsapInstance.registerPlugin(ScrollTrigger);
      const ctx = gsapInstance.context(() => {
        gsapInstance.from(".reveal-element", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reveal-container",
            start: "top 85%",
          }
        });

        gsapInstance.from(".timeline-card", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#experience",
            start: "top 75%",
          }
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [currentPresetKey]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen transition-colors duration-700 select-none md:select-text"
      style={{
        backgroundColor: theme.canvasBg,
        color: theme.canvasText,
        fontFamily: theme.fontTitle,
      }}
    >
      {/* 1. Grain Overlay Anti-Banding Global */}
      <GrainOverlay />

      {/* 2. Floating Capsule Navbar */}
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-[94%] max-w-4xl ${
          isScrolled
            ? 'py-2.5 px-5 rounded-full shadow-2xl backdrop-blur-xl border'
            : 'py-4 px-6 rounded-full border border-transparent'
        }`}
        style={{
          backgroundColor: isScrolled
            ? theme.isDark ? 'rgba(24, 24, 27, 0.75)' : 'rgba(255, 255, 255, 0.85)'
            : 'transparent',
          borderColor: isScrolled ? theme.surfaceBorder : 'transparent',
          boxShadow: isScrolled ? `0 20px 40px -15px ${theme.accentLight}` : 'none'
        }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center space-x-3 text-left focus:outline-none group"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: theme.accent,
                color: theme.isDark ? '#000000' : '#FFFFFF'
              }}
            >
              GM
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold tracking-tight block">Glad Moukouiri</span>
              <span className="text-[10px] font-mono opacity-50 block uppercase tracking-wider">Ingénieur Biomédical</span>
            </div>
          </button>

          {/* Liens de navigation */}
          <nav className="hidden md:flex items-center space-x-1 font-mono text-xs">
            {[
              { id: 'manifesto', label: 'Manifeste' },
              { id: 'credentials', label: 'Habilitations' },
              { id: 'experience', label: 'Projets' },
              { id: 'skills', label: 'Expertise' },
              { id: 'education', label: 'Formation' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'font-bold' : 'opacity-65 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? theme.accentLight : 'transparent',
                    color: isActive ? theme.accent : 'inherit'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Sélecteur de Presets & CTA */}
          <div className="flex items-center space-x-2">
            <div className="flex bg-black/10 dark:bg-white/10 p-0.5 rounded-full border border-current/10">
              {Object.keys(PRESETS).map((key) => {
                const isSelected = currentPresetKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setCurrentPresetKey(key)}
                    title={`${PRESETS[key].name} — ${PRESETS[key].subtitle}`}
                    className={`w-7 h-7 rounded-full text-[11px] font-mono font-bold transition-all duration-300 ${
                      isSelected ? 'shadow-md scale-105' : 'opacity-40 hover:opacity-80'
                    }`}
                    style={{
                      backgroundColor: isSelected ? theme.accent : 'transparent',
                      color: isSelected ? (theme.isDark ? '#000' : '#fff') : 'currentColor'
                    }}
                  >
                    {key}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowContactModal(true)}
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 transform active:scale-95 shadow-md flex items-center space-x-1.5"
              style={{
                backgroundColor: theme.accent,
                color: theme.isDark ? '#0F0F13' : '#FFFFFF',
              }}
            >
              <span>Contacter</span>
              <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO CINÉMATOGRAPHIQUE */}
      <section
        id="hero"
        className="min-h-[100dvh] flex flex-col justify-center items-center text-center px-6 pt-28 pb-16 relative overflow-hidden"
      >
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 -z-10 transition-colors duration-1000"
          style={{ backgroundColor: theme.accent }}
        />

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Avatar circulaire de prestige */}
          <div className="relative mb-6 group cursor-pointer">
            <div
              className="w-24 h-24 md:w-28 md:h-28 rounded-full p-1 transition-transform duration-500 group-hover:scale-105"
              style={{
                boxShadow: `0 0 40px ${theme.accentLight}`,
                border: `2px solid ${theme.accent}`
              }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-500 overflow-hidden relative"
                style={{
                  backgroundColor: theme.surface,
                  fontFamily: theme.fontDisplay
                }}
              >
                <span className="italic" style={{ color: theme.accent }}>GM</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
            {/* Badge de disponibilité pulse */}
            <div className="absolute bottom-0 right-1 flex items-center justify-center">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-black"></span>
              </span>
            </div>
          </div>

          {/* Titre titanesque */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.94] max-w-5xl"
            style={{ fontFamily: theme.fontTitle }}
          >
            {PROFILE.name.toUpperCase()}
          </h1>

          {/* Sous-titre en Serif Italique */}
          <h2
            className="text-xl sm:text-2xl md:text-4xl italic font-normal mt-4 transition-colors duration-500 max-w-3xl"
            style={{
              fontFamily: theme.fontDisplay,
              color: theme.accent
            }}
          >
            {PROFILE.role}
          </h2>

          <p className="text-xs sm:text-sm font-mono opacity-70 mt-2 max-w-2xl">
            {PROFILE.subRole}
          </p>

          {/* Ruban de métadonnées en Monospace */}
          <div
            className="mt-8 px-4 py-2 rounded-full border text-xs sm:text-sm font-mono tracking-wide flex items-center space-x-3 backdrop-blur-md flex-wrap justify-center gap-y-2"
            style={{
              backgroundColor: theme.surfaceSubtle,
              borderColor: theme.surfaceBorder
            }}
          >
            <span>[{PROFILE.experienceYears}+ Années d'Expérience]</span>
            <span className="opacity-30">•</span>
            <span>[{PROFILE.location}]</span>
            <span className="opacity-30">•</span>
            <span className="text-emerald-500 font-semibold flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              Projets Internationaux
            </span>
          </div>

          {/* Double CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('experience')}
              className="px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-xl flex items-center space-x-2.5"
              style={{
                backgroundColor: theme.accent,
                color: theme.isDark ? '#000000' : '#FFFFFF'
              }}
            >
              <span>Consulter les Projets Clés</span>
              <Icon name="arrow-up-right" className="w-4 h-4" />
            </button>

            <button
              onClick={() => window.print()}
              className="px-8 py-4 rounded-full font-mono text-xs tracking-wider uppercase border transition-all duration-300 hover:scale-[1.02] flex items-center space-x-2"
              style={{
                backgroundColor: theme.surfaceSubtle,
                borderColor: theme.surfaceBorder,
                color: 'currentColor'
              }}
            >
              <Icon name="download" className="w-3.5 h-3.5" />
              <span>Imprimer le CV / PDF</span>
            </button>
          </div>

          {/* Métriques d'impact réelles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-full max-w-4xl pt-10 border-t border-current/10 font-mono">
            {PROFILE.stats.map((stat, i) => (
              <div key={i} className="text-center p-3">
                <div
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ color: theme.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-semibold mt-1 uppercase tracking-wider">{stat.label}</div>
                <div className="text-[10px] opacity-50 mt-0.5">{stat.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LE MANIFESTE (GRILLE ASYMÉTRIQUE 2 COLONNES) */}
      <section
        id="manifesto"
        className="py-24 px-6 md:px-12 max-w-6xl mx-auto reveal-container"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span
              className="font-mono text-xs uppercase tracking-widest block font-bold"
              style={{ color: theme.accent }}
            >
              // 01. VISION & ENGAGEMENT
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.05]"
              style={{ fontFamily: theme.fontDisplay }}
            >
              L'ingénierie au service de la <span className="italic" style={{ color: theme.accent }}>vie humaine</span>.
            </h2>
            <div className="pt-4">
              <div
                className="w-16 h-1 rounded-full"
                style={{ backgroundColor: theme.accent }}
              />
            </div>
            <div className="font-mono text-xs opacity-60 leading-relaxed pt-2">
              "L'équipement biomédical n'admet aucun compromis : chaque micro-calibrage garantit la sécurité du praticien et la survie du patient."
            </div>
          </div>

          <div
            className="lg:col-span-7 border-t lg:border-t-0 lg:border-l pl-0 lg:pl-10 pt-8 lg:pt-0 space-y-6"
            style={{ borderColor: `${theme.accent}33` }}
          >
            <p className="text-lg md:text-2xl leading-relaxed font-light">
              {PROFILE.manifesto.lead}
            </p>

            <p className="text-sm md:text-base leading-relaxed opacity-75">
              {PROFILE.manifesto.body}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {PROFILE.manifesto.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: theme.surfaceSubtle,
                    borderColor: theme.surfaceBorder
                  }}
                >
                  <div className="font-mono text-xs font-bold mb-2" style={{ color: theme.accent }}>
                    0{idx + 1}.
                  </div>
                  <h4 className="font-bold text-sm mb-1">{pillar.title}</h4>
                  <p className="text-xs opacity-70 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CERTIFICATIONS & HABILITATIONS */}
      <section
        id="credentials"
        className="py-16 px-6 md:px-12 max-w-6xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span
            className="font-mono text-xs uppercase tracking-widest block font-bold"
            style={{ color: theme.accent }}
          >
            // ACCRÉDITATIONS D'EXCELLENCE
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: theme.fontTitle }}
          >
            Habilitations Spécialisées & Normes ISO
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROFILE.credentials.map((cred, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.surfaceBorder
              }}
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: theme.accentLight, color: theme.accent }}
              >
                <Icon name="shield-check" className="w-5 h-5" />
              </div>
              <div className="font-mono text-[11px] font-bold opacity-60 uppercase mb-1">{cred.issuer}</div>
              <h3 className="text-lg font-bold mb-2">{cred.title}</h3>
              <p className="text-xs opacity-70 leading-relaxed">{cred.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TIMELINE D'EXPÉRIENCE VIVANTE */}
      <section
        id="experience"
        className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span
            className="font-mono text-xs uppercase tracking-widest block font-bold"
            style={{ color: theme.accent }}
          >
            // 02. PARCOURS & PROJETS D'ENVERGURE
          </span>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: theme.fontTitle }}
          >
            Responsabilités & Déploiements Critiques
          </h2>
          <p className="text-sm opacity-60">
            De la maintenance chirurgicale de précision au pilotage de programmes hospitaliers nationaux.
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 opacity-25"
            style={{ backgroundColor: theme.accent }}
          />

          <div className="space-y-12">
            {PROFILE.experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const isSelected = expandedExp === exp.id;

              return (
                <div
                  key={exp.id}
                  className={`timeline-card relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full items-center justify-center z-10 transition-all duration-300"
                    style={{
                      backgroundColor: theme.accent,
                      boxShadow: `0 0 0 6px ${theme.accentLight}`
                    }}
                  />

                  <div className="hidden md:block w-1/2 px-8" />

                  <div className="w-full md:w-1/2 px-0 md:px-8">
                    <div
                      onClick={() => setExpandedExp(exp.id)}
                      className="cursor-pointer p-8 rounded-[2.5rem] border backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl group"
                      style={{
                        backgroundColor: isSelected ? theme.surface : theme.surfaceSubtle,
                        borderColor: isSelected ? theme.accent : theme.surfaceBorder,
                        boxShadow: isSelected ? `0 25px 50px -12px ${theme.accentLight}` : 'none'
                      }}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <span
                          className="font-mono text-xs font-bold px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: theme.accentLight,
                            color: theme.accent
                          }}
                        >
                          {exp.period}
                        </span>
                        <span className="font-mono text-xs opacity-50">{exp.location}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:text-current">
                        {exp.role}
                      </h3>

                      <div
                        className="text-sm font-semibold mt-1 italic"
                        style={{ fontFamily: theme.fontDisplay, color: theme.accent }}
                      >
                        {exp.company}
                      </div>

                      <p className="text-xs sm:text-sm mt-3 opacity-75 leading-relaxed">
                        {exp.tagline}
                      </p>

                      <div className="mt-5 pt-4 border-t border-current/10 space-y-2">
                        {exp.impact.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start text-xs leading-relaxed opacity-85">
                            <span
                              className="mr-2 font-bold select-none"
                              style={{ color: theme.accent }}
                            >
                              ▸
                            </span>
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-6">
                        {exp.skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="font-mono text-[10px] px-2.5 py-1 rounded-lg border"
                            style={{
                              borderColor: theme.surfaceBorder,
                              backgroundColor: theme.surfaceSubtle
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. VISUALISEUR DE COMPÉTENCES DASHBOARD (RADAR COMPUTATIONNEL) */}
      <section
        id="skills"
        className="py-24 px-6 md:px-12 max-w-6xl mx-auto skills-box"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span
            className="font-mono text-xs uppercase tracking-widest block font-bold"
            style={{ color: theme.accent }}
          >
            // 03. COMPÉTENCES & MAÎTRISE TECHNIQUE
          </span>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: theme.fontTitle }}
          >
            Visualiseur d'aptitudes biomédicales
          </h2>
          <p className="text-sm opacity-60">
            Modélisation computationnelle du profil combinant ingénierie clinique, GMAO, rigueur ISO et gestion de projet.
          </p>
        </div>

        <div
          className="rounded-[3rem] p-8 md:p-12 border backdrop-blur-md shadow-2xl"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.surfaceBorder
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r pb-8 lg:pb-0 lg:pr-8 border-current/10">
              <div className="text-xs font-mono font-bold uppercase tracking-wider mb-2" style={{ color: theme.accent }}>
                Architecture d'Expertise Vectorielle
              </div>
              <ComputationalRadar
                metrics={PROFILE.radarMetrics}
                accentColor={theme.accent}
                textColor={theme.canvasText}
                surfaceColor={theme.surface}
              />
            </div>

            <div className="lg:col-span-6 space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider mb-4" style={{ color: theme.accent }}>
                Niveaux de Maîtrise & Spécialisations
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PROFILE.skillsList.map((skill, sIdx) => (
                  <CircularGauge
                    key={sIdx}
                    skill={skill}
                    accentColor={theme.accent}
                    isVisible={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION FORMATIONS & TITRES ACADÉMIQUES */}
      <section
        id="education"
        className="py-20 px-6 md:px-12 max-w-6xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span
            className="font-mono text-xs uppercase tracking-widest block font-bold"
            style={{ color: theme.accent }}
          >
            // 04. CURSUS & FONDATIONS SCIENTIFIQUES
          </span>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: theme.fontTitle }}
          >
            Parcours Académique & Projets de Recherche
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROFILE.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[2.5rem] border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.surfaceBorder
              }}
            >
              <div>
                <span
                  className="font-mono text-xs font-bold px-3 py-1 rounded-full inline-block mb-3"
                  style={{ backgroundColor: theme.accentLight, color: theme.accent }}
                >
                  {edu.period}
                </span>
                <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                <div className="text-sm font-semibold italic opacity-80" style={{ color: theme.accent }}>
                  {edu.institution}
                </div>
                <div className="text-xs font-mono opacity-50 mb-4">{edu.location}</div>
                <div className="p-3 rounded-xl border text-xs font-mono mb-4" style={{ borderColor: theme.surfaceBorder, backgroundColor: theme.surfaceSubtle }}>
                  <span className="opacity-50 block text-[10px]">Mémoire / Réalisation :</span>
                  <span className="font-semibold">{edu.thesis}</span>
                </div>
                <p className="text-xs opacity-75 leading-relaxed">{edu.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT & FOOTER IMMERSIF */}
      <section
        id="contact"
        className="pt-24 pb-16 px-6 md:px-12 max-w-5xl mx-auto text-center"
      >
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full border text-xs font-mono backdrop-blur-md"
            style={{
              backgroundColor: theme.surfaceSubtle,
              borderColor: theme.surfaceBorder
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold">{PROFILE.status}</span>
          </div>

          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-normal max-w-3xl mx-auto leading-[1.08]"
            style={{ fontFamily: theme.fontDisplay }}
          >
            Bâtissons ensemble une ingénierie de santé <span className="italic" style={{ color: theme.accent }}>irréprochable</span>.
          </h2>

          <p className="text-sm md:text-base opacity-70 max-w-xl mx-auto font-light leading-relaxed">
            Disponible pour des postes de Direction Technique Biomédicale, de Responsable Projets Hospitaliers ou de Lead Maintenance Internationale.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl flex items-center space-x-2"
              style={{
                backgroundColor: theme.accent,
                color: theme.isDark ? '#000' : '#fff'
              }}
            >
              <Icon name="mail" className="w-4 h-4" />
              <span>{PROFILE.email}</span>
            </a>

            <a
              href={`tel:${PROFILE.phone}`}
              className="px-8 py-4 rounded-full border font-mono text-xs tracking-wider uppercase transition-all duration-300 hover:bg-white/5 flex items-center space-x-2"
              style={{ borderColor: theme.surfaceBorder }}
            >
              <Icon name="phone" className="w-3.5 h-3.5" />
              <span>{PROFILE.phone}</span>
            </a>
          </div>

          <div className="pt-16 flex items-center justify-center space-x-8 text-xs font-mono">
            <a
              href={`mailto:${PROFILE.email}`}
              className="relative py-1 group transition-colors duration-300 hover:text-current"
            >
              <span>{PROFILE.email}</span>
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: theme.accent }}
              />
            </a>
            <a
              href={`tel:${PROFILE.phone}`}
              className="relative py-1 group transition-colors duration-300 hover:text-current"
            >
              <span>{PROFILE.phone}</span>
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: theme.accent }}
              />
            </a>
          </div>

          <div className="pt-12 text-[11px] font-mono opacity-40 flex flex-col sm:flex-row items-center justify-between border-t border-current/10">
            <span>© {new Date().getFullYear()} {PROFILE.name} — Ingénieur Biomédical.</span>
            <span className="mt-2 sm:mt-0">Direction Artistique active : {theme.name}</span>
          </div>
        </div>
      </section>

      {/* 8. MODAL DE CONTACT RAPIDE */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div
            className="w-full max-w-lg rounded-[2.5rem] p-8 border shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.surfaceBorder,
              color: theme.canvasText
            }}
          >
            <button
              onClick={() => { setShowContactModal(false); setContactSubmitted(false); }}
              className="absolute top-6 right-6 font-mono text-xs opacity-50 hover:opacity-100 p-2"
            >
              ✕ FERMER
            </button>

            {contactSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div
                  className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
                  style={{ backgroundColor: theme.accentLight, color: theme.accent }}
                >
                  <Icon name="check" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Message Transmis</h3>
                <p className="text-sm opacity-70">
                  Merci pour votre sollicitation. Je reviendrai vers vous dans les meilleurs délais.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold" style={{ color: theme.accent }}>
                    Contact Professionnel Direct
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">Initier une opportunité</h3>
                </div>

                <div>
                  <label className="block text-xs font-mono mb-1.5 opacity-70">Votre Nom / Établissement de Santé</label>
                  <input
                    required
                    placeholder="Ex: Direction des Équipements / Groupe Hospitalier"
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors"
                    style={{
                      backgroundColor: theme.surfaceSubtle,
                      borderColor: theme.surfaceBorder
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono mb-1.5 opacity-70">Email professionnel</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@hopital-ou-groupe.com"
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors"
                    style={{
                      backgroundColor: theme.surfaceSubtle,
                      borderColor: theme.surfaceBorder
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono mb-1.5 opacity-70">Objet / Périmètre du projet biomédical</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Décrivez votre besoin (maintenance parc, installation microscopes, déploiement GMAO, mission projet)..."
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors"
                    style={{
                      backgroundColor: theme.surfaceSubtle,
                      borderColor: theme.surfaceBorder
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.isDark ? '#000' : '#fff'
                  }}
                >
                  Envoyer la Demande
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
