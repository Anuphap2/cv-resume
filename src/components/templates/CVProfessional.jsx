import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { formatDateRange } from '../../utils/formatDates';
import CustomSectionsPDF from './CustomSectionsPDF';
import { getDocumentLabels } from '../../utils/documentLabels';
import { getPdfFonts } from '../../utils/pdfFonts';

const createStyles = (accentColor, fonts) =>
  StyleSheet.create({
    page: {
      fontFamily: fonts.regular,
      fontSize: 9.5,
      color: '#1a1a1a',
      lineHeight: 1.5,
    },
    headerBg: {
      paddingTop: 28,
      paddingBottom: 18,
      paddingLeft: 40,
      paddingRight: 40,
      borderBottomWidth: 3,
      borderBottomColor: accentColor,
      marginBottom: 14,
    },
    name: {
      fontSize: 22,
      fontFamily: fonts.bold,
      color: accentColor,
      letterSpacing: -0.5,
      lineHeight: 1.08,
      marginBottom: 6,
    },
    title: {
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
      marginRight: 10,
    },
    body: {
      paddingTop: 0,
      paddingBottom: 36,
      paddingLeft: 40,
      paddingRight: 40,
    },
    sectionTitle: {
      fontSize: 10,
      fontFamily: fonts.bold,
      color: accentColor,
      textTransform: 'uppercase',
      letterSpacing: fonts.isThai ? 0 : 1,
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
      fontFamily: fonts.bold,
    },
    entrySubtitle: {
      fontSize: 9,
      color: '#555',
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
    pubText: {
      fontSize: 8.5,
      color: '#444',
      lineHeight: 1.5,
      marginBottom: 4,
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
      marginBottom: 6,
    },
  });

export default function CVProfessionalPDF({ data, accentColor, contentLanguage = 'en' }) {
  const labels = getDocumentLabels(contentLanguage);
  const fonts = getPdfFonts(contentLanguage);
  const styles = createStyles(accentColor.value, fonts);
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.linkedin, pi.website, pi.orcid ? `ORCID: ${pi.orcid}` : ''].filter(Boolean);

  const hasEntries = (arr) => arr && arr.some((e) =>
    Object.values(e).some((v) => typeof v === 'string' && v.trim() !== '' && v !== e.id)
  );
  const hasEntryContent = (entry) => Object.values(entry).some((v) => typeof v === 'string' && v.trim() !== '' && v !== entry.id);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBg}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ flex: 1, paddingTop: 2 }}>
              <Text style={styles.name}>{pi.fullName || labels.yourName}</Text>
              {pi.title ? <Text style={styles.title}>{pi.title}</Text> : null}
              {contacts.length > 0 && <View style={styles.contactRow}>{contacts.map((c, i) => <Text key={i} style={styles.contactItem}>{c}</Text>)}</View>}
            </View>
            {pi.photoUrl ? <Image src={pi.photoUrl} style={{ width: 52, height: 66, objectFit: 'cover', borderRadius: 8, marginLeft: 12 }} /> : null}
          </View>
        </View>

        <View style={styles.body}>
          {data.profile ? (
            <View>
              <Text style={styles.sectionTitle}>{labels.professionalProfile}</Text>
              <Text style={styles.entryDesc}>{data.profile}</Text>
            </View>
          ) : null}

          {hasEntries(data.education) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.education}</Text>
              {data.education.map((edu) => (
                hasEntryContent(edu) ? (
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
                    {edu.thesis ? <Text style={styles.entryDesc}>{labels.thesis}: {edu.thesis}</Text> : null}
                    {edu.advisor ? (
                      <Text style={{ ...styles.entryDesc, fontSize: 8, color: '#777' }}>
                        {labels.advisor}: {edu.advisor}
                      </Text>
                    ) : null}
                  </View>
                ) : null
              ))}
            </View>
          )}

          {hasEntries(data.experience) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.professionalExperience}</Text>
              {data.experience.map((exp) => (
              hasEntryContent(exp) ? (
                  <View key={exp.id} style={styles.entry} wrap={false}>
                    <View style={styles.entryRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.entryTitle}>{exp.position}</Text>
                        <Text style={styles.entrySubtitle}>{exp.organization}</Text>
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

          {hasEntries(data.publications) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.publications}</Text>
              {data.publications.map((pub, i) => (
              hasEntryContent(pub) ? (
                  <View key={pub.id}>
                    <Text style={styles.pubText}>
                      [{i + 1}] {pub.authors ? `${pub.authors}. ` : ''}&quot;{pub.title}.&quot;
                      {pub.journal ? ` ${pub.journal}` : ''}
                      {pub.year ? ` (${pub.year})` : ''}
                      {pub.doi ? ` DOI: ${pub.doi}` : ''}
                    </Text>
                  </View>
                ) : null
              ))}
            </View>
          )}

          {hasEntries(data.research) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.researchProjects}</Text>
              {data.research.map((res) => (
              hasEntryContent(res) ? (
                  <View key={res.id} style={styles.entry} wrap={false}>
                    <View style={styles.entryRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.entryTitle}>{res.title}</Text>
                        <Text style={styles.entrySubtitle}>
                          {res.role}{res.role && res.institution ? ', ' : ''}{res.institution}
                        </Text>
                      </View>
                      <Text style={styles.entryDate}>
                        {res.startDate}{res.startDate && res.endDate ? ' — ' : ''}{res.endDate}
                      </Text>
                    </View>
                    {res.description ? <Text style={styles.entryDesc}>{res.description}</Text> : null}
                  </View>
                ) : null
              ))}
            </View>
          )}

          {hasEntries(data.teaching) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.teachingExperience}</Text>
              {data.teaching.map((t) => (
              hasEntryContent(t) ? (
                  <View key={t.id} style={styles.entry} wrap={false}>
                    <View style={styles.entryRow}>
                      <View>
                        <Text style={styles.entryTitle}>{t.course}</Text>
                        <Text style={styles.entrySubtitle}>
                          {t.role}{t.role && t.institution ? ', ' : ''}{t.institution}
                        </Text>
                      </View>
                      <Text style={styles.entryDate}>{t.period}</Text>
                    </View>
                  </View>
                ) : null
              ))}
            </View>
          )}

          {hasEntries(data.certifications) && (
            <View>
              <Text style={styles.sectionTitle}>{labels.certificationsAwards}</Text>
              {data.certifications.map((cert) => (
              hasEntryContent(cert) ? (
                  <View key={cert.id} style={styles.entry} wrap={false}>
                    <View style={styles.entryRow}>
                      <Text style={styles.entryTitle}>{cert.name}</Text>
                      <Text style={styles.entryDate}>{cert.date}</Text>
                    </View>
                  {cert.issuer ? <Text style={styles.entrySubtitle}>{cert.issuer}</Text> : null}
                  {cert.url ? <Text style={{ ...styles.entryDesc, fontSize: 8, color: '#777' }}>{labels.link}: {cert.url}</Text> : null}
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
