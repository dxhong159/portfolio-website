"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Sparkles, X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { useLanguage } from "@/context/language-context";
import Image from "next/image";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export function AIChat() {
  const { language } = useLanguage();
  const initialGreeting =
    language === "vi"
      ? "# Xin chào! 👋\n\nMình là trợ lý AI của **Hong Dinh**. Bạn có thể hỏi mình về:\n\n- Các dự án của Hong\n- Kỹ năng chuyên môn\n- Kinh nghiệm làm việc\n- Thông tin liên hệ\n\nMình rất vui được hỗ trợ bạn!"
      : "# Hello there! 👋\n\nI'm **Hong Dinh's** AI assistant. You can ask me about:\n\n- Hong's projects\n- Technical skills\n- Work experience\n- Contact information\n\nI'm happy to help you!";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: initialGreeting,
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update greeting when language changes - optimized to avoid re-renders
  useEffect(() => {
    setMessages((prev) => {
      // Only update if first message needs changing
      if (prev[0]?.content.includes(language === "vi" ? "Hello" : "Xin chào")) {
        const newGreeting =
          language === "vi"
            ? "# Xin chào! 👋\n\nMình là trợ lý AI của **Hong Dinh**. Bạn có thể hỏi mình về:\n\n- Các dự án của Hong\n- Kỹ năng chuyên môn\n- Kinh nghiệm làm việc\n- Thông tin liên hệ\n\nMình rất vui được hỗ trợ bạn!"
            : "# Hello there! 👋\n\nI'm **Hong Dinh's** AI assistant. You can ask me about:\n\n- Hong's projects\n- Technical skills\n- Work experience\n- Contact information\n\nI'm happy to help you!";

        return [
          {
            ...prev[0],
            content: newGreeting,
          },
          ...prev.slice(1),
        ];
      }
      return prev;
    });
  }, [language]);

  // More efficient scroll handling
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [messages.length]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      // Slight delay to ensure the DOM is ready
      const timerId = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timerId);
    }
  }, [isOpen]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    // Store the input value and clear the input field immediately for better UX
    const userInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call API to get AI response with current language
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          history: messages,
          language: language, // Send current language to the API
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      // Add AI response
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Add error message in current language
      const errorMessage: Message = {
        id: Date.now().toString(),
        content:
          language === "vi"
            ? "❌ **Xin lỗi!** Tôi đang gặp sự cố kết nối. Vui lòng thử lại sau."
            : "❌ **Sorry!** I'm having connection issues. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Optimized input handler with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Update input immediately for responsive UI
    setInput(value);

    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only after the user stops typing, perform any heavy operations
    timeoutRef.current = setTimeout(() => {
      // Future enhancement: Could implement suggestions or typing indicators here
      // without affecting the input lag
    }, 300);
  };

  // Đây là style mới cho tin nhắn
  const getMessageStyle = (role: string) => {
    return role === "user"
      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground"
      : "bg-gradient-to-r from-background/90 to-muted/90 border border-border shadow-sm";
  };

  // Placeholder text based on language
  const placeholderText =
    language === "vi" ? "Nhập câu hỏi của bạn..." : "Type your question...";

  // Button text based on language
  const assistantTitle =
    language === "vi" ? "Trợ lý của Hong" : "Hong's Assistant";
  const onlineText =
    language === "vi"
      ? "Trực tuyến - Phản hồi trong vài giây"
      : "Online - Responds in seconds";
  const footerText =
    language === "vi"
      ? "Trợ lý AI được phát triển bởi Hong Dinh với Gemini"
      : "AI Assistant developed by Hong Dinh with Gemini";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1),0_0_3px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15),0_0_5px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3),0_0_5px_rgba(255,255,255,0.05)] transition-all duration-300 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:bg-primary/90 animate-fade-in z-50"
          >
            <Sparkles className="h-6 w-6" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[450px] p-0 gap-0 rounded-xl border border-border/50 shadow-lg overflow-hidden backdrop-blur-sm bg-background/95 dark:bg-background/90">
          <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-background">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                    <AvatarImage
                      src="/logo_pi.png"
                      alt="PI Logo"
                      className="p-0.5 object-cover rounded-full"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80">
                      AI
                    </AvatarFallback>
                    <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background animate-pulse"></span>
                  </Avatar>
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                    <span>{assistantTitle}</span>
                    <Badge
                      variant="secondary"
                      className="h-5 px-1.5 text-xs font-normal"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Gemini AI
                    </Badge>
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground">{onlineText}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 z-10 h-6 w-6 rounded-full p-0"
              onClick={() => setExpanded((prev) => !prev)}
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  expanded ? "" : "-rotate-180"
                }`}
              />
            </Button>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                expanded ? "max-h-[60vh]" : "max-h-0"
              }`}
            >
              <ScrollArea className="h-[60vh] px-4">
                <div className="flex flex-col gap-4 py-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      } animate-fade-in-up`}
                    >
                      <div
                        className={`flex gap-3 max-w-[85%] ${
                          message.role === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8 self-end mb-1">
                            <AvatarImage
                              src="/logo_pi.png"
                              alt="PI Logo"
                              className="object-cover p-0.5 rounded-full"
                              
                            />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 z-40">
                              AI
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2.5 shadow-sm ${getMessageStyle(
                            message.role
                          )}`}
                        >
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown
                              rehypePlugins={[rehypeRaw, rehypeSanitize]}
                              components={{
                                a: ({ node, ...props }) => (
                                  <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`underline ${
                                      message.role === "user"
                                        ? "text-primary-foreground/90"
                                        : "text-primary"
                                    }`}
                                  />
                                ),
                                code: ({ node, ...props }) => (
                                  <code
                                    {...props}
                                    className="bg-primary/10 rounded px-1 py-0.5 text-xs font-mono"
                                  />
                                ),
                                pre: ({ node, ...props }) => (
                                  <pre
                                    {...props}
                                    className="bg-slate-800 dark:bg-slate-900 rounded-md p-2 overflow-x-auto text-xs my-2"
                                  />
                                ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/logo_pi.png"
                            alt="PI Logo"
                            className="p-0.5 object-cover rounded-full"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70">
                            AI
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-2xl px-4 py-3 bg-muted flex items-center shadow-sm">
                          <div className="flex gap-1">
                            <div
                              className="w-2 h-2 rounded-full bg-primary animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-primary animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-primary animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="p-4 border-t bg-background/95 relative">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                ref={inputRef}
                placeholder={placeholderText}
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
                className="flex-1 border-muted-foreground/20 rounded-full pl-4 pr-10 py-5 shadow-sm focus-visible:ring-primary"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="rounded-full h-10 w-10 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
            <div className="text-center mt-2">
              <p className="text-[10px] text-muted-foreground">{footerText}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Define some needed animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
