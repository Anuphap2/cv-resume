import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { formatDateRange } from '../../utils/formatDates';
import CustomSectionsPDF from './CustomSectionsPDF';
import { getDocumentLabels } from '../../utils/documentLabels';
import { getPdfFonts } from '../../utils/pdfFonts';

const createStyles = (accentColor, fonts) =>
  StyleSheet.create({
    page: {
      fontFamily: fonts.regular,
      fontSize: 9,
      color: '#1a1a1a',
      lineHeight: 1.3,
    },
    headerBg: {
      backgroundColor: accentColor,
      paddingTop: 22,
      paddingBottom: 14,
      paddingLeft: 36,
      paddingRight: 36,
      marginBottom: 8,
    },
    name: {
      fontSize: 21,
      fontFamily: fonts.bold,
      color: '#ffffff',
      letterSpacing: -0.5,
      lineHeight: 1.08,
      marginBottom: 4,
    },
    jobTitle: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.85)',
      lineHeight: 1.25,
      marginBottom: 4,
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    contactItem: {
      fontSize: 8,
      color: 'rgba(255,255,255,0.7)',
      marginRight: 12,
    },
    body: {
      paddingTop: 0,
      paddingBottom: 20,
      paddingLeft: 36,
      paddingRight: 36,
    },
    sectionTitle: {
      fontSize: 10,
      fontFamily: fonts.bold,
      color: accentColor,
      textTransform: 'uppercase',
      letterSpacing: fonts.regular === 'Sarabun' ? 0 : 1,
      paddingBottom: 2,
      borderBottomWidth: 2,
      borderBottomColor: accentColor,
      marginBottom: 5,
      marginTop: 7,
    },
    entryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 1,
    },
    entryTitle: {
      fontSize: 10,
      fontFamily: fonts.bold,
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
      marginTop: 1,
      marginBottom: 3,
      lineHeight: 1.3,
    },
    skillRow: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    skillCategory: {
      fontSize: 9,
      fontFamily: fonts.bold,
      width: 125,
      flexShrink: 0,
      color: '#333',
    },
    skillItems: {
      fontSize: 9,
      color: '#555',
      flex: 1,
    },
    skillEvidence: {
      fontSize: 7.5,
      color: '#666',
      marginTop: 2,
      lineHeight: 1.35,
    },
    langRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    langName: {
      fontFamily: fonts.bold,
      fontSize: 9,
    },
    langLevel: {
      color: '#777',
      fontSize: 8,
    },
    entry: {
      marginBottom: 4,
    },
  });

export default function ResumeModernPDF({ data, accentColor, contentLanguage = 'en' }) {
  const labels = getDocumentLabels(contentLanguage);
  const fonts = getPdfFonts(contentLanguage);
  const styles = createStyles(accentColor.value, fonts);
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.linkedin, pi.website, pi.github].filter(Boolean);

  const hasEntries = (arr) => arr && arr.some((e) =>
    Object.values(e).some((v) => typeof v === 'string' && v.trim() !== '' && v !== e.id)
  );
  const hasEntryContent = (entry) => Object.values(entry).some((v) => typeof v === 'string' && v.trim() !== '' && v !== entry.id);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with colored background */}
        <View style={styles.headerBg}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ flex: 1, paddingTop: 2 }}>
              <Text style={styles.name}>{pi.fullName || labels.yourName}</Text>
              {pi.jobTitle ? <Text style={styles.jobTitle}>{pi.jobTitle}</Text> : null}
              {contacts.length > 0 && <View style={styles.contactRow}>{contacts.map((c, i) => <Text key={i} style={styles.contactItem}>{c}</Text>)}</View>}
            </View>
            {pi.photoUrl ? <Image src={pi.photoUrl} style={{ width: 52, height: 66, objectFit: 'cover', borderRadius: 8, marginLeft: 12 }} /> : null}
          </View>
        </View>

        <View style={styles.body}>
          {data.summary ? (
            <View>
              <Text style={styles.sectionTitle}>{labels.professionalSummary}</Text>
              <Text style={styles.entryDesc}>{data.summary}</Text>
            </View>
          ) : null}

          {hasEntries(data.experience) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.experience}</Text>
              {data.experience.map((exp) => (
                (exp.company || exp.position) ? (
                  <View key={exp.id} style={styles.entry} wrap={false}>
                    <View style={styles.entryRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.entryTitle}>{exp.position}</Text>
                        <Text style={styles.entrySubtitle}>{exp.company}</Text>
                      </View>
                      <Text style={styles.entryDate}>
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </Text>
                    </View>
                    {exp.description ? <Text style={styles.entryDesc}>{exp.description}</Text> : null}
                  </View>
                ) : null
              ))}
            </View>
          )}

          {hasEntries(data.education) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.education}</Text>
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
                    {edu.gpa ? <Text style={styles.entryDesc}>{labels.gpa}: {edu.gpa}</Text> : null}
                  </View>
                ) : null
              ))}
            </View>
          )}

          {data.skills?.some((skill) => skill.items?.trim()) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.skills}</Text>
              {data.skills.map((skill) => (
                skill.items ? (
                  <View key={skill.id} style={styles.skillRow}>
                  <Text style={styles.skillCategory}>{skill.category}:</Text>
                  <View style={{ flex: 1 }}><Text style={styles.skillItems}>{skill.items}</Text>{skill.evidence ? <Text style={styles.skillEvidence}>{skill.evidence}</Text> : null}</View>
                  </View>
                ) : null
              ))}
            </View>
          )}

          {hasEntries(data.projects) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.projects}</Text>
              {data.projects.map((proj) => (
              hasEntryContent(proj) ? (
                <View key={proj.id} style={styles.entry} wrap={false}>
                  {proj.name ? <Text style={styles.entryTitle}>{proj.name}</Text> : null}
                    {proj.description ? <Text style={styles.entryDesc}>{proj.description}</Text> : null}
                  {proj.technologies ? (
                      <Text style={{ ...styles.entryDesc, color: '#777', fontSize: 8 }}>
                        {labels.technologies}: {proj.technologies}
                      </Text>
                  ) : null}
                  {proj.url ? <Text style={{ ...styles.entryDesc, color: '#777', fontSize: 8 }}>{labels.link}: {proj.url}</Text> : null}
                  </View>
                ) : null
              ))}
            </View>
          )}

          {hasEntries(data.certifications) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.certifications}</Text>
              {data.certifications.map((cert) => (
              hasEntryContent(cert) ? (
                <View key={cert.id} style={styles.entry} wrap={false}>
                    <View style={styles.entryRow}>
                      <Text style={styles.entryTitle}>{cert.name}</Text>
                      <Text style={styles.entryDate}>{cert.date}</Text>
                    </View>
                  {cert.issuer ? <Text style={styles.entrySubtitle}>{cert.issuer}</Text> : null}
                  {cert.url ? <Text style={{ ...styles.entryDesc, color: '#777', fontSize: 8 }}>{labels.link}: {cert.url}</Text> : null}
                  </View>
                ) : null
              ))}
            </View>
          )}

          {data.languages?.some((lang) => lang.language?.trim()) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.languages}</Text>
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
          <CustomSectionsPDF sections={data.customSections} styles={styles} />
        </View>
      </Page>
    </Document>
  );
}
