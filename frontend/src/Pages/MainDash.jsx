import React, { useState, useMemo } from 'react';
import {
  Grid, Paper, Typography, Box, Card, CardContent,
  Stack, Avatar, LinearProgress, IconButton, Button,
  Container, MenuItem, Select, FormControl, InputLabel,
  Chip, Fade, Grow, Zoom, Tooltip, Badge
} from '@mui/material';
import {
  RocketLaunch, Gavel, Handshake, Science,
  FilterList, CalendarToday, TrendingUp, MoreVert,
  BusinessCenter, CurrencyRupee, EmojiEvents,
  ArrowUpward, ArrowDownward, Share, Download,
  Refresh, TrendingFlat, Insights,
  School, Groups, AutoGraph, Diversity3
} from '@mui/icons-material';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

const EduColors = {
  primary: '#15573F',
  primaryLight: '#1E7D5F',
  primaryDark: '#0C3B2E',
  accent: '#2E8B57',
  accentLight: '#3CB371',
  accentLighter: '#4CAF50',
  lightGreen: '#F1F8F5',
  lighterGreen: '#F9FBF9',
  borderLight: '#D4E6DF',
  borderMedium: '#A9D0C3',
  darkGreen: '#0C3B2E',
  gradient: {
    primary: 'linear-gradient(135deg, #15573F 0%, #2E8B57 100%)',
    accent: 'linear-gradient(135deg, #2E8B57 0%, #4CAF50 100%)',
    card: 'linear-gradient(180deg, #FFFFFF 0%, #F9FBF9 100%)'
  },
  chartColors: [
    '#2E8B57', '#3CB371', '#66CDAA', '#98FB98', '#A9DFBF',
    '#7BC9A9', '#4CAF89', '#2E8B57', '#1E7D5F', '#0C3B2E'
  ]
};

const EduFilterOptions = {
  timePeriod: [
    { value: 'monthly', label: 'Last Month', icon: <CalendarToday /> },
    { value: 'quarterly', label: 'Last Quarter', icon: <TrendingUp /> },
    { value: 'yearly', label: 'Last Year', icon: <Insights /> }
  ],
  department: [
    { value: 'all', label: 'All Departments', icon: <Groups /> },
    { value: 'engineering', label: 'Engineering', icon: <RocketLaunch /> },
    { value: 'science', label: 'Science', icon: <Science /> },
    { value: 'biotech', label: 'Biotech', icon: <AutoGraph /> },
    { value: 'social', label: 'Social', icon: <Diversity3 /> }
  ]
};

