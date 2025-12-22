import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Comparison } from "@/components/sections/Comparison";
import { Process } from "@/components/sections/Process";
import { Footer } from "@/components/layout/Footer";

function App() {
  return (
    <>
      {/* Efekt ziarna na tle */}
      <div className="bg-grain" />
      
      <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
        <Navbar />
        <main className="pt-32 md:pt-28 flex-grow">
          <Hero />
          <Comparison />
          <Portfolio />
          <Process />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App

