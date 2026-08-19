import "./styles.css";
import experience from "./experience.js";
import projects from "./projects.js";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/kme211" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/keari" },
];

const strengths = [
  "Frontend architecture",
  "Developer experience",
  "Testing and CI workflows",
  "Technical documentation",
  "React Router server-side rendering",
  "TypeScript",
  "Node.js",
  "Vite and Vitest",
  "Playwright",
];

const selectedWork = [
  {
    eyebrow: "Personal product",
    title:
      "Treklet: an end-to-end product lab for modern frontend architecture",
    status: "Staging",
    summary:
      "I’m building Treklet as a working product and a practical proving ground for the stack we adopted on the new Booking Engine. Owning the application end to end lets me evaluate React Router, Tailwind, and shadcn/ui in context, make deliberate architectural and service-interface tradeoffs, and refine a plan-first approach to AI-assisted development.",
    highlights: [
      "Available in staging with a demo account where visitors can explore a sample trip, organize ideas, build an itinerary, and review budget and expense tools.",
      "Personal ownership spans the product flow, interface architecture, and API decisions.",
      "The project provides a practical setting for evaluating patterns outside enterprise constraints before carrying the useful lessons forward.",
    ],
    tags: [
      "React Router",
      "Tailwind",
      "shadcn/ui",
      "Product architecture",
      "AI-assisted development",
    ],
    links: [{ label: "Preview Treklet", href: "https://staging.treklet.app" }],
  },
];

const engineeringStories = [
  {
    eyebrow: "Professional product work",
    title: "A booking journey that stays in context",
    status: "Current work",
    summary:
      "I help build Aven’s new in-context Booking Engine, an embedded experience designed to keep guests within a hotel’s website throughout the reservation journey. My work focuses on maintainable frontend architecture, supporting services, testing, and operational visibility.",
    highlights: [
      "Contribute across the React interface and supporting Node.js services.",
      "Introduced frontend and backend observability so developers can investigate failures with better context.",
      "Help maintain the build, linting, and test workflows that support dependable delivery.",
    ],
    tags: [
      "Frontend architecture",
      "Node.js services",
      "Testing",
      "Observability",
    ],
    links: [
      {
        label: "About Aven Booking Engine",
        href: "https://www.avenhospitality.com/insights/best-hotel-booking-engine-conversion-rates",
      },
    ],
  },
];

function formatProjectYear(date) {
  return new Date(`${date}T00:00:00Z`).getUTCFullYear();
}

function renderSocialLinks() {
  return socialLinks
    .map(
      (link) => `
        <a class="social-link" href="${link.href}" target="_blank" rel="noreferrer">
          ${link.label}<span aria-hidden="true">↗</span>
        </a>
      `,
    )
    .join("");
}

