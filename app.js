import React, { useState, useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Incubation Center Registration"; 

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.boxSizing = "border-box";
    document.body.style.backgroundColor = "#f1f5f9";
    document.body.style.fontFamily = "'Segoe UI', Roboto, Helvetica, sans-serif";
  }, []);

  const initialData = {
    fullName: '',
    gender: '',
    dob: '',
    email: '',
    mobile: '',
    address: '',
    expertise: 'Development',
    experience: '',
    portfolioUrl: '',
    skillsRating: 3,
    availableForProjects: 'Yes',
    roleType: 'Freelancer'
  };

  const [formData, setFormData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (name) => setFocusedInput(name);
  const handleBlur = () => setFocusedInput(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("=== NEW REGISTRATION SUBMITTED ===");
    console.log(formData); 
    console.log("----------------------------------");

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData(initialData); 
    setSubmitted(false);     
  };

  const theme = {
    primary: '#2563eb',
    secondary: '#64748b',
    bg: '#f1f5f9',
    card: '#ffffff',
    border: '#cbd5e1',
    focusShadow: 'rgba(37, 99, 235, 0.2)'
  };

  const styles = {
    pageWrapper: {
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      boxSizing: 'border-box'
    },
    container: {
      width: '100%',
      maxWidth: '800px',
      backgroundColor: theme.card,
      borderRadius: '16px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
      padding: '40px',
      boxSizing: 'border-box'
    },
    header: { textAlign: 'center', marginBottom: '40px' },
    title: { fontSize: '2rem', color: '#1e293b', margin: '0 0 10px 0', fontWeight: '800' },
    subtitle: { color: theme.secondary, fontSize: '1rem', margin: 0 },
    sectionTitle: {
      fontSize: '1.2rem',
      color: theme.primary,
      fontWeight: '600',
      borderBottom: `2px solid ${theme.bg}`,
      paddingBottom: '10px',
      marginBottom: '20px',
      marginTop: '30px'
    },
    row: { display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '15px' },
    col: { flex: 1, minWidth: '250px' },
    formGroup: { marginBottom: '20px', display: 'flex', flexDirection: 'column' },
    label: { marginBottom: '8px', fontSize: '0.95rem', fontWeight: '600', color: '#334155' },
    input: (name) => ({
      padding: '12px 16px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: `1px solid ${focusedInput === name ? theme.primary : theme.border}`,
      outline: 'none',
      backgroundColor: focusedInput === name ? '#fff' : '#f8fafc',
      transition: 'all 0.2s ease',
      boxShadow: focusedInput === name ? `0 0 0 4px ${theme.focusShadow}` : 'none',
      width: '100%',
      boxSizing: 'border-box'
    }),
    button: {
      width: '100%',
      padding: '15px',
      backgroundColor: theme.primary,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '30px',
      transition: 'background 0.2s',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
    },
    rangeValue: {
      display: 'inline-block',
      width: '30px',
      textAlign: 'center',
      fontWeight: 'bold',
      color: theme.primary
    }
  };

  if (submitted) {
    return (
      <div style={styles.pageWrapper}>
        <div style={{...styles.container, textAlign: 'center', padding: '60px'}}>
          <h2 style={{color: theme.primary, fontSize: '2.5rem', margin: '0 0 20px 0'}}>✓ Sent!</h2>
          <p style={{fontSize: '1.2rem', color: theme.secondary}}>Your profile has been registered with the Incubation Center.</p>
          <button onClick={handleReset} style={{...styles.button, width: 'auto', padding: '12px 40px', marginTop: '30px'}}>
            Register Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Incubation Center</h1>
          <p style={styles.subtitle}>Innovator & Developer Registration</p>
        </header>

        <form onSubmit={handleSubmit}>
          
          <h3 style={styles.sectionTitle}>01. Personal Details</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              type="text" name="fullName" placeholder="e.g. Rahul Sharma" required 
              value={formData.fullName} onChange={handleChange} 
              onFocus={() => handleFocus('fullName')} onBlur={handleBlur}
              style={styles.input('fullName')} 
            />
          </div>

          <div style={styles.row}>
            <div style={styles.col}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Gender</label>
                <select 
                  name="gender" required value={formData.gender} onChange={handleChange}
                  onFocus={() => handleFocus('gender')} onBlur={handleBlur}
                  style={styles.input('gender')}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div style={styles.col}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Date of Birth</label>
                <input 
                  type="date" name="dob" required value={formData.dob} onChange={handleChange}
                  onFocus={() => handleFocus('dob')} onBlur={handleBlur}
                  style={styles.input('dob')} 
                />
              </div>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.col}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input 
                  type="email" name="email" placeholder="student@college.edu" required 
                  value={formData.email} onChange={handleChange}
                  onFocus={() => handleFocus('email')} onBlur={handleBlur}
                  style={styles.input('email')} 
                />
              </div>
            </div>
            <div style={styles.col}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Mobile Number</label>
                <input 
                  type="tel" name="mobile" placeholder="+91 98765 43210" required 
                  value={formData.mobile} onChange={handleChange}
                  onFocus={() => handleFocus('mobile')} onBlur={handleBlur}
                  style={styles.input('mobile')} 
                />
              </div>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <textarea 
              name="address" rows="3" placeholder="Permanent Address" required 
              value={formData.address} onChange={handleChange}
              onFocus={() => handleFocus('address')} onBlur={handleBlur}
              style={{...styles.input('address'), resize: 'vertical'}} 
            />
          </div>

          <h3 style={styles.sectionTitle}>02. Professional Skills</h3>

          <div style={styles.row}>
            <div style={styles.col}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Expertise</label>
                <select 
                  name="expertise" value={formData.expertise} onChange={handleChange}
                  onFocus={() => handleFocus('expertise')} onBlur={handleBlur}
                  style={styles.input('expertise')}
                >
                  <option value="Development">Development (App/Web)</option>
                  <option value="Design">UI/UX Design</option>
                  <option value="Marketing">Digital Marketing</option>
                  <option value="AI/ML">AI & Machine Learning</option>
                  <option value="IoT">IoT & Robotics</option>
                </select>
              </div>
            </div>
            <div style={styles.col}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Experience (Years)</label>
                <input 
                  type="number" name="experience" placeholder="0" min="0" step="0.5" 
                  value={formData.experience} onChange={handleChange}
                  onFocus={() => handleFocus('experience')} onBlur={handleBlur}
                  style={styles.input('experience')} 
                />
              </div>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Portfolio / GitHub URL</label>
            <input 
              type="url" name="portfolioUrl" placeholder="https://..." 
              value={formData.portfolioUrl} onChange={handleChange}
              onFocus={() => handleFocus('portfolioUrl')} onBlur={handleBlur}
              style={styles.input('portfolioUrl')} 
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Skill Level (1-5)</label>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <input 
                type="range" name="skillsRating" min="1" max="5" 
                value={formData.skillsRating} onChange={handleChange}
                style={{flex: 1, cursor: 'pointer'}} 
              />
              <span style={styles.rangeValue}>{formData.skillsRating}/5</span>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.col}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Available for Projects?</label>
                <div style={{display: 'flex', gap: '20px', marginTop: '10px'}}>
                  <label style={{cursor: 'pointer'}}>
                    <input type="radio" name="availableForProjects" value="Yes" checked={formData.availableForProjects === 'Yes'} onChange={handleChange} /> Yes
                  </label>
                  <label style={{cursor: 'pointer'}}>
                    <input type="radio" name="availableForProjects" value="No" checked={formData.availableForProjects === 'No'} onChange={handleChange} /> No
                  </label>
                </div>
              </div>
            </div>
            <div style={styles.col}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Preferred Role</label>
                <select 
                  name="roleType" value={formData.roleType} onChange={handleChange}
                  onFocus={() => handleFocus('roleType')} onBlur={handleBlur}
                  style={styles.input('roleType')}
                >
                  <option value="Freelancer">Freelancer</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Consultant">Consultant</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" style={styles.button}>Submit Registration</button>
        </form>
      </div>
    </div>
  );
}

export default App;