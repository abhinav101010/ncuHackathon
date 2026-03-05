import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Toolbar,
  MenuItem,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import { API } from "../../utils/api";

export default function AdminPage() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);

  const names = ["themes", "events", "rules", "sponsors"];
  const currentName = names[tab];

  const tiers = ["Silver", "Gold", "Platinum", "Co-Title", "Title"];

  // ================= LOAD =================

  useEffect(() => {
    if (tab === 4) {
      loadRegistrations();
    } else {
      loadData();
    }
  }, [tab]);

  const loadData = async () => {
    const res = await fetch(`${API}/api/${currentName}`);
    const json = await res.json();
    setData(json);
  };

  const loadRegistrations = async () => {
    const res = await fetch(`${API}/api/registrations`);
    const json = await res.json();
    setRegistrations(json);
  };

  // ================= CREATE / UPDATE =================

  const handleSubmit = async () => {
    const method = editingId ? "PUT" : "POST";

    const url = editingId
      ? `${API}/api/${currentName}/${editingId}`
      : `${API}/api/${currentName}`;

    if (currentName === "rules") {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: form.text }),
      });
    } else {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "_id" && key !== "img") {
          formData.append(key, form[key]);
        }
      });

      if (image) {
        formData.append("img", image);
      }

      await fetch(url, {
        method,
        body: formData,
      });
    }

    setForm({});
    setImage(null);
    setEditingId(null);

    loadData();
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    await fetch(`${API}/api/${currentName}/${id}`, {
      method: "DELETE",
    });

    loadData();
  };

  // ================= EDIT =================

  const handleEdit = (item) => {
    setEditingId(item._id);

    if (currentName === "rules") {
      setForm({ text: item.text });
    } else {
      setForm(item);
    }

    setImage(null);
  };

  // ================= DELETE REGISTRATION =================

  const deleteRegistration = async (id) => {
    await fetch(`${API}/api/registrations/${id}`, {
      method: "DELETE",
    });

    loadRegistrations();
  };

  // ================= UI =================

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Themes" />
        <Tab label="Events" />
        <Tab label="Rules" />
        <Tab label="Sponsors" />
        <Tab label="Registrations" />
      </Tabs>

      {/* ================= CRUD SECTION ================= */}

      {tab !== 4 && (
        <>
          <Box mt={3}>
            <Grid container spacing={2}>
              {(currentName === "themes" || currentName === "events") && (
                <>
                  <Grid item xs={4}>
                    <TextField
                      label="Title"
                      fullWidth
                      value={form.title || ""}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      label="Description"
                      fullWidth
                      value={form.desc || ""}
                      onChange={(e) =>
                        setForm({ ...form, desc: e.target.value })
                      }
                    />
                  </Grid>

                  {currentName === "events" && (
                    <Grid item xs={4}>
                      <TextField
                        label="Event Date"
                        fullWidth
                        value={form.date || ""}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                      />
                    </Grid>
                  )}
                </>
              )}

              {/* SPONSOR FIELDS */}

              {currentName === "sponsors" && (
                <>
                  <Grid item xs={4}>
                    <TextField
                      label="Sponsor Name"
                      fullWidth
                      value={form.name || ""}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      select
                      label="Tier"
                      fullWidth
                      value={form.tier || ""}
                      onChange={(e) =>
                        setForm({ ...form, tier: e.target.value })
                      }
                    >
                      {tiers.map((tier) => (
                        <MenuItem key={tier} value={tier}>
                          {tier}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}

              {/* IMAGE FIELD */}

              {currentName !== "rules" && (
                <Grid item xs={4}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Button>

                  {image && (
                    <Typography sx={{ mt: 1, fontSize: 12 }}>
                      {image.name}
                    </Typography>
                  )}
                </Grid>
              )}

              {/* RULES FIELD */}

              {currentName === "rules" && (
                <Grid item xs={6}>
                  <TextField
                    label="Rule Text"
                    fullWidth
                    value={form.text || ""}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                  />
                </Grid>
              )}
            </Grid>

            <Box mt={2}>
              <Button variant="contained" onClick={handleSubmit}>
                {editingId ? "Update" : "Add"}
              </Button>
            </Box>
          </Box>

          {/* ================= LIST ================= */}

          <Box mt={4}>
            {data.map((item) => (
              <Card key={item._id} sx={{ mb: 2 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6">
                      {currentName === "rules"
                        ? item.text
                        : item.title || item.name}
                    </Typography>

                    {item.desc && (
                      <Typography color="gray">{item.desc}</Typography>
                    )}

                    {item.date && (
                      <Typography color="gray" sx={{ fontSize: 12 }}>
                        {item.date}
                      </Typography>
                    )}

                    {/* SHOW TIER */}

                    {currentName === "sponsors" && item.tier && (
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "primary.main",
                          mt: 0.5,
                        }}
                      >
                        Tier: {item.tier}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <IconButton onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}

      {/* ================= REGISTRATION TABLE ================= */}

      {tab === 4 && (
        <Paper sx={{ mt: 4 }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Registrations</Typography>

            <Button startIcon={<RefreshIcon />} onClick={loadRegistrations}>
              Refresh
            </Button>
          </Toolbar>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Team ID</TableCell>
                  <TableCell>Team Name</TableCell>
                  <TableCell>Theme</TableCell>
                  <TableCell>Lead</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {registrations.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.teamId}</TableCell>
                    <TableCell>{row.teamName}</TableCell>
                    <TableCell>{row.selectedTheme}</TableCell>
                    <TableCell>{row.teamLead}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => deleteRegistration(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}
