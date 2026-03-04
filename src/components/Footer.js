import { Box, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 10,
        py: 6,
        px: 4,
        textAlign: "center",

        background:
          theme.palette.mode === "light"
            ? "linear-gradient(90deg,#ffffff,#f5f7fb,#ffffff)"
            : "linear-gradient(90deg,#0a0a0a,#111,#0a0a0a)",

        borderTop: `1px solid ${theme.palette.divider}`,

        boxShadow: `0 -5px 20px ${theme.palette.primary.main}20`,
      }}
    >
      {/* Hackathon Info */}
      <Box mb={4}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: theme.palette.primary.main,
          }}
        >
          NCU Hackathon 2026
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          Build. Innovate. Transform the future. Join developers, designers, and
          innovators for a 48-hour journey of creativity and technology.
        </Typography>
      </Box>

      {/* Quick Links */}
      <Box mb={4}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Quick Links
        </Typography>

        <Typography>
          <Link
            component={RouterLink}
            to="/"
            underline="hover"
            sx={{ color: theme.palette.primary.main }}
          >
            Home
          </Link>
        </Typography>

        <Typography>
          <Link
            component={RouterLink}
            to="/faq"
            underline="hover"
            sx={{ color: theme.palette.primary.main }}
          >
            FAQ
          </Link>
        </Typography>

        <Typography>
          <Link
            component={RouterLink}
            to="/about"
            underline="hover"
            sx={{ color: theme.palette.primary.main }}
          >
            About Us
          </Link>
        </Typography>

        <Typography>
          <Link
            component={RouterLink}
            to="/contact"
            underline="hover"
            sx={{ color: theme.palette.primary.main }}
          >
            Contact
          </Link>
        </Typography>
      </Box>

      {/* Contact */}
      <Box mb={4}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Contact
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          The NorthCap University
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          Gurugram, Haryana
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          hackathon@ncu.edu
        </Typography>
      </Box>

      {/* Copyright */}
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        © 2026 NCU Hackathon. All rights reserved.
      </Typography>
    </Box>
  );
}
