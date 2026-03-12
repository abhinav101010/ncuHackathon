import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

import SectionHeading from "../components/SectionHeading";
import ThemeCard from "../components/ThemeCard";
import Sponsors from "../components/Sponsors";

import { API } from "../utils/common";

export default function ThemePage() {
  const muiTheme = useTheme();
  const location = useLocation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [themes, setThemes] = useState([]);

  const isThemesPage = location.pathname.startsWith("/themes");

  /* LOAD THEMES */

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const res = await fetch(`${API}/api/themes`);
        const data = await res.json();
        setThemes(data);
      } catch (err) {
        console.error("Failed to load themes", err);
      }
    };

    loadThemes();
  }, []);

  const handleOpen = (themeItem) => {
    setSelectedTheme(themeItem);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedTheme(null);
  };

  return (
    <>
      {/* THEMES SECTION */}

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <SectionHeading>Themes</SectionHeading>

        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {themes.map((themeItem, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={themeItem._id || index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ThemeCard theme={themeItem} onClick={handleOpen} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* THEME DETAILS DIALOG */}

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: muiTheme.palette.background.paper,
            border: `1px solid ${muiTheme.palette.primary.main}`,
            borderRadius: 3,
            boxShadow: `0 0 25px ${muiTheme.palette.primary.main}40`,
            mx: { xs: 2, sm: 0 }, // prevents mobile edge overflow
          },
        }}
      >
        {selectedTheme && (
          <>
            <DialogTitle
              sx={{
                borderBottom: `1px solid ${muiTheme.palette.divider}`,
                fontWeight: 700,
                color: muiTheme.palette.primary.main,
                fontSize: { xs: "1.2rem", md: "1.4rem" },
              }}
            >
              {selectedTheme.title}
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
              <Box
                component="img"
                src={`${API}${selectedTheme.img}`}
                alt={selectedTheme.title}
                sx={{
                  width: "100%",
                  height: { xs: 180, sm: 220 },
                  borderRadius: 2,
                  mb: 2,
                  objectFit: "cover",
                }}
              />

              <Typography
                sx={{
                  color: muiTheme.palette.text.primary,
                  lineHeight: 1.7,
                  fontSize: { xs: "0.9rem", md: "0.95rem" },
                }}
              >
                {selectedTheme.desc}
              </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{
                  px: 3,
                  fontWeight: "bold",
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* SPONSORS SECTION */}

      {isThemesPage && <Sponsors />}
    </>
  );
}