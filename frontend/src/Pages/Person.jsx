import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Paper,
  Box,
  Divider,
  Autocomplete,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const eduInstitutionData = {
  School: {
    departments: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Computer Science",
      "Commerce",
      "Economics",
      "English",
    ],
  },
  Polytechnic: {
    degrees: {
      Diploma: [
        "Computer Engineering",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Electronics Engineering",
        "Civil Engineering",
        "Automobile Engineering",
      ],
    },
  },
  Engineering: {
    degrees: {
      "B.Tech": [
        "AI & DS",
        "Computer Science Engineering",
        "CSBS",
        "Information Technology",
        "Electronics & Communication",
        "Electrical & Electronics",
        "Mechanical Engineering",
      ],
      "B.E": [
        "Computer Science Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Electrical & Electronics",
        "Electronics & Communication",
      ],
      "M.Tech": [
        "Data Science",
        "VLSI Design",
        "Structural Engineering",
        "Power Systems",
        "Software Engineering",
      ],
      MBA: [
        "Finance",
        "Human Resources",
        "Marketing",
        "Operations",
        "Business Analytics",
      ],
    },
  },
  "Arts & Science": {
    degrees: {
      BSc: [
        "Computer Science",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Statistics",
      ],
      BCA: [
        "Computer Applications",
        "AI & ML",
        "Cloud Computing",
        "Cyber Security",
      ],
      BCom: ["General", "Accounting & Finance", "Business Analytics"],
      MSc: ["Computer Science", "Data Science", "Mathematics", "Statistics"],
    },
  },
};

const eduSectionHeaderStyle = {
  backgroundColor: "#046f0bff",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "4px 4px 0 0",
};

const eduCardStyle = {
  border: "2px solid #046f0bff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  marginBottom: "40px",
  overflow: "hidden",
};

