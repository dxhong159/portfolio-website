"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Facebook,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const { t } = useTranslation();

  const skills = ["NextJS", "React", "Flutter", "ASP.NET", "Firebase"];

  // Hiệu ứng blur shapes
  const blurShapes = [
    {
      color: "from-primary/30 to-primary/5",
      size: "w-72 h-72",
      position: "-top-20 -left-20",
      delay: 0.2,
    },
    {
      color: "from-blue-500/20 to-purple-500/5",
      size: "w-64 h-64",
      position: "-bottom-10 right-0",
      delay: 0.4,
    },
    {
      color: "from-yellow-500/10 to-orange-500/5",
      size: "w-48 h-48",
      position: "top-1/2 -right-10",
      delay: 0.6,
    },
  ];

  // Social links array for better maintenance
  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/dxhong159",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/h%E1%BB%93ng-%C4%91inh-548b941b5",
      label: "LinkedIn",
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      url: "https://www.facebook.com/dino.it.me",
      label: "Facebook",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      url: "https://m.me/dino.it.me",
      label: "Messenger",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      url: "mailto:gfw.dinhong@gmail.com",
      label: "Email",
    },
  ];

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden">
      {/* Blur shapes */}
      {blurShapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.position} ${shape.size} rounded-full bg-gradient-to-br ${shape.color} blur-3xl opacity-60`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, delay: shape.delay }}
        />
      ))}

      <div className="container px-4 mx-auto">
        {/* Thay đổi tỷ lệ grid từ 1:1 (md:grid-cols-2) thành 3:2 (md:grid-cols-5 với 3 cột cho nội dung và 2 cột cho ảnh) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center justify-items-center relative z-10">
          {/* Mở rộng phần nội dung chiếm 3/5 của không gian */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 w-full md:col-span-3 max-w-2xl mx-auto md:mx-0"
          >
            {/* Thẻ mờ ở đầu hero section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex justify-center md:justify-start"
            >
              <Badge
                variant="outline"
                className="px-4 py-2 backdrop-blur-sm bg-background/50 border-primary/20"
              >
                {t("hero.available")}
              </Badge>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                {t("hero.greeting")}
              </motion.span>
              <motion.span
                className="block text-primary mt-2 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                {t("hero.name")}
                <span className="absolute -bottom-2 left-0 md:left-0 right-0 md:right-auto w-1/3 h-1 bg-primary rounded-full mx-auto md:mx-0"></span>
              </motion.span>
            </h1>

            <motion.h2
              className="text-2xl md:text-3xl font-medium text-center md:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              {t("hero.role")}
            </motion.h2>

            <motion.p
              className="text-lg max-w-lg text-muted-foreground text-center md:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              {t("hero.description")}
            </motion.p>

            {/* Skill tags với backdrop blur */}
            <motion.div
              className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              {skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="backdrop-blur-sm bg-muted/50"
                >
                  {skill}
                </Badge>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.7 }}
            >
              <Button
                asChild
                size="lg"
                className="shadow-lg hover:shadow-primary/20"
              >
                <Link href="/projects">
                  {t("hero.viewProjects")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="backdrop-blur-sm bg-background/50 border-primary/20"
              >
                <Link href="/contact">{t("hero.contactMe")}</Link>
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4 pt-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.7 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ y: -3, transition: { duration: 0.3 } }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Phần ảnh chiếm 2/5 của không gian */}
          <motion.div
            className="relative w-full flex justify-center md:col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Thẻ mờ và hiệu ứng 3D cho ảnh */}
            <div className="relative w-full max-w-md aspect-square">
              {/* Backdrop glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl"></div>

              {/* Container chính có hiệu ứng thẻ mờ */}
              <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px] rounded-full">
                <div className="absolute inset-4 overflow-hidden rounded-full border-2 border-primary/20 shadow-lg">
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-background/70 to-background/30 backdrop-blur-sm"></div> */}
                  <Image
                    src="/emoji.png"
                    alt="Dinh Xuan Hong"
                    // fill
                    height={1000}
                    width={1000}
                    className="object-cover "
                    style={{ height: "101%", width: "101%" }}
                    priority
                  />
                </div>

                {/* Các badge mờ xung quanh ảnh */}
                <motion.div
                  className="absolute -right-4 top-1/4 backdrop-blur-md bg-background/50 px-4 py-2 rounded-lg border border-primary/20 shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="font-medium">Full Stack</div>
                  <div className="text-xs text-muted-foreground">Developer</div>
                </motion.div>

                <motion.div
                  className="absolute -left-6 bottom-1/4 backdrop-blur-md bg-background/50 px-4 py-2 rounded-lg border border-primary/20 shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <div className="font-medium">UX/UI</div>
                  <div className="text-xs text-muted-foreground">Designer</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
