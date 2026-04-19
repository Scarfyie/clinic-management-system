import axiosClient from '../api/axiosClient'

export const getPatients = async () => {
  const res = await axiosClient.get('/patients')
  return res.data
}

export const getPatientById = async (id) => {
  const res = await axiosClient.get(`/patients/${id}`)
  return res.data
}

export const createPatient = async (data) => {
  const res = await axiosClient.post('/patients', data)
  return res.data
}

export const updatePatient = async (id, data) => {
  const res = await axiosClient.put(`/patients/${id}`, data)
  return res.data
}

export const deletePatient = async (id) => {
  await axiosClient.delete(`/patients/${id}`)
}