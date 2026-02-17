import React, { useState, useEffect } from 'react';
import {
    Box, Grid, Paper, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Avatar, AvatarGroup,
    LinearProgress, Chip, Card, CardContent, TextField, MenuItem, Button,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const EDU_COLORS = {
    primary: '#1a3e36',
    secondary: '#8db596',
    background: '#f1f8f4',
    accent: '#4caf50'
};

const EduFormRow = ({ children }) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 } }}>
        {React.Children.map(children, (child) => (
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 0.5rem)', md: '1 1 auto' }, minWidth: '0', display: 'flex', alignItems: 'flex-start', '& > *': { width: '100%' } }}>
                {child}
            </Box>
        ))}
    </Box>
);

const PlaceMent = () => {
    const initialAddress = {
        country: '',
        state: '',
        district: '',
        city: '',
        pinCode: '',
    };
    const eduCompanyData = [
        { id: 1, name: 'TCS', role: 'System Engineer', students: 157, package: '7.5 LPA', growth: '+8%' },
        { id: 2, name: 'Infosys', role: 'Power Programmer', students: 90, package: '9.0 LPA', growth: '+12%' },
        { id: 3, name: 'Wipro', role: 'Project Engineer', students: 70, package: '6.5 LPA', growth: '+5%' },
        { id: 4, name: 'Cognizant', role: 'Analyst', students: 50, package: '6.0 LPA', growth: '+10%' },
        { id: 5, name: 'Accenture', role: 'Associate Software Engineer', students: 102, package: '8.2 LPA', growth: '+15%' },
    ];


    const eduToday = new Date().toISOString().split('T')[0];

    const eduDate = new Date();
    eduDate.setFullYear(eduDate.getFullYear() - 2);
    const eduTwoYearsAgo = eduDate.toISOString().split('T')[0];
    const [eduFormData, setEduFormData] = useState({
        startupName: '',
        legalStatus: '',
        dateOfEstablishment: '',
        primarySector: '',
        secondarySector: '',
        companyPAN: '',
        gstin: '',
        currentTeamSize: '',
        maleCount: '',
        femaleCount: '',
        companyWebsite: '',
        numberOfBranches: '1',
    });

    const [eduErrors, setEduErrors] = useState({});

    const eduHandleBranchCountChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setEduFormData({
                ...eduFormData,
                numberOfBranches: "",
                branchAddresses: [],
            });

            setEduErrors((prev) => ({
                ...prev,
                numberOfBranches: "Number of branches is required",
            }));
            return;
        }

        let count = Number(value);

        if (isNaN(count) || count < 1) {
            setEduErrors((prev) => ({
                ...prev,
                numberOfBranches: "Please enter a valid number (1-20)",
            }));
            return;
        }

        if (count > 20) {
            setEduErrors((prev) => ({
                ...prev,
                numberOfBranches: "Maximum allowed branches is 20",
            }));
            return;
        } else {
            setEduErrors((prev) => ({
                ...prev,
                numberOfBranches: "",
            }));
        }

        const updatedAddresses = [...eduFormData.branchAddresses];

        if (count > updatedAddresses.length) {
            for (let i = updatedAddresses.length; i < count; i++) {
                updatedAddresses.push({ ...initialAddress });
            }
        } else if (count < updatedAddresses.length) {
            updatedAddresses.length = count;
        }

        setEduFormData({
            ...eduFormData,
            numberOfBranches: value,
            branchAddresses: updatedAddresses,
        });
    };


    const eduHandleInputChange = (field) => (event) => {
        const value = event.target.value;

        setEduFormData((prev) => {
            const updated = { ...prev, [field]: value };

            const teamSize = Number(updated.currentTeamSize || 0);
            const male = Number(updated.maleCount || 0);
            const female = Number(updated.femaleCount || 0);

            if (teamSize > 0 && male + female > teamSize) {
                setEduErrors((prevErr) => ({
                    ...prevErr,
                    maleCount: "Male + Female employees cannot exceed team size",
                    femaleCount: "Male + Female employees cannot exceed team size",
                }));
            } else {
                setEduErrors((prevErr) => ({
                    ...prevErr,
                    maleCount: "",
                    femaleCount: "",
                }));
            }

            return updated;
        });

        if (eduErrors[field]) {
            setEduErrors((prevErr) => ({ ...prevErr, [field]: "" }));
        }
    };


    const eduValidateForm = () => {
        let tempErrors = {};
        let isValid = true;

        const checkRequired = (field, label) => {
            if (!eduFormData[field]) {
                tempErrors[field] = `${label} is required`;
                isValid = false;
            }
        };

        checkRequired('firstName', 'First Name');
        checkRequired('lastName', 'Last Name');
        checkRequired('email', 'Email');
        checkRequired('phone', 'Phone');
        checkRequired('dateOfBirth', 'DOB');
        checkRequired('gender', 'Gender');
        checkRequired('designation', 'Designation');

        checkRequired('startupName', 'Startup Name');
        checkRequired('legalStatus', 'Legal Status');
        checkRequired('dateOfEstablishment', 'Date of Est.');
        checkRequired('primarySector', 'Sector');
        checkRequired('companyPAN', 'PAN');
        checkRequired('currentTeamSize', 'Team Size');
        checkRequired('maleCount', 'Male Count');
        checkRequired('femaleCount', 'Female Count');
        checkRequired('numberOfBranches', 'Branches');

        checkRequired('founderName', 'Founder Name');
        checkRequired('founderEmail', 'Founder Email');
        checkRequired('founderPhone', 'Founder Phone');
        checkRequired('founderDOB', 'Founder DOB');
        checkRequired('founderGender', 'Founder Gender');

        if (eduFormData.dateOfEstablishment) {
            if (eduFormData.dateOfEstablishment < eduTwoYearsAgo) {
                tempErrors.dateOfEstablishment = "Startup must be less than 2 years old.";
                isValid = false;
            } else if (eduFormData.dateOfEstablishment > eduToday) {
                tempErrors.dateOfEstablishment = "Date cannot be in the future.";
                isValid = false;
            }
        }

        eduFormData.branchAddresses.forEach((addr, index) => {
            if (!addr.country) { tempErrors[`address_${index}_country`] = 'Required'; isValid = false; }
            if (!addr.state) { tempErrors[`address_${index}_state`] = 'Required'; isValid = false; }
            if (!addr.district) { tempErrors[`address_${index}_district`] = 'Required'; isValid = false; }
            if (!addr.city) { tempErrors[`address_${index}_city`] = 'Required'; isValid = false; }
            if (!addr.pinCode) { tempErrors[`address_${index}_pinCode`] = 'Required'; isValid = false; }
        });

        setEduErrors(tempErrors);
        return isValid;
    };

    const eduHandleSubmit = async () => {
        if (eduValidateForm()) {
            try {
                const payload = {
                    ...eduFormData,
                    currentTeamSize: parseInt(eduFormData.currentTeamSize) || 0,
                    maleCount: parseInt(eduFormData.maleCount) || 0,
                    femaleCount: parseInt(eduFormData.femaleCount) || 0,
                    numberOfBranches: parseInt(eduFormData.numberOfBranches) || 1
                };

                console.log("Sending data:", payload);

                const response = await fetch("http://localhost:8000/startup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Success:', data);
                    alert('Application Submitted Successfully!');
                    eduHandleReset();
                } else {
                    console.error('Submission Failed:', data);
                    alert('Submission Failed: ' + (data.detail || 'Unknown error'));
                }
            } catch (error) {
                console.error('Network Error:', error);
                alert('Network Error: Could not connect to the backend.');
            }
        } else {
            alert('Please correct errors before submitting.');
            console.log(eduErrors);
        }
    };

    const eduHandleReset = () => {
        setEduFormData({
            firstName: '', lastName: '', email: '', phone: '', linkedin: '', website: '', dateOfBirth: '', gender: '', designation: '',
            startupName: '', legalStatus: '', dateOfEstablishment: '', startupStage: '', primarySector: '', companyPAN: '', currentTeamSize: '', maleCount: '', femaleCount: '', gstin: '', companyWebsite: '', numberOfBranches: '1',
            branchAddresses: [{ ...initialAddress }],
            founderName: '', founderEmail: '', founderPhone: '', founderDOB: '', founderGender: '', founderLinkedIn: '', founderFacebook: '',
            fundingNeeded: '', mentorshipNeeded: '', technologySupport: '', incubationSpace: '',
            registrationNeeded: '',
            supportInterest: '', governmentSchemes: ''
        });
        setEduErrors({});
    };

    return (
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, backgroundColor: EDU_COLORS.background, minHeight: '100vh' }}>

            <Box sx={{ mb: { xs: 3, md: 4 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: { xs: 2, md: 0 } }}>
                <Typography variant="h4" fontWeight="800" color={EDU_COLORS.primary} sx={{ letterSpacing: "-0.5px", fontSize: { xs: "1.4rem", sm: "1.75rem", md: "2.125rem" } }}>
                    Career Launchpad
                </Typography>
                <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 3 }, flexWrap: 'wrap' }}>
                    {['THIS WEEK', 'THIS MONTH', '6 MONTHS'].map((tab) => (
                        <Typography key={tab} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, fontWeight: 'bold', color: EDU_COLORS.primary, cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
                            {tab}
                        </Typography>
                    ))}
                </Box>
            </Box>

            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4, position: 'relative' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PeopleIcon sx={{ color: EDU_COLORS.accent, mr: 1 }} />
                            <Typography variant="subtitle2" color="textSecondary">Students Placed</Typography>
                            <InfoOutlinedIcon sx={{ fontSize: 16, ml: 'auto', color: 'gray' }} />
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>375</Typography>
                        <Typography variant="caption" color="textSecondary">Out of 450 total students</Typography>
                        <Box sx={{ mt: 2 }}>
                            <LinearProgress variant="determinate" value={82} sx={{ height: 8, borderRadius: 5, backgroundColor: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: EDU_COLORS.accent } }} />
                            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>82.0% Placement Rate</Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, height: '78%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <BusinessIcon sx={{ color: EDU_COLORS.accent, mr: 1 }} />
                            <Typography variant="subtitle2" color="textSecondary">Top Companies</Typography>
                        </Box>
                        <AvatarGroup max={5} sx={{ justifyContent: 'center', mt: 2 }}>
                            <Avatar sx={{ bgcolor: EDU_COLORS.primary }}>TCS</Avatar>
                            <Avatar sx={{ bgcolor: EDU_COLORS.secondary }}>INF</Avatar>
                            <Avatar sx={{ bgcolor: EDU_COLORS.accent }}>WIP</Avatar>
                            <Avatar sx={{ bgcolor: EDU_COLORS.primary }}>COG</Avatar>
                            <Avatar sx={{ bgcolor: EDU_COLORS.secondary }}>ACC</Avatar>
                        </AvatarGroup>
                        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'gray' }}>Most Active Recruiters</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, height: '78%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <BusinessIcon sx={{ color: EDU_COLORS.accent, mr: 1 }} />
                            <Typography variant="subtitle2" color="textSecondary">Companies Registered</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>150</Typography>
                        <Chip icon={<TrendingUpIcon />} label="0%" size="small" sx={{ bgcolor: '#f1f8f4', color: EDU_COLORS.accent }} />
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>New tie-ups this season</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, height: '78%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <TrendingUpIcon sx={{ color: EDU_COLORS.accent, mr: 1 }} />
                            <Typography variant="subtitle2" color="textSecondary">Avg. Package</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>7.2 <small style={{ fontSize: '1rem' }}>LPA</small></Typography>
                        <Typography variant="caption" color="textSecondary">Highest: 42 LPA (Microsoft)</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: EDU_COLORS.primary, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Placement Company Details
            </Typography>
            <TableContainer component={Paper} sx={{ border: "2px solid #1f4d3a", overflow: { xs: 'auto', md: 'hidden' }, elevation: 0, mb: { xs: 3, md: 4 } }}>
                <Table>
                    <TableHead sx={{ backgroundColor: EDU_COLORS.primary }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.75rem', md: '1rem' }, padding: { xs: '0.75rem', md: '1rem' } }}>Company</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.75rem', md: '1rem' }, padding: { xs: '0.75rem', md: '1rem' } }}>Job Role</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.75rem', md: '1rem' }, padding: { xs: '0.75rem', md: '1rem' } }}>Placed</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.75rem', md: '1rem' }, padding: { xs: '0.75rem', md: '1rem' } }}>Package</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.75rem', md: '1rem' }, padding: { xs: '0.75rem', md: '1rem' } }}>Growth</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eduCompanyData.map((row) => (
                            <TableRow key={row.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' } }}>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', md: '1rem' }, padding: { xs: '0.75rem', md: '1rem' } }}>{row.name}</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', md: '1rem' }, padding: { xs: '0.75rem', md: '1rem' } }}>{row.role}</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', md: '1rem' }, padding: { xs: '0.75rem', md: '1rem' } }}>{row.students}</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', md: '1rem' }, padding: { xs: '0.75rem', md: '1rem' } }}>{row.package}</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', md: '1rem' }, padding: { xs: '0.75rem', md: '1rem' } }}>
                                    <Chip label={row.growth} size="small" color="success" variant="outlined" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: EDU_COLORS.primary, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                New Company Registration
            </Typography>
            <Card sx={{ mb: 3, border: "2px solid #1f4d3a" }}>
                <Box sx={{ backgroundColor: EDU_COLORS.primary, color: "white", p: { xs: 1.5, md: 2 } }}>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", fontSize: { xs: "1rem", md: "20px" } }}
                    >
                        Company Details
                    </Typography>
                </Box>

                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <EduFormRow>
                        <TextField
                            label="Startup Name *"
                            value={eduFormData.startupName}
                            onChange={eduHandleInputChange("startupName")}
                            error={!!eduErrors.startupName}
                            helperText={eduErrors.startupName}
                        />

                        <TextField
                            select
                            label="Legal Status *"
                            value={eduFormData.legalStatus}
                            onChange={eduHandleInputChange("legalStatus")}
                            error={!!eduErrors.legalStatus}
                            helperText={eduErrors.legalStatus}
                        >
                            <MenuItem value="Private Limited">Private Limited</MenuItem>
                            <MenuItem value="LLP">LLP</MenuItem>
                            <MenuItem value="Partnership">Partnership</MenuItem>
                            <MenuItem value="Sole Proprietorship">
                                Sole Proprietorship
                            </MenuItem>
                        </TextField>

                        <TextField
                            label="Date of Establishment *"
                            type="date"
                            value={eduFormData.dateOfEstablishment}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                const selectedDate = e.target.value;

                                if (selectedDate > eduToday) {
                                    setEduErrors((prev) => ({
                                        ...prev,
                                        dateOfEstablishment: "Date cannot be in the future",
                                    }));
                                    return;
                                }

                                if (selectedDate < eduTwoYearsAgo) {
                                    setEduErrors((prev) => ({
                                        ...prev,
                                        dateOfEstablishment:
                                            "Only startups established within the last 2 years are eligible",
                                    }));
                                    return;
                                }

                                setEduErrors((prev) => ({ ...prev, dateOfEstablishment: "" }));
                                setEduFormData((prev) => ({
                                    ...prev,
                                    dateOfEstablishment: selectedDate,
                                }));
                            }}
                            error={!!eduErrors.dateOfEstablishment}
                            helperText={
                                eduErrors.dateOfEstablishment ||
                                `Allowed range: ${eduTwoYearsAgo} to ${eduToday}`
                            }
                            inputProps={{
                                min: eduTwoYearsAgo,
                                max: eduToday,
                                onKeyDown: (e) => e.preventDefault(),
                            }}
                        />

                    </EduFormRow>

                    <EduFormRow>
                        <TextField
                            select
                            label="Primary Sector *"
                            value={eduFormData.primarySector}
                            onChange={eduHandleInputChange("primarySector")}
                            error={!!eduErrors.primarySector}
                            helperText={
                                eduErrors.primarySector || "Select your startup's main sector"
                            }
                        >
                            <MenuItem value="HealthTech">HealthTech</MenuItem>
                            <MenuItem value="FinTech">FinTech</MenuItem>
                            <MenuItem value="EdTech">EdTech</MenuItem>
                            <MenuItem value="AgriTech">AgriTech</MenuItem>
                            <MenuItem value="E-Commerce">E-Commerce</MenuItem>
                            <MenuItem value="AI / ML">AI / ML</MenuItem>
                            <MenuItem value="IoT">IoT</MenuItem>
                            <MenuItem value="SaaS">SaaS</MenuItem>
                            <MenuItem value="Blockchain">Blockchain</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>

                        <TextField
                            select
                            label="Secondary Sector"
                            value={eduFormData.secondarySector}
                            onChange={eduHandleInputChange("secondarySector")}
                            error={!!eduErrors.secondarySector}
                            helperText={
                                eduErrors.secondarySector || "Optional – select additional focus area"
                            }
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="HealthTech">HealthTech</MenuItem>
                            <MenuItem value="FinTech">FinTech</MenuItem>
                            <MenuItem value="EdTech">EdTech</MenuItem>
                            <MenuItem value="AgriTech">AgriTech</MenuItem>
                            <MenuItem value="E-Commerce">E-Commerce</MenuItem>
                            <MenuItem value="AI / ML">AI / ML</MenuItem>
                            <MenuItem value="IoT">IoT</MenuItem>
                            <MenuItem value="SaaS">SaaS</MenuItem>
                            <MenuItem value="Blockchain">Blockchain</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>

                        <TextField
                            label="Company PAN *"
                            value={eduFormData.companyPAN}
                            onChange={eduHandleInputChange("companyPAN")}
                            placeholder="ABCDE1234F"
                            inputProps={{ maxLength: 10 }}
                            error={!!eduErrors.companyPAN}
                            helperText={eduErrors.companyPAN}
                        />

                        <TextField
                            label="GSTIN / CIN"
                            value={eduFormData.gstin}
                            onChange={eduHandleInputChange("gstin")}
                        />
                    </EduFormRow>

                    <EduFormRow>
                        <TextField
                            label="Current Team Size *"
                            type="number"
                            value={eduFormData.currentTeamSize}
                            onChange={eduHandleInputChange("currentTeamSize")}
                            placeholder="Excluding Founders"
                            error={!!eduErrors.currentTeamSize}
                            helperText={eduErrors.currentTeamSize}
                            inputProps={{ min: 0 }}
                        />

                        <TextField
                            label="Male Employees *"
                            type="number"
                            value={eduFormData.maleCount}
                            onChange={eduHandleInputChange("maleCount")}
                            error={!!eduErrors.maleCount}
                            helperText={eduErrors.maleCount}
                            inputProps={{ min: 0 }}
                        />

                        <TextField
                            label="Female Employees *"
                            type="number"
                            value={eduFormData.femaleCount}
                            onChange={eduHandleInputChange("femaleCount")}
                            error={!!eduErrors.femaleCount}
                            helperText={eduErrors.femaleCount}
                            inputProps={{ min: 0 }}
                        />
                    </EduFormRow>

                    <EduFormRow>
                        <TextField
                            label="Company Website"
                            value={eduFormData.companyWebsite}
                            onChange={eduHandleInputChange("companyWebsite")}
                            placeholder="https://www.yourstartup.com"
                        />

                        <TextField
                            label="Number of Branches *"
                            type="number"
                            value={eduFormData.numberOfBranches}
                            onChange={eduHandleBranchCountChange}
                            error={!!eduErrors.numberOfBranches}
                            helperText={
                                eduErrors.numberOfBranches || "Enter a value between 1 and 20"
                            }
                            inputProps={{
                                min: 1,
                                max: 20,
                            }}
                        />

                    </EduFormRow>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Button type="submit" variant="contained" size="large" sx={{ backgroundColor: EDU_COLORS.primary, "&:hover": { backgroundColor: 'rgb(3, 36, 4)' }, px: { xs: 2, md: 4 }, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                            Submit Application
                        </Button>
                        <Button variant="outlined" color="error" size="large" onClick={eduHandleReset} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                            Reset Form
                        </Button>
                    </Box>

                </CardContent>
            </Card>

        </Box>
    );
};

export default PlaceMent;