const EduDataByFilter = {
  monthly: {
    stats: [
      { title: "Active Startups", value: "42", change: "+12%", trend: "up", icon: <RocketLaunch />, color: '#15573F', growth: 75 },
      { title: "IP / Patents", value: "18", change: "+8%", trend: "up", icon: <Gavel />, color: '#15573F', growth: 60 },
      { title: "Industry Partners", value: "24", change: "+15%", trend: "up", icon: <Handshake />, color: '#15573F', growth: 85 },
      { title: "Research Projects", value: "128", change: "+22%", trend: "up", icon: <Science />, color: '#15573F', growth: 90 },
      { title: "Students Placed", value: "552", change: "+5%", trend: "up", icon: <School />, color: '#15573F', growth: 45 }
    ],
    kpiStats: [
      { title: "Industry Collaborations", subtitle: "Active partnerships", value: "12", change: "+5%", icon: <BusinessCenter />, color: "#15573F", trendData: [8, 9, 10, 11, 12] },
      { title: "Total Funding", subtitle: "Raised this month", value: "₹1.2Cr", change: "+10%", icon: <CurrencyRupee />, color: "#15573F", trendData: [0.9, 1.0, 1.1, 1.2, 1.3] },
      { title: "Awards Received", subtitle: "National/International", value: "4", change: "+2%", icon: <EmojiEvents />, color: "#15573F", trendData: [3, 3, 4, 4, 4] },
      { title: "Success Rate", subtitle: "Graduated startups", value: "81%", change: "+3%", icon: <TrendingUp />, color: "#15573F", trendData: [78, 79, 80, 80, 81] }
    ],
    chartData: [
      { name: 'Wk 1', startups: 32, funding: 25, partnerships: 15 },
      { name: 'Wk 2', startups: 34, funding: 28, partnerships: 18 },
      { name: 'Wk 3', startups: 38, funding: 35, partnerships: 22 },
      { name: 'Wk 4', startups: 42, funding: 42, partnerships: 26 }
    ],
    pipelineData: [
      { stage: 'Ideation', value: 60, color: '#2196F3', count: 24 },
      { stage: 'Prototype', value: 35, color: '#FF9800', count: 14 },
      { stage: 'Market Ready', value: 12, color: '#4CAF50', count: 5 },
      { stage: 'Scaling', value: 5, color: '#9C27B0', count: 2 }
    ],
    fundingData: [
      { type: 'Seed', amount: 22, color: EduColors.chartColors[0], percentage: 45 },
      { type: 'Series A', amount: 14, color: EduColors.chartColors[1], percentage: 29 },
      { type: 'Series B', amount: 8, color: EduColors.chartColors[2], percentage: 16 },
      { type: 'Series C+', amount: 5, color: EduColors.chartColors[3], percentage: 10 }
    ],
    stageData: [
      { name: 'Tech', value: 30, color: EduColors.chartColors[0] },
      { name: 'Social', value: 22, color: EduColors.chartColors[1] },
      { name: 'Healthcare', value: 18, color: EduColors.chartColors[2] },
      { name: 'Education', value: 12, color: EduColors.chartColors[3] },
      { name: 'FinTech', value: 8, color: EduColors.chartColors[4] }
    ]
  },
  quarterly: {
    stats: [
      { title: "Active Startups", value: "58", change: "+25%", trend: "up", icon: <RocketLaunch />, color: '#15573F', growth: 82 },
      { title: "IP / Patents", value: "24", change: "+33%", trend: "up", icon: <Gavel />, color: '#15573F', growth: 78 },
      { title: "Industry Partners", value: "32", change: "+20%", trend: "up", icon: <Handshake />, color: '#15573F', growth: 88 },
      { title: "Research Projects", value: "156", change: "+18%", trend: "up", icon: <Science />, color: '#15573F', growth: 92 },
      { title: "Students Placed", value: "552", change: "+5%", trend: "up", icon: <School />, color: '#15573F', growth: 48 }
    ],
    kpiStats: [
      { title: "Industry Collaborations", subtitle: "Active partnerships", value: "48", change: "+12%", icon: <BusinessCenter />, color: "#15573F", trendData: [42, 45, 47, 48, 50] },
      { title: "Total Funding", subtitle: "Raised this quarter", value: "₹6.8Cr", change: "+24%", icon: <CurrencyRupee />, color: "#15573F", trendData: [4.8, 5.5, 6.2, 6.8, 7.5] },
      { title: "Awards Received", subtitle: "National/International", value: "24", change: "+18%", icon: <EmojiEvents />, color: "#15573F", trendData: [20, 21, 22, 23, 24] },
      { title: "Success Rate", subtitle: "Graduated startups", value: "84%", change: "+8%", icon: <TrendingUp />, color: "#15573F", trendData: [80, 81, 82, 83, 84] }
    ],
    chartData: [
      { name: 'Jan', startups: 32, funding: 45, partnerships: 22 },
      { name: 'Feb', startups: 38, funding: 52, partnerships: 26 },
      { name: 'Mar', startups: 45, funding: 65, partnerships: 30 },
      { name: 'Apr', startups: 58, funding: 82, partnerships: 35 }
    ],
    pipelineData: [
      { stage: 'Ideation', value: 65, color: '#2196F3', count: 28 },
      { stage: 'Prototype', value: 40, color: '#FF9800', count: 17 },
      { stage: 'Market Ready', value: 15, color: '#4CAF50', count: 6 },
      { stage: 'Scaling', value: 8, color: '#9C27B0', count: 3 }
    ],
    fundingData: [
      { type: 'Seed', amount: 28, color: EduColors.chartColors[0], percentage: 42 },
      { type: 'Series A', amount: 18, color: EduColors.chartColors[1], percentage: 27 },
      { type: 'Series B', amount: 12, color: EduColors.chartColors[2], percentage: 18 },
      { type: 'Series C+', amount: 8, color: EduColors.chartColors[3], percentage: 13 }
    ],
    stageData: [
      { name: 'Tech', value: 35, color: EduColors.chartColors[0] },
      { name: 'Social', value: 25, color: EduColors.chartColors[1] },
      { name: 'Healthcare', value: 20, color: EduColors.chartColors[2] },
      { name: 'Education', value: 15, color: EduColors.chartColors[3] },
      { name: 'FinTech', value: 10, color: EduColors.chartColors[4] }
    ]
  },
  yearly: {
    stats: [
      { title: "Active Startups", value: "142", change: "+45%", trend: "up", icon: <RocketLaunch />, color: '#15573F', growth: 92 },
      { title: "IP / Patents", value: "84", change: "+52%", trend: "up", icon: <Gavel />, color: '#15573F', growth: 88 },
      { title: "Industry Partners", value: "76", change: "+30%", trend: "up", icon: <Handshake />, color: '#15573F', growth: 85 },
      { title: "Research Projects", value: "412", change: "+25%", trend: "up", icon: <Science />, color: '#15573F', growth: 95 },
      { title: "Students Placed", value: "552", change: "+5%", trend: "up", icon: <School />, color: '#15573F', growth: 50 }
    ],
    kpiStats: [
      { title: "Industry Collaborations", subtitle: "Active partnerships", value: "156", change: "+35%", icon: <BusinessCenter />, color: "#15573F", trendData: [115, 130, 145, 156, 165] },
      { title: "Total Funding", subtitle: "Raised this year", value: "₹24Cr", change: "+40%", icon: <CurrencyRupee />, color: "#15573F", trendData: [17, 19, 21, 24, 27] },
      { title: "Awards Received", subtitle: "National/International", value: "92", change: "+22%", icon: <EmojiEvents />, color: "#15573F", trendData: [75, 80, 85, 92, 95] },
      { title: "Success Rate", subtitle: "Graduated startups", value: "89%", change: "+12%", icon: <TrendingUp />, color: "#15573F", trendData: [85, 86, 87, 88, 89] }
    ],
    chartData: [
      { name: 'Q1', startups: 85, funding: 180, partnerships: 85 },
      { name: 'Q2', startups: 105, funding: 220, partnerships: 105 },
      { name: 'Q3', startups: 125, funding: 260, partnerships: 125 },
      { name: 'Q4', startups: 142, funding: 300, partnerships: 142 }
    ],
    pipelineData: [
      { stage: 'Ideation', value: 75, color: '#2196F3', count: 32 },
      { stage: 'Prototype', value: 55, color: '#FF9800', count: 23 },
      { stage: 'Market Ready', value: 30, color: '#4CAF50', count: 13 },
      { stage: 'Scaling', value: 15, color: '#9C27B0', count: 6 }
    ],
    fundingData: [
      { type: 'Seed', amount: 65, color: EduColors.chartColors[0], percentage: 46 },
      { type: 'Series A', amount: 42, color: EduColors.chartColors[1], percentage: 30 },
      { type: 'Series B', amount: 22, color: EduColors.chartColors[2], percentage: 15 },
      { type: 'Series C+', amount: 13, color: EduColors.chartColors[3], percentage: 9 }
    ],
    stageData: [
      { name: 'Tech', value: 45, color: EduColors.chartColors[0] },
      { name: 'Social', value: 20, color: EduColors.chartColors[1] },
      { name: 'Healthcare', value: 25, color: EduColors.chartColors[2] },
      { name: 'Education', value: 10, color: EduColors.chartColors[3] },
      { name: 'FinTech', value: 15, color: EduColors.chartColors[4] }
    ]
  }
};

