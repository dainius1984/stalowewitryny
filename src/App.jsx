import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Comparison } from "@/components/sections/Comparison";
import { Process } from "@/components/sections/Process";
import { Footer } from "@/components/layout/Footer";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Efekt ziarna na tle */}
      <div className="bg-grain" />
      
      <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
        <Navbar isModalOpen={isModalOpen} />
        <main className="pt-24 md:pt-28 flex-grow">
          <Hero onModalStateChange={setIsModalOpen} />
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

