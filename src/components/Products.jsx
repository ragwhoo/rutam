const products = [
  { img: "groundnut.jpeg", name: "Groundnut Oil", desc: "Wood cold-pressed from premium groundnuts. Rich, full-bodied flavor perfect for cooking and deep frying." },
  { img: "coconut.jpeg", name: "Coconut Oil", desc: "Pure wood cold-pressed coconut oil. Ideal for cooking, hair care, and skin nourishment." },
  { img: "sweetalmond.jpeg", name: "Sweet Almond Oil", desc: "Cold-pressed from sweet almonds. Rich in Vitamin E, perfect for skin, hair, and wellness." },
  { img: "sesame.jpeg", name: "Sesame Oil", desc: "Available in both white and black sesame. Nutty, rich, and prized in Ayurveda for its warming properties." },
  { img: "mustardoil.jpeg", name: "Mustard Oil", desc: "Robust and pungent, traditionally wood cold-pressed. Pure authenticity in every drop." },
  { img: "virgincoconutoil.jpeg", name: "Virgin Coconut Oil", desc: "Premium virgin coconut oil, cold-pressed from fresh coconuts. Aromatic and nutrient-rich." },
  { img: "flaxseedoil.jpeg", name: "Flaxseed Oil", desc: "Wood cold-pressed from flaxseeds. Packed with Omega-3 fatty acids for heart and brain health." },
  { img: "nigeroil.jpeg", name: "Niger Oil", desc: "Traditional wood cold-pressed niger seed oil. Rich in linoleic acid, valued for its health benefits." },
  { img: "safflower.jpeg", name: "Safflower Oil", desc: "Wood cold-pressed from premium safflower seeds. Light texture and rich in unsaturated fats for heart health." },
  { img: "sunflower.jpeg", name: "Sunflower Oil", desc: "Wood cold-pressed from quality sunflower seeds. Rich in Vitamin E and light for everyday cooking." },
];

export default function Products() {
  return (
    <section id="products">
      <div className="container">
        <h2 className="section-title">Our Oils</h2>
        <p className="section-subtitle">Wood cold-pressed using traditional Marachekku machines — unbleached, unrefined and full of goodness.</p>
        <div className="products-grid">
          {products.map((p, i) => (
            <div className="product-card" key={i}>
              <img className="product-img" src={"/" + p.img} alt={p.name} />
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
