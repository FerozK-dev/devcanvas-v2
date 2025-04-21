// ResumeDocument.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  section: { marginBottom: 10 },
  heading: { fontSize: 14, marginBottom: 5, fontWeight: 'bold' },
  subheading: { fontSize: 12, marginBottom: 5, fontWeight: 'bold' },
  listItem: { marginBottom: 3 },
  bold: { fontWeight: 'bold' },
});

const ResumeDocument = ({ name, email, userData, data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Personal Info */}
      <View style={styles.section}>
        <Text style={styles.bold}>{`${userData?.firstName} ${userData?.lastName}`}</Text>
        <Text>{userData?.email}</Text>
        <Text styles={styles.subheading}>{userData?.title}</Text>
        <Text styles={styles.bold}>{userData?.headline}</Text>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.heading}>Summary</Text>
        <Text>{data?.summary}</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        {data?.education.map((edu, i) => (
          <Text key={i} style={styles.listItem}>
            {edu.degree} at {edu.school} ({edu.year})
          </Text>
        ))}
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.heading}>Experience</Text>
        {data?.experience.map((exp, i) => (
          <View key={i} style={{ marginBottom: 5 }}>
            <Text style={styles.bold}>{exp.title} at {exp.company}</Text>
            <Text>{exp.duration}</Text>
            <View>
              {exp.responsibilities.map((res, idx) => (
                <Text key={idx} style={styles.listItem}>• {res}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.heading}>Projects</Text>
        {data?.projects.map((proj, i) => (
          <View key={i} style={{ marginBottom: 5 }}>
            <Text style={styles.bold}>{proj.title}</Text>
            <Text>{proj.description || ""}</Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          <Text>{data.skills.join(', ')}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export default ResumeDocument;
