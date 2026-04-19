import Navbar from './Navbar'

function Layout({ children }) {
  return (
    <div style={{
      fontFamily: 'Arial',
      background: '#f4f6f8',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <Navbar />

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px'
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout