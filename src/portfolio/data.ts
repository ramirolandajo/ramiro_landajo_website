/* ============================================================================
 * Content — from Landajo_Ramiro_CV.pdf.
 *
 * Real except values in [BRACKETS], which are facts the CV does not contain
 * and Ramiro must supply. They render as visible placeholders so they cannot
 * ship by accident.
 *
 * Bilingual strings are { en, es }. Tech names are the same in both.
 * ========================================================================== */

export type Lang = 'en' | 'es'
export type L = { en: string; es: string }
export const t = (v: L, lang: Lang) => v[lang]
export const ls = (v: string | L, lang: Lang) => (typeof v === 'string' ? v : v[lang])

export const identity = {
  name: 'Ramiro Landajo',
  handle: 'ramirolandajo',
  host: 'linux',
  initials: 'RL',
  role: { en: 'Software Developer', es: 'Desarrollador de Software' },
  display: { en: ['RAMIRO', 'LANDAJO'], es: ['RAMIRO', 'LANDAJO'] },
  greeting: { en: "Hello, I'm", es: 'Hola, soy' },
  tagline: {
    en: 'Java · Spring Boot · REST APIs · AWS · React',
    es: 'Java · Spring Boot · APIs REST · AWS · React',
  },
  location: { en: 'Tigre, Buenos Aires', es: 'Tigre, Buenos Aires' },
  country: 'Argentina',
  tz: 'America/Argentina/Buenos_Aires',
  email: 'ramalandajo@gmail.com',
  phone: '+54 11 6681-0500',
  github: 'https://github.com/ramirolandajo',
  linkedin: 'https://linkedin.com/in/ramirolandajo',
  cv: '/Landajo_Ramiro_CV.pdf',
  availability: { en: 'Open to work', es: 'Disponible para trabajar' },
} as const

/* The origin story, cut to what fits a tile. The long version is one click
   away — the previous drafts read as a blog because this was four paragraphs. */
export const story = {
  lede: {
    en: "I'm a software developer from Buenos Aires, with focus on Backend Development. I work mainly with Java and Spring Boot, build REST APIs, and handle SQL and NoSQL databases. I also do frontend with React.js and React Native.",
    es: 'Soy un desarrollador de software de Buenos Aires, con foco en el desarrollo Backend. Trabajo principalmente con Java y Spring Boot, construyo APIs REST y manejo bases de datos SQL y NoSQL. También hago frontend con React.js y algo de React Native.',
  },
  more: [
    {
      en: 'That backend is Java and Spring Boot: REST APIs for internal data and operations, tested and debugged through Postman. Going from the person who felt a broken process to the person who fixed it in code is the most useful thing that has happened to my engineering.',
      es: 'Ese backend es Java y Spring Boot: APIs REST para datos y operaciones internas, probadas y depuradas con Postman. Pasar de ser quien sufría un proceso roto a ser quien lo arreglaba en código es lo más útil que le pasó a mi ingeniería.',
    },
    {
      en: 'In parallel I work at Colegio Santa Teresa — the school I graduated from. Reception first, then substitute English teacher, now systems support. Explaining a network fault to a teacher who does not care how it works is its own kind of technical writing.',
      es: 'En paralelo trabajo en el Colegio Santa Teresa — donde me recibí. Primero recepción, después docente suplente de inglés, ahora soporte de sistemas. Explicarle una falla de red a una docente a la que no le interesa cómo funciona es un tipo propio de escritura técnica.',
    },
  ],
} as const

/* neofetch, but the machine is a person. */
export const fetchLines: { k: string; v: L }[] = [
  { k: 'user', v: { en: 'Ramiro Landajo', es: 'Ramiro Landajo' } },
  { k: 'role', v: { en: 'Backend Developer', es: 'Desarrollador Backend' } },
  { k: 'host', v: { en: 'Tigre, Buenos Aires, AR', es: 'Tigre, Buenos Aires, AR' } },
  { k: 'shell', v: { en: 'Java / Spring Boot', es: 'Java / Spring Boot' } },
  { k: 'uptime', v: { en: '5th year, Informatics Eng.', es: '5.º año, Ing. en Informática' } },
  { k: 'locale', v: { en: 'es_AR · en_C2 (Cambridge)', es: 'es_AR · en_C2 (Cambridge)' } },
  { k: 'status', v: { en: 'open to backend roles', es: 'abierto a posiciones backend' } },
]

