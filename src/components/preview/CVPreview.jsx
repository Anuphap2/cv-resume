export default function CVPreview({ data, accentColor, template }) {
  const color = accentColor.value;
  const isProfessional = template === "professional";

  const hasContent = (arr) =>
    arr &&
    arr.some((e) => {
      return Object.values(e).some(
        (v) => typeof v === "string" && v.trim() !== "" && v !== e.id,
      );
    });
  const hasEntryContent = (entry) => Object.values(entry).some((v) => typeof v === 'string' && v.trim() !== '' && v !== entry.id);

  const pi = data.personalInfo;
  const contactItems = [
    pi.email,
    pi.phone,
    pi.location,
    pi.linkedin,
    pi.website,
    pi.orcid ? `ORCID: ${pi.orcid}` : "",
  ].filter(Boolean);

  return (
    <div className="preview-page-inner">
      {/* Header */}
      <div
        className="prev-header"
        style={isProfessional ? { paddingBottom: "10px" } : {}}
      >
        <div className="prev-header-row">
          <div className="prev-header-copy">
            <div className="prev-name" style={{ color }}>
              {pi.fullName || "Your Name"}
            </div>
            {pi.title && <div className="prev-title">{pi.title}</div>}
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

      {/* Profile */}
      {data.profile && (
        <div className="prev-section">
          <div
            className="prev-section-title"
            style={{ borderColor: color, color }}
          >
            PROFESSIONAL PROFILE
          </div>
          <div className="prev-entry-desc">{data.profile}</div>
        </div>
      )}

      {/* Education */}
      {hasContent(data.education) && (
        <div className="prev-section">
          <div
            className="prev-section-title"
            style={{ borderColor: color, color }}
          >
            EDUCATION
          </div>
          {data.education.map(
            (edu) =>
              hasEntryContent(edu) && (
                <div className="prev-entry" key={edu.id}>
                  <div className="prev-entry-header">
                    <div>
                      <div className="prev-entry-title">
                        {edu.degree}
                        {edu.degree && edu.field && " in "}
                        {edu.field}
                      </div>
                      <div className="prev-entry-subtitle">
                        {edu.institution}
                      </div>
                    </div>
                    <div className="prev-entry-date">
                      {edu.startDate}
                      {edu.startDate && edu.endDate && " — "}
                      {edu.endDate}
                    </div>
                  </div>
                  {edu.thesis && (
                    <div className="prev-entry-desc">Thesis: {edu.thesis}</div>
                  )}
                  {edu.advisor && (
                    <div
                      className="prev-entry-desc"
                      style={{ fontSize: "7.5px", color: "#777" }}
                    >
                      Advisor: {edu.advisor}
                    </div>
                  )}
                  {edu.gpa && (
                    <div
                      className="prev-entry-desc"
                      style={{ fontSize: "7.5px", color: "#777" }}
                    >
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
              ),
          )}
        </div>
      )}

      {/* Experience */}
      {hasContent(data.experience) && (
        <div className="prev-section">
          <div
            className="prev-section-title"
            style={{ borderColor: color, color }}
          >
            PROFESSIONAL EXPERIENCE
          </div>
          {data.experience.map(
            (exp) =>
              hasEntryContent(exp) && (
                <div className="prev-entry" key={exp.id}>
                  <div className="prev-entry-header">
                    <div>
                      <div className="prev-entry-title">{exp.position}</div>
                      <div className="prev-entry-subtitle">
                        {exp.organization}
                      </div>
                    </div>
                    <div className="prev-entry-date">
                      {exp.startDate}
                      {exp.startDate && " — "}
                      {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="prev-entry-desc">{exp.description}</div>
                  )}
                </div>
              ),
          )}
        </div>
      )}

      {/* Publications */}
      {hasContent(data.publications) && (
        <div className="prev-section">
          <div
            className="prev-section-title"
            style={{ borderColor: color, color }}
          >
            PUBLICATIONS
          </div>
          {data.publications.map(
            (pub, i) =>
              hasEntryContent(pub) && (
                <div className="prev-entry" key={pub.id}>
                  <div className="prev-entry-desc">
                    <span style={{ fontWeight: 600 }}>[{i + 1}]</span>{" "}
                    {pub.authors && <>{pub.authors}. </>}"{pub.title}."
                    {pub.journal && (
                      <>
                        {" "}
                        <em>{pub.journal}</em>
                      </>
                    )}
                    {pub.year && <> ({pub.year})</>}
                    {pub.doi && <> DOI: {pub.doi}</>}
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      {/* Research */}
      {hasContent(data.research) && (
        <div className="prev-section">
          <div
            className="prev-section-title"
            style={{ borderColor: color, color }}
          >
            RESEARCH PROJECTS
          </div>
          {data.research.map(
            (res) =>
              hasEntryContent(res) && (
                <div className="prev-entry" key={res.id}>
                  <div className="prev-entry-header">
                    <div>
                      <div className="prev-entry-title">{res.title}</div>
                      <div className="prev-entry-subtitle">
                        {res.role}
                        {res.role && res.institution && ", "}
                        {res.institution}
                      </div>
                    </div>
                    <div className="prev-entry-date">
                      {res.startDate}
                      {res.startDate && res.endDate && " — "}
                      {res.endDate}
                    </div>
                  </div>
                  {res.description && (
                    <div className="prev-entry-desc">{res.description}</div>
                  )}
                </div>
              ),
          )}
        </div>
      )}

      {/* Certifications */}
      {hasContent(data.certifications) && (
        <div className="prev-section">
          <div
            className="prev-section-title"
            style={{ borderColor: color, color }}
          >
            CERTIFICATIONS & AWARDS
          </div>
          {data.certifications.map(
            (cert) =>
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
              ),
          )}
        </div>
      )}

      {/* Teaching (CV specific) */}
      {hasContent(data.teaching) && (
        <div className="prev-section">
          <div
            className="prev-section-title"
            style={{ borderColor: color, color }}
          >
            TEACHING EXPERIENCE
          </div>
          {data.teaching.map(
            (t) =>
              hasEntryContent(t) && (
                <div className="prev-entry" key={t.id}>
                  <div className="prev-entry-header">
                    <div>
                      <div className="prev-entry-title">{t.course}</div>
                      <div className="prev-entry-subtitle">
                        {t.role}
                        {t.role && t.institution && ", "}
                        {t.institution}
                      </div>
                    </div>
                    <div className="prev-entry-date">{t.period}</div>
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      {/* Languages */}
      {data.languages?.some((lang) => lang.language?.trim()) && (
        <div className="prev-section">
          <div
            className="prev-section-title"
            style={{ borderColor: color, color }}
          >
            LANGUAGES
          </div>
          <div className="prev-languages">
            {data.languages.map(
              (lang) =>
                hasEntryContent(lang) && (
                  <div className="prev-lang-item" key={lang.id}>
                    <span className="prev-lang-name">{lang.language}</span>{" "}
                    <span className="prev-lang-level">
                      ({lang.proficiency})
                    </span>
                  </div>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
