import * as React from "react";
import {
  Box, Grid, Typography, Card, CardContent,
  Button, Chip, Dialog, DialogContent,
  TextField, MenuItem, Select, FormControl, InputLabel,
  Paper, Avatar, LinearProgress, IconButton,
  Tabs, Tab, List, ListItem, ListItemText, ListItemAvatar,
  Stack, Tooltip,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow
} from "@mui/material";
import {
  DataGrid
} from "@mui/x-data-grid";
import {
  PieChart,
  BarChart,
  LineChart
} from "@mui/x-charts";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp,
  MonetizationOn,
  AssignmentTurnedIn,
  FilterList,
  Search,
  Verified,
  CloudDownload,
  BarChartOutlined,
  Timeline
} from "@mui/icons-material";

const eduPatentData = [
  {
    id: 1,
    title: "AI Based Crop Disease Detection",
    inventors: "Dr. Rajesh, Anitha",
    department: "AI & DS",
    domain: "Artificial Intelligence",
    filingDate: "2024-02-14",
    applicationNo: "IN202421001",
    status: "Granted",
    country: "India",
    validTill: "2044-02-14",
    commercialized: "Yes",
    revenue: 250000,
  },
  {
    id: 2,
    title: "Smart Energy Meter using IoT",
    inventors: "Karthik, Meena",
    department: "ECE",
    domain: "IoT",
    filingDate: "2023-10-02",
    applicationNo: "IN202321876",
    status: "Published",
    country: "India",
    validTill: "2043-10-02",
    commercialized: "No",
    revenue: 0,
  },
  {
    id: 3,
    title: "Blockchain Based Supply Chain",
    inventors: "Suresh, Priya",
    department: "CSE",
    domain: "Blockchain",
    filingDate: "2024-01-10",
    applicationNo: "IN202411223",
    status: "Filed",
    country: "India",
    validTill: "2044-01-10",
    commercialized: "No",
    revenue: 0,
  },
  {
    id: 4,
    title: "5G Antenna Optimization",
    inventors: "Dr. Mohan, Kavitha",
    department: "ECE",
    domain: "Electronics",
    filingDate: "2023-05-15",
    applicationNo: "IN202355667",
    status: "Granted",
    country: "India",
    validTill: "2043-05-15",
    commercialized: "Yes",
    revenue: 150000,
  },
  {
    id: 5,
    title: "Biodegradable Packaging Material",
    inventors: "Dr. Swathi, Rahul",
    department: "Biotech",
    domain: "Biotechnology",
    filingDate: "2023-11-20",
    applicationNo: "IN202388990",
    status: "Published",
    country: "India",
    validTill: "2043-11-20",
    commercialized: "No",
    revenue: 0,
  },
  {
    id: 6,
    title: "Quantum Computing Algorithms",
    inventors: "Arun, Divya",
    department: "CSE",
    domain: "Quantum Computing",
    filingDate: "2024-03-05",
    applicationNo: "IN202433445",
    status: "Filed",
    country: "India",
    validTill: "2044-03-05",
    commercialized: "No",
    revenue: 0,
  }
];

const EduTheme = {
  primary: "#1a3e36",      
  secondary: "#2e7d32",    
  accent: "#ebf5f0",       
  background: "#f4f7f6",  
  cardBg: "#ffffff",
  textPrimary: "#1a3e36",
  textSecondary: "#6a7c78",
  borderRadius: "16px"
};