/* Authored block-character monogram. Text, not emoji — CLAUDE.md rules out
   glyph-as-icon, and this is deliberately a drawn mark. */
export const monogram = [
  '▄▄▄▄▄   ▄     ',
  '█   █   █     ',
  '█▄▄▄▀   █     ',
  '█  ▀▄   █     ',
  '█   █   █▄▄▄▄ ',
]

export const now = {
  headline: { en: 'Finishing the degree in Software Engineering, looking for the next challenge.', es: 'Terminando la carrera de Ingeniería en Informática, buscando el próximo desafío.' },
  detail: {
    en: 'Fifth year of Software Engineering at UADE. Available for backend or full-stack roles — Buenos Aires, or remote.',
    es: 'Quinto año de Ingeniería en Informática en UADE. Disponible para roles backend o full-stack — Buenos Aires, o remoto.',
  },
} as const

export type Role = {
  id: string
  title: L
  org: string
  period: string
  current: boolean
  track: 'technical' | 'other'
  summary: L
  bullets: L[]
  stack: string[]
  todo?: { label: L; slot: string }[]
}

/* Technical first, then the rest — Ramiro's call. */
export const roles: Role[] = [
  {
    id: 'gardenlife-backend',
    title: { en: 'Java Backend Developer', es: 'Desarrollador BackEnd Java' },
    org: 'GardenLife',
    period: '07/2025 — 02/2026',
    current: false,
    track: 'technical',
    summary: {
      en: 'Internal tooling in Java and Spring Boot, for the company whose order desk I had worked at for five years.',
      es: 'Herramientas internas en Java y Spring Boot, para la empresa en cuyo mostrador de pedidos trabajé cinco años.',
    },
    bullets: [
      { en: 'Developed an internal tool using Java and Spring Boot.', es: 'Desarrollo de herramienta interna utilizando Java y Spring Boot.' },
      { en: 'Implemented REST APIs for internal data management and operations.', es: 'Implementación de APIs REST para gestión de datos y operaciones internas.' },
      { en: 'Tested and debugged features using Postman.', es: 'Pruebas y debugging de funcionalidades utilizando Postman.' },
    ],
    stack: ['Java', 'Spring Boot', 'REST', 'Postman'],
    todo: [
      { label: { en: 'What the tool does', es: 'Qué hace la herramienta' }, slot: '[ADD: one sentence — the process it replaced]' },
      { label: { en: 'Scale', es: 'Escala' }, slot: '[ADD: endpoints · users · records]' },
      { label: { en: 'A decision you argued for', es: 'Una decisión que defendiste' }, slot: '[ADD: chosen vs rejected, and why]' },
    ],
  },
  {
    id: 'santateresa-systems',
    title: { en: 'Systems Support Assistant', es: 'Ayudante de Sistemas' },
    org: 'Colegio Santa Teresa',
    period: '09/2025 — ',
    current: true,
    track: 'technical',
    summary: {
      en: 'Systems support for the staff of the school I graduated from.',
      es: 'Soporte de sistemas para el personal del colegio donde me recibí.',
    },
    bullets: [
      { en: 'Technical support for staff using internal systems and digital tools.', es: 'Soporte técnico a empleados en el uso de sistemas internos y herramientas digitales.' },
      { en: 'Resolution of software, connectivity and application-configuration incidents.', es: 'Resolución de incidencias básicas de software, conectividad y configuración de aplicaciones.' },
      { en: 'Maintenance, updates and configuration of Windows systems and Office.', es: 'Mantenimiento, actualización y configuración de sistemas con Windows y paquete Office.' },
    ],
    stack: ['Windows', 'Office', 'Networking'],
  },
  {
    id: 'gardenlife-support',
    title: { en: 'Customer Service', es: 'Atención al cliente' },
    org: 'GardenLife',
    period: '07/2020 — 06/2025',
    current: false,
    track: 'other',
    summary: {
      en: 'Where the backend work started: I automated the order flow I was stuck inside.',
      es: 'Donde empezó el trabajo backend: automaticé el flujo de pedidos en el que estaba atrapado.',
    },
    bullets: [
      { en: 'Answered queries on catalogue, pricing and product availability.', es: 'Respuesta a consultas sobre catálogo, precios y disponibilidad de productos.' },
      { en: 'Implemented digital tools to improve order flow and inventory tracking.', es: 'Implementación de herramientas digitales para mejorar el flujo de pedidos y seguimiento de inventario.' },
    ],
    stack: [],
  },
  {
    id: 'santateresa-reception',
    title: { en: 'Receptionist / Substitute Teacher', es: 'Recepcionista / Docente Suplente' },
    org: 'Colegio Santa Teresa',
    period: '04/2022 — ',
    current: true,
    track: 'other',
    summary: {
      en: 'Reception and primary-level English teaching.',
      es: 'Recepción y clases de inglés en primaria.',
    },
    bullets: [
      { en: 'Internal and external communication support for the primary school.', es: 'Soporte en comunicación interna y externa en el área de primaria.' },
      { en: 'Taught English at primary level, adapting content across ability levels.', es: 'Dictado de clases de inglés para nivel primario, adaptando contenidos a distintos niveles.' },
      { en: 'Coordinated school events and assisted with administrative work.', es: 'Coordinación de eventos escolares y asistencia en actividades administrativas.' },
    ],
    stack: [],
  },
]

