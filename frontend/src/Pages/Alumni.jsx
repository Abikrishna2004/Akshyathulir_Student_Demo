import React from 'react';
import {
  Box, Typography, Grid, Paper, Button, Avatar,
  Chip, Divider, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Stack, Container
} from '@mui/material';

import {
  RocketLaunch, AccountBalance, TrendingUp, People, InfoOutlined
} from '@mui/icons-material';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from 'recharts';

const EduColors = {
  primary: '#1a3e36',    
  accent: '#4caf50',     
  bg: '#f7fff7',        
  border: '#eef2f1',     
  textMain: '#2d3436',
  textSecondary: '#636e72',
  chipAgri: '#e8f5e9'    
};

const EduCardSx = {
  bgcolor: '#fff',
  borderRadius: '16px',
  border: `1px solid ${EduColors.border}`,
  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
  }
};

const EduKpiData = [
  { title: 'Total Startups', value: '129', trend: '+8%', icon: <RocketLaunch />, color: '#1a3e36' },
  { title: 'Active Founders', value: '184', trend: '+12', icon: <People />, color: '#1a3e36' },
  { title: 'Institutional Funding', value: '₹4.8 Cr', trend: 'Verified', icon: <AccountBalance />, color: '#1a3e36' },
  { title: 'Success Rate', value: '84%', trend: 'Stable', icon: <TrendingUp />, color: '#1a3e36' }
];

const EduGrowthData = [
  { name: 'Jan', value: 300 }, { name: 'Feb', value: 450 }, { name: 'Mar', value: 380 },
  { name: 'Apr', value: 700 }, { name: 'May', value: 600 }, { name: 'Jun', value: 1100 }
];

const EduFundingDistribution = [
  { name: 'Seed', value: 35, color: '#1a3e36' },
  { name: 'Pre-Series A', value: 25, color: '#377d39' },
  { name: 'Series A', value: 20, color: '#3cb73e' },
  { name: 'Bootstrapped', value: 20, color: '#a5d6a7' }
];

const EduIdeaStats = [
  { domain: 'AI / ML', ideas: 18 }, { domain: 'HealthTech', ideas: 12 },
  { domain: 'EdTech', ideas: 15 }, { domain: 'FinTech', ideas: 10 }, { domain: 'AgriTech', ideas: 8 }
];

const EduStartupIdeas = [
  { title: 'Smart Crop Advisory', domain: 'AgriTech', description: 'AI-powered crop yield and fertilizer planning.', stage: 'Ideation' },
  { title: 'AI Interview Coach', domain: 'EdTech', description: 'Mock interviews with real-time AI feedback.', stage: 'Prototype' },
  { title: 'Remote Health Monitor', domain: 'HealthTech', description: 'Wearable-based patient monitoring system.', stage: 'MVP' }
];

const EduVentures = [
  { name: 'NeuralFarm AI', lead: 'Arjun V.', stage: 'MVP', funding: '₹2.5L' },
  { name: 'QuickLearn', lead: 'Sara Khan', stage: 'Scaling', funding: '₹12.0L' },
  { name: 'BioHeal Hub', lead: 'Leo Das', stage: 'Ideation', funding: '--' }
];

const EduAlumniData = [
  { name: 'Siddharth Kumar', batch: '2018', role: 'Founder & CEO', startup: 'NeuralFarm AI', status: 'Mentor' },
  { name: 'Ananya Mehta', batch: '2019', role: 'CTO', startup: 'QuickLearn', status: 'Investor' },
  { name: 'Rahul Verma', batch: '2017', role: 'Product Lead', startup: 'BioHeal Hub', status: 'Founder' }
];