export default function Patent() {
  const [eduRows, setEduRows] = React.useState(eduPatentData);
  const [eduOpen, setEduOpen] = React.useState(false);
  const [eduEditMode, setEduEditMode] = React.useState(false);
  const [eduEditingId, setEduEditingId] = React.useState(null);
  const [eduSearchTerm, setEduSearchTerm] = React.useState("");

  const [eduForm, setEduForm] = React.useState({
    title: "",
    inventors: "",
    department: "",
    domain: "", 
    filingDate: "",
    status: "Filed",
    commercialized: "No",
    revenue: ""
  });

  const handleEduSubmit = () => {
    if (eduEditMode && eduEditingId) {
      setEduRows(eduRows.map(row => row.id === eduEditingId ? { ...row, ...eduForm, revenue: Number(eduForm.revenue || 0) } : row));
    } else {
      const newId = Math.max(...eduRows.map(r => r.id)) + 1;
      setEduRows([...eduRows, { id: newId, ...eduForm, revenue: Number(eduForm.revenue || 0) }]);
    }
    setEduOpen(false);
    resetEduForm();
  };

  const handleEduEdit = (id) => {
    const patent = eduRows.find(r => r.id === id);
    if (patent) {
      setEduForm(patent);
      setEduEditMode(true);
      setEduEditingId(id);
      setEduOpen(true);
    }
  };

  const handleEduDelete = (id) => {
    setEduRows(eduRows.filter(r => r.id !== id));
  };

  const resetEduForm = () => {
    setEduForm({
      title: "",
      inventors: "",
      department: "",
      domain: "",
      filingDate: "",
      status: "Filed",
      commercialized: "No",
      revenue: ""
    });
    setEduEditMode(false);
    setEduEditingId(null);
  };

  const eduFilteredRows = eduRows.filter(p =>
    p.title.toLowerCase().includes(eduSearchTerm.toLowerCase()) ||
    p.inventors.toLowerCase().includes(eduSearchTerm.toLowerCase())
  );

  const eduStatusCount = {
    Granted: eduRows.filter(p => p.status === "Granted").length,
    Published: eduRows.filter(p => p.status === "Published").length,
    Filed: eduRows.filter(p => p.status === "Filed").length
  };

  const eduCommercialized = eduRows.filter(p => p.commercialized === "Yes");
  const eduTotalRevenue = eduCommercialized.reduce((s, p) => s + (p.revenue || 0), 0);

  const eduDomainData = [
    { domain: 'Biotech', count: eduRows.filter(r => r.domain === 'Biotechnology').length || 5 },
    { domain: 'Software', count: eduRows.filter(r => r.domain === 'Software').length || 3 },
    { domain: 'Agri', count: 8 },
    { domain: 'Electronics', count: 4 },
  ];

  const eduRevenueByPatent = eduRows
    .filter(r => r.revenue > 0)
    .map(r => ({ title: r.title.substring(0, 10) + '...', revenue: r.revenue }));

  const eduColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Patent Title", flex: 1, minWidth: 200 },
    { field: "department", headerName: "Dept", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            fontWeight: "bold",
            bgcolor: params.value === "Granted" ? "#e8f5e9" :
              params.value === "Published" ? "#e3f2fd" : "#fff3e0",
            color: params.value === "Granted" ? EduTheme.secondary :
              params.value === "Published" ? "#1976d2" : "#ef6c00"
          }}
        />
      )
    },
    { field: "commercialized", headerName: "Comm.", width: 100 },
    {
      field: "revenue",
      headerName: "Revenue",
      width: 120,
      renderCell: (params) => (
        <Typography fontWeight="600" color={params.value > 0 ? EduTheme.secondary : EduTheme.textSecondary}>
          {params.value ? `₹${params.value.toLocaleString()}` : "-"}
        </Typography>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => handleEduEdit(params.id)} sx={{ color: EduTheme.primary }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleEduDelete(params.id)} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: EduTheme.background, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} mb={4} gap={2}>
        <Box>
          <Typography variant="h4" fontWeight={800} color={EduTheme.primary} sx={{ letterSpacing: "-0.5px", fontSize: { xs: "1.75rem", md: "2.125rem" } }}>
            Patent Portfolio
          </Typography>
          <Typography variant="body2" color={EduTheme.textSecondary} fontWeight={500}>
            Strategic asset management for CropSmile
          </Typography>
        </Box>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} width={{ xs: "100%", md: "auto" }}>
          <TextField
            size="small"
            placeholder="Search assets..."
            value={eduSearchTerm}
            onChange={(e) => setEduSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: EduTheme.textSecondary }} />,
              sx: { borderRadius: "10px", bgcolor: "white", "& fieldset": { border: "none" }, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }
            }}
            sx={{ minWidth: { xs: "100%", md: 240 } }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { resetEduForm(); setEduOpen(true); }}
            sx={{ bgcolor: EduTheme.primary, borderRadius: "10px", px: 3, textTransform: "none", fontWeight: "bold", "&:hover": { bgcolor: "#2c5e50" }, width: { xs: "100%", sm: "auto" } }}
          >
            Add Patent
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} mb={4}>
        {[
          { title: "Total Patents", value: eduRows.length, icon: <AssignmentTurnedIn />, color: EduTheme.primary },
          { title: "Granted", value: eduStatusCount.Granted, icon: <Verified />, color: EduTheme.secondary },
          { title: "Total Revenue", value: `₹${(eduTotalRevenue / 1000).toFixed(1)}K`, icon: <MonetizationOn />, color: "#FFB300" },
          { title: "Commercialized", value: eduCommercialized.length, icon: <TrendingUp />, color: EduTheme.secondary }
        ].map((kpi, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ borderRadius: EduTheme.borderRadius, boxShadow: "0 10px 30px rgba(0,0,0,0.03)", border: "1px solid #edf2f0" }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" fontWeight="700" color={EduTheme.textSecondary} sx={{ mb: 1 }}>{kpi.title}</Typography>
                    <Typography variant="h4" fontWeight="800" color={EduTheme.primary}>{kpi.value}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: `${kpi.color}15`, color: kpi.color, width: 56, height: 56 }}>
                    {kpi.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: EduTheme.borderRadius, boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="700" color={EduTheme.primary} display="flex" alignItems="center" gap={1}>
                  <Timeline color="success" /> Revenue Performance (₹)
                </Typography>
              </Stack>
              <Box sx={{ height: 300, width: '100%' }}>
                <LineChart
                  xAxis={[{ scaleType: 'point', data: eduRevenueByPatent.length > 0 ? eduRevenueByPatent.map(d => d.title) : ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] }]}
                  series={[
                    {
                      data: eduRevenueByPatent.length > 0 ? eduRevenueByPatent.map(d => d.revenue) : [4000, 3000, 2000, 2780, 1890, 2390],
                      color: EduTheme.secondary,
                      area: true,
                      label: 'Actual Revenue'
                    },
                    {
                      data: eduRevenueByPatent.length > 0 ? eduRevenueByPatent.map(d => d.revenue * 1.2) : [5000, 3500, 2500, 3200, 2500, 3000],
                      color: EduTheme.primary,
                      label: 'Target Revenue'
                    }
                  ]}
                  height={300}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: EduTheme.borderRadius, boxShadow: "0 10px 30px rgba(0,0,0,0.03)", height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="700" mb={3} color={EduTheme.primary}>Status Distribution</Typography>
              <Box sx={{ height: 280, display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[{
                    data: [
                      { value: eduStatusCount.Granted, label: "Granted", color: EduTheme.secondary },
                      { value: eduStatusCount.Published, label: "Published", color: "#81c784" },
                      { value: eduStatusCount.Filed, label: "Filed", color: "#c8e6c9" }
                    ],
                    innerRadius: 60,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                  }]}
                  height={280}
                  slotProps={{ legend: { hidden: true } }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: EduTheme.borderRadius, boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="700" mb={2} color={EduTheme.primary} display="flex" alignItems="center" gap={1}>
                <BarChartOutlined /> Domain Expertise
              </Typography>
              <Box sx={{ height: 300 }}>
                <BarChart
                  layout="horizontal"
                  yAxis={[{ scaleType: 'band', data: eduDomainData.map(d => d.domain) }]}
                  series={[{ data: eduDomainData.map(d => d.count), color: EduTheme.primary }]}
                  height={300}
                  borderRadius={5}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: EduTheme.borderRadius, boxShadow: "0 10px 30px rgba(0,0,0,0.03)", height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="700" mb={3} color={EduTheme.primary}>Recent Activity</Typography>
              <Box sx={{ height: 280, overflowY: 'auto' }}>
                <List sx={{ p: 0 }}>
                  {eduRows.slice(0, 5).map((patent) => (
                    <ListItem key={patent.id} sx={{ px: 0, py: 1, borderBottom: '1px solid #f0f4f2' }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: EduTheme.accent, color: EduTheme.primary, fontWeight: 'bold' }}>
                          {patent.id}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography fontWeight="700" color={EduTheme.primary}>{patent.title}</Typography>}
                        secondary={patent.department}
                      />
                      <Chip
                        label={patent.status}
                        size="small"
                        sx={{ fontWeight: 'bold', bgcolor: patent.status === "Granted" ? "#e8f5e9" : "#f5f5f5" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: EduTheme.borderRadius, boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <Typography variant="h6" fontWeight="700" color={EduTheme.primary}>Asset Registry</Typography>
            <Button startIcon={<CloudDownload />} variant="outlined" size="small" sx={{ borderRadius: '8px', color: EduTheme.primary, borderColor: EduTheme.primary }}>Export Portfolio</Button>
          </Box>
          <Box sx={{ height: 450, px: 2, pb: 2 }}>
            <DataGrid
              rows={eduFilteredRows}
              columns={eduColumns}
              pageSizeOptions={[5, 10]}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': { bgcolor: EduTheme.accent, color: EduTheme.primary, borderRadius: '8px' },
                '& .MuiDataGrid-cell': { borderBottom: '1px solid #f0f4f2' },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={eduOpen} onClose={() => { setEduOpen(false); resetEduForm(); }} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: EduTheme.borderRadius } }}>
        <DialogContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="800" mb={3} color={EduTheme.primary}>
            {eduEditMode ? "Edit Patent Asset" : "Register New Patent"}
          </Typography>
          <Grid container spacing={2}>
            {[
              { field: "title", label: "Patent Title", required: true },
              { field: "inventors", label: "Lead Inventors", required: true },
              { field: "department", label: "Department" },
              { field: "domain", label: "Domain", select: true, options: ["Biotechnology", "Software", "Electronics", "Medical", "Other"] },
              { field: "filingDate", label: "Filing Date", type: "date" },
              { field: "status", label: "Status", select: true, options: ["Filed", "Published", "Granted"] },
              { field: "commercialized", label: "Commercialized", select: true, options: ["Yes", "No"] },
              { field: "revenue", label: "Revenue (₹)", type: "number" }
            ].map((field, i) => (
              <Grid item xs={12} sm={field.field === "title" || field.field === "inventors" ? 12 : 6} key={i}>
                {field.select ? (
                  <FormControl fullWidth margin="normal">
                    <InputLabel sx={{ color: EduTheme.textSecondary }}>{field.label}</InputLabel>
                    <Select
                      value={eduForm[field.field] || ""}
                      label={field.label}
                      onChange={(e) => setEduForm({ ...eduForm, [field.field]: e.target.value })}
                      sx={{ borderRadius: "10px" }}
                    >
                      {field.options.map(opt => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    margin="normal"
                    label={field.label}
                    type={field.type || "text"}
                    value={eduForm[field.field] || ""}
                    onChange={(e) => setEduForm({ ...eduForm, [field.field]: e.target.value })}
                    required={field.required}
                    InputLabelProps={field.type === "date" ? { shrink: true } : { sx: { color: EduTheme.textSecondary } }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Box display="flex" gap={2} mt={4}>
            <Button fullWidth variant="text" onClick={() => { setEduOpen(false); resetEduForm(); }} sx={{ color: EduTheme.textSecondary, fontWeight: "bold" }}>Cancel</Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleEduSubmit}
              sx={{ bgcolor: EduTheme.primary, py: 1.5, borderRadius: "10px", fontWeight: "bold", "&:hover": { bgcolor: "#2c5e50" } }}
            >
              {eduEditMode ? "Update Asset" : "Register Patent"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}