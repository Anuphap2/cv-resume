import { formatDateRange } from './formatDates';

export function generatePortfolioHTML(data, accentColor, template) {
  const color = accentColor.value;
  const isCyber = template === 'cyberpunk';
  const isMinimal = template === 'minimalist';

  const pi = data.personalInfo;

  // Set up theme colors and styling tokens
  let bodyBg = 'linear-gradient(135deg, #0d0f1e 0%, #15182d 100%)';
  let cardBg = 'rgba(255, 255, 255, 0.03)';
  let borderStyle = '1px solid rgba(255, 255, 255, 0.08)';
  let textColor = '#f8fafc';
  let mutedColor = '#94a3b8';
  let glassBlur = 'backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);';
  let glowEffect = `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 15px ${color}33;`;
  let titleShadow = '';

  if (isCyber) {
    bodyBg = '#05050c';
    cardBg = 'rgba(10, 10, 25, 0.8)';
    borderStyle = `1px solid ${color}44`;
    textColor = '#f1f5f9';
    mutedColor = '#94a3b8';
    glassBlur = '';
    glowEffect = `box-shadow: 0 0 25px ${color}55;`;
    titleShadow = `text-shadow: 0 0 10px ${color}, 0 0 20px ${color};`;
  } else if (isMinimal) {
    bodyBg = '#fafafa';
    cardBg = '#ffffff';
    borderStyle = '1px solid #e2e8f0';
    textColor = '#0f172a';
    mutedColor = '#64748b';
    glassBlur = '';
    glowEffect = 'box-shadow: 0 1px 3px rgba(0,0,0,0.05);';
  }

  // Build projects HTML
  const projectsHTML = (data.projects || []).map(proj => {
    if (!proj.name) return '';
    const techBadges = (proj.technologies || '').split(',').map(tech => {
      if (!tech.trim()) return '';
      return `<span class="tech-badge">${tech.trim()}</span>`;
    }).join('');

    return `
      <div class="project-card">
        <div class="project-thumb">
          <h3>${proj.name}</h3>
          ${proj.url ? `<a href="https://${proj.url}" target="_blank" class="proj-link-icon">↗</a>` : ''}
        </div>
        <div class="project-details">
          <h4>${proj.name}</h4>
          <p>${proj.description}</p>
          <div class="tech-row">${techBadges}</div>
        </div>
      </div>
    `;
  }).join('');

  // Build skills HTML
  const skillsHTML = (data.skills || []).map(skill => {
    if (!skill.items) return '';
    const skillItems = skill.items.split(',').map(item => {
      if (!item.trim()) return '';
      return `<span class="skill-tag">${item.trim()}</span>`;
    }).join('');

    return `
      <div class="skill-category-card">
        <h3 class="skill-cat-title">${skill.category}</h3>
        <div class="skills-grid">${skillItems}</div>
      </div>
    `;
  }).join('');

  // Build experience HTML
  const experienceHTML = (data.experience || []).map(exp => {
    if (!exp.company && !exp.position) return '';
    return `
      <div class="timeline-item">
        <div class="timeline-dot-container">
          <div class="timeline-dot"></div>
          <div class="timeline-line"></div>
        </div>
        <div class="timeline-content">
          <span class="timeline-date">${formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
          <h3 class="timeline-title">${exp.position}</h3>
          <div class="timeline-company">${exp.company}</div>
          <p class="timeline-desc">${exp.description}</p>
        </div>
      </div>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pi.fullName || 'Personal Portfolio'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: ${color};
      --text: ${textColor};
      --muted: ${mutedColor};
      --border: ${borderStyle.split(' ')[2] || '#e2e8f0'};
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Inter', sans-serif;
      background: ${bodyBg};
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
      position: relative;
      overflow-x: hidden;
      padding: 40px 20px;
    }

    /* Decorative Orbs */
    ${!isMinimal ? `
    .orb-1 {
      position: absolute;
      top: 10%;
      left: 10%;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: var(--accent);
      filter: blur(120px);
      opacity: 0.15;
      pointer-events: none;
      z-index: 0;
    }
    .orb-2 {
      position: absolute;
      bottom: 20%;
      right: 10%;
      width: 350px;
      height: 350px;
      border-radius: 50%;
      background: #818cf8;
      filter: blur(140px);
      opacity: 0.12;
      pointer-events: none;
      z-index: 0;
    }
    ` : ''}

    .container {
      max-width: 900px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    /* Navbar */
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 24px;
      border-bottom: ${borderStyle};
      margin-bottom: 64px;
      ${glassBlur}
    }

    .logo {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.5rem;
      color: ${isMinimal ? '#000' : 'var(--accent)'};
      text-decoration: none;
      ${titleShadow}
    }

    .nav-links a {
      color: var(--text);
      text-decoration: none;
      margin-left: 24px;
      font-size: 0.9rem;
      transition: color 0.2s;
    }

    .nav-links a:hover {
      color: var(--accent);
    }

    /* Hero */
    .hero {
      margin-bottom: 80px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .welcome-badge {
      padding: 6px 16px;
      background: ${isMinimal ? '#000' : 'rgba(255,255,255,0.03)'};
      border: ${isMinimal ? 'none' : '1px solid var(--border)'};
      border-radius: 100px;
      font-size: 0.8rem;
      font-weight: 600;
      color: ${isMinimal ? '#fff' : 'var(--accent)'};
      ${isCyber ? `box-shadow: 0 0 15px var(--accent);` : ''}
    }

    .hero h1 {
      font-family: 'Outfit', sans-serif;
      font-size: clamp(2.5rem, 8vw, 4rem);
      font-weight: 800;
      line-height: 1.1;
    }

    .hero h1 span {
      color: var(--accent);
      ${titleShadow}
    }

    .tagline {
      font-size: clamp(1.1rem, 3vw, 1.5rem);
      color: var(--muted);
      font-weight: 500;
      max-width: 800px;
    }

    .bio {
      font-size: 1rem;
      color: var(--muted);
      max-width: 700px;
      line-height: 1.7;
    }

    .cta-row {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 16px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      padding: 12px 32px;
      background: var(--accent);
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      border-radius: 8px;
      transition: all 0.2s;
      ${glowEffect}
    }

    .btn:hover {
      transform: translateY(-2px);
      filter: brightness(1.1);
    }

    .social-links a {
      color: var(--text);
      margin-right: 16px;
      transition: color 0.2s;
      font-weight: 500;
    }

    .social-links a:hover {
      color: var(--accent);
    }

    /* Sections */
    section {
      margin-bottom: 80px;
    }

    section h2 {
      font-family: 'Outfit', sans-serif;
      font-size: 2rem;
      margin-bottom: 32px;
      position: relative;
    }

    /* Skills */
    .skills-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .skill-category-card {
      background: ${cardBg};
      border: ${borderStyle};
      border-radius: 12px;
      padding: 24px;
      ${glassBlur}
      ${isCyber ? `box-shadow: 0 4px 15px rgba(0,0,0,0.2);` : ''}
    }

    .skill-cat-title {
      font-size: 1.1rem;
      color: var(--accent);
      margin-bottom: 12px;
      font-weight: 700;
    }

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-tag {
      font-size: 0.85rem;
      background: ${isMinimal ? '#f1f5f9' : 'rgba(255,255,255,0.05)'};
      padding: 6px 14px;
      border-radius: 6px;
      border: ${isMinimal ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.05)'};
    }

    /* Projects */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .project-card {
      background: ${cardBg};
      border: ${borderStyle};
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
      ${glassBlur}
    }

    .project-card:hover {
      transform: translateY(-6px);
      ${isCyber ? `box-shadow: 0 10px 30px rgba(0,0,0,0.3), 0 0 20px var(--accent);` : `box-shadow: 0 10px 30px rgba(0,0,0,0.15);`}
    }

    .project-thumb {
      height: 160px;
      background: linear-gradient(135deg, ${color}33, #818cf844);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      color: var(--accent);
    }

    .project-thumb h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.3rem;
      font-weight: 800;
      ${titleShadow}
    }

    .proj-link-icon {
      position: absolute;
      top: 16px;
      right: 16px;
      color: #fff;
      background: rgba(0,0,0,0.6);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      text-decoration: none;
      font-weight: bold;
    }

    .project-details {
      padding: 24px;
    }

    .project-details h4 {
      font-size: 1.1rem;
      margin-bottom: 8px;
    }

    .project-details p {
      font-size: 0.9rem;
      color: var(--muted);
      margin-bottom: 16px;
      height: 80px;
      overflow: hidden;
    }

    .tech-badge {
      font-size: 0.75rem;
      color: var(--accent);
      background: ${color}15;
      padding: 4px 10px;
      border-radius: 6px;
      margin-right: 6px;
      display: inline-block;
      margin-bottom: 6px;
    }

    /* Timeline */
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .timeline-item {
      display: flex;
      gap: 24px;
    }

    .timeline-dot-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .timeline-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--accent);
      ${isCyber ? `box-shadow: 0 0 10px var(--accent);` : ''}
    }

    .timeline-line {
      flex: 1;
      width: 2px;
      background: var(--border);
      margin-top: 8px;
    }

    .timeline-content {
      flex: 1;
      padding-bottom: 24px;
    }

    .timeline-date {
      font-size: 0.85rem;
      color: var(--muted);
      font-weight: 600;
    }

    .timeline-title {
      font-size: 1.15rem;
      font-weight: 700;
      margin-top: 4px;
    }

    .timeline-company {
      font-size: 1rem;
      color: var(--accent);
      font-weight: 600;
      margin-bottom: 8px;
    }

    .timeline-desc {
      font-size: 0.9rem;
      color: var(--muted);
    }

    /* Contact Card */
    .contact-card {
      background: ${cardBg};
      border: ${borderStyle};
      border-radius: 16px;
      padding: 32px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      ${glassBlur}
      ${glowEffect}
    }

    @media (max-width: 768px) {
      .contact-card {
        grid-template-columns: 1fr;
      }
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .contact-method {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.95rem;
    }

    .contact-icon {
      color: var(--accent);
      font-weight: bold;
    }

    footer {
      text-align: center;
      margin-top: 80px;
      padding-top: 24px;
      border-top: ${borderStyle};
      font-size: 0.85rem;
      color: var(--muted);
    }
  </style>
</head>
<body>
  ${!isMinimal ? `
  <div class="orb-1"></div>
  <div class="orb-2"></div>
  ` : ''}

  <div class="container">
    <header>
      <a href="#" class="logo">${pi.fullName ? pi.fullName.split(' ')[0] : 'Portfolio'}<span>.</span></a>
      <nav class="nav-links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <div class="hero" id="about">
      <div class="welcome-badge">👋 Welcome to my universe</div>
      <h1>I'm <span>${pi.fullName || 'Creative Developer'}</span></h1>
      <p class="tagline">${pi.tagline || 'Crafting digital experiences with premium code.'}</p>
      ${pi.photoUrl ? `<img src="${pi.photoUrl}" alt="${pi.fullName || 'Profile photo'}" style="width:112px;height:140px;object-fit:cover;border-radius:8px;margin-bottom:16px;" />` : ''}
      <p class="bio">${pi.bio || 'I combine engineering and creativity to build clean, responsive, and beautiful applications.'}</p>
      
      <div class="cta-row">
        <a href="#contact" class="btn">Hire Me</a>
        <div class="social-links">
          ${pi.github ? `<a href="https://${pi.github}" target="_blank">GitHub</a>` : ''}
          ${pi.linkedin ? `<a href="https://${pi.linkedin}" target="_blank">LinkedIn</a>` : ''}
        </div>
      </div>
    </div>

    ${skillsHTML ? `
    <section>
      <h2>Expertise</h2>
      <div class="skills-container">
        ${skillsHTML}
      </div>
    </section>
    ` : ''}

    ${projectsHTML ? `
    <section id="projects">
      <h2>Selected Works</h2>
      <div class="projects-grid">
        ${projectsHTML}
      </div>
    </section>
    ` : ''}

    ${experienceHTML ? `
    <section id="experience">
      <h2>Experience Timeline</h2>
      <div class="timeline">
        ${experienceHTML}
      </div>
    </section>
    ` : ''}

    <section id="contact">
      <h2>Get In Touch</h2>
      <div class="contact-card">
        <div>
          <p style="margin-bottom: 16px; font-size: 0.95rem; color: var(--muted);">
            Have an exciting opportunity or want to build a premium web application together? Shoot me a message!
          </p>
          <div class="contact-info">
            ${pi.email ? `<div class="contact-method"><span class="contact-icon">✉</span> ${pi.email}</div>` : ''}
            ${pi.phone ? `<div class="contact-method"><span class="contact-icon">☎</span> ${pi.phone}</div>` : ''}
            ${pi.location ? `<div class="contact-method"><span class="contact-icon">📍</span> ${pi.location}</div>` : ''}
          </div>
        </div>
        
        <form style="display: flex; flex-direction: column; gap: 12px;" onsubmit="event.preventDefault(); alert('Message sent simulated!');">
          <input type="text" placeholder="Your Name" style="padding: 10px; background: ${isMinimal ? '#fff' : 'rgba(255,255,255,0.03)'}; border: 1px solid var(--border); color: var(--text); border-radius: 6px; outline: none;" required />
          <input type="email" placeholder="Your Email" style="padding: 10px; background: ${isMinimal ? '#fff' : 'rgba(255,255,255,0.03)'}; border: 1px solid var(--border); color: var(--text); border-radius: 6px; outline: none;" required />
          <textarea placeholder="Your Message" rows="4" style="padding: 10px; background: ${isMinimal ? '#fff' : 'rgba(255,255,255,0.03)'}; border: 1px solid var(--border); color: var(--text); border-radius: 6px; outline: none; resize: vertical;" required></textarea>
          <button type="submit" class="btn" style="border: none; cursor: pointer; text-align: center; justify-content: center;">Send Message</button>
        </form>
      </div>
    </section>

    <footer>
      <p>&copy; ${new Date().getFullYear()} ${pi.fullName || 'Developer'}. All rights reserved.</p>
    </footer>
  </div>
</body>
</html>`;
}
