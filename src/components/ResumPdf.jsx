import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register Lato font for clean ATS-compatible rendering
Font.register({
  family: 'Lato',
  fonts: [
     {
      src: 'https://fonts.gstatic.com/s/lato/v17/S6uyw4BMUTPHjx4wWw.ttf', // Regular
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/lato/v17/S6u8w4BMUTPHjxsAXC-v.ttf', // Italic
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
});

// PDF styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Lato',
    padding: 40,
    fontSize: 10,
    color: '#000',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    borderBottom: '1 solid #ccc',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    marginTop: 4,
  },
  contact: {
    fontSize: 9,
    marginTop: 6,
    color: '#555',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
    borderBottom: '1 solid #3498db',
    paddingBottom: 4,
  },
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entryTitle: {
    fontWeight: 'bold',
  },
  entrySub: {
    fontStyle: 'italic',
  },
  projectDesc: {
    marginTop: 2,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  skillItem: {
    backgroundColor: '#ecf0f1',
    padding: 4,
    margin: 2,
    borderRadius: 4,
  },
});

const ResumePDF = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal.name}</Text>
          <Text style={styles.title}>{data.personal.title}</Text>
          <Text style={styles.contact}>
            {data.personal.email}
            {data.personal.phone && ` | ${data.personal.phone}`}
            {data.personal.linkedin && ` | ${data.personal.linkedin}`}
          </Text>
        </View>

        {/* Summary */}
        {data.personal.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text>{data.personal.summary}</Text>
          </View>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, idx) => (
              <View key={idx} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{edu.school}</Text>
                  <Text>{edu.years}</Text>
                </View>
                <Text style={styles.entrySub}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, idx) => (
              <View key={idx} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{exp.position} at {exp.company}</Text>
                  <Text>{exp.duration}</Text>
                </View>
                <Text>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skills}>
              {data.skills.split(',').map((skill, idx) => (
                <View key={idx} style={styles.skillItem}>
                  <Text>{skill.trim()}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj, idx) => (
              <View key={idx} style={styles.entry}>
                <Text style={styles.entryTitle}>{proj.name}</Text>
                <Text style={styles.projectDesc}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;