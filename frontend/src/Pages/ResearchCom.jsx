import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Stack,
  Button, Avatar, Chip, Paper, Grid, LinearProgress,
  Divider, IconButton, Tooltip as MuiTooltip
} from '@mui/material';
import {
  Science,
  TrendingUp,
  Download,
  CheckCircle,
  Handshake,
  EmojiEvents,
  InfoOutlined,
  RocketLaunch,
  CalendarMonth,
  MoreVert
} from '@mui/icons-material';

const EduColors = {
  primaryGreen: '#1a3e36',
  background: '#f4f7f6',
  cardWhite: '#ffffff',
  accentGreen: '#1a3e36',
  textGrey: '#666666',
  chartGreen: '#2e7d32',
  chartLight: '#a5d6a7',
  info: '#2196f3',
  warning: '#ff9800',
  danger: '#f44336',
  secondary: '#00c853'
};

const EduStats = [
  { eduLabel: 'Active Patents', eduValue: '36', eduGrowth: '+12%', eduIcon: <Science />, eduColor: EduColors.info },
  { eduLabel: 'Tech Transfers', eduValue: '18', eduGrowth: '+8%', eduIcon: <Handshake />, eduColor: EduColors.accentGreen },
  { eduLabel: 'Royalty Revenue', eduValue: '₹8.5Cr', eduGrowth: '+25%', eduIcon: <TrendingUp />, eduColor: EduColors.secondary },
  { eduLabel: 'Spin-offs', eduValue: '12', eduGrowth: '+3', eduIcon: <EmojiEvents />, eduColor: EduColors.warning },
];

const EduTrlData = [
  { eduName: 'Discovery (1-3)', eduValue: 45, eduColor: '#90caf9' },
  { eduName: 'Development (4-6)', eduValue: 30, eduColor: '#ffb74d' },
  { eduName: 'Deployment (7-9)', eduValue: 25, eduColor: EduColors.accentGreen },
];

const EduProjects = [
  { eduId: 1, eduName: 'Graphene Water Filter', eduPi: 'Dr. Sarah J.', eduTrl: 7, eduStatus: 'Pilot', eduProgress: 70 },
  { eduId: 2, eduName: 'AI Crop Diagnostics', eduPi: 'Prof. Ram K.', eduTrl: 9, eduStatus: 'Licensed', eduProgress: 100 },
  { eduId: 3, eduName: 'Insulin Pump', eduPi: 'Dr. Amit V.', eduTrl: 4, eduStatus: 'Testing', eduProgress: 40 },
  { eduId: 4, eduName: 'Smart Water System', eduPi: 'Dr. Priya S.', eduTrl: 6, eduStatus: 'Dev', eduProgress: 60 },
];

const EduSpinoffs = [
  { eduName: 'AquaPure Tech', eduFounder: 'Dr. Sarah J.', eduStage: 'Series A', eduFunding: '₹2.5Cr', eduYear: 2022 },
  { eduName: 'CropIntel AI', eduFounder: 'Prof. Ram K.', eduStage: 'Seed', eduFunding: '₹45L', eduYear: 2023 },
  { eduName: 'MedTech Solutions', eduFounder: 'Dr. Amit V.', eduStage: 'Pre-seed', eduFunding: '₹10L', eduYear: 2024 },
];

const EduStatCard = ({ eduLabel, eduValue, eduGrowth, eduIcon, eduColor }) => (
  <Card sx={{
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    border: '1px solid #edf2f0',
    height: '100%'
  }}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between">
        <Avatar sx={{
          bgcolor: `${eduColor}15`,
          color: eduColor,
          width: 48,
          height: 48
        }}>
          {eduIcon}
        </Avatar>
        <MuiTooltip title="More details">
          <IconButton size="small">
            <InfoOutlined sx={{ fontSize: 18, color: '#bdc3c7' }} />
          </IconButton>
        </MuiTooltip>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" fontWeight="800" color={EduColors.primaryGreen}>
          {eduValue}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
          <Typography variant="caption" sx={{
            bgcolor: '#e8f5e9',
            px: 1,
            py: 0.2,
            borderRadius: '4px',
            color: EduColors.accentGreen,
            fontWeight: 'bold'
          }}>
            {eduGrowth}
          </Typography>
          <Typography variant="caption" color="textSecondary">vs last month</Typography>
        </Stack>
      </Box>
      <Typography variant="body2" sx={{
        mt: 2,
        color: EduColors.textGrey,
        fontSize: '0.75rem',
        fontWeight: 600
      }}>
        {eduLabel}
      </Typography>
    </CardContent>
  </Card>
);

