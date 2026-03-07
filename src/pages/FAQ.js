import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@emotion/react";
import { useState } from "react";

export default function FAQ() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 10 }}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
        Frequently Asked Questions
      </Typography>

      {/* Search Box */}
      <Box sx={{ mb: 5, maxWidth: 450, mx: "auto" }}>
        <TextField
          fullWidth
          label="Search FAQ..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography color="gray">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography textAlign="center" color="gray">
          No matching FAQs found.
        </Typography>
      )}

      {/* Contact Section */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          Still have questions? Feel free to reach out to us at
        </Typography>

        <Link
          href="mailto:hackathon@ncuindia.edu"
          underline="hover"
          sx={{
            display: "block",
            mt: 1,
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}
        >
          cloudiotclub@ncuindia.edu
        </Link>
      </Box>
    </Container>
  );
}



  const faqData = [
    {
      question: "Q1. Who can participate in the hackathon?",
      answer:
        "Students from any college or university across India are eligible to participate in the hackathon.",
    },
    {
      question: "Q2. Do I need prior coding experience to participate?",
      answer:
        "No, prior coding experience is not mandatory to participate in the hackathon. However, having coding knowledge can be beneficial while building and implementing your project.",
    },
    {
      question: "Q3. How many members are allowed in one team?",
      answer:
        "Each team must consist of exactly 3 members. Teams with more or fewer members will not be allowed to participate.",
    },
    {
      question: "Q4. What should I bring to the hackathon?",
      answer:
        "Participants must bring a laptop, laptop charger, signed consent form, any hardware components required for their project, and a valid ID proof.",
    },
    {
      question: "Q5. Will there be prizes or certificates?",
      answer:
        "Yes, all participants will receive a certificate of participation, and winning teams will be awarded cash prizes.",
    },
    {
      question: "Q6. Is there any registration fee for the hackathon?",
      answer:
        "Yes, the registration fee is ₹300 per team for NCU students and ₹500 per team for students from other colleges or universities.",
    },
    {
      question: "Q7. How do I register for the hackathon?",
      answer:
        "Participants can register through the official hackathon website by completing the registration form and paying the required registration fee.",
    },
    {
      question: "Q8. What is the theme of the hackathon?",
      answer:
        "Participants can check the official hackathon website to view the available themes and problem statements.",
    },
    {
      question: "Q9. What is the duration of the hackathon?",
      answer:
        "The hackathon will run for 56 hours, during which teams will brainstorm, develop, and present their solutions.",
    },
    {
      question: "Q10. Will mentors be available during the hackathon?",
      answer:
        "Yes, mentors will be available throughout the hackathon to guide participants and assist them with their ideas and technical challenges.",
    },
    {
      question: "Q11. How will the projects be judged?",
      answer:
        "Projects will be evaluated based on innovation, impact of the solution, implementation, feasibility, and SWOT analysis.",
    },
    {
      question: "Q12. What if any teammate cancels at the last moment?",
      answer:
        "If a teammate cancels at the last moment, the team may bring an alternate member, but organizers must be informed in advance before the hackathon begins.",
    },
    {
      question: "Q13. Will participants get certificates?",
      answer:
        "Yes, all participants will receive a certificate of participation after successfully completing the hackathon.",
    },
    {
      question:
        "Q14. Are we allowed to choose our own theme or problem statement?",
      answer:
        "Participants can choose from the themes and problem statements provided by the organizers, or work on their own idea under the Open Innovation category.",
    },
  ];