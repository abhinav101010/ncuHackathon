import React from "react";
import { Container, Box } from "@mui/material";
import SectionHeading from "../components/SectionHeading";
import Sponsors from "../components/Sponsors";
import { useLocation } from "react-router-dom";
import rules from "../data-static/rules";

export default function RulePage() {
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
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,255,163,0.2)",
              backdropFilter: "blur(8px)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateX(10px)",
                boxShadow: "0 0 20px #00ffa3",
              },
            }}
          >
            ⚡ {rule.text}
          </Box>
        ))}
      </Container>

      {isRules && <Sponsors />}
    </>
  );
}
