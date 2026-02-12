import React, { useState } from 'react';
import './App.css';

// PHILIPPINE CITIES AND PROVINCES DATA
const philippineLocations = {
  'Metro Manila': ['Manila', 'Quezon City', 'Caloocan', 'Las Piñas', 'Makati', 'Malabon', 'Mandaluyong', 'Marikina', 'Muntinlupa', 'Navotas', 'Parañaque', 'Pasay', 'Pasig', 'Pateros', 'San Juan', 'Taguig', 'Valenzuela'],
  'Cebu': ['Cebu City', 'Mandaue', 'Lapu-Lapu', 'Talisay', 'Danao', 'Toledo', 'Carcar', 'Naga'],
  'Davao del Sur': ['Davao City', 'Digos', 'Magsaysay', 'Matanao', 'Padada', 'Santa Cruz'],
  'Laguna': ['Calamba', 'Santa Rosa', 'Biñan', 'San Pedro', 'Cabuyao', 'Sta. Cruz', 'Los Baños'],
  'Cavite': ['Bacoor', 'Imus', 'Dasmariñas', 'General Trias', 'Trece Martires', 'Tagaytay'],
  'Bulacan': ['Malolos', 'Meycauayan', 'San Jose del Monte', 'Santa Maria', 'Baliuag'],
  'Pampanga': ['Angeles', 'San Fernando', 'Mabalacat', 'Apalit', 'Arayat'],
  'Batangas': ['Batangas City', 'Lipa', 'Tanauan', 'Sto. Tomas', 'Nasugbu'],
  'Rizal': ['Antipolo', 'Cainta', 'Taytay', 'Binangonan', 'Angono', 'Rodriguez'],
  'Iloilo': ['Iloilo City', 'Passi', 'Oton', 'Santa Barbara', 'Leganes'],
  'Negros Occidental': ['Bacolod', 'Bago', 'La Carlota', 'San Carlos', 'Silay', 'Talisay'],
  'Zamboanga del Sur': ['Zamboanga City', 'Pagadian', 'Dipolog'],
  'Cagayan de Oro': ['Cagayan de Oro City'],
  'Baguio': ['Baguio City'],
  'Benguet': ['La Trinidad', 'Itogon', 'Tuba', 'Sablan'],
  'Ilocos Norte': ['Laoag', 'Batac', 'San Nicolas'],
  'Ilocos Sur': ['Vigan', 'Candon', 'Bantay'],
  'Pangasinan': ['Dagupan', 'San Carlos', 'Urdaneta', 'Alaminos', 'Lingayen'],
  'Quezon': ['Lucena', 'Tayabas', 'Candelaria', 'Sariaya'],
  'Leyte': ['Tacloban', 'Ormoc', 'Baybay', 'Palo'],
  'Negros Oriental': ['Dumaguete', 'Bais', 'Bayawan', 'Guihulngan'],
  'Bohol': ['Tagbilaran', 'Tubigon', 'Carmen', 'Loon'],
  'Camarines Sur': ['Naga', 'Iriga', 'Pili'],
  'Albay': ['Legazpi', 'Ligao', 'Tabaco', 'Guinobatan']
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', suffix: '',
    dateOfBirth: '', gender: '', nationality: '', religion: '',
    email: '', mobile: '', landline: '',
    street: '', barangay: '', city: '', province: '', zipCode: '',
    gsName: '', gsYear: '', gsAddress: '',
    jhsName: '', jhsYear: '', jhsAddress: '',
    shsName: '', shsYear: '', shsAverage: '', shsAddress: '',
    level: '', semester: '', campus: '', department: '', program: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const programsData = {
    undergraduate: {
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
    },
    graduate: {
      doctorate: [
        'Doctor in Information Technology',
        'Doctor of Engineering with Specialization in Computer Engineering',
        'Doctor of Philosophy in Computer Science'
      ],
      masters: [
        'Master in Information Systems',
        'Master in Information Technology',
        'Master in Logistics and Supply Chain Management',
        'Master of Engineering with Specialization in Civil Engineering',
        'Master of Engineering with Specialization in Computer Engineering',
        'Master of Engineering with Specialization in Electrical Engineering',
        'Master of Engineering with Specialization in Electronics Engineering',
        'Master of Engineering with Specialization in Industrial Engineering',
        'Master of Engineering with Specialization in Mechanical Engineering',
        'Master of Science in Computer Science'
      ]
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'mobile') {
      const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 11);
      setFormData(prev => ({ ...prev, [name]: numbersOnly }));
    }
    else if (name === 'landline') {
      const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numbersOnly }));
    }
    else if (name === 'province') {
      setFormData(prev => ({ ...prev, [name]: value, city: '' }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'gender', 'nationality',
                   'email', 'mobile', 'street', 'barangay', 'city', 'province', 'zipCode',
                   'gsName', 'gsYear', 'gsAddress', 'jhsName', 'jhsYear', 'jhsAddress',
                   'shsName', 'shsYear', 'shsAverage', 'shsAddress',
                   'level', 'semester', 'campus', 'department', 'program'];
    
    if (!value && requiredFields.includes(name)) {
      error = 'This field is required';
    }
    
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Please enter a valid email';
    }
    
    if (name === 'mobile' && value && !/^09\d{9}$/.test(value)) {
      error = 'Must be 11 digits starting with 09';
    }
    
    if (name === 'zipCode' && value && !/^\d{4}$/.test(value)) {
      error = 'Must be exactly 4 digits';
    }
    
    if (name === 'shsAverage' && value && (value < 75 || value > 100)) {
      error = 'Must be between 75-100';
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

  const clearSelection = (field) => {
    setFormData(prev => ({ ...prev, [field]: '' }));
    if (field === 'level') {
      setFormData(prev => ({ ...prev, level: '', department: '', program: '' }));
    }
    if (field === 'department') {
      setFormData(prev => ({ ...prev, department: '', program: '' }));
    }
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
          <div className="success-icon">✓</div>
          <h2>Application Submitted</h2>
          <p className="student-name">{formData.firstName} {formData.lastName}</p>
          <p className="success-detail">
            Your application for <strong>{formData.program}</strong> has been received.<br/>
            Student ID will be sent to {formData.email}
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Submit New Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="university-portal">
      <header className="portal-header">
        <div className="header-content">
          <div className="university-brand">
            <div className="seal">T.I.P.</div>
            <div className="brand-text">
              <h1>TECHNOLOGICAL INSTITUTE OF THE PHILIPPINES</h1>
              <p>Office of the University Registrar</p>
            </div>
          </div>
          <div className="header-meta">
            <span className="academic-year">A.Y. 2024-2025</span>
            <span className="term">Enrollment Period</span>
          </div>
        </div>
      </header>

      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${getProgress()}%` }}></div>
        </div>
        <span className="progress-text">{getProgress()}% Complete</span>
      </div>

      <div className="step-nav">
        {[
          { num: 1, label: 'Personal Info' },
          { num: 2, label: 'Contact' },
          { num: 3, label: 'Academic' },
          { num: 4, label: 'Enrollment' }
        ].map((step) => (
          <button
            key={step.num}
            className={`step-btn ${currentStep === step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}
            onClick={() => currentStep > step.num && setCurrentStep(step.num)}
          >
            <span className="step-num">{currentStep > step.num ? '✓' : step.num}</span>
            <span className="step-label">{step.label}</span>
          </button>
        ))}
      </div>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          
          {currentStep === 1 && (
            <section className="form-section">
              <h2 className="section-title">Personal Information</h2>
              
              <div className="form-row four-cols">
                <div className={`field-group ${touched.firstName && errors.firstName ? 'error' : ''}`}>
                  <label>First Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Juan"
                  />
                  {touched.firstName && errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>

                <div className="field-group">
                  <label>Middle Name</label>
                  <input 
                    type="text" 
                    name="middleName" 
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Dela Cruz"
                  />
                </div>

                <div className={`field-group ${touched.lastName && errors.lastName ? 'error' : ''}`}>
                  <label>Last Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Santos"
                  />
                  {touched.lastName && errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>

                <div className="field-group">
                  <label>Suffix</label>
                  <input 
                    type="text" 
                    name="suffix" 
                    value={formData.suffix}
                    onChange={handleChange}
                    placeholder="Jr., Sr., III"
                  />
                </div>
              </div>

              <div className="form-row three-cols">
                <div className={`field-group ${touched.dateOfBirth && errors.dateOfBirth ? 'error' : ''}`}>
                  <label>Date of Birth <span className="required">*</span></label>
                  <input 
                    type="date" 
                    name="dateOfBirth" 
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    max="2006-12-31"
                    min="1990-01-01"
                  />
                  {touched.dateOfBirth && errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
                </div>

                <div className={`field-group ${touched.gender && errors.gender ? 'error' : ''}`}>
                  <label>Gender <span className="required">*</span></label>
                  <select 
                    name="gender" 
                    value={formData.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                  </select>
                  {touched.gender && errors.gender && <span className="error-text">{errors.gender}</span>}
                </div>

                <div className={`field-group ${touched.nationality && errors.nationality ? 'error' : ''}`}>
                  <label>Nationality <span className="required">*</span></label>
                  <select 
                    name="nationality" 
                    value={formData.nationality}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select</option>
                    <option value="filipino">Filipino</option>
                    <option value="american">American</option>
                    <option value="chinese">Chinese</option>
                    <option value="korean">Korean</option>
                    <option value="japanese">Japanese</option>
                    <option value="other">Other</option>
                  </select>
                  {touched.nationality && errors.nationality && <span className="error-text">{errors.nationality}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="field-group">
                  <label>Religion</label>
                  <input 
                    type="text" 
                    name="religion" 
                    value={formData.religion}
                    onChange={handleChange}
                    placeholder="Roman Catholic, Islam, Protestant, etc."
                  />
                </div>
              </div>
            </section>
          )}

          {currentStep === 2 && (
            <section className="form-section">
              <h2 className="section-title">Contact Details</h2>
              
              <div className="form-row three-cols">
                <div className={`field-group ${touched.email && errors.email ? 'error' : ''}`}>
                  <label>Email Address <span className="required">*</span></label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="student@email.com"
                  />
                  {touched.email && errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className={`field-group ${touched.mobile && errors.mobile ? 'error' : ''}`}>
                  <label>Mobile Number <span className="required">*</span></label>
                  <input 
                    type="tel" 
                    name="mobile" 
                    value={formData.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="09123456789"
                    maxLength="11"
                  />
                  <small className="field-hint">11 digits, numbers only</small>
                  {touched.mobile && errors.mobile && <span className="error-text">{errors.mobile}</span>}
                </div>

                <div className="field-group">
                  <label>Landline</label>
                  <input 
                    type="tel" 
                    name="landline" 
                    value={formData.landline}
                    onChange={handleChange}
                    placeholder="0271234567"
                    maxLength="10"
                  />
                  <small className="field-hint">Max 10 digits, numbers only</small>
                </div>
              </div>

              <h3 className="subsection-title">Home Address</h3>
              
              <div className="form-row two-cols">
                <div className={`field-group ${touched.street && errors.street ? 'error' : ''}`}>
                  <label>Street <span className="required">*</span></label>
                  <input 
                    type="text" 
                    name="street" 
                    value={formData.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="123 Main Street"
                  />
                  {touched.street && errors.street && <span className="error-text">{errors.street}</span>}
                </div>

                <div className={`field-group ${touched.barangay && errors.barangay ? 'error' : ''}`}>
                  <label>Barangay <span className="required">*</span></label>
                  <input 
                    type="text" 
                    name="barangay" 
                    value={formData.barangay}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Barangay 143"
                  />
                  {touched.barangay && errors.barangay && <span className="error-text">{errors.barangay}</span>}
                </div>
              </div>

              <div className="form-row three-cols">
                <div className={`field-group ${touched.province && errors.province ? 'error' : ''}`}>
                  <label>Province <span className="required">*</span></label>
                  <select 
                    name="province" 
                    value={formData.province}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="">Select Province</option>
                    {Object.keys(philippineLocations).map(prov => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                  {touched.province && errors.province && <span className="error-text">{errors.province}</span>}
                </div>

                <div className={`field-group ${touched.city && errors.city ? 'error' : ''}`}>
                  <label>City <span className="required">*</span></label>
                  <select 
                    name="city" 
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={!formData.province}
                  >
                    <option value="">
                      {formData.province ? 'Select City' : 'Select Province First'}
                    </option>
                    {formData.province && philippineLocations[formData.province]?.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {touched.city && errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className={`field-group ${touched.zipCode && errors.zipCode ? 'error' : ''}`}>
                  <label>Zip Code <span className="required">*</span></label>
                  <input 
                    type="text" 
                    name="zipCode" 
                    value={formData.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="1000"
                    maxLength="4"
                  />
                  {touched.zipCode && errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                </div>
              </div>
            </section>
          )}

          {currentStep === 3 && (
            <section className="form-section">
              <h2 className="section-title">Academic History</h2>
              
              {[
                { key: 'gs', title: 'Grade School', yearLabel: 'Year Graduated' },
                { key: 'jhs', title: 'Junior High School', yearLabel: 'Year Graduated' },
                { key: 'shs', title: 'Senior High School', yearLabel: 'Year Graduated', showAverage: true }
              ].map((level) => (
                <div key={level.key} className="academic-block">
                  <h3>{level.title}</h3>
                  <div className="form-row two-cols">
                    <div className={`field-group ${touched[`${level.key}Name`] && errors[`${level.key}Name`] ? 'error' : ''}`}>
                      <label>School Name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name={`${level.key}Name`} 
                        value={formData[`${level.key}Name`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className={`field-group ${touched[`${level.key}Year`] && errors[`${level.key}Year`] ? 'error' : ''}`}>
                      <label>{level.yearLabel} <span className="required">*</span></label>
                      <input 
                        type="number" 
                        name={`${level.key}Year`} 
                        value={formData[`${level.key}Year`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="2000" 
                        max="2024"
                      />
                    </div>
                  </div>
                  
                  {level.showAverage && (
                    <div className="form-row">
                      <div className={`field-group narrow ${touched.shsAverage && errors.shsAverage ? 'error' : ''}`}>
                        <label>Grade Average <span className="required">*</span></label>
                        <input 
                          type="number" 
                          name="shsAverage" 
                          value={formData.shsAverage}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          min="75" 
                          max="100" 
                          step="0.01"
                          placeholder="90.00"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className={`field-group ${touched[`${level.key}Address`] && errors[`${level.key}Address`] ? 'error' : ''}`}>
                    <label>School Address <span className="required">*</span></label>
                    <input 
                      type="text" 
                      name={`${level.key}Address`} 
                      value={formData[`${level.key}Address`]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
              ))}
            </section>
          )}

          {currentStep === 4 && (
            <section className="form-section">
              <h2 className="section-title">Program Selection</h2>
              
              <div className="selection-block">
                <div className="selection-header">
                  <label>Academic Level <span className="required">*</span></label>
                  {formData.level && (
                    <button type="button" className="clear-btn" onClick={() => clearSelection('level')}>
                      Clear Selection
                    </button>
                  )}
                </div>
                <div className="radio-grid">
                  {['undergraduate', 'graduate'].map((opt) => (
                    <label key={opt} className={`radio-card ${formData.level === opt ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="level" 
                        value={opt}
                        checked={formData.level === opt}
                        onChange={handleChange}
                      />
                      <span className="radio-indicator"></span>
                      <span className="radio-text">{opt === 'undergraduate' ? 'Undergraduate' : 'Graduate'}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="selection-block">
                <div className="selection-header">
                  <label>Semester <span className="required">*</span></label>
                  {formData.semester && (
                    <button type="button" className="clear-btn" onClick={() => clearSelection('semester')}>
                      Clear Selection
                    </button>
                  )}
                </div>
                <div className="radio-grid three-options">
                  {['first', 'second', 'summer'].map((opt) => (
                    <label key={opt} className={`radio-card ${formData.semester === opt ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="semester" 
                        value={opt}
                        checked={formData.semester === opt}
                        onChange={handleChange}
                      />
                      <span className="radio-indicator"></span>
                      <span className="radio-text">
                        {opt === 'first' ? 'First Semester' : opt === 'second' ? 'Second Semester' : 'Summer'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="selection-block">
                <div className="selection-header">
                  <label>Campus <span className="required">*</span></label>
                  {formData.campus && (
                    <button type="button" className="clear-btn" onClick={() => clearSelection('campus')}>
                      Clear Selection
                    </button>
                  )}
                </div>
                <div className="radio-grid">
                  {['manila', 'quezon-city'].map((opt) => (
                    <label key={opt} className={`radio-card ${formData.campus === opt ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="campus" 
                        value={opt}
                        checked={formData.campus === opt}
                        onChange={handleChange}
                      />
                      <span className="radio-indicator"></span>
                      <span className="radio-text">{opt === 'manila' ? 'Manila' : 'Quezon City'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.level === 'undergraduate' && (
                <div className="form-row two-cols">
                  <div className={`field-group ${touched.department && errors.department ? 'error' : ''}`}>
                    <label>College Department <span className="required">*</span></label>
                    <select 
                      name="department" 
                      value={formData.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select Department</option>
                      <option value="cea">College of Engineering & Architecture</option>
                      <option value="ccs">College of Computer Studies</option>
                      <option value="cbe">College of Business Education</option>
                      <option value="arts">College of Arts</option>
                    </select>
                  </div>

                  <div className={`field-group ${touched.program && errors.program ? 'error' : ''}`}>
                    <label>Degree Program <span className="required">*</span></label>
                    <select 
                      name="program" 
                      value={formData.program}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!formData.department}
                    >
                      <option value="">
                        {formData.department ? 'Select Program' : 'Select Department First'}
                      </option>
                      {formData.department && programsData.undergraduate[formData.department]?.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {formData.level === 'graduate' && (
                <div className="form-row two-cols">
                  <div className={`field-group ${touched.department && errors.department ? 'error' : ''}`}>
                    <label>Degree Type <span className="required">*</span></label>
                    <select 
                      name="department" 
                      value={formData.department}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select Type</option>
                      <option value="masters">Master's Degree</option>
                      <option value="doctorate">Doctorate Degree</option>
                    </select>
                  </div>

                  <div className={`field-group ${touched.program && errors.program ? 'error' : ''}`}>
                    <label>Program <span className="required">*</span></label>
                    <select 
                      name="program" 
                      value={formData.program}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!formData.department}
                    >
                      <option value="">
                        {formData.department ? 'Select Program' : 'Select Degree Type First'}
                      </option>
                      {formData.department && programsData.graduate[formData.department]?.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </section>
          )}

          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" className="btn-secondary" onClick={prevStep}>
                ← Back
              </button>
            )}
            
            {currentStep < 4 ? (
              <button type="button" className="btn-primary" onClick={nextStep}>
                Continue →
              </button>
            ) : (
              <button type="submit" className={`btn-submit ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </main>

      <footer className="portal-footer">
        <p>© 2024 Technological Institute of the Philippines • All Rights Reserved</p>
        <p className="footer-note">This is an official document. Please ensure all information is accurate.</p>
      </footer>
    </div>
  );
}

export default App;