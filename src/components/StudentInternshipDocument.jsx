import { Children } from 'react';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import '../utils/pdfFonts';

const styles = StyleSheet.create({
  page: { paddingTop: 25, paddingBottom: 28, paddingHorizontal: 38, fontFamily: 'Sarabun', fontSize: 9.5, lineHeight: 1.35, color: '#111' },
  header: { height: 88, flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  headerSpacer: { width: 68, height: 86 },
  title: { flex: 1, fontSize: 15, fontWeight: 700, textAlign: 'center' },
  photo: { width: 68, height: 86, objectFit: 'cover' },
  photoPlaceholder: { width: 68, height: 86, borderWidth: 0.6, borderColor: '#777', justifyContent: 'center', alignItems: 'center' },
  photoPlaceholderText: { fontSize: 8, textAlign: 'center' },
  section: { marginTop: 18, marginBottom: 3 },
  heading: { fontSize: 10.5, fontWeight: 700, marginBottom: 5 },
  numberedRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  number: { width: 17, flexShrink: 0 },
  rowContent: { flex: 1, flexDirection: 'row', alignItems: 'flex-start', gap: 9, minWidth: 0 },
  inlineField: { flexGrow: 1, flexBasis: 0, minWidth: 0 },
  longField: { flexGrow: 2, flexBasis: 0, minWidth: 0 },
  fullField: { flexGrow: 1, flexBasis: '100%', minWidth: 0 },
  blockField: { flexGrow: 0, flexBasis: 'auto', minWidth: 0, marginBottom: 4 },
  label: { fontWeight: 700 },
  detail: { marginLeft: 17, marginTop: 2, marginBottom: 4 },
  referenceRow: { flexDirection: 'row', gap: 18 },
  referenceCol: { flex: 1 },
  referenceTitle: { fontWeight: 700, marginBottom: 2 },
});

const line = (number, children, detail = null) => (
  <View key={number}>
    <View key="numbered-row" style={styles.numberedRow}>
      <Text key="number" style={styles.number}>{number}.</Text>
      <View key="content" style={styles.rowContent}>{Children.toArray(children)}</View>
    </View>
    {detail ? <Text key="detail" style={styles.detail}>{detail}</Text> : null}
  </View>
);
const field = (label, value, style = styles.inlineField) => value ? (
  <View style={[styles.inlineField, style]}><Text>{label ? <><Text key="label" style={styles.label}>{label} </Text>{value}</> : value}</Text></View>
) : null;
const section = (title, children) => <View key={title} style={styles.section}><Text key="heading" style={styles.heading}>{title}</Text>{Children.toArray(children)}</View>;
const hasReference = (person) => [person.name, person.relationship, person.phone, person.address].some(Boolean);

export default function StudentInternshipDocument({ data }) {
  const p = data.personal || {};
  const e = data.education || {};
  const references = data.references || [];
  const advisor = references.find((item) => item.id === 'advisor') || references[0] || {};
  const guardian = references.find((item) => item.id === 'guardian') || references[1] || {};
  const personalRows = [
    [field('ชื่อ–นามสกุล', p.fullName), field('รหัสนักศึกษา', p.studentId)],
    [field('อายุ', p.age), field('ชื่อเล่น', p.nickname), field('สัญชาติ', p.nationality), field('ศาสนา', p.religion)],
    [field('ภูมิลำเนา', p.permanentAddress, styles.fullField)],
    [field('ที่อยู่ปัจจุบัน', p.currentAddress, styles.fullField)],
    [field('โทรศัพท์', p.phone), field('Line ID', p.lineId)],
    [field('อีเมล', p.email, styles.fullField)],
    [field('งานอดิเรก/ความสนใจ', p.hobbies, styles.fullField)],
  ].filter((fields) => fields.some(Boolean));
  const educationRows = [
    [field('มัธยมศึกษาตอนปลาย', e.highSchool, styles.longField), field('ปีที่จบ', e.highSchoolYear)],
    [field('อำเภอ', e.highSchoolDistrict), field('จังหวัด', e.highSchoolProvince), field('แผนการเรียน', e.highSchoolPlan)],
    [field('กำลังศึกษาชั้นปีที่', e.yearLevel), field('มหาวิทยาลัย', e.university)],
    [field('คณะ', e.faculty), field('สาขาวิชา', e.major), field('เกรดเฉลี่ย', e.gpa)],
  ].filter((fields) => fields.some(Boolean));
  const activities = (data.activities || []).filter((item) => item.title || item.details).slice(0, 3);
  const skills = (data.skills || []).filter((item) => item.name).slice(0, 3);
  const refs = [advisor, guardian].filter(hasReference);

  return (
    <Document title={`ประวัติย่อ - ${p.fullName || 'นักศึกษาฝึกงาน'}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          <View key="document-header" style={styles.header}>
            <View key="header-spacer" style={styles.headerSpacer} />
            <Text key="document-title" style={styles.title}>ประวัติส่วนตัว</Text>
            {p.photoUrl ? <Image key="photo" src={p.photoUrl} style={styles.photo} /> : <View key="photo-placeholder" style={styles.photoPlaceholder}><Text style={styles.photoPlaceholderText}>รูปถ่าย</Text></View>}
          </View>

          {section('ข้อมูลส่วนตัว', personalRows.map((fields, index) => line(index + 1, fields)))}

          {section('ประวัติการศึกษา', educationRows.map((fields, index) => line(index + 1, fields)))}

          {activities.length > 0 && section('ประวัติการฝึกอบรมหรือการเข้าร่วมกิจกรรม', activities.map((item, index) =>
            line(index + 1, field('', `${item.title}${item.year ? ` (${item.year})` : ''}`, styles.fullField), item.details)
          ))}

          {skills.length > 0 && section('ทักษะและความสามารถพิเศษอื่น ๆ', skills.map((item, index) =>
            line(index + 1, field('', item.name, styles.fullField), item.evidence)
          ))}

          {refs.length > 0 && section('บุคคลอ้างอิง', <View style={styles.referenceRow}>
            {refs.map((person, index) => (
              <View key={person.id || index} style={styles.referenceCol}>
                {Children.toArray([
                  <Text style={styles.referenceTitle}>{index + 1}. {person.id === 'advisor' ? 'อาจารย์ที่ปรึกษา' : 'ผู้ปกครอง'}</Text>,
                  field('ชื่อ', person.name, styles.blockField),
                  field('ความสัมพันธ์', person.relationship, styles.blockField),
                  field('สาขาวิชา', person.id === 'advisor' ? e.major : '', styles.blockField),
                  field('โทรศัพท์', person.phone, styles.blockField),
                  field('ที่อยู่', person.address, styles.blockField),
                ])}
              </View>
            ))}
          </View>)}
        </View>
      </Page>
    </Document>
  );
}
