import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal
    firstName: '', middleName: '', lastName: '', suffix: '',
    dateOfBirth: '', gender: '', nationality: '', religion: '',
    // Contact
    email: '', mobile: '', landline: '',
    street: '', barangay: '', city: '', province: '', zipCode: '',
    // Academic
    gsName: '', gsYear: '', gsAddress: '',
    jhsName: '', jhsYear: '', jhsAddress: '',
    shsName: '', shsYear: '', shsAverage: '', shsAddress: '',
    // Enrollment
    level: '', semester: '', campus: '', department: '', program: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const departments = {
    cea: ['BS Architecture', 'BS Chemical Engineering', 'BS Civil Engineering', 
          'BS Computer Engineering', 'BS Electrical Engineering', 'BS Electronics Engineering', 
          'BS Industrial Engineering', 'BS Mechanical Engineering'],
    ccs: ['BS Computer Science', 'BS Data Science and Analytics', 
          'BS Entertainment and Multimedia Computing', 'BS Information Technology'],
    cbe: ['BS Accountancy', 'BS Accounting Information System', 
          'BS Business Administration - Financial Management',
          'BS Business Administration - Human Resource Management',
          'BS Business Administration - Logistics and Supply Chain Management',
          'BS Business Administration - Marketing Management'],
    arts: ['Bachelor of Arts in English Language', 'Bachelor of Arts in Political Science']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value && ['firstName', 'lastName', 'dateOfBirth', 'gender', 'nationality',
                   'email', 'mobile', 'street', 'barangay', 'city', 'province', 'zipCode',
                   'gsName', 'gsYear', 'gsAddress', 'jhsName', 'jhsYear', 'jhsAddress',
                   'shsName', 'shsYear', 'shsAverage', 'shsAddress',
                   'level', 'semester', 'campus', 'department', 'program'].includes(name)) {
      error = 'This field is required';
    }
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Please enter a valid email';
    }
    if (name === 'mobile' && value && !/^09\d{9}$/.test(value)) {
      error = 'Format: 09XXXXXXXXX';
    }
    if (name === 'zipCode' && value && !/^\d{4}$/.test(value)) {
      error = '4 digits required';
    }
    if (name === 'shsAverage' && value && (value < 75 || value > 100)) {
      error = 'Must be 75-100';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateStep = (step) => {
    const stepFields = {
      1: ['firstName', 'lastName', 'dateOfBirth', 'gender', 'nationality'],
      2: ['email', 'mobile', 'street', 'barangay', 'city', 'province', 'zipCode'],
      3: ['gsName', 'gsYear', 'gsAddress', 'jhsName', 'jhsYear', 'jhsAddress', 'shsName', 'shsYear', 'shsAverage', 'shsAddress'],
      4: ['level', 'semester', 'campus', 'department', 'program']
    };
    
    let isValid = true;
    stepFields[step].forEach(field => {
      if (!validateField(field, formData[field])) isValid = false;
      setTouched(prev => ({ ...prev, [field]: true }));
    });
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const getProgress = () => {
    const fields = Object.keys(formData);
    const filled = fields.filter(f => formData[f]).length;
    return Math.round((filled / fields.length) * 100);
  };

  if (showSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2>Registration Successful!</h2>
          <p>Welcome to ADEi University, {formData.firstName}!</p>
          <p className="success-detail">Your application for {formData.program} has been received.</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Register Another Student
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="animated-bg"></div>
      
      <div className="main-content">
        <header className="glass-header">
          <div className="logo-section">
            <div className="logo">ADEi</div>
            <div className="uni-info">
              <h1>University Digital Registrar</h1>
              <p>Student Enrollment Portal 2024-2025</p>
            </div>
          </div>
          <div className="progress-ring">
            <svg viewBox="0 0 36 36">
              <path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="ring-progress" strokeDasharray={`${getProgress()}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="progress-text">{getProgress()}%</span>
          </div>
        </header>

        <div className="step-indicator">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className={`step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
              <div className="step-number">{currentStep > step ? '✓' : step}</div>
              <span className="step-label">
                {step === 1 && 'Personal'}
                {step === 2 && 'Contact'}
                {step === 3 && 'Academic'}
                {step === 4 && 'Enrollment'}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="enrollment-form">
          {/* STEP 1: PERSONAL INFO */}
          {currentStep === 1 && (
            <div className="form-step animate-in">
              <h2 className="section-title">👤 Personal Information</h2>
              
              <div className="form-grid">
                <div className={`input-group ${touched.firstName && errors.firstName ? 'error' : ''}`}>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} required placeholder=" " />
                  <label>First Name *</label>
                  <span className="input-highlight"></span>
                  {touched.firstName && errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                </div>

                <div className="input-group">
                  <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} placeholder=" " />
                  <label>Middle Name</label>
                  <span className="input-highlight"></span>
                </div>

                <div className={`input-group ${touched.lastName && errors.lastName ? 'error' : ''}`}>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} required placeholder=" " />
                  <label>Last Name *</label>
                  <span className="input-highlight"></span>
                  {touched.lastName && errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                </div>

                <div className="input-group">
                  <input type="text" name="suffix" value={formData.suffix} onChange={handleChange} placeholder=" " />
                  <label>Suffix (Jr., Sr., III)</label>
                  <span className="input-highlight"></span>
                </div>
              </div>

              <div className="form-grid three-cols">
                <div className={`input-group ${touched.dateOfBirth && errors.dateOfBirth ? 'error' : ''}`}>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} onBlur={handleBlur} required max="2006-12-31" min="1990-01-01" />
                  <label className="static-label">Date of Birth *</label>
                  {touched.dateOfBirth && errors.dateOfBirth && <span className="error-msg">{errors.dateOfBirth}</span>}
                </div>

                <div className={`input-group select-group ${touched.gender && errors.gender ? 'error' : ''}`}>
                  <select name="gender" value={formData.gender} onChange={handleChange} onBlur={handleBlur} required>
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                  </select>
                  <label className="static-label">Gender *</label>
                  {touched.gender && errors.gender && <span className="error-msg">{errors.gender}</span>}
                </div>

                <div className={`input-group select-group ${touched.nationality && errors.nationality ? 'error' : ''}`}>
                  <select name="nationality" value={formData.nationality} onChange={handleChange} onBlur={handleBlur} required>
                    <option value=""></option>
                    <option value="filipino">Filipino</option>
                    <option value="american">American</option>
                    <option value="chinese">Chinese</option>
                    <option value="others">Others</option>
                  </select>
                  <label className="static-label">Nationality *</label>
                  {touched.nationality && errors.nationality && <span className="error-msg">{errors.nationality}</span>}
                </div>
              </div>

              <div className="input-group">
                <input type="text" name="religion" value={formData.religion} onChange={handleChange} placeholder=" " />
                <label>Religion</label>
                <span className="input-highlight"></span>
              </div>
            </div>
          )}

          {/* STEP 2: CONTACT */}
          {currentStep === 2 && (
            <div className="form-step animate-in">
              <h2 className="section-title">📞 Contact Details</h2>
              
              <div className="form-grid three-cols">
                <div className={`input-group ${touched.email && errors.email ? 'error' : ''}`}>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required placeholder=" " />
                  <label>Email Address *</label>
                  <span className="input-highlight"></span>
                  {touched.email && errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className={`input-group ${touched.mobile && errors.mobile ? 'error' : ''}`}>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} onBlur={handleBlur} required placeholder=" " maxLength="11" />
                  <label>Mobile Number *</label>
                  <span className="input-highlight"></span>
                  {touched.mobile && errors.mobile && <span className="error-msg">{errors.mobile}</span>}
                </div>

                <div className="input-group">
                  <input type="tel" name="landline" value={formData.landline} onChange={handleChange} placeholder=" " />
                  <label>Landline</label>
                  <span className="input-highlight"></span>
                </div>
              </div>

              <h3 className="subsection-title">Home Address</h3>
              
              <div className="form-grid">
                <div className={`input-group ${touched.street && errors.street ? 'error' : ''}`}>
                  <input type="text" name="street" value={formData.street} onChange={handleChange} onBlur={handleBlur} required placeholder=" " />
                  <label>Street *</label>
                  <span className="input-highlight"></span>
                  {touched.street && errors.street && <span className="error-msg">{errors.street}</span>}
                </div>

                <div className={`input-group ${touched.barangay && errors.barangay ? 'error' : ''}`}>
                  <input type="text" name="barangay" value={formData.barangay} onChange={handleChange} onBlur={handleBlur} required placeholder=" " />
                  <label>Barangay *</label>
                  <span className="input-highlight"></span>
                  {touched.barangay && errors.barangay && <span className="error-msg">{errors.barangay}</span>}
                </div>

                <div className={`input-group ${touched.city && errors.city ? 'error' : ''}`}>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur} required placeholder=" " />
                  <label>City *</label>
                  <span className="input-highlight"></span>
                  {touched.city && errors.city && <span className="error-msg">{errors.city}</span>}
                </div>

                <div className={`input-group ${touched.province && errors.province ? 'error' : ''}`}>
                  <input type="text" name="province" value={formData.province} onChange={handleChange} onBlur={handleBlur} required placeholder=" " />
                  <label>Province *</label>
                  <span className="input-highlight"></span>
                  {touched.province && errors.province && <span className="error-msg">{errors.province}</span>}
                </div>
              </div>

              <div className={`input-group half-width ${touched.zipCode && errors.zipCode ? 'error' : ''}`}>
                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} onBlur={handleBlur} required placeholder=" " maxLength="4" />
                <label>Zip Code *</label>
                <span className="input-highlight"></span>
                {touched.zipCode && errors.zipCode && <span className="error-msg">{errors.zipCode}</span>}
              </div>
            </div>
          )}

          {/* STEP 3: ACADEMIC */}
          {currentStep === 3 && (
            <div className="form-step animate-in">
              <h2 className="section-title">📚 Academic History</h2>
              
              {['Grade School', 'Junior High School', 'Senior High School'].map((level, idx) => {
                const prefix = idx === 0 ? 'gs' : idx === 1 ? 'jhs' : 'shs';
                return (
                  <div key={prefix} className="academic-card">
                    <h3>{level}</h3>
                    <div className="form-grid">
                      <div className={`input-group ${touched[`${prefix}Name`] && errors[`${prefix}Name`] ? 'error' : ''}`}>
                        <input type="text" name={`${prefix}Name`} value={formData[`${prefix}Name`]} onChange={handleChange} onBlur={handleBlur} required placeholder=" " />
                        <label>School Name *</label>
                        <span className="input-highlight"></span>
                      </div>
                      
                      <div className={`input-group small ${touched[`${prefix}Year`] && errors[`${prefix}Year`] ? 'error' : ''}`}>
                        <input type="number" name={`${prefix}Year`} value={formData[`${prefix}Year`]} onChange={handleChange} onBlur={handleBlur} required min="2000" max="2024" placeholder=" " />
                        <label>Year *</label>
                        <span className="input-highlight"></span>
                      </div>

                      {prefix === 'shs' && (
                        <div className={`input-group small ${touched.shsAverage && errors.shsAverage ? 'error' : ''}`}>
                          <input type="number" name="shsAverage" value={formData.shsAverage} onChange={handleChange} onBlur={handleBlur} required min="75" max="100" step="0.01" placeholder=" " />
                          <label>Average *</label>
                          <span className="input-highlight"></span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`input-group ${touched[`${prefix}Address`] && errors[`${prefix}Address`] ? 'error' : ''}`}>
                      <input type="text" name={`${prefix}Address`} value={formData[`${prefix}Address`]} onChange={handleChange} onBlur={handleBlur} required placeholder=" " />
                      <label>School Address *</label>
                      <span className="input-highlight"></span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 4: ENROLLMENT */}
          {currentStep === 4 && (
            <div className="form-step animate-in">
              <h2 className="section-title">🎓 Enrollment Choices</h2>
              
              <div className="choices-grid">
                <div className="choice-card">
                  <h4>Academic Level *</h4>
                  <div className="radio-group">
                    {['Undergraduate', 'Graduate'].map(opt => (
                      <label key={opt} className={`radio-btn ${formData.level === opt.toLowerCase() ? 'selected' : ''}`}>
                        <input type="radio" name="level" value={opt.toLowerCase()} checked={formData.level === opt.toLowerCase()} onChange={handleChange} required />
                        <span className="radio-check"></span>
                        <span className="radio-label">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="choice-card">
                  <h4>Semester *</h4>
                  <div className="radio-group">
                    {['First', 'Second', 'Summer'].map(opt => (
                      <label key={opt} className={`radio-btn ${formData.semester === opt.toLowerCase() ? 'selected' : ''}`}>
                        <input type="radio" name="semester" value={opt.toLowerCase()} checked={formData.semester === opt.toLowerCase()} onChange={handleChange} required />
                        <span className="radio-check"></span>
                        <span className="radio-label">{opt} Semester</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="choice-card">
                  <h4>Campus *</h4>
                  <div className="radio-group">
                    {['Manila', 'Quezon City'].map(opt => (
                      <label key={opt} className={`radio-btn ${formData.campus === opt.toLowerCase().replace(' ', '-') ? 'selected' : ''}`}>
                        <input type="radio" name="campus" value={opt.toLowerCase().replace(' ', '-')} checked={formData.campus === opt.toLowerCase().replace(' ', '-')} onChange={handleChange} required />
                        <span className="radio-check"></span>
                        <span className="radio-label">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-grid two-cols">
                <div className={`input-group select-group ${touched.department && errors.department ? 'error' : ''}`}>
                  <select name="department" value={formData.department} onChange={handleChange} onBlur={handleBlur} required>
                    <option value=""></option>
                    <option value="cea">College of Engineering & Architecture</option>
                    <option value="ccs">College of Computer Studies</option>
                    <option value="cbe">College of Business Education</option>
                    <option value="arts">College of Arts</option>
                  </select>
                  <label className="static-label">College Department *</label>
                </div>

                <div className={`input-group select-group ${touched.program && errors.program ? 'error' : ''}`}>
                  <select name="program" value={formData.program} onChange={handleChange} onBlur={handleBlur} required disabled={!formData.department}>
                    <option value="">{formData.department ? 'Select Program' : 'Select Department First'}</option>
                    {formData.department && departments[formData.department]?.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <label className="static-label">Degree Program *</label>
                </div>
              </div>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn-secondary">
                ← Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button type="button" onClick={nextStep} className="btn-primary">
                Next Step →
              </button>
            ) : (
              <button type="submit" className={`btn-submit ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Complete Registration 🎓'}
              </button>
            )}
          </div>
        </form>

        <footer className="glass-footer">
          <p>© 2024 ADEi University • Technological Institute of the Philippines</p>
          <p className="security-note">🔒 Secure SSL Encryption • Data Privacy Protected</p>
        </footer>
      </div>
    </div>
  );
}

export default App;