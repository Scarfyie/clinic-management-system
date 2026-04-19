import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function PatientActions({ patientId, onDelete }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await onDelete(patientId)
    } finally {
      setLoading(false)
    }
  }

  const buttonStyle = {
    padding: '6px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s',
    minWidth: '70px'
  }

  return (
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
      <button 
        onClick={() => navigate(`/edit/${patientId}`)}
        style={{
          ...buttonStyle,
          backgroundColor: '#28a745',
          color: '#fff'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
      >
        Edit
      </button>

      <button 
        onClick={handleDelete} 
        disabled={loading}
        style={{
          ...buttonStyle,
          backgroundColor: loading ? '#ccc' : '#dc3545',
          color: '#fff',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
        onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#c82333')}
        onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#dc3545')}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}

export default PatientActions