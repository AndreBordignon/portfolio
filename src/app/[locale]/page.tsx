"use client";

import { useState } from "react";
import NewsletterForm from "../components/NewsletterForm";
import Blog from "../components/blog";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Globe3D from "../components/Globe3D";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#1c1917] text-[#e7e5e4] min-h-screen">
      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <section id="blog" className="py-20 px-4 bg-[#292524]/30">
        <div className="max-w-6xl mx-auto">
          <Blog />
        </div>
      </section>
      <ProjectsSection />
      {/* <section id="globe" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-medium mb-4 text-[#f97316]">
              Global Connection
            </h2>
            <p className="text-[#a8a29e] text-sm leading-relaxed max-w-[50%]">
              See where I am in Brazil and where you are in the world. We&apos;re all connected!
            </p>
          </div>
          <Globe3D />
        </div>
      </section> */}
      <ContactSection />
      <NewsletterForm />
      <Footer />
    </div>
  );
};

export default Portfolio;
