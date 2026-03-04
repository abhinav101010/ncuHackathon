import { Container, Box } from "@mui/material";
import { motion } from "framer-motion";
import sponsors from "../data-static/sponsors";

export default function Sponsors() {
  const sponsorsLoop = [...sponsors, ...sponsors];

  return (
    <Container sx={{ py: 12 }}>
      <Box
        sx={{
          width: "100%",
          mt: 6,
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
          style={{
            display: "flex",
            gap: "40px",
            width: "max-content",
          }}
        >
          {sponsorsLoop.map((sponsor) => (
            <Box
              key={sponsor.name}
              sx={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(0,255,163,0.2)",
                borderRadius: "12px",
                padding: "16px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "140px",
                transition: "0.3s",
                backdropFilter: "blur(6px)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 0 20px rgba(0,255,163,0.4)",
                },
              }}
            >
              <Box
                component="img"
                src={sponsor?.img}
                alt={sponsor?.name}
                sx={{
                  height: 55,
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </motion.div>
      </Box>
    </Container>
  );
}