export type StackGroup = { key: string; label: L; items: string[] }

export const stack: StackGroup[] = [
  { key: 'languages', label: { en: 'Languages', es: 'Lenguajes' }, items: ['Java', 'JavaScript', 'SQL', 'Python'] },
  { key: 'frameworks', label: { en: 'Frameworks', es: 'Frameworks' }, items: ['Spring Boot', 'Spring Security', 'JPA/Hibernate', 'React.js', 'React Native', 'Redux'] },
  { key: 'databases', label: { en: 'Databases', es: 'Bases de datos' }, items: ['MySQL', 'SQL Server', 'MongoDB', 'Redis', 'Cassandra'] },
  { key: 'cloud', label: { en: 'Cloud & CI', es: 'Cloud & CI' }, items: ['EC2', 'S3', 'Elastic Beanstalk', 'RDS', 'VPC', 'CloudFront', 'GitHub Actions', 'Terraform'] },
  { key: 'tooling', label: { en: 'Tooling', es: 'Herramientas' }, items: ['Linux', 'Git', 'GitHub', 'Firebase', 'REST', 'Microservices', 'JSON', 'HTML5', 'CSS3'] },
  { key: 'ways', label: { en: 'Ways of working', es: 'Metodologías' }, items: ['Scrum', 'Kanban', 'TDD (basic)'] },
]

export const education = [
  {
    id: 'uade-eng',
    title: { en: 'Informatics Engineering', es: 'Ingeniería en Informática' },
    org: 'Universidad Argentina de la Empresa',
    period: '2022 — 2026',
    state: { en: 'in progress · 5th year', es: 'en curso · 5.º año' },
    current: true,
  },
  {
    id: 'uade-tec',
    title: { en: 'Software Development', es: 'Tecnicatura en Desarrollo de Software' },
    org: 'Universidad Argentina de la Empresa',
    period: '2022 — 2024',
    state: { en: 'completed', es: 'finalizado' },
    current: false,
  },
  {
    id: 'santateresa',
    title: { en: 'Secondary — Exact Sciences', es: 'Bachillerato — Ciencias Exactas' },
    org: 'Colegio Santa Teresa',
    period: '2016 — 2020',
    state: { en: 'completed', es: 'finalizado' },
    current: false,
  },
]

