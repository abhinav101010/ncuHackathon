import { Container, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/sponsors")
      .then((res) => res.json())
      .then((data) => {
        setSponsors(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );

  const sponsorsLoop = [...sponsors, ...sponsors];

  return (
    <Container sx={{ py: 12 }}>
      <Box
        sx={{
          // overflow: "hidden",
          width: "100%",
          mt: 6,
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          style={{
            display: "flex",
            gap: "40px",
            width: "max-content",
          }}
        >
          {sponsorsLoop.map((sponsor, i) => (
            <Box
              key={i}
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
                src={sponsor.img}
                alt={sponsor.name}
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