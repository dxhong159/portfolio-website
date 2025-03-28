"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Send,
  CheckCircle2,
  CalendarDays,
  MessagesSquare,
  MessageCircle,
  Sparkles,
  UserCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // FAQs for contact section
  const faqs = [
    {
      question: "What is the typical response time?",
      answer:
        "I usually respond to all inquiries within 24-48 hours during weekdays.",
    },
    {
      question: "Do you work on weekends?",
      answer:
        "While I primarily work on weekdays, I'm flexible for urgent matters on weekends.",
    },
    {
      question: "What type of projects do you take?",
      answer:
        "I specialize in web development, mobile app development, and UI/UX design projects.",
    },
    {
      question: "Can we schedule a call before starting a project?",
      answer:
        "Absolutely! I recommend a discovery call to discuss your project requirements in detail.",
    },
  ];

  return (
    <>
      {/* Enhanced Magical Hero Header Section */}
      <section className="relative overflow-hidden py-28 lg:py-36">
        {/* Background gradient with animated color shift */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-secondary/20"></div>

        {/* Animated particles/dots background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <div className="absolute top-3/4 left-1/3 w-3 h-3 rounded-full bg-primary/70 animate-ping"></div>
          <div className="absolute top-2/4 right-1/4 w-2 h-2 rounded-full bg-secondary animate-bounce"></div>
          <div className="absolute bottom-1/4 left-2/3 w-2 h-2 rounded-full bg-primary/50 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-secondary/60 animate-ping"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Decorative elements */}
        <div
          className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--primary), 0.3) 0%, transparent 70%)",
          }}
        ></div>
        <div
          className="absolute -bottom-8 -right-8 w-60 h-60 rounded-full bg-secondary/20 blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--secondary), 0.2) 0%, transparent 70%)",
          }}
        ></div>

        {/* Main Content Container */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with glow effect */}
            <div className="inline-block relative mb-6">
              <span className="absolute inset-0 rounded-full bg-primary/20 blur-md"></span>
              <Badge
                variant="outline"
                className="relative px-4 py-1.5 text-base bg-background/70 backdrop-blur-sm border-primary/30"
              >
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                {t("contact.getInTouch")}
              </Badge>
            </div>

            {/* Main title with animated gradient and mask effect */}
            <div className="relative mb-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary bg-[size:400%] animate-gradient">
                  {t("contact.title")}
                </span>
              </h1>
              <div className="absolute -bottom-3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </div>

            {/* Subtitle with highlighted emphasis */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              <span className="relative inline-block">
                <span className="relative z-10">
                  {t("contact.description")}
                </span>
              </span>
            </p>

            {/* Contact highlights with icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 mb-4 rounded-xl bg-primary/10 flex items-center justify-center relative overflow-hidden group">
                  <span className="absolute inset-0 bg-primary/10 transform group-hover:scale-75 transition-transform duration-300"></span>
                  <Mail className="w-6 h-6 text-primary relative z-10" />
                </div>
                <h3 className="text-lg font-medium">{t("contact.email")}</h3>
                <a
                  href="mailto:gfwdinhhong@gmail.com"
                  className="text-primary hover:underline mt-1 text-sm"
                >
                  gfwdinhhong@gmail.com
                </a>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 mb-4 rounded-xl bg-primary/10 flex items-center justify-center relative overflow-hidden group">
                  <span className="absolute inset-0 bg-primary/10 transform group-hover:scale-75 transition-transform duration-300"></span>
                  <Phone className="w-6 h-6 text-primary relative z-10" />
                </div>
                <h3 className="text-lg font-medium">{t("contact.phone")}</h3>
                <a
                  href="tel:+84967910188"
                  className="text-primary hover:underline mt-1 text-sm"
                >
                  (+84) 967910188
                </a>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 mb-4 rounded-xl bg-primary/10 flex items-center justify-center relative overflow-hidden group">
                  <span className="absolute inset-0 bg-primary/10 transform group-hover:scale-75 transition-transform duration-300"></span>
                  <MapPin className="w-6 h-6 text-primary relative z-10" />
                </div>
                <h3 className="text-lg font-medium">{t("contact.location")}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Hanoi, Vietnam
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="default" className="group">
                <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                <span>Start a Conversation</span>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact-form" className="group">
                  <UserCheck className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                  <span>Request Collaboration</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative wave svg */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="fill-background"
          >
            <path d="M0,64L60,64C120,64,240,64,360,58.7C480,53,600,43,720,48C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="contact-form" className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Information Column */}
          <div className="lg:col-span-2">
            <div className="sticky top-20">
              <h2 className="text-2xl font-semibold mb-6">
                Contact Information
              </h2>
              <p className="mb-8 text-muted-foreground">
                Feel free to reach out through any of these channels. I'm always
                open to discussing new projects, opportunities, and
                partnerships.
              </p>

              <div className="space-y-6">
                <Card className="overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-4 flex items-start">
                    <div className="mr-4 p-2 rounded-full bg-primary/10">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t("contact.email")}</h3>
                      <a
                        href="mailto:gfw.dinhong@gmail.com"
                        className="text-primary hover:underline"
                      >
                        gfw.dinhong@gmail.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-4 flex items-start">
                    <div className="mr-4 p-2 rounded-full bg-primary/10">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t("contact.phone")}</h3>
                      <a
                        href="tel:+84967910188"
                        className="text-primary hover:underline"
                      >
                        (+84) 0967910188
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-4 flex items-start">
                    <div className="mr-4 p-2 rounded-full bg-primary/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t("contact.location")}</h3>
                      <p>Hanoi, Vietnam</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media Links */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">
                  {t("contact.socialProfiles")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/dxhong159"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-card border hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/h%E1%BB%93ng-%C4%91inh-548b941b5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-card border hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-card border hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/dino.it.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-card border hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Schedule a call section */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">
                  {t("contact.letsTalk")}
                </h3>
                <p className="mb-4 text-muted-foreground">
                  {t("contact.meetingDesc")}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {t("contact.schedule")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Schedule a Meeting</DialogTitle>
                      <DialogDescription>
                        Choose a date and time that works best for you. I'll
                        confirm via email.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-center text-muted-foreground mb-4">
                        Get in touch with me directly on Messenger for quick
                        responses and scheduling.
                      </p>
                      <Button className="w-full" asChild>
                        <a
                          href="https://m.me/dino.it.me"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Chat on Messenger
                        </a>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Form and Map Column */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  <MessagesSquare className="h-5 w-5 inline-block mr-2 text-primary" />
                  {t("contact.sendMessage")}
                </h2>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-100 rounded-md flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    {t("contact.messageSent")}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">
                        {t("contact.name")}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-muted-foreground/20"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">
                        {t("contact.email")}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-muted-foreground/20"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block mb-2 font-medium">
                      {t("contact.subject")}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="border-muted-foreground/20"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">
                      {t("contact.message")}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={7}
                      value={formData.message}
                      onChange={handleChange}
                      className="border-muted-foreground/20 resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">◌</span>
                        {t("contact.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t("contact.send")}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map Section */}
            <div className="mt-8">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.97706812769!2d105.80194413594428!3d21.02281475876939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSGFub2ksIEhvw6BuIEtp4bq_bSwgSGFub2ksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1656950211001!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      className="border-0"
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="My Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions? Find quick answers to common inquiries about
              working with me.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Have more questions?</p>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              <span>Contact Me Directly</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="bg-primary/5 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's turn your ideas into reality. I'm just one message away from
              starting our collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:gfw.dinhong@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Send a Message
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+84967910188">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Me
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
