import { HeroSphere } from "@/components/HeroSphere";
import { RippleHero } from "@/components/RippleHero";
import { Eyebrow } from "@/components/Eyebrow";
import { Arrow } from "@/components/Arrow";
import { HighlightText } from "@/components/HighlightText";
import {
  TEAM,
  EVENTS,
  OFFERINGS,
  QUESTIONS,
  PILLARS,
  OFFER_GROUPS,
  WHY_GROUPS,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Why />
      <Offer />
      <Questions />
      <Team />
      <Events />
    </>
  );
}

// ----------------------------------------------------------------
// Hero — ripple shader + headline + CTAs + small Three.js sphere mark
// ----------------------------------------------------------------
function Hero() {
  return (
    <section id="top" className="ta-hero">
      <RippleHero />
      <HeroSphere />
      <div className="ta-hero__inner">
        <h1 className="ta-display ta-hero__h1">
          Premed mentorship, made open.
        </h1>
        <p className="ta-hero__sub">
          A free, student-led community at UT Austin. Honest guidance from
          medical students, residents, and physicians. No applications. No
          dues. No interviews.
        </p>
        <div className="ta-hero__ctas">
          <a href="#events" className="ta-link ta-link--green">
            Join the next workshop
            <Arrow />
          </a>
          <a href="#about" className="ta-link">
            Learn more
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------
// About — section with key facts + bullet list
// ----------------------------------------------------------------
function About() {
  return (
    <section id="about" className="ta-section ta-about">
      <div className="ta-container">
        <div className="ta-about__topstrip">
          <Eyebrow num="01">About</Eyebrow>
          <span className="ta-about__meta">Founded 2025 · UT Austin</span>
        </div>

        <div className="ta-about__missionwrap">
          <div className="ta-about__mission-kicker">The mission</div>
          <HighlightText className="ta-about__mission">
            Texas Aspire is a student-led premed mentorship organization
            dedicated to making guidance for the medical school journey{" "}
            <strong>free, accessible, and practical</strong> for all students.
          </HighlightText>
        </div>

        <div className="ta-keyfacts">
          <div className="ta-keyfacts__col">
            <h3>What it is</h3>
            <ul>
              <li>A community that meets you where you are</li>
              <li>Honest insight from those who&apos;ve done it</li>
              <li>Practical advice you won&apos;t find in a classroom</li>
            </ul>
          </div>
          <div className="ta-keyfacts__col">
            <h3>Who it&apos;s for</h3>
            <ul>
              <li>Any student interested in medicine</li>
              <li>Premeds at any stage of the journey</li>
              <li>No barriers to entry. Show up and start.</li>
            </ul>
          </div>
        </div>

        <div className="ta-about__how">
          <div className="ta-about__how-kicker">How it works</div>
          <p className="ta-about__how-body">
            Residents and pre-med professionals come in to speak and answer
            questions — ask about coursework, application processes,
            requirements, and more.
          </p>
        </div>

        <div className="ta-statrow">
          <span><span className="num">Free</span></span>
          <span className="dot">·</span>
          <span><span className="num">No application</span></span>
          <span className="dot">·</span>
          <span><span className="num">No dues</span></span>
          <span className="dot">·</span>
          <span><span className="num">Student-led</span></span>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------
// Why — grouped pillars
// ----------------------------------------------------------------
function Why() {
  return (
    <section id="why" className="ta-section">
      <div className="ta-container">
        <div className="ta-section__head">
          <Eyebrow num="02">Why Aspire</Eyebrow>
          <h2 className="ta-display ta-h2">Built differently. By design.</h2>
        </div>

        <div className="ta-bigstat" aria-hidden="true">
          <div className="ta-bigstat__row">
            <div className="ta-bigstat__cell">
              <span className="ta-bigstat__num">0</span>
              <span className="ta-bigstat__label">applications</span>
            </div>
            <div className="ta-bigstat__cell">
              <span className="ta-bigstat__num">0</span>
              <span className="ta-bigstat__label">dues</span>
            </div>
            <div className="ta-bigstat__cell">
              <span className="ta-bigstat__num">0</span>
              <span className="ta-bigstat__label">interviews</span>
            </div>
          </div>
        </div>

        {WHY_GROUPS.map((group) => (
          <div key={group.kicker} className="ta-group">
            <div className="ta-group__kicker">{group.kicker}</div>
            <div className="ta-pillars">
              {group.labels.map((label) => {
                const idx = PILLARS.findIndex((p) => p.label === label);
                const p = PILLARS[idx];
                return (
                  <div key={label} className="ta-pillar">
                    <span className="ta-pillar__num">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="ta-pillar__label">{p.label}</div>
                    <p className="ta-pillar__sub">{p.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ----------------------------------------------------------------
// Offer — GREEN SLAB · grouped offerings
// ----------------------------------------------------------------
function Offer() {
  let n = 0;
  return (
    <section id="offer" className="ta-section ta-section--green">
      <div className="ta-container">
        <div className="ta-section__head">
          <Eyebrow num="03">What we offer</Eyebrow>
          <h2 className="ta-display ta-h2">Guidance across every dimension.</h2>
        </div>

        {OFFER_GROUPS.map((group, gi) => (
          <div key={group.kicker} className="ta-asym ta-asym--offer">
            <aside className="ta-asym__side">
              <div className="ta-offer__kicker-num">
                {String(gi + 1).padStart(2, "0")}
              </div>
              <h3 className="ta-offer__kicker-label">{group.kicker}</h3>
            </aside>
            <ul className="ta-asym__main ta-offer__list ta-offer__list--compact">
              {group.titles.map((title) => {
                const o = OFFERINGS.find((o) => o.title === title)!;
                n += 1;
                return (
                  <li key={title} className="ta-offer__item">
                    <span className="ta-offer__num">
                      {String(n).padStart(2, "0")}
                    </span>
                    <h4 className="ta-offer__title">{o.title}</h4>
                    <p className="ta-offer__desc">{o.desc}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ----------------------------------------------------------------
// Questions
// ----------------------------------------------------------------
function Questions() {
  const [feature, ...rest] = QUESTIONS;
  return (
    <section id="questions" className="ta-section">
      <div className="ta-container">
        <div className="ta-section__head">
          <Eyebrow num="04">Questions we help answer</Eyebrow>
          <h2 className="ta-display ta-h2">
            The questions every premed <em>quietly</em> asks.
          </h2>
        </div>

        <figure className="ta-questions__feature">
          <span className="ta-questions__feature-num">01</span>
          <blockquote className="ta-questions__feature-q">{feature}</blockquote>
          <figcaption className="ta-questions__feature-caption">
            The foundational one. Everything else branches from here.
          </figcaption>
        </figure>

        <ul className="ta-questions__compact">
          {rest.map((q, i) => (
            <li key={q}>
              <span className="ta-questions__compact-num">
                {String(i + 2).padStart(2, "0")}
              </span>
              <span>{q}</span>
            </li>
          ))}
        </ul>

        <a href="#events" className="ta-link ta-link--green">
          Come to the next workshop
          <Arrow />
        </a>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------
// Team
// ----------------------------------------------------------------
function Team() {
  const featured = TEAM[4];
  const rest = TEAM.filter((_, i) => i !== 4);
  return (
    <section id="team" className="ta-section">
      <div className="ta-container">
        <div className="ta-section__head ta-team__head">
          <Eyebrow num="05">Team</Eyebrow>
          <h2 className="ta-display ta-h2">
            Meet the <em>2025–2026</em> board.
          </h2>
        </div>

        <div className="ta-statrow">
          <span><span className="num">5</span> board members</span>
          <span className="dot">·</span>
          <span><span className="num">1</span> resident on board</span>
          <span className="dot">·</span>
          <span><span className="num">0</span> dues</span>
        </div>

        <div className="ta-team__feature">
          <div className="ta-team__feature-photo">
            <img
              src={featured.photo}
              alt={`Portrait of ${featured.name}`}
              loading="lazy"
            />
          </div>
          <div>
            <div className="ta-team__feature-meta">
              {featured.position} · 2025–2026
            </div>
            <h3 className="ta-team__feature-name">{featured.name}</h3>
            <p className="ta-team__feature-bio">{featured.bio}</p>
            <div className="ta-team__feature-year">{featured.year}</div>
          </div>
        </div>

        <div className="ta-team__grid">
          {rest.map((m) => (
            <div key={m.name} className="ta-member">
              <div className="ta-member__photo-wrap">
                <img
                  src={m.photo}
                  alt={`Portrait of ${m.name}`}
                  className="ta-member__photo"
                  loading="lazy"
                />
              </div>
              <div className="ta-member__name">{m.name}</div>
              <div className="ta-member__role">{m.position}</div>
              <div className="ta-member__year">{m.year}</div>
              <p className="ta-member__bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------
// Events — GREEN SLAB · CTA
// ----------------------------------------------------------------
function Events() {
  return (
    <section id="events" className="ta-section ta-section--green">
      <div className="ta-container">
        <div className="ta-section__head">
          <Eyebrow num="06">Events</Eyebrow>
          <h2 className="ta-display ta-h2">Upcoming workshops.</h2>
        </div>

        <div className="ta-events__list">
          {EVENTS.map((ev, i) => {
            const isFeature = i === 0;
            return (
              <div
                key={ev.title}
                className={`ta-event${isFeature ? " ta-event--feature" : ""}`}
              >
                <div className="ta-event__meta">
                  {isFeature ? (
                    <>
                      <span className="ta-event__tag">{ev.tag}</span>
                      <span className="ta-event__plate">Apr 9</span>
                      <span className="ta-event__plate-sub">2026 · 6:30 PM</span>
                      <span className="ta-event__plate-sub">{ev.location}</span>
                    </>
                  ) : (
                    <>
                      <span className="ta-event__tag">{ev.tag}</span>
                      <span className="ta-event__date">{ev.date}</span>
                      <span className="ta-event__location">{ev.location}</span>
                    </>
                  )}
                </div>
                <div>
                  <h3 className="ta-event__title">{ev.title}</h3>
                  {ev.speaker && <p className="ta-event__speaker">{ev.speaker}</p>}
                  {ev.hook ? (
                    <p className="ta-event__hook">{ev.hook}</p>
                  ) : (
                    <p className="ta-event__desc">{ev.description}</p>
                  )}
                  {ev.agenda && (
                    <div className="ta-agenda">
                      <div className="ta-agenda__kicker">On the agenda</div>
                      <ul className="ta-agenda__list">
                        {ev.agenda.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="ta-event__arrow">
                  <Arrow size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
