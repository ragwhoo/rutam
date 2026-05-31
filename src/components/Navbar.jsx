import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    if (!hamburger || !navLinks) return;
    const toggle = () => {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("active");
    };
    hamburger.addEventListener("click", toggle);
    return () => hamburger.removeEventListener("click", toggle);
  }, []);

  return (
    <nav aria-label="Main navigation">
      <div className="nav-logo">Rutam Oils</div>
      <button className="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul className="nav-links" id="navLinks">
        <li><a href="#about">About</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}
