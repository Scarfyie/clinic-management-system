import PatientActions from './PatientActions'

function PatientTable({ patients, onDelete }) {
  return (
    <table style={{ 
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px',
      tableLayout: 'fixed'
    }}>
      <thead>
        <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
          <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#333', width: '30%' }}>Name</th>
          <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#333', width: '35%' }}>Email</th>
          <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#333', width: '35%' }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {patients.map((p, index) => (
          <tr 
            key={p.patientId}
            style={{ 
              borderBottom: '1px solid #dee2e6',
              backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
              transition: 'background-color 0.2s',
              verticalAlign: 'middle'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f9f9f9'}
          >
            <td style={{ padding: '12px', color: '#333', width: '30%', verticalAlign: 'middle', textAlign: 'center' }}>{p.firstName} {p.lastName}</td>
            <td style={{ padding: '12px', color: '#666', width: '35%', verticalAlign: 'middle', wordBreak: 'break-word', textAlign: 'center' }}>{p.email}</td>
            <td style={{ padding: '12px', width: '35%', verticalAlign: 'middle', textAlign: 'center' }}>
              <PatientActions 
                patientId={p.patientId} 
                onDelete={onDelete} 
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PatientTable