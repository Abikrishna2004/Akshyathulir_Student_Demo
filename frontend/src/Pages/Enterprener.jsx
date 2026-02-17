import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  Chip,
  Avatar,
  Card,
  CardContent,
  Stack,
  Button,
  Divider,
  IconButton,
  Tooltip as MuiTooltip,
  Paper,
  AvatarGroup,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  RocketLaunch,
  MonetizationOn,
  Groups,
  Stars,
  InfoOutlined,
  TrendingUp,
  MoreVert,
  CalendarMonth,
  LocalFireDepartment,
  WorkspacePremium,
  TrendingDown,
  School,
  CheckCircle,
  Warning,
  EmojiEvents,
  AccountBalanceWallet,
  Science,
  Handshake,
  CorporateFare,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const EduColors = {
  primaryGreen: '#1a3e36',
  background: '#f4f7f6',
  cardWhite: '#ffffff',
  accentGreen: '#4caf50',
  textGrey: '#666666',
  chartGreen: '#2e7d32',
  chartLight: '#a5d6a7',
  warning: '#ff9800',
  info: '#2196f3',
  success: '#4caf50'
};

const EduFundingData = [
  { month: 'Jan', amount: 400000, goal: 350000, startups: 5 },
  { month: 'Feb', amount: 800000, goal: 600000, startups: 8 },
  { month: 'Mar', amount: 600000, goal: 750000, startups: 6 },
  { month: 'Apr', amount: 1200000, goal: 900000, startups: 10 },
  { month: 'May', amount: 1900000, goal: 1500000, startups: 12 },
  { month: 'Jun', amount: 2400000, goal: 2000000, startups: 15 },
];

const EduSectorData = [
  { name: 'EdTech', value: 40, startups: 18, funding: '₹1.2Cr' },
  { name: 'FinTech', value: 25, startups: 11, funding: '₹85L' },
  { name: 'SaaS', value: 20, startups: 9, funding: '₹65L' },
  { name: 'E-commerce', value: 15, startups: 7, funding: '₹45L' },
];

const EduStageData = [
  { stage: 'Ideation', count: 24, avgFunding: '₹50K', successRate: '15%' },
  { stage: 'Prototype', count: 14, avgFunding: '₹2L', successRate: '35%' },
  { stage: 'MVP', count: 8, avgFunding: '₹5L', successRate: '60%' },
  { stage: 'Scaling', count: 6, avgFunding: '₹15L', successRate: '85%' },
];

const EduMonthlyMetrics = [
  { metric: 'New Applications', value: 28, change: '+12%', icon: <Groups /> },
  { metric: 'Investor Meetings', value: 45, change: '+8%', icon: <Handshake /> },
  { metric: 'Demo Days', value: 3, change: '0%', icon: <EmojiEvents /> },
  { metric: 'Alumni Engagement', value: 18, change: '+5%', icon: <School /> },
];

const EduTopInvestors = [
  { name: 'Sequoia Capital', investments: 8, total: '₹1.2Cr', focus: 'Tech' },
  { name: 'Accel Partners', investments: 6, total: '₹85L', focus: 'SaaS' },
  { name: 'Blume Ventures', investments: 5, total: '₹65L', focus: 'FinTech' },
  { name: 'AngelList India', investments: 12, total: '₹95L', focus: 'Mixed' },
];

const EduRows = [
  {
    id: 1,
    name: 'EcoDrive AI',
    startup: 'EcoDrive AI',
    founder: 'Arjun V.',
    sector: 'CleanTech',
    stage: 'MVP',
    funding: '₹2,50,000',
    growth: 25
  },
  {
    id: 2,
    name: 'HealthTech Buddy',
    startup: 'HealthTech Buddy',
    founder: 'Sara Khan',
    sector: 'HealthTech',
    stage: 'Scaling',
    funding: '₹12,00,000',
    growth: 42
  },
  {
    id: 3,
    name: 'EduFlow',
    startup: 'EduFlow',
    founder: 'Leo Das',
    sector: 'EdTech',
    stage: 'Ideation',
    funding: '₹50,000',
    growth: 8
  },
  {
    id: 4,
    name: 'SolarGrid',
    startup: 'SolarGrid',
    founder: 'Meera R.',
    sector: 'Energy',
    stage: 'Scaling',
    funding: '₹8,40,000',
    growth: 35
  },
  {
    id: 5,
    name: 'AgriIntel',
    startup: 'AgriIntel',
    founder: 'Rajesh K.',
    sector: 'AgriTech',
    stage: 'Prototype',
    funding: '₹1,20,000',
    growth: 18
  },
];

const EduColumns = [
  {
    field: 'startup',
    headerName: 'Startup Name',
    flex: 1.2,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: EduColors.primaryGreen + '20', color: EduColors.primaryGreen }}>
          {params.row.startup ? params.row.startup[0] : '?'}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight="600" color={EduColors.primaryGreen}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {params.row.founder}
          </Typography>
        </Box>
      </Stack>
    )
  },
  {
    field: 'sector',
    headerName: 'Sector',
    flex: 0.8,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          bgcolor: `${EduColors.primaryGreen}10`,
          color: EduColors.primaryGreen,
          fontWeight: 'bold'
        }}
      />
    )
  },
  {
    field: 'stage',
    headerName: 'Stage',
    flex: 0.8,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          bgcolor: params.value === 'Scaling' ? '#e8f5e9' :
            params.value === 'MVP' ? '#e3f2fd' :
              params.value === 'Prototype' ? '#fff3e0' : '#f5f5f5',
          color: params.value === 'Scaling' ? EduColors.chartGreen :
            params.value === 'MVP' ? EduColors.info :
              params.value === 'Prototype' ? EduColors.warning : EduColors.textGrey,
          fontWeight: 'bold',
          borderRadius: '6px'
        }}
      />
    )
  },
  {
    field: 'funding',
    headerName: 'Funding',
    flex: 0.8,
    renderCell: (params) => (
      <Typography variant="body2" fontWeight="700" color={EduColors.primaryGreen}>
        {params.value}
      </Typography>
    )
  },
  {
    field: 'growth',
    headerName: 'Growth',
    flex: 0.7,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={0.5}>
        {params.value > 0 ? (
          <ArrowUpward sx={{ fontSize: 16, color: EduColors.accentGreen }} />
        ) : (
          <ArrowDownward sx={{ fontSize: 16, color: '#f44336' }} />
        )}
        <Typography variant="body2" color={params.value > 0 ? EduColors.accentGreen : '#f44336'}>
          {params.value}%
        </Typography>
      </Stack>
    )
  },
];

const EduStatCard = ({ title, value, icon, subValue, trend, tooltip }) => (
  <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #edf2f0' }}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between">
        <Avatar sx={{ bgcolor: `${EduColors.primaryGreen}10`, color: EduColors.primaryGreen }}>
          {icon}
        </Avatar>
        <MuiTooltip title={tooltip || "More details"}>
          <IconButton size="small"><InfoOutlined sx={{ fontSize: 18, color: '#bdc3c7' }} /></IconButton>
        </MuiTooltip>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" fontWeight="800" color={EduColors.primaryGreen}>{value}</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
          <Typography variant="caption" sx={{
            bgcolor: trend === 'negative' ? '#ffebee' : '#e8f5e9',
            px: 1,
            py: 0.2,
            borderRadius: '4px',
            color: trend === 'negative' ? '#f44336' : EduColors.accentGreen,
            fontWeight: 'bold'
          }}>
            {subValue}
          </Typography>
          <Typography variant="caption" color="textSecondary">vs last month</Typography>
        </Stack>
      </Box>
      <Typography variant="body2" sx={{ mt: 2, color: EduColors.textGrey, fontSize: '0.75rem', fontWeight: 600 }}>{title}</Typography>
    </CardContent>
  </Card>
);

const EduMetricCard = ({ title, value, change, icon, color }) => (
  <Paper sx={{ p: 2.5, borderRadius: '12px', border: `1px solid ${EduColors.border}` }}>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar sx={{ bgcolor: color + '15', color: color, width: 40, height: 40 }}>
        {icon}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
          {title}
        </Typography>
        <Stack direction="row" alignItems="baseline" spacing={1}>
          <Typography variant="h6" fontWeight="700" color={EduColors.primaryGreen}>
            {value}
          </Typography>
          <Typography variant="caption" sx={{
            color: change.includes('+') ? EduColors.accentGreen : change.includes('-') ? '#f44336' : EduColors.textGrey,
            fontWeight: 'bold'
          }}>
            {change}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Paper>
);

