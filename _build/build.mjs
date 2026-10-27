// Builds both clinic websites from one design (owner, 2026-10-27: "more
// attractive, clean and great UI/UX").
//
//   node _build/build.mjs          (run from this repo's root)
//
// Writes ./index.html (Dungun) and ../hijraapaka.github.io/index.html (Paka —
// a separate repo, cloned beside this one). Change facts in SITES or the design
// in page(), then rebuild; never hand-edit the generated index.html files.
// The SEO part of each <head> (Search Console tag, meta, JSON-LD) lives in
// head-dungun.html / head-paka.html and is inserted unchanged.
// This folder starts with "_" so GitHub Pages (Jekyll) never publishes it.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

/* ─────────────────────────── facts, per clinic ─────────────────────────── */

const DOCTORS = [
  ["AZ", "Dr. Mohammad Ashbir bin Zammeri", "MBBS, UiTM", "MMC 85872"],
  ["MZ", "Dr. Muhammad Zarif bin Zahari", "MBBS, UiTM", "MMC 78876"],
  ["MR", "Dr. Mohamad Rafiq bin Mohd Razuki", "MBBS, UiTM", "MMC 78911"],
  ["FT", "Dr. Fatihah binti Mohd Tahir", "MBBS, UiTM", "MMC 103581"],
  null, // the one doctor who differs between the two clinics
  ["NR", "Dr. Nor Umairah binti Rahmat", "MBBS, UiTM", "MMC 92704"],
  ["ZS", "Dr. Ziad bin Sabri", "MBBS, UniKL", "MMC 101468"],
];
const withDoctor = (d) => DOCTORS.map((x) => x ?? d);

const PANELS = ["PERKESO HSP", "PEKA B40", "MARA", "MedKad", "MiCare", "PM Care", "Etiqa", "IHP Healthcare",
  "Health Metrics", "HealthConnect", "MedNefits", "Medilink Global", "Compumed", "WeCare", "e-MAS", "TNB",
  "UiTM", "Perodua", "KeTengah", "Maidam", "NIOSH", "MMC Corporation", "Swift"];

