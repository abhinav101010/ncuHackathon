import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

export default function SponsorsPage() {
  const theme = useTheme();

  const sponsors = [
    { title: "Gold Sponsor" },
    { title: "Silver Sponsor" },
    { title: "Community Partner" },
    { title: "Tech Partner" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
      
      {/* Page Title */}

      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 8,
          color: theme.palette.primary.main,
        }}
      >
        Sponsors & Partners
      </Typography>

      {/* Sponsors Section */}

      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mb: 4,
          color: theme.palette.text.primary,
        }}
      >
        Our Sponsors
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {sponsors.map((sponsor, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                textAlign: "center",
                p: 4,
                borderRadius: 2,

                background: theme.palette.background.paper,

                border: `1px solid ${theme.palette.primary.main}40`,

                transition: "0.3s",

                "&:hover": {
                  border: `1px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              {/* Logo Placeholder */}

              <Box
                sx={{
                  height: 80,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  background: theme.palette.mode === "light"
                    ? "#f5f5f5"
                    : "rgba(255,255,255,0.05)",
                }}
              >
                <Typography variant="body2" color="gray">
                  Logo
                </Typography>
              </Box>

              <Typography fontWeight="bold">
                {sponsor.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Become a Sponsor Section */}

      <Box
        sx={{
          mt: 12,
          textAlign: "center",
          maxWidth: 800,
          mx: "auto",
          p: 6,
          borderRadius: 3,

          background: theme.palette.background.paper,

          border: `1px solid ${theme.palette.primary.main}40`,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            color: theme.palette.primary.main,
            fontWeight: "bold",
          }}
        >
          Become a Sponsor
        </Typography>

        <Typography
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
            lineHeight: 1.7,
          }}
        >
          Support the next generation of innovators by sponsoring the NCU
          Hackathon. Gain brand visibility, connect with talented developers,
          and showcase your technology to hundreds of participants.
        </Typography>

        <Button
          variant="contained"
          component={Link} to="/contact"
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: "bold",
            letterSpacing: "0.5px",
          }}
        >
          Contact for Sponsorship
        </Button>
      </Box>
    </Container>
  );
}