const EduChartContainer = ({ children, height = 300, minHeight = 200 }) => {
  const eduContainerRef = useRef(null);

  return (
    <Box
      ref={eduContainerRef}
      sx={{
        height: height,
        minHeight: minHeight,
        width: '100%',
        minWidth: 0,
        position: 'relative'
      }}
    >
      <Box sx={{
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: minHeight
      }}>
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          {children}
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

const EduSimpleChartContainer = ({ children, height = 300 }) => (
  <Box sx={{ height: height, width: '100%', minWidth: 0, position: 'relative' }}>
    <ResponsiveContainer width="100%" height="100%" debounce={50}>
      {children}
    </ResponsiveContainer>
  </Box>
);

export default function EntrepreneurHub() {
  const [eduTimeRange, setEduTimeRange] = useState('6m');
  const [eduChartKey, setEduChartKey] = useState(0);

  useEffect(() => {
    const eduTimer = setTimeout(() => {
      setEduChartKey(prev => prev + 1);
    }, 100);

    return () => clearTimeout(eduTimer);
  }, []);

  return (
    <Box sx={{
      flexGrow: 1,
      p: { xs: 2, sm: 3, md: 4 },
      bgcolor: EduColors.background,
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>

      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ mb: 4 }} spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight="800" color={EduColors.primaryGreen} gutterBottom>
            Student Entrepreneurship
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarMonth sx={{ fontSize: 16, mr: 0.5 }} /> Academic Year 2025-26 | IIT Madras
            </Typography>
            <Chip
              icon={<LocalFireDepartment sx={{ fontSize: '16px !important' }} />}
              label="12 New Ideas this week"
              size="small"
              sx={{
                bgcolor: '#fff',
                fontWeight: 'bold',
                border: `1px solid ${EduColors.primaryGreen}20`
              }}
            />
          </Stack>
        </Box>
        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={eduTimeRange}
              label="Time Range"
              onChange={(e) => setEduTimeRange(e.target.value)}
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value="1m">Last Month</MenuItem>
              <MenuItem value="3m">Last 3 Months</MenuItem>
              <MenuItem value="6m">Last 6 Months</MenuItem>
              <MenuItem value="1y">Last Year</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<TrendingUp />} sx={{ color: EduColors.primaryGreen, borderColor: EduColors.primaryGreen, borderRadius: '8px', textTransform: 'none' }}>
            Export Reports
          </Button>
          <Button variant="contained" startIcon={<RocketLaunch />} sx={{ bgcolor: EduColors.primaryGreen, borderRadius: '8px', textTransform: 'none', px: 3, '&:hover': { bgcolor: '#0f2a24' } }}>
            Launch New Venture
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <EduStatCard
            title="Active Incubates"
            value="42"
            icon={<RocketLaunch fontSize="small" />}
            subValue="+14%"
            tooltip="Currently active startups in incubation"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EduStatCard
            title="Committed Funding"
            value="₹2.4Cr"
            icon={<MonetizationOn fontSize="small" />}
            subValue="+8.2%"
            tooltip="Total funding raised this academic year"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EduStatCard
            title="Student Founders"
            value="128"
            icon={<Groups fontSize="small" />}
            subValue="+5"
            tooltip="Active student entrepreneurs"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EduStatCard
            title="Success Rate"
            value="68%"
            icon={<Stars fontSize="small" />}
            subValue="+3.2%"
            tooltip="Startups that secured funding"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {EduMonthlyMetrics.map((metric, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <EduMetricCard
              title={metric.metric}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              color={EduColors.primaryGreen}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', p: 3, height: '92%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight="700" color={EduColors.primaryGreen}>
                  Funding Trajectory vs Goals
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Monthly capital raised vs targets (in ₹Lakhs)
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Chip
                  icon={<TrendingUp sx={{ fontSize: 14 }} />}
                  label="₹24L Avg/Month"
                  size="small"
                  sx={{ bgcolor: EduColors.primaryGreen, color: '#fff' }}
                />
                <Chip label={eduTimeRange} size="small" variant="outlined" />
              </Stack>
            </Stack>
            <EduSimpleChartContainer height={350}>
              <AreaChart data={EduFundingData} key={eduChartKey}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={EduColors.accentGreen} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={EduColors.accentGreen} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGoal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={EduColors.warning} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={EduColors.warning} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: EduColors.textGrey, fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: EduColors.textGrey, fontSize: 12 }}
                  tickFormatter={(value) => `₹${value / 100000}L`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value, name) => {
                    if (name === 'amount' || name === 'goal') return [`₹${value / 100000}L`, name === 'amount' ? 'Raised' : 'Target'];
                    return [value, name];
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="goal"
                  stroke={EduColors.warning}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fillOpacity={0.1}
                  fill="url(#colorGoal)"
                  name="Monthly Target"
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke={EduColors.accentGreen}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                  name="Funds Raised"
                />
                <Line
                  type="monotone"
                  dataKey="startups"
                  stroke={EduColors.info}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Active Startups"
                />
              </AreaChart>
            </EduSimpleChartContainer>
            <Stack direction="row" spacing={3} sx={{ mt: 2, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, bgcolor: EduColors.accentGreen, mr: 1, borderRadius: '2px' }} />
                <Typography variant="caption" color="textSecondary">Actual Funding</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, bgcolor: EduColors.warning, mr: 1, borderRadius: '2px', border: '1px dashed' }} />
                <Typography variant="caption" color="textSecondary">Monthly Target</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, bgcolor: EduColors.info, mr: 1, borderRadius: '2px' }} />
                <Typography variant="caption" color="textSecondary">Startup Count</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight="700" color={EduColors.primaryGreen}>
                  Startup Sector Analysis
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Distribution by industry & funding
                </Typography>
              </Box>
              <Chip
                label={`${EduSectorData.reduce((acc, curr) => acc + curr.startups, 0)} Startups`}
                size="small"
                sx={{ bgcolor: `${EduColors.primaryGreen}15`, color: EduColors.primaryGreen }}
              />
            </Stack>

            <EduSimpleChartContainer height={200}>
              <PieChart>
                <Pie
                  data={EduSectorData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {EduSectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={[EduColors.primaryGreen, EduColors.accentGreen, '#388e3c', '#81c784'][index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => {
                    if (name === 'value') return [`${value}%`, 'Market Share'];
                    if (name === 'startups') return [value, 'Startups'];
                    if (name === 'funding') return [value, 'Total Funding'];
                    return [value, name];
                  }}
                />
              </PieChart>
            </EduSimpleChartContainer>

            <Stack spacing={2} >
              {EduSectorData.map((item, index) => (
                <Box key={item.name} sx={{
                  p: 1,
                  borderRadius: '8px',
                  border: `1px solid ${EduColors.border}`,
                  bgcolor: index === 0 ? `${EduColors.primaryGreen}05` : 'transparent'
                }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: [EduColors.primaryGreen, EduColors.accentGreen, '#388e3c', '#81c784'][index] }} />
                      <Typography variant="body2" fontWeight="600" color={EduColors.primaryGreen}>
                        {item.name}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight="700">{item.value}%</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                    <Typography variant="caption" color="textSecondary">
                      {item.startups} Startups
                    </Typography>
                    <Typography variant="caption" fontWeight="600" color={EduColors.primaryGreen}>
                      {item.funding}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', p: 3, height: '92%' }}>
            <Typography variant="h6" fontWeight="700" color={EduColors.primaryGreen} sx={{ mb: 3 }}>
              Stage-wise Performance
            </Typography>
            <Stack spacing={3}>
              {EduStageData.map((stage, index) => (
                <Box key={stage.stage}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: `${EduColors.primaryGreen}10`, fontSize: '0.875rem' }}>
                        {stage.count}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="600">{stage.stage}</Typography>
                        <Typography variant="caption" color="textSecondary">Avg: {stage.avgFunding}</Typography>
                      </Box>
                    </Stack>
                    <Chip
                      label={stage.successRate}
                      size="small"
                      sx={{
                        bgcolor: parseFloat(stage.successRate) > 50 ? '#e8f5e9' : '#fff3e0',
                        color: parseFloat(stage.successRate) > 50 ? EduColors.chartGreen : EduColors.warning,
                        fontWeight: 'bold'
                      }}
                    />
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={parseFloat(stage.successRate)}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      bgcolor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: parseFloat(stage.successRate) > 50 ? EduColors.accentGreen : EduColors.warning,
                        borderRadius: 5
                      }
                    }}
                  />
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2" fontWeight="700" color={EduColors.primaryGreen} gutterBottom>
              Incubation Pipeline Health
            </Typography>
            <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 2 }}>
              <Box textAlign="center">
                <Typography variant="h5" fontWeight="800" color={EduColors.primaryGreen}>4.2</Typography>
                <Typography variant="caption" color="textSecondary">Avg Months to MVP</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" fontWeight="800" color={EduColors.accentGreen}>68%</Typography>
                <Typography variant="caption" color="textSecondary">Prototype Success</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" fontWeight="800" color={EduColors.info}>85%</Typography>
                <Typography variant="caption" color="textSecondary">Mentor Satisfaction</Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="700" color={EduColors.primaryGreen}>
                Top Investor Partners
              </Typography>
              <Button size="small" endIcon={<MoreVert />} sx={{ color: EduColors.textGrey }}>
                View All
              </Button>
            </Stack>

            <Stack spacing={2}>
              {EduTopInvestors.map((investor, index) => (
                <Paper key={investor.name} sx={{ p: 2, borderRadius: '8px', border: `1px solid ${EduColors.border}` }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: `${EduColors.primaryGreen}15`, color: EduColors.primaryGreen }}>
                        <CorporateFare />
                      </Avatar>
                      <Box> 
                        <Typography variant="body2" fontWeight="600">{investor.name}</Typography>
                        <Typography variant="caption" color="textSecondary">{investor.focus} Focus</Typography>
                      </Box>
                    </Stack>
                    <Box textAlign="right">
                      <Typography variant="body2" fontWeight="700" color={EduColors.primaryGreen}>
                        {investor.total}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {investor.investments} Deals
                      </Typography>
                    </Box>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(investor.investments / 12) * 100}
                    sx={{
                      mt: 1.5,
                      height: 4,
                      borderRadius: 2,
                      bgcolor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: EduColors.accentGreen,
                        borderRadius: 2
                      }
                    }}
                  />
                </Paper>
              ))}
            </Stack>

            <Paper sx={{ mt: 3, p: 2.5, bgcolor: '#e8f5e9', borderRadius: '12px', border: `1px solid ${EduColors.accentGreen}40` }}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <CheckCircle sx={{ color: EduColors.accentGreen, fontSize: 20, mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography variant="caption" fontWeight="700" color={EduColors.chartGreen}>
                    Investor Engagement High
                  </Typography>
                  <Typography variant="caption" color={EduColors.chartGreen} sx={{ display: 'block', mt: 0.5 }}>
                    15 new investor meetings scheduled this month
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0', bgcolor: '#fafafa' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight="700" color={EduColors.primaryGreen}>
                Portfolio Overview
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Top performing startups with real-time metrics
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button size="small" variant="outlined" sx={{ color: EduColors.primaryGreen, borderColor: EduColors.primaryGreen }}>
                Filter
              </Button>
              <Button size="small" endIcon={<MoreVert />} sx={{ color: EduColors.textGrey }}>
                Manage All
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ height: 420, width: '100%' }}>
          <DataGrid
            rows={EduRows}
            columns={EduColumns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 }
              },
              sorting: {
                sortModel: [{ field: 'funding', sort: 'desc' }]
              }
            }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: '#fafafa',
                color: EduColors.primaryGreen,
                fontWeight: '800',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f5f5f5',
                py: 2
              },
              '& .MuiDataGrid-row:hover': {
                bgcolor: '#f8faf9'
              },
              '& .MuiDataGrid-virtualScroller': {
                overflowX: 'hidden'
              }
            }}
          />
        </Box>
        <Box sx={{ p: 2.5, borderTop: '1px solid #f0f0f0', bgcolor: '#fafafa' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="textSecondary">
              Showing {EduRows.length} of 42 active incubates
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Warning sx={{ fontSize: 16, color: EduColors.warning }} />
              <Typography variant="caption" color="textSecondary">
                3 startups need immediate attention
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}