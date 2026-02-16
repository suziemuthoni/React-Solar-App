import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SolarInverterPage from './pages/SolarInverterPage'
import PowerPlayProPage from './pages/PowerPlayProPage'
import PowerHubPage from './pages/PowerHubPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/solar-inverter-systems" element={<SolarInverterPage />} />
          <Route path="/product/powerplay-pro" element={<PowerPlayProPage />} />
          <Route path="/product/powerhub" element={<PowerHubPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
