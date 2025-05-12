import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Avatar,
  Divider,
  useTheme,
  ThemeProvider,
  Button,
  createTheme
} from '@mui/material';
import { 
  Verified as CertifiedIcon,
  HealthAndSafety as SafetyIcon,
  GppGood as QualityIcon,
  Public as GlobalIcon,
  Science as ResearchIcon,
  LocalHospital as FdaIcon,
  Checklist as ComplianceIcon
} from '@mui/icons-material';

// Consistent pastel theme
const pastelTheme = createTheme({
  palette: {
    primary: {
      main: '#A8D8EA', // Pastel blue
      light: '#D3E5EF',
      dark: '#89C4E1',
      contrastText: '#000000', // Black text
    },
    secondary: {
      main: '#F8B195', // Pastel peach
      light: '#FCD0BD',
      dark: '#F5926B',
      contrastText: '#000000', // Black text
    },
    background: {
      default: '#FAF9F6', // Cream white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000', // Black
      secondary: '#555555', // Dark gray
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
  },
});

const Certifications = () => {
  const theme = useTheme();

  const certifications = [
    {
      title: "WHO-GMP Certified",
      description: "Our manufacturing facilities meet World Health Organization Good Manufacturing Practice standards",
      icon: <GlobalIcon fontSize="large" />,
      year: "2023",
      scope: "All manufacturing units"
    },
    {
      title: "ISO 13485:2016",
      description: "Quality management system certification for medical devices",
      icon: <QualityIcon fontSize="large" />,
      year: "2022",
      scope: "Medical devices division"
    },
    {
      title: "US FDA Approved",
      description: "Approval from the United States Food and Drug Administration",
      icon: <FdaIcon fontSize="large" />,
      year: "2021",
      scope: "5 flagship products"
    },
    {
      title: "CE Marking",
      description: "Certification for products meeting EU safety, health and environmental requirements",
      icon: <ComplianceIcon fontSize="large" />,
      year: "2022",
      scope: "European market products"
    },
    {
      title: "ISO 9001:2015",
      description: "International standard for quality management systems",
      icon: <CertifiedIcon fontSize="large" />,
      year: "2020",
      scope: "Company-wide"
    },
    {
      title: "Good Clinical Practice",
      description: "Certification for clinical trials conducted to international ethical and scientific standards",
      icon: <ResearchIcon fontSize="large" />,
      year: "2023",
      scope: "Clinical research division"
    }
  ];

  return (
    <ThemeProvider theme={pastelTheme}>
      <Container maxWidth="lg" sx={{ 
        py: 8, 
        backgroundColor: theme.palette.background.default
      }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              '&:after': {
                content: '""',
                display: 'block',
                width: 80,
                height: 4,
                backgroundColor: theme.palette.secondary.main,
                margin: '16px auto 0',
                borderRadius: 2
              }
            }}
          >
            <CertifiedIcon fontSize="inherit" sx={{ 
              color: theme.palette.text.primary,
              verticalAlign: 'middle',
              mr: 2 
            }} />
            Our Certifications
          </Typography>
          <Typography variant="h5" sx={{ 
            color: theme.palette.text.secondary,
            fontStyle: 'italic',
            mt: 2
          }}>
            Committed to the highest standards of quality and safety
          </Typography>
        </Box>

        {/* Certifications Grid */}
        <Grid container spacing={4} mb={8}>
          {certifications.map((cert, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={0} sx={{ 
                p: 4, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #f0f0f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  borderColor: theme.palette.primary.light
                }
              }}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.primary.light, 
                  color: theme.palette.text.primary,
                  width: 70, 
                  height: 70,
                  mb: 3,
                  alignSelf: 'center'
                }}>
                  {cert.icon}
                </Avatar>
                <Typography variant="h5" component="h3" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  textAlign: 'center',
                  mb: 2
                }}>
                  {cert.title}
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: theme.palette.text.primary,
                  mb: 3,
                  flexGrow: 1
                }}>
                  {cert.description}
                </Typography>
                <Divider sx={{ 
                  my: 2,
                  borderColor: theme.palette.primary.light
                }} />
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: theme.palette.text.secondary
                }}>
                  <Typography variant="body2">
                    <strong>Year:</strong> {cert.year}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Scope:</strong> {cert.scope}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Quality Commitment */}
        <Paper elevation={0} sx={{ 
          p: 6, 
          mb: 8, 
          borderRadius: 4,
          backgroundColor: 'rgba(248, 177, 149, 0.1)',
          borderLeft: `4px solid ${theme.palette.secondary.main}`
        }}>
          <Box display="flex" alignItems="center" mb={4}>
            <SafetyIcon sx={{ 
              fontSize: 40, 
              mr: 2,
              color: theme.palette.text.primary 
            }} />
            <Typography variant="h4" component="h2" sx={{ 
              fontWeight: 600,
              color: theme.palette.text.primary
            }}>
              Our Quality Commitment
            </Typography>
          </Box>
          <Typography variant="body1" paragraph sx={{ 
            color: theme.palette.text.primary,
            fontSize: '1.1rem'
          }}>
            At Maclienson Healthcare, quality isn't just a certification - it's our culture. We go beyond compliance to implement:
          </Typography>
          <Box component="ul" sx={{ 
            pl: 0, 
            listStyle: 'none',
            '& li': {
              display: 'flex',
              alignItems: 'flex-start',
              mb: 2,
              '&:before': {
                content: '"•"',
                color: theme.palette.secondary.main,
                fontSize: '1.5rem',
                mr: 1.5
              }
            }
          }}>
            {[
              "Stringent quality control at every production stage",
              "Continuous staff training programs",
              "Regular third-party audits beyond requirements",
              "Investment in cutting-edge testing equipment",
              "Transparent reporting of quality metrics"
            ].map((item, index) => (
              <Box component="li" key={index}>
                <Typography variant="body1" sx={{ 
                  fontSize: '1.1rem',
                  color: theme.palette.text.primary
                }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Certification Process */}
        <Box mb={8}>
          <Typography variant="h4" component="h2" sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 4,
            textAlign: 'center'
          }}>
            Our Certification Process
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                step: "1",
                title: "Gap Analysis",
                description: "Comprehensive review against certification requirements"
              },
              {
                step: "2",
                title: "System Implementation",
                description: "Developing processes to meet standards"
              },
              {
                step: "3",
                title: "Internal Audits",
                description: "Rigorous self-assessment before official review"
              },
              {
                step: "4",
                title: "Certification Audit",
                description: "Evaluation by accredited certification body"
              },
              {
                step: "5",
                title: "Continuous Monitoring",
                description: "Regular reviews to maintain compliance"
              },
              {
                step: "6",
                title: "Recertification",
                description: "Periodic renewal through comprehensive reassessment"
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={0} sx={{ 
                  p: 3, 
                  height: '100%',
                  borderRadius: 3,
                  backgroundColor: 'rgba(168, 216, 234, 0.1)',
                  textAlign: 'center'
                }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    color: theme.palette.primary.contrastText,
                    width: 50, 
                    height: 50,
                    mb: 2,
                    mx: 'auto',
                    fontWeight: 700
                  }}>
                    {item.step}
                  </Avatar>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 1
                  }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.text.secondary
                  }}>
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA */}
        <Box textAlign="center" mt={4}>
          <Typography variant="h5" gutterBottom sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary
          }}>
            Need certification documentation?
          </Typography>
          <Typography variant="body1" paragraph sx={{ 
            color: theme.palette.text.secondary,
            mb: 4,
            fontSize: '1.1rem'
          }}>
            Our quality assurance team can provide official copies of any certification.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ 
              mr: 2,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark
              }
            }}
            href="/contact"
          >
            Request Documents
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            sx={{ 
              borderColor: theme.palette.text.primary,
              color: theme.palette.text.primary,
              '&:hover': {
                borderColor: theme.palette.text.primary
              }
            }}
            href="/quality"
          >
            Learn About Our Standards
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Certifications;