export const certifications = [
  { name: 'Java / SQL', org: 'CoderHouse', detail: { en: 'Microservices, REST APIs, Spring Boot', es: 'Microservicios, API REST, Spring Boot' } },
  { name: { en: 'Application Development', es: 'Desarrollo de Aplicaciones' }, org: 'CoderHouse', detail: { en: 'React Native, Redux, Firebase', es: 'React Native, Redux, Firebase' } },
]

export const languages = [
  { name: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' }, note: { en: 'first language', es: 'lengua materna' } },
  { name: { en: 'English', es: 'Inglés' }, level: 'C2', note: { en: 'Cambridge Proficiency (CPE)', es: 'Cambridge Proficiency (CPE)' } },
]

export const links = [
  { id: 'github', label: 'GitHub', value: 'github.com/ramirolandajo', href: identity.github },
  { id: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/ramirolandajo', href: identity.linkedin },
  { id: 'email', label: { en: 'Email', es: 'Email' }, value: identity.email, href: `mailto:${identity.email}` },
  { id: 'cv', label: { en: 'Résumé', es: 'CV' }, value: 'Landajo_Ramiro_CV.pdf', href: identity.cv },
]

/* ---------------------------------------------------------------------------
 * Expertise — four areas, drawn from the CV's own skill groupings.
 * ------------------------------------------------------------------------- */
export type Area = { id: string; title: L; sub: string; body: L }

export const expertise: Area[] = [
  {
    id: 'backend',
    title: { en: 'Backend Development', es: 'Desarrollo Backend' },
    sub: 'Java · Spring Boot',
    body: {
      en: 'REST APIs with Spring Boot, JPA/Hibernate for persistence and Spring Security with JWT for auth. Shipped an internal tool at GardenLife on this stack.',
      es: 'APIs REST con Spring Boot, JPA/Hibernate para persistencia y Spring Security con JWT para autenticación. Con este stack construí una herramienta interna en GardenLife.',
    },
  },
  {
    id: 'data',
    title: { en: 'Data & Persistence', es: 'Datos y Persistencia' },
    sub: 'SQL · NoSQL',
    body: {
      en: 'Relational first — MySQL and SQL Server — and comfortable in MongoDB, Redis and Cassandra when the access pattern asks for something else.',
      es: 'Relacional primero — MySQL y SQL Server — y cómodo con MongoDB, Redis y Cassandra cuando el patrón de acceso pide otra cosa.',
    },
  },
  {
    id: 'cloud',
    title: { en: 'Cloud & Delivery', es: 'Cloud y Delivery' },
    sub: 'AWS · CI/CD',
    body: {
      en: 'EC2, S3, RDS, VPC, CloudFront and Elastic Beanstalk, with GitHub Actions for CI and Terraform for the parts that should not be clicked.',
      es: 'EC2, S3, RDS, VPC, CloudFront y Elastic Beanstalk, con GitHub Actions para CI y Terraform para lo que no debería configurarse a mano.',
    },
  },
  {
    id: 'frontend',
    title: { en: 'Frontend & Mobile', es: 'Frontend y Mobile' },
    sub: 'React · React Native',
    body: {
      en: 'React with Redux on the web and React Native on mobile, plus Firebase. Enough to build the whole thing myself when a project needs it.',
      es: 'React con Redux en web y React Native en mobile, más Firebase. Lo suficiente para construir todo yo mismo cuando un proyecto lo pide.',
    },
  },
]

/* ---------------------------------------------------------------------------
 * Project slots.
 *
 * Deliberately EMPTY. Ramiro's CV names no projects, and inventing them would
 * be the worst possible thing to put in front of a recruiter. Each slot states
 * exactly what belongs in it; the bento is sized so the real cards will drop
 * straight in.
 * ------------------------------------------------------------------------- */
export type Slot = { n: string; span: string; hint: L; fields: L }

export const projectSlots: Slot[] = [
  {
    n: '01',
    span: 'md:col-span-2 md:row-span-2',
    hint: {
      en: 'Your strongest project. The one you would happily be interviewed about for an hour.',
      es: 'Tu proyecto más fuerte. Del que te entrevistarían una hora y disfrutarías.',
    },
    fields: {
      en: 'name · stack · what it does · one architecture decision · repo or demo · a screenshot',
      es: 'nombre · stack · qué hace · una decisión de arquitectura · repo o demo · una captura',
    },
  },
  {
    n: '02',
    span: 'md:col-span-2',
    hint: {
      en: 'The GardenLife internal tool — Spring Boot, REST APIs, Postman.',
      es: 'La herramienta interna de GardenLife — Spring Boot, APIs REST, Postman.',
    },
    fields: { en: 'what it replaced · endpoints · who uses it', es: 'qué reemplazó · endpoints · quién la usa' },
  },
  {
    n: '03',
    span: '',
    hint: { en: 'University coursework worth showing — OS, compilers, distributed systems.', es: 'Trabajo de facultad que valga mostrar — SO, compiladores, sistemas distribuidos.' },
    fields: { en: 'course · language · the hard part', es: 'materia · lenguaje · la parte difícil' },
  },
  {
    n: '04',
    span: '',
    hint: { en: 'Anything you built for yourself. Small is fine — finished is what counts.', es: 'Algo que hayas hecho para vos. Chico está bien — terminado es lo que cuenta.' },
    fields: { en: 'why you built it · stack · link', es: 'por qué lo hiciste · stack · link' },
  },
]

export const projectsIntro = {
  title: { en: 'Projects', es: 'Proyectos' },
  lede: {
    en: 'Four slots, waiting for real work. Nothing invented goes here — a recruiter can tell, and so can you.',
    es: 'Cuatro espacios, esperando trabajo real. Acá no va nada inventado — un recruiter se da cuenta, y vos también.',
  },
} as const

/* ---------------------------------------------------------------------------
 * Contact form. Submits by composing a mailto: — no backend, no signup, works
 * the moment this deploys.
 * ------------------------------------------------------------------------- */
export const form = {
  title: { en: 'Send me a message', es: 'Mandame un mensaje' },
  lede: {
    en: 'This composes an email in your own mail app — nothing is sent through a third party.',
    es: 'Esto redacta un mail en tu propia aplicación — nada pasa por un tercero.',
  },
  name: { en: 'Your name', es: 'Tu nombre' },
  email: { en: 'Your email', es: 'Tu email' },
  subject: { en: 'Subject', es: 'Asunto' },
  message: { en: 'Message', es: 'Mensaje' },
  send: { en: 'Compose email', es: 'Redactar mail' },
  sending: { en: 'Opening your mail app…', es: 'Abriendo tu aplicación de mail…' },
  fallback: {
    en: 'Mail app did not open? Copy the address instead.',
    es: '¿No se abrió? Copiá la dirección.',
  },
  errName: { en: 'Please tell me your name.', es: 'Decime tu nombre.' },
  errEmail: { en: 'That does not look like an email address.', es: 'Eso no parece una dirección de mail.' },
  errMessage: { en: 'Add a message so I know what this is about.', es: 'Escribí un mensaje así sé de qué se trata.' },
} as const

export const nav = [
  { id: 'home', n: '01', en: 'home', es: 'inicio' },
  { id: 'expertise', n: '02', en: 'expertise', es: 'skills' },
  { id: 'experience', n: '03', en: 'experience', es: 'experiencia' },
  { id: 'projects', n: '04', en: 'projects', es: 'proyectos' },
  { id: 'shell', n: '05', en: 'shell', es: 'consola' },
  { id: 'contact', n: '06', en: 'contact', es: 'contacto' },
]