const SITES = {
  dungun: {
    out: join(HERE, "..", "index.html"),
    head: "head-dungun.html",
    url: "https://hijraadungun.github.io/",
    branch: "Dungun",
    town: "Kuala Dungun",
    name: "Klinik Hijraa 24 Jam Dungun",
    phone: "013-9237548", tel: "+60139237548",
    email: "hijraadungunhealthcare@gmail.com",
    chat: "https://team-crm-one.vercel.app/chat/dungun",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Klinik+Hijraa+24+Jam+Dungun",
    maps: "https://www.google.com/maps?q=Klinik+Hijraa+24+Jam+Dungun",
    mapEmbed: "https://www.google.com/maps?q=Klinik+Hijraa+24+Jam+Dungun,+Jalan+Paka,+23000+Kuala+Dungun,+Terengganu&output=embed",
    address: ["2785 & 2786 Tingkat Bawah Batu, 48, Jalan Paka, 23000 Kuala Dungun, Terengganu",
      "2785 & 2786 Ground Floor Batu, 48, Jalan Paka, 23000 Kuala Dungun, Terengganu"],
    reviews: "1,400+",
    since: ["Sejak 5 Mei 2022", "Since 5 May 2022"],
    group: ["Cawangan ke-4 Hijraa Group", "Hijraa Group's 4th branch"],
    about: ["Klinik Hijraa 24 Jam Dungun ialah cawangan ke-4 Hijraa Group, beroperasi sejak 5 Mei 2022. Kami menyediakan rawatan perubatan yang menyeluruh, mesra dan berpatutan untuk keluarga di Dungun, Paka dan sekitarnya — pada bila-bila masa.",
      "Klinik Hijraa 24 Jam Dungun is the 4th branch of Hijraa Group, operating since 5 May 2022. We provide comprehensive, friendly and affordable medical care for families in Dungun, Paka and the surrounding areas — any time of day."],
    panelPoint: ["PERKESO HSP, PEKA B40, MARA, MedKad dan lebih 25 panel insurans korporat.",
      "PERKESO HSP, PEKA B40, MARA, MedKad and 25+ corporate insurance panels."],
    familyDesc: ["Perancang keluarga & saringan bayi", "Family planning & infant screening"],
    extraServices: [],
    footAbout: ["Klinik perubatan 24 jam di Kuala Dungun, Terengganu. Cawangan ke-4 Hijraa Group. Rawatan menyeluruh, mesra dan berpatutan untuk seluruh keluarga.",
      "A 24-hour medical clinic in Kuala Dungun, Terengganu. The 4th branch of Hijraa Group. Comprehensive, friendly and affordable care for the whole family."],
    social: [["facebook", "Facebook", "https://www.facebook.com/klinikhijraadungun/"]],
    doctors: withDoctor(["NS", "Dr. Nadiah binti Mohd Shah", "MBBCh, Alexandria", "MMC 83363"]),
    areas: null,
    legal: null,
    sister: { name: "Klinik Hijraa 24 Jam Paka", url: "https://hijraapaka.github.io/", place: "Jalan Santong, Taman Johan, 23100 Paka" },
    faqs: [
      [["Adakah Klinik Hijraa Dungun buka 24 jam?", "Ya. Kami beroperasi 24 jam sehari, 7 hari seminggu, termasuk hujung minggu dan cuti umum. Pesakit walk-in dialu-alukan pada bila-bila masa tanpa temujanji."],
        ["Is Klinik Hijraa Dungun open 24 hours?", "Yes. We operate 24 hours a day, 7 days a week, including weekends and public holidays. Walk-in patients are welcome any time without an appointment."]],
      [["Di manakah lokasi klinik?", "Kami terletak di 2785 & 2786 Tingkat Bawah Batu, 48, Jalan Paka, 23000 Kuala Dungun, Terengganu — berhampiran pusat bandar Dungun."],
        ["Where is the clinic located?", "We are located at 2785 & 2786 Ground Floor Batu, 48, Jalan Paka, 23000 Kuala Dungun, Terengganu — near Dungun town centre."]],
      [["Apakah perkhidmatan yang ditawarkan?", "Rawatan kecemasan & am 24 jam, X-Ray, ultrasound, ECG, nebuliser, IV drip, rawatan luka, khatan, pembedahan kecil, vaksinasi, saringan kesihatan, ujian alahan, perancang keluarga, pembersihan telinga, saringan jaundis bayi dan house call (rawatan di rumah)."],
        ["What services do you offer?", "24-hour emergency & general care, X-Ray, ultrasound, ECG, nebuliser, IV drip, wound care, circumcision, minor surgery, vaccination, health screening, allergy testing, family planning, ear cleaning, neonatal jaundice screening and house calls."]],
      [["Adakah klinik menerima panel PERKESO dan insurans?", "Ya. Kami menerima lebih 30 panel termasuk PERKESO HSP, PEKA B40, MARA, MedKad, MiCare, IHP Healthcare, Etiqa, PM Care dan banyak lagi."],
        ["Do you accept PERKESO and insurance panels?", "Yes. We accept 30+ panels including PERKESO HSP, PEKA B40, MARA, MedKad, MiCare, IHP Healthcare, Etiqa, PM Care and more."]],
      [["Bolehkah buat khatan di sini?", "Ya, perkhidmatan khatan disediakan oleh doktor kami. Hubungi 013-9237548 atau chat dengan kami untuk temujanji."],
        ["Can I get circumcision done here?", "Yes, circumcision is performed by our doctors. Call 013-9237548 or chat with us to book."]],
      [["Adakah perkhidmatan house call (rawatan di rumah)?", "Ya. Kami menyediakan house call termasuk pemeriksaan doktor, pemasangan IV drip, rawatan luka dan penjagaan di rumah. Chat dengan kami untuk maklumat lanjut."],
        ["Do you offer house calls (home treatment)?", "Yes. We offer house calls including doctor examination, IV drip, wound care and home care. Chat with us for details."]],
      [["Bagaimana cara membuat temujanji?", "Telefon 013-9237548 atau chat dengan kami, atau e-mel hijraadungunhealthcare@gmail.com. Walk-in juga dialu-alukan 24 jam."],
        ["How do I make an appointment?", "Call 013-9237548 or chat with us, or email hijraadungunhealthcare@gmail.com. Walk-ins are also welcome 24 hours."]],
    ],
  },

  paka: {
    out: join(HERE, "..", "..", "hijraapaka.github.io", "index.html"),
    head: "head-paka.html",
    url: "https://hijraapaka.github.io/",
    branch: "Paka",
    town: "Paka",
    name: "Klinik Hijraa 24 Jam Paka",
    phone: "018-5925343", tel: "+60185925343",
    email: "hijraapakahealthcare@gmail.com",
    chat: "https://team-crm-one.vercel.app/chat/paka",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Klinik+Hijraa+24+Jam+Paka",
    maps: "https://maps.app.goo.gl/PVsaWz3e9Ua4Wf9q7",
    mapEmbed: "https://www.google.com/maps?q=Klinik%20Hijraa%2024%20Jam%20Paka%2C%20Jalan%20Santong%2C%2023100%20Paka%2C%20Terengganu&output=embed",
    address: ["PT 9209 & 9210, Tingkat Bawah & Atas, Taman Johan, Jalan Santong, 23100 Paka, Terengganu",
      "PT 9209 & 9210, Ground & First Floor, Taman Johan, Jalan Santong, 23100 Paka, Terengganu"],
    reviews: "240+",
    since: ["Dibuka 5 Januari 2025", "Opened 5 January 2025"],
    group: ["Rangkaian Hijraa Group", "Part of Hijraa Group"],
    about: ["Klinik Hijraa 24 Jam Paka ialah sebahagian daripada rangkaian Hijraa Group, dibuka pada 5 Januari 2025. Kami menyediakan rawatan perubatan yang menyeluruh, mesra dan berpatutan untuk keluarga di Paka, Kertih, Kijal, Dungun dan sekitarnya — pada bila-bila masa.",
      "Klinik Hijraa 24 Jam Paka is part of the Hijraa Group network, opened on 5 January 2025. We provide comprehensive, friendly and affordable medical care for families in Paka, Kertih, Kijal, Dungun and the surrounding areas — at any time."],
    panelPoint: ["PERKESO HSP, PEKA B40, MARA, MedKad dan lebih 30 panel insurans korporat.",
      "PERKESO HSP, PEKA B40, MARA, MedKad and 30+ corporate insurance panels."],
    familyDesc: ["Perancang keluarga, buku pink & saringan bayi", "Family planning, pink book & infant screening"],
    extraServices: [["Buka buku pink", "Antenatal booking"]],
    footAbout: ["Klinik perubatan 24 jam di Paka, Terengganu. Sebahagian daripada rangkaian Hijraa Group. Rawatan menyeluruh, mesra dan berpatutan untuk seluruh keluarga.",
      "A 24-hour medical clinic in Paka, Terengganu. Part of the Hijraa Group network. Comprehensive, friendly and affordable care for the whole family."],
    social: [["facebook", "Facebook", "https://www.facebook.com/profile.php?id=61571780061977"],
      ["instagram", "Instagram", "https://www.instagram.com/hijraapaka"]],
    doctors: withDoctor(["SA", "Dr. Sakinah binti Aduka", "MD, UMS", "MMC 89172"]),
    areas: {
      text: ["Kami menerima pesakit dari seluruh daerah Dungun dan Kemaman.", "We welcome patients from across the Dungun and Kemaman districts."],
      list: ["Paka", "Kertih", "Kijal", "Kemasik", "Rantau Abang", "Dungun"],
    },
    legal: "HIJRAA PAKA HEALTHCARE SDN. BHD. (1565872-D)",
    sister: { name: "Klinik Hijraa 24 Jam Dungun", url: "https://hijraadungun.github.io/", place: "Jalan Paka, 23000 Kuala Dungun" },
    faqs: [
      [["Adakah Klinik Hijraa Paka buka 24 jam?", "Ya. Kami beroperasi 24 jam sehari, 7 hari seminggu, termasuk hujung minggu dan cuti umum. Pesakit walk-in dialu-alukan pada bila-bila masa tanpa temujanji."],
        ["Is Klinik Hijraa Paka open 24 hours?", "Yes. We operate 24 hours a day, 7 days a week, including weekends and public holidays. Walk-in patients are welcome any time without an appointment."]],
      [["Di manakah lokasi klinik?", "Kami terletak di PT 9209 & 9210, Tingkat Bawah & Atas, Taman Johan, Jalan Santong, 23100 Paka, Terengganu."],
        ["Where is the clinic located?", "We are located at PT 9209 & 9210, Ground & First Floor, Taman Johan, Jalan Santong, 23100 Paka, Terengganu."]],
      [["Apakah perkhidmatan yang ditawarkan?", "Rawatan kecemasan & am 24 jam, X-Ray, ultrasound, ECG, nebuliser, IV drip, rawatan luka, khatan, pembedahan kecil, vaksinasi, saringan kesihatan, ujian alahan, perancang keluarga, pembersihan telinga, saringan jaundis bayi, buka buku pink dan house call."],
        ["What services are offered?", "24-hour emergency & general care, X-Ray, ultrasound, ECG, nebuliser, IV drip, wound care, circumcision, minor surgery, vaccination, health screening, allergy testing, family planning, ear cleaning, infant jaundice screening, antenatal booking and house calls."]],
      [["Adakah klinik menerima panel PERKESO dan insurans?", "Ya. Kami menerima lebih 30 panel termasuk PERKESO HSP, PEKA B40, MARA, MedKad, MiCare, IHP Healthcare, Etiqa, PM Care dan banyak lagi."],
        ["Do you accept PERKESO and insurance panels?", "Yes. We accept 30+ panels including PERKESO HSP, PEKA B40, MARA, MedKad, MiCare, IHP Healthcare, Etiqa, PM Care and many more."]],
      [["Bolehkah buat khatan di sini?", "Ya, perkhidmatan khatan disediakan oleh doktor kami. Hubungi 018-5925343 atau chat dengan kami untuk temujanji."],
        ["Can circumcision be done here?", "Yes, circumcision is performed by our doctors. Call 018-5925343 or chat with us to make an appointment."]],
      [["Adakah perkhidmatan house call (rawatan di rumah)?", "Ya. Kami menyediakan house call termasuk pemeriksaan doktor, pemasangan IV drip, rawatan luka dan penjagaan di rumah. Chat dengan kami untuk maklumat lanjut."],
        ["Do you offer house calls (home treatment)?", "Yes. We provide house calls including doctor examination, IV drip, wound care and home care. Chat with us for more information."]],
      [["Bagaimana cara membuat temujanji?", "Telefon 018-5925343 atau chat dengan kami, atau e-mel hijraapakahealthcare@gmail.com. Walk-in juga dialu-alukan 24 jam."],
        ["How do I make an appointment?", "Call 018-5925343 or chat with us, or email hijraapakahealthcare@gmail.com. Walk-ins are also welcome 24 hours."]],
      [["Adakah terdapat doktor wanita di klinik?", "Ya. Pasukan kami termasuk doktor wanita berdaftar MMC untuk pemeriksaan dan rawatan yang memerlukan doktor wanita. Doktor bertugas bergilir 24 jam — chat dengan kami untuk menyemak ketersediaan."],
        ["Is there a female doctor at the clinic?", "Yes. Our team includes MMC-registered female doctors for examinations and treatments that require one. Doctors work in shifts around the clock — chat with us to check availability."]],
      [["Kawasan mana yang dilayani klinik?", "Kami melayani pesakit dari Paka, Kertih, Kijal, Kemasik, Rantau Abang, Dungun dan kawasan sekitarnya di Terengganu."],
        ["Which areas does the clinic serve?", "We serve patients from Paka, Kertih, Kijal, Kemasik, Rantau Abang, Dungun and the surrounding areas in Terengganu."]],
    ],
  },
};

/* ─────────────────────────────── helpers ─────────────────────────────── */

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** Bilingual text: Bahasa Melayu in the page (what Google reads), English
 *  swapped in by the BM/EN switch. */
