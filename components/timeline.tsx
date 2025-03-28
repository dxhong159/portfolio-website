"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface TimelineItem {
  title: string;
  subtitle: string;
  description: string;
  icon?: ReactNode;
  details?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  enhanced?: boolean;
}

export function Timeline({ items, enhanced = false }: TimelineProps) {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`relative pl-8 pb-8 ${
            index !== items.length - 1 ? "border-l border-border" : ""
          } last:pb-0`}
        >
          {/* Timeline dot with icon */}
          <div className="absolute left-0 top-0 -translate-x-1/2 flex items-center justify-center">
            {enhanced && item.icon ? (
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                {item.icon}
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full bg-primary"></div>
            )}
          </div>

          <div>
            <h4 className="text-lg font-semibold">{item.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">
              {item.subtitle}
            </p>
            <p className="text-muted-foreground">{item.description}</p>

            {/* Enhanced details section */}
            {enhanced && item.details && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.details.map((detail, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gradient line for enhanced mode */}
          {enhanced && index !== items.length - 1 && (
            <div className="absolute left-0 top-10 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-primary/5"></div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
