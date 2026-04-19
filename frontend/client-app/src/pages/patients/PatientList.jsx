import { useEffect, useState } from 'react'
import PatientTable from './PatientTable'
import { getPatients, deletePatient } from '../../services/patientService'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../../components/ConfirmModal'
import Toast from '../../components/Toast'
import useToast from '../../hooks/useToast'

function PatientList() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const navigate = useNavigate()

  // ✅ FIX: toast hook is now used
  const { toast, showToast, hideToast } = useToast()

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const data = await getPatients()
      setPatients(data)
    } catch (error) {
      showToast('Failed to load patients', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  // open modal
  const handleDeleteClick = (id) => {
    setSelectedId(id)
    setOpenModal(true)
  }

  // confirm delete
  const confirmDelete = async () => {
    try {
      await deletePatient(selectedId)

      setPatients(prev =>
        prev.filter(p => p.patientId !== selectedId)
      )

      showToast('Patient deleted successfully', 'success')

    } catch (error) {
      showToast('Failed to delete patient', 'error')
    } finally {
      setOpenModal(false)
      setSelectedId(null)
    }
  }

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
    
    <div style={{
      background: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      width: '100%',
      maxWidth: '900px'
    }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Patient Management</h2>
        <button 
          onClick={() => navigate('/add')}
          style={{
            padding: '10px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          + Add Patient
        </button>
      </div>

      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading patients...</div>
      ) : patients.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No patients found</div>
      ) : (
        <PatientTable
          patients={patients}
          onDelete={handleDeleteClick}
        />
      )}

    </div>

      {/* MODAL */}
      <ConfirmModal
        open={openModal}
        title="Delete Patient"
        message="Are you sure you want to delete this patient? This action cannot be undone."
        onCancel={() => setOpenModal(false)}
        onConfirm={confirmDelete}
      />

      {/* TOAST (IMPORTANT FIX) */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  )
}

export default PatientList