import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SectionHeading from "../components/SectionHeading";
import Sponsors from "../components/Sponsors";
import { useLocation } from "react-router-dom";
import rules from "../data-static/rules";

export default function RulePage() {
  const theme = useTheme();

  const location = useLocation();
  const isRules = location.pathname.startsWith("/rules");

  return (
    <>
      <Container sx={{ py: 12, position: "relative" }}>
        <SectionHeading>Rules</SectionHeading>

        {rules.map((rule, i) => (
          <Box
            key={rule.id || i}
            sx={{
              p: 3,
              my: 2,
              borderRadius: 2,

              background: theme.palette.background.paper,

              border: `1px solid ${theme.palette.primary.main}`,

              boxShadow: `0 0 15px ${theme.palette.primary.main}33`,

              display: "flex",
              alignItems: "center",
              gap: 2,

              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: `0 0 30px ${theme.palette.primary.main}66`,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                color: theme.palette.primary.main,
              }}
            >
              ⚡
            </Typography>

            <Typography
              sx={{
                color: theme.palette.text.primary,
                fontSize: "1rem",
              }}
            >
              {rule.text}
            </Typography>
          </Box>
        ))}
      </Container>

      {isRules && <Sponsors />}
    </>
  );
}
