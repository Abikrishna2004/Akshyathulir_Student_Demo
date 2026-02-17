import React, { useState } from 'react';
import { styled, useTheme, useMediaQuery } from '@mui/material';
import { Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Tooltip, Badge } from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Person as ProfileIcon,
  Insights as StatsIcon,
  Gavel as PatentIcon,
  Handshake as IndustryIcon,
  Science as ResearchIcon,
  Hub as AlumniIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const EduDrawerWidth = 280;


const eduOpenedMixin = (theme) => ({
  width: EduDrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#1a3e36',
  color: '#fff',
});

const eduClosedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  backgroundColor: '#1a3e36',
  color: '#fff',
});

const EduStyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: open ? EduDrawerWidth : `calc(${theme.spacing(7)} + 1px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      ...(open ? eduOpenedMixin(theme) : eduClosedMixin(theme)),
    },
  }),
);

const eduMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
  { text: 'Student Entrepreneurship', icon: <StatsIcon />, path: '/stats' },
  { text: 'IP/Patent Filings', icon: <PatentIcon />, path: '/patents' },
  { text: 'Industry Collaboration', icon: <IndustryIcon />, path: '/collaboration' },
  { text: 'Research Commercialization', icon: <ResearchIcon />, path: '/research' },
  { text: 'Alumni Startup Network', icon: <AlumniIcon />, path: '/alumni' },
  { text: 'Placement Management', icon: <SchoolIcon />, path: '/placement' },
];

export default function Drawx() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [eduDesktopOpen, setEduDesktopOpen] = useState(false);
  const [eduMobileOpen, setEduMobileOpen] = useState(false);

  const eduNavigate = useNavigate();
  const eduLocation = useLocation();

  const handleEduDesktopEnter = () => setEduDesktopOpen(true);
  const handleEduDesktopLeave = () => setEduDesktopOpen(false);
  const handleEduMobileToggle = () => setEduMobileOpen(!eduMobileOpen);

  const eduDrawerContent = (isOpen) => (
    <>
      <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#fff', color: '#1a3e36' }}>🎓</Avatar>
        {isOpen && <Typography variant="h6" fontWeight="bold">Institutions</Typography>}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.96)' }} />

      <List sx={{ mt: 1 }}>
        {eduMenuItems.map((eduItem) => (
          <ListItem key={eduItem.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => {
                eduNavigate(eduItem.path);
                if (!isDesktop) {
                  setEduMobileOpen(false);
                }
              }}
              sx={{
                minHeight: 48,
                justifyContent: isOpen ? 'initial' : 'center',
                px: 2.5,
                bgcolor: eduLocation.pathname === eduItem.path ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                borderLeft: eduLocation.pathname === eduItem.path ? '4px solid #fff' : 'none',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                {eduItem.icon}
              </ListItemIcon>
              <ListItemText primary={eduItem.text} sx={{ opacity: isOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ marginTop: 'auto', mb: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.99)', mb: 1 }} />
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton sx={{ minHeight: 48, justifyContent: isOpen ? 'initial' : 'center', px: 2.5, color: '#fff', '&:hover': { color: '#ff6b6b' }, '&:active': { color: '#ff6b6b' } }}>
            <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: isOpen ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f4f7f6', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          display: { md: 'none' },
          bgcolor: '#1a3e36',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleEduMobileToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Institutions
          </Typography>
        </Toolbar>
      </AppBar>

      {isDesktop ? (
        <EduStyledDrawer
          variant="permanent"
          open={eduDesktopOpen}
          onMouseEnter={handleEduDesktopEnter}
          onMouseLeave={handleEduDesktopLeave}
        >
          {eduDrawerContent(eduDesktopOpen)}
        </EduStyledDrawer>
      ) : (
        <Drawer
          variant="temporary"
          open={eduMobileOpen}
          onClose={handleEduMobileToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: EduDrawerWidth,
              backgroundColor: '#1a3e36',
              color: '#fff',
            },
          }}
        >
          {eduDrawerContent(eduMobileOpen)}
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
        <Toolbar sx={{ display: { md: 'none' } }} />

        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          bgcolor: '#1a3e36',
          p: 2,
          borderRadius: 2,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <Typography variant="h5" fontWeight="bold" color="#fff">Educational Institutional Dashboard</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton aria-label="notifications" sx={{ color: 'white' }}>
              <Badge badgeContent={5} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Account settings">
              <IconButton size="small">
                <Avatar sx={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
            <IconButton sx={{ color: '#fff', '&:hover': { color: '#ff6b6b' }, '&:active': { color: '#ff6b6b' } }}><LogoutIcon /></IconButton>
          </Box>
        </Box> 

        <Outlet />
      </Box>
    </Box>
  );
}