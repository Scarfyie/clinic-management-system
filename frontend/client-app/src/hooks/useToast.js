import { useState } from 'react'

export default function useToast() {
  const [toast, setToast] = useState({
    message: '',
    type: 'success'
  })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const hideToast = () => {
    setToast({ message: '', type: 'success' })
  }

  return {
    toast,
    showToast,
    hideToast
  }
}