import React, { useState } from 'react';
import {
  Box, Grid, Card, Typography, Button, Stack, Avatar,
  Chip, LinearProgress, MenuItem, Select, FormControl
} from '@mui/material';

import {
  CorporateFare, HistoryEdu, EmojiObjects,
  AccountBalanceWallet, TrendingUp
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

const EduThemeColors = {
  primary: '#003d29',     
  secondary: '#2e7d32',   
  accent: '#a5d6a7',      
  bg: '#f4f7f6',         
  white: '#ffffff',
  border: '#e0e6ed',
  success: '#2e7d32',
  warning: '#ed6c02',
  error: '#d32f2f',
  textMain: '#1a1a1a'
};

const EduCollabStats = [
  { eduLabel: 'Active MOUs', eduValue: '24', eduIcon: <HistoryEdu />, eduColor: EduThemeColors.primary, eduChange: '+3', eduTrend: 'up' },
  { eduLabel: 'CSR Grants (YTD)', eduValue: '₹42L', eduIcon: <AccountBalanceWallet />, eduColor: EduThemeColors.primary, eduChange: '+12%', eduTrend: 'up' },
  { eduLabel: 'Joint Patents', eduValue: '12', eduIcon: <EmojiObjects />, eduColor: EduThemeColors.primary, eduChange: '+2', eduTrend: 'up' },
  { eduLabel: 'Industry Mentors', eduValue: '85', eduIcon: <CorporateFare />, eduColor: EduThemeColors.primary, eduChange: '+8', eduTrend: 'up' },
];

const EduSectorEngagementData = [
  { sector: 'Technology', partnerships: 18, funding: 28 },
  { sector: 'Healthcare', partnerships: 12, funding: 15 },
  { sector: 'Manufacturing', partnerships: 8, funding: 22 },
  { sector: 'Finance', partnerships: 10, funding: 18 },
  { sector: 'Energy', partnerships: 6, funding: 12 },
];

const EduFundingTimeline = [
  { month: 'Jan', committed: 1200, utilized: 850 },
  { month: 'Feb', committed: 1500, utilized: 1100 },
  { month: 'Mar', committed: 1800, utilized: 1450 },
  { month: 'Apr', committed: 2200, utilized: 1800 },
  { month: 'May', committed: 2500, utilized: 2100 },
  { month: 'Jun', committed: 3000, utilized: 2600 },
];

const EduPartnershipTypes = [
  { name: 'Research Collaboration', value: 35, color: '#003d29' },
  { name: 'CSR Funding', value: 25, color: '#2e7d32' },
  { name: 'Infrastructure', value: 20, color: '#6bae71' },
  { name: 'Mentorship', value: 15, color: '#9fd9a1' },
  { name: 'Internship', value: 5, color: '#bbdabc' },
];

const EduIndustryRows = [
  { id: 1, partner: 'AWS', type: 'Cloud Credits', validity: 'Dec 2026', status: 'Active', utilization: 65, value: '₹50L' },
  { id: 2, partner: 'Siemens', type: 'Center of Excellence', validity: 'Mar 2028', status: 'Active', utilization: 40, value: '₹1.2Cr' },
  { id: 3, partner: 'HDFC Bank', type: 'CSR - Rural Fintech', validity: 'Jan 2026', status: 'Expiring Soon', utilization: 90, value: '₹35L' },
  { id: 4, partner: 'Tata Motors', type: 'EV Research Lab', validity: 'Sep 2027', status: 'Active', utilization: 75, value: '₹2.5Cr' },
];

const EduUpcomingEvents = [
  { id: 1, title: 'Microsoft R&D Visit', date: 'Jan 15', participants: 12, status: 'Confirmed' },
  { id: 2, title: 'AWS Cloud Workshop', date: 'Jan 22', participants: 25, status: 'Confirmed' },
  { id: 3, title: 'Siemens Industry 4.0', date: 'Jan 28', participants: 18, status: 'Pending' },
];

const EduStatCard = ({ eduLabel, eduValue, eduIcon, eduColor, eduChange, eduTrend }) => (
  <Card sx={{
    p: 3,
    borderRadius: '16px',
    border: `1px solid ${EduThemeColors.border}`,
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    bgcolor: EduThemeColors.white,
  }}>
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="text.secondary" fontWeight="500">{eduLabel}</Typography>
        <Avatar sx={{ bgcolor: `${eduColor}10`, color: eduColor, width: 32, height: 32 }}>
          {eduIcon}
        </Avatar>
      </Stack>
      <Typography variant="h4" fontWeight="700" color={EduThemeColors.textMain}>{eduValue}</Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Chip
          label={`${eduChange} today`}
          size="small"
          icon={<TrendingUp style={{ fontSize: '14px', color: EduThemeColors.success }} />}
          sx={{ bgcolor: '#e8f5e9', color: EduThemeColors.success, fontWeight: 'bold', height: 24 }}
        />
      </Stack>
    </Stack>
  </Card>
);

export default function IndustryCollaboration() {
  const [eduTimeFilter, setEduTimeFilter] = useState('6m');

  return (
    <Box sx={{ p: 4, bgcolor: EduThemeColors.bg, minHeight: '100vh' }}>

      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" color={EduThemeColors.primary} sx={{ letterSpacing: '-0.5px' }}>
            Industry Collaboration Hub
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Insights into corporate partnerships and sustainable funding
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={eduTimeFilter}
              onChange={(e) => setEduTimeFilter(e.target.value)}
              sx={{ bgcolor: 'white', borderRadius: '8px' }}
            >
              <MenuItem value="3m">3 Months</MenuItem>
              <MenuItem value="6m">6 Months</MenuItem>
              <MenuItem value="1y">1 Year</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" disableElevation sx={{
            bgcolor: EduThemeColors.primary,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': { bgcolor: "#012a1c" }
          }}>
            + Create New MOU
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {EduCollabStats.map((eduStat, eduI) => (
          <Grid item xs={12} sm={6} md={3} key={eduI}>
            <EduStatCard {...eduStat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: '16px', p: 3, mb: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <Typography variant="h6" fontWeight="700" color={EduThemeColors.primary} sx={{ mb: 3 }}>
              Funding Utilization Timeline
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={EduFundingTimeline}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}K`} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="committed" stroke={EduThemeColors.primary} strokeWidth={3} dot={{ r: 6, fill: EduThemeColors.primary }} />
                  <Line type="monotone" dataKey="utilized" stroke={EduThemeColors.secondary} strokeWidth={3} dot={{ r: 6, fill: EduThemeColors.secondary }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card>

          <Card sx={{ borderRadius: '16px', p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <Typography variant="h6" fontWeight="700" color={EduThemeColors.primary} sx={{ mb: 3 }}>
              Sector-wise Engagement
            </Typography>
            <Box sx={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EduSectorEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="sector" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{ fill: '#f1f8e9' }} />
                  <Bar dataKey="partnerships" fill={EduThemeColors.success} radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Card sx={{ borderRadius: '16px', p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <Typography variant="h6" fontWeight="700" color={EduThemeColors.primary} sx={{ mb: 2 }}>
                Partnership Distribution
              </Typography>
              <Box sx={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={EduPartnershipTypes} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {EduPartnershipTypes.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Stack spacing={1} sx={{ mt: 2 }}>
                {EduPartnershipTypes.map((type, i) => (
                  <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 10, height: 10, bgcolor: type.color, borderRadius: '2px' }} />
                      <Typography variant="caption" fontWeight="500">{type.name}</Typography>
                    </Stack>
                    <Typography variant="caption" fontWeight="bold">{type.value}%</Typography>
                  </Stack>
                ))}
              </Stack>
            </Card>

            <Card sx={{ borderRadius: '16px', p: 0, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <Box sx={{ p: 2, bgcolor: '#f8faf9', borderBottom: `1px solid ${EduThemeColors.border}` }}>
                <Typography variant="subtitle1" fontWeight="700">Recent Collaborations</Typography>
              </Box>
              <Stack spacing={0} divider={<Box sx={{ borderBottom: `1px solid ${EduThemeColors.border}` }} />}>
                {EduUpcomingEvents.map((event) => (
                  <Box key={event.id} sx={{ p: 2, '&:hover': { bgcolor: '#f1f8e9' }, cursor: 'pointer' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight="700">{event.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{event.date} • {event.participants} Members</Typography>
                      </Box>
                      <Chip label={event.status} size="small" sx={{ height: 20, fontSize: '10px', bgcolor: event.status === 'Confirmed' ? '#e8f5e9' : '#fff3e0', color: event.status === 'Confirmed' ? '#2e7d32' : '#ef6c00' }} />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
            <Box sx={{ p: 2.5, borderBottom: `1px solid ${EduThemeColors.border}` }}>
              <Typography variant="h6" fontWeight="700">Active Partnership Matrix</Typography>
            </Box>
            <Box sx={{ height: 400 }}>
              <DataGrid
                rows={EduIndustryRows}
                columns={[
                  {
                    field: 'partner', headerName: 'Partner Name', flex: 1, renderCell: (params) => (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ width: 28, height: 28, bgcolor: EduThemeColors.primary, fontSize: '0.75rem' }}>{params.value[0]}</Avatar>
                        <Typography variant="body2" fontWeight="600">{params.value}</Typography>
                      </Stack>
                    )
                  },
                  { field: 'type', headerName: 'Agreement Type', flex: 1 },
                  { field: 'value', headerName: 'Valuation', flex: 0.8 },
                  {
                    field: 'utilization', headerName: 'Budget Usage', flex: 1.2, renderCell: (params) => (
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="caption" fontWeight="bold">{params.value}%</Typography>
                        <LinearProgress variant="determinate" value={params.value} sx={{ height: 6, borderRadius: 3, bgcolor: '#eee', '& .MuiLinearProgress-bar': { bgcolor: EduThemeColors.secondary } }} />
                      </Box>
                    )
                  },
                  {
                    field: 'status', headerName: 'Status', flex: 0.7, renderCell: (params) => (
                      <Chip label={params.value} size="small" sx={{ bgcolor: params.value === 'Active' ? '#e8f5e9' : '#ffebee', color: params.value === 'Active' ? '#2e7d32' : '#c62828', fontWeight: 'bold' }} />
                    )
                  }
                ]}
                sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: '#f8faf9', color: EduThemeColors.primary, fontWeight: 'bold' } }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 