const EduStatCard = ({ title, value, change, trend, icon, color, growth, index }) => (
  <Grow in timeout={500 + (index * 100)}>
    <Card sx={{
      borderRadius: '16px',
      height: '100%',
      background: EduColors.gradient.card,
      border: `1px solid ${EduColors.borderLight}`,
      boxShadow: '0 4px 20px rgba(21, 87, 63, 0.08)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 32px rgba(21, 87, 63, 0.15)',
        borderColor: color,
        '& .hover-effect': {
          opacity: 1,
          transform: 'scale(1)'
        }
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${color}80, ${color})`,
        borderRadius: '16px 16px 0 0'
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Avatar sx={{
                bgcolor: `${color}15`,
                color: color,
                width: 48,
                height: 48,
                borderRadius: '12px',
                boxShadow: `0 4px 12px ${color}30`
              }}>
                {React.cloneElement(icon, { sx: { fontSize: 24 } })}
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{
                  color: EduColors.darkGreen,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  opacity: 0.8
                }}>
                  {title}
                </Typography>
                <Typography variant="h3" fontWeight={900} sx={{
                  color: EduColors.darkGreen,
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                  lineHeight: 1.1,
                  mt: 0.5
                }}>
                  {value}
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={growth}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: `${color}20`,
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${color}80, ${color})`,
                    borderRadius: 3
                  }
                }}
              />
            </Box>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                {trend === 'up' ? (
                  <ArrowUpward sx={{ fontSize: 18, color: '#2E7D32' }} />
                ) : trend === 'down' ? (
                  <ArrowDownward sx={{ fontSize: 18, color: '#D32F2F' }} />
                ) : (
                  <TrendingFlat sx={{ fontSize: 18, color: '#666' }} />
                )}
                <Typography variant="body2" sx={{
                  color: trend === 'up' ? '#2E7D32' : trend === 'down' ? '#D32F2F' : '#666',
                  fontWeight: 700
                }}>
                  {change}
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: '#666', fontWeight: 500 }}>
                Growth: {growth}%
              </Typography>
            </Stack>
          </Box>

          <Box className="hover-effect" sx={{
            position: 'absolute',
            bottom: -20,
            right: -20,
            width: 80,
            height: 80,
            background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
            borderRadius: '50%',
            opacity: 0,
            transition: 'all 0.5s ease'
          }} />
        </Stack>
      </CardContent>
    </Card>
  </Grow>
);