const t = (ms, en, tag = "span", attrs = "") => `<${tag}${attrs ? " " + attrs : ""} data-en="${esc(en)}">${esc(ms)}</${tag}>`;
/** Same, for strings that carry markup (<b>, <em>). */
const th = (ms, en, tag = "span", attrs = "") => `<${tag}${attrs ? " " + attrs : ""} data-en-html="${esc(en)}">${ms}</${tag}>`;
const ic = (id, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;

const ICONS = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  nav: '<path d="M3 11 22 2l-9 19-2-8-8-2z"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  badge: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
  siren: '<path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1z"/><path d="M21 12h1"/><path d="M18.5 4.5 18 5"/><path d="M2 12h1"/><path d="M12 2v1"/><path d="m4.93 4.93.71.71"/><path d="M12 12v6"/>',
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
  pulse: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  drop: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  shieldplus: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M9 12h6"/><path d="M12 9v6"/>',
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  syringe: '<path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  card: '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
  hospital: '<path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/>',
  instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  // filled icons carry their own fill so they ignore the stroke style
  star: '<path fill="currentColor" stroke="none" d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.12 5.11a.56.56 0 0 0 .48.35l5.52.44a.56.56 0 0 1 .32.99l-4.2 3.6a.56.56 0 0 0-.19.56l1.29 5.38a.56.56 0 0 1-.84.61l-4.72-2.88a.56.56 0 0 0-.59 0l-4.72 2.88a.56.56 0 0 1-.84-.61l1.28-5.38a.56.56 0 0 0-.18-.56l-4.2-3.6a.56.56 0 0 1 .32-.99l5.52-.44a.56.56 0 0 0 .48-.35z"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  // the clinic's chat: WhatsApp-like bubble with a medical cross (never WhatsApp's own mark)
  chat: '<path d="M12 2.5c-5.2 0-9.4 4-9.4 8.9 0 1.8.6 3.5 1.6 4.9L3.2 21l4.8-1.5c1.2.6 2.6 1 4 1 5.2 0 9.4-4 9.4-8.9S17.2 2.5 12 2.5z"/><path fill="currentColor" stroke="none" d="M10.9 7.5h2.2v2.8h2.8v2.2h-2.8v2.8h-2.2v-2.8H8.1v-2.2h2.8z"/>',
};
const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${Object.entries(ICONS)
  .map(([id, p]) => `<symbol id="i-${id}" viewBox="0 0 24 24">${p}</symbol>`).join("")}</svg>`;

/* ─────────────────────────────── the page ─────────────────────────────── */

function page(s) {
  const head = readFileSync(join(HERE, s.head), "utf8").trim();
  const SERVICES = [
    ["siren", "Rawatan Kecemasan", "Emergency Care", "Penjagaan kecemasan & am 24 jam", "24-hour emergency & general care", "red"],
    ["scan", "X-Ray & Ultrasound", "X-Ray & Ultrasound", "Pengimejan diagnostik di tempat", "On-site diagnostic imaging"],
    ["pulse", "ECG & Saringan", "ECG & Screening", "Pemeriksaan jantung & kesihatan", "Heart & health check-ups"],
    ["drop", "IV Drip & Nebuliser", "IV Drip & Nebuliser", "Rawatan cecair & pernafasan", "Fluid & respiratory treatment"],
    ["shieldplus", "Khatan", "Circumcision", "Khatan oleh doktor terlatih", "Circumcision by trained doctors"],
    ["home", "House Call", "House Call", "Rawatan doktor di rumah anda", "Doctor treatment at your home"],
    ["syringe", "Vaksinasi & Luka", "Vaccination & Wounds", "Imunisasi & rawatan luka", "Immunisation & wound care"],
    ["users", "Kesihatan Keluarga", "Family Health", s.familyDesc[0], s.familyDesc[1]],
  ];
  const ALSO = [["Pembedahan kecil", "Minor surgery"], ["Rawatan luka", "Wound care"], ["Saringan kesihatan", "Health screening"],
    ["Ujian alahan", "Allergy testing"], ["Pembersihan telinga", "Ear cleaning"], ["Perancang keluarga", "Family planning"],
    ["Saringan jaundis bayi", "Neonatal jaundice screening"], ...s.extraServices];
  const NAV = [["#services", "Perkhidmatan", "Services"], ["#doctors", "Doktor", "Doctors"], ["#panels", "Panel", "Panels"],
    ["#faq", "Soalan Lazim", "FAQ"], ["#location", "Lokasi", "Location"]];
  const logo = (cls, h) => `<img class="${cls}" src="logo-hijraa.png" width="${Math.round(h * 183 / 132)}" height="${h}" alt="${esc(s.name)}" />`;
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="ms">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<!-- Generated by _build/build.mjs in the hijraadungun.github.io repo — edit there and rebuild. -->

${head}

<meta name="theme-color" content="#ffffff" />
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%23ffffff'/><path d='M50 80C22 58 20 34 38 31c8-1.4 12 4.6 12 8 0-3.4 4-9.4 12-8 18 3 16 27-12 49Z' fill='%23d82b05'/></svg>" />
<link rel="apple-touch-icon" href="apple-touch-icon.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<script>document.documentElement.classList.add('js')</script>
<style>${CSS}</style>
</head>
<body>
<a class="skip" href="#main">${t("Langkau ke kandungan", "Skip to content")}</a>
${sprite}

<header class="hdr" id="hdr">
  <div class="wrap hdr-in">
    <a class="logo" href="#top" aria-label="${esc(s.name)}">${logo("logo-img", 44)}</a>
    <nav class="nav" aria-label="Utama">
      ${NAV.map(([h, ms, en]) => t(ms, en, "a", `href="${h}"`)).join("\n      ")}
    </nav>
    <div class="hdr-act">
      <div class="lang" role="group" aria-label="Bahasa / Language">
        <button type="button" data-lang="ms" aria-pressed="true">BM</button><button type="button" data-lang="en" aria-pressed="false">EN</button>
      </div>
      <a class="btn btn-brand hdr-call" href="tel:${s.tel}">${ic("phone")}${s.phone}</a>
      <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menu">${ic("menu")}</button>
    </div>
  </div>
</header>
<div class="sheet" id="menu" hidden>
  <nav aria-label="Menu">
    ${[["#about", "Tentang", "About"], ...NAV].map(([h, ms, en]) => `<a class="sheet-link" href="${h}">${t(ms, en)}${ic("arrow")}</a>`).join("\n    ")}
  </nav>
  <div class="sheet-cta">
    <a class="btn btn-chat" href="${s.chat}">${ic("chat")}${t("Chat Kami", "Chat With Us")}</a>
    <a class="btn btn-line" href="tel:${s.tel}">${ic("phone")}${t("Telefon", "Call")}</a>
  </div>
</div>

<main id="main">

<!-- ═══ HERO ═══ -->
<section class="hero" id="top">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <span class="status"><span class="dot"></span>${t("Buka sekarang · 24 jam, setiap hari", "Open now · 24 hours, every day")}</span>
      ${t(`Klinik Perubatan Hijraa 24 Jam ${s.branch}`, `Hijraa 24-Hour Medical Clinic, ${s.branch}`, "p", 'class="kicker"')}
      <h1>${th("Klinik <em>24 Jam</em> di", "<em>24-Hour</em> Clinic in")} <span class="town">${s.town}</span></h1>
      ${t("Rawatan perubatan profesional bila-bila masa — siang atau malam. Kecemasan, X-Ray, ultrasound, khatan, house call dan banyak lagi. Walk-in dialu-alukan 24 jam.",
        "Professional medical care any time — day or night. Emergencies, X-Ray, ultrasound, circumcision, house calls and more. Walk-ins welcome 24 hours.", "p", 'class="lead"')}
      <div class="cta-row">
        <a class="btn btn-chat btn-lg" href="${s.chat}">${ic("chat")}${t("Chat Kami", "Chat With Us")}</a>
        <a class="btn btn-line btn-lg" href="tel:${s.tel}">${ic("phone")}${s.phone}</a>
      </div>
      <ul class="proof">
        <li><span class="stars" aria-hidden="true">${ic("star").repeat(5)}</span>${th(`<b>4.9</b> · ${s.reviews} ulasan Google`, `<b>4.9</b> · ${s.reviews} Google reviews`)}</li>
        <li>${ic("shield")}${t("Panel PERKESO & PEKA B40", "PERKESO & PEKA B40 panel")}</li>
        <li>${ic("badge")}${t("7 doktor berdaftar MMC", "7 MMC-registered doctors")}</li>
      </ul>
    </div>

    <div class="card-zone">
      <aside class="clinic-card" aria-label="${esc(s.name)}">
        <div class="cc-top">
          <span class="cc-logo">${logo("", 40)}</span>
          <div>
            <p class="cc-name">${s.name}</p>
            <span class="cc-open"><span class="dot"></span>${t("Buka sekarang", "Open now")}</span>
          </div>
        </div>
        <div class="cc-rows">
          <div class="cc-row"><span class="cc-ic">${ic("pin")}</span><div>${t("Alamat", "Address", "p", 'class="cc-k"')}${t(s.address[0], s.address[1], "p", 'class="cc-v"')}</div></div>
          <div class="cc-row"><span class="cc-ic">${ic("clock")}</span><div>${t("Waktu operasi", "Opening hours", "p", 'class="cc-k"')}${t("24 jam, 7 hari seminggu", "24 hours, 7 days a week", "p", 'class="cc-v"')}</div></div>
          <div class="cc-row"><span class="cc-ic">${ic("phone")}</span><div>${t("Telefon", "Phone", "p", 'class="cc-k"')}<p class="cc-v"><a href="tel:${s.tel}">${s.phone}</a></p></div></div>
        </div>
        <div class="cc-actions">
          <a class="btn btn-soft" href="${s.directions}" target="_blank" rel="noopener">${ic("nav")}${t("Arah", "Directions")}</a>
          <a class="btn btn-brand" href="${s.chat}">${ic("chat")}${t("Temujanji", "Appointment")}</a>
        </div>
      </aside>
      <span class="float-badge fb-1">${ic("star")}<b>4.9</b> Google</span>
      <span class="float-badge fb-2">${ic("scan")}X-Ray · Ultrasound · ECG</span>
    </div>
  </div>
</section>

<!-- ═══ QUICK FACTS ═══ -->
<div class="wrap stats" aria-label="Ringkasan">
  <div class="stats-card">
    <div class="stat"><b>24/7</b>${t("Buka setiap hari, termasuk cuti umum", "Open every day, including public holidays")}</div>
    <div class="stat"><b>4.9<small>★</small></b>${t(`${s.reviews} ulasan Google`, `${s.reviews} Google reviews`)}</div>
    <div class="stat"><b>30+</b>${t("Panel insurans & korporat", "Insurance & corporate panels")}</div>
    <div class="stat"><b>7</b>${t("Doktor berdaftar MMC", "MMC-registered doctors")}</div>
  </div>
</div>

<!-- ═══ ABOUT ═══ -->
<section class="sec" id="about">
  <div class="wrap about-grid">
    <div class="about-visual rv" aria-hidden="true">
      <svg class="av-ecg" viewBox="0 0 400 120" preserveAspectRatio="none"><polyline points="0,70 110,70 128,70 140,40 152,98 166,22 180,86 192,70 236,70 248,58 258,78 268,70 400,70" /></svg>
      <span class="av-heart"><svg viewBox="0 0 24 24"><defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ef4b2f"/><stop offset="1" stop-color="#8f1d1d"/></linearGradient></defs><path fill="url(#hg)" d="M12 21.6C5 16.2 2 12.6 2 8.6 2 5.5 4.4 3 7.4 3c1.9 0 3.6 1 4.6 2.6C13 4 14.7 3 16.6 3 19.6 3 22 5.5 22 8.6c0 4-3 7.6-10 13Z"/></svg></span>
      <div class="av-body">
        ${t("Rawatan mesra, sepanjang masa.", "Friendly care, around the clock.", "p", 'class="av-quote"')}
        <div class="av-chips">
          ${t(s.since[0], s.since[1], "span", 'class="av-chip"')}
          ${t(s.group[0], s.group[1], "span", 'class="av-chip"')}
        </div>
      </div>
    </div>
    <div class="rv">
      ${t("Tentang Kami", "About Us", "span", 'class="eyebrow"')}
      ${t("Klinik perubatan 24 jam yang anda boleh percaya", "A 24-hour clinic you can trust", "h2", 'class="h2"')}
      ${t(s.about[0], s.about[1], "p", 'class="intro"')}
      <ul class="checks">
        <li><span class="ck">${ic("check")}</span><p>${t("Buka 24 jam setiap hari.", "Open 24 hours, every day.", "b")} ${t("Termasuk hujung minggu & cuti umum — tiada temujanji diperlukan.", "Including weekends & public holidays — no appointment needed.")}</p></li>
        <li><span class="ck">${ic("check")}</span><p>${t("Kemudahan diagnostik di tempat.", "On-site diagnostics.", "b")} ${t("X-Ray, ultrasound dan ECG untuk diagnosis pantas & tepat.", "X-Ray, ultrasound and ECG for fast, accurate diagnosis.")}</p></li>
        <li><span class="ck">${ic("check")}</span><p>${t("Diterima oleh banyak panel.", "Accepted by many panels.", "b")} ${t(s.panelPoint[0], s.panelPoint[1])}</p></li>
      </ul>
      <a class="text-link" href="#services">${t("Lihat perkhidmatan", "View services")}${ic("arrow")}</a>
    </div>
  </div>
</section>

<!-- ═══ SERVICES ═══ -->
<section class="sec sec-soft" id="services">
  <div class="wrap">
    <div class="sec-head center rv">
      ${t("Perkhidmatan", "Services", "span", 'class="eyebrow"')}
      ${t("Rawatan lengkap di bawah satu bumbung", "Complete care under one roof", "h2", 'class="h2"')}
      ${t("Daripada kecemasan hingga saringan kesihatan, kami menyediakan pelbagai perkhidmatan perubatan untuk seluruh keluarga.",
        "From emergencies to health screening, we offer a wide range of medical services for the whole family.", "p", 'class="intro"')}
    </div>
    <div class="svc-grid">
      ${SERVICES.map(([i, tm, te, dm, de, tone], n) => `<article class="svc${tone ? " " + tone : ""} rv" style="--d:${n % 4}">
        <span class="svc-ic">${ic(i)}</span>
        ${t(tm, te, "h3")}
        ${t(dm, de, "p")}
      </article>`).join("\n      ")}
    </div>
    <div class="also rv">
      ${t("Juga disediakan:", "Also available:", "span", 'class="also-l"')}
      ${ALSO.map(([m, e]) => t(m, e, "span", 'class="chip"')).join("\n      ")}
    </div>
  </div>
</section>

<!-- ═══ DOCTORS ═══ -->
<section class="sec" id="doctors">
  <div class="wrap">
    <div class="sec-head center rv">
      ${t("Pasukan Kami", "Our Team", "span", 'class="eyebrow"')}
      ${t("Berjumpa doktor berdaftar kami", "Meet our registered doctors", "h2", 'class="h2"')}
      ${t("Pasukan 7 doktor perubatan berdaftar dengan Majlis Perubatan Malaysia (MMC), bersedia membantu anda sepanjang masa.",
        "A team of 7 doctors registered with the Malaysian Medical Council (MMC), ready to help you around the clock.", "p", 'class="intro"')}
    </div>
    <div class="doc-grid">
      ${s.doctors.map(([ini, name, deg, mmc], n) => `<article class="doc rv" style="--d:${n % 4}">
        <span class="doc-av av${n % 4}" aria-hidden="true">${ini}</span>
        <div><h3>${name}</h3><p>${deg}</p><span class="mmc">${ic("badge")}${mmc}</span></div>
      </article>`).join("\n      ")}
      <article class="doc doc-more rv" style="--d:3">
        <span class="doc-av" aria-hidden="true">${ic("users")}</span>
        <div>${t("+ Pasukan jururawat & sokongan terlatih", "+ Trained nursing & support team", "h3")}</div>
      </article>
    </div>
  </div>
</section>

<!-- ═══ PANELS ═══ -->
<section class="sec sec-soft" id="panels">
  <div class="wrap">
    <div class="sec-head center rv">
      ${t("Panel Diterima", "Panels Accepted", "span", 'class="eyebrow"')}
      ${t("Kami terima lebih 30 panel insurans", "We accept 30+ insurance panels", "h2", 'class="h2"')}
      ${t("Termasuk panel kerajaan, PERKESO dan korporat.", "Including government, PERKESO and corporate panels.", "p", 'class="intro"')}
    </div>
    <div class="panel-box rv">
      <div class="chips">
        ${PANELS.map((p, n) => `<span class="chip${n < 2 ? " chip-hot" : ""}">${n < 2 ? ic("shield") : ""}${p}</span>`).join("\n        ")}
        ${t("& banyak lagi…", "& many more…", "span", 'class="chip chip-more"')}
      </div>
      <p class="panel-note">${ic("card")}${t("Tunjukkan kad panel anda semasa pendaftaran.", "Show your panel card at registration.")}</p>
    </div>
  </div>
</section>

<!-- ═══ FAQ ═══ -->
<section class="sec" id="faq">
  <div class="wrap faq-grid">
    <div class="faq-side rv">
      ${t("Soalan Lazim", "FAQ", "span", 'class="eyebrow"')}
      ${t("Soalan yang kerap ditanya", "Frequently asked questions", "h2", 'class="h2"')}
      <div class="ask">
        ${t("Masih ada soalan?", "Still have a question?", "p", 'class="ask-t"')}
        ${t("Chat dengan kami atau telefon — kami di sini 24 jam.", "Chat with us or call — we're here 24 hours.", "p", 'class="ask-s"')}
        <div class="ask-cta">
          <a class="btn btn-chat" href="${s.chat}">${ic("chat")}${t("Chat Kami", "Chat With Us")}</a>
          <a class="btn btn-ghost-light" href="tel:${s.tel}">${ic("phone")}${t("Telefon", "Call")}</a>
        </div>
      </div>
    </div>
    <div class="faq-list">
      ${s.faqs.map(([[qm, am], [qe, ae]], n) => `<details class="qa rv"${n === 0 ? " open" : ""}>
        <summary>${t(qm, qe)}<span class="pm" aria-hidden="true">${ic("plus")}</span></summary>
        ${t(am, ae, "div", 'class="faq-answer"')}
      </details>`).join("\n      ")}
    </div>
  </div>
</section>

<!-- ═══ LOCATION ═══ -->
<section class="sec sec-soft" id="location">
  <div class="wrap">
    <div class="sec-head rv">
      ${t("Lokasi & Hubungi", "Location & Contact", "span", 'class="eyebrow"')}
      ${t(`Cari kami di ${s.town}`, `Find us in ${s.town}`, "h2", 'class="h2"')}
    </div>
    <div class="loc-grid">
      <div class="loc-side">
        <div class="loc-card rv">
          <div class="loc-row"><span class="cc-ic">${ic("pin")}</span><div>${t("Alamat", "Address", "h3")}${t(s.address[0], s.address[1], "p")}</div></div>
          <div class="loc-row"><span class="cc-ic">${ic("clock")}</span><div>${t("Waktu operasi", "Opening hours", "h3")}${t("24 jam · 7 hari seminggu · termasuk cuti umum", "24 hours · 7 days a week · including public holidays", "p")}</div></div>
          <div class="loc-row"><span class="cc-ic">${ic("phone")}</span><div>${t("Telefon & e-mel", "Phone & email", "h3")}<p><a href="tel:${s.tel}">${s.phone}</a><br><a href="mailto:${s.email}">${s.email}</a></p></div></div>
          <div class="loc-actions">
            <a class="btn btn-brand" href="${s.directions}" target="_blank" rel="noopener">${ic("nav")}${t("Dapatkan arah", "Get directions")}</a>
            <a class="btn btn-line" href="tel:${s.tel}">${ic("phone")}${t("Telefon", "Call")}</a>
          </div>
        </div>
        ${s.areas ? `<div class="areas rv">
          ${t("Kawasan kami", "Areas we serve", "h3")}
          ${t(s.areas.text[0], s.areas.text[1], "p")}
          <div class="chips">${s.areas.list.map((a) => `<span class="chip">${ic("pin")}${a}</span>`).join("")}</div>
        </div>` : ""}
        <a class="sister rv" href="${s.sister.url}">
          <span class="cc-ic">${ic("hospital")}</span>
          <span class="sister-t">${t("Cawangan Hijraa lain", "Our other Hijraa branch", "small")}<b>${s.sister.name}</b><span>${s.sister.place}</span></span>
          ${ic("arrow")}
        </a>
      </div>
      <div class="map rv">
        <iframe title="${esc(`Peta ${s.name}`)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${s.mapEmbed}"></iframe>
      </div>
    </div>
  </div>
</section>

<!-- ═══ CTA ═══ -->
<section class="cta">
  <div class="wrap">
    <div class="cta-box rv">
      ${t("Perlukan rawatan sekarang?", "Need treatment now?", "h2")}
      ${t("Kami buka 24 jam. Hubungi kami atau datang terus ke klinik — tiada temujanji diperlukan.",
        "We're open 24 hours. Call us or walk in — no appointment needed.", "p")}
      <div class="cta-row">
        <a class="btn btn-chat btn-lg" href="${s.chat}">${ic("chat")}${t("Chat Kami", "Chat With Us")}</a>
        <a class="btn btn-white btn-lg" href="tel:${s.tel}">${ic("phone")}${s.phone}</a>
      </div>
    </div>
  </div>
</section>

</main>

<!-- ═══ FOOTER ═══ -->
<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <span class="foot-logo">${logo("", 40)}</span>
        ${t(s.footAbout[0], s.footAbout[1], "p", 'class="foot-about"')}
        <div class="social">
          ${s.social.map(([i, label, url]) => `<a href="${url}" target="_blank" rel="noopener" aria-label="${label}">${ic(i)}</a>`).join("\n          ")}
          <a href="${s.chat}" aria-label="Chat">${ic("chat")}</a>
          <a href="${s.maps}" target="_blank" rel="noopener" aria-label="Google Maps">${ic("pin")}</a>
        </div>
      </div>
      <div>
        ${t("Navigasi", "Navigation", "h4")}
        <ul>
          ${[["#about", "Tentang", "About"], ...NAV].map(([h, ms, en]) => `<li>${t(ms, en, "a", `href="${h}"`)}</li>`).join("\n          ")}
        </ul>
      </div>
      <div>
        ${t("Hubungi", "Contact", "h4")}
        <ul>
          <li><a href="tel:${s.tel}">${ic("phone")}${s.phone}</a></li>
          <li><a href="${s.chat}">${ic("chat")}${t("Chat 24 jam", "24-hour chat")}</a></li>
          <li><a href="mailto:${s.email}">${ic("mail")}${t("E-mel", "Email")}</a></li>
          <li><span>${ic("clock")}${t("Buka 24 jam setiap hari", "Open 24 hours every day")}</span></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© <span id="yr">${year}</span> ${s.name}${s.legal ? ` · ${s.legal}` : ""}. ${t("Hak cipta terpelihara.", "All rights reserved.")}</span>
      ${t(s.address[0], s.address[1])}
    </div>
  </div>
</footer>

<!-- phones: the three things people come for, always one tap away -->
<nav class="mbar" aria-label="${esc("Tindakan pantas")}">
  <a href="tel:${s.tel}">${ic("phone")}${t("Telefon", "Call")}</a>
  <a class="mbar-chat" href="${s.chat}">${ic("chat")}${t("Chat Kami", "Chat")}</a>
  <a href="${s.directions}" target="_blank" rel="noopener">${ic("nav")}${t("Arah", "Directions")}</a>
</nav>
<a class="fab" href="${s.chat}" aria-label="Chat">${ic("chat")}<span class="fab-tip">${t("Chat dengan kami", "Chat with us")}</span></a>

<script>${JS}</script>
</body>
</html>
`;
}

