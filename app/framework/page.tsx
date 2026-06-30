import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ExpressFramework } from "@/components/sections/ExpressFramework";
import { Roadmap } from "@/components/sections/Roadmap";

export const metadata: Metadata = {
  title: "Framework | EXPRESS IT",
  description:
    "Explore the five-stage EXPRESS IT growth framework for emotional awareness, communication, confidence, and real-world life skills.",
};

export default function FrameworkPage() {
  return (
    <PageShell>
      <section className="framework-page-hero" aria-labelledby="framework-page-title">
        <div className="framework-page-hero__inner">
          <p className="framework-page-hero__eyebrow">EXPRESS IT FRAMEWORK</p>
          <h1 id="framework-page-title" className="framework-page-hero__title">
            A Five Stage World for Growth
          </h1>
          <p className="framework-page-hero__copy">
            A guided approach for helping young people build awareness, expression, confidence,
            and calmer decision-making in real-world moments.
          </p>
        </div>
      </section>
      <ExpressFramework standalone />
      <Roadmap />
    </PageShell>
  );
}