const EduProjectCard = ({ eduProject }) => (
  <Card sx={{
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    border: '1px solid #edf2f0',
    '&:hover': {
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      transform: 'translateY(-2px)'
    },
    transition: 'all 0.3s ease'
  }}>
    <CardContent>
      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="start">
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="700" color={EduColors.primaryGreen}>
              {eduProject.eduName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {eduProject.eduPi}
            </Typography>
          </Box>
          <Chip
            label={`TRL ${eduProject.eduTrl}`}
            size="small"
            sx={{
              bgcolor: eduProject.eduTrl >= 7 ? '#e8f5e9' : '#e3f2fd',
              color: eduProject.eduTrl >= 7 ? EduColors.chartGreen : EduColors.info,
              fontWeight: 'bold',
              borderRadius: '6px'
            }}
          />
        </Stack>

        <Box>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="caption" fontWeight="600" color={EduColors.textGrey}>
              Progress
            </Typography>
            <Typography variant="caption" fontWeight="bold" color={EduColors.accentGreen}>
              {eduProject.eduProgress}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={eduProject.eduProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: '#f0f0f0',
              '& .MuiLinearProgress-bar': {
                bgcolor: EduColors.accentGreen,
                borderRadius: 4
              }
            }}
          />
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Chip
            label={eduProject.eduStatus}
            size="small"
            sx={{
              bgcolor: '#f0f7f6',
              color: EduColors.primaryGreen,
              fontWeight: 'bold',
              border: '1px solid #e0e0e0'
            }}
          />
          <Button
            size="small"
            sx={{
              color: EduColors.primaryGreen,
              fontWeight: '600',
              textTransform: 'none',
              '&:hover': { bgcolor: `${EduColors.primaryGreen}10` }
            }}
          >
            View Details →
          </Button>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

const EduSpinoffCard = ({ eduSpinoff }) => (
  <Card sx={{
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    background: `linear-gradient(135deg, ${EduColors.primaryGreen} 0%, #2d5a4f 100%)`,
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 32px rgba(26, 62, 54, 0.2)',
    },
    transition: 'all 0.3s ease'
  }}>
    <CardContent>
      <Stack spacing={2.5}>
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 0.5 }}>
                {eduSpinoff.eduName}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Founded {eduSpinoff.eduYear}
              </Typography>
            </Box>
            <Box sx={{
              p: 1,
              bgcolor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px'
            }}>
              <EmojiEvents sx={{ fontSize: 20 }} />
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 0.5 }}>
              Founder
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {eduSpinoff.eduFounder}
            </Typography>
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 0.5 }}>
                Stage
              </Typography>
              <Chip
                label={eduSpinoff.eduStage}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              />
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 0.5 }}>
                Funding
              </Typography>
              <Typography variant="body2" fontWeight="700" sx={{ color: EduColors.secondary }}>
                {eduSpinoff.eduFunding}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

