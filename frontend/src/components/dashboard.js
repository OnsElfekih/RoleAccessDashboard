import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";
import { Box, AppBar, Toolbar, Typography, CircularProgress, Grid, Paper } from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import Navbar from "./navbar";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Products/all");
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const colors = ["#FF5733", "#33FF57", "#3380FF", "#FF33A8", "#FFC300", "#9C33FF"];


  return (
    <Box sx={{ display: "flex" }}>
      <Navbar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="static">
          <Toolbar>
            <DashboardIcon sx={{ mr: 2 }} />
            <Typography variant="h6">Tableau de Bord</Typography>
          </Toolbar>
        </AppBar>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" align="center">Graphique en Ligne</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="libelle" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="quantite" stroke={colors[0]} />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" align="center">Graphique en Barres</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="libelle" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantite" fill={colors[1]} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" align="center">Graphique en Camembert</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="quantite"
                      nameKey="libelle"
                      cx="50%" cy="50%"
                      outerRadius={100}
                      label
                      fill={colors[2]}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" align="center">Graphique en Aire</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="libelle" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="quantite" stroke={colors[3]} fill={colors[3]} />
                  </AreaChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" align="center">Graphique Radar</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="libelle" />
                    <PolarRadiusAxis />
                    <Radar name="Quantité" dataKey="quantite" stroke={colors[4]} fill={colors[4]} fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
