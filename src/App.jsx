import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WhyJoin from './components/WhyJoin';
import SprintInvitation from './components/SprintInvitation';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
        <WhyJoin />
        <SprintInvitation />
      </main>
      <Footer />
    </div>
  );
}

export default App;