function renderExperience() {
  return experience
    .map(
      (work) => `
        <article class="timeline-item">
          <div class="timeline-item__meta">
            <p>${work.dates[0]} – ${work.dates[1]}</p>
            <p>${work.companyName}</p>
            ${work.note ? `<p class="company-note">${work.note}</p>` : ""}
          </div>
          <div class="timeline-item__body">
            <h3>${work.title}</h3>
            <ul>
              ${work.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderStrengths() {
  return strengths.map((strength) => `<li>${strength}</li>`).join("");
}

function renderCaseStudies(studies) {
  return studies
    .map(
      (study) => `
        <article class="case-study">
          <div class="case-study__meta">
            <p class="eyebrow">${study.eyebrow}</p>
            <span>${study.status}</span>
          </div>
          <div class="case-study__body">
            <h3>${study.title}</h3>
            <p>${study.summary}</p>
            <ul class="outcome-list">
              ${study.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
            </ul>
            <ul class="tag-list" aria-label="Technologies and areas">
              ${study.tags.map((tag) => `<li>${tag}</li>`).join("")}
            </ul>
            ${
              study.links
                ? `<div class="case-study__actions">
                    ${study.links
                      .map(
                        (link) => `
                          <a class="text-link" href="${link.href}" target="_blank" rel="noreferrer">
                            ${link.label}<span aria-hidden="true">↗</span>
                          </a>
                        `,
                      )
                      .join("")}
                  </div>`
                : ""
            }
          </div>
        </article>
      `,
    )
    .join("");
}

function renderArchive() {
  return projects
    .map(
      (project) => `
        <li class="archive-item">
          <div>
            <div class="archive-item__heading">
              <h3>${project.name}</h3>
              <span>${formatProjectYear(project.date)}</span>
            </div>
            <p>${project.desc}</p>
          </div>
          <div class="archive-item__links">
            ${
              project.links.demo
                ? `<a href="${project.links.demo}" target="_blank" rel="noreferrer">View project<span aria-hidden="true">↗</span></a>`
                : ""
            }
            <a href="${project.links.code}" target="_blank" rel="noreferrer">View source<span aria-hidden="true">↗</span></a>
          </div>
        </li>
      `,
    )
    .join("");
}

document.querySelector("#app").innerHTML = `
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header class="site-header">
    <a class="wordmark" href="#top" aria-label="Keari Eggers, back to top">Keari Eggers</a>
    <nav aria-label="Primary navigation">
      <a href="#experience">Experience</a>
      <a href="#work">Work</a>
      <a href="#archive">Archive</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="main-content">
    <section class="hero" id="top">
      <div class="hero__content">
        <p class="role-label">Senior software engineer focused on frontend architecture, developer experience, and reliable delivery for complex products.</p>
        <h1>I make complex products easier to use, build, and maintain.</h1>
        <p class="lede">
          I build maintainable React interfaces and Node services, strengthen testing and continuous integration (CI) workflows, document hard-won product knowledge, and help teams ship with fewer surprises.
        </p>
        <div class="hero__actions">
          <a class="button" href="#work">View selected work</a>
          <span class="location">Dallas / Fort Worth</span>
        </div>
      </div>
    </section>

    <section class="section split-section" id="experience">
      <div class="section-intro">
        <p class="eyebrow">Experience & strengths</p>
        <h2>Engineering for products and the people who maintain them.</h2>
        <p>
          My work spans customer-facing booking tools, supporting services, and the development systems that help teams deliver them reliably.
        </p>
        <ul class="strength-list">
          ${renderStrengths()}
        </ul>
      </div>
      <div class="timeline">
        ${renderExperience()}
      </div>
    </section>

    <section class="section" id="work">
      <div class="section-heading">
        <p class="eyebrow">Selected work</p>
        <h2>Products explored end to end.</h2>
        <p>
          Current work centered on deliberate architecture, useful product flows, and decisions that hold up beyond the first implementation.
        </p>
      </div>
      <div class="case-study-list case-study-list--featured">
        ${renderCaseStudies(selectedWork)}
      </div>
    </section>

    <section class="section" id="stories">
      <div class="section-heading">
        <p class="eyebrow">Professional engineering stories</p>
        <h2>Reliable delivery is part of the product.</h2>
        <p>
          Architecture, observability, documentation, and feedback loops all shape how confidently a team can ship and support complex software.
        </p>
      </div>
      <div class="case-study-list">
        ${renderCaseStudies(engineeringStories)}
      </div>
    </section>

    <section class="section archive-section" id="archive">
      <div class="section-intro">
        <p class="eyebrow">Project archive</p>
        <h2>Earlier experiments</h2>
        <p>A small selection of older projects that trace the path into product engineering.</p>
      </div>
      <ul class="archive-list">
        ${renderArchive()}
      </ul>
    </section>

    <section class="section contact-section" id="contact">
      <p class="eyebrow">Contact</p>
      <h2>Let’s compare notes.</h2>
      <p>Interested in frontend architecture, developer tooling, or hospitality technology? Say hello.</p>
      <form
        class="contact-form"
        action="https://formspree.io/f/xaewlkjb"
        method="post"
      >
        <div class="contact-form__fields">
          <div class="form-field">
            <label for="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" autocomplete="name" required />
          </div>
          <div class="form-field">
            <label for="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" autocomplete="email" required />
          </div>
          <div class="form-field form-field--wide">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="6" required></textarea>
          </div>
        </div>
        <div class="contact-form__trap" aria-hidden="true">
          <label for="contact-company">Leave this field empty</label>
          <input id="contact-company" name="_gotcha" type="text" tabindex="-1" autocomplete="off" />
        </div>
        <input type="hidden" name="subject" value="New portfolio message from {{ name }}" />
        <div class="contact-form__submit">
          <button class="button" type="submit">Send message</button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </div>
      </form>
      <div class="contact-actions" aria-label="Elsewhere online">
        ${renderSocialLinks()}
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>Designed and built by Keari Eggers. <a href="https://github.com/kme211/static-portfolio" target="_blank" rel="noreferrer">View source<span aria-hidden="true">↗</span></a>.</p>
  </footer>
`;

const contactForm = document.querySelector(".contact-form");
const contactFormStatus = contactForm.querySelector(".form-status");
const contactFormButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  contactFormButton.disabled = true;
  contactFormStatus.textContent = "Sending…";

  try {
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    contactForm.reset();
    contactFormStatus.textContent = "Thanks. Your message is on its way.";
  } catch {
    contactFormStatus.textContent =
      "That message didn’t send. Please wait a moment and try again.";
  } finally {
    contactFormButton.disabled = false;
  }
});