const EduKPIStatCard = ({ title, subtitle, value, change, icon, color, trendData, index }) => (
  <Zoom in timeout={800 + (index * 100)} style={{ transitionDelay: `${index * 100}ms` }}>
    <Card sx={{
      borderRadius: '16px',
      background: EduColors.gradient.card,
      border: `1px solid ${EduColors.borderLight}`,
      boxShadow: '0 6px 24px rgba(21, 87, 63, 0.08)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 32px rgba(21, 87, 63, 0.15)',
        '& .trend-line': {
          opacity: 0.3
        }
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
          <Avatar sx={{
            bgcolor: `${color}15`,
            color: color,
            width: 56,
            height: 56,
            borderRadius: '14px',
            boxShadow: `0 4px 16px ${color}30`
          }}>
            {React.cloneElement(icon, { sx: { fontSize: 28 } })}
          </Avatar>
          <Chip
            label={change}
            size="small"
            sx={{
              bgcolor: change.includes('+') ? '#E8F5E9' : '#FFEBEE',
              color: change.includes('+') ? '#2E7D32' : '#D32F2F',
              fontWeight: 800,
              fontSize: '0.7rem',
              height: 24,
              px: 1
            }}
          />
        </Stack>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h3" fontWeight={900} sx={{
            color: EduColors.darkGreen,
            fontSize: { xs: '2.5rem', sm: '3rem' },
            lineHeight: 1
          }}>
            {value}
          </Typography>
          <Typography variant="subtitle1" fontWeight={700} sx={{
            mt: 1,
            color: EduColors.darkGreen,
            fontSize: '1.1rem'
          }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{
            color: '#666',
            fontWeight: 500,
            display: 'block',
            mt: 0.5
          }}>
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Zoom>
);

