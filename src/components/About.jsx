export default function About() {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">About</h2>
        <p className="section-subtitle">RUTAM Cold Wood-Pressed Oils by Sri Krishna Enterprises</p>
        <div className="about-grid">
          <div className="about-text">
            <h3>Our Story</h3>
            <p>RUTAM Oils by Sri Krishna Enterprises is a passion project by <strong>Mahima Hegde</strong>, veteran educator who has dedicated decades to studying and sharing the rich culinary traditions of rural Karnataka. We blend scholarly insight with hands-on recipes and stories from village kitchens to keep this heritage alive and accessible.</p>
            <p>We are <strong>FSSAI Certified SME manufacturer</strong> of several types of Wood Cold-Pressed Edible Oils with 100% purity and hygiene standards. We operate using the ancient method of oil production — using wood and stone combination machines (<em>Marachekku Machine - ಮರದ ಗಾಣ</em>) with good quality seeds at room temperature.</p>
            <p>By adopting this traditional method, we manufacture unbleached, unrefined, pure natural, vegetarian chemical-free edible oils that offer great health benefits.</p>
            <a href="#products" className="btn btn-outline">Explore Our Range</a>
          </div>
          <div className="about-image">
            <video className="about-video" src="/bestvideosofar.mp4" autoPlay muted loop playsInline></video>
          </div>
        </div>
      </div>
    </section>
  );
}
