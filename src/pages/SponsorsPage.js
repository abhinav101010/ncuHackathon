import { Container, Typography, Box, Grid, Button } from "@mui/material";

export default function SponsorsPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
      {/* Page Title */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 6,
          color: "#00ffa3",
        }}
      >
        Sponsors & Partners
      </Typography>

      {/* Sponsors Section */}
      <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
        Our Sponsors
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={6} md={3}>
          <Box sx={{ textAlign: "center", p: 3, border: "1px solid #333" }}>
            <Typography>Gold Sponsor</Typography>
          </Box>
        </Grid>

        <Grid item xs={6} md={3}>
          <Box sx={{ textAlign: "center", p: 3, border: "1px solid #333" }}>
            <Typography>Silver Sponsor</Typography>
          </Box>
        </Grid>

        <Grid item xs={6} md={3}>
          <Box sx={{ textAlign: "center", p: 3, border: "1px solid #333" }}>
            <Typography>Community Partner</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Become a Sponsor */}
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Become a Sponsor
        </Typography>

        <Typography color="gray" sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
          Support the next generation of innovators by sponsoring the NCU
          Hackathon. Gain brand visibility, access talented developers, and
          showcase your technology to hundreds of participants.
        </Typography>

        <Button
          variant="contained"
          sx={{
            background: "#ff0080",
            fontWeight: "bold",
            px: 4,
          }}
        >
          Contact for Sponsorship
        </Button>
      </Box>
    </Container>
  );
}
