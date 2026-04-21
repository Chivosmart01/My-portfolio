import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import About from '@/components/about'
import TechStack from '@/components/tech-stack'
import Projects from '@/components/projects'
import Experience from '@/components/experience'
import Contact from '@/components/contact'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
    </main>
  )
}
