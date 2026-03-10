// import { Grid, Box, Paper, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import { useTheme } from "@mui/material/styles";
// import { API } from "../utils/common";

// export default function EventCard({ event, index }) {
//   const theme = useTheme();
//   const isReverse = index % 2 === 1;

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: isReverse ? 100 : -100 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.7 }}
//       viewport={{ once: true }}
//     >
//       <Grid
//         container
//         spacing={8}
//         alignItems="center"
//         direction={isReverse ? "row-reverse" : "row"}
//         sx={{ mb: 12 }}
//       >
//         {/* IMAGE */}
//         <Grid item xs={12} md={6} display="flex" justifyContent="center">
//           <Box
//             component="img"
//             src={`${API}${event?.img}`}
//             alt={event?.title}
//             sx={{
//               width: "100%",
//               maxWidth: 520,
//               height: "auto",
//               objectFit: "cover",
//               borderRadius: 4,
//               boxShadow: theme.shadows[4],
//               transition: "0.4s",
//               "&:hover": {
//                 transform: "scale(1.03)",
//               },
//             }}
//           />
//         </Grid>

//         {/* CONTENT */}
//         <Grid item xs={12} md={6}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 4,
//               width: "100%",
//               borderRadius: 4,
//               border: `1px solid ${theme.palette.divider}`,
//               background: theme.palette.background.paper,
//               backdropFilter: "blur(8px)",
//             }}
//           >
//             {/* TITLE */}
//             <Typography
//               variant="h4"
//               fontWeight={700}
//               sx={{
//                 color: theme.palette.primary.main,
//                 mb: 1,
//               }}
//             >
//               {event?.title}
//             </Typography>

//             {/* DATE */}
//             <Typography
//               sx={{
//                 mb: 3,
//                 mt: -1.5,
//                 fontSize: "0.95rem",
//                 color: theme.palette.text.secondary,
//               }}
//             >
//               {event?.date}
//             </Typography>

//             {/* DESCRIPTION HTML */}
//             <Box
//               sx={{
//                 display: "grid",
//                 gridTemplateColumns: {
//                   xs: "1fr",
//                 },
//                 gap: 3,

//                 "& p": {
//                   m: 0,
//                   mt: -2,
//                   lineHeight: 1.6,
//                 },

//                 "& h4": {
//                   mt: -2,
//                   mb: 1,
//                   fontWeight: 600,
//                   color: theme.palette.primary.main,
//                 },

//                 "& ul": {
//                   pl: 3,
//                   mb: 0,
//                 },

//                 "& li": {
//                   mb: 0.6,
//                 },

//                 /* 2 column layout */
//                 "& .two-col": {
//                   display: "grid",
//                   gridTemplateColumns: {
//                     xs: "1fr",
//                     md: "repeat(2, 1fr)",
//                   },
//                   gap: 3,
//                 },

//                 /* 3 column layout */
//                 "& .three-col": {
//                   display: "grid",
//                   gridTemplateColumns: {
//                     xs: "1fr",
//                     md: "repeat(3, 1fr)",
//                   },
//                   gap: 3,
//                 },
//               }}
//               dangerouslySetInnerHTML={{
//                 __html: event?.desc || "<p>Details coming soon.</p>",
//               }}
//             />
//           </Paper>
//         </Grid>
//       </Grid>
//     </motion.div>
//   );
// }

import { useEffect, useState } from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { API } from "../utils/common";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "swiper/css";
import "swiper/css/navigation";

export default function EventCard() {
  const theme = useTheme();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(`${API}/api/events`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events", err);
      }
    };

    loadEvents();
  }, []);

  return (
    <Box sx={{ mt: 10 }}>
      {events.map((event) => (
        <Box key={event._id} sx={{ mb: 10 }}>
          {/* EVENT TITLE */}
          <Typography
            variant="h4"
            fontWeight={800}
            mb={1}
            sx={{
              background: "linear-gradient(90deg,#00e5ff,#7c4dff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {event.title}
          </Typography>

          <Typography color="text.secondary" mb={5}>
            {event.date}
          </Typography>

          {event.days?.map((day, i) => {
            const prevClass = `prev-${event._id}-${i}`;
            const nextClass = `next-${event._id}-${i}`;

            return (
              <Paper
                key={i}
                sx={{
                  p: 4,
                  mb: 4,
                  borderRadius: 4,
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04))",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                {/* DAY LABEL */}
                <Typography
                  fontWeight={700}
                  sx={{
                    mb: 3,
                    fontSize: "1.2rem",
                    color: theme.palette.primary.main,
                  }}
                >
                  {day.day}
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    "& .swiper": {
                      overflow: "visible",
                    },
                    "& .swiper-wrapper": {
                      overflow: "visible",
                    },
                  }}
                >
                  {/* NAVIGATION */}
                  <IconButton
                    className={prevClass}
                    sx={{
                      position: "absolute",
                      top: "40%",
                      left: -20,
                      zIndex: 5,
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      "&:hover": { background: theme.palette.primary.main },
                    }}
                  >
                    <ArrowBackIosNewIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    className={nextClass}
                    sx={{
                      position: "absolute",
                      top: "40%",
                      right: -20,
                      zIndex: 5,
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      "&:hover": { background: theme.palette.primary.main },
                    }}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>

                  {/* SWIPER */}
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                      prevEl: `.${prevClass}`,
                      nextEl: `.${nextClass}`,
                    }}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    spaceBetween={24}
                    slidesPerView={1.2}
                    style={{ overflow: "visible" }}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      900: { slidesPerView: 3 },
                      1200: { slidesPerView: 4 },
                    }}
                  >
                    {day.schedule?.map((item, idx) => (
                      <SwiperSlide key={idx}>
                        <Paper
                          sx={{
                            p: 3,
                            height: "100%",
                            height: "200px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            borderRadius: 4,
                            transition: "all .3s ease",
                            border: `1px solid ${theme.palette.divider}`,
                            background: theme.palette.background.paper,
                            "&:hover": {
                              transform: "translateY(-6px)",
                              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                              borderColor: theme.palette.primary.main,
                            },
                          }}
                        >
                          {/* TIME BADGE */}
                          <Box
                            sx={{
                              display: "inline-block",
                              px: 2,
                              py: 0.5,
                              mb: 2,
                              fontSize: "0.8rem",
                              borderRadius: 20,
                              background:
                                "linear-gradient(90deg,#00e5ff,#7c4dff)",
                              color: "#fff",
                              fontWeight: 600,
                            }}
                          >
                            {item.time}
                          </Box>

                          <Typography fontWeight={700} mb={1}>
                            {item.title}
                          </Typography>

                          {item.description && (
                            <Typography
                              color="text.secondary"
                              fontSize="0.9rem"
                            >
                              {item.description}
                            </Typography>
                          )}
                        </Paper>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              </Paper>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}
