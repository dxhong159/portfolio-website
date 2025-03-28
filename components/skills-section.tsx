"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Code,
  Layout,
  Database,
  Palette,
  Globe,
  Brain,
  Clock,
} from "lucide-react";
import Image from "next/image";

export function SkillsSection() {
  const { t } = useTranslation();

  // Updated skills with brand logos from public CDNs and hours spent
  const skills = [
    {
      icon: <Layout className="h-10 w-10 text-primary" />,
      title: t("skills.frontend"),
      items: [
        {
          name: "NextJS",
          logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
          fallbackColor: "#000000",
          hours: 320,
        },
        {
          name: "ReactJS",
          logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
          fallbackColor: "#61DAFB",
          hours: 480,
        },
        {
          name: "Flutter Web",
          logo: "https://cdn.worldvectorlogo.com/logos/flutter.svg",
          fallbackColor: "#02569B",
          hours: 280,
        },
        {
          name: "ASP.NET",
          logo: "https://cdn.worldvectorlogo.com/logos/dot-net-core-7.svg",
          fallbackColor: "#512BD4",
          hours: 240,
        },
        {
          name: "WPF",
          logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
          fallbackColor: "#0078D7",
          hours: 180,
        },
      ],
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: t("skills.backend"),
      items: [
        {
          name: "ExpressJS",
          logo: "https://cdn.worldvectorlogo.com/logos/express-109.svg",
          fallbackColor: "#000000",
          hours: 300,
        },
        {
          name: "Firebase",
          logo: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
          fallbackColor: "#FFCA28",
          hours: 280,
        },
        {
          name: "MySQL",
          logo: "https://cdn.worldvectorlogo.com/logos/mysql-logo-pure.svg",
          fallbackColor: "#00758F",
          hours: 240,
        },
        {
          name: "MongoDB",
          logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
          fallbackColor: "#47A248",
          hours: 180,
        },
        {
          name: "MSSQL",
          logo: "https://cdn.worldvectorlogo.com/logos/microsoft-sql-server-1.svg",
          fallbackColor: "#CC2927",
          hours: 150,
        },
      ],
    },
    {
      icon: <Palette className="h-10 w-10 text-primary" />,
      title: t("skills.design"),
      items: [
        {
          name: "WordPress",
          logo: "https://cdn.worldvectorlogo.com/logos/wordpress-icon.svg",
          fallbackColor: "#21759B",
          hours: 220,
        },

        {
          name: "Photoshop",
          logo: "https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg",
          fallbackColor: "#31A8FF",
          hours: 60,
        },
        {
          name: "Illustrator",
          logo: "https://cdn.worldvectorlogo.com/logos/adobe-illustrator-cc-3.svg",
          fallbackColor: "#FF9A00",
          hours: 220,
        },
        {
          name: "Figma",
          logo: "https://cdn.worldvectorlogo.com/logos/figma-icon.svg",
          fallbackColor: "#F24E1E",
          hours: 360,
        },
      ],
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: t("skills.languages"),
      items: [
        {
          name: "Python",
          logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg",
          fallbackColor: "#E34F26",
          hours: 520,
        },
        {
          name: "Dart",
          logo: "https://cdn.worldvectorlogo.com/logos/dart.svg",
          fallbackColor: "#F7DF1E",
          hours: 480,
        },
        {
          name: "TypeScript",
          logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
          fallbackColor: "#3178C6",
          hours: 440,
        },
        {
          name: "C#",
          logo: "https://cdn.worldvectorlogo.com/logos/c--4.svg",
          fallbackColor: "#239120",
          hours: 290,
        },
      ],
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: t("skills.ai"),
      items: [
        {
          name: "GitHub Copilot",
          logo: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
          fallbackColor: "#8B00FF",
          hours: 500,
        },
        {
          name: "Google AI Studio",
          logo: "https://cdn.worldvectorlogo.com/logos/google-ai-1.svg",
          fallbackColor: "#4285F4",
          hours: 150,
        },
        {
          name: "OpenAI APIs",
          logo: "https://cdn.worldvectorlogo.com/logos/openai-2.svg",
          fallbackColor: "#412991",
          hours: 180,
        },
      ],
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: t("skills.other"),
      items: [
        {
          name: "Docker",
          logo: "https://cdn.worldvectorlogo.com/logos/docker.svg",
          fallbackColor: "#2496ED",
          hours: 140,
        },
        {
          name: "Git",
          logo: "https://cdn.worldvectorlogo.com/logos/git-icon.svg",
          fallbackColor: "#F05032",
          hours: 220,
        },
        {
          name: "Responsive Design",
          logo: "https://cdn.worldvectorlogo.com/logos/bootstrap-5-1.svg",
          fallbackColor: "#7952B3",
          hours: 260,
        },
        {
          name: "SEO",
          logo: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg",
          fallbackColor: "#00A36A",
          hours: 120,
        },
      ],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Function to handle image error - sử dụng fallback tự động khi logo không tải được
  const handleImageError = (e, name, color) => {
    e.target.style.display = "none";
    const parent = e.target.parentElement;
    const div = document.createElement("div");
    div.className =
      "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold";
    div.style.backgroundColor = color;
    div.innerText = name.charAt(0).toUpperCase();
    parent.appendChild(div);
  };

  // Function to format hours into readable text
  const formatHours = (hours: number) => {
    if (hours < 100) return `${hours}h`;
    if (hours < 1000) return `${hours}h`;
    return `${(hours / 1000).toFixed(1)}k+ h`;
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="text-center mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t("skills.mySkills")}
          </span>
          <h2 className="text-4xl font-bold mb-4">{t("skills.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-10 w-12 h-12 border-2 border-primary/20 rounded-full hidden md:block"></div>
        <div className="absolute bottom-0 right-10 w-8 h-8 border-2 border-primary/20 rounded-full hidden md:block"></div>
        <div className="absolute top-0 right-1/4 w-4 h-4 bg-primary/40 rounded-full hidden md:block"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 backdrop-blur-sm border-primary/5 bg-background/70 overflow-hidden group">
                <CardContent className="pt-8 pb-6 px-6">
                  {/* Card header with hover effect */}
                  <div className="flex items-center mb-6 relative">
                    <div className="p-3 rounded-xl bg-primary/10 mr-4 group-hover:bg-primary/20 transition-colors">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {skill.title}
                    </h3>
                    <div className="absolute h-1 w-0 bg-primary bottom-0 left-0 group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  </div>

                  {/* Skill items with logos */}
                  <ul className="space-y-3">
                    {skill.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center p-2 rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        <div className="relative w-6 h-6 mr-3 flex-shrink-0">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <Image
                              src={item.logo}
                              width={24}
                              height={24}
                              alt={`${item.name} logo`}
                              onError={(e) =>
                                handleImageError(
                                  e,
                                  item.name,
                                  item.fallbackColor
                                )
                              }
                              className="object-contain"
                              unoptimized // Sử dụng hình ảnh từ bên ngoài không qua tối ưu hóa của Next.js
                            />
                          </div>
                        </div>
                        <span className="font-medium">{item.name}</span>

                        {/* Replace progress bars with hours badge */}
                        <div className="ml-auto flex items-center">
                          <span className="flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatHours(item.hours)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom accent - skill summary */}
      <motion.div
        className="mt-16 p-6 rounded-xl mx-auto max-w-3xl bg-gradient-to-r from-primary/10 via-background/80 to-primary/5 backdrop-blur-sm border border-primary/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center">
          <p className="text-lg font-medium">{t("skills.highlight")}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["NextJS", "React", "Firebase", "TypeScript", "Flutter"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm font-medium transition-colors"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
