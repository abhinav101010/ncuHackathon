import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function SectionHeading({ children }) {
  return (
    <Box textAlign="center" mb={6}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1.5,
            background: "linear-gradient(90deg,#00ffa3,#00c6ff,#ff0080)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            color: "transparent",
            animation: "gradientMove 5s linear infinite",
          }}
        >
          {children}
        </Typography>
      </motion.div>

      <style>
        {`
        @keyframes gradientMove {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        `}
      </style>
    </Box>
  );
}
