import { useOutletContext } from 'react-router-dom'
import { Hero } from './Hero'
import { ContactCta, Experience, Expertise, Projects } from './Sections'
import type { Lang } from './data'

/* Four sections and an invitation. The shell used to sit between projects and
   contact; it is a dialog now (see ShellDialog), and the form moved to
   /contact, which is what took ~1400px off this page. */
export default function HomePage() {
  const lang = useOutletContext<Lang>()
  return (
    <>
      <Hero lang={lang} />
      <Expertise lang={lang} />
      <Experience lang={lang} />
      <Projects lang={lang} />
      <ContactCta lang={lang} />
    </>
  )
}
