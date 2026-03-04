import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar({ themeName, setThemeName }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "#00ffa3",
            letterSpacing: 1,
          }}
        >
          NCU Hackathon
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Theme Selector */}
        <Select
          size="small"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          sx={{
            mr: 3,
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
            "& .MuiSvgIcon-root": { color: "white" },
          }}
        >
          <MenuItem value="dark">Dark Neon</MenuItem>
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </Select>

        {/* Navigation Links */}
        <Button component={Link} to="/" sx={{ mx: 1, color: "white" }}>
          Home
        </Button>

        <Button component={Link} to="/faq" sx={{ mx: 1, color: "white" }}>
          FAQ
        </Button>

        <Button component={Link} to="/about" sx={{ mx: 1, color: "white" }}>
          About
        </Button>

        <Button component={Link} to="/contact" sx={{ mx: 1, color: "white" }}>
          Contact
        </Button>

        {/* Register Button */}
        <Button
          component={Link}
          to="/register"
          variant="contained"
          sx={{
            ml: 2,
            background: "#ff0080",
            fontWeight: "bold",
          }}
        >
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
}
