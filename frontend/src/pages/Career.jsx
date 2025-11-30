
import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  Avatar,
  Paper,
  Link,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PublicIcon from "@mui/icons-material/Public";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ScienceIcon from "@mui/icons-material/Science";
import GppGoodIcon from "@mui/icons-material/GppGood";

const theme = createTheme({
  palette: {
    primary: { main: "#85C1E9" },
    secondary: { main: "#F5B7B1" },
    background: { default: "#FAF9F6", paper: "#FFFFFF" },
    text: { primary: "#111111", secondary: "#555555" },
  },
  typography: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
  },
});

const HR_EMAIL = "manish.kalpiwar@macliensonhealthcare.com"; 

const sampleRoles = [
  {
    title: "Research Scientist (example profile)",
    type: "Full-time",
    location: "India",
    experience: "3+ years",
    icon: <ScienceIcon />,
    summary:
      "Work on formulation, method development and translational research with strong GxP awareness.",
  },
  {
    title: "Regulatory Affairs Specialist (example profile)",
    type: "Full-time",
    location: "India",
    experience: "5+ years",
    icon: <GppGoodIcon />,
    summary:
      "Prepare regulatory submissions, ensure compliance with CDSCO and international standards.",
  },
  {
    title: "Medical Sales Representative (example profile)",
    type: "Field role",
    location: "Multiple locations",
    experience: "1+ years",
    icon: <PeopleIcon />,
    summary:
      "Engage with medical professionals, support product adoption and post-market feedback.",
  },
  {
    title: "Quality Control Analyst (example profile)",
    type: "Full-time",
    location: "India",
    experience: "2+ years",
    icon: <MedicalServicesIcon />,
    summary:
      "Execute routine QC testing, maintain SOPs and ensure laboratory compliance to standards.",
  },
];

const benefits = [
  {
    icon: <MedicalServicesIcon />,
    title: "Healthcare Coverage",
    description: "Comprehensive medical insurance for employees and dependents.",
  },
  {
    icon: <SchoolIcon />,
    title: "Learning & Development",
    description: "Annual learning stipend for courses, certifications and conferences.",
  },
  {
    icon: <ScheduleIcon />,
    title: "Flexible Work Options",
    description: "Hybrid or flexible schedules for eligible roles, balancing productivity and wellbeing.",
  },
  {
    icon: <FavoriteIcon />,
    title: "Wellness Programs",
    description: "Mental health support, wellness initiatives and periodic health camps.",
  },
];

const testimonials = [
  {
    quote:
      "Working here gave me exposure to regulated pharma development and the mentorship I needed to grow.",
    author: "Priya K., Senior Researcher",
    initials: "PK",
  },
  {
    quote:
      "A collaborative environment where scientific rigor meets real-world impact.",
    author: "Rahul M., Formulation Scientist",
    initials: "RM",
  },
];

export default function Career() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            <WorkIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Careers at Maclienson Healthcare
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Build a purpose-driven career in an ethics-first pharmaceutical organization.
          </Typography>
        </Box>

        {/* Why Join */}
        <Paper sx={{ p: 5, mb: 6, borderRadius: 2 }}>
          <Box display="flex" gap={2} alignItems="center" mb={3}>
            <PeopleIcon sx={{ fontSize: 36 }} />
            <Typography variant="h5" fontWeight={600}>
              Why Join Our Team
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Typography  color="text.primary">
                Maclienson Healthcare focuses on quality, compliance and patient-centred innovation.
                We value integrity, continuous learning and measurable impact.
              </Typography>

              <Box component="ul" sx={{ pl: 2, color: "text.primary" }}>
                <li>Work that directly supports patient outcomes.</li>
                <li>Transparent, ethics-driven processes and governance.</li>
                <li>Opportunities for professional development and cross-functional growth.</li>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Roles (informational only) */}
        <Box mb={6}>
          <Box display="flex" gap={2} alignItems="center" mb={2}>
            <PublicIcon sx={{ fontSize: 36 }} />
            <Typography variant="h5" fontWeight={600}>
              Roles We Commonly Hire For (informational)
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {sampleRoles.map((r, idx) => (
              <Grid key={idx} xs={12} md={6}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <Avatar sx={{ bgcolor: "primary.light" }}>{r.icon}</Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {r.title}
                        </Typography>
                        <Box display="flex" gap={1} flexWrap="wrap" mt={0.5}>
                          <Chip size="small" icon={<WorkIcon />} label={r.type} />
                          <Chip size="small" icon={<LocationOnIcon />} label={r.location} />
                          <Chip size="small" label={`Experience: ${r.experience}`} />
                        </Box>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {r.summary}
                    </Typography>

                    <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                      <strong>Note:</strong> These are example/prototype role profiles intended to
                      illustrate the types of expertise we commonly look for. They are not live job
                      postings and do not guarantee immediate openings.
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.primary">
                        Interested candidates should email their CV, cover note and qualifications to:
                      </Typography>

                      <Button
                        variant="outlined"
                        size="small"
                        href={`mailto:${HR_EMAIL}`}
                        sx={{ mt: 1 }}
                        aria-label="Email HR to apply"
                      >
                        Email: {HR_EMAIL}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Benefits */}
        <Box mb={6}>
          <Box display="flex" gap={2} alignItems="center" mb={2}>
            <MedicalServicesIcon sx={{ fontSize: 36 }} />
            <Typography variant="h5" fontWeight={600}>
              Employee Benefits (Representative)
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {benefits.map((b, i) => (
              <Grid key={i} xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
                  <Avatar sx={{ mx: "auto", mb: 1 }}>{b.icon}</Avatar>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {b.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {b.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials */}
        <Box mb={6}>
          <Box display="flex" gap={2} alignItems="center" mb={2}>
            <RecordVoiceOverIcon sx={{ fontSize: 36 }} />
            <Typography variant="h5" fontWeight={600}>
              Team Voices
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {testimonials.map((t, i) => (
              <Grid key={i} xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Box display="flex" gap={2} alignItems="center" mb={1}>
                    <Avatar sx={{ bgcolor: "secondary.light" }}>{t.initials}</Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {t.author}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontStyle="italic">
                    “{t.quote}”
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA / Application instructions */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h6" fontWeight={600}>
            Interested in joining Maclienson Healthcare?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            To be considered, please email your CV and a brief note with:
            <Box component="span" display="block">
              • Full name • Highest qualification • Relevant experience • Preferred location
            </Box>
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            href={`mailto:${HR_EMAIL}`}
            aria-label="Email HR"
          >
            Apply via Email: {HR_EMAIL}
          </Button>

          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
            We review all submissions in accordance with our hiring policy. Submissions to the above
            address do not create an employment contract. We will contact shortlisted candidates.
          </Typography>
        </Box>

        {/* Recruitment & Compliance */}
        <Box mb={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Recruitment & Compliance
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Maclienson Healthcare follows standard background verification and qualification checks
              for shortlisted candidates. We do not charge any fee for recruitment. For any concerns
              please write to{" "}
              <Link href={`mailto:${HR_EMAIL}`} underline="hover">
                {HR_EMAIL}
              </Link>
              .
            </Typography>
          </Paper>
        </Box>

        {/* Footer */}
        <Box textAlign="center" color="text.secondary" sx={{ fontSize: 13 }}>
          Maclienson Healthcare Pvt. Ltd. © All rights reserved · Information on this page is
          representative and subject to change.
        </Box>
      </Container>
    </ThemeProvider>
  );
}
