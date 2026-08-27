import { Document, Page, Text, View, Image, StyleSheet, Link } from '@react-pdf/renderer';

const createStyles = (accentColor) =>
  StyleSheet.create({
    page: {
      paddingTop: 36,
      paddingBottom: 36,
      paddingLeft: 40,
      paddingRight: 40,
      fontFamily: 'Helvetica',
      fontSize: 9.5,
      color: '#1a1a1a',
      lineHeight: 1.5,
    },
    header: {
      marginBottom: 14,
    },
    name: {
      fontSize: 22,
      fontFamily: 'Helvetica-Bold',
      color: accentColor,
      letterSpacing: -0.5,
      lineHeight: 1.08,
      marginBottom: 6,
    },
    jobTitle: {
      fontSize: 11,
      color: '#555',
      lineHeight: 1.25,
      marginBottom: 8,
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    contactItem: {
      fontSize: 8,
      color: '#666',
      marginRight: 12,
    },
    sectionTitle: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: accentColor,
      textTransform: 'uppercase',
      letterSpacing: 1,
      paddingBottom: 3,
      borderBottomWidth: 1.5,
      borderBottomColor: accentColor,
      marginBottom: 6,
      marginTop: 10,
    },
    entryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 1,
    },
    entryTitle: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
    },
    entrySubtitle: {
      fontSize: 9,
      color: '#555',
      fontStyle: 'italic',
    },
    entryDate: {
      fontSize: 8,
      color: '#777',
      width: 92,
      flexShrink: 0,
      textAlign: 'right',
      marginLeft: 8,
    },
    entryDesc: {
      fontSize: 8.5,
      color: '#444',
      marginTop: 2,
      marginBottom: 6,
      lineHeight: 1.5,
    },
    skillRow: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    skillCategory: {
      fontSize: 9,
      fontFamily: 'Helvetica-Bold',
      width: 125,
      flexShrink: 0,
      color: '#333',
    },
    skillItems: {
      fontSize: 9,
      color: '#555',
      flex: 1,
    },
    langRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    langItem: {
      fontSize: 9,
    },
    langName: {
      fontFamily: 'Helvetica-Bold',
    },
    langLevel: {
      color: '#777',
      fontSize: 8,
    },
    entry: {
      marginBottom: 6,
    },
  });

export default function ResumeClassicPDF({ data, accentColor }) {
  const styles = createStyles(accentColor.value);
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.linkedin, pi.website].filter(Boolean);

  const hasEntries = (arr) => arr && arr.some((e) =>
    Object.values(e).some((v) => typeof v === 'string' && v.trim() !== '' && v !== e.id)
  );
  const hasEntryContent = (entry) => Object.values(entry).some((v) => typeof v === 'string' && v.trim() !== '' && v !== entry.id);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ flex: 1, paddingTop: 2 }}>
              <Text style={styles.name}>{pi.fullName || 'Your Name'}</Text>
              {pi.jobTitle ? <Text style={styles.jobTitle}>{pi.jobTitle}</Text> : null}
              {contacts.length > 0 && <View style={styles.contactRow}>{contacts.map((c, i) => <Text key={i} style={styles.contactItem}>{c}</Text>)}</View>}
            </View>
            {pi.photoUrl ? <Image src={pi.photoUrl} style={{ width: 52, height: 66, objectFit: 'cover', borderRadius: 8, marginLeft: 12 }} /> : null}
          </View>
        </View>

        {/* Summary */}
        {data.summary ? (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.entryDesc}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {hasEntries(data.experience) && (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              (exp.company || exp.position) ? (
                <View key={exp.id} style={styles.entry} wrap={false}>
                  <View style={styles.entryRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.entryTitle}>{exp.position}</Text>
                      <Text style={styles.entrySubtitle}>{exp.company}</Text>
                    </View>
                    <Text style={styles.entryDate}>
                      {exp.startDate}{exp.startDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </Text>
                  </View>
                  {exp.description ? <Text style={styles.entryDesc}>{exp.description}</Text> : null}
                </View>
              ) : null
            ))}
          </View>
        )}

        {/* Education */}
        {hasEntries(data.education) && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              (edu.institution || edu.degree) ? (
                <View key={edu.id} style={styles.entry} wrap={false}>
                  <View style={styles.entryRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.entryTitle}>
                        {edu.degree}{edu.degree && edu.field ? ' in ' : ''}{edu.field}
                      </Text>
                      <Text style={styles.entrySubtitle}>{edu.institution}</Text>
                    </View>
                    <Text style={styles.entryDate}>
                      {edu.startDate}{edu.startDate && edu.endDate ? ' — ' : ''}{edu.endDate}
                    </Text>
                  </View>
                  {edu.gpa ? <Text style={styles.entryDesc}>GPA: {edu.gpa}</Text> : null}
                </View>
              ) : null
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills?.some((skill) => skill.items?.trim()) && (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.map((skill) => (
              skill.items ? (
                <View key={skill.id} style={styles.skillRow}>
                  <Text style={styles.skillCategory}>{skill.category}:</Text>
                  <Text style={styles.skillItems}>{skill.items}</Text>
                </View>
              ) : null
            ))}
          </View>
        )}

        {/* Projects */}
        {hasEntries(data.projects) && (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj) => (
              hasEntryContent(proj) ? (
                <View key={proj.id} style={styles.entry} wrap={false}>
                  {proj.name ? <Text style={styles.entryTitle}>{proj.name}</Text> : null}
                  {proj.description ? <Text style={styles.entryDesc}>{proj.description}</Text> : null}
                  {proj.technologies ? (
                    <Text style={{ ...styles.entryDesc, color: '#777', fontSize: 8 }}>
                      Technologies: {proj.technologies}
                    </Text>
                  ) : null}
                  {proj.url ? <Text style={{ ...styles.entryDesc, color: '#777', fontSize: 8 }}>Link: {proj.url}</Text> : null}
                </View>
              ) : null
            ))}
          </View>
        )}

        {/* Certifications */}
        {hasEntries(data.certifications) && (
          <View>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              hasEntryContent(cert) ? (
                <View key={cert.id} style={styles.entry} wrap={false}>
                  <View style={styles.entryRow}>
                    <Text style={styles.entryTitle}>{cert.name}</Text>
                    <Text style={styles.entryDate}>{cert.date}</Text>
                  </View>
                  {cert.issuer ? <Text style={styles.entrySubtitle}>{cert.issuer}</Text> : null}
                  {cert.url ? <Text style={{ ...styles.entryDesc, color: '#777', fontSize: 8 }}>Link: {cert.url}</Text> : null}
                </View>
              ) : null
            ))}
          </View>
        )}

        {/* Languages */}
        {data.languages?.some((lang) => lang.language?.trim()) && (
          <View>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.langRow}>
              {data.languages.map((lang) => (
                hasEntryContent(lang) ? (
                  <View key={lang.id} style={{ flexDirection: 'row', marginRight: 12 }}>
                    <Text style={styles.langName}>{lang.language}</Text>
                    <Text style={{ ...styles.langLevel, marginLeft: 3 }}>({lang.proficiency})</Text>
                  </View>
                ) : null
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
