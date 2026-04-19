import { NavLink } from 'react-router-dom'

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#1976d2' : '#333',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    background: isActive ? '#e3f2fd' : 'transparent',
    fontWeight: isActive ? '600' : '400'
  })

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 20px',
      background: 'white',
      borderRadius: '10px',
      marginBottom: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
    }}>
      
      <div style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#1976d2'
      }}>
        Clinic System
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <NavLink to="/" style={linkStyle}>
          Patients
        </NavLink>

        <NavLink to="/add" style={linkStyle}>
          Add Patient
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar