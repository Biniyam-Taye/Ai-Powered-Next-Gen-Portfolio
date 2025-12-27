"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { submitContactForm } from "@/app/actions/submit-contact-form";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: result.message || "Thank you! Your message has been sent successfully.",
        });
        (e.target as HTMLFormElement).reset();
        setTimeout(() => {
          setStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative group/form"
    >
      {/* Gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-3xl opacity-20 group-hover/form:opacity-40 blur transition-opacity duration-500" />

      <div className="relative bg-card/80 backdrop-blur-xl border-2 border-border/50 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
            <Send className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
            Send a Message
          </h3>
        </div>

        {status.type && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "mb-6 p-4 rounded-2xl flex items-center gap-3 border-2",
              status.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
            )}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{status.message}</p>
          </motion.div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-bold text-foreground/80 uppercase tracking-wide"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 border-border/50",
                "bg-background/50 backdrop-blur-sm",
                "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                "transition-all duration-300",
                "placeholder:text-muted-foreground/50",
                "hover:border-primary/50"
              )}
              placeholder="Your name"
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-bold text-foreground/80 uppercase tracking-wide"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 border-border/50",
                "bg-background/50 backdrop-blur-sm",
                "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                "transition-all duration-300",
                "placeholder:text-muted-foreground/50",
                "hover:border-primary/50"
              )}
              placeholder="your.email@example.com"
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="block text-sm font-bold text-foreground/80 uppercase tracking-wide"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 border-border/50",
                "bg-background/50 backdrop-blur-sm",
                "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                "transition-all duration-300",
                "placeholder:text-muted-foreground/50",
                "hover:border-primary/50"
              )}
              placeholder="What's this about?"
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-bold text-foreground/80 uppercase tracking-wide"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={cn(
                "w-full px-4 py-3 rounded-xl border-2 border-border/50",
                "bg-background/50 backdrop-blur-sm",
                "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                "transition-all duration-300 resize-none",
                "placeholder:text-muted-foreground/50",
                "hover:border-primary/50"
              )}
              placeholder="Tell me about your project..."
              required
              disabled={isPending}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full px-6 py-4 rounded-xl font-bold text-base",
              "bg-gradient-to-r from-primary to-purple-600",
              "text-primary-foreground",
              "shadow-lg shadow-primary/25",
              "hover:shadow-xl hover:shadow-primary/40",
              "transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              "flex items-center justify-center gap-2"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
