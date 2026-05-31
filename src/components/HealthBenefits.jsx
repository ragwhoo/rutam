const benefits = [
  { title: "Antioxidants & Vitamin E", desc: "Rich in natural antioxidants and Vitamin E that protect cells from oxidative damage." },
  { title: "Omega-3 & 6 Fatty Acids", desc: "Essential fatty acids that support heart health, brain function, and overall vitality." },
  { title: "Boosts Immunity", desc: "Natural nutrients and antibacterial properties strengthen the body's immune system." },
  { title: "Good Cholesterol", desc: "Promotes healthy HDL cholesterol levels and supports cardiovascular health." },
  { title: "Improves Memory", desc: "Essential nutrients that support cognitive function and memory power." },
  { title: "Relieves Joint Pain", desc: "Anti-inflammatory properties help reduce joint pain and stiffness naturally." },
  { title: "Heart & Thyroid Care", desc: "Supports healthy heart function and helps manage thyroid problems naturally." },
  { title: "Total Health Care", desc: "A wholesome addition to your diet for sustained energy and complete wellness." },
];

export default function HealthBenefits() {
  return (
    <section className="values">
      <div className="container">
        <h2 className="section-title">Health Benefits</h2>
        <p className="section-subtitle">Wood cold-pressed oils are richer in nutrients that support total wellness.</p>
        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div className="benefit-item" key={i}>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
