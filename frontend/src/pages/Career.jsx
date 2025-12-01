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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ScienceIcon from "@mui/icons-material/Science";
import GppGoodIcon from "@mui/icons-material/GppGood";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CallIcon from "@mui/icons-material/Call";

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
const HR_PHONE = "8770751559";

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
    description: "Hybrid or flexible schedules for eligible roles.",
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
      "Working here gave me exposure to regulated pharma development and mentorship I needed to grow.",
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
            Career at Maclienson Healthcare
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Build a purpose-driven career in an ethics-first pharmaceutical organization.
          </Typography>
        </Box>

        {/* 🔵 LIVE HIRING SECTION (Client Provided) */}
        <Paper
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 2,
            borderLeft: "6px solid #85C1E9",
            background: "#F0F8FF",
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={2} sx={{ color: "#2C3E50" }}>
            📢 We Are Hiring – Gynaecology Division
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Maclienson Healthcare Pvt. Ltd. is inviting experienced and dynamic professionals to join
            our expanding <strong>Gynaecology Division</strong> in Indore, Madhya Pradesh.
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Job 1 */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight={700}>
              1. Medical Representative (MR)
            </Typography>

            <Box sx={{ pl: 1.5, mt: 1 }}>
              <Typography>📍 <strong>Location:</strong> Indore, Madhya Pradesh</Typography>
              <Typography>🎓 <strong>Qualification:</strong> Science Graduate (B.Sc., B.Pharm, etc.)</Typography>
              <Typography>🧪 <strong>Experience:</strong> Minimum 1 year in the same segment</Typography>
            </Box>
          </Box>

          {/* Job 2 */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight={700}>
              2. Area Sales Manager (ASM)
            </Typography>

            <Box sx={{ pl: 1.5, mt: 1 }}>
              <Typography>📍 <strong>Location:</strong> Indore, Madhya Pradesh</Typography>
              <Typography>🌸 <strong>Segment Focus:</strong> Gynaecology</Typography>
              <Typography>
                🧪 <strong>Experience Required:</strong>
                <br /> • Minimum 3 years as Medical Representative (M.R.)
                <br /> • OR Minimum 1 year as Area Manager
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ mt: 1 }}>
            💰 <strong>Compensation / Salary:</strong> Negotiable & competitive as per profile.
          </Typography>

          <Box mt={3}>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              href={`mailto:${HR_EMAIL}`}
            >
              Apply via Email
            </Button>

            <Button
              variant="outlined"
              startIcon={<CallIcon />}
              href={`tel:${HR_PHONE}`}
            >
              Call / WhatsApp: {HR_PHONE}
            </Button>
          </Box>
        </Paper>

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
              <Typography color="text.primary">
                Maclienson Healthcare focuses on quality, compliance and patient-centred innovation.
                We value integrity, continuous learning and measurable impact.
              </Typography>

              <Box component="ul" sx={{ pl: 2, color: "text.primary" }}>
                <li>Work that directly supports patient outcomes.</li>
                <li>Transparent, ethics-driven processes and governance.</li>
                <li>Opportunities for professional and cross-functional growth.</li>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Sample Roles */}
        <Box mb={6}>
          <Box display="flex" gap={2} alignItems="center" mb={2}>
            <PublicIcon sx={{ fontSize: 36 }} />
            <Typography variant="h5" fontWeight={600}>
              Roles We Commonly Hire For (Example Profiles)
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
                      <strong>Note:</strong> These are sample role profiles and not active openings.
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.primary">
                        Send your CV or introduction email:
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        href={`mailto:${HR_EMAIL}`}
                        sx={{ mt: 1 }}
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

        {/* CTA */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h6" fontWeight={600}>
            Interested in joining Maclienson Healthcare?
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Email your CV with your:
            <br />• Full Name • Highest Qualification • Relevant Experience • Preferred Location
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            href={`mailto:${HR_EMAIL}`}
          >
            Apply via Email: {HR_EMAIL}
          </Button>

          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
            We will contact shortlisted candidates.
          </Typography>
        </Box>

        {/* Recruitment & Compliance */}
        <Box mb={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Recruitment & Compliance
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Maclienson Healthcare follows standard background verification and qualification checks.
              We do not charge any recruitment fee. For concerns, contact{" "}
              <Link href={`mailto:${HR_EMAIL}`} underline="hover">
                {HR_EMAIL}
              </Link>.
            </Typography>
          </Paper>
        </Box>

        <Box textAlign="center" color="text.secondary" sx={{ fontSize: 13 }}>
          Maclienson Healthcare Pvt. Ltd. © All rights reserved.
        </Box>
      </Container>
    </ThemeProvider>
  );
}
