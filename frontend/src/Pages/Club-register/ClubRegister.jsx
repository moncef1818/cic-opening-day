import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ClubRegister.css'
import { 
  FaUser, FaSchool, FaGraduationCap, FaPaperPlane 
} from 'react-icons/fa'


const ClubRegister = () => {
  const navigate = useNavigate()
  
  // data object
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    discord: '',
    school: '',
    year: '',
    department_choice_1: '',
    department_choice_2: '',
    why_department_1: '',
    why_not_department_1_choose_2: ''
  })
 
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const CIC_URL = 'https://cyberinnovatorsclub.vercel.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnf2wvAvfbny60MNl4cSxi4MGBpjMrFFOa9ADMfIqkH_Li6EmhxD02p8pU0Hk_aem_B15mgNzOJm0IC0lia2eMBw'

  
  // Departments array
  const departmentChoices = [
    { value: 'cybersec', label: 'Cybersecurity'},
    { value: 'dev', label: 'Development' },
    { value: 'eth', label: 'Ethical Hacking'},
    { value: 'ai', label: 'Artificial Intelligence'},
    { value: 'design', label: 'Design & Social Media' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'fpr', label: 'Finance & Public Relations' },
    { value: 'logistics', label: 'Logistics'},
    { value: 'vib', label: 'Vibes' }
  ]
  
  // Year array
  const yearChoices = [
    { value: '1', label: 'First Year' },
    { value: '2', label: 'Second Year' },
    { value: '3', label: 'Third Year' },
    { value: '4', label: 'Fourth Year' },
    { value: '5', label: 'Fifth Year' }
  ]

  const schoolChoices = [
    { value: '', label: ''},
    { value: '', label: ''},
    { value: '', label: ''},
    { value: '', label: ''},
    { value: '', label: ''},
    { value: '', label: ''},
  ]

  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target // for the event object take the name of the input and its value

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear errors when  re-typing
    if (error) setError('')
    
  }
  
  const Submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // check if departements are different
    if (formData.department_choice_1 === formData.department_choice_2) {
      setError('Department choices must be different!')
      setLoading(false)
      return
    }
    
    try {
      
      const res = await axios.post(
        'https://cic-opening-day-backend.onrender.com/api/club/register/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
  
          }
        }
      )
      
      if (res.data.success) {
        setSuccess(true)
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          discord: '',
          school: '',
          year: '',
          department_choice_1: '',
          department_choice_2: '',
          why_department_1: '',
          why_not_department_1_choose_2: ''
        })

        setTimeout(() => {
          window.location.href = CIC_URL
        }, 5000);
        
      }
      
    } catch (err) {
      console.error('Registration error:', err)
      
      // Handle Django errors
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors
        const firstError = Object.values(errors)[0]
        setError(Array.isArray(firstError) ? firstError[0] : firstError)
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Registration failed. Please try again.')
      }
      
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="club-register-container">
      <div className="club-register-content">
        
        {/* Header with Logo */}
        <div className="register-header">
          <div className="logo-section">
            <img 
              src="/Original version icon.png" 
              alt="CIC Logo" 
              className="club-logo"
            />
          </div>
          
          <h1>Join Cyber Innovators Club!</h1>
          <p>Complete your registration to become an official member</p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {/* Success Message, if success then show the message else show the form ,displayed if the registration is okay */}
        {success ? (
          <div className="success-message">
            <h2>Registration Successful!</h2>
            <p>Welcome to the Cyber Innovators Club! You'll receive a confirmation email soon, check your phones!.</p>
          </div>
        ) : (
          <form onSubmit={Submit} className="register-form">
            
            {/* Personal Information Section */}
            <div className="form-section">
              <h3><FaUser /> User Information</h3>
              
              <div className="form-group">
                <label htmlFor="first_name">First Name :</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your first name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="last_name">Last Name :</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your last name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address :</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone_number">Phone Number :</label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  placeholder="+213 XXX XX XX XX"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="discord">Discord Username (optional) :</label>
                <input
                  type="text"
                  id="discord"
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  placeholder="username#1234"
                />
              </div>
            </div>
           
            <div className="form-section">
              <h3><FaSchool /> Academic Information</h3>
              
              <div className="form-group">
                <label htmlFor="school">Select your University :</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  required
                  placeholder="Enter your school name"
                />
              </div>

              {/* User infos Section */}
              <div className="form-group">
                <label htmlFor="year">Academic Year :</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your year</option>
                  {yearChoices.map(year => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Department Section */}
            <div className="form-section" id='departement-section'>
              <h3><FaGraduationCap /> Department Preferences</h3>

              <div>
                <div className="form-group">
                  <label htmlFor="department_choice_1">First Choice :</label>
                  <select
                    id="department_choice_1"
                    name="department_choice_1"
                    value={formData.department_choice_1}
                    onChange={handleChange}
                    required
                  >
                    <option value="" className='placeholder-option'>Select first choice</option>
                    {departmentChoices.map(dept => (
                      <option key={dept.value} value={dept.value} className='option'>
                      {dept.label}
                      </option>
                    ))}
                  </select>
                </div>
              
                <div className="form-group">
                  <label htmlFor="why_department_1">Why this department ? </label>
                  <textarea
                    id="why_department_1"
                    name="why_department_1"
                    value={formData.why_department_1}
                    onChange={handleChange}
                    required
                    placeholder="Explain why you're interested in this department..."
                  />
                </div>
              </div>
              
              
              <div>
                <div className="form-group">
                   <label htmlFor="department_choice_2">Second Choice :</label>
                   <select
                     id="department_choice_2"
                     name="department_choice_2"
                     value={formData.department_choice_2}
                     onChange={handleChange}
                     required
                     >
                     <option value="">Select second choice</option>
                     {departmentChoices
                       .filter(dept => dept.value !== formData.department_choice_1)
                       .map(dept => (
                         <option key={dept.value} value={dept.value}>
                           {dept.label}
                         </option>
                        ))
                     }
                    </select>
                </div>
              
                <div className="form-group">
                  <label htmlFor="why_not_department_1_choose_2">
                    If not accepted to first choice, why this second choice ?
                  </label>
                  <textarea
                    id="why_not_department_1_choose_2"
                    name="why_not_department_1_choose_2"
                    value={formData.why_not_department_1_choose_2}
                    onChange={handleChange}
                    placeholder="Explain your interest in the second choice..."
                  />
                </div>
              </div>
              
            </div>
            
           
            <div className="submit-section">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Submit 
                  </>
                )}
              </button>
            </div>
            
          </form>
        )}
        
      </div>
    </div>
  )
}

export default ClubRegister