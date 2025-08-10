import React, { useState } from 'react';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleTestConfirm = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/waitlist/test-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsConfirmed(true);
        console.log('Test confirmation successful:', data);
      } else {
        console.error('Test confirmation failed:', data.error);
      }
    } catch (error) {
      console.error('Test confirmation error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/waitlist/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, school }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setName('');
          setEmail('');
          setSchool('');
        }, 5000);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-16 lg:py-24 bg-gradient-to-br from-primary to-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Join the <span className="text-accent">Waitlist</span>
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Be among the first to experience StudySync! Sign up now and get early access 
              when we launch. We'll notify you as soon as StudySync is ready for you.
            </p>
          </div>

          {/* Waitlist Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">{isConfirmed ? '✅' : '📧'}</div>
                <h3 className="text-2xl font-bold mb-4">
                  {isConfirmed ? 'Email Confirmed! 🎉' : 'Check Your Email!'}
                </h3>
                <p className="text-blue-100 mb-4">
                  {isConfirmed 
                    ? "You're now officially on the StudySync waitlist! We'll notify you when we launch."
                    : "We've sent you a confirmation email. Please click the link in the email to confirm your registration."
                  }
                </p>
                {!isConfirmed && (
                  <>
                    <p className="text-sm text-blue-200 mb-4">
                      Don't see the email? Check your spam folder or try again.
                    </p>
                    <button
                      onClick={handleTestConfirm}
                      className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-semibold py-2 px-4 rounded-xl transition-colors text-sm"
                    >
                      🧪 Test Confirm (Development Only)
                    </button>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-xl">
                    {error}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="school" className="block text-sm font-medium mb-2">
                    School/University (Optional)
                  </label>
                  <input
                    type="text"
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Enter your school or university"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full font-bold py-4 px-8 rounded-xl transition-all duration-300 transform ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-accent hover:bg-yellow-400 hover:scale-105'
                  } text-yellow-800`}
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⏳</span>
                      Joining Waitlist...
                    </>
                  ) : (
                    'Join the Waitlist 🚀'
                  )}
                </button>

                <p className="text-sm text-blue-200">
                  We respect your privacy. Your email will only be used to notify you about StudySync updates.
                </p>
              </form>
            )}
          </div>

          {/* Early Access Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold mb-2">Early Access</h3>
              <p className="text-blue-200 text-sm">
                Be the first to use StudySync before public launch
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="text-3xl mb-3">🎁</div>
              <h3 className="text-lg font-bold mb-2">Exclusive Features</h3>
              <p className="text-blue-200 text-sm">
                Access premium features free for the first 3 months
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="text-3xl mb-3">👑</div>
              <h3 className="text-lg font-bold mb-2">Founder Status</h3>
              <p className="text-blue-200 text-sm">
                Special recognition as one of our founding users
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
