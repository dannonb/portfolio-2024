import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"


export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden max-w-full">
      <div className='flex flex-col w-full overflow-x-hidden max-w-full'>
        <Hero />
        <div className='space-y-32 pb-20 w-full overflow-x-hidden max-w-full'>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </div>
    </main>
  )
}
