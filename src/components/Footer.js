import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 10,
        py: 6,
        px: 4,
        textAlign: "center",
        background: "linear-gradient(90deg,#0a0a0a,#111,#0a0a0a)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Hackathon Info */}
      <Box mb={4}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          NCU Hackathon 2026
        </Typography>

        <Typography variant="body2" sx={{ color: "gray" }}>
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
            sx={{ color: "#00ffa3" }}
          >
            Home
          </Link>
        </Typography>

        <Typography>
          <Link
            component={RouterLink}
            to="/faq"
            underline="hover"
            sx={{ color: "#00ffa3" }}
          >
            FAQ
          </Link>
        </Typography>

        <Typography>
          <Link
            component={RouterLink}
            to="/about"
            underline="hover"
            sx={{ color: "#00ffa3" }}
          >
            About Us
          </Link>
        </Typography>

        <Typography>
          <Link
            component={RouterLink}
            to="/contact"
            underline="hover"
            sx={{ color: "#00ffa3" }}
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

        <Typography variant="body2" sx={{ color: "gray" }}>
          The NorthCap University
        </Typography>

        <Typography variant="body2" sx={{ color: "gray" }}>
          Gurugram, Haryana
        </Typography>

        <Typography variant="body2" sx={{ color: "gray" }}>
          hackathon@ncu.edu
        </Typography>
      </Box>

      {/* Copyright */}
      <Typography variant="caption" sx={{ color: "gray" }}>
        © 2026 NCU Hackathon. All rights reserved.
      </Typography>
    </Box>
  );
}
