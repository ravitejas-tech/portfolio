import type { Route } from "./+types/home";
import { Navigation } from "~/components/Navigation";
import { Hero } from "~/components/Hero";
import { ExperienceSection } from "~/components/Experience";
import { FeaturedWork } from "~/components/FeaturedWork";

import { LabSection } from "~/components/LabSection";
import { TechCapabilities } from "~/components/TechCapabilities";
import { About } from "~/components/About";
import { Contact, Footer } from "~/components/Contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Raviteja Salva - Full Stack Product Engineer" },
    {
      name: "description",
      content:
        "Full Stack Developer building scalable web and mobile products with React, React Native, NestJS, and TypeScript. 8+ production projects, Coca-Cola 119 countries, ~400K daily requests.",
    },
    {
      property: "og:title",
      content: "Raviteja Salva - Full Stack Product Engineer",
    },
    {
      property: "og:description",
      content:
        "I build the systems behind useful products. Full Stack Developer working across React, React Native, NestJS, and TypeScript.",
    },
    { property: "og:type", content: "website" },
    { name: "theme-color", content: "#0a0a0b" },
  ];
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* 1. Hero with Avatar Card */}
        <Hero />

        {/* 2. Experience Section (Moved directly below Hero) */}
        <ExperienceSection />

        {/* 3. Featured Work with Project Mockup Images */}
        <FeaturedWork />

        {/* 4. Open Source & The Lab */}
        <LabSection />

        {/* 5. Technical Arsenal & Capabilities */}
        <TechCapabilities />

        {/* 6. About Narrative */}
        <About />

        {/* 7. Contact & Socials */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
