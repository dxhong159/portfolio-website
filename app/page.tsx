import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { FeaturedProjects } from "@/components/featured-projects"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-20">
      <HeroSection />
      <SkillsSection />
      <FeaturedProjects />
    </div>
  )
}

