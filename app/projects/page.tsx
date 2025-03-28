"use client";

import { useTranslation } from "@/hooks/use-translation";
import { ProjectCard } from "@/components/project-card";
import { useRef, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  Search,
  Code,
  ArrowUpRight,
  Briefcase,
  ChevronDown,
} from "lucide-react";

// Types
type ProjectCategory = "all" | "web" | "mobile" | "desktop" | "design";
type TechnologyFilter = string | null;

export default function ProjectsPage() {
  const { t } = useTranslation();

  // State for filtering and categories
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [techFilter, setTechFilter] = useState<TechnologyFilter>(null);
  const [allTechnologies, setAllTechnologies] = useState<string[]>([]);

  // All projects data với đường dẫn ảnh mới
  const projects = [
    {
      id: 1,
      title: "PinkAI Chatbot",
      description: t("projects.pinkAiDesc"),
      image: "/pink-ai-mobile.png",
      technologies: ["Flutter", "Firebase", "Gemini API", "GitHub Copilot"],
      period: "12/2023 - 04/2024",
      link: "#",
      category: "mobile" as ProjectCategory,
      featured: true,
    },
    {
      id: 2,
      title: "Vinled Website",
      description: t("projects.vinledDesc"),
      image: "/placeholder.svg",
      technologies: ["WordPress", "Google AI Studio", "SEO"],
      period: "2023 - 2024",
      link: "https://vinthaco.com",
      category: "web" as ProjectCategory,
      hours: 350,
    },
    {
      id: 3,
      title: t("projects.phoneSales"),
      description: t("projects.phoneSalesDesc"),
      image: "/sell-management-wpf.png",
      technologies: ["WPF", "MSSQL", "WPF UI", "GitHub Copilot"],
      period: "08/2024 - 12/2024",
      link: "#",
      category: "desktop" as ProjectCategory,
      hours: 420,
    },
    {
      id: 4,
      title: t("projects.imeiManagement"),
      description: t("projects.imeiDesc"),
      image: "/imei-management.png",
      technologies: ["React", "Firebase", "Google AI Studio"],
      period: "01/2025 - 03/2025",
      link: "#",
      category: "web" as ProjectCategory,
      featured: true,
    },
    {
      id: 5,
      title: t("projects.ecommerce"),
      description: t("projects.ecommerceDesc"),
      image: "/phone-shop.png",
      technologies: ["ASP.NET", "MSSQL", "Docker", "GitHub Copilot"],
      period: "02/2025 - 03/2025",
      link: "#",
      category: "web" as ProjectCategory,
      hours: 280,
    },
  ];

  // Extract all unique technologies for filtering
  useEffect(() => {
    const techs = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => techs.add(tech));
    });
    setAllTechnologies(Array.from(techs).sort());
  }, []);

  // Filter projects based on category and technology
  const filteredProjects = projects.filter((project) => {
    // Category filter
    if (category !== "all" && project.category !== category) {
      return false;
    }
    // Technology filter
    if (techFilter && !project.technologies.includes(techFilter)) {
      return false;
    }
    return true;
  });

  // Featured projects for the carousel
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      {/* Improved Hero Section with better layout */}
      <section className="relative overflow-hidden">
        {/* Background gradient that doesn't affect layout */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/80 to-background -z-10"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10"></div>

        {/* Decorative circles positioned to not interfere with text */}
        <div className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-10 -right-20 w-72 h-72 rounded-full bg-secondary/10 blur-3xl -z-10"></div>

        {/* Container with proper padding and spacing */}
        <div className="container mx-auto px-4 py-24 md:py-32">
          {/* Projects heading with proper alignment */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Title section with improved styling and alignment */}
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Portfolio Showcase</span>
            </div>

            {/* Main title with consistent styling */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {t("projects.title")}
              </span>
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-ping"></span>
            </h1>

            {/* Subtitle with proper width constraint */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              {t("projects.subtitle")}
            </p>

            {/* Stats row with balanced spacing */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 w-full max-w-lg mx-auto mb-10 px-4">
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {projects.length}
                </span>
                <span className="text-sm text-muted-foreground mt-1">
                  Projects
                </span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {allTechnologies.length}
                </span>
                <span className="text-sm text-muted-foreground mt-1">
                  Technologies
                </span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {
                    Object.keys(
                      projects.reduce((acc, project) => {
                        if (project.category) {
                          acc[project.category] = true;
                        }
                        return acc;
                      }, {} as Record<string, boolean>)
                    ).length
                  }
                </span>
                <span className="text-sm text-muted-foreground mt-1">
                  Categories
                </span>
              </div>
            </div>

            {/* Call to action with centered alignment */}
            <a
              href="#featured-projects"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Explore Projects
              <ChevronDown size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section
        id="featured-projects"
        className="container mx-auto px-4 py-16 relative z-20"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <span className="bg-primary/20 text-primary p-2 rounded-lg mr-2">
            <Filter className="h-6 w-6" />
          </span>
          {t("home.featuredProjects")}
        </h2>

        <Carousel className="w-full">
          <CarouselContent>
            {featuredProjects.map((project) => (
              <CarouselItem
                key={project.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full">
                  <ProjectCard project={project} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4">
            <CarouselPrevious className="relative -left-4" />
            <CarouselNext className="relative -right-4" />
          </div>
        </Carousel>
      </section>

      {/* Projects Filter Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <Tabs
            defaultValue="all"
            onValueChange={(value) => setCategory(value as ProjectCategory)}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {techFilter && (
              <Badge
                variant="outline"
                className="cursor-pointer flex gap-1 items-center"
                onClick={() => setTechFilter(null)}
              >
                <Code className="h-3 w-3" />
                {techFilter}
                <span className="ml-1">×</span>
              </Badge>
            )}
            <div className="flex gap-2 flex-wrap">
              {allTechnologies.slice(0, 5).map((tech) => (
                <Badge
                  key={tech}
                  variant={techFilter === tech ? "default" : "secondary"}
                  className="cursor-pointer flex gap-1 items-center"
                  onClick={() =>
                    setTechFilter(tech === techFilter ? null : tech)
                  }
                >
                  <Code className="h-3 w-3" />
                  {tech}
                </Badge>
              ))}
              {allTechnologies.length > 5 && (
                <Badge variant="outline" className="cursor-pointer">
                  +{allTechnologies.length - 5}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Project Grid - Without animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try changing your filters or check back later for new projects.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
