"use client";

import { useEffect, useRef, useState } from "react";

type ExpressFrameworkProps = {
  standalone?: boolean;
};

export function ExpressFramework({ standalone = false }: ExpressFrameworkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasEnteredRef = useRef(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isVideoRevealed, setIsVideoRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let playbackRequested = false;
    let startupFrame = 0;
    let visibilityFrame = 0;
    let revealTimer = 0;

    // Keep the video parked on its final frame after the first complete playthrough.
    const freezeOnFinalFrame = () => {
      video.dataset.completed = "true";
      video.pause();
      setIsVideoRevealed(true);
    };

    const getVisibilityRatio = () => {
      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      return Math.max(0, Math.min(visibleHeight / rect.height, 1));
    };

    const requestPlayback = () => {
      if (playbackRequested || video.dataset.completed === "true") return;

      playbackRequested = true;

      // Browsers allow muted inline playback, but this keeps failures non-fatal.
      void video.play().catch(() => {
        playbackRequested = false;
      });
    };

    const beginCinematicReveal = () => {
      if (hasEnteredRef.current) return;

      hasEnteredRef.current = true;
      setHasEntered(true);

      // One-time text exit. The brightened grade begins at the same moment.
      revealTimer = window.setTimeout(() => {
        setIsVideoRevealed(true);
      }, 2750);
    };

    const checkVisibility = () => {
      const ratio = getVisibilityRatio();

      if (ratio > 0) beginCinematicReveal();
      if (ratio >= 0.5) requestPlayback();
    };

    // Passive fallback for custom/smooth scroll environments where observer timing can lag.
    const scheduleVisibilityCheck = () => {
      if (visibilityFrame) return;

      visibilityFrame = requestAnimationFrame(() => {
        visibilityFrame = 0;
        checkVisibility();
      });
    };

    // Native viewport trigger: play once when roughly half the section is visible.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          beginCinematicReveal();
        }

        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.5 &&
          video.dataset.completed !== "true"
        ) {
          requestPlayback();
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    video.addEventListener("ended", freezeOnFinalFrame);
    window.addEventListener("scroll", scheduleVisibilityCheck, { passive: true });
    window.addEventListener("resize", scheduleVisibilityCheck);
    observer.observe(section);
    startupFrame = requestAnimationFrame(checkVisibility);

    return () => {
      cancelAnimationFrame(startupFrame);
      cancelAnimationFrame(visibilityFrame);
      window.clearTimeout(revealTimer);
      window.removeEventListener("scroll", scheduleVisibilityCheck);
      window.removeEventListener("resize", scheduleVisibilityCheck);
      observer.disconnect();
      video.removeEventListener("ended", freezeOnFinalFrame);
    };
  }, []);

  return (
    <section
      id="framework"
      ref={sectionRef}
      className={
        [
          "framework-video-section",
          standalone ? "framework-video-section--standalone" : "",
          isVideoRevealed ? "framework-video-section--revealed" : "",
        ]
          .filter(Boolean)
          .join(" ")
      }
      aria-labelledby={standalone ? undefined : "framework-title"}
      aria-label={standalone ? "Five stage framework visual" : undefined}
    >
      <video
        ref={videoRef}
        className="framework-video-media hidden md:block"
        src="/videos/five-stage-world.mp4"
        autoPlay={standalone}
        loop={standalone}
        muted
        playsInline
        preload={standalone ? "metadata" : "none"}
      />
      <video
        className="framework-video-media block md:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/five-stage-world.mp4" type="video/mp4" />
      </video>

      <div className="framework-video-grade" aria-hidden="true" />
      <div className="framework-video-overlay" aria-hidden="true" />

      {!standalone ? (
        <div className="framework-video-content">
          <h2
            id="framework-title"
            className={
              hasEntered
                ? "framework-video-heading framework-video-heading--visible"
                : "framework-video-heading"
            }
          >
            A Five Stage World for Growth
          </h2>
          <p className="sr-only">
            A cinematic framework reveal showing five connected growth stages for the Express It
            learning experience.
          </p>
        </div>
      ) : null}
    </section>
  );
}
