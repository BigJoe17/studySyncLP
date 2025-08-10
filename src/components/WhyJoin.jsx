import React from 'react';

const WhyJoin = () => {
  const benefits = [
    {
      title: "Meet motivated peers",
      description: "Connect with students who share your drive for academic excellence and commitment to learning.",
      icon: "🌟",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Learn faster with accountability",
      description: "Stay on track with study partners who keep you motivated and help you maintain consistent progress.",
      icon: "⚡",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Build global connections",
      description: "Expand your network by connecting with students from around the world and diverse backgrounds.",
      icon: "🌍",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Free to start",
      description: "Begin your collaborative learning journey at no cost. Premium features available as you grow.",
      icon: "💎",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Join <span className="text-primary">StudySync</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the power of collaborative learning and unlock your full academic potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{benefit.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Active Students</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600 font-medium">Study Groups</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