const EduFilterBar = ({ filters, onFilterChange }) => (
  <Fade in timeout={600}>
    <Paper sx={{
      p: 3,
      mb: 4,
      borderRadius: '16px',
      background: EduColors.gradient.primary,
      border: `1px solid ${EduColors.borderMedium}`,
      boxShadow: '0 8px 32px rgba(21, 87, 63, 0.15)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ color: 'white', mb: 0.5 }}>
            Incubation Analytics Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Real-time insights and performance metrics for startup incubation
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ minWidth: { sm: 400 } }}>
          <FormControl size="medium" sx={{ minWidth: 180, background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
            <InputLabel sx={{ color: 'rgba(255,255,255,0.8)' }}>Time Period</InputLabel>
            <Select
              value={filters.timePeriod}
              label="Time Period"
              onChange={(e) => onFilterChange('timePeriod', e.target.value)}
              sx={{
                color: 'white',
                '& .MuiSelect-icon': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' }
              }}
            >
              {EduFilterOptions.timePeriod.map(opt => (
                <MenuItem key={opt.value} value={opt.value} sx={{ color: EduColors.darkGreen }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {opt.icon}
                    <Typography>{opt.label}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="medium" sx={{ minWidth: 180, background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
            <InputLabel sx={{ color: 'rgba(255,255,255,0.8)' }}>Department</InputLabel>
            <Select
              value={filters.department}
              label="Department"
              onChange={(e) => onFilterChange('department', e.target.value)}
              sx={{
                color: 'white',
                '& .MuiSelect-icon': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' }
              }}
            >
              {EduFilterOptions.department.map(opt => (
                <MenuItem key={opt.value} value={opt.value} sx={{ color: EduColors.darkGreen }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {opt.icon}
                    <Typography>{opt.label}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Tooltip title="Refresh Data">
            <IconButton sx={{ color: 'white', background: 'rgba(255,255,255,0.1)' }}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export Report">
            <IconButton sx={{ color: 'white', background: 'rgba(255,255,255,0.1)' }}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share Dashboard">
            <IconButton sx={{ color: 'white', background: 'rgba(255,255,255,0.1)' }}>
              <Share />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  </Fade>
);

export default function MainDash() {
  const [eduFilters, setEduFilters] = useState({ timePeriod: 'quarterly', department: 'all' });
  const [eduActiveMetric, setEduActiveMetric] = useState('startups');

  const handleEduFilterChange = (type, val) => setEduFilters(prev => ({ ...prev, [type]: val }));

  const eduCurrentData = useMemo(() => {
    return EduDataByFilter[eduFilters.timePeriod] || EduDataByFilter.quarterly;
  }, [eduFilters.timePeriod]);

  return (
    <Box sx={{
      flexGrow: 1,
      minHeight: '100vh', 
      background: `linear-gradient(135deg, ${EduColors.lighterGreen} 0%, ${EduColors.lightGreen} 100%)`,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: `linear-gradient(135deg, ${EduColors.primary}15 0%, transparent 100%)`,
        zIndex: 0
      }
    }}>
      <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 4 }, py: 4 }}>

        <EduFilterBar filters={eduFilters} onFilterChange={handleEduFilterChange} />

        {/* Top Stats Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {eduCurrentData.stats.map((stat, i) => (
            <Grid item xs={12} sm={6} md={2.4} key={i}>
              <EduStatCard {...stat} index={i} />
            </Grid>
          ))}
        </Grid>

        <Fade in timeout={800}>
          <Paper sx={{
            p: 4,
            mb: 4,
            borderRadius: '20px',
            background: EduColors.gradient.card,
            border: `1px solid ${EduColors.borderLight}`,
            boxShadow: '0 12px 40px rgba(21, 87, 63, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h5" fontWeight={800} color={EduColors.darkGreen} gutterBottom>
                  Growth Trends & Performance
                </Typography>
                <Typography variant="body2" color="#666">
                  Track your incubation center's progress over time
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                {['startups', 'funding', 'partnerships'].map(metric => (
                  <Chip
                    key={metric}
                    label={metric.charAt(0).toUpperCase() + metric.slice(1)}
                    onClick={() => setEduActiveMetric(metric)}
                    sx={{
                      bgcolor: eduActiveMetric === metric ? EduColors.accent : `${EduColors.accent}15`,
                      color: eduActiveMetric === metric ? 'white' : EduColors.accent,
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: eduActiveMetric === metric ? EduColors.accentLight : `${EduColors.accent}25`
                      }
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={eduCurrentData.chartData}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={EduColors.accent} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={EduColors.accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: `1px solid ${EduColors.borderLight}`,
                      background: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={eduActiveMetric}
                    stroke={EduColors.accent}
                    strokeWidth={3}
                    fill="url(#colorGradient)"
                    dot={{
                      r: 4,
                      strokeWidth: 2,
                      stroke: EduColors.accent,
                      fill: 'white'
                    }}
                    activeDot={{
                      r: 6,
                      strokeWidth: 2,
                      stroke: EduColors.accentDark,
                      fill: EduColors.accent
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey={eduActiveMetric}
                    stroke={EduColors.accentDark}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Fade>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight={800} color={EduColors.darkGreen} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            Key Performance Indicators
          </Typography>
          <Grid container spacing={3}>
            {eduCurrentData.kpiStats.map((stat, i) => (
              <Grid item xs={12} sm={6} lg={3} key={i}>
                <EduKPIStatCard {...stat} index={i} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Fade in timeout={1000}>
              <Paper sx={{
                p: 4,
                height: '85%',
                borderRadius: '20px',
                background: EduColors.gradient.card,
                border: `1px solid ${EduColors.borderLight}`,
                boxShadow: '0 8px 32px rgba(21, 87, 63, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 48px rgba(21, 87, 63, 0.12)'
                }
              }}>
                <Typography variant="h6" fontWeight={800} color={EduColors.darkGreen} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  Incubation Pipeline
                </Typography>
                {eduCurrentData.pipelineData.map((item, index) => (
                  <Box key={item.stage} sx={{ mb: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ color: EduColors.darkGreen }}>
                        {item.stage}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" fontWeight={700} color={item.color}>
                          {item.value}%
                        </Typography>
                        <Badge
                          badgeContent={item.count}
                          sx={{
                            '& .MuiBadge-badge': {
                              bgcolor: item.color,
                              color: 'white',
                              fontSize: '0.6rem',
                              height: 18,
                              minWidth: 18
                            }
                          }}
                        />
                      </Stack>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: `${item.color}20`,
                        '& .MuiLinearProgress-bar': {
                          background: `linear-gradient(90deg, ${item.color}80, ${item.color})`,
                          borderRadius: 4
                        }
                      }}
                    />
                  </Box>
                ))}
              </Paper>
            </Fade>
          </Grid>

          <Grid item xs={12} md={4}>
            <Fade in timeout={1200}>
              <Paper sx={{
                p: 4,
                borderRadius: '20px',
                background: EduColors.gradient.card,
                border: `1px solid ${EduColors.borderLight}`,
                boxShadow: '0 8px 32px rgba(21, 87, 63, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 48px rgba(21, 87, 63, 0.12)'
                }
              }}>
                <Typography variant="h6" fontWeight={800} color={EduColors.darkGreen} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  Funding Distribution
                </Typography>
                <Box sx={{ height: 280, mb: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={eduCurrentData.fundingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" vertical={false} />
                      <XAxis
                        dataKey="type"
                        fontSize={12}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#666' }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#666', fontSize: 12 }}
                      />
                      <RechartsTooltip
                        formatter={(value) => [`${value} startups`, 'Count']}
                        contentStyle={{
                          borderRadius: '12px',
                          border: `1px solid ${EduColors.borderLight}`,
                          background: 'white'
                        }}
                      />
                      <Bar
                        dataKey="amount"
                        radius={[8, 8, 0, 0]}
                        barSize={50}
                      >
                        {eduCurrentData.fundingData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            style={{
                              transition: 'all 0.3s ease',
                              cursor: 'pointer'
                            }}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="#666">
                    Total startups funded: {eduCurrentData.fundingData.reduce((sum, item) => sum + item.amount, 0)}
                  </Typography>
                  <Chip
                    label="Trending ↗"
                    size="small"
                    sx={{
                      bgcolor: `${EduColors.accent}15`,
                      color: EduColors.accent,
                      fontWeight: 600
                    }}
                  />
                </Stack>
              </Paper>
            </Fade>
          </Grid>

          <Grid item xs={12} md={4}>
            <Fade in timeout={1400}>
              <Paper sx={{
                p: 4,
                height: '85%',
                borderRadius: '20px',
                background: EduColors.gradient.card,
                border: `1px solid ${EduColors.borderLight}`,
                boxShadow: '0 8px 32px rgba(21, 87, 63, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 48px rgba(21, 87, 63, 0.12)'
                }
              }}>
                <Typography variant="h6" fontWeight={800} color={EduColors.darkGreen} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  Startup Categories
                </Typography>
                <Box sx={{ height: 280, position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={eduCurrentData.stageData}
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={(entry) => `${entry.name} (${entry.value})`}
                        labelLine={false}
                      >
                        {eduCurrentData.stageData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="white"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        formatter={(value, name) => [`${value} startups`, name]}
                        contentStyle={{
                          borderRadius: '12px',
                          border: `1px solid ${EduColors.borderLight}`,
                          background: 'white'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                  }}>
                    <Typography variant="h4" fontWeight={800} color={EduColors.darkGreen}>
                      {eduCurrentData.stageData.reduce((sum, item) => sum + item.value, 0)}
                    </Typography>
                    <Typography variant="caption" color="#666">
                      Total Categories
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>

        <Fade in timeout={1600}>
          <Paper sx={{
            mt: 4,
            p: 2,
            borderRadius: '16px',
            background: `linear-gradient(135deg, ${EduColors.primary} 0%, ${EduColors.accent} 100%)`,
            border: `1px solid ${EduColors.borderMedium}`,
            boxShadow: '0 8px 32px rgba(21, 87, 63, 0.2)'
          }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                Last updated: Just now • Auto-refresh in 30s
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': { borderColor: 'white' }
                  }}
                >
                  Generate Report
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    background: 'white',
                    color: EduColors.primary,
                    '&:hover': { background: 'rgba(255,255,255,0.9)' }
                  }}
                >
                  Download Full Data
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}