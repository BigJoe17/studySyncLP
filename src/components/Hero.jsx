import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find Your Perfect{' '}
              <span className="text-primary">Study Partner</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Match with students in your course, niche, or school — anytime, anywhere.
              Build connections that last and ace your studies together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://wa.me/+1234567890"
                className="bg-primary hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Join the Sprint 🚀
              </a>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-r from-primary to-blue-400 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6">
                {/* Placeholder for hero illustration */}
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-accent/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👥</div>
                    <div className="text-2xl mb-2">📚</div>
                    <div className="text-lg text-gray-600 font-medium">
                      Students Collaborating
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-accent text-yellow-800 rounded-full p-3 shadow-lg animate-bounce">
              💡
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-white rounded-full p-3 shadow-lg animate-pulse">
              🎯
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
