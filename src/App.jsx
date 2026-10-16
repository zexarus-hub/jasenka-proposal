import { useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import coverPhoto from './assets/cover-photo.jpg'
import jasenkLogo from './assets/jasenka-logo.svg'
import './App.css'

/* ── data ─────────────────────────────────────────────── */
const scopeItems = [
  { title: 'Vizuální redesign', desc: 'Nový grafický koncept. Statický, rychlý web — responzivní layout pro všechna zařízení.' },
  { title: 'Struktura webu', desc: 'Stránky Úvod, Kde nás najdete, O nás, Historie, Pro pořadatele, Kontakty, Publikace. Přenos textů a fotografií ze stávajícího webu.' },
  { title: 'Sekce Kde nás najdete', desc: 'Přehled nadcházejících vystoupení a akcí celé organizace. Jednoduše spravovatelný seznam — přidání nové akce bez technických znalostí.' },
  { title: 'Formulář — objednávka knih', desc: 'Online formulář pro objednávku publikací souboru. Odesílání na e-mail, potvrzení objednateli, základní validace.' },
  { title: 'Šablony pro sociální sítě', desc: 'Sada grafických šablon na propagaci akcí pro jednotlivé sbory — jednotný vizuální styl Jasenky napříč celou organizací.' },
  { title: 'Zabezpečení HTTPS', desc: 'Instalace SSL/TLS certifikátu, přesměrování HTTP → HTTPS, HSTS hlavičky. Web bude plně zabezpečen.' },
  { title: 'Spuštění & podpora', desc: 'QA testování, nasazení na server, předání přístupů a dokumentace, 30 dní poprovozní péče.' },
]

const priceBlocks = [
  {
    label: 'I. Design & UX',
    rows: [
      { name: 'Wireframy & prototyp', note: 'Drátěné modely, interaktivní prototyp — až 3 kola revizí', price: '8 000 Kč', hours: '11 hod.' },
      { name: 'UI design — finální vizuály', note: 'Kompletní grafika všech stránek, desktop + mobilní verze', price: '13 000 Kč', hours: '18 hod.' },
      { name: 'Ilustrace & grafické prvky', note: 'Sada folklorních ornamentů — vektorový SVG formát', price: '5 000 Kč', hours: '7 hod.' },
    ],
    subtotal: '26 000 Kč',
    subtotalHours: '36 hod.',
  },
  {
    label: 'II. Grafika — šablony pro sociální sítě',
    rows: [
      { name: 'Šablony na propagaci akcí', note: 'Sada editovatelných šablon (Instagram, Facebook) pro jednotlivé sbory — jednotný branding Jasenky', price: '4 000 Kč', hours: '6 hod.' },
    ],
    subtotal: '4 000 Kč',
    subtotalHours: '6 hod.',
  },
  {
    label: 'III. Vývoj & implementace',
    rows: [
      { name: 'Statický frontend', note: 'HTML5 / CSS3 / JS, responzivní layout — PageSpeed Insights ≥ 90', price: '10 000 Kč', hours: '14 hod.' },
      { name: 'Formulář — objednávka knih', note: 'Validace, odeslání na e-mail, automatické potvrzení objednateli', price: '4 000 Kč', hours: '6 hod.' },
      { name: 'Sekce „Kde nás najdete"', note: 'Přehled akcí s jednoduchým rozhraním pro přidávání nových termínů', price: '5 000 Kč', hours: '7 hod.' },
      { name: 'Migrace obsahu', note: 'Přenos textů, fotografií a archivu ze stávajícího webu', price: '3 000 Kč', hours: '4 hod.' },
    ],
    subtotal: '22 000 Kč',
    subtotalHours: '31 hod.',
  },
  {
    label: 'IV. Bezpečnost & HTTPS',
    note: <>Cenu bude potřeba ověřit přímo u poskytovatele domény <a href="https://imo.cz/" target="_blank" rel="noreferrer">imo.cz</a></>,
    rows: [
      { name: 'SSL/TLS certifikát — instalace', note: 'Let\'s Encrypt nebo komerční — automatická obnova každých 90 dní', price: 'TBD', hours: 'TBD' },
      { name: 'HTTP → HTTPS přesměrování', note: '301 redirect, konfigurace .htaccess / Nginx, HSTS hlavičky', price: 'TBD', hours: 'TBD' },
    ],
    subtotal: 'TBD',
    subtotalHours: 'TBD',
  },
  {
    label: 'V. SEO & technická kvalita',
    rows: [
      { name: 'On-page SEO', note: 'Meta tagy, Schema.org, sitemap.xml, robots.txt, alt texty', price: '3 000 Kč', hours: '4 hod.' },
    ],
    subtotal: '3 000 Kč',
    subtotalHours: '4 hod.',
  },
  {
    label: 'VI. Spuštění & podpora',
    rows: [
      { name: 'Testování & nasazení', note: 'QA napříč prohlížeči a zařízeními, produkční server, finální DNS konfigurace', price: '4 000 Kč', hours: '6 hod.' },
      { name: 'Předání dokumentace', note: 'Jak přidávat akce a spravovat objednávky knih', price: '1 500 Kč', hours: '2 hod.' },
      { name: 'Podpora po spuštění — 30 dní', note: 'Drobné úpravy a opravy chyb bezprostředně po spuštění webu — odezva do 24 h', price: '2 500 Kč', hours: '5 hod.' },
    ],
    subtotal: '8 000 Kč',
    subtotalHours: '13 hod.',
  },
]

const payments = [
  { step: '01', when: 'Podpis smlouvy', pct: '40 %', amt: '25 200 Kč', desc: 'Záloha pro zahájení prací' },
  { step: '02', when: 'Schválení designu', pct: '30 %', amt: '18 900 Kč', desc: 'Po odsouhlasení finálních vizuálů' },
  { step: '03', when: 'Předání webu', pct: '30 %', amt: '18 900 Kč', desc: 'Po spuštění do ostrého provozu' },
]

const timeline = [
  { weeks: 'Týden 1–2', title: 'Analýza & wireframy', desc: 'Sběr podkladů, cílová skupina, struktura webu, první drátěné modely.' },
  { weeks: 'Týden 3–4', title: 'Grafický design', desc: 'Finální vizuály, prezentace klientovi, revize a schválení.' },
  { weeks: 'Týden 5–7', title: 'Vývoj & integrace', desc: 'Frontend kódování, CMS, migrace obsahu, implementace HTTPS.' },
  { weeks: 'Týden 8', title: 'Testování & spuštění', desc: 'QA, opravy, nasazení do ostrého provozu, předání přístupů.' },
  { weeks: 'Týden 9–12', title: 'Poprovozní podpora', desc: '30 dní záruční péče, sledování výkonu, drobné korekce.' },
]

const conditions = [
  <>Nabídka je platná <strong>30 dní</strong> od data vystavení.</>,
  <>DPP je preferovaná forma spolupráce, ale jsem otevřený dohodě — hlavní je, aby to bylo výhodné pro obě strany.</>,
  <>Bez ohledu na zvolenou formu musí být smlouva podepsána před zahájením prací.</>,
  <>Nabídka nezahrnuje tvorbu fotografického materiálu ani placené reklamní kampaně.</>,
  <>Přístupy k hostingu, doméně a FTP/SSH si zajistím sám u Jana Václavíka.</>,
  <>Změny v rozsahu po schválení designu: hodinová sazba <strong>1 200 Kč/hod.</strong></>,
  <>Zdrojové soubory jsou předány po uhrazení odměny.</>,
  <>Doménová registrace a hosting jsou již zajištěny — nejsou součástí této nabídky.</>,
]

/* ── helpers ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay } },
})

function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger(delay)}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span>{children}</span>
    </div>
  )
}

/* ── components ────────────────────────────────────────── */
function Cover() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="cover" ref={ref}>
      <motion.div className="cover-bg" style={{ backgroundImage: `url(${coverPhoto})`, y }} />
      <motion.div className="cover-inner" style={{ opacity }}>
        <div className="cover-top">
          <div className="cover-logo-wrap">
            <img src={jasenkLogo} className="cover-logo-img" alt="Jasenka logo" />
            <span className="cover-logo">Jasenka.com</span>
          </div>
          <div className="cover-meta">
            <span>Cenová nabídka</span>
            <span>Říjen 2026</span>
            <span>Platnost 30 dní</span>
          </div>
        </div>

        <div className="cover-center">
          <motion.div
            className="cover-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Redesign webu
          </motion.div>
          <motion.div
            className="cover-h1-wrap"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1>
              Nový web<br /><em>pro valašský folklorní sbor</em><br />Jasenka
            </h1>
          </motion.div>
        </div>

        <motion.div
          className="cover-bottom"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="cover-intro">
            Moderní, rychlý a bezpečný web, který důstojně reprezentuje folklorní soubor Jasenka —
            od nového vizuálního konceptu přes zabezpečení HTTPS až po správu obsahu
            bez technických znalostí.
          </p>
          <div className="cover-price">
            <span className="p-label">Celková cena</span>
            <span className="p-amount">63 000 Kč</span>
            <span className="p-note">Formou DPP</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function Section({ label, children }) {
  return (
    <section className="section">
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>
      {children}
    </section>
  )
}

function PriceBlock({ block, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      className="price-block"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: index * 0.05 } } }}
    >
      <motion.div className="price-block-header" variants={fadeUp}>
        <span>{block.label}</span>
        <span className="ph-hours-head">Hod.</span>
        <span>Cena</span>
      </motion.div>
      {block.rows.map((row, i) => (
        <motion.div key={i} className="price-row" variants={fadeUp}>
          <div>
            <div className="pr-name">{row.name}</div>
            <div className="pr-note">{row.note}</div>
          </div>
          <div className={`pr-hours${row.hours === 'TBD' ? ' pr-tbd' : ''}`}>{row.hours}</div>
          <div className={`pr-amount${row.price === 'TBD' ? ' pr-tbd' : ''}`}>{row.price}</div>
        </motion.div>
      ))}
      <motion.div className="price-block-footer" variants={fadeUp}>
        <span className="pf-label">Mezisoučet</span>
        {block.subtotalHours && <span className={`pf-hours${block.subtotalHours === 'TBD' ? ' pr-tbd' : ''}`}>{block.subtotalHours}</span>}
        <span className={`pf-sub${block.subtotal === 'TBD' ? ' pr-tbd' : ''}`}>{block.subtotal}</span>
      </motion.div>
      {block.note && (
        <motion.div className="price-block-note" variants={fadeUp}>
          — {block.note}
        </motion.div>
      )}
    </motion.div>
  )
}