/* ──────────────────────────────── styles ──────────────────────────────── */

const CSS = `
:root{
  --brand:#0017e4;--brand-ink:#0010a8;--brand-50:#eef1ff;--brand-100:#dfe4ff;--brand-200:#bcc7ff;
  --navy:#0b1437;--ink:#1c2541;--body:#47506b;--muted:#6a7390;--line:#e5e8f1;--soft:#f5f7fc;
  --red:#d82b05;--cyan:#00c9d4;--lime:#a8eb43;
  --chat:#15803d;--chat-ink:#166534;--chat-fab:#16a34a;
  --shadow-sm:0 1px 2px rgba(11,20,55,.06),0 2px 6px rgba(11,20,55,.05);
  --shadow:0 18px 40px -20px rgba(11,20,55,.28);
  --shadow-lg:0 34px 70px -30px rgba(11,20,55,.38);
  --hdr:64px;--maxw:1180px;
}
@media(min-width:960px){:root{--hdr:76px}}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:calc(var(--hdr) + 14px);-webkit-text-size-adjust:100%}
body{margin:0;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:var(--ink);background:#fff;line-height:1.6;-webkit-font-smoothing:antialiased;padding-bottom:calc(78px + env(safe-area-inset-bottom))}
@media(min-width:960px){body{padding-bottom:0}}
img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
h1,h2,h3,h4,p{margin:0}
h1,h2,h3{color:var(--navy);letter-spacing:-.025em;line-height:1.12}
ul{margin:0;padding:0;list-style:none}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 20px}
@media(min-width:768px){.wrap{padding:0 32px}}
.ic{width:20px;height:20px;flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
:focus-visible{outline:3px solid var(--brand-200);outline-offset:2px;border-radius:10px}
.skip{position:absolute;left:-9999px;top:10px;z-index:100;background:var(--navy);color:#fff;padding:10px 16px;border-radius:10px;font-weight:700}
.skip:focus{left:12px}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;font:inherit;font-weight:700;font-size:.98rem;line-height:1.1;padding:13px 20px;border-radius:14px;border:1.5px solid transparent;cursor:pointer;white-space:nowrap;transition:transform .15s ease,box-shadow .2s ease,background-color .2s ease,border-color .2s ease,color .2s ease}
.btn:active{transform:scale(.98)}
.btn-lg{padding:16px 24px;font-size:1.04rem;border-radius:16px}
.btn-chat{background:var(--chat);color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 12px 24px -12px rgba(21,128,61,.8)}
.btn-chat:hover{background:var(--chat-ink)}
.btn-brand{background:var(--brand);color:#fff;box-shadow:0 12px 24px -12px rgba(0,23,228,.7)}
.btn-brand:hover{background:var(--brand-ink)}
.btn-line{background:#fff;color:var(--navy);border-color:var(--line)}
.btn-line:hover{border-color:var(--brand-200);color:var(--brand)}
.btn-soft{background:var(--brand-50);color:var(--brand)}
.btn-soft:hover{background:var(--brand-100)}
.btn-white{background:#fff;color:var(--navy)}
.btn-white:hover{box-shadow:0 12px 26px -12px rgba(0,0,0,.45)}
.btn-ghost-light{background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.28)}
.btn-ghost-light:hover{background:rgba(255,255,255,.18)}

/* header */
.hdr{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.86);-webkit-backdrop-filter:saturate(180%) blur(14px);backdrop-filter:saturate(180%) blur(14px);border-bottom:1px solid transparent;transition:border-color .2s,box-shadow .2s}
.hdr.scrolled{border-color:var(--line);box-shadow:0 10px 30px -22px rgba(11,20,55,.45)}
.hdr-in{height:var(--hdr);display:flex;align-items:center;gap:12px}
.logo-img{height:40px;width:auto}
@media(min-width:960px){.logo-img{height:46px}}
.nav{display:none;margin-left:auto;gap:2px}
.nav a{padding:9px 12px;border-radius:10px;font-weight:600;font-size:.94rem;color:var(--body);transition:color .15s,background .15s}
.nav a:hover{color:var(--brand);background:var(--brand-50)}
.hdr-act{margin-left:auto;display:flex;align-items:center;gap:8px}
@media(min-width:1080px){.nav{display:flex}.hdr-act{margin-left:10px}}
.lang{display:inline-flex;padding:3px;background:var(--soft);border:1px solid var(--line);border-radius:999px}
.lang button{border:0;background:none;font:inherit;font-weight:800;font-size:.72rem;letter-spacing:.04em;color:var(--muted);padding:6px 10px;border-radius:999px;cursor:pointer}
.lang button[aria-pressed="true"]{background:#fff;color:var(--navy);box-shadow:var(--shadow-sm)}
.hdr-call{display:none;padding:11px 16px;font-size:.92rem}
@media(min-width:640px){.hdr-call{display:inline-flex}}
.menu-btn{display:inline-grid;place-items:center;width:42px;height:42px;border-radius:12px;border:1px solid var(--line);background:#fff;color:var(--navy);cursor:pointer}
@media(min-width:1080px){.menu-btn{display:none}}
.sheet{position:fixed;top:var(--hdr);left:0;right:0;z-index:39;background:#fff;border-bottom:1px solid var(--line);box-shadow:var(--shadow-lg);padding:6px 20px 20px;max-height:calc(100dvh - var(--hdr));overflow:auto;animation:drop .22s ease}
.sheet[hidden]{display:none}
@keyframes drop{from{opacity:0;transform:translateY(-8px)}}
.sheet-link{display:flex;align-items:center;justify-content:space-between;padding:15px 4px;border-bottom:1px solid var(--line);font-weight:700;font-size:1.02rem;color:var(--navy)}
.sheet-link .ic{color:var(--muted);width:18px;height:18px}
.sheet-cta{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}

/* hero */
.hero{position:relative;overflow:hidden;padding:26px 0 72px;background:linear-gradient(180deg,#f2f5ff 0%,#f8f9ff 55%,#fff 100%)}
@media(min-width:960px){.hero{padding:72px 0 120px}}
.hero-bg{position:absolute;inset:0;pointer-events:none}
.hero-bg::before{content:"";position:absolute;width:620px;height:620px;right:-220px;top:-260px;border-radius:50%;background:radial-gradient(circle,rgba(0,23,228,.14),transparent 64%)}
.hero-bg::after{content:"";position:absolute;width:520px;height:520px;left:-240px;top:140px;border-radius:50%;background:radial-gradient(circle,rgba(0,201,212,.16),transparent 64%)}
.hero-grid{position:relative;display:grid;gap:40px;align-items:center}
.hero-grid>*{min-width:0}
@media(min-width:960px){.hero-grid{grid-template-columns:1.08fr .92fr;gap:64px}}
.hero-copy>*{animation:rise .7s cubic-bezier(.2,.7,.2,1) both}
.hero-copy>:nth-child(2){animation-delay:.05s}.hero-copy>:nth-child(3){animation-delay:.1s}.hero-copy>:nth-child(4){animation-delay:.15s}.hero-copy>:nth-child(5){animation-delay:.2s}.hero-copy>:nth-child(6){animation-delay:.25s}
/* transform only: the headline is readable from the first frame (and counts for page speed) */
@keyframes rise{from{transform:translateY(12px)}}
.status{display:inline-flex;align-items:center;gap:9px;padding:7px 14px 7px 11px;border-radius:999px;background:#fff;border:1px solid var(--line);box-shadow:var(--shadow-sm);font-weight:700;font-size:.83rem;color:#166534}
.dot{position:relative;width:9px;height:9px;border-radius:50%;background:#22c55e;flex:none}
.dot::after{content:"";position:absolute;inset:0;border-radius:50%;background:#22c55e;animation:ping 1.9s cubic-bezier(0,0,.2,1) infinite}
@keyframes ping{75%,100%{transform:scale(2.6);opacity:0}}
.kicker{margin-top:18px;font-weight:700;font-size:.9rem;color:var(--muted);letter-spacing:.01em}
.hero h1{margin-top:6px;font-size:clamp(2.25rem,8vw,4.1rem);font-weight:800;letter-spacing:-.04em;line-height:1.03}
.hero h1 em{font-style:normal;color:var(--brand);white-space:nowrap;background:linear-gradient(transparent 70%,rgba(0,201,212,.28) 70%,rgba(168,235,67,.32) 92%,transparent 92%)}
.hero h1 .town{display:inline-block}
.lead{margin-top:18px;font-size:1.06rem;color:var(--body);max-width:35rem}
@media(min-width:960px){.lead{font-size:1.16rem}}
.cta-row{display:flex;flex-direction:column;gap:12px;margin-top:28px}
@media(min-width:520px){.cta-row{flex-direction:row;flex-wrap:wrap}}
.proof{display:flex;flex-wrap:wrap;gap:12px 22px;margin-top:28px;font-size:.92rem;color:var(--body)}
.proof li{display:inline-flex;align-items:center;gap:8px}
.proof .ic{width:18px;height:18px;color:var(--brand)}
.proof b{color:var(--navy)}
.stars{display:inline-flex;gap:1px;color:#f5a524}
.stars .ic{width:15px;height:15px;color:#f5a524}

/* clinic card */
.card-zone{position:relative;max-width:500px;width:100%;justify-self:center}
.card-zone::before{content:"";position:absolute;inset:18px -14px -16px 22px;border-radius:30px;background:linear-gradient(135deg,rgba(0,23,228,.16),rgba(0,201,212,.14));transform:rotate(3deg);z-index:0}
.clinic-card{position:relative;z-index:1;background:#fff;border:1px solid var(--line);border-radius:26px;padding:20px;box-shadow:var(--shadow-lg)}
@media(min-width:960px){.clinic-card{padding:28px}}
.cc-top{display:flex;align-items:center;gap:14px;padding-bottom:16px;border-bottom:1px solid var(--line)}
.cc-logo{width:64px;height:64px;border-radius:18px;background:var(--soft);display:grid;place-items:center;flex:none}
.cc-logo img{width:46px;height:auto}
.cc-name{font-weight:800;color:var(--navy);font-size:1.06rem;line-height:1.25;letter-spacing:-.01em}
.cc-open{margin-top:7px;display:inline-flex;align-items:center;gap:8px;font-size:.78rem;font-weight:800;color:#166534;background:#ecfdf3;padding:4px 10px 4px 9px;border-radius:999px}
.cc-rows{margin:4px 0 0}
.cc-row{display:flex;gap:14px;padding:14px 0;border-bottom:1px dashed var(--line)}
.cc-row:last-child{border-bottom:0}
.cc-ic{width:40px;height:40px;border-radius:12px;background:var(--brand-50);color:var(--brand);display:grid;place-items:center;flex:none}
.cc-ic .ic{width:19px;height:19px}
.cc-k{font-size:.72rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:var(--muted)}
.cc-v{margin:3px 0 0;font-weight:600;color:var(--ink);font-size:.94rem;line-height:1.45}
.cc-v a{color:var(--brand)}
.cc-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
.cc-actions .btn{padding:13px 12px;font-size:.94rem}
.float-badge{position:absolute;z-index:2;display:none;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:10px 14px;box-shadow:var(--shadow);font-weight:700;font-size:.84rem;color:var(--navy);white-space:nowrap;animation:bob 6s ease-in-out infinite}
.float-badge .ic{width:17px;height:17px;color:var(--brand)}
.fb-1 .ic{color:#f5a524}
.fb-1{top:-20px;right:20px}
.fb-2{bottom:-22px;left:-26px;animation-delay:-3s}
@media(min-width:960px){.float-badge{display:inline-flex}}
@keyframes bob{50%{transform:translateY(-6px)}}

/* quick facts */
.stats{position:relative;z-index:2;margin-top:-38px}
.stats-card{display:grid;grid-template-columns:1fr 1fr;background:#fff;border:1px solid var(--line);border-radius:22px;box-shadow:var(--shadow)}
.stat{padding:16px 16px 18px;font-size:.84rem;color:var(--muted);line-height:1.35}
.stat:nth-child(odd){border-right:1px solid var(--line)}
.stat:nth-child(-n+2){border-bottom:1px solid var(--line)}
.stat b{display:block;font-size:1.65rem;font-weight:800;color:var(--navy);letter-spacing:-.03em;line-height:1.15;margin-bottom:2px}
.stat b small{font-size:.7em;color:#f5a524;margin-left:2px}
@media(min-width:860px){.stats-card{grid-template-columns:repeat(4,1fr)}.stat{padding:24px 26px;font-size:.9rem}.stat:nth-child(-n+2){border-bottom:0}.stat:not(:last-child){border-right:1px solid var(--line)}.stat b{font-size:2rem}}

/* sections */
.sec{padding:72px 0}
@media(min-width:960px){.sec{padding:108px 0}}
.sec-soft{background:var(--soft)}
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:.76rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--brand)}
.eyebrow::before{content:"";width:20px;height:2px;border-radius:2px;background:linear-gradient(90deg,var(--brand),var(--cyan))}
.sec-head{max-width:44rem}
.sec-head.center{margin:0 auto;text-align:center}
.sec-head.center .eyebrow::after{content:"";width:20px;height:2px;border-radius:2px;background:linear-gradient(90deg,var(--cyan),var(--brand))}
.h2{margin-top:12px;font-size:clamp(1.8rem,5vw,2.75rem);font-weight:800}
.intro{margin-top:14px;font-size:1.04rem;color:var(--body)}

/* about */
.about-grid{display:grid;gap:40px;align-items:center}
@media(min-width:960px){.about-grid{grid-template-columns:.92fr 1.08fr;gap:72px}}
.about-visual{position:relative;overflow:hidden;isolation:isolate;min-height:320px;border-radius:28px;padding:26px;display:flex;align-items:flex-end;color:#fff;background:radial-gradient(120% 100% at 100% 0%,#3a5bff 0%,var(--brand) 42%,#0a137a 100%)}
@media(min-width:960px){.about-visual{min-height:440px;padding:34px}}
.about-visual::before{content:"";position:absolute;inset:0;z-index:-1;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 75%);mask-image:linear-gradient(180deg,#000,transparent 75%)}
.av-ecg{position:absolute;left:0;right:0;top:28%;width:100%;height:120px;z-index:-1}
.av-ecg polyline{fill:none;stroke:#7fe9f0;stroke-width:2.4;stroke-linejoin:round;stroke-linecap:round;opacity:.7;stroke-dasharray:900;stroke-dashoffset:900;animation:trace 3.4s ease-out .3s forwards}
@keyframes trace{to{stroke-dashoffset:0}}
.av-heart{position:absolute;top:24px;right:24px;width:60px;height:60px;border-radius:18px;background:#fff;display:grid;place-items:center;box-shadow:0 18px 40px -16px rgba(0,0,0,.5)}
.av-heart svg{width:32px;height:32px}
.av-quote{font-size:clamp(1.55rem,4.2vw,2.3rem);font-weight:800;line-height:1.12;letter-spacing:-.03em;max-width:15ch}
.av-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.av-chip{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.26);padding:7px 12px;border-radius:999px;font-weight:700;font-size:.8rem;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
.checks{display:grid;gap:16px;margin-top:26px}
.checks li{display:flex;gap:14px;align-items:flex-start;color:var(--body)}
.checks b{color:var(--navy)}
.ck{width:28px;height:28px;border-radius:9px;background:#e8f8ee;color:#15803d;display:grid;place-items:center;flex:none;margin-top:1px}
.ck .ic{width:16px;height:16px;stroke-width:2.6}
.text-link{display:inline-flex;align-items:center;gap:8px;margin-top:26px;font-weight:800;color:var(--brand)}
.text-link .ic{width:18px;height:18px;transition:transform .2s}
.text-link:hover .ic{transform:translateX(4px)}

/* services */
.svc-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:36px}
@media(min-width:900px){.svc-grid{grid-template-columns:repeat(4,1fr);gap:18px;margin-top:52px}}
.svc{background:#fff;border:1px solid var(--line);border-radius:20px;padding:18px 16px 20px;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
@media(min-width:900px){.svc{padding:26px 22px 28px}}
.svc:hover{transform:translateY(-4px);box-shadow:var(--shadow);border-color:var(--brand-100)}
.svc-ic{width:46px;height:46px;border-radius:14px;background:var(--brand-50);color:var(--brand);display:grid;place-items:center}
.svc-ic .ic{width:23px;height:23px}
.svc.red .svc-ic{background:#fff0eb;color:var(--red)}
.svc h3{margin-top:14px;font-size:1rem;font-weight:800;letter-spacing:-.01em}
.svc p{margin-top:5px;font-size:.87rem;color:var(--muted);line-height:1.45}
.also{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;margin-top:30px}
.also-l{font-weight:800;color:var(--navy);font-size:.9rem;margin-right:2px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{display:inline-flex;align-items:center;gap:6px;padding:8px 13px;border-radius:999px;background:#fff;border:1px solid var(--line);font-weight:600;font-size:.86rem;color:var(--ink)}
.chip .ic{width:15px;height:15px;color:var(--brand)}

/* doctors */
.doc-grid{display:grid;gap:10px;margin-top:34px}
@media(min-width:640px){.doc-grid{grid-template-columns:1fr 1fr;gap:12px}}
@media(min-width:960px){.doc-grid{grid-template-columns:repeat(4,1fr);gap:18px;margin-top:52px}}
.doc{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:14px 16px;transition:transform .25s ease,box-shadow .25s ease}
.doc:hover{transform:translateY(-3px);box-shadow:var(--shadow)}
@media(min-width:960px){.doc{flex-direction:column;text-align:center;padding:28px 18px 24px}}
.doc-av{width:54px;height:54px;border-radius:50%;flex:none;display:grid;place-items:center;font-weight:800;font-size:1.02rem;letter-spacing:.03em;color:#fff;background:linear-gradient(135deg,var(--brand),#5b72ff)}
.doc-av.av1{background:linear-gradient(135deg,#0891b2,#2563eb)}
.doc-av.av2{background:linear-gradient(135deg,#1e3a8a,#3b82f6)}
.doc-av.av3{background:linear-gradient(135deg,#0d9488,#0ea5e9)}
@media(min-width:960px){.doc-av{width:78px;height:78px;font-size:1.4rem}}
.doc h3{font-size:.97rem;font-weight:800;line-height:1.3;letter-spacing:-.01em}
.doc p{font-size:.85rem;color:var(--muted);margin-top:2px}
.mmc{display:inline-flex;align-items:center;gap:5px;margin-top:8px;font-size:.73rem;font-weight:800;color:var(--brand);background:var(--brand-50);padding:4px 10px 4px 7px;border-radius:999px}
.mmc .ic{width:14px;height:14px}
.doc-more{background:linear-gradient(135deg,var(--brand-50),#effcfd);border-style:dashed;border-color:var(--brand-200)}
.doc-more .doc-av{background:#fff;color:var(--brand)}
.doc-more .doc-av .ic{width:24px;height:24px}
.doc-more h3{color:var(--brand)}
@media(min-width:960px){.doc-more{justify-content:center}}

/* panels */
.panel-box{margin:34px auto 0;max-width:62rem;background:#fff;border:1px solid var(--line);border-radius:26px;padding:22px;box-shadow:var(--shadow-sm)}
@media(min-width:960px){.panel-box{padding:34px;margin-top:48px}}
.panel-box .chips{justify-content:center}
.chip-hot{background:var(--brand);border-color:var(--brand);color:#fff;font-weight:800}
.chip-hot .ic{color:#fff}
.chip-more{background:transparent;border-style:dashed;color:var(--muted)}
.panel-note{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:22px;padding-top:18px;border-top:1px solid var(--line);font-size:.88rem;color:var(--muted);text-align:left}
.panel-note .ic{color:var(--brand)}

/* faq */
/* phones: heading, the questions, then the "still have a question" box; wide screens: heading + box stick beside the questions */
.faq-grid{display:flex;flex-direction:column}
.faq-side{display:contents}
.faq-side .eyebrow{align-self:flex-start}
.faq-list{order:1;margin-top:28px}
.ask{order:2}
@media(min-width:960px){.ask{margin-top:26px}.faq-grid{display:grid;grid-template-columns:.82fr 1.18fr;gap:64px;align-items:start}.faq-side{display:block;position:sticky;top:calc(var(--hdr) + 28px)}.faq-list{margin-top:0}}
.ask{margin-top:18px;border-radius:24px;padding:24px;color:#fff;background:radial-gradient(120% 120% at 0% 0%,#22307a 0%,var(--navy) 60%)}
.ask-t{font-weight:800;font-size:1.15rem}
.ask-s{margin-top:4px;color:#c3c9de;font-size:.93rem}
.ask-cta{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}
.ask-cta .btn{padding:12px 10px;font-size:.92rem}
.qa{background:#fff;border:1px solid var(--line);border-radius:18px;transition:border-color .2s,box-shadow .2s}
.qa+.qa{margin-top:10px}
.qa[open]{border-color:var(--brand-100);box-shadow:var(--shadow-sm)}
.qa summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 20px;font-weight:700;color:var(--navy);font-size:1rem;line-height:1.4}
.qa summary::-webkit-details-marker{display:none}
.pm{width:30px;height:30px;border-radius:50%;background:var(--brand-50);color:var(--brand);display:grid;place-items:center;flex:none;transition:transform .25s ease,background .2s,color .2s}
.pm .ic{width:16px;height:16px;stroke-width:2.4}
.qa[open] .pm{transform:rotate(45deg);background:var(--brand);color:#fff}
.faq-answer{padding:0 20px 20px;color:var(--body);font-size:.96rem}

/* location */
.loc-grid{display:grid;gap:18px;margin-top:30px}
@media(min-width:960px){.loc-grid{grid-template-columns:1fr 1.12fr;gap:28px;margin-top:44px}}
.loc-side{display:grid;gap:14px;align-content:start}
.loc-card{background:#fff;border:1px solid var(--line);border-radius:24px;padding:6px 20px 20px}
.loc-row{display:flex;gap:14px;padding:16px 0;border-bottom:1px solid var(--line)}
.loc-row:nth-child(3){border-bottom:0}
.loc-row h3{font-size:.95rem;font-weight:800;letter-spacing:-.01em}
.loc-row p{margin-top:2px;color:var(--body);font-size:.94rem;overflow-wrap:anywhere}
.loc-row a{color:var(--brand);font-weight:600}
.loc-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px}
.loc-actions .btn{padding:13px 10px;font-size:.93rem}
.areas{background:#fff;border:1px solid var(--line);border-radius:24px;padding:20px}
.areas h3{font-size:1rem;font-weight:800}
.areas p{margin-top:4px;font-size:.9rem;color:var(--muted)}
.areas .chips{margin-top:12px}
.areas .chip{background:var(--soft)}
.sister{display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:22px;background:linear-gradient(135deg,#fff 0%,var(--brand-50) 100%);border:1px solid var(--brand-100);transition:transform .2s,box-shadow .2s}
.sister:hover{transform:translateY(-2px);box-shadow:var(--shadow)}
.sister-t{flex:1;min-width:0}
.sister-t small{display:block;font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.sister-t b{display:block;color:var(--navy);font-weight:800;margin-top:1px}
.sister-t span{display:block;font-size:.86rem;color:var(--muted)}
.sister>.ic{color:var(--brand)}
.map{position:relative;min-height:320px;border-radius:24px;overflow:hidden;border:1px solid var(--line);background:#e9edf6;box-shadow:var(--shadow-sm)}
.map iframe{position:absolute;inset:0;display:block;width:100%;height:100%;border:0}
@media(min-width:960px){.map{min-height:460px}}

/* call to action */
.cta{padding:72px 0}
@media(min-width:960px){.cta{padding:96px 0}}
.cta-box{position:relative;overflow:hidden;isolation:isolate;border-radius:30px;padding:44px 22px;text-align:center;color:#fff;background:radial-gradient(120% 140% at 0% 0%,#2f4bff 0%,var(--brand) 38%,#0a137a 100%)}
@media(min-width:960px){.cta-box{padding:72px 48px}}
.cta-box::before{content:"";position:absolute;width:380px;height:380px;right:-120px;top:-150px;border-radius:50%;background:radial-gradient(circle,rgba(0,201,212,.45),transparent 65%);z-index:-1}
.cta-box::after{content:"";position:absolute;width:360px;height:360px;left:-140px;bottom:-190px;border-radius:50%;background:radial-gradient(circle,rgba(168,235,67,.32),transparent 65%);z-index:-1}
.cta-box h2{color:#fff;font-size:clamp(1.8rem,5vw,2.8rem);font-weight:800}
.cta-box p{margin:14px auto 0;max-width:34rem;color:#d8deff;font-size:1.04rem}
.cta-box .cta-row{justify-content:center}

/* footer */
.foot{background:var(--navy);color:#b3bbd3;padding:56px 0 30px;font-size:.93rem}
.foot-grid{display:grid;gap:34px}
@media(min-width:860px){.foot-grid{grid-template-columns:1.5fr 1fr 1fr;gap:48px}}
.foot-logo{display:inline-flex;background:#fff;border-radius:16px;padding:10px 14px}
.foot-logo img{height:40px;width:auto}
.foot-about{margin-top:16px;max-width:24rem;line-height:1.7}
.social{display:flex;gap:10px;margin-top:18px}
.social a{width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.08);color:#e7ebf7;display:grid;place-items:center;transition:background .2s}
.social a:hover{background:var(--brand)}
.foot h4{color:#fff;font-size:.78rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px}
.foot ul{display:grid;gap:11px}
.foot li a,.foot li span{display:inline-flex;align-items:center;gap:10px;transition:color .15s}
.foot li .ic{width:17px;height:17px;color:#7f8bb0}
.foot a:hover{color:#fff}
.foot-bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;margin-top:40px;padding-top:22px;border-top:1px solid rgba(255,255,255,.1);font-size:.8rem;color:#8790ab}

/* phone action bar + desktop chat button */
.mbar{position:fixed;left:0;right:0;bottom:0;z-index:45;display:grid;grid-template-columns:1fr 1.45fr 1fr;gap:8px;padding:10px 12px calc(10px + env(safe-area-inset-bottom));background:rgba(255,255,255,.95);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-top:1px solid var(--line);box-shadow:0 -12px 30px -20px rgba(11,20,55,.4)}
.mbar a{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;height:54px;border-radius:15px;background:var(--soft);color:var(--navy);font-weight:700;font-size:.76rem}
.mbar a .ic{width:20px;height:20px;color:var(--brand)}
.mbar .mbar-chat{flex-direction:row;gap:9px;background:var(--chat);color:#fff;font-size:1rem;font-weight:800;box-shadow:0 10px 22px -12px rgba(21,128,61,.9)}
.mbar .mbar-chat .ic{color:#fff;width:22px;height:22px}
@media(min-width:960px){.mbar{display:none}}
.fab{display:none}
@media(min-width:960px){
  .fab{position:fixed;right:26px;bottom:26px;z-index:45;display:grid;place-items:center;width:62px;height:62px;border-radius:50%;background:var(--chat-fab);color:#fff;box-shadow:0 18px 34px -12px rgba(22,163,74,.75);transition:transform .2s}
  .fab:hover{transform:scale(1.07)}
  .fab .ic{width:30px;height:30px}
  .fab-tip{position:absolute;right:74px;top:50%;transform:translateY(-50%) translateX(6px);background:var(--navy);color:#fff;font-weight:700;font-size:.84rem;padding:8px 12px;border-radius:10px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s}
  .fab:hover .fab-tip,.fab:focus-visible .fab-tip{opacity:1;transform:translateY(-50%)}
}

/* the smallest phones (320 px): paired buttons stack, labels may wrap */
.cc-actions .btn,.loc-actions .btn,.ask-cta .btn,.sheet-cta .btn{white-space:normal;text-align:center}
@media(max-width:359px){.cc-actions,.loc-actions,.ask-cta,.sheet-cta{grid-template-columns:1fr}.mbar{gap:6px;padding-left:8px;padding-right:8px}.mbar a{font-size:.7rem}.mbar .mbar-chat{font-size:.92rem;gap:7px}}

/* reveal on scroll (only when JavaScript runs; the page reads fine without it) */
.js .rv{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:calc(var(--d,0) * 70ms)}
.js .rv.in{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}html{scroll-behavior:auto}.js .rv{opacity:1;transform:none}}
`;

