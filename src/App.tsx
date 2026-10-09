import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type IconName =
  | 'arrow'
  | 'box'
  | 'check'
  | 'clock'
  | 'forklift'
  | 'mail'
  | 'map'
  | 'menu'
  | 'route'
  | 'school'
  | 'shield'
  | 'target'
  | 'truck'

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    box: <><path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="m3 8 9 5 9-5"/><path d="M12 13v9"/><path d="m21 8v9l-9 5-9-5V8"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    forklift: <><path d="M4 6h7v10H4z"/><path d="M11 10h3l2 6H9"/><path d="M19 5v13h2"/><path d="M16 18h5"/><circle cx="7" cy="19" r="2"/><circle cx="16" cy="19" r="2"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    map: <><path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z"/><path d="M9 3v15M15 6v15"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    route: <><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h3a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3H9a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h7"/></>,
    school: <><path d="m3 10 9-5 9 5-9 5-9-5Z"/><path d="M7 13v4c3 2 7 2 10 0v-4"/></>,
    shield: <><path d="M12 3 5 6v5c0 4.7 2.8 8.2 7 10 4.2-1.8 7-5.3 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m15 9 6-6M17 3h4v4"/></>,
    truck: <><path d="M3 6h11v11H3z"/><path d="M14 10h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? 'brand--light' : ''}`} href="#top" aria-label="FADA — retour à l’accueil">
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 44 44"><path d="M9 7h26v8H18v5h14v8H18v10H9V7Z"/><path className="brand__arrow" d="m28 28 7 5-7 5v-3H17v-4h11v-3Z"/></svg>
      </span>
      <span><strong>FADA</strong><small>Annecy · Logistique</small></span>
    </a>
  )
}

const program = {
  flux: {
    label: 'Gérer les flux',
    eyebrow: 'Bloc 01',
    title: 'De la réception à l’expédition',
    description: 'Comprendre chaque étape du parcours d’une marchandise et coordonner les opérations avec méthode.',
    skills: ['Réception et contrôle des marchandises', 'Mise en stock et adressage', 'Préparation et emballage des commandes', 'Organisation des expéditions'],
    icon: 'box' as IconName,
  },
  outils: {
    label: 'Piloter les outils',
    eyebrow: 'Bloc 02',
    title: 'Des données qui guident l’action',
    description: 'Utiliser les documents et outils numériques pour suivre les stocks et fiabiliser les opérations.',
    skills: ['Suivi des stocks et inventaires', 'Documents de transport', 'Traçabilité des produits', 'Indicateurs de performance'],
    icon: 'route' as IconName,
  },
  equipe: {
    label: 'Travailler en équipe',
    eyebrow: 'Bloc 03',
    title: 'Les bons réflexes professionnels',
    description: 'Communiquer, s’organiser et évoluer dans un environnement logistique en respectant chacun.',
    skills: ['Communication professionnelle', 'Organisation du poste de travail', 'Coordination avec les équipes', 'Posture et autonomie'],
    icon: 'school' as IconName,
  },
  securite: {
    label: 'Agir en sécurité',
    eyebrow: 'Bloc 04',
    title: 'Prévenir les risques au quotidien',
    description: 'Adopter les pratiques qui protègent les personnes, les marchandises et l’environnement.',
    skills: ['Prévention des risques', 'Qualité des opérations', 'Gestes et circulation en entrepôt', 'Logistique responsable'],
    icon: 'shield' as IconName,
  },
}

