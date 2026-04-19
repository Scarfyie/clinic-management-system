import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPatientById, updatePatient } from '../../services/patientService'

function EditPatient() {
  const { id } = useParams()
  const navigate = useNavigate()

  // =========================
  // STATE
  // =========================
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const [errors, setErrors] = useState({})

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    const load = async () => {
      const data = await getPatientById(id)
      setForm(data)
    }

    load()
  }, [id])

  // =========================
  // FIX #1: handleChange ONLY updates state
  // (removed validation from here)
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    // Clear error for this field as user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  // =========================
  // FIX #2: validate function moved OUTSIDE handleChange
  // and made reusable
  // =========================
  const validate = (formData) => {
    const newErrors = {}

    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email format'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // =========================
  // FIX #3: validate is called BEFORE API request
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate(form)) return   // <-- IMPORTANT FIX

    await updatePatient(id, form)
    navigate('/')
  }

  // =========================
  // UI
  // =========================
  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Patient</h2>

      <form onSubmit={handleSubmit}>

        {/* First Name */}
        <div>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            style={{ borderColor: errors.firstName ? 'red' : '#ccc' }}
          />
          {errors.firstName && (
            <div style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</div>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            style={{ borderColor: errors.lastName ? 'red' : '#ccc' }}
          />
          {errors.lastName && (
            <div style={{ color: 'red', fontSize: '12px' }}>{errors.lastName}</div>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            style={{ borderColor: errors.email ? 'red' : '#ccc' }}
          />
          {errors.email && (
            <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>
          )}
        </div>

        <button type="submit" disabled={Object.values(errors).some(e => e)}>Update</button>
      </form>
    </div>
  )
}

export default EditPatient