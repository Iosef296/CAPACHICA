import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Destinos from "./pages/Destinos"
import Alojamiento from "./pages/Alojamiento"
import Gastronomia from "./pages/Gastronomia"
import Actividades from "./pages/Actividades"
import Vivencial from "./pages/Vivencial"
import Festividades from "./pages/Festividades"
import Artesania from "./pages/Artesania"
import ComoLlegar from "./pages/ComoLlegar"
import Contacto from "./pages/Contacto"
import Login from "./admin/Login"
import Dashboard from "./admin/Dashboard"

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes — no navbar/footer */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/*" element={<Dashboard />} />

        {/* Public routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/destinos" element={<PublicLayout><Destinos /></PublicLayout>} />
        <Route path="/alojamiento" element={<PublicLayout><Alojamiento /></PublicLayout>} />
        <Route path="/gastronomia" element={<PublicLayout><Gastronomia /></PublicLayout>} />
        <Route path="/actividades" element={<PublicLayout><Actividades /></PublicLayout>} />
        <Route path="/vivencial" element={<PublicLayout><Vivencial /></PublicLayout>} />
        <Route path="/festividades" element={<PublicLayout><Festividades /></PublicLayout>} />
        <Route path="/artesania" element={<PublicLayout><Artesania /></PublicLayout>} />
        <Route path="/como-llegar" element={<PublicLayout><ComoLlegar /></PublicLayout>} />
        <Route path="/contacto" element={<PublicLayout><Contacto /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
