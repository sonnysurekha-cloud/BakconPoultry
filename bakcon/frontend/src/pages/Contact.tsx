const contactPhone = import.meta.env.VITE_CONTACT_PHONE || '+27 65 620 1771'
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'info@bakconeggs.com'
const normalizedPhone = contactPhone.replace(/\s+/g, '')

export default function Contact() {
  return (
    <div className="contact-page">
      <style>{`
        .contact-page {
          min-height: 100vh;
          padding: 64px 20px;
          background: linear-gradient(180deg, #fffdf7 0%, #f7efe1 100%);
          color: #111;
        }

        .contact-layout {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          gap: 32px;
        }

        .page-intro {
          display: grid;
          gap: 18px;
          padding: 32px 32px 28px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 26px 70px rgba(212, 175, 55, 0.14);
          border: 1px solid rgba(212, 175, 55, 0.14);
          backdrop-filter: blur(10px);
        }

        .page-intro small {
          display: inline-flex;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          color: #b37f03;
          font-size: 12px;
          font-weight: 700;
        }

        .page-intro h1 {
          margin: 0;
          font-size: clamp(40px, 5vw, 56px);
          line-height: 1.02;
          letter-spacing: -0.03em;
          color: #111;
        }

        .page-intro p {
          margin: 0;
          max-width: 760px;
          font-size: 17px;
          line-height: 1.85;
          color: rgba(34, 34, 34, 0.9);
        }

        .benefits {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .benefit-pill {
          padding: 12px 18px;
          border-radius: 999px;
          background: rgba(248, 193, 59, 0.16);
          color: #5a4a13;
          font-size: 14px;
          font-weight: 700;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 28px;
          align-items: start;
        }

        .panel {
          border-radius: 28px;
          background: #ffffff;
          border: 1px solid rgba(212, 175, 55, 0.14);
          box-shadow: 0 24px 60px rgba(212, 175, 55, 0.12);
          overflow: hidden;
        }

        .panel-header {
          padding: 30px 32px 24px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.08);
        }

        .panel-tag {
          display: inline-flex;
          margin-bottom: 16px;
          padding: 9px 16px;
          border-radius: 999px;
          background: rgba(248, 193, 59, 0.12);
          color: #b37f03;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .panel-header h2 {
          margin: 0;
          font-size: 28px;
          line-height: 1.1;
          color: #111;
        }

        .panel-body {
          display: grid;
          gap: 20px;
          padding: 28px 32px 34px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .info-card {
          padding: 22px 20px;
          border-radius: 22px;
          background: linear-gradient(180deg, #fff 0%, #fff7e5 100%);
          border: 1px solid rgba(212, 175, 55, 0.14);
          box-shadow: 0 16px 36px rgba(212, 175, 55, 0.08);
        }

        .info-title {
          margin: 0 0 10px;
          color: #111;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .info-value {
          display: block;
          margin: 0 0 10px;
          color: #111;
          font-size: 18px;
          font-weight: 700;
          text-decoration: none;
          word-break: break-word;
        }

        .info-card p {
          margin: 0;
          color: rgba(34, 34, 34, 0.78);
          line-height: 1.75;
          font-size: 15px;
        }

        .secondary-panel {
          margin-top: 22px;
        }

        .hours-list {
          display: grid;
          gap: 14px;
          padding: 10px 0 2px;
        }

        .hours-item {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 18px;
          border-radius: 18px;
          background: #fcf6e8;
          border: 1px solid rgba(212, 175, 55, 0.12);
          color: rgba(34, 34, 34, 0.88);
          font-size: 15px;
        }

        .hours-item strong {
          color: #111;
        }

        .map-card {
          position: relative;
          min-height: 420px;
          border-radius: 28px;
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(212, 175, 55, 0.14);
          box-shadow: 0 30px 80px rgba(212, 175, 55, 0.14);
        }

        .map-overlay {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 2;
          padding: 12px 16px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(212, 175, 55, 0.14);
          color: #111;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 10px 24px rgba(47, 9, 8, 0.06);
        }

        .map-card iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        .cta-panel {
          margin-top: 26px;
          padding: 28px 30px;
          border-radius: 28px;
          background: linear-gradient(180deg, rgba(248, 193, 59, 0.14) 0%, rgba(255, 255, 255, 0.96) 100%);
          border: 1px solid rgba(212, 175, 55, 0.14);
          display: grid;
          gap: 22px;
        }

        .cta-panel h3 {
          margin: 0;
          font-size: 26px;
          line-height: 1.08;
          color: #111;
        }

        .cta-panel p {
          margin: 0;
          color: rgba(34, 34, 34, 0.8);
          line-height: 1.75;
          font-size: 16px;
        }

        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 160px;
          padding: 14px 26px;
          border-radius: 999px;
          font-weight: 800;
          text-decoration: none;
          transition: transform 0.24s ease, box-shadow 0.24s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn-primary {
          background: linear-gradient(90deg, #f8c13b 0%, #d4af37 100%);
          color: #111;
          box-shadow: 0 16px 34px rgba(212, 175, 55, 0.18);
        }

        .btn-secondary {
          background: #ffffff;
          color: #111;
          border: 1px solid rgba(212, 175, 55, 0.18);
          box-shadow: 0 12px 24px rgba(212, 175, 55, 0.08);
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {
          .contact-page {
            padding: 32px 18px;
          }

          .page-intro {
            padding: 26px 20px 24px;
          }

          .panel-header,
          .panel-body,
          .cta-panel {
            padding-left: 22px;
            padding-right: 22px;
          }

          .cta-actions {
            justify-content: stretch;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="contact-layout">
        <section className="page-intro">
          <small>Contact Bakcon</small>
          <h1>Premium commercial support for your supply needs</h1>
          <p>
            Order planning, pricing, delivery coordination and account support are available from our Bloemfontein team.
            Get the right service for bulk and business requirements with fast, reliable responses.
          </p>
          <div className="benefits">
            <span className="benefit-pill">Fast service</span>
            <span className="benefit-pill">Bulk ready</span>
            <span className="benefit-pill">Local delivery</span>
          </div>
        </section>

        <div className="content-grid">
          <div className="left-column">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-tag">Contact details</span>
                <h2>Talk to our commercial team</h2>
              </div>
              <div className="panel-body">
                <div className="info-grid">
                  <div className="info-card">
                    <p className="info-title">Phone</p>
                    <a className="info-value" href={`tel:${normalizedPhone}`}>{contactPhone}</a>
                    <p>Speak directly to sales, delivery and order support.</p>
                  </div>
                  <div className="info-card">
                    <p className="info-title">Email</p>
                    <a className="info-value" href={`mailto:${contactEmail}`}>{contactEmail}</a>
                    <p>Send pricing requests, order details, or account questions.</p>
                  </div>
                  <div className="info-card">
                    <p className="info-title">Location</p>
                    <p className="info-value">166 Voorspoed Ave, Bloemfontein</p>
                    <p>Easy access for commercial collections and deliveries.</p>
                  </div>
                  <div className="info-card">
                    <p className="info-title">Hours</p>
                    <p className="info-value">Mon - Sat 07:00 - 17:00</p>
                    <p>Sunday closed. Online support is available outside normal hours.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel secondary-panel">
              <div className="panel-header">
                <h2>Business hours</h2>
              </div>
              <div className="panel-body hours-list">
                <div className="hours-item"><span>Mon - Sat</span><strong>07:00 - 17:00</strong></div>
                <div className="hours-item"><span>Sunday</span><strong>Closed</strong></div>
                <div className="hours-item"><span>Online support</span><strong>24/7</strong></div>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="map-card">
              <div className="map-overlay">Visit our Bloemfontein facility</div>
              <iframe
                title="Bakcon Poultry location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1791.1357295995932!2d26.1009764!3d-29.0998394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec8fe4d4358afef%3A0xf12d98dd499e61d4!2s166%20Voorspoed%20Ave%2C%20Bloemfontein%2C%20920!5e0!3m2!1sen!2sza!4v0000000000000"
                loading="lazy"
              ></iframe>
            </div>

            <div className="cta-panel">
              <div>
                <h3>Ready to place a commercial order?</h3>
                <p>Reach out and we’ll confirm availability, pricing, and delivery options tailored to your business.</p>
              </div>
              <div className="cta-actions">
                <a className="btn btn-primary" href={`mailto:${contactEmail}`}>Email Sales</a>
                <a className="btn btn-secondary" href={`tel:${normalizedPhone}`}>Call Sales</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
