import { Container, Typography, TextField, Button, Box } from "@mui/material";

export default function ContactUsPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 10 }}>
      {/* Page Title */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 4,
          color: "#00ffa3",
        }}
      >
        Contact Us
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{ textAlign: "center", color: "gray", mb: 5 }}
      >
        Have questions about the hackathon? Reach out to us and our team will
        get back to you soon.
      </Typography>

      {/* Contact Form */}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField label="Your Name" variant="outlined" fullWidth />

        <TextField label="Email Address" variant="outlined" fullWidth />

        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />

        <Button
          variant="contained"
          sx={{
            background: "#ff0080",
            fontWeight: "bold",
            padding: "10px",
          }}
        >
          Send Message
        </Button>
      </Box>

      {/* Contact Details */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Organizer Contact
        </Typography>

        <Typography color="gray">📧 hackathon@ncu.edu</Typography>

        <Typography color="gray">
          📍 The NorthCap University, Gurugram
        </Typography>
      </Box>
    </Container>
  );
}
