import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function ThemeCard({ theme, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04 }}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Card
        onClick={() => onClick?.(theme)}
        sx={{
          width: 300,
          cursor: "pointer",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: "16px",
          transition: "all 0.35s ease",
          overflow: "hidden",

          "&:hover": {
            boxShadow: "0 0 30px rgba(0,255,163,0.6)",
            transform: "translateY(-6px)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={theme?.img}
          alt={theme?.title}
          sx={{
            height: 200,
            objectFit: "cover",
          }}
        />

        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {theme?.title}
          </Typography>

          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            {theme?.desc
              ? `${theme.desc.substring(0, 70)}...`
              : "No description available"}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