/* ──────────────────────────────── script ──────────────────────────────── */

const JS = `
(function(){
  var d=document, root=d.documentElement;
  var yr=d.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();

  // header gets a hairline once the page scrolls
  var hdr=d.getElementById('hdr');
  function onScroll(){ hdr.classList.toggle('scrolled', window.scrollY>8); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // phone menu
  var btn=d.getElementById('menuBtn'), sheet=d.getElementById('menu');
  function setMenu(open){
    sheet.hidden=!open; btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
  }
  btn.addEventListener('click', function(){ setMenu(sheet.hidden); });
  sheet.addEventListener('click', function(e){ if(e.target.closest('a')) setMenu(false); });
  d.addEventListener('keydown', function(e){ if(e.key==='Escape') setMenu(false); });
  window.addEventListener('resize', function(){ if(window.innerWidth>=1080) setMenu(false); });

  // BM / EN — Bahasa Melayu is in the page; English comes from data-en
  var texts=[].slice.call(d.querySelectorAll('[data-en]'));
  var htmls=[].slice.call(d.querySelectorAll('[data-en-html]'));
  texts.forEach(function(el){ el._ms=el.textContent; });
  htmls.forEach(function(el){ el._ms=el.innerHTML; });
  var langBtns=[].slice.call(d.querySelectorAll('[data-lang]'));
  function setLang(l){
    var en=l==='en';
    texts.forEach(function(el){ el.textContent= en ? el.getAttribute('data-en') : el._ms; });
    htmls.forEach(function(el){ el.innerHTML= en ? el.getAttribute('data-en-html') : el._ms; });
    root.lang= en ? 'en' : 'ms';
    langBtns.forEach(function(b){ b.setAttribute('aria-pressed', String(b.getAttribute('data-lang')===l)); });
    try{ localStorage.setItem('hij-lang', l); }catch(e){}
  }
  langBtns.forEach(function(b){ b.addEventListener('click', function(){ setLang(b.getAttribute('data-lang')); }); });
  try{ if(localStorage.getItem('hij-lang')==='en') setLang('en'); }catch(e){}

  // cards ease in as they scroll into view
  var items=[].slice.call(d.querySelectorAll('.rv'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {rootMargin:'0px 0px -6% 0px', threshold:.06});
    items.forEach(function(el){ io.observe(el); });
  } else { items.forEach(function(el){ el.classList.add('in'); }); }
})();
`;

/* ──────────────────────────────── build ──────────────────────────────── */

for (const [key, s] of Object.entries(SITES)) {
  const html = page(s);
  writeFileSync(s.out, html);
  console.log(`${key}: ${s.out} (${(html.length / 1024).toFixed(1)} KB)`);
}