type ProgramKey = keyof typeof program

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProgram, setActiveProgram] = useState<ProgramKey>('flux')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [draft, setDraft] = useState<string | null>(null)

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(
      '.course-hero__copy, .facts > div, .section-heading, .prereq-cards article, .program-shell, .objectives-copy, .objective-cards article, .modality-card, .job-cards article, .study-card, .campus-card, .faq-item, .contact-copy, .contact-form, .qualiopi-card',
    )

    if (!('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('motion-visible'))
      return
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' })

    items.forEach((item, index) => {
      item.classList.add('motion-reveal')
      item.style.setProperty('--motion-delay', `${Math.min(index % 4, 3) * 70}ms`)
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const subject = encodeURIComponent(`Demande d'information FADA — ${name}`)
    const body = encodeURIComponent(`Bonjour,\n\nJe souhaite recevoir des informations sur le Bac Pro Logistique.\n\nNom : ${name}\nEmail : ${email}\n\nMerci.`)
    setDraft(`mailto:contact.of.fada@gmail.com?subject=${subject}&body=${body}`)
  }

  const selectedProgram = program[activeProgram]

  return (
    <div id="top">
      <div className="announcement">
        <span><Icon name="map" size={15}/> 22 chemin des Cloches · 74940 Annecy</span>
        <a href="mailto:contact.of.fada@gmail.com"><Icon name="mail" size={15}/> contact.of.fada@gmail.com</a>
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <Logo />
          <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Navigation principale">
            <a href="#ecole" onClick={closeMenu}>Présentation</a>
            <a href="#formation" onClick={closeMenu}>La formation</a>
            <a href="#debouches" onClick={closeMenu}>Débouchés</a>
            <a href="#campus" onClick={closeMenu}>Le campus</a>
            <a className="button button--small" href="#contact" onClick={closeMenu}>Nous contacter</a>
          </nav>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu">
            <Icon name="menu" />
          </button>
        </div>
      </header>

      <main className="course-page">
        <section className="course-hero">
          <div className="container course-hero__inner">
            <div className="course-hero__copy">
              <div className="eyebrow"><span>Formation professionnelle · Annecy</span><i /></div>
              <h1>Bac Pro<br/><em>Logistique</em></h1>
              <p>Une formation pour comprendre les flux, organiser les opérations et prendre sa place dans les métiers de la logistique.</p>
              <a className="button" href="#formation">Découvrir la formation <Icon name="arrow" size={18}/></a>
              <div className="course-hero__meta"><Icon name="map" size={18}/> Présentiel à Annecy <span>·</span> FADA</div>
            </div>
            <div className="course-hero__art" aria-label="Illustration d’un espace logistique">
              <div className="warehouse"><div className="warehouse__top"><span>FADA</span><div className="signal"><i/><i/><i/></div></div><div className="rack rack--one"><i/><i/><i/><i/><i/><i/></div><div className="rack rack--two"><i/><i/><i/><i/></div><div className="floor-lines"><i/><i/><i/></div><div className="forklift-art"><span className="forklift-art__mast"/><span className="forklift-art__body">F</span><span className="wheel wheel--one"/><span className="wheel wheel--two"/></div><div className="package package--one">↗</div><div className="package package--two"/></div>
            </div>
          </div>
        </section>

        <section className="course-facts" aria-label="Informations clés">
          <div className="container facts"><div><span>01</span><p>Diplôme</p><strong>Bac professionnel</strong></div><div><span>02</span><p>Spécialité</p><strong>Logistique</strong></div><div><span>03</span><p>Format</p><strong>100 % présentiel</strong></div><div><span>04</span><p>Lieu</p><strong>Annecy</strong></div></div>
        </section>

        <section className="section prerequisites" id="ecole">
          <div className="container">
            <div className="section-heading centered"><div className="section-kicker">Avant de commencer</div><h2>Les prérequis<br/><em>pour se lancer.</em></h2><p>La formation s’adresse aux personnes qui souhaitent découvrir un métier concret et construire leur projet professionnel.</p></div>
            <div className="prereq-cards">
              <article><span className="prereq-icon"><Icon name="target"/></span><small>01 · Motivation</small><h3>Envie d’apprendre</h3><p>Être curieux·se des activités de réception, de stockage et d’expédition.</p></article>
              <article><span className="prereq-icon"><Icon name="route"/></span><small>02 · Organisation</small><h3>Le goût de la méthode</h3><p>Aimer préparer, suivre des étapes et travailler avec méthode.</p></article>
              <article><span className="prereq-icon"><Icon name="school"/></span><small>03 · Projet</small><h3>Construire son parcours</h3><p>Être prêt·e à s’impliquer dans une formation en présentiel à Annecy.</p></article>
            </div>
          </div>
        </section>

        <section className="section program-section" id="formation">
          <div className="container">
            <div className="course-section-intro"><div><div className="section-kicker section-kicker--light">La formation</div><h2>Apprendre la logistique<br/><em>en situation.</em></h2></div><p>À FADA, la logistique s’apprend en faisant. Le parcours aborde les opérations et les outils qui permettent aux marchandises de circuler.</p></div>
            <div className="program-shell">
              <div className="program-tabs" role="tablist" aria-label="Compétences du programme">{(Object.entries(program) as [ProgramKey, typeof program.flux][]).map(([key, item]) => <button key={key} type="button" role="tab" aria-selected={activeProgram === key} className={activeProgram === key ? 'active' : ''} onClick={() => setActiveProgram(key)}><span><Icon name={item.icon} size={20}/></span>{item.label}<i>↗</i></button>)}</div>
              <article className="program-panel" role="tabpanel"><div className="program-panel__copy"><span className="program-eyebrow">{selectedProgram.eyebrow}</span><h3>{selectedProgram.title}</h3><p>{selectedProgram.description}</p><ul>{selectedProgram.skills.map(skill => <li key={skill}><span><Icon name="check" size={15}/></span>{skill}</li>)}</ul></div><div className="program-panel__art"><div className="mini-route"><span>APPRENDRE</span><i/><i/><i/><b><Icon name={selectedProgram.icon} size={44}/></b><small>PROGRESSER</small></div></div></article>
            </div>
          </div>
        </section>

        <section className="section objectives">
          <div className="container objectives-grid"><div className="objectives-copy"><div className="section-kicker">Objectifs pédagogiques</div><h2>Des compétences<br/><em>pour le terrain.</em></h2><p>Le parcours développe des savoir-faire opérationnels, une bonne organisation et les réflexes nécessaires pour travailler dans un environnement logistique.</p><a className="inline-link" href="#contact">Parler de mon projet <Icon name="arrow" size={17}/></a></div>
            <div className="objective-cards"><article><span>01</span><Icon name="box"/><h3>Maîtriser les flux</h3><p>Réceptionner, contrôler, stocker et préparer les marchandises.</p></article><article><span>02</span><Icon name="route"/><h3>Suivre les opérations</h3><p>Utiliser les documents et outils de suivi pour fiabiliser les stocks.</p></article><article><span>03</span><Icon name="shield"/><h3>Agir en sécurité</h3><p>Respecter les consignes et contribuer à la qualité des opérations.</p></article></div>
          </div>
        </section>

        <section className="section modality-section"><div className="container modality-card"><div><div className="section-kicker section-kicker--light">Modalités de formation</div><h2>Apprendre à Annecy,<br/><em>en présentiel.</em></h2><p>La formation Bac Pro Logistique de FADA se déroule sur le campus, au 22 chemin des Cloches à Annecy-le-Vieux.</p></div><div className="modality-points"><div><Icon name="school"/><strong>100 % présentiel</strong><span>Une école physique à Annecy</span></div><div><Icon name="map"/><strong>Campus FADA</strong><span>22 chemin des Cloches</span></div><a className="button button--white" href="#contact">Échanger avec l’équipe <Icon name="arrow" size={17}/></a></div></div></section>

        <section className="section opportunities" id="debouches"><div className="container"><div className="section-heading centered"><div className="section-kicker">Après la formation</div><h2>Les débouchés<br/><em>professionnels.</em></h2><p>Le Bac Pro Logistique prépare à des fonctions opérationnelles au cœur de la chaîne logistique.</p></div><div className="job-cards"><article><span>01</span><div><Icon name="box"/><h3>Opérateur logistique</h3><p>Réceptionner, stocker et préparer les marchandises.</p></div></article><article><span>02</span><div><Icon name="forklift"/><h3>Agent de quai</h3><p>Organiser les mouvements de marchandises en sécurité.</p></div></article><article><span>03</span><div><Icon name="truck"/><h3>Préparateur de commandes</h3><p>Garantir une préparation fiable, rapide et tracée.</p></div></article></div></div></section>

        <section className="section studies-section"><div className="container studies-layout"><div className="section-heading"><div className="section-kicker">Poursuite d’études</div><h2>Continuer à<br/><em>se spécialiser.</em></h2><p>Le parcours peut se prolonger dans les domaines du transport et de la logistique.</p></div><article className="study-card"><span className="study-card__icon"><Icon name="school" size={30}/></span><div><small>Après le Bac Pro</small><h3>Transport &amp; logistique</h3><p>Échangez avec l’équipe FADA pour explorer les possibilités de poursuite d’études selon votre projet.</p><a href="#contact" className="inline-link">Parler de mon projet <Icon name="arrow" size={17}/></a></div></article></div></section>

        <section className="campus" id="campus"><div className="container campus-card"><div className="campus-map" aria-hidden="true"><div className="map-grid"/><div className="map-road map-road--one"/><div className="map-road map-road--two"/><span className="map-pin"><Icon name="map" size={28}/></span><small>ANNECY-LE-VIEUX</small></div><div className="campus-copy"><div className="section-kicker section-kicker--light">Où se déroule la formation ?</div><h2>Le campus FADA,<br/><em>à Annecy.</em></h2><div className="address"><span><Icon name="map"/></span><p>22 chemin des Cloches<br/>(Annecy-le-Vieux)<br/>74940 Annecy</p></div><a className="button button--white" href="https://www.google.com/maps/search/?api=1&query=22+Chemin+des+Cloches+74940+Annecy" target="_blank" rel="noreferrer">Voir l’itinéraire <span>↗</span></a></div></div></section>

        <section className="section faq" id="faq"><div className="container faq-grid"><div className="section-heading"><div className="section-kicker">Questions fréquentes</div><h2>Vous vous<br/><em>demandez peut-être…</em></h2></div><div className="accordion">{[['À qui s’adresse cette formation ?', 'Le Bac Pro Logistique s’adresse aux jeunes qui aiment l’action, l’organisation, le travail en équipe et souhaitent découvrir les métiers de la chaîne logistique. Contactez FADA pour vérifier les modalités adaptées à votre situation.'],['Que vais-je apprendre ?', 'Vous découvrirez les opérations de réception, de stockage, de préparation et d’expédition, ainsi que la traçabilité, la sécurité et la communication professionnelle.'],['La formation est-elle disponible en ligne ?', 'Non. FADA est une école physique et le Bac Pro Logistique est proposé uniquement en présentiel à Annecy.'],['Où se trouve FADA ?', 'L’école se situe au 22 chemin des Cloches, à Annecy-le-Vieux, 74940 Annecy.']].map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'faq-item--open' : ''}`} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{String(index + 1).padStart(2, '0')}</span>{question}<i>{openFaq === index ? '−' : '+'}</i></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></div></section>

        <section className="contact" id="contact"><div className="container contact-grid"><div className="contact-copy"><div className="section-kicker section-kicker--light">Un projet commence par un échange</div><h2>Envie d’en savoir<br/><em>plus sur la formation ?</em></h2><p>Posez vos questions à l’équipe FADA. Nous vous répondrons avec les informations utiles à votre projet.</p><a href="mailto:contact.of.fada@gmail.com" className="email-link"><Icon name="mail"/>contact.of.fada@gmail.com</a></div><form className="contact-form" onSubmit={handleContact}><label>Votre nom<input name="name" type="text" placeholder="Nom et prénom" required/></label><label>Votre e-mail<input name="email" type="email" placeholder="vous@exemple.fr" required/></label><label>Votre profil<select name="profile" defaultValue=""><option value="" disabled>Choisissez une option</option><option>Futur élève</option><option>Parent / responsable</option><option>Entreprise</option><option>Autre</option></select></label><button className="button button--full" type="submit">Préparer mon message <Icon name="arrow" size={18}/></button>{draft && <p className="form-ready">Votre message est prêt. <a href={draft}>Ouvrir ma messagerie ↗</a></p>}<small>Ce formulaire prépare un e-mail dans votre messagerie. Aucune donnée n’est stockée sur ce site.</small></form></div></section>
      </main>

      <section className="qualiopi-section" aria-label="Certification Qualiopi">
          <div className="container qualiopi-card">
          <div className="qualiopi-heading"><span>Attestation de certification :</span><img src="/qualiopi-logo.png" alt="Logo Qualiopi, processus certifié — République Française" /></div>
          <div className="qualiopi-details"><p>La certification qualité a été délivrée au titre des catégories d’actions suivantes :</p><strong>Actions de formation</strong><strong>Actions de formation par apprentissage</strong></div>
        </div>
      </section>

      <footer>
          <div className="container footer-top">
          <Logo light />
          <div><strong>Navigation</strong><a href="#ecole">Prérequis</a><a href="#formation">La formation</a><a href="#debouches">Débouchés</a></div>
          <div><strong>Nous trouver</strong><p>22 chemin des Cloches<br/>74940 Annecy</p></div>
          <div><strong>Nous écrire</strong><a href="mailto:contact.of.fada@gmail.com">contact.of.fada@gmail.com</a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} FADA</span><span>Bac Pro Logistique · Annecy</span><a href="#top">Retour en haut ↑</a></div>
      </footer>
    </div>
  )
}

export default App
