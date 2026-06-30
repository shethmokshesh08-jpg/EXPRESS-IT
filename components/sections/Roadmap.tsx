"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/MotionPrimitives";
import { roadmap } from "@/lib/content";

export function Roadmap() {
  return (
    <section className="section-shell bg-[#EEF2FF]" aria-labelledby="roadmap-title">
      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="Future scope"
          title={<span id="roadmap-title">Growing into a richer learning ecosystem.</span>}
          copy="Express It is built to grow gradually with more guided practice, parent support, school-friendly tools, and interactive learning experiences without forcing a fixed timeline."
        />

        <div className="mt-10 md:mt-14">
          <div className="grid gap-5 md:grid-cols-2">
            {roadmap.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="glass-panel h-full rounded-[1.75rem] p-6 md:p-7">
                  <div className="mb-5 h-1.5 w-14 rounded-full bg-primary shadow-glow" />
                  <div>
                    <h3 className="font-display text-2xl font-black text-ink md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">{item.detail}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
