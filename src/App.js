import React, { useState } from 'react';
import './App.css';

function App() {
  // State for all form data
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    religion: '',
    
    // Contact Details
    email: '',
    mobileNumber: '',
    landline: '',
    street: '',
    barangay: '',
    city: '',
    province: '',
    zipCode: '',
    
    // Academic History
    gsName: '',
    gsYear: '',
    gsAddress: '',
    jhsName: '',
    jhsYear: '',
    jhsAddress: '',
    shsName: '',
    shsYear: '',
    shsAverage: '',
    shsAddress: '',
    
    // Enrollment Choices
    academicLevel: '',
    semester: '',
    campus: '',
    collegeDepartment: '',
    degreeProgram: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration Submitted Successfully!\nCheck console for data.');
    console.log('Form Data:', formData);
  };

  // Degree programs based on department
  const degreePrograms = {
    'cea': ['BS Architecture', 'BS Chemical Engineering', 'BS Civil Engineering', 
            'BS Computer Engineering', 'BS Electrical Engineering', 'BS Electronics Engineering', 
            'BS Industrial Engineering', 'BS Mechanical Engineering'],
    'ccs': ['BS Computer Science', 'BS Data Science and Analytics', 
            'BS Entertainment and Multimedia Computing', 'BS Information Technology'],
    'cbe': ['BS Accountancy', 'BS Accounting Information System', 
            'BS Business Administration - Financial Management',
            'BS Business Administration - Human Resource Management',
            'BS Business Administration - Logistics and Supply Chain Management',
            'BS Business Administration - Marketing Management'],
    'arts': ['Bachelor of Arts in English Language', 'Bachelor of Arts in Political Science']
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🏫 ADEi University Digital Registrar</h1>
        <p>Student Enrollment Portal</p>
      </header>

      <form onSubmit={handleSubmit} className="enrollment-form">
        
        {/* SECTION 1: PERSONAL INFORMATION */}
        <fieldset className="form-section">
          <legend>👤 Personal Information</legend>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                value={formData.firstName}
                onChange={handleChange}
                required 
                placeholder="Juan"
              />
            </div>

            <div className="form-group">
              <label htmlFor="middleName">Middle Name</label>
              <input 
                type="text" 
                id="middleName" 
                name="middleName" 
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Dela Cruz"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                value={formData.lastName}
                onChange={handleChange}
                required 
                placeholder="Santos"
              />
            </div>

            <div className="form-group">
              <label htmlFor="suffix">Suffix</label>
              <input 
                type="text" 
                id="suffix" 
                name="suffix" 
                value={formData.suffix}
                onChange={handleChange}
                placeholder="Jr., Sr., III"
              />
            </div>
          </div>

          <div className="form-grid three-cols">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input 
                type="date" 
                id="dateOfBirth" 
                name="dateOfBirth" 
                value={formData.dateOfBirth}
                onChange={handleChange}
                required 
                onKeyDown={(e) => e.preventDefault()}
                max="2026-12-31"
                min="1900-01-01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select 
                id="gender" 
                name="gender" 
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="nationality">Nationality *</label>
              <select 
                id="nationality" 
                name="nationality" 
                value={formData.nationality}
                onChange={handleChange}
                required
              >
                <option value="">Select Nationality</option>
                <option value="filipino">Filipino</option>
                <option value="american">American</option>
                <option value="chinese">Chinese</option>
                <option value="korean">Korean</option>
                <option value="japanese">Japanese</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="religion">Religion</label>
            <input 
              type="text" 
              id="religion" 
              name="religion" 
              value={formData.religion}
              onChange={handleChange}
              placeholder="Roman Catholic, Islam, Protestant, etc."
            />
          </div>
        </fieldset>

        {/* SECTION 2: CONTACT DETAILS */}
        <fieldset className="form-section">
          <legend>📞 Contact Details</legend>
          
          <div className="form-grid three-cols">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder="student@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number *</label>
              <input 
                type="tel" 
                id="mobileNumber" 
                name="mobileNumber" 
                value={formData.mobileNumber}
                onChange={handleChange}
                required 
                placeholder="09XX XXX XXXX"
                pattern="[0-9]{11}"
              />
            </div>

            <div className="form-group">
              <label htmlFor="landline">Landline</label>
              <input 
                type="tel" 
                id="landline" 
                name="landline" 
                value={formData.landline}
                onChange={handleChange}
                placeholder="(02) XXX XXXX"
              />
            </div>
          </div>

          <h3>Complete Home Address</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="street">Street *</label>
              <input 
                type="text" 
                id="street" 
                name="street" 
                value={formData.street}
                onChange={handleChange}
                required 
                placeholder="123 Main Street"
              />
            </div>

            <div className="form-group">
              <label htmlFor="barangay">Barangay *</label>
              <input 
                type="text" 
                id="barangay" 
                name="barangay" 
                value={formData.barangay}
                onChange={handleChange}
                required 
                placeholder="Barangay 143"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                value={formData.city}
                onChange={handleChange}
                required 
                placeholder="Manila"
              />
            </div>

            <div className="form-group">
              <label htmlFor="province">Province *</label>
              <input 
                type="text" 
                id="province" 
                name="province" 
                value={formData.province}
                onChange={handleChange}
                required 
                placeholder="Metro Manila"
              />
            </div>
          </div>

          <div className="form-group half-width">
            <label htmlFor="zipCode">Zip Code *</label>
            <input 
              type="text" 
              id="zipCode" 
              name="zipCode" 
              value={formData.zipCode}
              onChange={handleChange}
              required 
              placeholder="1000"
              pattern="[0-9]{4}"
            />
          </div>
        </fieldset>

        {/* SECTION 3: ACADEMIC HISTORY */}
        <fieldset className="form-section">
          <legend>📚 Academic History</legend>
          
          {/* Grade School */}
          <div className="academic-subsection">
            <h3>Grade School</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="gsName">School Name *</label>
                <input 
                  type="text" 
                  id="gsName" 
                  name="gsName" 
                  value={formData.gsName}
                  onChange={handleChange}
                  required 
                  placeholder="Dela Cruz Elementary School"
                />
              </div>

              <div className="form-group small">
                <label htmlFor="gsYear">Year Graduated *</label>
                <input 
                  type="number" 
                  id="gsYear" 
                  name="gsYear" 
                  value={formData.gsYear}
                  onChange={handleChange}
                  required 
                  min="1900" 
                  max="2026"
                  placeholder="2016"
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="gsAddress">School Address *</label>
              <input 
                type="text" 
                id="gsAddress" 
                name="gsAddress" 
                value={formData.gsAddress}
                onChange={handleChange}
                required 
                placeholder="Complete Address"
              />
            </div>
          </div>

          {/* Junior High School */}
          <div className="academic-subsection">
            <h3>Junior High School</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="jhsName">School Name *</label>
                <input 
                  type="text" 
                  id="jhsName" 
                  name="jhsName" 
                  value={formData.jhsName}
                  onChange={handleChange}
                  required 
                  placeholder="Dela Cruz High School"
                />
              </div>

              <div className="form-group small">
                <label htmlFor="jhsYear">Year Graduated *</label>
                <input 
                  type="number" 
                  id="jhsYear" 
                  name="jhsYear" 
                  value={formData.jhsYear}
                  onChange={handleChange}
                  required 
                  min="1900" 
                  max="2026"
                  placeholder="2020"
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="jhsAddress">School Address *</label>
              <input 
                type="text" 
                id="jhsAddress" 
                name="jhsAddress" 
                value={formData.jhsAddress}
                onChange={handleChange}
                required 
                placeholder="Complete Address"
              />
            </div>
          </div>

          {/* Senior High School */}
          <div className="academic-subsection">
            <h3>Senior High School</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="shsName">School Name *</label>
                <input 
                  type="text" 
                  id="shsName" 
                  name="shsName" 
                  value={formData.shsName}
                  onChange={handleChange}
                  required 
                  placeholder="Dela Cruz Senior High School"
                />
              </div>

              <div className="form-group small">
                <label htmlFor="shsYear">Year Graduated *</label>
                <input 
                  type="number" 
                  id="shsYear" 
                  name="shsYear" 
                  value={formData.shsYear}
                  onChange={handleChange}
                  required 
                  min="1900" 
                  max="2026"
                  placeholder="2022"
                />
              </div>

              <div className="form-group small">
                <label htmlFor="shsAverage">Grade Average *</label>
                <input 
                  type="number" 
                  id="shsAverage" 
                  name="shsAverage" 
                  value={formData.shsAverage}
                  onChange={handleChange}
                  required 
                  min="75" 
                  max="100"
                  step="0.01"
                  placeholder="90.00"
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="shsAddress">School Address *</label>
              <input 
                type="text" 
                id="shsAddress" 
                name="shsAddress" 
                value={formData.shsAddress}
                onChange={handleChange}
                required 
                placeholder="Complete Address"
              />
            </div>
          </div>
        </fieldset>

        {/* SECTION 4: ENROLLMENT CHOICES */}
        <fieldset className="form-section">
          <legend>🎓 Enrollment Choices</legend>
          
          <div className="radio-group-container">
            <div className="radio-group">
              <label className="group-label">Academic Level *</label>
              <div className="radio-options">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="academicLevel" 
                    value="undergraduate"
                    checked={formData.academicLevel === 'undergraduate'}
                    onChange={handleChange}
                    required
                  />
                  Undergraduate
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="academicLevel" 
                    value="graduate"
                    checked={formData.academicLevel === 'graduate'}
                    onChange={handleChange}
                  />
                  Graduate
                </label>
              </div>
            </div>

            <div className="radio-group">
              <label className="group-label">Semester *</label>
              <div className="radio-options">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="semester" 
                    value="first"
                    checked={formData.semester === 'first'}
                    onChange={handleChange}
                    required
                  />
                  First Semester
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="semester" 
                    value="second"
                    checked={formData.semester === 'second'}
                    onChange={handleChange}
                  />
                  Second Semester
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="semester" 
                    value="summer"
                    checked={formData.semester === 'summer'}
                    onChange={handleChange}
                  />
                  Summer
                </label>
              </div>
            </div>

            <div className="radio-group">
              <label className="group-label">Campus *</label>
              <div className="radio-options">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="campus" 
                    value="manila"
                    checked={formData.campus === 'manila'}
                    onChange={handleChange}
                    required
                  />
                  Manila
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="campus" 
                    value="quezon-city"
                    checked={formData.campus === 'quezon-city'}
                    onChange={handleChange}
                  />
                  Quezon City
                </label>
              </div>
            </div>
          </div>

          <div className="form-grid two-cols">
            <div className="form-group">
              <label htmlFor="collegeDepartment">College Department *</label>
              <select 
                id="collegeDepartment" 
                name="collegeDepartment" 
                value={formData.collegeDepartment}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="cea">College of Engineering and Architecture</option>
                <option value="ccs">College of Computer Studies</option>
                <option value="cbe">College of Business Education</option>
                <option value="arts">College of Arts</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="degreeProgram">Degree Program *</label>
              <select 
                id="degreeProgram" 
                name="degreeProgram" 
                value={formData.degreeProgram}
                onChange={handleChange}
                required
                disabled={!formData.collegeDepartment}
              >
                <option value="">
                  {formData.collegeDepartment ? 'Select Program' : 'Select Department First'}
                </option>
                {formData.collegeDepartment && 
                  degreePrograms[formData.collegeDepartment]?.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </fieldset>

        {/* SUBMIT BUTTON */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit Registration
          </button>
        </div>
      </form>

      <footer className="app-footer">
        <p>© 2024 ADEi University | Technological Institute of the Philippines</p>
      </footer>
    </div>
  );
}

export default App;