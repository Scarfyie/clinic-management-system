import { useEffect, useState } from 'react'
import { createPatient, updatePatient, getPatientById } from '../../services/patientService'
import { useNavigate, useParams } from 'react-router-dom'

function AddPatient() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const { id } = useParams()

  const isEdit = !!id

  useEffect(() => {
    if (isEdit) {
      loadPatient()
    }
  }, [id])

  const loadPatient = async () => {
    const data = await getPatientById(id)
    setForm(data)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    // Clear error for this field as user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const validate = (formData) => {
    const newErrors = {}

    if (!formData.firstName || !formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName || !formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email format'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate(form)) return

    try {
        if (isEdit) {
        await updatePatient(id, form)
        } else {
        await createPatient(form)
        }

        navigate('/')
    } catch (err) {
        handleApiErrors(err)
    }
  }

  const handleApiErrors = (err) => {
    const response = err?.response?.data

    if (!response) return

    const newErrors = {}

    if (response.errors) {
        Object.keys(response.errors).forEach((key) => {
        newErrors[key.toLowerCase()] = response.errors[key][0]
        })
    }

    setErrors(newErrors)
    }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{isEdit ? 'Edit Patient' : 'Add Patient'}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            style={{ borderColor: errors.firstName ? 'red' : '#ccc' }}
          />
          {errors.firstName && <div style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</div>}
        </div>

        <div>
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            style={{ borderColor: errors.lastName ? 'red' : '#ccc' }}
          />
          {errors.lastName && <div style={{ color: 'red', fontSize: '12px' }}>{errors.lastName}</div>}
        </div>

        <div>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ borderColor: errors.email ? 'red' : '#ccc' }}
          />
          {errors.email && <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>}
        </div>

        <button type="submit" disabled={Object.values(errors).some(e => e)}>
          {isEdit ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  )
}

export default AddPatient