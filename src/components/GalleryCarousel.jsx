import { useMotionValue, useSpring } from "framer-motion";
import { useRef, useCallback, useEffect } from "react";
import FloatingCard, { N } from "./FloatingCard";

const videos = [
  "/bestvideosofar.mp4", "/bettervideo.mp4", "/video1.mp4", "/video2.mp4",
  "/video3.mp4", "/video4.mp4", "/machine video.mp4", "/videos.mp4"
];

export default function GalleryCarousel() {
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { damping: 40, stiffness: 200 });

  const sectionRef = useRef();

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    progress.set(progress.get() + e.deltaY * 0.003);
  }, [progress]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    const onEnter = () => { if (window.lenis) window.lenis.stop(); };
    const onLeave = () => { if (window.lenis) window.lenis.start(); };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [handleWheel]);

  return (
    <section id="gallery">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">Watch the traditional wood-pressing process in action</p>
        <div
          ref={sectionRef}
          style={{
            width: "100%",
            height: 500,
            position: "relative",
            overflow: "hidden",
            perspective: 3000,
            cursor: "grab",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              perspective: 3000,
              transformStyle: "preserve-3d",
              transform: "rotateY(-14deg) rotateX(-6deg)",
            }}
          >
            {Array.from({ length: N }, (_, i) => (
              <FloatingCard key={i} index={i} progress={springProgress} videoSrc={videos[i % videos.length]} />
            ))}
          </div>
          <div style={{ position: "absolute", bottom: "6%", right: "3%", fontSize: "clamp(8px,0.8vw,11px)", letterSpacing: "0.3em", color: "rgba(243,250,220,0.15)", zIndex: 10, pointerEvents: "none" }}>
            SCROLL TO EXPLORE
          </div>
        </div>
      </div>
    </section>
  );
}
