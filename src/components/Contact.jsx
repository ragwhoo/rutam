export default function Contact() {
  return (
    <>
      <section id="contact" className="cta">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Have questions or want to place an order? We'd love to hear from you.</p>
          <p style={{marginBottom:"2rem",fontWeight:300,opacity:0.85}}>
            Call us: <a href="tel:+919481548382" style={{color:"#f3fadc",textDecoration:"none",fontWeight:600}}>+91 9481548382</a>
            &nbsp;|&nbsp; Email: <a href="mailto:rutamoils@gmail.com" style={{color:"#f3fadc",textDecoration:"none",fontWeight:600}}>rutamoils@gmail.com</a>
          </p>
          <a href="tel:+919481548382" className="btn">Call Now</a>
          <a href="mailto:rutamoils@gmail.com" className="btn btn-outline">Email Us</a>
        </div>
      </section>
      <footer>
        <p><strong>RUTAM Wood-Pressed Oils</strong> — by Sri Krishna Enterprises</p>
        <p style={{marginTop:"0.5rem"}}>FSSAI Certified | Wood Cold-Pressed | 100% Pure & Natural</p>
        <p style={{marginTop:"0.5rem"}}>&copy; 2026 Sri Krishna Enterprises. All rights reserved.</p>
      </footer>
    </>
  );
}