export default function Alumni() {

  const EduSubHeader = () => (
    <Box >
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight={800} color={EduColors.primary}>Alumni Startup Network</Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: EduColors.primary, '&:hover': { bgcolor: '#15312b' }, textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}
          >
            New Application
          </Button>
        </Stack>
      </Container>
    </Box>
  );

  const EduKpiCard = ({ title, value, trend, icon, color }) => (
    <Grid item xs={12} sm={6} md={3}>
      <Paper sx={{ ...EduCardSx, p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: 'transparent', border: `1px solid ${EduColors.border}`, color: color }}>{icon}</Avatar>
            <Typography variant="subtitle2" fontWeight={600} color={EduColors.textSecondary}>{title}</Typography>
          </Stack>
          <InfoOutlined sx={{ fontSize: 18, color: '#b2bec3' }} />
        </Stack>
        <Box mt={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
            <Typography variant="h4" fontWeight={800} color={EduColors.primary}>{value}</Typography>
            <Chip
              label={trend}
              size="small"
              sx={{ bgcolor: EduColors.chipAgri, color: EduColors.accent, fontWeight: 700, fontSize: '0.7rem' }}
            />
          </Stack>
        </Box>
      </Paper>
    </Grid>
  );

  const EduIdeaCard = ({ title, domain, description, stage }) => (
    <Paper
      sx={{
        ...EduCardSx,
        p: 3,

        border: `2px solid #e8f5e9`,
        '&:hover': {
          transform: 'translateY(-4px)',
          bgcolor: '#f9fdf9'
        }
      }}
    >
      <Typography variant="h6" fontWeight={800} color={EduColors.primary} mb={1}>
        {title}
      </Typography>
      <Chip
        label={domain}
        size="small"
        sx={{
          mb: 2,
          bgcolor: '#f1f8e9',
          fontWeight: 700,
          color: '#33691e',
          border: '1px solid #c5e1a5'
        }}
      />
      <Typography
        variant="body2"
        color={EduColors.textSecondary}
        sx={{
          minHeight: '60px',
          lineHeight: 1.6,
          mb: 2
        }}
      >
        {description}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
        <Chip
          label={stage}
          size="small"
          sx={{
            bgcolor: '#e8f5e9',
            border: `1px solid #81c784`,
            color: '#2e7d32',
            fontWeight: 800,
            fontSize: '0.75rem'
          }}
        />
        <Button
          size="small"
          variant="outlined"
          sx={{
            borderColor: '#4caf50',
            color: '#4caf50',
            fontWeight: 600,
            fontSize: '0.75rem',
            '&:hover': {
              borderColor: '#388e3c',
              bgcolor: '#e8f5e9'
            }
          }}
        >
          View Details
        </Button>
      </Box>
    </Paper>
  );

  const EduAnalyticsChart = () => (
    <Paper sx={{ ...EduCardSx, p: 3, }}>
      <Typography variant="h6" fontWeight={800} color={EduColors.primary} mb={2}>Growth Performance</Typography>
      <Box height={280} minWidth={0} position="relative">
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <AreaChart data={EduGrowthData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={EduColors.accent} stopOpacity={0.3} />
                <stop offset="95%" stopColor={EduColors.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: EduColors.textSecondary, fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: EduColors.textSecondary, fontSize: 11, fontWeight: 500 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                backgroundColor: 'white',
                padding: '10px 14px',
                fontSize: '12px'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={EduColors.accent}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
      <Box mt={2}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Box p={1.5} bgcolor={`${EduColors.bg}`} borderRadius='6px' border={`1px solid ${EduColors.border}`}>
              <Typography variant="body2" color={EduColors.textSecondary} fontSize="11px">Monthly Growth</Typography>
              <Typography variant="subtitle2" fontWeight={700} color={EduColors.primary}>+15.2%</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box p={1.5} bgcolor={`${EduColors.bg}`} borderRadius='6px' border={`1px solid ${EduColors.border}`}>
              <Typography variant="body2" color={EduColors.textSecondary} fontSize="11px">Peak Value</Typography>
              <Typography variant="subtitle2" fontWeight={700} color={EduColors.primary}>1,100</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box p={1.5} bgcolor={`${EduColors.bg}`} borderRadius='6px' border={`1px solid ${EduColors.border}`}>
              <Typography variant="body2" color={EduColors.textSecondary} fontSize="11px">Avg. Value</Typography>
              <Typography variant="subtitle2" fontWeight={700} color={EduColors.primary}>588</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );

  const EduFundingPieChart = () => (
    <Paper sx={{ ...EduCardSx, p: 3, }}>
      <Typography variant="h6" fontWeight={800} color={EduColors.primary} mb={2}>Funding Distribution</Typography>
      <Box height={280} minWidth={0} position="relative">
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <PieChart>
            <Pie
              data={EduFundingDistribution}
              dataKey="value"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={3}
              labelLine={false}
            >
              {EduFundingDistribution.map((e, i) => <Cell key={i} fill={e.color || EduColors.primary} />)}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: `1px solid ${EduColors.border}`,
                backgroundColor: 'white',
                padding: '10px',
                fontSize: '12px'
              }}
            />
            <Legend
              content={({ payload }) => (
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, pt: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  {payload.map((entry, index) => (
                    <Box component="li" key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: EduColors.textMain, justifyContent: 'center' }}>
                      <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: entry.color, mr: 1 }} />
                      {entry.value}
                    </Box>
                  ))}
                </Box>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color={EduColors.textSecondary} fontSize="12px" textAlign="center">
          <Box component="span" fontWeight={700} color={EduColors.primary}>Seed funding</Box> leads with 35%
        </Typography>
      </Box>
    </Paper>
  );

  const EduStartupIdeasChart = () => (
    <Paper sx={{ ...EduCardSx, p: 3, }}>
      <Typography variant="h6" fontWeight={800} color={EduColors.primary} mb={2}>Startup Ideas by Domain</Typography>
      <Box height={280} minWidth={0} position="relative">
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <BarChart data={EduIdeaStats}>
            <XAxis
              dataKey="domain"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
            />
            <Tooltip
              cursor={{ fill: '#f7fff7' }}
              contentStyle={{
                borderRadius: '12px',
                border: `1px solid ${EduColors.border}`,
                backgroundColor: 'white',
                padding: '10px',
                fontSize: '12px'
              }}
            />
            <Bar
              dataKey="ideas"
              fill={EduColors.accent}
              radius={[4, 4, 0, 0]}
              barSize={25}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color={EduColors.textSecondary} fontSize="12px">
          <Box component="span" fontWeight={700} color={EduColors.primary}>AI/ML</Box> has the highest number of startup ideas
        </Typography>
      </Box>
    </Paper>
  );

  const EduPortfolioTable = () => (
    <TableContainer component={Paper} sx={{ ...EduCardSx, overflow: 'hidden' }}>
      <Box p={3} bgcolor="white" borderBottom={`1px solid ${EduColors.border}`}>
        <Typography variant="h6" fontWeight={800} color={EduColors.primary}>Recent Portfolio</Typography>
      </Box>
      <Table>
        <TableHead sx={{ bgcolor: EduColors.bg }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: EduColors.textSecondary }}>Venture</TableCell>
            <TableCell sx={{ fontWeight: 700, color: EduColors.textSecondary }}>Founder</TableCell>
            <TableCell sx={{ fontWeight: 700, color: EduColors.textSecondary }}>Stage</TableCell>
            <TableCell sx={{ fontWeight: 700, color: EduColors.textSecondary }}>Funding</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {EduVentures.map(v => (
            <TableRow key={v.name} hover sx={{ '&:hover': { bgcolor: EduColors.bg } }}>
              <TableCell sx={{ fontWeight: 600 }}>{v.name}</TableCell>
              <TableCell>{v.lead}</TableCell>
              <TableCell>
                <Chip label={v.stage} size="small" sx={{ fontWeight: 600, bgcolor: EduColors.chipAgri, color: EduColors.accent }} />
              </TableCell>
              <TableCell fontWeight={700}>{v.funding}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const EduAlumniSection = () => (
    <Paper sx={{ ...EduCardSx, p: 4 }}>
      <Typography variant="h6" fontWeight={800} color={EduColors.primary} mb={3}>Alumni Network</Typography>
      <Grid container spacing={3}>
        {EduAlumniData.map(a => (
          <Grid item xs={12} md={4} key={a.name}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: `1px solid ${EduColors.border}`,
                borderRadius: '12px',
                bgcolor: EduColors.bg
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: EduColors.primary, fontWeight: 700 }}>{a.name[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={800}>{a.name}</Typography>
                  <Typography variant="caption" color={EduColors.textSecondary}>Batch of {a.batch}</Typography>
                </Box>
              </Stack>
              <Typography variant="body2" fontWeight={600} color={EduColors.accent}>{a.role}</Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" fontWeight={700} mb={1}>{a.startup}</Typography>
              <Chip label={a.status} size="small" sx={{ bgcolor: EduColors.primary, color: 'white', fontWeight: 600 }} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  return (
    <Box bgcolor={EduColors.bg} minHeight="100vh">
      <EduSubHeader />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3} mb={4}>
          {EduKpiData.map(kpi => <EduKpiCard key={kpi.title} {...kpi} />)}
        </Grid>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} lg={5}>
            <EduAnalyticsChart />
          </Grid>
          <Grid item xs={12} lg={3}>
            <EduFundingPieChart />
          </Grid>
          <Grid item xs={12} lg={4}>
            <EduStartupIdeasChart />
          </Grid>
        </Grid>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <EduIdeaCard
              title="Smart Crop Advisory"
              domain="AgriTech"
              description="AI-powered crop yield and fertilizer planning."
              stage="Ideation"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EduIdeaCard 
              title="AI Interview Coach"
              domain="EdTech"
              description="Mock interviews with real-time AI feedback."
              stage="Prototype"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EduIdeaCard
              title="Remote Health Monitor"
              domain="HealthTech"
              description="Wearable-based patient monitoring system."
              stage="MVP"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <EduAlumniSection />
          </Grid>
          <Grid item xs={12}>
            <EduPortfolioTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}