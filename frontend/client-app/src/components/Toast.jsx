import { useEffect } from 'react'

function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  if (!message) return null

  const bgColor = type === 'error' ? '#f8d7da' : '#d4edda'
  const textColor = type === 'error' ? '#721c24' : '#155724'
  const borderColor = type === 'error' ? '#f5c6cb' : '#c3e6cb'

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 16px',
      backgroundColor: bgColor,
      color: textColor,
      border: `1px solid ${borderColor}`,
      borderRadius: '4px',
      zIndex: 1000
    }}>
      {message}
    </div>
  )
}

export default Toast