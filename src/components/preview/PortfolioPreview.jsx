import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi';

export default function PortfolioPreview({ data, accentColor, template }) {
  const color = accentColor.value;
  const isCyber = template === 'cyberpunk';
  const isMinimal = template === 'minimalist';

  const pi = data.personalInfo;
  const hasContent = (arr) => arr && arr.some((e) => {
    return Object.values(e).some((v) => typeof v === 'string' && v.trim() !== '' && v !== e.id);
  });

  // Dynamic Styles
  const getThemeStyles = () => {
    if (isCyber) {
      return {
        bg: '#05050c',
        cardBg: 'rgba(10, 10, 25, 0.8)',
        border: `1px solid ${color}44`,
        text: '#f1f5f9',
        mutedText: '#94a3b8',
        accentGlow: `0 0 25px ${color}66`,
        nameStyle: { textShadow: `0 0 10px ${color}, 0 0 20px ${color}` },
        glass: 'none',
      };
    }
    if (isMinimal) {
      return {
        bg: '#fafafa',
        cardBg: '#ffffff',
        border: '1px solid #e2e8f0',
        text: '#0f172a',
        mutedText: '#64748b',
        accentGlow: 'none',
        nameStyle: {},
        glass: 'none',
      };
    }
    // Creative Glass (default)
    return {
      bg: 'linear-gradient(135deg, #0d0f1e 0%, #15182d 100%)',
      cardBg: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      text: '#f8fafc',
      mutedText: '#94a3b8',
      accentGlow: `0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 15px ${color}33`,
      nameStyle: {},
      glass: 'blur(20px)',
    };
  };

  const theme = getThemeStyles();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: theme.bg,
        color: theme.text,
        fontFamily: "'Inter', sans-serif",
        padding: '24px',
        overflowY: 'auto',
        position: 'relative',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Background Decorative Glowing Orbs (only for creative glass & cyberpunk) */}
      {!isMinimal && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: color,
              filter: 'blur(60px)',
              opacity: 0.15,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              right: '10%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: '#818cf8',
              filter: 'blur(70px)',
              opacity: 0.12,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Header / Navbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          paddingBottom: '16px',
          borderBottom: theme.border,
          backdropFilter: theme.glass,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: isMinimal ? '#000' : color, ...theme.nameStyle }}>
          {pi.fullName ? pi.fullName.split(' ')[0] : 'Portfolio'}
          <span style={{ color: '#818cf8' }}>.</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
          <a href="#about" style={{ color: theme.text }}>About</a>
          <a href="#projects" style={{ color: theme.text }}>Projects</a>
          <a href="#experience" style={{ color: theme.text }}>Experience</a>
          <a href="#contact" style={{ color: theme.text }}>Contact</a>
        </div>
      </div>

      {/* Hero Section */}
      <div
        id="about"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: '48px',
        }}
      >
        {pi.photoUrl && <img src={pi.photoUrl} alt="Profile" style={{ width: 92, height: 116, objectFit: 'cover', borderRadius: '8px', marginBottom: '8px', boxShadow: theme.accentGlow }} />}
        <div
          style={{
            padding: '4px 12px',
            background: isMinimal ? '#000' : `${color}22`,
            border: isMinimal ? 'none' : `1px solid ${color}44`,
            borderRadius: '100px',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: isMinimal ? '#fff' : color,
            boxShadow: theme.accentGlow,
          }}
        >
          👋 Welcome to my universe
        </div>
        <h1
          style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            lineHeight: 1.1,
            color: isMinimal ? '#0f172a' : '#f8fafc',
          }}
        >
          I'm <span style={{ color, ...theme.nameStyle }}>{pi.fullName || 'Creative Developer'}</span>
        </h1>
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 500,
            color: theme.mutedText,
            maxWidth: '90%',
          }}
        >
          {pi.tagline || 'Crafting digital experiences with premium code and rich aesthetics.'}
        </p>
        <p
          style={{
            fontSize: '0.8rem',
            color: theme.mutedText,
            lineHeight: 1.6,
            maxWidth: '95%',
            marginTop: '8px',
          }}
        >
          {pi.bio || 'I combine engineering and creativity to build clean, responsive, and jaw-dropping applications.'}
        </p>

        {/* Hero Contact Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <a
            href="#contact"
            style={{
              padding: '8px 20px',
              background: color,
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: '6px',
              boxShadow: theme.accentGlow,
            }}
          >
            Hire Me
          </a>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {pi.github && (
              <a href={`https://${pi.github}`} target="_blank" rel="noreferrer" style={{ color: theme.text }}>
                <FiGithub size={18} />
              </a>
            )}
            {pi.linkedin && (
              <a href={`https://${pi.linkedin}`} target="_blank" rel="noreferrer" style={{ color: theme.text }}>
                <FiLinkedin size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {hasContent(data.skills) && (
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: isMinimal ? '2px solid #000' : 'none' }}>
            My Expertise
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.skills.map((skill) => (
              skill.items && (
                <div
                  key={skill.id}
                  style={{
                    background: theme.cardBg,
                    border: theme.border,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    backdropFilter: theme.glass,
                    boxShadow: theme.accentGlow !== 'none' ? '0 4px 10px rgba(0,0,0,0.15)' : 'none',
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color, marginBottom: '6px' }}>
                    {skill.category}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {skill.items.split(',').map((item, index) => (
                      <span
                        key={index}
                        style={{
                          fontSize: '0.7rem',
                          background: isMinimal ? '#f1f5f9' : 'rgba(255,255,255,0.05)',
                          color: theme.text,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: isMinimal ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Projects Grid Section */}
      {hasContent(data.projects) && (
        <div id="projects" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Selected Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {data.projects.map((proj) => (
              proj.name && (
                <div
                  key={proj.id}
                  style={{
                    background: theme.cardBg,
                    border: theme.border,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backdropFilter: theme.glass,
                    boxShadow: theme.accentGlow !== 'none' ? '0 10px 20px rgba(0,0,0,0.2)' : 'none',
                    position: 'relative',
                  }}
                >
                  {/* Styled Project Thumbnail */}
                  <div
                    style={{
                      height: '100px',
                      background: `linear-gradient(135deg, ${color}33, #818cf844)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <span style={{ fontSize: '1rem', fontWeight: 800, color, ...theme.nameStyle }}>
                      {proj.name}
                    </span>
                    {proj.url && (
                      <a
                        href={`https://${proj.url}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          color: '#fff',
                          background: 'rgba(0,0,0,0.5)',
                          padding: '6px',
                          borderRadius: '50%',
                        }}
                      >
                        <FiExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>
                      {proj.name}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: theme.mutedText, marginBottom: '12px', lineHeight: 1.5 }}>
                      {proj.description}
                    </p>
                    {proj.technologies && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {proj.technologies.split(',').map((tech, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '0.65rem',
                              color,
                              background: `${color}11`,
                              padding: '2px 6px',
                              borderRadius: '4px',
                            }}
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Experience Timeline */}
      {hasContent(data.experience) && (
        <div id="experience" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Experience Timeline</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            {data.experience.map((exp) => (
              (exp.company || exp.position) && (
                <div
                  key={exp.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: color,
                        boxShadow: theme.accentGlow,
                      }}
                    />
                    <div style={{ flex: 1, width: '2px', background: theme.border.split(' ').pop() || '#e2e8f0', marginTop: '4px' }} />
                  </div>
                  <div style={{ flex: 1, paddingBottom: '16px' }}>
                    <div style={{ fontSize: '0.75rem', color: theme.mutedText }}>
                      {exp.startDate}{exp.startDate && ' — '}{exp.current ? 'Present' : exp.endDate}
                    </div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{exp.position}</h3>
                    <div style={{ fontSize: '0.8rem', color, fontWeight: 500, marginBottom: '6px' }}>{exp.company}</div>
                    <p style={{ fontSize: '0.75rem', color: theme.mutedText, lineHeight: 1.5 }}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div
        id="contact"
        style={{
          background: theme.cardBg,
          border: theme.border,
          borderRadius: '12px',
          padding: '20px',
          backdropFilter: theme.glass,
          boxShadow: theme.accentGlow,
        }}
      >
        <h2 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Let's Work Together</h2>
        <p style={{ fontSize: '0.75rem', color: theme.mutedText, marginBottom: '16px' }}>
          Have a project in mind or looking for a talented developer? Get in touch!
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
          {pi.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiMail color={color} />
              <span>{pi.email}</span>
            </div>
          )}
          {pi.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiPhone color={color} />
              <span>{pi.phone}</span>
            </div>
          )}
          {pi.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiMapPin color={color} />
              <span>{pi.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