function App() {
  return (
    <>
      <Cover />

      <main>

        {/* ÚVOD */}
        <Section label="Úvod">
          <Reveal delay={0.1}>
            <p className="prose">
              Předkládám návrh na kompletní redesign webu <strong>jasenka.com</strong>.
              Nový web bude z větší části statický — důraz na rychlost a jednoduchost.
              Dynamické jsou dvě klíčové funkce: formulář pro objednávku knih a sekce akcí,
              kde bude přehled nadcházejících vystoupení celé organizace.
            </p>
          </Reveal>
        </Section>

        {/* ROZSAH */}
        <Section label="Co zahrnuje projekt">
          <ul className="scope-list">
            {scopeItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.06} className="scope-item-wrap">
                <li className="scope-item">
                  <span className="s-title">{item.title}</span>
                  <span className="s-desc">{item.desc}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* CENOVÁ SPECIFIKACE */}
        <Section label="Cenová specifikace">
          {priceBlocks.map((block, i) => (
            <PriceBlock key={i} block={block} index={i} />
          ))}
        </Section>

        {/* TOTAL */}
        <Reveal>
          <div className="total-strip">
            <div>
              <span className="t-label">Celková cena</span>
              <div className="t-amount">63 000 Kč</div>
              <span className="t-note">Formou DPP</span>
            </div>
            <div className="t-badges">
              <div className="t-badge">
                <span className="tb-val">8 týdnů</span>
                <span className="tb-sub">Délka projektu (2 měs. / 56 dní)</span>
              </div>
              <div className="t-badge">
                <span className="tb-val">~90 hod.</span>
                <span className="tb-sub">Odhadovaný rozsah prací</span>
              </div>
              <div className="t-badge">
                <span className="tb-val">30 dní</span>
                <span className="tb-sub">Podpora po spuštění</span>
              </div>
            </div>
            <div className="t-footnotes">
              <p className="t-footnote">* Odhadovaný čas je kalkulován s ohledem na aktuální rozložení práce — pracuji paralelně na více projektech, hodiny odpovídají reálné kapacitě, ne plnému úvazku.</p>
              <p className="t-footnote">* 8 týdnů je horní hranice dodání. S velkou pravděpodobností bude web hotov dříve — hodin strávených na projektu se to ale nijak nedotkne.</p>
            </div>
          </div>
        </Reveal>

        {/* PLATEBNÍ PODMÍNKY */}
        <Section label="Platební podmínky">
          <Reveal>
            <div className="payment-dpp">
              <div className="dpp-row">
                <span className="dpp-label">Forma odměny</span>
                <span className="dpp-val">Dohoda o provedení práce (DPP)</span>
              </div>
              <div className="dpp-row">
                <span className="dpp-label">Výše odměny</span>
                <span className="dpp-val">63 000 Kč</span>
              </div>
              <div className="dpp-row">
                <span className="dpp-label">Splatnost</span>
                <span className="dpp-val">Jednorázově po předání hotového webu</span>
              </div>
              <div className="dpp-row">
                <span className="dpp-label">Rozsah prací</span>
                <span className="dpp-val">Upřesníme před předáním</span>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* HARMONOGRAM */}
        <Section label="Harmonogram">
          <ul className="timeline">
            {timeline.map((t, i) => (
              <Reveal key={i} delay={i * 0.08} className="tl-item-wrap">
                <li className="tl-item">
                  <span className="tl-num">0{i + 1}</span>
                  <div>
                    <div className="tl-weeks">{t.weeks}</div>
                    <div className="tl-title">{t.title}</div>
                    <div className="tl-desc">{t.desc}</div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* PODMÍNKY */}
        <Section label="Podmínky nabídky">
          <ul className="cond-list">
            {conditions.map((c, i) => (
              <Reveal key={i} delay={i * 0.05} className="cond-item-wrap">
                <li className="cond-item">{c}</li>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* ZÁVĚR */}
        <Reveal>
          <div className="closing-note">
            <div className="cn-label">Budoucí spolupráce</div>
            <p className="cn-text">
              Pokud budete v budoucnu potřebovat cokoliv upravit, přidat nebo odebrat —
              jsem po ruce. Každá taková úprava bude řešena individuální domluvou,
              odměna bude odpovídat rozsahu úkonu a nebude se blížit ceně celého projektu.
              Cílem je dlouhodobá spolupráce, ne jednorázový projekt.
            </p>
            <p className="cn-text cn-text--note">
              Cena za přetvoření webu je nižší, než by byla za standardních okolností — jednak díky doporučení
              přes Dana Preislera, jednak proto, že mám rád valašský folklor a rád dám
              svou práci do služby něčemu, co stojí za to.
            </p>
          </div>
        </Reveal>

      </main>

      <footer>
        <span>Jasenka.com — Cenová nabídka, říjen 2026</span>
        <a href="mailto:contact.janik@gmail.com">contact.janik@gmail.com</a>
      </footer>
    </>
  )
}

export default App
