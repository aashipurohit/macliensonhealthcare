import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  Schedule as HoursIcon,
  Chat as SupportIcon,
  VerifiedUser as VerifiedIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";

// Corporate Pastel Theme (Trust-oriented palette)
const pastelTheme = createTheme({
  palette: {
    primary: {
      main: "#85C1E9",
      light: "#D6EAF8",
      contrastText: "#000",
    },
    secondary: {
      main: "#F5B7B1",
      light: "#FADBD8",
      contrastText: "#000",
    },
    background: {
      default: "#FAF9F6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
    h2: { fontWeight: 700 },
  },
});

const ContactUs = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us. Our team will respond shortly.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <ThemeProvider theme={pastelTheme}>
      <Container maxWidth="lg" sx={{ py: 10 }}>

        {/* Company Identity Banner */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 8,
            borderRadius: 3,
            border: "1px solid #e0e0e0",
            background: "#FFFFFFAA",
            textAlign: "center",
          }}
        >
          <BusinessIcon sx={{ fontSize: 40, mb: 1, color: "#5DADE2" }} />

          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Maclienson Healthcare Pvt. Ltd.
          </Typography>

          <Typography variant="body1" sx={{ color: "#666", mt: 1 }}>
            A Registered Pharmaceutical Entity · Committed to Quality & Ethics
          </Typography>
        </Paper>

        {/* Title Section */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h2" gutterBottom>
            Contact Us
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", maxWidth: 600, mx: "auto", mt: 2 }}
          >
            For verified communication and official queries, connect with our
            corporate desk. Every message is evaluated and responded to by
            authorized personnel only.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: 6,
                borderRadius: 4,
                border: "1px solid #e6e6e6",
                background: "#ffffff",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
                Send an Official Inquiry
              </Typography>

              <Typography
                variant="body2"
                sx={{ mb: 3, color: "#555", fontStyle: "italic" }}
              >
                All submissions are reviewed by our corporate compliance team.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      endIcon={<SendIcon />}
                      sx={{
                        backgroundColor: "#F5B7B1",
                        "&:hover": { backgroundColor: "#EC7063" },
                        fontWeight: 600,
                      }}
                    >
                      Submit Inquiry
                    </Button>
                  </Grid>
                </Grid>
              </form>

              {/* Legal Statement */}
              <Box mt={4} p={2} borderRadius={2} bgcolor="#F8F9F9">
                <Typography
                  variant="caption"
                  sx={{ color: "#666", display: "block", lineHeight: 1.6 }}
                >
                  <VerifiedIcon
                    sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }}
                  />
                  By contacting us, you acknowledge that the information shared
                  will be reviewed in accordance with our corporate policies and
                  applicable Indian regulations.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Details */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                borderRadius: 4,
                borderLeft: "4px solid #EC7063",
                background: "#FFF4F2",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
                Corporate Communication
              </Typography>

              {/* Address */}
              <Box mb={5}>
                <Box display="flex" alignItems="center" mb={2}>
                  <LocationIcon sx={{ fontSize: 30, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Registered Office
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ pl: 6, lineHeight: 1.8 }}>
                  Maclienson Healthcare Pvt. Ltd.<br />
                  123 Pharma Park, Sector 22<br />
                  Indore, Madhya Pradesh 452012<br />
                  India
                </Typography>
              </Box>

              {/* Email */}
              <Box mb={5}>
                <Box display="flex" alignItems="center" mb={2}>
                  <EmailIcon sx={{ fontSize: 30, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Official Email
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    pl: 6,
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    color: "#000",
                  }}
                >
                  manish.kalpiwar@macliensonhealthcare.com
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ pl: 6, color: "#666", mt: 1, display: "block" }}
                >
                  This is our verified corporate communication channel.
                </Typography>
              </Box>

              {/* Hours */}
              <Box mb={5}>
                <Box display="flex" alignItems="center" mb={2}>
                  <HoursIcon sx={{ fontSize: 30, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Business Hours
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ pl: 6, lineHeight: 1.8 }}>
                  Monday – Friday: 9:00 AM – 6:00 PM<br />
                  Saturday: 10:00 AM – 2:00 PM<br />
                  Sunday: Closed
                </Typography>
              </Box>

              {/* Support Note */}
              <Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <SupportIcon sx={{ fontSize: 30, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Response Protocol
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ pl: 6, color: "#444" }}>
                  Each query is assigned to an authorized support officer.  
                  Response time may vary depending on verification requirements.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Email Button */}
        <Box textAlign="center" mt={10}>
          <Button
            variant="outlined"
            size="large"
            href="mailto:manish.kalpiwar@macliensonhealthcare.com"
            sx={{
              borderColor: "#000",
              color: "#000",
              "&:hover": { borderColor: "#000", background: "#f6f6f6" },
            }}
          >
            <EmailIcon sx={{ mr: 1 }} /> Send Email
          </Button>
        </Box>

        {/* Footer Legal Note */}
        <Box mt={8} textAlign="center" sx={{ color: "#777", fontSize: "0.85rem" }}>
          Maclienson Healthcare Pvt. Ltd. © All Rights Reserved ·  
          Compliant with Indian Pharmaceutical Communication Standards
        </Box>

      </Container>
    </ThemeProvider>
  );
};

export default ContactUs;
