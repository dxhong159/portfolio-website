"use client";

import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  MapPin,
  Phone,
  ChevronRight,
  Send,
  Heart,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  // Updated social links with correct URLs
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/dxhong159",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/h%E1%BB%93ng-%C4%91inh-548b941b5",
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: "https://www.facebook.com/dino.it.me",
    },
    {
      name: "Messenger",
      icon: <MessageCircle className="h-5 w-5" />,
      url: "https://m.me/dino.it.me",
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      url: "mailto:gfw.dinhong@gmail.com",
    },
  ];

  const quickLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail("");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden pt-24 pb-12">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-background"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-background/60 backdrop-blur-md"></div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/5 via-primary/50 to-primary/5"></div>

        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500/5 filter blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0 bg-grid-white/10"></div>
        </div>
      </div>

      {/* Newsletter Section - Above footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-20"
      >
        <div className="relative p-0.5 rounded-xl overflow-hidden bg-gradient-to-br from-primary/50 via-primary to-primary/50">
          <div className="bg-background/80 backdrop-blur-sm rounded-[calc(0.75rem-1px)] p-8 md:p-12 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {t("footer.stayUpdated")}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  {t("footer.newsletterDesc")}
                </p>

                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md"
                >
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-grow bg-background/60"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="group">
                    <span className="mr-2">{t("footer.subscribe")}</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>

                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-primary mt-3 text-sm"
                  >
                    {t("footer.subscribeSuccess")}
                  </motion.p>
                )}
              </div>

              {/* 3D-like Newsletter Illustration */}
              <div className="hidden md:flex justify-end">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rotate-6 rounded-2xl bg-primary/10 transform-gpu"></div>
                  <div className="absolute inset-0 -rotate-3 rounded-2xl bg-primary/20 transform-gpu"></div>
                  <div className="absolute inset-1 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center transform-gpu">
                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className="relative w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          <Mail className="h-8 w-8 text-primary" />
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                            1
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-lg mb-1">
                        {t("footer.newsletter")}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t("footer.weeklyUpdates")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Logo and description */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-6">
              {/* Logo */}
              <div className="p-1 rounded-xl bg-primary/10 flex items-center justify-center">
                <Image
                  src="/logo_pi.png"
                  alt="Dinh Hong Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <Link href="/" className="text-2xl font-bold">
                Dinh<span className="text-primary">Hong</span>
              </Link>
            </div>
            <p className="text-muted-foreground mb-6">
              {t("footer.description")}
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                  whileHover={{ y: -3, transition: { duration: 0.3 } }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold text-xl mb-6 relative inline-block">
              {t("footer.quickLinks")}
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <motion.li key={i} whileHover={{ x: 5 }}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors group flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-6 relative inline-block">
              {t("footer.contact")}
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium mb-0.5">{t("footer.emailMe")}</h4>
                  <a
                    href="mailto:gfw.dinhong@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    gfw.dinhong@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium mb-0.5">{t("footer.location")}</h4>
                  <p className="text-muted-foreground">Hanoi, Vietnam</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium mb-0.5">{t("footer.callMe")}</h4>
                  <a
                    href="tel:+84967910188"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (+84) 0967910188
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Schedule a meeting */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h3 className="font-semibold text-xl mb-6 relative inline-block">
              {t("contact.letsTalk")}
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary"></span>
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("contact.meetingDesc")}
            </p>
            <Button className="group w-full" asChild>
              <a
                href="https://m.me/dino.it.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("contact.schedule")}
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm mb-4 md:mb-0"
          >
            © {currentYear} Dinh Xuan Hong. {t("footer.rights")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center text-sm text-muted-foreground"
          >
            <span className="flex items-center">
              {t("footer.madeWith")}{" "}
              <Heart className="h-3 w-3 mx-1 text-red-500" />{" "}
              {t("footer.using")}
            </span>
            <div className="flex items-center ml-2 space-x-2">
              {["Next.js", "React", "Tailwind"].map((tech, i) => (
                <span
                  key={i}
                  className="inline-block px-2 py-0.5 bg-primary/10 text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Back to top button */}
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <ChevronRight className="h-5 w-5 rotate-[-90deg] text-primary" />
          </Button>
        </motion.div>
      </div>
    </footer>
  );
}
