export default function ResumePreview({ data, accentColor, template }) {
  const color = accentColor.value;
  const lightColor = accentColor.light;
  const isModern = template === 'modern';

  const hasContent = (arr) => arr && arr.some((e) => {
    return Object.values(e).some((v) => typeof v === 'string' && v.trim() !== '' && v !== e.id);
  });

  const pi = data.personalInfo;
  const contactItems = [pi.email, pi.phone, pi.location, pi.linkedin, pi.website].filter(Boolean);

  return (
    <div className={`preview-page-inner ${isModern ? 'prev-modern' : ''}`}>
      {/* Header */}
      <div
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
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="prev-section">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            PROFESSIONAL SUMMARY
          </div>
          <div className="prev-entry-desc">{data.summary}</div>
        </div>
      )}

      {/* Experience */}
      {hasContent(data.experience) && (
        <div className="prev-section">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            EXPERIENCE
          </div>
          {data.experience.map((exp) => (
            (exp.company || exp.position) && (
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
      {hasContent(data.education) && (
        <div className="prev-section">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            EDUCATION
          </div>
          {data.education.map((edu) => (
            (edu.institution || edu.degree) && (
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
      {hasContent(data.skills) && (
        <div className="prev-section">
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
      {hasContent(data.projects) && (
        <div className="prev-section">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            PROJECTS
          </div>
          {data.projects.map((proj) => (
            proj.name && (
              <div className="prev-entry" key={proj.id}>
                <div className="prev-entry-title">{proj.name}</div>
                {proj.description && (
                  <div className="prev-entry-desc">{proj.description}</div>
                )}
                {proj.technologies && (
                  <div className="prev-entry-desc" style={{ color: '#777', fontSize: '7.5px' }}>
                    Tech: {proj.technologies}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Certifications */}
      {hasContent(data.certifications) && (
        <div className="prev-section">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            CERTIFICATIONS
          </div>
          {data.certifications.map((cert) => (
            cert.name && (
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
      {hasContent(data.languages) && (
        <div className="prev-section">
          <div className="prev-section-title" style={{ borderColor: color, color }}>
            LANGUAGES
          </div>
          <div className="prev-languages">
            {data.languages.map((lang) => (
              lang.language && (
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
