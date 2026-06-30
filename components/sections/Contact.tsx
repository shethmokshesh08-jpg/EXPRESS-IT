"use client";

import { type FormEvent, useState } from "react";
import { Globe, Mail, MapPin, Phone, Send, Users } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

const contactLinks = [
  { label: "Website", href: "/", icon: Globe },
  { label: "Community", href: "/parent-hub", icon: Users },
  { label: "Email", href: "mailto:expressit.myra@gmail.com", icon: Mail, external: true },
];

const publicPhoneDisplay = "+91 98114 27000";
const publicPhoneHref = "tel:+919811427000";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setStatusMessage("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Message could not be sent right now.");
      }

      form.reset();
      setStatus("success");
      setStatusMessage("Message sent. We will reply from expressit.myra@gmail.com.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Message could not be sent right now. Please email expressit.myra@gmail.com.",
      );
    }
  };

  return (
    <section id="contact" className="section-shell bg-white" aria-labelledby="contact-title">
      <div className="container-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={<span id="contact-title">Start the next conversation.</span>}
              copy="Tell us what your child, teen, school, or parent group needs. We will help shape the right emotional-growth pathway."
            />
            <div className="mt-8 grid gap-4">
              <div className="glass-panel flex items-center gap-4 rounded-3xl p-4">
                <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                <span className="font-bold text-slate-700">expressit.myra@gmail.com</span>
              </div>
              <div className="glass-panel flex items-center gap-4 rounded-3xl p-4">
                <Phone className="h-6 w-6 text-secondary" aria-hidden="true" />
                <a
                  href={publicPhoneHref}
                  className="font-bold text-slate-700 transition-colors duration-200 hover:text-primary"
                >
                  {publicPhoneDisplay}
                </a>
              </div>
              <div className="glass-panel flex items-center gap-4 rounded-3xl p-4">
                <MapPin className="h-6 w-6 text-accent" aria-hidden="true" />
                <span className="font-bold text-slate-700">India, available for schools and families</span>
              </div>
            </div>
          </div>

          <form className="glass-panel rounded-[2rem] p-6" aria-label="Contact form" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 font-bold text-slate-700">
                Name
                <input
                  className="touch-target rounded-2xl border border-slate-200 bg-white px-4 py-3 text-ink outline-none focus:border-primary"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="grid gap-2 font-bold text-slate-700">
                Email
                <input
                  className="touch-target rounded-2xl border border-slate-200 bg-white px-4 py-3 text-ink outline-none focus:border-primary"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="grid gap-2 font-bold text-slate-700">
                Phone
                <input
                  className="touch-target rounded-2xl border border-slate-200 bg-white px-4 py-3 text-ink outline-none focus:border-primary"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91"
                />
              </label>
              <label className="grid gap-2 font-bold text-slate-700">
                Newsletter
                <input
                  className="touch-target rounded-2xl border border-slate-200 bg-white px-4 py-3 text-ink outline-none focus:border-primary"
                  name="newsletter"
                  type="email"
                  placeholder="Optional email"
                />
              </label>
            </div>
            <label className="mt-5 grid gap-2 font-bold text-slate-700">
              Message
              <textarea
                className="min-h-36 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-ink outline-none focus:border-primary"
                name="message"
                placeholder="Tell us what you want to build for your child, teen, school, or parent group."
                required
              />
            </label>
            <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex gap-2">
                {contactLinks.map(({ label, href, icon: Icon, external }) =>
                  external ? (
                    <a
                      key={label}
                      href={href}
                      className="touch-target inline-flex items-center justify-center rounded-full bg-slate-100 text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      key={label}
                      href={href}
                      className="touch-target inline-flex items-center justify-center rounded-full bg-slate-100 text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  ),
                )}
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="touch-target inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-black text-white shadow-glow transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
                <Send className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {statusMessage ? (
              <p
                className={`mt-5 rounded-2xl px-4 py-3 text-sm font-bold ${
                  status === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : status === "error"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-slate-100 text-slate-700"
                }`}
                aria-live="polite"
              >
                {statusMessage}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
