import './styles.css'

const SHIT_LIST_HASH = '#shit-list'
const SUMMARY = 'i build little systems for real problems.'

type ExperienceItem = {
  company: string
  title: string
  dates: string
}

const EXPERIENCE: readonly ExperienceItem[] = [
  {
    company: 'jpmorgan chase & co.',
    title: 'software engineer',
    dates: 'june 2025 – present',
  },
  {
    company: 'oncor electric delivery',
    title: 'full stack developer',
    dates: 'april 2024 – june 2025',
  },
  {
    company: 'hennge inc.',
    title: 'software engineer intern',
    dates: 'january 2024 – february 2024',
  },
] as const

function qs<T extends Element>(selector: string, root: ParentNode = document): T {
  const element = root.querySelector<T>(selector)

  if (!element) {
    throw new Error('missing element: ' + selector)
  }

  return element
}

function textElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  text: string,
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag)
  element.className = className
  element.textContent = text

  return element
}

function createTextEditShell(title: string, content: HTMLElement): HTMLElement {
  const main = document.createElement('main')
  main.className = 'desktop'

  const windowSection = document.createElement('section')
  windowSection.className = 'textedit-window'
  windowSection.setAttribute('aria-label', title)

  const titlebar = document.createElement('header')
  titlebar.className = 'titlebar'
  titlebar.setAttribute('aria-label', 'textedit document chrome')

  const trafficLights = document.createElement('div')
  trafficLights.className = 'traffic-lights'
  trafficLights.setAttribute('aria-hidden', 'true')

  for (const light of ['close', 'minimize', 'zoom'] as const) {
    const dot = document.createElement('span')
    dot.className = `dot ${light}`
    trafficLights.append(dot)
  }

  const windowTitle = textElement('p', 'window-title', title)
  const spacer = document.createElement('span')
  const documentArticle = document.createElement('article')
  documentArticle.className = 'document'

  while (content.firstChild) {
    documentArticle.append(content.firstChild)
  }

  titlebar.append(trafficLights, windowTitle, spacer)
  windowSection.append(titlebar, documentArticle)
  main.append(windowSection)

  return main
}

function createPortfolioPage(): HTMLElement {
  const content = document.createElement('div')

  const hero = document.createElement('section')
  hero.className = 'ansi-hero'
  hero.setAttribute('aria-label', 'hayden johnson')

  const heroName = textElement('p', 'hero-name', 'hayden johnson')
  hero.append(heroName)

  const summary = textElement('p', 'summary', SUMMARY)

  const experienceSection = document.createElement('section')
  experienceSection.className = 'experience-section'
  experienceSection.setAttribute('aria-labelledby', 'experience-heading')

  const experienceHeading = document.createElement('h2')
  experienceHeading.id = 'experience-heading'
  experienceHeading.textContent = 'experience'

  const experienceList = document.createElement('ol')
  experienceList.className = 'experience-list'
  experienceList.setAttribute('aria-label', 'experience')

  for (const item of EXPERIENCE) {
    const row = document.createElement('li')
    row.className = 'experience-row'
    row.append(
      textElement('span', 'company', item.company),
      textElement('span', 'role', item.title),
      textElement('span', 'dates', item.dates),
    )
    experienceList.append(row)
  }

  experienceSection.append(experienceHeading, experienceList)

  const bottomNav = document.createElement('nav')
  bottomNav.className = 'bottom-nav'
  bottomNav.setAttribute('aria-label', 'secondary')

  const shitLink = textElement('a', 'shit-link', 'shit list')
  shitLink.href = SHIT_LIST_HASH
  bottomNav.append(shitLink)

  content.append(hero, summary, experienceSection, bottomNav)

  return createTextEditShell('portfolio.txt — hayden johnson', content)
}

function createShitListPage(): HTMLElement {
  const content = document.createElement('div')
  const heading = textElement('h1', 'page-heading', 'shit list')
  const names = textElement('pre', 'shit-names', 'leo\nvimal')

  content.append(heading, names)

  return createTextEditShell('shit-list.txt', content)
}

function renderApp(): void {
  const app = qs<HTMLDivElement>('#app')
  app.replaceChildren()

  const page = window.location.hash === SHIT_LIST_HASH ? createShitListPage() : createPortfolioPage()
  app.append(page)
}

renderApp()
window.addEventListener('hashchange', renderApp)
