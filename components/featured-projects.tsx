"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Star,
  Code,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function FeaturedProjects() {
  const { t } = useTranslation();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<number>(1);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
  const scale = useSpring(scaleProgress, { stiffness: 100, damping: 30 });
  const opacity = useSpring(opacityProgress, { stiffness: 100, damping: 30 });

  // Enhanced featured projects with more detailed info and better images
  const featuredProjects = [
    {
      id: 1,
      title: "PinkAI Chatbot",
      description: t("projects.pinkAiDesc"),
      image: "/pink-ai-mobile.png",
      technologies: ["Flutter", "Firebase", "Gemini API"],
      period: "12/2023 - 04/2024",
      link: "#",
      bgColor: "from-pink-500/20 to-purple-500/20",
      highlights: [
        "AI-powered responses",
        "Flutter UI animations",
        "Multi-language support",
      ],
      role: "Lead Developer",
    },
    {
      id: 2,
      title: "Vinled Website",
      description: t("projects.vinledDesc"),
      image: "/placeholder.jpg",
      technologies: ["WordPress", "Google AI Studio", "SEO"],
      period: "2023 - 2024",
      link: "https://vinthaco.com",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      highlights: [
        "SEO optimization",
        "Custom WordPress theme",
        "E-commerce integration",
      ],
      role: "Web Developer",
    },
    {
      id: 3,
      title: t("projects.imeiManagement"),
      description: t("projects.imeiDesc"),
      image: "/imei-management.png",
      technologies: ["React", "Firebase", "Google AI Studio"],
      period: "01/2025 - 03/2025",
      link: "#",
      bgColor: "from-green-500/20 to-emerald-500/20",
      highlights: [
        "Barcode scanning",
        "Real-time updates",
        "Analytics dashboard",
      ],
      role: "Full Stack Developer",
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      </div>

      {/* Header Section with Animation */}
      <div ref={headerRef} className="container mx-auto mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <motion.div
            initial="hidden"
            animate={headerInView ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.div variants={fadeInUp} className="mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                {t("home.showcase")}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold relative inline-block"
            >
              {t("home.featuredProjects")}
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-primary"></span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 md:mt-0"
          >
            <Button
              variant="outline"
              asChild
              size="sm"
              className="border-primary/40 hover:border-primary group"
            >
              <Link href="/projects" className="flex items-center">
                {t("home.viewAll")}
                <span className="ml-1 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Compact Tabs Navigation - Fixed by wrapping in Tabs component */}
      <div className="container mx-auto px-4 mb-6">
        <Tabs
          defaultValue="1"
          value={activeTab.toString()}
          onValueChange={(value) => setActiveTab(parseInt(value))}
        >
          <div className="flex justify-center">
            <TabsList className="bg-background/50 backdrop-blur-sm">
              {featuredProjects.map((project) => (
                <TabsTrigger
                  key={project.id}
                  value={project.id.toString()}
                  className={cn(
                    "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                    activeTab === project.id ? "border-b-2 border-primary" : ""
                  )}
                >
                  {project.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Featured Projects Showcase - Compact Design */}
          <motion.div
            className="container mx-auto px-4 mt-6"
            style={{ scale, opacity }}
          >
            {featuredProjects.map((project) => (
              <TabsContent key={project.id} value={project.id.toString()}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl overflow-hidden"
                >
                  <div
                    className={`relative rounded-xl overflow-hidden`}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Content with compact row layout */}
                    <div className="relative bg-background/80 backdrop-blur-sm overflow-hidden">
                      <div className="flex flex-col lg:flex-row">
                        {/* Project Image - Left Side */}
                        <div className="lg:w-1/3 overflow-hidden">
                          <motion.div
                            initial={false}
                            animate={{
                              scale: hoveredProject === project.id ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full relative aspect-video lg:aspect-auto"
                          >
                            <Image
                              src={project.image}
                              alt={project.title}
                              className="object-cover"
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              priority
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent lg:hidden"></div>

                            {/* Play button for video project */}
                            {project.id === 1 && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white ml-0.5"
                                  >
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                  </svg>
                                </div>
                              </div>
                            )}

                            {/* Mobile info overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 lg:hidden">
                              <Badge
                                variant="outline"
                                className="mb-2 border-primary/30 text-primary bg-background/50 backdrop-blur-sm"
                              >
                                {project.role}
                              </Badge>
                              <h3 className="text-2xl font-bold text-white drop-shadow-md">
                                {project.title}
                              </h3>
                            </div>
                          </motion.div>
                        </div>

                        {/* Project Info - Right Side */}
                        <div className="lg:w-2/3 p-6 space-y-4">
                          {/* Desktop header - hidden on mobile */}
                          <div className="hidden lg:flex lg:items-center lg:justify-between">
                            <div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{project.period}</span>
                                <span className="mx-1">•</span>
                                <Badge
                                  variant="outline"
                                  className="border-primary/30 text-primary"
                                >
                                  {project.role}
                                </Badge>
                              </div>
                              <h3 className="text-2xl font-bold">
                                {project.title}
                              </h3>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                asChild
                                className="transition-all hover:shadow-primary/20"
                              >
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {t("projects.viewProject")}
                                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                                </a>
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                                className="border-primary/40 hover:border-primary"
                              >
                                <Link href={`/projects#${project.id}`}>
                                  {t("projects.details")}
                                </Link>
                              </Button>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>

                          {/* Technologies & Highlights in horizontal layout */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                            {/* Technologies */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider text-primary mb-2 flex items-center">
                                <Code className="h-3.5 w-3.5 mr-1.5" />
                                Technologies
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {project.technologies.map((tech, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-secondary/30"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Key highlights */}
                            <div>
                              <h4 className="text-xs uppercase tracking-wider text-primary mb-2 flex items-center">
                                <Star className="h-3.5 w-3.5 mr-1.5" />
                                Key Features
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {project.highlights.map((highlight, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="border-primary/20"
                                  >
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Mobile buttons - visible only on mobile */}
                          <div className="flex gap-2 pt-2 lg:hidden">
                            <Button size="sm" asChild className="w-full">
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {t("projects.viewProject")}
                              </a>
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                              className="w-full"
                            >
                              <Link href={`/projects#${project.id}`}>
                                {t("projects.details")}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Decorative gradient at bottom */}
                      <div
                        className={`h-1 w-full bg-gradient-to-r ${project.bgColor}`}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </motion.div>
        </Tabs>
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-primary/50 via-primary to-primary/50">
          <Button
            asChild
            className="rounded-full px-6 bg-background text-foreground hover:text-primary hover:bg-background/90 transition-colors group"
          >
            <Link href="/projects" className="flex items-center gap-2">
              {t("home.viewAll")}
              <span className="p-1 bg-primary/10 rounded-full transform group-hover:translate-x-1 transition-transform">
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
              </span>
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
