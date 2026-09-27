import { Text, View } from '@react-pdf/renderer';

export default function CustomSectionsPDF({ sections, styles }) {
  if (!Array.isArray(sections)) return null;

  return sections.map((section) => {
    const title = section.title?.trim();
    const content = section.content?.trim();
    if (!title && !content) return null;

    return (
      <View key={section.id}>
        {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
        {content ? <Text style={styles.entryDesc}>{content}</Text> : null}
      </View>
    );
  });
}
