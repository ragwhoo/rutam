import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import PuritySection from "./components/PuritySection";
import Products from "./components/Products";
import GalleryCarousel from "./components/GalleryCarousel";
import HealthBenefits from "./components/HealthBenefits";
import Contact from "./components/Contact";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const navTextItems = document.querySelectorAll(".nav-logo, .nav-links a");
    const hamSpans = document.querySelectorAll(".hamburger span");
    function updateNav() {
      const cream = lenis.scroll > window.innerHeight - 64;
      navTextItems.forEach((el) => (el.style.color = cream ? "#f3fadc" : "#095d40"));
      hamSpans.forEach((s) => (s.style.background = cream ? "#f3fadc" : "#095d40"));
    }
    lenis.on("scroll", updateNav);
    requestAnimationFrame(() => updateNav());

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
          lenis.scrollTo(target, { offset: -64 });
          document.getElementById("navLinks")?.classList.remove("open");
          document.getElementById("hamburger")?.classList.remove("active");
          updateNav();
        }
      });
    });

    document.getElementById("hamburger")?.addEventListener("click", () => {
      const wasClosed = !document.getElementById("navLinks")?.classList.contains("open");
      document.getElementById("navLinks")?.classList.toggle("open");
      document.getElementById("hamburger")?.classList.toggle("active");
      if (wasClosed) {
        document.querySelectorAll(".nav-links a").forEach((a) => (a.style.color = "#f3fadc"));
        document.querySelectorAll(".hamburger span").forEach((s) => (s.style.background = "#f3fadc"));
      } else {
        updateNav();
      }
    });

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <PuritySection />
      <Products />
      <GalleryCarousel />
      <HealthBenefits />
      <Contact />
    </main>
  );
}
