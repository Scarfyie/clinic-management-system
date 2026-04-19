import { useEffect, useState } from 'react'
import {
  createPatient,
  getPatientById,
  updatePatient
} from '../../services/patientService'
import { useNavigate, useParams } from 'react-router-dom'

function PatientForm() {
  const navigate = useNavigate()
  const { id } = useParams()

  const isEdit = Boolean(id)

  // ========================
  // STATE (FIX: all hooks at top)
  // ========================
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  // ========================
  // LOAD DATA (EDIT MODE)
  // ========================
  useEffect(() => {
    const loadPatient = async () => {
      if (!isEdit) return

      const data = await getPatientById(id)

      if (data) {
        setForm({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || ''
        })
      }
    }

    loadPatient()
  }, [id, isEdit])

  // ========================
  // HANDLE INPUT CHANGE
  // ========================
  const handleChange = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value
    })

    // clear error while typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  // ========================
  // VALIDATION
  // ========================
  const validate = (formData) => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email format'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // ========================
  // SUBMIT
  // ========================
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate(form)) return

    try {
      setLoading(true)
      setSuccess('')

      if (isEdit) {
        await updatePatient(id, form)
      } else {
        await createPatient(form)
      }

      setSuccess('Saved successfully')

      setTimeout(() => {
        navigate('/')
      }, 500)

    } catch (error) {
      setErrors({
        submit: 'Something went wrong. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  // ========================
  // UI
  // ========================
  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
      minHeight: '100vh'
    }}>
      <div style={{
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '500px'
      }}>
      <h2 style={{ textAlign: 'center', marginTop: 0, marginBottom: '5px' }}>{isEdit ? 'Edit Patient' : 'Add Patient'}</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px', margin: '5px 0 20px 0' }}>{isEdit ? 'Update patient information' : 'Create a new patient record'}</p>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px', borderRadius: '4px', marginBottom: '15px', border: '1px solid #c3e6cb' }}>
          {success}
        </div>
      )}

      {/* GENERAL ERROR */}
      {errors.submit && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '4px', marginBottom: '15px', border: '1px solid #f5c6cb' }}>
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* FIRST NAME */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label htmlFor="firstName" style={{ width: '120px', fontWeight: 'bold', marginBottom: 0 }}>First Name</label>
          <input
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: '8px',
              border: errors.firstName ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        {errors.firstName && (
          <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
            {errors.firstName}
          </div>
        )}

        {/* LAST NAME */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '15px' }}>
          <label htmlFor="lastName" style={{ width: '120px', fontWeight: 'bold', marginBottom: 0 }}>Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: '8px',
              border: errors.lastName ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        {errors.lastName && (
          <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
            {errors.lastName}
          </div>
        )}

        {/* EMAIL */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '15px' }}>
          <label htmlFor="email" style={{ width: '120px', fontWeight: 'bold', marginBottom: 0 }}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: '8px',
              border: errors.email ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        {errors.email && (
          <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
            {errors.email}
          </div>
        )}

        {/* BUTTON GROUP */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#007bff')}
          >
            {loading
              ? 'Saving...'
              : isEdit
              ? 'Update Patient'
              : 'Save Patient'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6268'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
          >
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default PatientForm