import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WhyJoin from './components/WhyJoin';
import Waitlist from './components/Waitlist';
import SprintInvitation from './components/SprintInvitation';
import Footer from './components/Footer';
import WaitlistAdmin from './components/WaitlistAdmin';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    // Simple routing based on URL hash
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('home');
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentView === 'admin') {
    return <WaitlistAdmin />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
        <WhyJoin />
        <Waitlist />
        <SprintInvitation />
      </main>
      <Footer />
    </div>
  );
}

export default App;
