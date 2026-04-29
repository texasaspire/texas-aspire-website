import { Arrow } from "./Arrow";

export function Footer() {
  return (
    <footer className="ta-footer">
      <div className="ta-footer__inner">
        <div>
          <div className="ta-footer__brand">
            <img
              src="/logo.png"
              alt="Texas Aspire"
              className="ta-footer__brand-mark"
              width={32}
              height={32}
            />
            texas aspire
          </div>
          <p className="ta-footer__tagline">
            UT Austin&apos;s first fully accessible pre-med mentorship organization.
            Free, open, and student-led.
          </p>
        </div>

        <div>
          <div className="ta-footer__col-h">Find us</div>
          <a
            href="https://instagram.com/texas.aspire"
            target="_blank"
            rel="noopener noreferrer"
            className="ta-footer__link"
          >
            @texas.aspire
            <Arrow size={11} />
          </a>
        </div>

        <div>
          <div className="ta-footer__col-h">Explore</div>
          <a href="#about" className="ta-footer__link">About</a>
          <a href="#offer" className="ta-footer__link">What we offer</a>
          <a href="#team" className="ta-footer__link">Team</a>
          <a href="#events" className="ta-footer__link">Events</a>
        </div>
      </div>

      <div className="ta-footer__bottom">
        <span>Texas Aspire · UT Austin · 2025–2026</span>
        <span>No applications · No dues · No interviews</span>
      </div>
    </footer>
  );
}
