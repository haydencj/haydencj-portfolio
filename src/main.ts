import Anser from 'anser'
import { inject } from '@vercel/analytics'
import './styles.css'

inject({
  mode: import.meta.env.DEV ? 'development' : 'production',
})

const SHIT_LIST_HASH = '#shit-list'
const HERO_INTERVAL_MS = 360
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
    dates: 'jan 2024 – feb 2024',
  },
] as const

type ProfileLink = {
  label: string
  href: string
}

const PROFILE_LINKS: readonly ProfileLink[] = [
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/haydencj',
  },
  {
    label: 'github',
    href: 'https://github.com/haydencj',
  },
  {
    label: 'email',
    href: 'mailto:haydenjohns02@gmail.com',
  },
] as const

const ESC = '\u001b['
const RESET = `${ESC}0m`
const FROG = `${ESC}1;92m`
const PAD = `${ESC}32m`
const WATER = `${ESC}96m`
const NAME = `${ESC}1;97m`
const DIM = `${ESC}90m`

const FROG_ART_LINES = [
  "                             .-----.",
  "                            /7  .  (",
  "                           /   .-.  \\",
  "                          /   /   \\  \\",
  "                         / `  )   (   )",
  "                        / `   )   ).  \\",
  "                      .'  _.   \\_/  . |",
  "     .--.           .' _.' )`.        |",
  "    (    `---...._.'   `---.'_)    ..  \\",
  "     \\            `----....___    `. \\  |",
  "      `.           _ ----- _   `._  )/  |",
  "        `.       /\"  \\   /\"  \\`.  `._   |",
  "          `.    ((o)` ) ((o)` ) `.   `._\\",
  "            `-- '`---'   `---' )  `.    `-.",
  "               /                  ` \\      `-.",
  "             .'                      `.       `.",
  "            /                     `  ` `.       `-.",
  "     .--.   \\ ===._____.======. `    `   `. .___.--`     .''''.",
  "    ' .` `-. `.                )`. `   ` ` \\          .' . '",
  "   (8  .  ` `-.`.               ( .  ` `  .`\\      .'  '    ' /",
  "    \\  `. `    `-.               ) ` .   ` ` \\  .'   ' .  '  /",
  "     \\ ` `.  ` . \\`.    .--.     |  ` ) `   .``/   '  // .  /",
  "      `.  ``. .   \\ \\   .-- `.  (  ` /_   ` . / ' .  '/   .'",
  "        `. ` \\  `  \\ \\  '-.   `-'  .'  `-.  `   .  .'/  .'",
  "          \\ `.`.  ` \\ \\    ) /`._.`       `.  ` .  .'  /",
  "           |  `.`. . \\ \\  (.'               `.   .'  .'",
  "        __/  .. \\ \\ ` ) \\                     \\.' .. \\__",
  " .-._.-'     '\"  ) .-'   `.                   (  '\"     `-._.--.",
  "(_________.-====' / .' /\\_)`--..__________..-- `====-. _________)",
  "                 (.'(.'",
] as const

const RAW_FROG = FROG_ART_LINES.join('\n')

const FROG_OPEN_EYES = '((o)` ) ((o)` )'

const FROG_EYE_FRAMES = [
  FROG_OPEN_EYES,
  '((-)` ) ((-)` )',
  FROG_OPEN_EYES,
  '((.)` ) ((.)` )',
  FROG_OPEN_EYES,
] as const

function createAnsiFrogFrame(eyes: string): string {
  return RAW_FROG.replace(FROG_OPEN_EYES, eyes)
    .split('\n')
    .map((line) => `${FROG}${line}${RESET}`)
    .join('\n')
}

const ANSI_FRAMES = FROG_EYE_FRAMES.map((eyes) => createAnsiFrogFrame(eyes))

let cleanupHero: () => void = () => {}

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

function createTextEditShell(title: string, content: HTMLElement, shortTitle?: string): HTMLElement {
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
  if (shortTitle) {
    windowTitle.dataset.shortTitle = shortTitle
  }
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
  hero.setAttribute('aria-label', 'animated ascii frog and hayden johnson')

  const heroName = textElement('p', 'hero-name', 'hayden johnson')
  const heroFrog = document.createElement('pre')
  heroFrog.className = 'hero-frog'
  hero.append(heroName, heroFrog)

  const summary = textElement('p', 'summary', SUMMARY)

  const profileLinks = document.createElement('div')
  profileLinks.className = 'profile-links'
  profileLinks.setAttribute('role', 'group')
  profileLinks.setAttribute('aria-label', 'profile links')

  for (const link of PROFILE_LINKS) {
    const anchor = textElement('a', 'profile-link', link.label)
    anchor.href = link.href
    anchor.target = '_blank'
    anchor.rel = 'noreferrer'
    profileLinks.append(anchor)
  }

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
  bottomNav.append(shitLink, profileLinks)

  content.append(hero, summary, experienceSection, bottomNav)

  return createTextEditShell('portfolio.txt — hayden johnson', content, 'portfolio.txt — hayden j')
}

function createShitListPage(): HTMLElement {
  const content = document.createElement('div')

  const pageNav = document.createElement('nav')
  pageNav.className = 'page-nav'
  pageNav.setAttribute('aria-label', 'portfolio navigation')

  const backLink = textElement('a', 'back-link', '← portfolio')
  backLink.href = '#'
  pageNav.append(backLink)

  const heading = textElement('h1', 'page-heading', 'shit list')
  const names = textElement('pre', 'shit-names', 'leo\nvimal')

  content.append(pageNav, heading, names)

  return createTextEditShell('shit-list.txt', content)
}

function renderApp(): void {
  cleanupHero()
  cleanupHero = () => {}

  const app = qs<HTMLDivElement>('#app')
  app.replaceChildren()

  const page = window.location.hash === SHIT_LIST_HASH ? createShitListPage() : createPortfolioPage()
  app.append(page)

  const hero = page.querySelector<HTMLElement>('.hero-frog')

  if (hero) {
    cleanupHero = startHeroAnimation(hero)
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function startHeroAnimation(hero: HTMLElement): () => void {
  let frameIndex = 0
  setAnsiFrame(hero, ANSI_FRAMES[frameIndex])

  if (prefersReducedMotion()) {
    return () => {}
  }

  const intervalId = window.setInterval(() => {
    frameIndex = (frameIndex + 1) % ANSI_FRAMES.length
    setAnsiFrame(hero, ANSI_FRAMES[frameIndex])
  }, HERO_INTERVAL_MS)

  return () => window.clearInterval(intervalId)
}

function setAnsiFrame(hero: HTMLElement, frame: string): void {
  hero.innerHTML = Anser.ansiToHtml(frame)
}

function getHeroCleanup(): () => void {
  return cleanupHero
}

function setHeroCleanup(cleanup: () => void): void {
  cleanupHero = cleanup
}

void getHeroCleanup
void setHeroCleanup

renderApp()
window.addEventListener('hashchange', renderApp)
