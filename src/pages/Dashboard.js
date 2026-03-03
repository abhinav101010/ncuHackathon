import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
} from "@mui/material";

export default function Dashboard() {
  const [team, setTeam] = useState(null);
  const [editing, setEditing] = useState(false);

  const token = localStorage.getItem("teamToken");

  useEffect(() => {
    fetch("http://localhost:5000/api/registrations/me", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setTeam(data));
  }, []);

  const handleChange = (field, value) => {
    setTeam({
      ...team,
      [field]: value,
    });
  };

  const handleUpdate = async () => {
    const res = await fetch(
      "http://localhost:5000/api/registrations/me",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(team),
      }
    );

    const data = await res.json();
    setTeam(data);
    setEditing(false);
  };

  if (!team) return <div>Loading...</div>;

  return (
    <Container sx={{ mt: 12 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Team Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Team Name"
              value={team.teamName}
              disabled={!editing}
              onChange={(e) =>
                handleChange("teamName", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Team Lead"
              value={team.teamLead}
              disabled={!editing}
              onChange={(e) =>
                handleChange("teamLead", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              value={team.phone}
              disabled={!editing}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="University"
              value={team.university}
              disabled={!editing}
              onChange={(e) =>
                handleChange("university", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Theme"
              value={team.selectedTheme}
              disabled
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          {!editing ? (
            <Button
              variant="contained"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpdate}
            >
              Save Changes
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}