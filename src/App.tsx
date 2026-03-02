import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ClientsPage from './pages/ClientsPage'
import DealsPage from './pages/DealsPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <Layout>
            <DashboardPage />
          </Layout>
        }
      />

      <Route
        path="/clients"
        element={
          <Layout>
            <ClientsPage />
          </Layout>
        }
      />

      <Route
        path="/deals"
        element={
          <Layout>
            <DealsPage />
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
