// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: { main: "#00ffa3" },
//     secondary: { main: "#ff0080" },
//     background: {
//       default: "#0a0a0a",
//       paper: "rgba(255,255,255,0.05)",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//   },
//   components: {
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           background: "rgba(255,255,255,0.05)",
//           backdropFilter: "blur(20px)",
//           borderRadius: "16px",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         containedSecondary: {
//           boxShadow: "0 0 20px #ff0080",
//         },
//         containedPrimary: {
//           boxShadow: (theme) => `0 0 20px ${theme.palette.primary.main}`,
//         },
//       },
//     },
//   },
// });

// export const darkNeon = createTheme({
//   palette: {
//     mode: "dark",
//     primary: { main: "#00ffa3" },
//     secondary: { main: "#ff0080" },
//     background: {
//       default: "#0a0a0a",
//       paper: "rgba(255,255,255,0.05)",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//   },
// });

// export const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: { main: "#0077ff" },
//     secondary: { main: "#ff6b00" },
//     background: {
//       default: "#f5f7fb",
//       paper: "#ffffff",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//   },
// });

// export const studentTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: { main: "#7c4dff" },
//     secondary: { main: "#ffea00" },
//     background: {
//       default: "#0f0f1a",
//       paper: "rgba(124,77,255,0.08)",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//   },
// });

// export default theme;


import { createTheme } from "@mui/material/styles";

const baseComponents = {
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        backdropFilter: "blur(20px)",
        borderRadius: "16px",

        background: theme.palette.background.paper,

        border: `1px solid ${theme.palette.divider}`,

        boxShadow: `0 0 20px ${theme.palette.primary.main}33`,

        transition: "all 0.3s ease",

        "&:hover": {
          boxShadow: `0 0 35px ${theme.palette.primary.main}66`,
          transform: "translateY(-4px)",
        },
      }),
    },
  },

  MuiButton: {
    styleOverrides: {
      containedPrimary: ({ theme }) => ({
        boxShadow: `0 0 20px ${theme.palette.primary.main}`,
      }),

      containedSecondary: ({ theme }) => ({
        boxShadow: `0 0 20px ${theme.palette.secondary.main}`,
      }),
    },
  },
};

export const darkNeon = createTheme({
  name:"neon",
  palette: {
    mode: "dark",
    primary: { main: "#00ffa3" },
    secondary: { main: "#ff0080" },
    text: {main: "#313131"},
    background: {
      default: "#0a0a0a",
      paper: "rgba(255,255,255,0.05)",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: baseComponents,
});

export const lightTheme = createTheme({
  name:"light",
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#1565c0" },
    text: {main: "#313131"},
    background: {
      default: "#f4f7ff",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: baseComponents,
});

export const studentTheme = createTheme({
  name: "student",
  palette: {
    mode: "dark",
    primary: { main: "#7c4dff" },
    secondary: { main: "#ffea00" },
    text: {main: "#fff"},
    background: {
      default: "#0f0f1a",
      paper: "rgba(124,77,255,0.08)",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: baseComponents,
});

// export const studentTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: { main: "#7c4dff" },
//     secondary: { main: "#ffea00" },
//     background: {
//       default: "#0f0f1a",
//       paper: "rgba(124,77,255,0.08)",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//   },
//   components: baseComponents,
// });


// export const studentTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: { main: "#ff4db8" },
//     secondary: { main: "#ffea00" },
//     background: {
//       default: "#0de33f",
//       paper: "rgba(124,77,255,0.08)",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//   },
//   components: baseComponents,
// });

export const liquidGlassTheme = createTheme({
  name: "ocean",
  palette: {
    mode: "dark",

    primary: { main: "#4facfe" },
    secondary: { main: "#00f2fe" },

    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)",
    },

    background: {
      default: "#050814",
      paper: "rgba(255,255,255,0.06)",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(circle at 20% 30%, #1b2a4a, #050814 70%)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          borderRadius: "18px",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.15)",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(25px)",
          borderLeft: "1px solid rgba(255,255,255,0.15)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.25)",
        },
      },
    },
  },
});