import React from 'react';
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
  useTheme,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { 
  Work as WorkIcon, 
  School as EducationIcon, 
  LocationOn as LocationIcon,
  People as CultureIcon,
  MedicalServices as BenefitsIcon,
  RecordVoiceOver as TestimonialIcon,
  Public as GlobalIcon,
  TrendingUp as GrowthIcon,
  Favorite as HeartIcon,
  Schedule as TimeIcon,
  Science as ScienceIcon,
  GppGood as IntegrityIcon
} from '@mui/icons-material';

// Updated pastel theme with black text
const pastelTheme = createTheme({
  palette: {
    primary: {
      main: '#A8D8EA', // Pastel blue (for backgrounds)
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
    text: {
      primary: '#000000', // Black
      secondary: '#555555', // Dark gray
    },
    background: {
      default: '#FAF9F6', // Cream white
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
  },
});

const Career = () => {
  const theme = useTheme();

  // Sample job data
  const jobOpenings = [
    {
      title: "Research Scientist",
      type: "Full-time",
      location: "Mumbai, India",
      department: "R&D",
      experience: "3+ years",
      icon: <ScienceIcon />
    },
    {
      title: "Regulatory Affairs Specialist",
      type: "Full-time",
      location: "Delhi, India",
      department: "Compliance",
      experience: "5+ years",
      icon: <IntegrityIcon />
    },
    {
      title: "Medical Sales Representative",
      type: "Field",
      location: "Multiple Locations",
      department: "Sales",
      experience: "1+ years",
      icon: <CultureIcon />
    },
    {
      title: "Quality Control Analyst",
      type: "Full-time",
      location: "Bangalore, India",
      department: "Manufacturing",
      experience: "2+ years",
      icon: <BenefitsIcon />
    }
  ];

  const benefits = [
    { icon: <BenefitsIcon />, title: "Healthcare Coverage", description: "Comprehensive medical insurance for you and family" },
    { icon: <EducationIcon />, title: "Learning Stipends", description: "Annual budget for certifications and courses" },
    { icon: <TimeIcon />, title: "Flexible Work", description: "Hybrid/remote options for eligible roles" },
    { icon: <HeartIcon />, title: "Wellness Programs", description: "Mental health support and fitness benefits" }
  ];

  const testimonials = [
    { 
      quote: "The mentorship I've received here accelerated my career beyond expectations.", 
      author: "Priya K., Senior Researcher (5 years)",
      avatar: <Avatar sx={{ bgcolor: theme.palette.secondary.light }}>PK</Avatar>
    },
    { 
      quote: "Working on life-saving medications gives deep purpose to my work every day.", 
      author: "Rahul M., Formulation Scientist",
      avatar: <Avatar sx={{ bgcolor: theme.palette.primary.light }}>RM</Avatar>
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
              color: theme.palette.text.primary, // Black
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
            <WorkIcon fontSize="inherit" sx={{ 
              color: theme.palette.text.primary, // Black
              verticalAlign: 'middle',
              mr: 2 
            }} />
            Careers at Maclienson
          </Typography>
          <Typography variant="h5" sx={{ 
            color: theme.palette.text.secondary, // Dark gray
            fontStyle: 'italic',
            mt: 2
          }}>
            Grow your career while making a difference in global healthcare
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ 
              mt: 4,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText, // Black
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark
              }
            }}
            href="#openings"
          >
            View Open Positions
          </Button>
        </Box>

        {/* Why Join Us */}
        <Paper elevation={0} sx={{ 
          p: 6, 
          mb: 8, 
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #f0f0f0'
        }}>
          <Box display="flex" alignItems="center" mb={4}>
            <CultureIcon sx={{ 
              fontSize: 40, 
              mr: 2,
              color: theme.palette.text.primary // Black
            }} />
            <Typography variant="h4" component="h2" sx={{ 
              fontWeight: 600,
              color: theme.palette.text.primary // Black
            }}>
              Why Join Our Team?
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph sx={{ 
                fontSize: '1.1rem',
                color: theme.palette.text.primary // Black
              }}>
                At Maclienson Healthcare, we believe our people are our greatest asset. We foster an environment where:
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
                  "Your work directly impacts patient lives worldwide",
                  "Continuous learning is encouraged and supported",
                  "Collaboration trumps hierarchy",
                  "Diversity of thought is celebrated"
                ].map((item, index) => (
                  <Box component="li" key={index}>
                    <Typography variant="body1" sx={{ 
                      fontSize: '1.1rem',
                      color: theme.palette.text.primary // Black
                    }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                height: '100%',
                backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 3,
                minHeight: 250
              }} />
            </Grid>
          </Grid>
        </Paper>

        {/* Job Openings */}
        <Box id="openings" mb={8}>
          <Box display="flex" alignItems="center" mb={4}>
            <GlobalIcon sx={{ 
              fontSize: 40, 
              mr: 2,
              color: theme.palette.text.primary // Black
            }} />
            <Typography variant="h4" component="h2" sx={{ 
              fontWeight: 600,
              color: theme.palette.text.primary // Black
            }}>
              Current Opportunities
            </Typography>
          </Box>
          <Divider sx={{ 
            mb: 4,
            borderColor: theme.palette.primary.light
          }} />
          <Grid container spacing={4}>
            {jobOpenings.map((job, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined" sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  borderColor: '#e0e0e0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 15px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Avatar sx={{ 
                        bgcolor: theme.palette.primary.light, 
                        color: theme.palette.text.primary, // Black
                        mr: 2,
                        width: 50,
                        height: 50
                      }}>
                        {job.icon}
                      </Avatar>
                      <Typography variant="h5" component="h3" sx={{ 
                        fontWeight: 600,
                        color: theme.palette.text.primary // Black
                      }}>
                        {job.title}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 1, 
                      mb: 3
                    }}>
                      <Chip icon={<WorkIcon />} label={job.type} size="small" />
                      <Chip icon={<LocationIcon />} label={job.location} size="small" />
                      <Chip label={`Exp: ${job.experience}`} size="small" />
                    </Box>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ 
                        mt: 2,
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText, // Black
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.dark
                        }
                      }}
                      href="/apply"
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Benefits */}
        <Box mb={8}>
          <Box display="flex" alignItems="center" mb={4}>
            <BenefitsIcon sx={{ 
              fontSize: 40, 
              mr: 2,
              color: theme.palette.text.primary // Black
            }} />
            <Typography variant="h4" component="h2" sx={{ 
              fontWeight: 600,
              color: theme.palette.text.primary // Black
            }}>
              Employee Benefits
            </Typography>
          </Box>
          <Divider sx={{ 
            mb: 4,
            borderColor: theme.palette.primary.light
          }} />
          <Grid container spacing={4}>
            {benefits.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper elevation={0} sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 3,
                  backgroundColor: '#ffffff',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#fafafa',
                    transform: 'scale(1.03)'
                  }
                }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.primary.light, 
                    color: theme.palette.text.primary, // Black
                    width: 60, 
                    height: 60,
                    mb: 2
                  }}>
                    {item.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.text.primary, // Black
                    mb: 1
                  }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.text.secondary // Dark gray
                  }}>
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials */}
        <Box mb={8}>
          <Box display="flex" alignItems="center" mb={4}>
            <TestimonialIcon sx={{ 
              fontSize: 40, 
              mr: 2,
              color: theme.palette.text.primary // Black
            }} />
            <Typography variant="h4" component="h2" sx={{ 
              fontWeight: 600,
              color: theme.palette.text.primary // Black
            }}>
              Team Voices
            </Typography>
          </Box>
          <Divider sx={{ 
            mb: 4,
            borderColor: theme.palette.primary.light
          }} />
          <Grid container spacing={4}>
            {testimonials.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={0} sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 3,
                  backgroundColor: '#ffffff',
                  borderLeft: `4px solid ${theme.palette.secondary.main}`
                }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    {item.avatar}
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600,
                      ml: 2,
                      color: theme.palette.text.primary // Black
                    }}>
                      {item.author}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ 
                    fontStyle: 'italic',
                    color: theme.palette.text.primary, // Black
                    position: 'relative',
                    pl: 3,
                    '&:before': {
                      content: '"“"',
                      position: 'absolute',
                      left: 0,
                      top: -10,
                      fontSize: '3rem',
                      color: theme.palette.primary.light,
                      lineHeight: 1
                    }
                  }}>
                    {item.quote}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Growth Section */}
        <Paper elevation={0} sx={{ 
          p: 6, 
          mb: 8, 
          borderRadius: 4,
          backgroundColor: 'rgba(168, 216, 234, 0.2)',
          textAlign: 'center'
        }}>
          <GrowthIcon sx={{ 
            fontSize: 60, 
            color: theme.palette.text.primary, // Black
            mb: 2
          }} />
          <Typography variant="h4" component="h2" sx={{ 
            fontWeight: 700,
            color: theme.palette.text.primary, // Black
            mb: 2
          }}>
            Grow With Us
          </Typography>
          <Typography variant="body1" paragraph sx={{ 
            maxWidth: 700,
            margin: '0 auto',
            color: theme.palette.text.primary, // Black
            fontSize: '1.1rem'
          }}>
            We invest in your professional development through mentorship programs, 
            leadership training, and opportunities to work on cutting-edge healthcare solutions.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ 
              mt: 3,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText, // Black
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark
              }
            }}
            href="/career-path"
          >
            Explore Career Paths
          </Button>
        </Paper>

        {/* CTA */}
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary // Black
          }}>
            Ready to make an impact in healthcare?
          </Typography>
          <Typography variant="body1" paragraph sx={{ 
            color: theme.palette.text.secondary, // Dark gray
            mb: 4,
            fontSize: '1.1rem'
          }}>
            We're always looking for passionate individuals to join our mission.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ 
              mr: 2,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText, // Black
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark
              }
            }}
            href="#openings"
          >
            View Openings
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            sx={{ 
              borderColor: theme.palette.text.primary, // Black
              color: theme.palette.text.primary, // Black
              '&:hover': {
                borderColor: theme.palette.text.primary // Black
              }
            }}
            href="/talent-network"
          >
            Join Talent Network
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Career;