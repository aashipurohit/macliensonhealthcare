import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  TextField,
  Button,
  Divider,
  Avatar,
  useTheme,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { 
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  Schedule as HoursIcon,
  Chat as SupportIcon
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

const ContactUs = () => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will respond shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

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
            Contact Us
          </Typography>
          <Typography variant="h5" sx={{ 
            color: theme.palette.text.secondary,
            fontStyle: 'italic',
            mt: 2
          }}>
            We'd love to hear from you
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ 
              p: 6, 
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #f0f0f0'
            }}>
              <Typography variant="h4" component="h2" sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 4
              }}>
                Send Us a Message
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: theme.palette.primary.light,
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: theme.palette.primary.light,
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      variant="outlined"
                      multiline
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: theme.palette.primary.light,
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<SendIcon />}
                      sx={{
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.dark
                        }
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ 
              p: 6, 
              height: '100%',
              borderRadius: 4,
              backgroundColor: 'rgba(248, 177, 149, 0.1)',
              borderLeft: `4px solid ${theme.palette.secondary.main}`
            }}>
              <Typography variant="h4" component="h2" sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 4
              }}>
                Contact Information
              </Typography>

              <Box mb={5}>
                <Box display="flex" alignItems="center" mb={3}>
                  <LocationIcon sx={{ 
                    fontSize: 30, 
                    mr: 2,
                    color: theme.palette.text.primary 
                  }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.text.primary
                  }}>
                    Our Headquarters
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ 
                  color: theme.palette.text.primary,
                  pl: 6
                }}>
                  Maclienson Healthcare Pvt Ltd<br />
                  123 Pharma Park, Sector 22<br />
                 Indore,Madhy Pradesh 452012<br />
                  India
                </Typography>
              </Box>

              <Box mb={5}>
                <Box display="flex" alignItems="center" mb={3}>
                  <PhoneIcon sx={{ 
                    fontSize: 30, 
                    mr: 2,
                    color: theme.palette.text.primary 
                  }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.text.primary
                  }}>
                    Phone & Email
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ 
                  color: theme.palette.text.primary,
                  pl: 6
                }}>
                  <Box component="span" display="block">+91 22 1234 5678</Box>
                  <Box component="span" display="block">info@maclienson.com</Box>
                  <Box component="span" display="block">support@maclienson.com</Box>
                </Typography>
              </Box>

              <Box mb={5}>
                <Box display="flex" alignItems="center" mb={3}>
                  <HoursIcon sx={{ 
                    fontSize: 30, 
                    mr: 2,
                    color: theme.palette.text.primary 
                  }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.text.primary
                  }}>
                    Business Hours
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ 
                  color: theme.palette.text.primary,
                  pl: 6
                }}>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </Typography>
              </Box>

              <Box>
                <Box display="flex" alignItems="center" mb={3}>
                  <SupportIcon sx={{ 
                    fontSize: 30, 
                    mr: 2,
                    color: theme.palette.text.primary 
                  }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    color: theme.palette.text.primary
                  }}>
                    Customer Support
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ 
                  color: theme.palette.text.primary,
                  pl: 6
                }}>
                  Our support team is available 24/7 for emergencies.<br />
                  Emergency line: +91 98 7654 3210
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Map Section */}
        <Box mt={8} mb={4}>
          <Typography variant="h4" component="h2" sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 4,
            textAlign: 'center'
          }}>
            Find Us on Map
          </Typography>
          <Paper elevation={0} sx={{ 
            p: 2, 
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #f0f0f0',
            height: 400
          }}>
            {/* Replace with your actual map embed */}
            <Box sx={{
              width: '100%',
              height: '100%',
              backgroundColor: theme.palette.primary.light,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              color: theme.palette.text.primary
            }}>
              <Typography variant="h6">Map Embed Will Appear Here</Typography>
            </Box>
          </Paper>
        </Box>

        {/* CTA */}
        <Box textAlign="center" mt={8}>
          <Typography variant="h5" gutterBottom sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary
          }}>
            Prefer to speak directly?
          </Typography>
          <Typography variant="body1" paragraph sx={{ 
            color: theme.palette.text.secondary,
            mb: 4,
            fontSize: '1.1rem'
          }}>
            Call our customer care team at +91 22 1234 5678
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
            href="tel:+912212345678"
          >
            <PhoneIcon sx={{ mr: 1 }} /> Call Now
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
            href="mailto:info@maclienson.com"
          >
            <EmailIcon sx={{ mr: 1 }} /> Email Us
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ContactUs;