export default function Person() {
  const [eduInstitutionType, setEduInstitutionType] = useState("");
  const [eduAutonomousStatus, setEduAutonomousStatus] = useState("");
  const [eduSelectedDegrees, setEduSelectedDegrees] = useState([]);
  const [eduSelectedDepartments, setEduSelectedDepartments] = useState([]);
  const [eduId, setEduId] = useState(null);

  const [eduFormData, setEduFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institutionName: "",
    yearEstablished: "",
    naacGrade: "",
    officialEmail: "",
    universityName: "",
    gender: "",
    dateOfBirth: "",
    principalName: "",
    principalEmail: "",
    principalPhone: "",
    vicePrincipalName: "",
    vicePrincipalEmail: "",
    vicePrincipalPhone: "",
    ceoName: "",
    ceoEmail: "",
    ceoPhone: "",
    academicCoordinatorName: "",
    academicCoordinatorEmail: "",
    academicCoordinatorPhone: "",
    placementHeadName: "",
    placementHeadEmail: "",
    placementHeadPhone: "",
    websiteUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    facebookUrl: "",
  });

  const [eduAddress, setEduAddress] = useState({
    country: "",
    state: "",
    district: "",
    city: "",
    area: "",
    pinCode: "",
  });

  const [eduCountries, setEduCountries] = useState([]);
  const [eduStates, setEduStates] = useState([]);
  const [eduDistricts, setEduDistricts] = useState([]);
  const [eduCities, setEduCities] = useState([]);
  const [eduCountryInput, setEduCountryInput] = useState("");
  const [eduStateInput, setEduStateInput] = useState("");
  const [eduDistrictInput, setEduDistrictInput] = useState("");
  const [eduCityInput, setEduCityInput] = useState("");
  const [eduSubmissionStatus, setEduSubmissionStatus] = useState("");
  const [eduSubmissionMessage, setEduSubmissionMessage] = useState("");

  const [eduUploadedFiles, setEduUploadedFiles] = useState({
    "Registration Certificate": null,
    "ID Proof": null,
    "Address Proof": null,
    "Accreditation Certificate": null,
  });

  const eduHandleInputChange = (e) => {
    const { name, value } = e.target;
    setEduFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const eduFetchCountries = async () => {
      try {
        const eduRes = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/iso",
        );
        const eduData = eduRes.data;
        setEduCountries(eduData.data?.map((c) => c.name) || []);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    eduFetchCountries();
  }, []);

  // Auto-fetch details based on stored email
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      const fetchDetails = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/institution/email/${storedEmail}`,
          );
          const data = res.data;

          setEduInstitutionType(data.institutionType || "");
          setEduAutonomousStatus(data.autonomousStatus || "");
          setEduSelectedDegrees(data.degrees || []);
          setEduSelectedDepartments(data.departments || []);
          setEduId(data._id || null);

          setEduFormData((prev) => ({
            ...prev,
            institutionName: data.institutionName || "",
            yearEstablished: data.yearEstablished || "",
            naacGrade: data.naacGrade || "",
            officialEmail: data.officialEmail || "",
            universityName: data.universityName || "",

            firstName: data.personalInfo?.firstName || "",
            lastName: data.personalInfo?.lastName || "",
            email: data.personalInfo?.email || "",
            phone: data.personalInfo?.phone || "",
            gender: data.personalInfo?.gender || "",
            designation: data.personalInfo?.designation || "",
            dateOfBirth: data.personalInfo?.dateOfBirth || "",

            principalName: data.contacts?.principal?.name || "",
            principalEmail: data.contacts?.principal?.email || "",
            principalPhone: data.contacts?.principal?.phone || "",

            vicePrincipalName: data.contacts?.vicePrincipal?.name || "",
            vicePrincipalEmail: data.contacts?.vicePrincipal?.email || "",
            vicePrincipalPhone: data.contacts?.vicePrincipal?.phone || "",

            ceoName: data.contacts?.ceo?.name || "",
            ceoEmail: data.contacts?.ceo?.email || "",
            ceoPhone: data.contacts?.ceo?.phone || "",

            academicCoordinatorName:
              data.contacts?.academicCoordinator?.name || "",
            academicCoordinatorEmail:
              data.contacts?.academicCoordinator?.email || "",
            academicCoordinatorPhone:
              data.contacts?.academicCoordinator?.phone || "",

            placementHeadName: data.contacts?.placementHead?.name || "",
            placementHeadEmail: data.contacts?.placementHead?.email || "",
            placementHeadPhone: data.contacts?.placementHead?.phone || "",

            websiteUrl: data.socialLinks?.website || "",
            linkedinUrl: data.socialLinks?.linkedin || "",
            instagramUrl: data.socialLinks?.instagram || "",
            facebookUrl: data.socialLinks?.facebook || "",
          }));

          // Populate documents if available
          if (data.documents) {
            setEduUploadedFiles((prev) => ({
              ...prev,
              ...data.documents,
            }));
          } else {
            setEduUploadedFiles({
              "Registration Certificate": null,
              "ID Proof": null,
              "Address Proof": null,
              "Accreditation Certificate": null,
            });
          }

          if (data.address) {
            setEduAddress({
              country: data.address.country || "",
              state: data.address.state || "",
              district: data.address.district || "",
              city: data.address.city || "",
              area: data.address.area || "",
              pinCode: data.address.pinCode || "",
            });
          }
        } catch (err) {
          console.error("Error loading stored details:", err);
          // Optional: clear invalid email if needed, but safer to leave it
        }
      };
      fetchDetails();
    }
  }, []);

  const eduHandleAddressChange = async (field, value, isSelection = false) => {
    let eduUpdated = { ...eduAddress };

    if (field === "country") {
      if (!isSelection) return;
      eduUpdated = {
        ...eduUpdated,
        country: value || "",
        state: "",
        district: "",
        city: "",
        area: "",
        pinCode: "",
      };
      setEduStates([]);
      setEduDistricts([]);
      setEduCities([]);
      try {
        if (value) {
          const eduRes = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/states",
            {
              country: value,
            },
          );
          const eduData = eduRes.data;
          setEduStates(eduData.data?.states?.map((s) => s.name) || []);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (field === "state") {
      if (!isSelection) return;
      eduUpdated = {
        ...eduUpdated,
        state: value || "",
        district: "",
        city: "",
        area: "",
        pinCode: "",
      };
      setEduDistricts([]);
      setEduCities([]);
      try {
        if (value && eduAddress.country) {
          const eduRes = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/state/cities",
            {
              country: eduAddress.country,
              state: value,
            },
          );
          const eduData = eduRes.data;
          setEduDistricts(eduData.data || []);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (field === "district") {
      if (!isSelection) return;
      eduUpdated = {
        ...eduUpdated,
        district: value || "",
        city: "",
        area: "",
        pinCode: "",
      };
      setEduCities([
        `${value} Central`,
        `${value} North`,
        `${value} South`,
        "Main City Area",
      ]);
    }

    if (field === "city") {
      eduUpdated = { ...eduUpdated, city: value || "", area: "", pinCode: "" };
    }

    if (field === "area" || field === "pinCode") {
      eduUpdated = { ...eduUpdated, [field]: value };
    }

    setEduAddress(eduUpdated);
  };

  const eduHandleDegreeToggle = (degree) => {
    setEduSelectedDepartments([]);
    setEduSelectedDegrees((prev) =>
      prev.includes(degree)
        ? prev.filter((d) => d !== degree)
        : [...prev, degree],
    );
  };

  const eduHandleDeptToggle = (dept) => {
    setEduSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept],
    );
  };

  const eduSubHeaderStyle = {
    color: "#046f0bff",
    fontWeight: "bold",
  };

  const eduHandleFileChange = async (docName, event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          "http://localhost:8000/api/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        const fileUrl = res.data.url;
        setEduUploadedFiles((prev) => ({ ...prev, [docName]: fileUrl }));
      } catch (err) {
        console.error("Upload error:", err);
      }
    }
  };

  const eduHandleViewFile = (docName) => {
    const fileUrl = eduUploadedFiles[docName];
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const eduHandleReset = () => {
    setEduInstitutionType("");
    setEduAutonomousStatus("");
    setEduSelectedDegrees([]);
    setEduSelectedDepartments([]);
    setEduFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      institutionName: "",
      yearEstablished: "",
      naacGrade: "",
      officialEmail: "",
      universityName: "",
      gender: "",
      principalName: "",
      principalEmail: "",
      principalPhone: "",
      vicePrincipalName: "",
      vicePrincipalEmail: "",
      vicePrincipalPhone: "",
      ceoName: "",
      ceoEmail: "",
      ceoPhone: "",
      academicCoordinatorName: "",
      academicCoordinatorEmail: "",
      academicCoordinatorPhone: "",
      placementHeadName: "",
      placementHeadEmail: "",
      placementHeadPhone: "",
      websiteUrl: "",
      linkedinUrl: "",
      instagramUrl: "",
      facebookUrl: "",
    });
    setEduAddress({
      country: "",
      state: "",
      district: "",
      city: "",
      area: "",
      pinCode: "",
    });
    setEduSubmissionStatus("");
    setEduSubmissionMessage("");
    setEduId(null);
    setEduUploadedFiles({
      "Registration Certificate": null,
      "ID Proof": null,
      "Address Proof": null,
      "Accreditation Certificate": null,
    });
  };

  const eduHandleSubmit = async (e) => {
    e.preventDefault();
    setEduSubmissionStatus("");
    setEduSubmissionMessage("");

    const payload = {
      institutionName: eduFormData.institutionName,
      institutionType: eduInstitutionType,
      autonomousStatus: eduAutonomousStatus,
      yearEstablished: eduFormData.yearEstablished,
      naacGrade: eduFormData.naacGrade,
      officialEmail: eduFormData.officialEmail,
      universityName: eduFormData.universityName,
      degrees: eduSelectedDegrees,
      departments: eduSelectedDepartments,
      personalInfo: {
        firstName: eduFormData.firstName,
        lastName: eduFormData.lastName,
        email: eduFormData.email,
        phone: eduFormData.phone,
        gender: eduFormData.gender,
        designation: eduFormData.designation,
        dateOfBirth: eduFormData.dateOfBirth,
      },
      contacts: {
        principal: {
          name: eduFormData.principalName,
          email: eduFormData.principalEmail,
          phone: eduFormData.principalPhone,
        },
        vicePrincipal: {
          name: eduFormData.vicePrincipalName,
          email: eduFormData.vicePrincipalEmail,
          phone: eduFormData.vicePrincipalPhone,
        },
        ceo: {
          name: eduFormData.ceoName,
          email: eduFormData.ceoEmail,
          phone: eduFormData.ceoPhone,
        },
        academicCoordinator: {
          name: eduFormData.academicCoordinatorName,
          email: eduFormData.academicCoordinatorEmail,
          phone: eduFormData.academicCoordinatorPhone,
        },
        placementHead: {
          name: eduFormData.placementHeadName,
          email: eduFormData.placementHeadEmail,
          phone: eduFormData.placementHeadPhone,
        },
      },
      address: eduAddress,
      socialLinks: {
        website: eduFormData.websiteUrl,
        linkedin: eduFormData.linkedinUrl,
        instagram: eduFormData.instagramUrl,
        facebook: eduFormData.facebookUrl,
      },
      documents: eduUploadedFiles,
    };

    try {
      let res;
      if (eduId) {
        res = await axios.put(
          `http://localhost:8000/api/institution/${eduId}`,
          payload,
        );
      } else {
        res = await axios.post(
          "http://localhost:8000/api/institution/register",
          payload,
        );
      }

      const result = res.data;

      setEduSubmissionStatus("success");
      setEduSubmissionMessage(
        result.message ||
        (eduId
          ? "Update successful!"
          : "Registration submitted successfully!"),
      );

      // Store email for next visit retrieval
      localStorage.setItem("email", eduFormData.email);
    } catch (error) {
      console.error("Submission error:", error);
      setEduSubmissionStatus("error");
      setEduSubmissionMessage(
        "Submission failed: " + (error.response?.data?.detail || error.message),
      );
    }
  };

  const eduHandleDelete = async () => {
    if (!eduId) return;
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this application? This action cannot be undone.",
      )
    )
      return;

    try {
      await axios.delete(`http://localhost:8000/api/institution/${eduId}`);
      localStorage.removeItem("email");
      eduHandleReset();
      setEduSubmissionStatus("success");
      setEduSubmissionMessage("Application permanently deleted.");
    } catch (error) {
      console.error("Delete error:", error);
      setEduSubmissionStatus("error");
      setEduSubmissionMessage(
        "Delete failed: " + (error.response?.data?.detail || error.message),
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ color: "#046f0bff", fontWeight: 700, mb: 6 }}
      >
        Educational Institution Registration
      </Typography>

      <form onSubmit={eduHandleSubmit}>
        <Paper sx={eduCardStyle}>
          <Box sx={eduSectionHeaderStyle}>
            <Typography variant="h6">Institution Details</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Institution Name"
                  required
                  name="institutionName"
                  value={eduFormData.institutionName}
                  onChange={eduHandleInputChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Institution Type"
                  value={eduInstitutionType}
                  onChange={(e) => {
                    setEduInstitutionType(e.target.value);
                    setEduSelectedDegrees([]);
                    setEduSelectedDepartments([]);
                    setEduAutonomousStatus("");
                  }}
                  required
                >
                  <MenuItem value="School">School</MenuItem>
                  <MenuItem value="Polytechnic">Polytechnic</MenuItem>
                  <MenuItem value="Engineering">Engineering College</MenuItem>
                  <MenuItem value="Arts & Science">
                    Arts & Science College
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Year of Establishment"
                  name="yearEstablished"
                  value={eduFormData.yearEstablished}
                  onChange={eduHandleInputChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="NAAC Grade"
                  name="naacGrade"
                  value={eduFormData.naacGrade}
                  onChange={eduHandleInputChange}
                  required
                >
                  {[
                    "A++",
                    "A+",
                    "A",
                    "B++",
                    "B+",
                    "B",
                    "C",
                    "Not Accredited",
                  ].map((eduOpt) => (
                    <MenuItem key={eduOpt} value={eduOpt}>
                      {eduOpt}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  type="email"
                  label="Official Email"
                  name="officialEmail"
                  value={eduFormData.officialEmail}
                  onChange={eduHandleInputChange}
                  required
                />
              </Grid>

              {(eduInstitutionType === "Engineering" ||
                eduInstitutionType === "Arts & Science") && (
                  <>
                    <Grid xs={12} md={6}>
                      <TextField
                        select
                        fullWidth
                        label="Autonomous Status"
                        name="autonomousStatus"
                        value={eduAutonomousStatus}
                        onChange={(e) => setEduAutonomousStatus(e.target.value)}
                      >
                        <MenuItem value="Autonomous">Autonomous</MenuItem>
                        <MenuItem value="Non-Autonomous">Non-Autonomous</MenuItem>
                      </TextField>
                    </Grid>
                    {eduAutonomousStatus === "Non-Autonomous" && (
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Affiliated University"
                          name="universityName"
                          value={eduFormData.universityName}
                          onChange={eduHandleInputChange}
                        />
                      </Grid>
                    )}
                  </>
                )}

              {eduInstitutionType && (
                <Grid xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#046f0bff", fontWeight: 600, mb: 2 }}
                  >
                    {eduInstitutionType === "School"
                      ? "Departments Offered"
                      : "Degrees Offered"}
                  </Typography>
                  <Grid container spacing={1}>
                    {eduInstitutionType === "School"
                      ? eduInstitutionData.School.departments.map((eduDept) => (
                        <Grid xs={6} md={3} key={eduDept}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="success"
                                onChange={() => eduHandleDeptToggle(eduDept)}
                              />
                            }
                            label={eduDept}
                          />
                        </Grid>
                      ))
                      : Object.keys(
                        eduInstitutionData[eduInstitutionType].degrees,
                      ).map((eduDeg) => (
                        <Grid xs={6} md={3} key={eduDeg}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="success"
                                checked={eduSelectedDegrees.includes(eduDeg)}
                                onChange={() => eduHandleDegreeToggle(eduDeg)}
                              />
                            }
                            label={eduDeg}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              )}

              {eduSelectedDegrees.length > 0 && (
                <Grid xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#046f0bff", fontWeight: 600, mb: 2 }}
                  >
                    Departments Under Selected Degrees
                  </Typography>
                  <Grid container spacing={1}>
                    {eduSelectedDegrees.flatMap((eduDeg) =>
                      eduInstitutionData[eduInstitutionType].degrees[
                        eduDeg
                      ].map((eduDept) => (
                        <Grid xs={12} md={6} key={eduDeg + eduDept}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="success"
                                checked={eduSelectedDepartments.includes(
                                  `${eduDept} (${eduDeg})`,
                                )}
                                onChange={() =>
                                  eduHandleDeptToggle(`${eduDept} (${eduDeg})`)
                                }
                              />
                            }
                            label={`${eduDept} (${eduDeg})`}
                          />
                        </Grid>
                      )),
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Box>
        </Paper>

        <Paper sx={eduCardStyle}>
          <Box sx={eduSectionHeaderStyle}>
            <Typography variant="h6">Personal Information</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  required
                  name="firstName"
                  value={eduFormData.firstName}
                  onChange={eduHandleInputChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  required
                  name="lastName"
                  value={eduFormData.lastName}
                  onChange={eduHandleInputChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  required
                  name="email"
                  value={eduFormData.email}
                  onChange={eduHandleInputChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  required
                  name="phone"
                  value={eduFormData.phone}
                  onChange={eduHandleInputChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  InputLabelProps={{ shrink: true }}
                  required
                  inputProps={{ max: new Date().toISOString().split("T")[0] }}
                  name="dateOfBirth"
                  value={eduFormData.dateOfBirth}
                  onChange={eduHandleInputChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender *</FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    value={eduFormData.gender}
                    onChange={eduHandleInputChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio color="success" />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio color="success" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="others"
                      control={<Radio color="success" />}
                      label="Others"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  required
                  name="designation"
                  value={eduFormData.designation}
                  onChange={eduHandleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Paper sx={eduCardStyle}>
          <Box sx={eduSectionHeaderStyle}>
            <Typography variant="h6">Key Contact Details</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
              <Grid xs={12}>
                <Typography variant="h6" sx={eduSubHeaderStyle}>
                  Principal Details
                </Typography>
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Principal Name"
                  name="principalName"
                  required
                  value={eduFormData.principalName}
                  onChange={eduHandleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="principalPhone"
                  required
                  value={eduFormData.principalPhone}
                  onChange={eduHandleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  name="principalEmail"
                  required
                  value={eduFormData.principalEmail}
                  onChange={eduHandleInputChange}
                />
              </Grid>

              <Grid xs={12}>
                <Typography variant="h6" sx={eduSubHeaderStyle}>
                  Vice Principal Details
                </Typography>
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Vice Principal Name"
                  name="vicePrincipalName"
                  value={eduFormData.vicePrincipalName}
                  onChange={eduHandleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="vicePrincipalPhone"
                  value={eduFormData.vicePrincipalPhone}
                  onChange={eduHandleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  name="vicePrincipalEmail"
                  value={eduFormData.vicePrincipalEmail}
                  onChange={eduHandleInputChange}
                />
              </Grid>

              <Grid xs={12}>
                <Typography variant="h6" sx={eduSubHeaderStyle}>
                  CEO Details
                </Typography>
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="CEO Name"
                  name="ceoName"
                  value={eduFormData.ceoName}
                  onChange={eduHandleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="ceoPhone"
                  value={eduFormData.ceoPhone}
                  onChange={eduHandleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  name="ceoEmail"
                  value={eduFormData.ceoEmail}
                  onChange={eduHandleInputChange}
                />
              </Grid>

              {eduInstitutionType === "School" ? (
                <>
                  <Grid xs={12} sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={eduSubHeaderStyle}>
                      Academic Coordinator
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Coordinator Name"
                      name="academicCoordinatorName"
                      required
                      value={eduFormData.academicCoordinatorName}
                      onChange={eduHandleInputChange}
                    />
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="academicCoordinatorPhone"
                      required
                      value={eduFormData.academicCoordinatorPhone}
                      onChange={eduHandleInputChange}
                    />
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Address"
                      name="academicCoordinatorEmail"
                      required
                      value={eduFormData.academicCoordinatorEmail}
                      onChange={eduHandleInputChange}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid xs={12} sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={eduSubHeaderStyle}>
                      Placement Head Details
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Placement Head Name"
                      name="placementHeadName"
                      required
                      value={eduFormData.placementHeadName}
                      onChange={eduHandleInputChange}
                    />
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="placementHeadPhone"
                      required
                      value={eduFormData.placementHeadPhone}
                      onChange={eduHandleInputChange}
                    />
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Address"
                      name="placementHeadEmail"
                      required
                      value={eduFormData.placementHeadEmail}
                      onChange={eduHandleInputChange}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Paper>

        <Paper sx={eduCardStyle}>
          <Box sx={eduSectionHeaderStyle}>
            <Typography variant="h6">Institution Address</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={2}>
                <Autocomplete
                  options={eduCountries}
                  value={eduAddress.country || ""}
                  inputValue={eduCountryInput}
                  onInputChange={(event, newInputValue) =>
                    setEduCountryInput(newInputValue)
                  }
                  onChange={(event, newValue) => {
                    setEduCountryInput(newValue || "");
                    setEduStateInput("");
                    setEduDistrictInput("");
                    setEduCityInput("");
                    eduHandleAddressChange("country", newValue, true);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option === value || value === ""
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Country" required />
                  )}
                />
              </Grid>

              <Grid xs={12} md={2}>
                <Autocomplete
                  disabled={
                    !eduAddress.country || eduAddress.country.length === 0
                  }
                  options={eduStates}
                  value={eduAddress.state || ""}
                  inputValue={eduStateInput}
                  onInputChange={(event, newInputValue) =>
                    setEduStateInput(newInputValue)
                  }
                  onChange={(event, newValue) => {
                    setEduStateInput(newValue || "");
                    setEduDistrictInput("");
                    setEduCityInput("");
                    eduHandleAddressChange("state", newValue, true);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option === value || value === ""
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="State" required />
                  )}
                />
              </Grid>

              <Grid xs={12} md={2}>
                <Autocomplete
                  freeSolo
                  disabled={!eduAddress.state || eduAddress.state.length === 0}
                  options={eduDistricts}
                  value={eduAddress.district || ""}
                  inputValue={eduDistrictInput}
                  onInputChange={(event, newInputValue) =>
                    setEduDistrictInput(newInputValue)
                  }
                  onChange={(event, newValue) => {
                    setEduDistrictInput(newValue || "");
                    setEduCityInput("");
                    eduHandleAddressChange("district", newValue, true);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option === value || value === ""
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="District" required />
                  )}
                />
              </Grid>

              <Grid xs={12} md={2}>
                <Autocomplete
                  freeSolo
                  disabled={
                    !eduAddress.district || eduAddress.district.length === 0
                  }
                  options={eduCities}
                  value={eduAddress.city || ""}
                  inputValue={eduCityInput}
                  onInputChange={(event, newInputValue) =>
                    setEduCityInput(newInputValue)
                  }
                  onChange={(event, newValue) => {
                    setEduCityInput(newValue || "");
                    eduHandleAddressChange("city", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="City" required />
                  )}
                />
              </Grid>

              <Grid xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Area"
                  disabled={!eduAddress.city || eduAddress.city.length === 0}
                  value={eduAddress.area}
                  onChange={(e) =>
                    eduHandleAddressChange("area", e.target.value)
                  }
                  required
                />
              </Grid>

              <Grid xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Pincode"
                  disabled={!eduAddress.area || eduAddress.area.length === 0}
                  value={eduAddress.pinCode}
                  inputProps={{ maxLength: 6 }}
                  onChange={(e) =>
                    eduHandleAddressChange("pinCode", e.target.value)
                  }
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Paper sx={eduCardStyle}>
          <Box sx={eduSectionHeaderStyle}>
            <Typography variant="h6">Required Documents</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
              {[
                "Registration Certificate",
                "ID Proof",
                "Address Proof",
                "Accreditation Certificate",
              ].map((eduDoc) => {
                const eduIsUploaded = !!eduUploadedFiles[eduDoc];
                return (
                  <Grid xs={12} md={3} key={eduDoc}>
                    <Typography variant="body2" gutterBottom>
                      {eduDoc}{" "}
                      {eduDoc !== "Accreditation Certificate" ? "*" : ""}
                    </Typography>
                    <Button
                      variant={eduIsUploaded ? "contained" : "outlined"}
                      component="label"
                      fullWidth
                      onClick={() => eduIsUploaded && eduHandleViewFile(eduDoc)}
                      sx={{
                        py: 1.5,
                        backgroundColor: eduIsUploaded
                          ? "#046f0bff"
                          : "transparent",
                        borderColor: "#046f0bff",
                        color: eduIsUploaded ? "#fff" : "#046f0bff",
                        "&:hover": {
                          backgroundColor: eduIsUploaded
                            ? "#035a09"
                            : "rgba(4, 111, 11, 0.04)",
                          borderColor: "#035a09",
                        },
                      }}
                    >
                      {eduIsUploaded ? "View Uploaded" : "Upload File"}
                      {!eduIsUploaded && (
                        <input
                          type="file"
                          hidden
                          required={eduDoc !== "Accreditation Certificate"}
                          onChange={(e) => eduHandleFileChange(eduDoc, e)}
                        />
                      )}
                    </Button>
                    {eduIsUploaded && (
                      <Typography
                        variant="caption"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          mt: 1,
                          cursor: "pointer",
                          color: "error.main",
                          fontWeight: 500,
                          "&:hover": { color: "#d32f2f" },
                        }}
                        onClick={() =>
                          setEduUploadedFiles((prev) => ({
                            ...prev,
                            [eduDoc]: null,
                          }))
                        }
                      >
                        Remove File
                        <DeleteForeverOutlinedIcon
                          sx={{ ml: 0.5, fontSize: "1.2rem" }}
                        />
                      </Typography>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Paper>

        <Paper sx={eduCardStyle}>
          <Box sx={eduSectionHeaderStyle}>
            <Typography variant="h6">Digital & Social Presence</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="url"
                  label="Official Website URL"
                  name="websiteUrl"
                  required
                  value={eduFormData.websiteUrl}
                  onChange={eduHandleInputChange}
                  placeholder="https://example.com"
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="url"
                  label="LinkedIn Page URL"
                  name="linkedinUrl"
                  required
                  value={eduFormData.linkedinUrl}
                  onChange={eduHandleInputChange}
                  placeholder="https://linkedin.com/company/example"
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="url"
                  label="Instagram Page URL"
                  name="instagramUrl"
                  value={eduFormData.instagramUrl}
                  onChange={eduHandleInputChange}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="url"
                  label="Other Page URL"
                  name="facebookUrl"
                  value={eduFormData.facebookUrl || ""}
                  onChange={eduHandleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Box sx={{ mb: 10 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#046f0bff",
                "&:hover": { backgroundColor: "#035a09" },
                px: 4,
              }}
            >
              {eduId ? "Update Application" : "Submit Application"}
            </Button>
            {eduId && (
              <Button
                variant="contained"
                color="error"
                size="large"
                onClick={eduHandleDelete}
                sx={{
                  px: 4,
                  backgroundColor: "#d32f2f",
                  "&:hover": { backgroundColor: "#c62828" },
                }}
              >
                Delete Application
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={eduHandleReset}
            >
              Reset Form
            </Button>
          </Box>
          {eduSubmissionMessage && (
            <Typography
              sx={{
                mt: 2,
                color:
                  eduSubmissionStatus === "success"
                    ? "success.main"
                    : "error.main",
                fontWeight: 500,
                backgroundColor:
                  eduSubmissionStatus === "success" ? "#e8f5e9" : "#ffebee",
              }}
            >
              {eduSubmissionMessage}
            </Typography>
          )}
        </Box>
      </form>
    </Container>
  );
}
