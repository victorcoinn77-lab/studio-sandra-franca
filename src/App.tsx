import unha1 from "./images/unha1.jpg";
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import AdminPanel from './components/AdminPanel';
import CourseSection from './components/CourseSection';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from "react";
import unha1 from "./images/unha1.jpg";
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'home' | 'booking' | 'admin' | 'courses'>('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === "victor.coinn77@gmail.com";

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#D4AF37] selection:text-white">
      <Navbar 
        currentView={view} 
        setView={setView} 
        user={user} 
        isAdmin={isAdmin} 
      />
      
      <main>

<section
  style={{
    position: "relative",
    height: "70vh",
    backgroundImage: `url(${unha1})`,
    backgroundSize: "cover",
    backgroundPosition: "center 20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  }}
>
  <div
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.6)",
    }}
  ></div>

  <div
    style={{
      position: "relative",
      textAlign: "center",
      zIndex: 2,
      transition: "all 1s ease",
    }}
  >
    <h1 style={{ fontSize: "48px" }}>
      Studio Sandra França
    </h1>

    <p style={{ fontSize: "20px", marginBottom: "20px" }}>
      Alongamento • Cutícula Russa • Cursos
    </p>

    <a href="https://wa.me/5562999999999" target="_blank">
      <button
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: "#D4AF37",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Agendar Agora
      </button>
    </a>
  </div>
</section>
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero onBookingClick={() => setView('booking')} />
              <CourseSection />
            </motion.div>
          )}

          {view === 'booking' && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="py-12 px-4"
            >
              <BookingForm onBack={() => setView('home')} />
            </motion.div>
          )}

          {view === 'admin' && isAdmin && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdminPanel />
            </motion.div>
          )}

          {view === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CourseSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

