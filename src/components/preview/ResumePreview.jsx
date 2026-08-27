export default function ResumePreview({ data, accentColor, template, pageSections = null, showHeader = true }) {
  const color = accentColor.value;
  const lightColor = accentColor.light;
  const isModern = template === 'modern';

  const hasContent = (arr) => arr && arr.some((e) => {
    return Object.values(e).some((v) => typeof v === 'string' && v.trim() !== '' && v !== e.id);
  });
  const hasEntryContent = (entry) => Object.values(entry).some((v) => typeof v === 'string' && v.trim() !== '' && v !== entry.id);
  const showSection = (index) => pageSections === null || pageSections.includes(String(index));

  const pi = data.personalInfo;
  const contactItems = [pi.email, pi.phone, pi.location, pi.linkedin, pi.website, pi.github].filter(Boolean);

  return (
    <div className={`preview-page-inner ${isModern ? 'prev-modern' : ''}`}>
      {/* Header */}
      {showHeader && <div
        className="prev-header"
        style={isModern ? { backgroundColor: color } : {}}
      >
      <div className="prev-header-row">
          <div className="prev-header-copy">
            <div
              className="prev-name"
              style={!isModern ? { color } : {}}
            >
              {pi.fullName || 'Your Name'}
            </div>
            {pi.jobTitle && <div className="prev-title">{pi.jobTitle}</div>}
            {contactItems.length > 0 && (
              <div className="prev-contact">
                {contactItems.map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </div>
            )}
          </div>
          {pi.photoUrl && <img src={pi.photoUrl} alt="Profile" className="prev-profile-photo" />}
        </div>
      </div>}

      {/* Summary */}
      {showSection(0) && data.summary && (
        <div className="prev-section" data-preview-block="0">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            PROFESSIONAL SUMMARY
          </div>
          <div className="prev-entry-desc">{data.summary}</div>
        </div>
      )}

      {/* Experience */}
      {showSection(1) && hasContent(data.experience) && (
        <div className="prev-section" data-preview-block="1">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            EXPERIENCE
          </div>
          {data.experience.map((exp) => (
            hasEntryContent(exp) && (
              <div className="prev-entry" key={exp.id}>
                <div className="prev-entry-header">
                  <div>
                    <div className="prev-entry-title">{exp.position}</div>
                    <div className="prev-entry-subtitle">{exp.company}</div>
                  </div>
                  <div className="prev-entry-date">
                    {exp.startDate}{exp.startDate && ' — '}{exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.description && (
                  <div className="prev-entry-desc">{exp.description}</div>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Education */}
      {showSection(2) && hasContent(data.education) && (
        <div className="prev-section" data-preview-block="2">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            EDUCATION
          </div>
          {data.education.map((edu) => (
            hasEntryContent(edu) && (
              <div className="prev-entry" key={edu.id}>
                <div className="prev-entry-header">
                  <div>
                    <div className="prev-entry-title">
                      {edu.degree}{edu.degree && edu.field && ' in '}{edu.field}
                    </div>
                    <div className="prev-entry-subtitle">{edu.institution}</div>
                  </div>
                  <div className="prev-entry-date">
                    {edu.startDate}{edu.startDate && edu.endDate && ' — '}{edu.endDate}
                  </div>
                </div>
                {edu.gpa && (
                  <div className="prev-entry-desc">GPA: {edu.gpa}</div>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills */}
      {showSection(3) && data.skills?.some((skill) => skill.items?.trim()) && (
        <div className="prev-section" data-preview-block="3">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            SKILLS
          </div>
          <div className="prev-skills-grid">
            {data.skills.map((skill) => (
              skill.items && (
                <div className="prev-skill-row" key={skill.id}>
                  <span className="prev-skill-cat">{skill.category}:</span>
                  <span className="prev-skill-items">{skill.items}</span>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {showSection(4) && hasContent(data.projects) && (
        <div className="prev-section" data-preview-block="4">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            PROJECTS
          </div>
          {data.projects.map((proj) => (
            hasEntryContent(proj) && (
              <div className="prev-entry" key={proj.id}>
                {proj.name && <div className="prev-entry-title">{proj.name}</div>}
                {proj.description && (
                  <div className="prev-entry-desc">{proj.description}</div>
                )}
                {proj.technologies && (
                  <div className="prev-entry-desc" style={{ color: '#777', fontSize: '7.5px' }}>
                    Technologies: {proj.technologies}
                  </div>
                )}
                {proj.url && <div className="prev-entry-desc" style={{ color: '#777', fontSize: '7.5px' }}>Link: {proj.url}</div>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Certifications */}
      {showSection(5) && hasContent(data.certifications) && (
        <div className="prev-section" data-preview-block="5">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            CERTIFICATIONS
          </div>
          {data.certifications.map((cert) => (
            hasEntryContent(cert) && (
              <div className="prev-entry" key={cert.id}>
                <div className="prev-entry-header">
                  <div className="prev-entry-title">{cert.name}</div>
                  <div className="prev-entry-date">{cert.date}</div>
                </div>
                {cert.issuer && (
                  <div className="prev-entry-subtitle">{cert.issuer}</div>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Languages */}
      {showSection(6) && data.languages?.some((lang) => lang.language?.trim()) && (
        <div className="prev-section" data-preview-block="6">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            LANGUAGES
          </div>
          <div className="prev-languages">
            {data.languages.map((lang) => (
              hasEntryContent(lang) && (
                <div className="prev-lang-item" key={lang.id}>
                  <span className="prev-lang-name">{lang.language}</span>
                  {' '}
                  <span className="prev-lang-level">({lang.proficiency})</span>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
