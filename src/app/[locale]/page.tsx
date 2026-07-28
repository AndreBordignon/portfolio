import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Work from "@/components/sections/Work";
import Craft from "@/components/sections/Craft";
import Contact from "@/components/sections/Contact";

export default function Portfolio() {
  return (
    <main id="conteudo">
      <Hero />
      <Manifesto />
      <Work />
      <Craft />
      <Contact />
    </main>
  );
}
