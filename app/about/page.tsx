"use client";

import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";
import { Timeline } from "@/components/timeline";
import { Badge } from "@/components/ui/badge";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Clock,
  Code,
  Brain,
  Layout,
  Database,
  Palette,
  Award,
  Sparkles,
  User,
  BookOpen,
  Briefcase,
  ArrowRight,
  GraduationCap,
  FileCode,
  Laptop,
  MessageSquare,
  CheckCircle,
  Star,
  Heart,
  Download,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AboutPage() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, {
    once: false,
    margin: "-100px 0px",
  });
  const isStatsInView = useInView(statsRef, { once: true });

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const parallaxY = useSpring(y, { stiffness: 100, damping: 30 });

  // Skills with hours worked instead of percentages
  const skills = [
    {
      name: "NextJS",
      logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
      hours: 320,
      fallbackColor: "#FFF",
      category: "frontend",
    },
    {
      name: "ReactJS",
      logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
      hours: 480,
      fallbackColor: "#FFF",
      category: "frontend",
    },
    {
      name: "Flutter Web",
      logo: "https://cdn.worldvectorlogo.com/logos/flutter.svg",
      hours: 280,
      fallbackColor: "#FFF",
      category: "frontend",
    },
    {
      name: "ASP.NET",
      logo: "https://cdn.worldvectorlogo.com/logos/dot-net-core-7.svg",
      hours: 240,
      fallbackColor: "#FFF",
      category: "frontend",
    },
    {
      name: "WPF",
      logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
      hours: 180,
      fallbackColor: "#FFF",
      category: "frontend",
    },
    {
      name: "ExpressJS",
      logo: "https://cdn.worldvectorlogo.com/logos/express-109.svg",
      hours: 300,
      fallbackColor: "#FFF",
      category: "backend",
    },
    {
      name: "Firebase",
      logo: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
      hours: 280,
      fallbackColor: "#FFF",
      category: "backend",
    },
    {
      name: "MySQL",
      logo: "https://cdn.worldvectorlogo.com/logos/mysql-logo-pure.svg",
      hours: 240,
      fallbackColor: "#FFF",
      category: "backend",
    },
    {
      name: "MongoDB",
      logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
      hours: 180,
      fallbackColor: "#FFF",
      category: "backend",
    },
    {
      name: "MSSQL",
      logo: "https://cdn.worldvectorlogo.com/logos/microsoft-sql-server-1.svg",
      hours: 150,
      fallbackColor: "#FFF",
      category: "backend",
    },
    {
      name: "WordPress",
      logo: "https://cdn.worldvectorlogo.com/logos/wordpress-icon.svg",
      hours: 220,
      fallbackColor: "#FFF",
      category: "design",
    },
    {
      name: "Photoshop",
      logo: "https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg",
      hours: 60,
      fallbackColor: "#FFF",
      category: "design",
    },
    {
      name: "Illustrator",
      logo: "https://cdn.worldvectorlogo.com/logos/adobe-illustrator-cc-3.svg",
      hours: 220,
      fallbackColor: "#FFF",
      category: "design",
    },
    {
      name: "Figma",
      logo: "https://cdn.worldvectorlogo.com/logos/figma-icon.svg",
      hours: 360,
      fallbackColor: "#FFF",
      category: "design",
    },
    {
      name: "GitHub Copilot",
      logo: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
      hours: 500,
      fallbackColor: "#FFF",
      category: "tools",
    },
    {
      name: "Google AI Studio",
      logo: "https://cdn.worldvectorlogo.com/logos/google-ai-1.svg",
      hours: 150,
      fallbackColor: "#FFF",
      category: "tools",
    },
    {
      name: "OpenAI APIs",
      logo: "https://cdn.worldvectorlogo.com/logos/openai-2.svg",
      hours: 180,
      fallbackColor: "#FFF",
      category: "tools",
    },
  ];

  // Format hours
  const formatHours = (hours: number) => {
    if (hours < 100) return `${hours}h`;
    if (hours < 1000) return `${hours}h`;
    return `${(hours / 1000).toFixed(1)}k+ h`;
  };

  // Personal stats
  const stats = [
    {
      value: "3+",
      label: "Years Experience",
      icon: <Briefcase className="h-5 w-5 text-primary" />,
    },
    {
      value: "20+",
      label: "Projects Completed",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
    },
    {
      value: "3500+",
      label: "Hours Coded",
      icon: <Clock className="h-5 w-5 text-primary" />,
    },
    {
      value: "15+",
      label: "Happy Clients",
      icon: <Heart className="h-5 w-5 text-primary" />,
    },
  ];

  // Education details with enhanced information
  const education = [
    {
      title: "Humg University",
      subtitle: "2021 - Present",
      description: t("about.humgDesc"),
      icon: <GraduationCap className="h-5 w-5" />,
      details: [
        "GPA: 3.5/4.0",
        "Software Architecture",
        "Algorithm Design",
        "Object-Oriented Programming",
      ],
    },
    {
      title: "Ielts Mentor",
      subtitle: "06/2024 - Present",
      description: t("about.ieltsDesc"),
      icon: <MessageSquare className="h-5 w-5" />,
      details: [
        "Speaking Practice",
        "Writing Essays",
        "Listening Comprehension",
        "Reading Techniques",
      ],
    },
    {
      title: "F8 Fullstack Academy",
      subtitle: "06/2023 - 12/2023",
      description: t("about.f8Desc"),
      icon: <FileCode className="h-5 w-5" />,
      details: [
        "Modern JavaScript",
        "React Hooks & Context",
        "RESTful APIs",
        "Database Design",
      ],
    },
    {
      title: t("about.selfTaught"),
      subtitle: "2023 - Present",
      description: t("about.mlDesc"),
      icon: <Brain className="h-5 w-5" />,
      details: [
        "Neural Networks",
        "Data Analysis",
        "Model Training",
        "AI Integration",
      ],
    },
  ];

  // Categories for skills
  const categories = [
    { id: "all", label: "All Skills", icon: <Star className="h-4 w-4" /> },
    { id: "frontend", label: "Frontend", icon: <Layout className="h-4 w-4" /> },
    { id: "backend", label: "Backend", icon: <Database className="h-4 w-4" /> },
    { id: "design", label: "Design", icon: <Palette className="h-4 w-4" /> },
    { id: "tools", label: "Tools & AI", icon: <Brain className="h-4 w-4" /> },
  ];

  const [activeTab, setActiveTab] = useState("all");

  // Filter skills based on active category
  const filteredSkills =
    activeTab === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeTab);

  // Handle image loading error
  const handleImageError = (e) => {
    e.target.style.display = "none";
    const parent = e.target.parentElement;
    const div = document.createElement("div");
    div.className =
      "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold bg-primary";
    div.innerText = e.target.alt.charAt(0).toUpperCase();
    parent.appendChild(div);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0 bg-grid-white/10"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-[60vh] flex items-center pt-24 pb-16 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={
                isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {t("about.aboutMe")}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t("about.title")}
                <span className="text-primary">.</span>
              </h1>

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-8">
                <p>{t("about.description")}</p>
                <p>{t("about.aiInterest")}</p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button asChild size="lg">
                  <Link href="/contact" className="flex items-center">
                    {t("hero.contactMe")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="outline" size="lg" className="group">
                  <a href="#" className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-muted px-1.5 py-0.5 rounded">
                      PDF
                    </span>
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Image with 3D effect */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, x: 50 }}
              animate={
                isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-1 lg:order-2 relative"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="relative w-full aspect-square max-w-lg mx-auto"
                style={{ transformStyle: "preserve-3d" }}
                animate={{
                  rotateY: [-5, 5, -5],
                  rotateX: [2, -2, 2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut",
                }}
              >
                {/* Background shape */}
                <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 transform rotate-6 scale-[0.96]"></div>
                <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-primary/20 transform -rotate-2 scale-[0.98]"></div>

                {/* Main image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-primary/10">
                  <Image
                    src="/emoji.png?height=600&width=600"
                    alt="Dinh Xuan Hong"
                    fill
                    priority
                    className="object-cover"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>

                  {/* Decorative elements */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-sm bg-background/60 rounded-lg border border-primary/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">Dinh Xuan Hong</h3>
                        <p className="text-sm text-muted-foreground">
                          Front-end Developer
                        </p>
                      </div>
                      <Badge className="bg-primary text-primary-foreground flex gap-1 items-center">
                        <Sparkles className="h-3 w-3" />
                        {t("hero.available")}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Decorative arrow */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="h-8 w-8 rounded-full border border-primary/20 flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-primary rotate-90" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-1">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section with Hours */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("about.skills")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These are my key skills and the number of hours I've dedicated to
              mastering each technology.
            </p>
          </div>

          {/* Tabs for filtering */}
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <div className="flex justify-center">
              <TabsList className="bg-background/60 backdrop-blur-sm">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    {category.icon}
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-8">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="p-4 h-full hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div
                            className="w-8 h-8 mr-3 rounded-md flex items-center justify-center"
                            style={{ backgroundColor: skill.fallbackColor }}
                          >
                            <Image
                              src={skill.logo}
                              alt={skill.name}
                              width={20}
                              height={20}
                              className="object-contain"
                              onError={(e) => handleImageError(e)}
                            />
                          </div>
                          <h3 className="font-medium">{skill.name}</h3>
                        </div>

                        <div className="flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatHours(skill.hours)}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("about.education")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My academic journey and continuous learning experiences that have
              shaped my skills.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Timeline items={education} enhanced={true} />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative p-0.5 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/50 via-primary to-primary/50">
            <div className="bg-background/80 backdrop-blur-sm rounded-[calc(1rem-1px)] p-8 md:p-12 relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Interested in working together?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    I'm always open to discussing new projects, creative ideas
                    or opportunities to be part of your vision.
                  </p>
                  <Button size="lg" asChild>
                    <Link href="/contact" className="flex items-center">
                      {t("hero.contactMe")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
