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
  createTheme,
  ThemeProvider
} from '@mui/material';
import { 
  Public as GlobalIcon,
  EmojiEvents as MissionIcon,
  Science as InnovationIcon,
  MedicalServices as QualityIcon,
  PriceChange as AffordabilityIcon,
  GppGood as IntegrityIcon,
  Favorite as CompassionIcon,
  Groups as TeamIcon,
  Timeline as GrowthIcon,
  LocalHospital as HealthcareIcon,
  School as EducationIcon,
  FavoriteBorder as CareIcon,
  Verified as CertifiedIcon
} from '@mui/icons-material';

// Pastel color theme
const pastelTheme = createTheme({
  palette: {
    primary: {
      main: '#A8D8EA', // Pastel blue
      light: '#D3E5EF',
      dark: '#89C4E1',
      contrastText: '#3A4A7D',
    },
    secondary: {
      main: '#F8B195', // Pastel peach
      light: '#FCD0BD',
      dark: '#F5926B',
      contrastText: '#5E2F4A',
    },
    background: {
      default: '#FAF9F6', // Cream white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#6E7F80', // Soft slate
      secondary: '#A5BECC', // Pastel blue-gray
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
  },
});

const AboutUs = () => {
  const theme = useTheme();

  const coreValues = [
    {
      icon: <InnovationIcon fontSize="large" />,
      title: "Innovation",
      content: "Pioneering breakthrough medical solutions that address critical healthcare challenges."
    },
    {
      icon: <QualityIcon fontSize="large" />,
      title: "Quality",
      content: "Unwavering commitment to the highest standards of product development and manufacturing."
    },
    {
      icon: <AffordabilityIcon fontSize="large" />,
      title: "Affordability",
      content: "Developing cost-effective solutions without compromising efficacy or safety."
    },
    {
      icon: <IntegrityIcon fontSize="large" />,
      title: "Integrity",
      content: "Maintaining ethical standards prioritizing patient safety and transparency."
    },
    {
      icon: <CompassionIcon fontSize="large" />,
      title: "Compassion",
      content: "Driven by commitment to improving quality of life for patients worldwide."
    }
  ];

  const achievements = [
    { icon: <CertifiedIcon />, value: "50+", label: "Patents Filed" },
    { icon: <GlobalIcon />, value: "12", label: "Countries Served" },
    { icon: <CareIcon />, value: "2M+", label: "Patients Benefited" },
    { icon: <EducationIcon />, value: "100+", label: "Clinical Trials" }
  ];

  return (
    <ThemeProvider theme={pastelTheme}>
      <Container maxWidth="lg" sx={{ 
        py: 8, 
        backgroundColor: theme.palette.background.default,
        backgroundImage: 'linear-gradient(to bottom, #FAF9F6, #E6F0F5)'
      }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={8} sx={{ position: 'relative' }}>
          <Box sx={{
            position: 'absolute',
            top: -50,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 100,
            height: 100,
            backgroundColor: theme.palette.primary.light,
            borderRadius: '50%',
            opacity: 0.3,
            zIndex: 0
          }} />
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              position: 'relative',
              zIndex: 1,
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
            <GlobalIcon fontSize="inherit" sx={{ 
              color: theme.palette.primary.dark,
              verticalAlign: 'middle',
              mr: 2 
            }} />
            Maclienson Healthcare
          </Typography>
          <Typography variant="h5" sx={{ 
            color: theme.palette.text.secondary,
            fontStyle: 'italic',
            mt: 2
          }}>
            Where Compassion Meets Innovation
          </Typography>
        </Box>

        {/* Mission & Vision */}
        <Grid container spacing={4} mb={8}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 4, 
              height: '100%', 
              borderRadius: 4,
              backgroundColor: 'rgba(248, 177, 149, 0.1)', // Pastel peach tint
              borderLeft: `4px solid ${theme.palette.secondary.main}`
            }}>
              <Box display="flex" alignItems="center" mb={3}>
                <MissionIcon sx={{ 
                  fontSize: 40, 
                  mr: 2,
                  color: theme.palette.secondary.dark 
                }} />
                <Typography variant="h4" component="h2" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}>
                  Our Vision
                </Typography>
              </Box>
              <Typography variant="body1" paragraph sx={{ 
                fontSize: '1.1rem',
                color: theme.palette.text.primary
              }}>
                To be a global leader in transforming healthcare by delivering innovative, high-quality, 
                and accessible pharmaceutical solutions that improve human life and well-being.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 4, 
              height: '100%', 
              borderRadius: 4,
              backgroundColor: 'rgba(168, 216, 234, 0.1)', // Pastel blue tint
              borderLeft: `4px solid ${theme.palette.primary.main}`
            }}>
              <Box display="flex" alignItems="center" mb={3}>
                <MissionIcon sx={{ 
                  fontSize: 40, 
                  mr: 2,
                  color: theme.palette.primary.dark 
                }} />
                <Typography variant="h4" component="h2" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}>
                  Our Mission
                </Typography>
              </Box>
              <Box component="ul" sx={{ 
                pl: 0, 
                listStyle: 'none',
                '& li': {
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: 2,
                  '&:before': {
                    content: '"•"',
                    color: theme.palette.primary.main,
                    fontSize: '1.5rem',
                    mr: 1.5
                  }
                }
              }}>
                {[
                  "Provide cutting-edge medical innovations",
                  "Ensure uncompromising quality and safety",
                  "Make healthcare affordable and accessible",
                  "Push boundaries of medical research"
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
          </Grid>
        </Grid>

        {/* Core Values */}
        <Box mb={8}>
          <Typography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              mb: 6,
              color: theme.palette.text.primary,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 2
              }
            }}
          >
            Our Core Values
          </Typography>
          
          <Grid container spacing={4}>
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.light, 
                      color: theme.palette.primary.dark,
                      width: 70, 
                      height: 70,
                      mb: 3,
                      '& .MuiSvgIcon-root': { fontSize: '2rem' }
                    }}
                  >
                    {value.icon}
                  </Avatar>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    {value.content}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Company Story */}
        <Paper elevation={0} sx={{ 
          p: 6, 
          mb: 8, 
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backgroundImage: 'linear-gradient(to right, rgba(248, 177, 149, 0.1), rgba(168, 216, 234, 0.1))',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`
          }
        }}>
          <Box display="flex" alignItems="center" mb={4}>
            <TeamIcon sx={{ 
              fontSize: 40, 
              mr: 2,
              color: theme.palette.primary.dark 
            }} />
            <Typography variant="h4" component="h2" sx={{ 
              fontWeight: 600,
              color: theme.palette.text.primary
            }}>
              Our Story
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph sx={{ 
                fontSize: '1.1rem',
                color: theme.palette.text.primary
              }}>
                Founded in 2010, Maclienson Healthcare began with a simple mission: to make innovative 
                medicines accessible to underserved populations. What started as a small research facility 
                in Mumbai has grown into a global pharmaceutical leader.
              </Typography>
              <Typography variant="body1" paragraph sx={{ 
                fontSize: '1.1rem',
                color: theme.palette.text.primary
              }}>
                Our first breakthrough came in 2014 with the development of a novel diabetes medication 
                that reduced costs by 60% while maintaining efficacy. This set the standard for our 
                patient-first approach to drug development.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph sx={{ 
                fontSize: '1.1rem',
                color: theme.palette.text.primary
              }}>
                Today, we operate in 12 countries with over 2,000 employees dedicated to our vision. 
                Our state-of-the-art manufacturing facilities meet WHO-GMP standards, and our R&D 
                centers collaborate with leading universities worldwide.
              </Typography>
              <Typography variant="body1" paragraph sx={{ 
                fontSize: '1.1rem',
                color: theme.palette.text.primary
              }}>
                Recognized as "Most Innovative Pharma Company" by the Global Health Awards three years 
                running, we continue to push boundaries while keeping our founding principles at heart.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Achievements */}
        <Box sx={{ 
          p: 6, 
          borderRadius: 4,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)',
            zIndex: 0
          }
        }}>
          <Box position="relative" zIndex={1}>
            <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
              <GrowthIcon sx={{ 
                fontSize: 40, 
                mr: 2,
                color: 'white' 
              }} />
              <Typography variant="h4" component="h2" sx={{ 
                fontWeight: 600, 
                color: 'white'
              }}>
                Our Impact
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {achievements.map((item, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    width: 60,
                    height: 60,
                    mb: 2,
                    mx: 'auto'
                  }}>
                    {item.icon}
                  </Avatar>
                  <Typography variant="h2" sx={{ 
                    color: 'white', 
                    fontWeight: 700,
                    mb: 1
                  }}>
                    {item.value}
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 500
                  }}>
                    {item.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AboutUs;