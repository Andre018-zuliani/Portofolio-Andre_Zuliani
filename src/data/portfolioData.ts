export enum ProjectCategory {
  ALL = 'all',
  DESIGN = 'design',
  AI = 'ai',
  DEV = 'dev',
}

export enum CredentialCategory {
  ALL = 'all',
  AI_CLOUD = 'ai_cloud',
  DEV_QA_NET = 'dev_qa_net',
  DESIGN_LEAD = 'design_lead',
}

export type DocumentKey = 'cv' | 'cv_pm' | 'portfolio' | 'certificate';

export interface ProjectLiveLink {
  label: string;
  url: string;
  embedUrl?: string;
  kind: 'webapp' | 'vr' | 'deck';
  note?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory.DESIGN | ProjectCategory.AI | ProjectCategory.DEV;
  categoryLabel: string;
  emoji: string;
  role: string;
  organization: string;
  year: string;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  tools: string[];
  liveLinks?: ProjectLiveLink[];
  documentRef?: DocumentKey;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  emoji: string;
  theme: 'pink' | 'purple' | 'tosca';
  summary: string;
  achievements: string[];
  metrics: string;
  links?: { label: string; url: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  badge: string;
  details: string;
  link?: { label: string; url: string };
}

export interface CertificatePageImage {
  label: string;
  imageUrl: string;
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  scoreOrDetail: string;
  emoji: string;
  theme: 'pink' | 'purple' | 'tosca';
  category:
    | CredentialCategory.AI_CLOUD
    | CredentialCategory.DEV_QA_NET
    | CredentialCategory.DESIGN_LEAD;
  pages?: CertificatePageImage[];
  pdfUrl?: string;
  downloadFileName: string;
}

export interface DocumentAsset {
  id: DocumentKey;
  title: string;
  subtitle: string;
  url: string;
  downloadFileName: string;
  emoji: string;
}

const ASSET_BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const assetPath = (file: string) => `${ASSET_BASE}/assets/aistudio/${file}`;

export const PROFILE_DATA = {
  name: 'Andre Zuliani',
  shortName: 'Andre',
  location: 'Kota Tangerang, Banten',
  email: 'Andresyarief7@gmail.com',
  phone: '+62 877-7157-2075',
  whatsappNumber: '6287771572075',
  linkedin: 'https://linkedin.com/in/andre-zuliani',
  linkedinHandle: 'linkedin.com/in/andre-zuliani',
  github: 'https://github.com/Andre018-zuliani',
  githubHandle: 'github.com/Andre018-zuliani',
  headlineNavy: 'Saya mengubah ide rumit',
  headlinePurple: 'jadi karya digital yang teruji.',
  leadBio:
    'Lulusan Cum Laude Teknik Informatika (IPK 3.78/4.00) yang memadukan ketelitian Quality Assurance, eksplorasi AI & Data, perancangan pengalaman imersif VR/UI, serta pengembangan aplikasi modern.',
};

export const HERO_METRICS = [
  {
    value: '3.78 / 4.00',
    label: 'IPK Cum Laude Teknik Informatika IT-PLN',
  },
  {
    value: 'Juara 1',
    label: 'Hackathon Final Project Alkademi MAIN 2026',
  },
  {
    value: '16 Lisensi',
    label: 'Microsoft AI, MOS, BNSP, MTCNA, Certiport & RevoU',
  },
  {
    value: '35+ Tim',
    label: 'Stakeholder IT, Vendor & Bisnis di PT Pegadaian',
  },
];

export const CATEGORY_PILLARS = [
  {
    id: ProjectCategory.DESIGN,
    title: 'Desain, VR & Produk',
    emoji: '🎨',
    clayClass: 'clay-card-pink',
    description:
      'Merancang tur virtual 360° interaktif, desain antarmuka mobile, serta alur produk Scrum dari tahap UI/UX hingga UAT.',
    meta: 'Theasys VR · Desain Mobile · Agile Scrum',
  },
  {
    id: ProjectCategory.AI,
    title: 'AI & Data Kreatif',
    emoji: '🤖',
    clayClass: 'clay-card-purple',
    description:
      'Membangun aplikasi pengenalan bahasa isyarat real-time dan analitik belasan ribu proyek berbasis solusi Azure AI tersertifikasi.',
    meta: 'Azure AI-102 · Machine Learning · Analitik Data',
  },
  {
    id: ProjectCategory.DEV,
    title: 'Dev & QA Engineer',
    emoji: '💻',
    clayClass: 'clay-card-tosca',
    description:
      'Mengembangkan aplikasi web pemenang hackathon, portal riset VR, serta menguji keandalan sistem memakai Cypress, Playwright, dan K6.',
    meta: 'React · Go · Playwright · Cypress · K6',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'hackathon-main-2026',
    title: 'Lukla Operations Engine — Juara Hackathon MAIN 2026',
    subtitle: 'Platform Operasional Pabrik Garmen Modern Berbasis Web',
    category: ProjectCategory.DEV,
    categoryLabel: 'Dev & QA',
    emoji: '🏆',
    role: 'QA & Product Engineer (Juara 1)',
    organization: 'Alkademi Foundation — MAIN Phase 3',
    year: '2026',
    summary:
      'Platform digital pemantauan alur produksi, inventaris, dan kendali mutu pabrik garmen secara terpadu yang berhasil meraih predikat Juara Hackathon Final Project Pelatihan Fase 3 MAIN 2026.',
    problem:
      'Pencatatan operasional lini produksi garmen yang terpisah-pisah menyulitkan pemantauan kapasitas mesin, pelacakan progres pesanan, serta pengawasan kualitas secara real-time.',
    solution:
      'Merancang, membangun, dan menguji aplikasi web Lukla Operations Engine secara menyeluruh dalam sprint intensif 1 minggu (12–16 Oktober 2026) dengan fokus pada keandalan alur kerja operasional dan kualitas teknis.',
    highlights: [
      'Meraih predikat Juara Hackathon Final Project pada Pelatihan Fase 3: Project Based Learning Alkademi MAIN 2026.',
      'Mencatatkan skor Asesmen Teknis tertinggi 93/100 dan nilai Proyek Akhir Hackathon 88/100.',
      'Menghadirkan antarmuka pemantauan operasional pabrik yang bersih, responsif, dan siap diakses langsung melalui peramban.',
    ],
    metrics: [
      { value: 'Juara 1', label: 'Hackathon MAIN 2026' },
      { value: '93 / 100', label: 'Skor Asesmen Teknis' },
      { value: '88 / 100', label: 'Nilai Proyek Akhir' },
    ],
    tools: ['Web Application', 'Quality Assurance', 'Operational Dashboard', 'End-to-End Testing', 'Vercel'],
    liveLinks: [
      {
        label: 'Aplikasi Live (Lukla Operations Engine)',
        url: 'https://project-loe5.vercel.app/',
        embedUrl: 'https://project-loe5.vercel.app/',
        kind: 'webapp',
      },
    ],
    documentRef: 'certificate',
  },
  {
    id: 'sila-sign-language',
    title: 'SiLa — Pengenalan Bahasa Isyarat AI',
    subtitle: 'Aplikasi Web Real-Time untuk Anak Berkebutuhan Khusus',
    category: ProjectCategory.AI,
    categoryLabel: 'AI & Data',
    emoji: '🤖',
    role: 'Front-End & ML Integration',
    organization: 'DBS Coding Camp x Dicoding',
    year: '2025',
    summary:
      'Platform web interaktif yang menerjemahkan gerakan bahasa isyarat secara langsung melalui kamera serta menyajikan kamus pembelajaran inklusif bagi anak-anak.',
    problem:
      'Media belajar bahasa isyarat konvensional cenderung satu arah dan belum memberikan umpan balik visual instan saat anak mempraktikkan gerakan tangan.',
    solution:
      'Membangun antarmuka React JS yang responsif dan ramah anak, serta mengoordinasikan integrasi pipeline model Machine Learning ke front-end agar prediksi gerakan tampil akurat secara real-time.',
    highlights: [
      'Menjembatani kolaborasi teknis antara tim Front-End dan tim Machine Learning dalam tim beranggotakan 6 orang.',
      'Menyajikan fitur deteksi kamera langsung dan materi belajar interaktif pada aplikasi web terpublikasi.',
      'Dirancang khusus dengan tata letak visual yang jelas dan mudah dipahami anak berkebutuhan khusus.',
    ],
    metrics: [
      { value: 'Real-Time', label: 'Inferensi Kamera Web' },
      { value: '6 Anggota', label: 'Kolaborasi Lintas Disiplin' },
      { value: 'Live App', label: 'Terpublikasi di Vercel' },
    ],
    tools: ['React JS', 'JavaScript', 'Machine Learning API', 'WebRTC Camera', 'Responsive UI'],
    liveLinks: [
      {
        label: 'Aplikasi Web SiLa (Live)',
        url: 'https://sila-signlanguage.vercel.app/',
        embedUrl: 'https://sila-signlanguage.vercel.app/',
        kind: 'webapp',
        note: 'Untuk mencoba fitur kamera deteksi langsung secara optimal, Anda juga dapat membukanya di tab baru.',
      },
    ],
    documentRef: 'portfolio',
  },
  {
    id: 'virtual-tour-pln',
    title: 'Virtual Tour 360° Lab Hubung Singkat',
    subtitle: 'Aplikasi VR Pelatihan Imersif Pusat Sertifikasi PT PLN (Persero)',
    category: ProjectCategory.DESIGN,
    categoryLabel: 'Desain & VR',
    emoji: '🎨',
    role: 'VR Designer & Developer',
    organization: 'IT-PLN x Pusertif PT PLN',
    year: '2024 – 2025',
    summary:
      'Perancangan aplikasi tur virtual interaktif 360° menggunakan Theasys untuk memvisualisasikan prosedur tata kelola peralatan pengujian di Laboratorium Hubung Singkat PT PLN (Persero).',
    problem:
      'Personel baru dan peserta pelatihan membutuhkan pengenalan tata letak serta prosedur keselamatan peralatan tegangan tinggi secara aman sebelum memasuki area laboratorium fisik.',
    solution:
      'Merancang antarmuka navigasi spasial 360° berbasis metode Multimedia Development Lifecycle (MDLC) dan Theasys, dilengkapi hotspot informasi interaktif serta portal web pendukung.',
    highlights: [
      'Meraih skor evaluasi positif 90% langsung dari supervisor riset dan pengembangan.',
      'Menyelesaikan seluruh tahapan desain storyboard, pengambilan panorama 360°, hingga publikasi Theasys dalam tenggat ketat 2 bulan.',
      'Meningkatkan aksesibilitas materi prosedur peralatan laboratorium tanpa risiko paparan langsung di lapangan.',
    ],
    metrics: [
      { value: '90%', label: 'Evaluasi Positif Supervisor' },
      { value: '2 Bulan', label: 'Penyelesaian Tepat Waktu' },
      { value: '360° VR', label: 'Eksplorasi Spasial Theasys' },
    ],
    tools: ['Theasys 360° VR', 'MDLC', 'UI/UX Spasial', 'Interactive Hotspots'],
    liveLinks: [
      {
        label: 'Aplikasi Tur Virtual 360° (Theasys)',
        url: 'https://www.theasys.io/viewer/ljNYPtOBRBkL7CHXQmws26ZJSLKsef/',
        kind: 'vr',
        note: 'Tur panorama 360° Theasys berjalan dalam mode layar penuh mandiri (WebGL/VR) untuk rotasi kamera bebas hambatan.',
      },
      {
        label: 'Portal Web Lab VR IT-PLN',
        url: 'https://yogakusuma18.github.io/labvr/index.html',
        embedUrl: 'https://yogakusuma18.github.io/labvr/index.html',
        kind: 'webapp',
      },
    ],
    documentRef: 'portfolio',
  },
  {
    id: 'kickstarter-analytics',
    title: 'Analisis Kesuksesan Proyek Kickstarter',
    subtitle: 'Strategi Data Analyst pada 14.752 Kampanye Kreator Kanada',
    category: ProjectCategory.AI,
    categoryLabel: 'AI & Data',
    emoji: '📊',
    role: 'Team Leader — Data Analyst (Tim 9 Orang)',
    organization: 'Kampus Merdeka x RevoU',
    year: '2024',
    summary:
      'Kepemimpinan siklus penuh analisis data atas 14.752 proyek dan 1,2 juta+ pendukung (2009–2017) lengkap dengan dek presentasi eksekutif dan rekomendasi peningkatan rasio pendanaan.',
    problem:
      'Rasio keberhasilan kampanye kreator di Kanada tertahan di angka 28%, sehingga dibutuhkan pemetaan kategori dan target pendanaan yang paling optimal berbasis bukti historis.',
    solution:
      'Memimpin 9 anggota lintas fungsi mulai dari perumusan masalah, pembersihan data, eksplorasi statistik, hingga penyusunan dek analitik interaktif bagi pengambil keputusan.',
    highlights: [
      'Menetapkan peta jalan berbasis data untuk menaikkan tingkat keberhasilan kampanye dari 28% menuju target 30%.',
      'Mengidentifikasi kategori Comics sebagai segmen paling tangguh dan stabil dengan rasio keberhasilan 56%.',
      'Meraih nilai akhir 98/100 (Grade A) pada jalur AWS Cloud Data Engineer & Gen AI RevoU.',
    ],
    metrics: [
      { value: '14.752', label: 'Proyek Dianalisis' },
      { value: '1,2 Juta+', label: 'Data Pendukung (Backers)' },
      { value: '56%', label: 'Rasio Sukses Kategori Unggulan' },
    ],
    tools: ['Data Analysis', 'Statistical Insight', 'Interactive Presentation', 'AWS Cloud Data', 'Team Leadership'],
    liveLinks: [
      {
        label: 'Dek Analisis Data Kickstarter (Canva)',
        url: 'https://www.canva.com/design/DAGEoW7C7PU/YruPwr6vG0vSmLzRHSzxGw/edit',
        embedUrl: 'https://www.canva.com/design/DAGEoW7C7PU/YruPwr6vG0vSmLzRHSzxGw/view?embed',
        kind: 'deck',
      },
    ],
    documentRef: 'portfolio',
  },
  {
    id: 'labvr-itpln-web',
    title: 'Portal Web Laboratorium VR IT-PLN',
    subtitle: 'Website Informasi, Riset & Eksplorasi Imersif Proyek Magang',
    category: ProjectCategory.DEV,
    categoryLabel: 'Dev & Web',
    emoji: '🥽',
    role: 'Virtual Reality Web Developer Intern',
    organization: 'Laboratorium Virtual Reality IT-PLN',
    year: '2024',
    summary:
      'Pengembangan situs web resmi Laboratorium Virtual Reality IT-PLN menggunakan metodologi Multimedia Development Lifecycle (MDLC) untuk memperluas akses informasi riset dan karya imersif kampus.',
    problem:
      'Dokumentasi kegiatan riset, fasilitas perangkat VR, dan akses menuju tur virtual laboratorium sebelumnya belum terpusat pada satu portal web yang interaktif dan mudah dijelajahi mahasiswa maupun mitra.',
    solution:
      'Merancang dan mengimplementasikan website responsif berbasis HTML5, CSS3, JavaScript, dan Bootstrap yang menampilkan profil laboratorium, galeri perangkat, serta integrasi proyek tur virtual.',
    highlights: [
      'Dibangun selama program magang riset dan pengembangan di Laboratorium VR IT-PLN (Agustus – November 2024).',
      'Menerapkan tahapan MDLC mulai dari Concept, Design, Material Collecting, Assembly, Testing, hingga Distribution.',
      'Mendapatkan evaluasi positif 90% dari supervisor atas ketepatan eksekusi dalam waktu 2 bulan.',
    ],
    metrics: [
      { value: 'MDLC', label: 'Metodologi Pengembangan' },
      { value: '90%', label: 'Evaluasi Supervisor' },
      { value: 'Live Web', label: 'Terpublikasi di GitHub Pages' },
    ],
    tools: ['HTML5 & CSS3', 'JavaScript', 'Bootstrap', 'PHP', 'MDLC Methodology'],
    liveLinks: [
      {
        label: 'Website Lab VR IT-PLN (Live)',
        url: 'https://yogakusuma18.github.io/labvr/index.html',
        embedUrl: 'https://yogakusuma18.github.io/labvr/index.html',
        kind: 'webapp',
      },
      {
        label: 'Aplikasi Tur Virtual 360° (Theasys)',
        url: 'https://www.theasys.io/viewer/ljNYPtOBRBkL7CHXQmws26ZJSLKsef/',
        kind: 'vr',
      },
    ],
    documentRef: 'portfolio',
  },
  {
    id: 'ayosehat-kotlin',
    title: 'AyoSehat — Aplikasi Mobile Kesehatan Anak',
    subtitle: 'Desain Produk & Aplikasi Android Pencegahan Penyakit Usia Dini',
    category: ProjectCategory.DESIGN,
    categoryLabel: 'Desain & Mobile',
    emoji: '📱',
    role: 'Mobile UI/UX & Kotlin Developer',
    organization: 'Proyek Pemrograman Mobile',
    year: '2024',
    summary:
      'Perancangan antarmuka mobile dan pengembangan aplikasi Kotlin yang menghadirkan edukasi kesehatan terkurasi serta panduan pencegahan penyakit bagi orang tua dengan anak usia 3–5 tahun.',
    problem:
      'Orang tua sering kesulitan memperoleh rujukan pencegahan penyakit balita yang ringkas, terstruktur, dan nyaman dibaca langsung dari perangkat seluler.',
    solution:
      'Merancang alur antarmuka pengguna mobile yang ramah keluarga serta mengimplementasikannya dengan Kotlin untuk mendukung tujuan pembangunan berkelanjutan (SDG 3) bidang kesehatan anak.',
    highlights: [
      'Dokumentasi presentasi produk dan rancangan antarmuka mobile dapat dijelajahi langsung melalui dek interaktif.',
      'Fokus spesifik pada tumbuh kembang dan pencegahan penyakit anak rentang usia emas 3–5 tahun.',
      'Mendukung inisiatif Sustainable Development Goals (SDG 3) terkait kesehatan dan kesejahteraan anak.',
    ],
    metrics: [
      { value: '3–5 Tahun', label: 'Fokus Usia Tumbuh Kembang' },
      { value: 'Kotlin & UI', label: 'Desain & Native Android' },
      { value: 'SDG 3', label: 'Dukungan Kesehatan Anak' },
    ],
    tools: ['Mobile UI/UX', 'Kotlin', 'Android SDK', 'Canva Product Deck', 'Health Architecture'],
    liveLinks: [
      {
        label: 'Presentasi & Desain Aplikasi Mobile (Canva)',
        url: 'https://www.canva.com/design/DAF5voneOxU/JehPP8aSryca_fiJHXzSZw/edit',
        embedUrl: 'https://www.canva.com/design/DAF5voneOxU/JehPP8aSryca_fiJHXzSZw/view?embed',
        kind: 'deck',
      },
    ],
    documentRef: 'portfolio',
  },
  {
    id: 'qa-automation-k6',
    title: 'E-Commerce QA Suite & Uji Performa K6',
    subtitle: 'Otomasi End-to-End Cypress, Playwright POM & Stress Testing',
    category: ProjectCategory.DEV,
    categoryLabel: 'Dev & QA',
    emoji: '🧪',
    role: 'Quality Assurance Engineer',
    organization: 'Alkademi QA Bootcamp',
    year: '2026',
    summary:
      'Rangkaian pengujian kualitas menyeluruh pada aplikasi e-commerce mencakup uji manual terstruktur, otomasi E2E lintas framework, hingga pengujian beban ekstrem 500 Virtual Users.',
    problem:
      'Alur kritis transaksi seperti autentikasi, penyortiran katalog, keranjang belanja, dan checkout rentan terhadap regresi UI serta penurunan performa saat lonjakan trafik.',
    solution:
      'Menyusun 40 skenario uji manual, mengonversi 13 alur utama ke otomasi Cypress dan Playwright berarsitektur Page Object Model (POM) tanpa static wait, serta menguji ketahanan API dengan K6.',
    highlights: [
      'Mencatat 95% pass rate dan mendokumentasikan siklus hidup 37 temuan bug UI terkonfirmasi secara presisi.',
      'Arsitektur Playwright POM dengan auto-waiting assertions yang menjaga stabilitas eksekusi skrip.',
      'Menganalisis p95 latency 185ms (0% error) pada beban normal 100 VU vs degradasi 2.150ms (12.3% error) saat spike 500 VU beserta rekomendasi rate limiting & autoscaling.',
    ],
    metrics: [
      { value: '13 E2E', label: 'Skrip Cypress & Playwright' },
      { value: '500 VU', label: 'Simulasi Stress & Spike K6' },
      { value: '185 ms', label: 'Respon p95 Beban Normal' },
    ],
    tools: ['Playwright (POM)', 'Cypress', 'K6 Load Testing', 'JavaScript', 'Defect Lifecycle'],
    documentRef: 'cv',
  },
  {
    id: 'monev-pegadaian',
    title: 'Alur Produk & Delivery Aplikasi Monev',
    subtitle: 'Perencanaan End-to-End UI/UX hingga UAT di PT Pegadaian',
    category: ProjectCategory.DESIGN,
    categoryLabel: 'Desain & Produk',
    emoji: '🗂️',
    role: 'IT PMO & Scrum Coordinator',
    organization: 'PT Pegadaian (Persero)',
    year: '2026',
    summary:
      'Penataan lini masa dan alur kerja produk aplikasi Monev (pemantauan input perangkat kerja) dari tahap Inception, UI/UX Design, Development, SIT, UAT, hingga Deployment.',
    problem:
      'Koordinasi lintas 20 personel IT, 10 vendor eksternal, dan 5 perwakilan bisnis membutuhkan struktur user story, dokumentasi keputusan, serta pelacakan risiko yang sinkron.',
    solution:
      'Menerapkan kerangka Scrum selama 6 sprint, merumuskan 5 user story inti bersama pemangku kepentingan, dan mengelola lebih dari 50 dokumen Minutes of Meeting (MoM) terstandar.',
    highlights: [
      'Menyelaraskan 35 pemangku kepentingan lintas divisi IT, vendor, dan unit bisnis secara terukur.',
      'Memantau tonggak capaian inisiatif strategis termasuk REST Core, e-Rumah Dinas, MCE/MTE Enhancement, dan SIT Testing.',
      'Memastikan transisi mulus antara fase desain UI/UX menuju pengujian SIT dan UAT.',
    ],
    metrics: [
      { value: '35 Orang', label: 'Stakeholder Dikoordinasikan' },
      { value: '6 Sprint', label: 'Siklus Agile Scrum Monev' },
      { value: '50+ MoM', label: 'Dokumentasi Keputusan & Risiko' },
    ],
    tools: ['Agile Scrum', 'User Story Mapping', 'UI/UX Workflow', 'SIT & UAT', 'Trello', 'Google Workspace'],
    documentRef: 'cv_pm',
  },
  {
    id: 'debian-ecommerce',
    title: 'Platform E-Commerce Full-Stack Debian',
    subtitle: 'Arsitektur Transaksi End-to-End dengan Ekosistem API',
    category: ProjectCategory.DEV,
    categoryLabel: 'Dev & Backend',
    emoji: '💻',
    role: 'Full-Stack Developer',
    organization: 'Lumoshive Golang Bootcamp',
    year: '2025',
    summary:
      'Pembangunan platform e-commerce utuh dari perencanaan skema basis data, keamanan autentikasi, optimasi kueri, hingga integrasi layanan pihak ketiga.',
    problem:
      'Platform belanja modern menuntut ketahanan keamanan transaksi sekaligus koneksi mulus ke layanan penentuan lokasi, ongkos kirim, dan penyimpanan aset awan.',
    solution:
      'Merancang dan mengimplementasikan arsitektur backend berbahasa Go secara kolaboratif dalam tim 3 developer dengan integrasi API lokasi, ekspedisi pengiriman, dan cloud storage.',
    highlights: [
      'Menangani keamanan endpoint, manajemen sesi pengguna, dan performa kueri basis data relasional.',
      'Mengintegrasikan tiga layanan API eksternal utama: geolokasi alamat, kalkulasi kurir pengiriman, dan media cloud.',
      'Menyelesaikan siklus penuh dari perancangan teknis hingga demonstrasi produk akhir.',
    ],
    metrics: [
      { value: '3 API', label: 'Lokasi, Kurir & Cloud Storage' },
      { value: 'End-to-End', label: 'Keamanan & Performa DB' },
      { value: 'Tim 3 Dev', label: 'Kolaborasi Intensif Golang' },
    ],
    tools: ['Go (Golang)', 'RESTful API', 'Database Tuning', 'Cloud Storage', 'Shipping API'],
    documentRef: 'cv_pm',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-alkademi',
    role: 'Quality Assurance Bootcamp Participant & Juara Hackathon',
    company: 'Alkademi Foundation (Program MAIN)',
    location: 'Bandung / Remote',
    period: 'Juli 2026 – Oktober 2026',
    emoji: '🏆',
    theme: 'tosca',
    summary:
      'Menuntaskan program intensif 3 bulan mencakup Manual Testing, Automation Testing (Cypress & Playwright POM), serta Performance Testing (K6), sekaligus meraih predikat Juara Hackathon Final Project Fase 3.',
    achievements: [
      'Juara Hackathon Final Project Pelatihan Fase 3 (12–16 Oktober 2026) pada pengembangan Lukla Operations Engine dengan Nilai Asesmen Teknis 93/100 dan Proyek Akhir 88/100.',
      'Mengonversi suite uji manual menjadi 13 skrip E2E otomatis di Cypress dan Playwright dengan pola Page Object Model.',
      'Menjalankan uji Load (100 VU), Stress (500 VU), dan Spike (500 VU) dengan K6 serta menyusun laporan analisis akar masalah.',
    ],
    metrics: 'Skor Teknis 93 · 13 Skrip E2E · 500 VU K6',
    links: [
      {
        label: 'Lihat Proyek Hackathon Live',
        url: 'https://project-loe5.vercel.app/',
      },
    ],
  },
  {
    id: 'exp-pegadaian',
    role: 'IT Project Management Office (PMO) Intern',
    company: 'PT Pegadaian (Persero)',
    location: 'Jakarta, Indonesia',
    period: 'Januari 2026 – Juni 2026',
    emoji: '📋',
    theme: 'pink',
    summary:
      'Memantau progres proyek strategis TI dan menyusun jadwal kerja end-to-end mulai dari Inception, UI/UX Design, Development, SIT, UAT, hingga Deployment.',
    achievements: [
      'Mengoordinasikan 35 stakeholder (20 IT, 10 vendor, 5 bisnis) dalam 6 sprint Scrum pada pengembangan aplikasi Monev.',
      'Mengelola lebih dari 50 dokumen Minutes of Meeting (MoM) untuk memastikan keputusan, risiko, dan tindak lanjut terdokumentasi utuh.',
      'Mengawal milestone inisiatif strategis REST Core, e-Rumah Dinas, MCE/MTE Enhancement, AWS Deployment, dan SIT Testing.',
    ],
    metrics: '35 Stakeholder · 6 Scrum Sprint · 50+ MoM',
  },
  {
    id: 'exp-vrlab',
    role: 'Virtual Reality Development Intern',
    company: 'Laboratorium Virtual Reality IT-PLN',
    location: 'Jakarta Barat',
    period: 'Agustus 2024 – November 2024',
    emoji: '🥽',
    theme: 'purple',
    summary:
      'Mengembangkan portal web laboratorium VR dan proyek tur virtual interaktif menggunakan metodologi Multimedia Development Lifecycle (MDLC).',
    achievements: [
      'Membangun situs web laboratorium VR dengan HTML, CSS, JavaScript, Bootstrap, dan PHP untuk memperluas akses informasi teknologi imersif.',
      'Merancang proyek Virtual Tour menggunakan Theasys yang meraih 90% evaluasi positif dari supervisor dalam waktu 2 bulan.',
    ],
    metrics: '90% Evaluasi Positif · Tuntas 2 Bulan',
    links: [
      {
        label: 'Website Lab VR IT-PLN',
        url: 'https://yogakusuma18.github.io/labvr/index.html',
      },
      {
        label: 'Tur Virtual 360° Theasys',
        url: 'https://www.theasys.io/viewer/ljNYPtOBRBkL7CHXQmws26ZJSLKsef/',
      },
    ],
  },
  {
    id: 'exp-youth',
    role: 'Cohort Leader — Youth Generation Program',
    company: 'Youth Generation Indonesia',
    location: 'Online',
    period: 'November 2023 – Juni 2024',
    emoji: '🌟',
    theme: 'pink',
    summary:
      'Memimpin angkatan berisi 35 peserta dalam persiapan beasiswa perguruan tinggi negeri sekaligus mengelola pertumbuhan kanal edukasi digital program.',
    achievements: [
      'Mencapai tingkat keberhasilan 95% dalam mendampingi peserta meraih beasiswa ke perguruan tinggi negeri.',
      'Menumbuhkan akun Instagram program hingga 7.000 pengikut dalam 8 bulan dan dinobatkan sebagai cohort berkinerja terbaik.',
    ],
    metrics: '95% Lolos Beasiswa · 7.000 Pengikut',
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: 'Sarjana Teknik Informatika (S1)',
    institution: 'Institut Teknologi PLN (IT-PLN), Jakarta Barat',
    period: 'September 2021 – September 2025',
    badge: 'IPK 3.78 / 4.00 · Cum Laude',
    details:
      'Memimpin lebih dari 5 kelompok studi sejak Semester 1, melaksanakan riset jaringan komputer bersama pakar di PT Inet Media, serta meraih sertifikasi kompetensi MTCNA dan Microsoft Office Specialist (Word 2019).',
  },
  {
    degree: 'AWS Cloud Data Engineer & Gen AI Track (MSIB)',
    institution: 'RevoU CendekiAwan — Kampus Merdeka',
    period: 'Februari 2024 – Juni 2024',
    badge: 'Nilai Akhir 98 / 100 (Grade A)',
    details:
      'Mendalami rekayasa data awan, visualisasi analitik skala besar, serta penerapan Generative AI dan memimpin tim beranggotakan 9 orang pada proyek Capstone Kickstarter.',
    link: {
      label: 'Lihat Dek Analisis Kickstarter',
      url: 'https://www.canva.com/design/DAGEoW7C7PU/YruPwr6vG0vSmLzRHSzxGw/edit',
    },
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    id: 'cert-hackathon',
    title: 'Juara Hackathon Final Project — MAIN Phase 3',
    issuer: 'Alkademi Foundation',
    year: 'Okt 2026',
    scoreOrDetail: 'Asesmen Teknis 93/100 · Proyek Akhir 88/100',
    emoji: '🏆',
    theme: 'tosca',
    category: CredentialCategory.DEV_QA_NET,
    pdfUrl: assetPath(
      'Certificate_Phase_3__Project_Based_Learning_Phase_Andre_Zuliani__1__b06b57fc.pdf'
    ),
    downloadFileName: 'Sertifikat_Juara_Hackathon_MAIN_2026_Andre_Zuliani.pdf',
  },
  {
    id: 'cert-indonesianext',
    title: 'Top 24 Digital Talents — 9th IndonesiaNEXT',
    issuer: 'Telkomsel IndonesiaNEXT',
    year: 'Sept 2025',
    scoreOrDetail: 'Terpilih dari 9.962 Peserta Nasional',
    emoji: '🚀',
    theme: 'pink',
    category: CredentialCategory.DESIGN_LEAD,
    pages: [
      {
        label: 'Sertifikat Penghargaan',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0001_67a27078.jpg'),
      },
    ],
    pdfUrl: assetPath('E-Certificate_Top_24-Andre_Zuliani_a86e4999.pdf'),
    downloadFileName: 'E-Certificate_Top_24_IndonesiaNEXT_Andre_Zuliani.pdf',
  },
  {
    id: 'cert-ai102',
    title: 'Microsoft Certified: Azure AI Engineer Associate (AI-102)',
    issuer: 'Microsoft',
    year: 'Okt 2025',
    scoreOrDetail: 'ID: 529363B234D0DB5 · Skor Ujian 854',
    emoji: '🧠',
    theme: 'purple',
    category: CredentialCategory.AI_CLOUD,
    pages: [
      {
        label: 'Sertifikat Resmi Microsoft',
        imageUrl: assetPath(
          'Credentials_-_andrezuliani-7211___Microsoft_AI_102_page-0001_66492fee.jpg'
        ),
      },
    ],
    pdfUrl: assetPath(
      'Credentials_-_andrezuliani-7211___Microsoft_AI_102_da940fd3.pdf'
    ),
    downloadFileName: 'Microsoft_Certified_Azure_AI_Engineer_AI102_Andre_Zuliani.pdf',
  },
  {
    id: 'cert-revou-msib',
    title: 'AWS Cloud Data Engineer & Gen AI Track (CendekiAwan)',
    issuer: 'RevoU x Kampus Merdeka (MSIB)',
    year: 'Juni 2024',
    scoreOrDetail: 'Nilai Akhir 98/100 (Grade A) · Capstone Amazon Q 93',
    emoji: '☁️',
    theme: 'purple',
    category: CredentialCategory.AI_CLOUD,
    pages: [
      {
        label: 'Sertifikat Kelulusan (98/100)',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0006_28cdaa9a.jpg'),
      },
      {
        label: 'Transkrip Nilai Modul',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0007_c1c764be.jpg'),
      },
      {
        label: 'Advanced Capstone Amazon Q',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0005_63d206c2.jpg'),
      },
      {
        label: 'Sertifikat MSIB Angkatan 6',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0008_9b6d034c.jpg'),
      },
    ],
    downloadFileName: 'Sertifikat_RevoU_AWS_GenAI_Andre_Zuliani.jpg',
  },
  {
    id: 'cert-bnsp-web',
    title: 'Sertifikat Kompetensi BNSP: Junior Web Developer',
    issuer: 'BNSP — LSP BPPTIK Kominfo',
    year: 'Nov 2025',
    scoreOrDetail: 'No. Reg. J.1389.01449.2025 · Berlaku 3 Tahun',
    emoji: '💻',
    theme: 'tosca',
    category: CredentialCategory.DEV_QA_NET,
    pages: [
      {
        label: 'Sertifikat Kompetensi BNSP',
        imageUrl: assetPath(
          'Sertifikasi_Junior_Web_Developer_BNSP_page-0001_04954d43.jpg'
        ),
      },
    ],
    downloadFileName: 'Sertifikat_BNSP_Junior_Web_Developer_Andre_Zuliani.jpg',
  },
  {
    id: 'cert-bnsp-design',
    title: 'Sertifikat Kompetensi BNSP: Junior Graphic Designer',
    issuer: 'BNSP — LSP Teknologi Digital',
    year: 'Juli 2025',
    scoreOrDetail: 'No. Reg. DKV 1565 28735 2025 · 5 Unit Kompetensi',
    emoji: '🎨',
    theme: 'pink',
    category: CredentialCategory.DESIGN_LEAD,
    pages: [
      {
        label: 'Halaman Depan Sertifikat',
        imageUrl: assetPath(
          'Sertifikasi_BNSP_Graphic_Desain_Andre_Zuliani_compressed_page-0001_8c94f144.jpg'
        ),
      },
      {
        label: 'Daftar Unit Kompetensi',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0003_b28dca3c.jpg'),
      },
    ],
    downloadFileName: 'Sertifikat_BNSP_Junior_Graphic_Designer_Andre_Zuliani.jpg',
  },
  {
    id: 'cert-dbs-codingcamp',
    title: 'Coding Camp Full Graduate: Front-End & Back-End Dev',
    issuer: 'DBS Foundation x Dicoding Indonesia',
    year: 'Juli 2025',
    scoreOrDetail: 'Lulus Penuh · Transkrip 11 Kelas Pengembangan Web',
    emoji: '🧩',
    theme: 'tosca',
    category: CredentialCategory.DEV_QA_NET,
    pages: [
      {
        label: 'Sertifikat Kelulusan',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0014_0c0460da.jpg'),
      },
      {
        label: 'Transkrip Akademik 11 Kelas',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0015_1d69301d.jpg'),
      },
    ],
    downloadFileName: 'Sertifikat_DBS_Coding_Camp_Andre_Zuliani.jpg',
  },
  {
    id: 'cert-azure-data',
    title: 'Microsoft Certified: Azure Data Fundamentals',
    issuer: 'Microsoft & Certiport',
    year: 'Juni 2025',
    scoreOrDetail: 'Kode Verifikasi: 2Rx4-XMpe · Cloud Data',
    emoji: '📊',
    theme: 'purple',
    category: CredentialCategory.AI_CLOUD,
    pages: [
      {
        label: 'Sertifikat Azure Data Fundamentals',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0021_61b992c0.jpg'),
      },
    ],
    downloadFileName: 'Microsoft_Azure_Data_Fundamentals_Andre_Zuliani.jpg',
  },
  {
    id: 'cert-pl900',
    title: 'Microsoft Certified: Power Platform Fundamentals (PL-900)',
    issuer: 'Microsoft & Certiport',
    year: 'Juni 2025',
    scoreOrDetail: 'Skor 892 · Kode Verifikasi: bD5L-sFVH',
    emoji: '⚡',
    theme: 'pink',
    category: CredentialCategory.DESIGN_LEAD,
    pages: [
      {
        label: 'Sertifikat Power Platform Fundamentals',
        imageUrl: assetPath(
          'Power_Platform_Fundamentals_page-0001_c5668eb2.jpg'
        ),
      },
    ],
    downloadFileName: 'Microsoft_Power_Platform_Fundamentals_Andre_Zuliani.jpg',
  },
  {
    id: 'cert-sc900',
    title: 'Microsoft Certified: Security, Compliance & Identity',
    issuer: 'Microsoft & Certiport',
    year: 'Juni 2025',
    scoreOrDetail: 'Kode Verifikasi: CxpD-DkTc · Keamanan Cloud',
    emoji: '🛡️',
    theme: 'purple',
    category: CredentialCategory.AI_CLOUD,
    pages: [
      {
        label: 'Sertifikat Security, Compliance & Identity',
        imageUrl: assetPath(
          'Security_Compliance_and_Identity_Fundamentals_page-0001_b0693a90.jpg'
        ),
      },
    ],
    downloadFileName: 'Microsoft_Security_Compliance_Identity_Andre_Zuliani.jpg',
  },
  {
    id: 'cert-m365-mce',
    title: 'Microsoft Certified: 365 Fundamentals & Educator (MCE)',
    issuer: 'Microsoft & Certiport',
    year: 'Juni 2025',
    scoreOrDetail: '2 Sertifikasi Resmi: bDDN-sFKq & CxhM-XVbo',
    emoji: '💼',
    theme: 'pink',
    category: CredentialCategory.DESIGN_LEAD,
    pages: [
      {
        label: 'Microsoft 365 Fundamentals',
        imageUrl: assetPath('365_Fundamentals__1__page-0001_0db26093.jpg'),
      },
      {
        label: 'Microsoft Certified Educator (MCE)',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0022_df5dce3c.jpg'),
      },
    ],
    pdfUrl: assetPath('365_Fundamentals_5ed116a9.pdf'),
    downloadFileName: 'Microsoft_365_Fundamentals_Andre_Zuliani.pdf',
  },
  {
    id: 'cert-mos-word2019',
    title: 'Microsoft Office Specialist: Word 2019 Associate',
    issuer: 'Microsoft & Certiport',
    year: 'Mei 2024',
    scoreOrDetail: 'Kode Verifikasi: v3yq-DwoM · Microsoft Office',
    emoji: '📝',
    theme: 'pink',
    category: CredentialCategory.DESIGN_LEAD,
    pdfUrl: assetPath('Word_2019_Associate_92079ed5.pdf'),
    downloadFileName: 'Microsoft_Office_Specialist_Word_2019_Andre_Zuliani.pdf',
  },
  {
    id: 'cert-mtcna',
    title: 'MikroTik Certified Network Associate (MTCNA)',
    issuer: 'MikroTik Latvia',
    year: 'Feb 2025',
    scoreOrDetail: 'No. Sertifikat: 2502NA4682 · Jaringan & Routing',
    emoji: '🌐',
    theme: 'tosca',
    category: CredentialCategory.DEV_QA_NET,
    pages: [
      {
        label: 'Sertifikat Resmi MTCNA',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0019_4b12c7af.jpg'),
      },
    ],
    downloadFileName: 'Sertifikat_MTCNA_MikroTik_Andre_Zuliani.jpg',
  },
  {
    id: 'cert-html5',
    title: 'IT Specialist: HTML5 Application Development',
    issuer: 'Certiport — Pearson VUE',
    year: 'Sept 2025',
    scoreOrDetail: 'Kode Verifikasi: C4JU-uT63 · Pengembangan Aplikasi Web',
    emoji: '🖥️',
    theme: 'tosca',
    category: CredentialCategory.DEV_QA_NET,
    pages: [
      {
        label: 'Sertifikat IT Specialist HTML5',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0016_0d5409c5.jpg'),
      },
    ],
    downloadFileName: 'IT_Specialist_HTML5_Andre_Zuliani.jpg',
  },
  {
    id: 'cert-ibm-sql',
    title: 'Data Analysis with Python & Dasar SQL',
    issuer: 'IBM (Coursera) & Dicoding Indonesia',
    year: '2023 – 2024',
    scoreOrDetail: 'Analitik Python IBM & Kueri Relasional SQL',
    emoji: '🐍',
    theme: 'purple',
    category: CredentialCategory.AI_CLOUD,
    pages: [
      {
        label: 'IBM — Data Analysis with Python',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0009_c11a9f1a.jpg'),
      },
      {
        label: 'Dicoding — Belajar Dasar SQL',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0010_1ada5c22.jpg'),
      },
      {
        label: 'Silabus Materi SQL',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0011_2d825a26.jpg'),
      },
    ],
    downloadFileName: 'Sertifikat_IBM_Python_Data_Analysis_Andre_Zuliani.jpg',
  },
  {
    id: 'cert-talenthub-ygp',
    title: 'Japanese for Career Excellence & Youth Generation',
    issuer: 'Kemnaker RI (Talenthub) & Youth Generation',
    year: '2023 – 2025',
    scoreOrDetail: 'Skor Talenthub 81,4 · Wakil Ketua Batch 4',
    emoji: '🌟',
    theme: 'pink',
    category: CredentialCategory.DESIGN_LEAD,
    pages: [
      {
        label: 'Sertifikat Kemnaker Talenthub Batch 20',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0017_881543aa.jpg'),
      },
      {
        label: 'Transkrip Nilai (81,4)',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0018_99d29372.jpg'),
      },
      {
        label: 'Apresiasi Wakil Ketua Youth Generation',
        imageUrl: assetPath('Sertifikat_Andre_Zuliani_page-0013_25ca72ec.jpg'),
      },
    ],
    downloadFileName: 'Sertifikat_Talenthub_Kemnaker_Andre_Zuliani.jpg',
  },
];

export const DOCUMENTS: Record<DocumentKey, DocumentAsset> = {
  cv: {
    id: 'cv',
    title: 'CV — Quality Assurance Engineer',
    subtitle: 'Manual Testing, Cypress, Playwright POM & K6 Load Testing',
    url: assetPath('CV_Andre_Zuliani_5001ab8f.pdf'),
    downloadFileName: 'CV_QA_Engineer_Andre_Zuliani.pdf',
    emoji: '📄',
  },
  cv_pm: {
    id: 'cv_pm',
    title: 'CV — IT Project Management & AI',
    subtitle: 'Agile Scrum PMO PT Pegadaian, Transformasi Digital & Solusi AI',
    url: assetPath('batch_1_Andre_Zuliani_CV_8ea9a04c.pdf'),
    downloadFileName: 'CV_IT_PM_AI_Andre_Zuliani.pdf',
    emoji: '📋',
  },
  portfolio: {
    id: 'portfolio',
    title: 'Dek Portofolio Lengkap (11 Slide)',
    subtitle: 'Dokumentasi visual pengalaman kerja, proyek VR/AI/Web & lisensi',
    url: assetPath('Portofolio_ANDRE_ZULIANI_4d7a10eb.pdf'),
    downloadFileName: 'Portofolio_Andre_Zuliani.pdf',
    emoji: '🗂️',
  },
  certificate: {
    id: 'certificate',
    title: 'Sertifikat Juara Hackathon MAIN 2026',
    subtitle: 'Penghargaan Alkademi Foundation & transkrip nilai teknis 93',
    url: assetPath(
      'Certificate_Phase_3__Project_Based_Learning_Phase_Andre_Zuliani__1__b06b57fc.pdf'
    ),
    downloadFileName: 'Sertifikat_Hackathon_MAIN_2026_Andre_Zuliani.pdf',
    emoji: '🏆',
  },
};