const EduTRLChart = () => (
  <Card sx={{
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    height: '100%'
  }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h6" fontWeight="700" color={EduColors.primaryGreen}>
            Research Maturity Distribution
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Technology Readiness Levels
          </Typography>
        </Box>
        <Chip
          label="TRL 1-9"
          size="small"
          sx={{
            bgcolor: `${EduColors.primaryGreen}15`,
            color: EduColors.primaryGreen,
            fontWeight: 'bold'
          }}
        />
      </Stack>

      <Stack spacing={3}>
        {EduTrlData.map((eduItem, eduIdx) => (
          <Box key={eduIdx}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" fontWeight="600" color={EduColors.primaryGreen}>
                {eduItem.eduName}
              </Typography>
              <Typography variant="body2" fontWeight="700" sx={{ color: eduItem.eduColor }}>
                {eduItem.eduValue}%
              </Typography>
            </Stack>
            <Box sx={{
              height: 10,
              borderRadius: 4,
              bgcolor: '#f0f0f0',
              overflow: 'hidden'
            }}>
              <Box sx={{
                height: '100%',
                width: `${eduItem.eduValue}%`,
                bgcolor: eduItem.eduColor,
                borderRadius: 4,
                transition: 'width 0.5s ease'
              }} />
            </Box>
          </Box>
        ))}
      </Stack>

      <Paper sx={{
        mt: 3,
        p: 2.5,
        bgcolor: '#e8f5e9',
        borderRadius: '12px',
        border: `1px solid ${EduColors.accentGreen}40`
      }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <CheckCircle sx={{
            color: EduColors.accentGreen,
            fontSize: 20,
            mt: 0.5,
            flexShrink: 0
          }} />
          <Box>
            <Typography variant="caption" fontWeight="700" color={EduColors.chartGreen}>
              Ready for Industry Matching
            </Typography>
            <Typography variant="caption" color={EduColors.chartGreen} sx={{ display: 'block', mt: 0.5 }}>
              2 projects ready for commercialization (TRL 7+)
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </CardContent>
  </Card>
);

export default function ResearchCom() {
  return (
    <Box sx={{ p: 4, bgcolor: EduColors.background, minHeight: '100vh' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        sx={{ mb: 4 }}
        spacing={2}
      >
        <Box>
          <Typography variant="h4" fontWeight="800" color={EduColors.primaryGreen} gutterBottom>
            Research Commercialization Hub
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarMonth sx={{ fontSize: 16, mr: 0.5 }} /> Academic Year 2025-26
            </Typography>
            <Chip
              icon={<RocketLaunch sx={{ fontSize: '16px !important' }} />}
              label="6 New Innovations this month"
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
          <Button
            variant="outlined"
            startIcon={<Download />}
            sx={{
              color: EduColors.primaryGreen,
              borderColor: EduColors.primaryGreen,
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                borderColor: EduColors.primaryGreen,
                bgcolor: `${EduColors.primaryGreen}08`
              }
            }}
          >
            Export Report
          </Button>
          <Button
            variant="contained"
            startIcon={<Handshake />}
            sx={{
              bgcolor: EduColors.primaryGreen,
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              '&:hover': { bgcolor: '#0f2a24' }
            }}
          >
            Submit Innovation
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {EduStats.map((eduStat, eduIdx) => (
          <Grid item xs={12} sm={6} md={3} key={eduIdx}>
            <EduStatCard {...eduStat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <EduTRLChart />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            height: '100%'
          }}>
            <Box sx={{
              p: 3,
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Box>
                <Typography variant="h6" fontWeight="700" color={EduColors.primaryGreen}>
                  Active Research Projects
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Real-time status of commercialization pipeline
                </Typography>
              </Box>
              <Button
                size="small"
                endIcon={<MoreVert />}
                sx={{ color: EduColors.textGrey }}
              >
                View All
              </Button>
            </Box>
            <CardContent>
              <Grid container spacing={2}>
                {EduProjects.map((eduProject) => (
                  <Grid item xs={12} sm={6} key={eduProject.eduId}>
                    <EduProjectCard eduProject={eduProject} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h6" fontWeight="700" color={EduColors.primaryGreen}>
              Startup Spin-offs from Research
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Companies launched from campus research
            </Typography>
          </Box>
          <Button
            variant="text"
            sx={{
              color: EduColors.primaryGreen,
              fontWeight: '600',
              textTransform: 'none'
            }}
          >
            View All →
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {EduSpinoffs.map((eduSpinoff, eduIdx) => (
            <Grid item xs={12} sm={6} md={4} key={eduIdx}>
              <EduSpinoffCard eduSpinoff={eduSpinoff} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {[
          { eduLabel: 'Patents Filed', eduValue: '56', eduIcon: <Science />, eduColor: EduColors.info },
          { eduLabel: 'Industry Partnerships', eduValue: '12+', eduIcon: <Handshake />, eduColor: EduColors.accentGreen },
          { eduLabel: 'Licensed Technologies', eduValue: '45+', eduIcon: <CheckCircle />, eduColor: EduColors.secondary },
          { eduLabel: 'Total Funding Generated', eduValue: '₹15Cr+', eduIcon: <TrendingUp />, eduColor: EduColors.warning },
        ].map((eduMetric, eduIdx) => (
          <Grid item xs={12} sm={6} md={3} key={eduIdx}>
            <Card sx={{
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid #edf2f0',
              textAlign: 'center',
              height: '100%'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Avatar sx={{
                  bgcolor: `${eduMetric.eduColor}15`,
                  color: eduMetric.eduColor,
                  width: 56,
                  height: 56,
                  mx: 'auto',
                  mb: 2
                }}>
                  {eduMetric.eduIcon}
                </Avatar>
                <Typography variant="h5" fontWeight="800" color={EduColors.primaryGreen} sx={{ mb: 0.5 }}>
                  {eduMetric.eduValue}
                </Typography>
                <Typography variant="caption" color={EduColors.textGrey} fontWeight="600">
                  {eduMetric.eduLabel}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}