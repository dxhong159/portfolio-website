"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";
import {
  ExternalLink,
  Calendar,
  Clock,
  Code,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  period: string;
  hours?: number;
  link: string;
  category?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();

  // Function to format hours into readable text
  const formatHours = (hours: number) => {
    if (!hours) return "";
    if (hours < 100) return `${hours}h`;
    if (hours < 1000) return `${hours}h`;
    return `${(hours / 1000).toFixed(1)}k+ h`;
  };

  return (
    <Card className="h-full overflow-hidden border border-border/40 relative bg-card/50">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Optional badge for hours if significant */}
        {project.hours && project.hours > 200 && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-primary/80 text-white text-xs rounded-md backdrop-blur-sm font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatHours(project.hours)}
          </div>
        )}
      </div>
      <CardContent className="pt-6 relative z-10">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{project.period}</span>
          </div>
          {/* Display hours */}
          {project.hours && (
            <div className="flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
              <Clock className="w-3 h-3 mr-1" />
              {formatHours(project.hours)}
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2 group">
          {project.title}
          <span className="inline-block ml-1">
            <ArrowUpRight className="h-4 w-4 inline-block opacity-50" />
          </span>
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center"
            >
              <Code className="h-3 w-3 mr-1" />
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="relative z-10">
        <Button
          variant="outline"
          asChild
          className="w-full group border-primary/20 hover:border-primary/80 hover:bg-primary/5"
        >
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {t("projects.viewProject")}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
