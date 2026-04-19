import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PatientList from './pages/patients/PatientList'
import PatientForm from './pages/patients/PatientForm'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/add" element={<PatientForm />} />
          <Route path="/edit/:id" element={<PatientForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App