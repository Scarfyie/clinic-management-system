function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '300px'
      }}>
        <h3>{title}</h3>
        <p>{message}</p>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '20px'
        }}>
          <button onClick={onCancel}>
            Cancel
          </button>

          <button
            onClick={onConfirm}
            style={{
              background: '#d32f2f',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '5px'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal